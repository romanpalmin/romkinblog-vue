import sharp from 'sharp'
import fs from 'node:fs/promises'
import path from 'node:path'

const MAX_WIDTH = 1600

/**
 * Ресайзит (если шире MAX_WIDTH) и оптимизирует изображение, копирует
 * в целевой путь. SVG/GIF просто копируются как есть (sharp плохо
 * подходит для трансформации анимаций и векторов).
 */
export async function processAndCopyImage(srcAbsPath, destAbsPath) {
    await fs.mkdir(path.dirname(destAbsPath), { recursive: true })
    const ext = path.extname(srcAbsPath).toLowerCase()

    if (ext === '.svg' || ext === '.gif') {
        await fs.copyFile(srcAbsPath, destAbsPath)
        return
    }

    const metadata = await sharp(srcAbsPath).metadata()
    let pipeline = sharp(srcAbsPath).rotate()
    if (metadata.width && metadata.width > MAX_WIDTH) {
        pipeline = pipeline.resize({ width: MAX_WIDTH })
    }

    if (ext === '.jpg' || ext === '.jpeg') {
        pipeline = pipeline.jpeg({ quality: 82, mozjpeg: true })
    } else if (ext === '.png') {
        pipeline = pipeline.png({ quality: 82, compressionLevel: 9 })
    } else if (ext === '.webp') {
        pipeline = pipeline.webp({ quality: 82 })
    }

    await pipeline.toFile(destAbsPath)
}

export function isRemoteOrAbsolute(src) {
    return /^([a-z][a-z0-9+.-]*:)?\/\//i.test(src) || src.startsWith('/') || src.startsWith('data:')
}
