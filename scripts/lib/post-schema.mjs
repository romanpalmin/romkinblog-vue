import { z } from 'zod'

// Финальная схема опубликованного поста — используется и в content.config.ts
// (валидация при сборке), и в generate-post.mjs (валидация перед записью).
export const postSchema = z.object({
    title: z.string(),
    headline: z.string(),
    date: z.date(),
    excerpt: z.string().optional(),
    description: z.string(),
    image: z.string(),
    imageAlt: z.string(),
    imageCaption: z.string().optional(),
    tags: z.array(z.string()),
    categories: z.array(z.string()),
    author: z.string(),
    // Задел на будущее (Phase 7, PRD §6) — не используется в Phase 1/2.
    telegramMessageUrl: z.string().optional(),
})

// Черновик в post-drafts/<slug>/index.md — то же самое, но со смягчёнными
// полями: image/imageAlt/headline/date/author генератор дозаполняет сам.
export const draftSchema = z.object({
    title: z.string({ required_error: 'title обязателен' }).min(1, 'title не может быть пустым'),
    headline: z.string().optional(),
    date: z.coerce.date().optional(),
    excerpt: z.string().optional(),
    description: z.string({ required_error: 'description обязателен — используется в OG-превью и списке статей' }),
    image: z.string().optional(),
    imageAlt: z.string().optional(),
    imageCaption: z.string().optional(),
    tags: z.array(z.string()).default([]),
    categories: z
        .array(z.string(), { required_error: 'categories обязателен — минимум одна категория' })
        .min(1, 'нужна хотя бы одна категория'),
    author: z.string().default('romkin'),
    telegramMessageUrl: z.string().optional(),
})
