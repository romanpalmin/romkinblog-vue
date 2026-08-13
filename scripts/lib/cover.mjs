import { GlobalFonts, createCanvas } from '@napi-rs/canvas'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const FONTS_DIR = path.join(__dirname, '..', 'assets', 'fonts')

// Fraunces (сайт использует именно её для заголовков) не поддерживает
// кириллицу — у Google Fonts для неё нет cyrillic-сабсета. Canvas
// (skia) сам подставляет следующий шрифт из font-family для символов,
// которых нет в первом — тестировали, работает как в браузере. Noto Serif
// вместо системного Georgia: не полагаемся на шрифты хост-машины,
// шрифт лежит в репозитории и работает одинаково где угодно.
const TITLE_FONT_STACK = '"Fraunces", "Noto Serif"'

let fontsRegistered = false
function ensureFonts() {
    if (fontsRegistered) return
    GlobalFonts.registerFromPath(path.join(FONTS_DIR, 'Fraunces-Bold.ttf'), 'Fraunces')
    GlobalFonts.registerFromPath(path.join(FONTS_DIR, 'NotoSerif-Bold.ttf'), 'Noto Serif')
    GlobalFonts.registerFromPath(path.join(FONTS_DIR, 'IBMPlexSans-Regular.ttf'), 'IBM Plex Sans')
    GlobalFonts.registerFromPath(path.join(FONTS_DIR, 'IBMPlexSans-Medium.ttf'), 'IBM Plex Sans Medium')
    fontsRegistered = true
}

// Токены дизайна — light-палитра из app/assets/css/main.css (PRD.md §4).
// OG-картинки всегда светлые независимо от темы сайта (так их видят
// соцсети/мессенджеры вне контекста страницы).
const TOKENS = {
    bg: '#faf9f6',
    text: '#17181c',
    textFaint: '#8b8e97',
    accent: '#a8460f',
}

const WIDTH = 1200
const HEIGHT = 630
// Карточка в списке (Posts/Card.vue) обрезает обложку через object-cover
// до соотношения ~1.56:1 (у самой обложки 1.9:1) — по бокам срезается
// ~110px с каждой стороны. PADDING_X держит текст внутри safe zone для
// обеих ситуаций (полная 1200x630 в OG и обрезанная в карточке).
const PADDING_X = 150
const PADDING_Y = 70

function wrapText(ctx, text, maxWidth) {
    const words = text.split(/\s+/)
    const lines = []
    let line = ''
    for (const word of words) {
        const attempt = line ? `${line} ${word}` : word
        if (ctx.measureText(attempt).width > maxWidth && line) {
            lines.push(line)
            line = word
        } else {
            line = attempt
        }
    }
    if (line) lines.push(line)
    return lines
}

/**
 * Генерирует обложку поста «заголовок на фоне» в токенах дизайна сайта.
 * @returns {Buffer} PNG-буфер 1200x630
 */
export function generateCoverPng({ title, category }) {
    ensureFonts()

    const canvas = createCanvas(WIDTH, HEIGHT)
    const ctx = canvas.getContext('2d')

    ctx.fillStyle = TOKENS.bg
    ctx.fillRect(0, 0, WIDTH, HEIGHT)

    ctx.fillStyle = TOKENS.accent
    ctx.fillRect(0, 0, WIDTH, 10)

    ctx.textBaseline = 'alphabetic'

    const kicker = (category || 'romkin.blog').toUpperCase()
    ctx.font = '600 22px "IBM Plex Sans Medium"'
    ctx.fillStyle = TOKENS.accent
    ctx.fillText(kicker, PADDING_X, PADDING_Y + 22)

    ctx.font = `700 60px ${TITLE_FONT_STACK}`
    ctx.fillStyle = TOKENS.text
    const maxTextWidth = WIDTH - PADDING_X * 2
    const lines = wrapText(ctx, title, maxTextWidth).slice(0, 4)
    const lineHeight = 72
    const titleTop = HEIGHT / 2 - (lines.length * lineHeight) / 2 + 40
    lines.forEach((line, i) => {
        ctx.fillText(line, PADDING_X, titleTop + i * lineHeight)
    })

    ctx.font = '400 22px "IBM Plex Sans"'
    ctx.fillStyle = TOKENS.textFaint
    ctx.fillText('romkin.blog', PADDING_X, HEIGHT - PADDING_Y + 10)

    return canvas.toBuffer('image/png')
}
