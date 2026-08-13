#!/usr/bin/env node
// Генератор постов (PRD.md §7, Phase 2, v1).
//
// Флоу: закинул в post-drafts/<slug>/index.md статью + картинки рядом ->
// npm run generate-post [slug] -> content/post/<slug>.md +
// public/images/posts/<slug>/*.
//
// Без аргумента обрабатывает все папки в post-drafts/. С аргументом -
// только post-drafts/<slug>.
//
// v2 (позже, после Phase 5 деплоя, см. PRD.md §11) - отдельная команда,
// которая только создаёт болванку черновика (шаблон index.md), не публикует.

import fs from 'node:fs/promises'
import { existsSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import matter from 'gray-matter'
import { draftSchema, postSchema } from './lib/post-schema.mjs'
import { processAndCopyImage, isRemoteOrAbsolute } from './lib/images.mjs'
import { generateCoverPng } from './lib/cover.mjs'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.join(__dirname, '..')
const DRAFTS_DIR = path.join(ROOT, 'post-drafts')
const CONTENT_DIR = path.join(ROOT, 'content', 'post')
const PUBLIC_IMAGES_DIR = path.join(ROOT, 'public', 'images', 'posts')

const MD_IMAGE_RE = /!\[([^\]]*)\]\(([^)\s]+)([^)]*)\)/g
const BLOG_IMAGE_RE = /::BlogImage\{([^}]*)\}/g

async function findDraftSlugs(explicitSlug) {
    if (explicitSlug) return [explicitSlug]
    if (!existsSync(DRAFTS_DIR)) return []
    const entries = await fs.readdir(DRAFTS_DIR, { withFileTypes: true })
    return entries.filter((e) => e.isDirectory()).map((e) => e.name)
}

async function copyLocalImage(draftDir, slug, relSrc) {
    const srcAbs = path.join(draftDir, relSrc)
    if (!existsSync(srcAbs)) {
        throw new Error(`картинка не найдена: ${relSrc} (ожидалась в ${draftDir})`)
    }
    const basename = path.basename(relSrc)
    const destAbs = path.join(PUBLIC_IMAGES_DIR, slug, basename)
    await processAndCopyImage(srcAbs, destAbs)
    return `/images/posts/${slug}/${basename}`
}

async function rewriteLocalImages(content, draftDir, slug) {
    let result = content

    const mdMatches = [...result.matchAll(MD_IMAGE_RE)]
    for (const m of mdMatches) {
        const [full, alt, src, rest] = m
        if (isRemoteOrAbsolute(src)) continue
        const newSrc = await copyLocalImage(draftDir, slug, decodeURIComponent(src))
        result = result.replace(full, `![${alt}](${newSrc}${rest})`)
    }

    const shortcodeMatches = [...result.matchAll(BLOG_IMAGE_RE)]
    for (const m of shortcodeMatches) {
        const [full, attrs] = m
        const srcMatch = attrs.match(/src=(["'])([^"']*)\1/)
        if (!srcMatch || isRemoteOrAbsolute(srcMatch[2])) continue
        const newSrc = await copyLocalImage(draftDir, slug, decodeURIComponent(srcMatch[2]))
        const newAttrs = attrs.replace(/src=(["'])([^"']*)\1/, `src=$1${newSrc}$1`)
        result = result.replace(full, `::BlogImage{${newAttrs}}`)
    }

    return result
}

async function resolveCover(draftDir, slug, data) {
    if (data.image) {
        const image = await copyLocalImage(draftDir, slug, data.image)
        return { image, imageAlt: data.imageAlt || data.title }
    }
    const buf = generateCoverPng({
        title: data.headline || data.title,
        category: data.categories?.[0],
    })
    const outAbs = path.join(PUBLIC_IMAGES_DIR, slug, 'cover.png')
    await fs.mkdir(path.dirname(outAbs), { recursive: true })
    await fs.writeFile(outAbs, buf)
    return { image: `/images/posts/${slug}/cover.png`, imageAlt: data.imageAlt || data.title, generated: true }
}

async function processDraft(slug) {
    const draftDir = path.join(DRAFTS_DIR, slug)
    const indexPath = path.join(draftDir, 'index.md')
    if (!existsSync(indexPath)) {
        throw new Error(`не найден ${path.relative(ROOT, indexPath)}`)
    }

    const raw = await fs.readFile(indexPath, 'utf-8')
    const { data: rawData, content: rawContent } = matter(raw)

    const parsed = draftSchema.safeParse(rawData)
    if (!parsed.success) {
        const issues = parsed.error.issues.map((i) => `  - ${i.path.join('.') || '(root)'}: ${i.message}`).join('\n')
        throw new Error(`невалидный frontmatter в ${slug}/index.md:\n${issues}`)
    }
    const data = parsed.data

    // Ресайз/оптимизация картинок в теле статьи + переписывание путей.
    const content = await rewriteLocalImages(rawContent, draftDir, slug)

    // Обложка: своя (обработанная) или автогенерация.
    const cover = await resolveCover(draftDir, slug, data)

    const finalFrontmatter = {
        title: data.title,
        headline: data.headline || data.title,
        date: data.date || new Date(),
        ...(data.excerpt ? { excerpt: data.excerpt } : {}),
        description: data.description,
        image: cover.image,
        imageAlt: cover.imageAlt,
        ...(data.imageCaption ? { imageCaption: data.imageCaption } : {}),
        tags: data.tags,
        categories: data.categories,
        author: data.author,
        ...(data.telegramMessageUrl ? { telegramMessageUrl: data.telegramMessageUrl } : {}),
    }

    // Финальная проверка по строгой схеме — тот же контракт, что и
    // content.config.ts, до записи файла.
    const finalCheck = postSchema.safeParse(finalFrontmatter)
    if (!finalCheck.success) {
        const issues = finalCheck.error.issues.map((i) => `  - ${i.path.join('.')}: ${i.message}`).join('\n')
        throw new Error(`сгенерированный frontmatter не прошёл финальную проверку (${slug}):\n${issues}`)
    }

    await fs.mkdir(CONTENT_DIR, { recursive: true })
    const outPath = path.join(CONTENT_DIR, `${slug}.md`)
    const output = matter.stringify(content.trim() + '\n', finalFrontmatter)
    await fs.writeFile(outPath, output)

    return {
        slug,
        outPath: path.relative(ROOT, outPath),
        coverGenerated: Boolean(cover.generated),
        imagesDir: path.relative(ROOT, path.join(PUBLIC_IMAGES_DIR, slug)),
    }
}

async function main() {
    const explicitSlug = process.argv[2]
    const slugs = await findDraftSlugs(explicitSlug)

    if (slugs.length === 0) {
        console.log(
            explicitSlug
                ? `Черновик post-drafts/${explicitSlug}/ не найден.`
                : `Нет черновиков в post-drafts/ (положи туда <slug>/index.md + картинки).`,
        )
        return
    }

    const results = []
    const failures = []

    for (const slug of slugs) {
        try {
            const result = await processDraft(slug)
            results.push(result)
            console.log(`✔ ${slug} -> ${result.outPath}${result.coverGenerated ? ' (обложка сгенерирована)' : ''}`)
        } catch (err) {
            failures.push({ slug, error: err })
            console.error(`✘ ${slug}: ${err.message}`)
        }
    }

    console.log(`\nГотово: ${results.length} обработано, ${failures.length} с ошибками.`)
    if (failures.length > 0) process.exitCode = 1
}

main()
