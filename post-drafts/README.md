# post-drafts/

Сюда кладутся статьи до публикации. Одна папка — один пост:

```
post-drafts/
  my-post-slug/
    index.md       # текст + frontmatter
    photo.jpg       # картинки — рядом, плоско, без вложенных папок
```

`my-post-slug` становится URL (`/post/my-post-slug`) и именем файла в
`content/post/`.

## `index.md`

```markdown
---
title: "Заголовок статьи"
description: "Для OG-превью и списка статей — обязательно."
categories: ["frontend"]   # хотя бы одна; известные: frontend, dev, ai
tags: ["vue", "ssr"]       # необязательно
---

Текст статьи. Картинки — обычным markdown-синтаксисом или через `::BlogImage{...}`,
путь — просто имя файла из этой же папки:

![Подпись](photo.jpg)
```

Необязательные поля: `headline` (по умолчанию = `title`), `excerpt`,
`date` (по умолчанию — сегодня), `image`/`imageAlt` (если не задать —
обложка сгенерируется автоматически из заголовка), `author` (по
умолчанию `romkin`).

## Генерация

```bash
npm run generate-post              # обработать все черновики
npm run generate-post my-post-slug # только один
```

Результат: `content/post/<slug>.md` + обработанные картинки в
`public/images/posts/<slug>/`. Черновик в этой папке никуда не
девается — можно перегенерировать сколько угодно раз.

Детали и вторая версия (только болванка без публикации) — `PRD.md` §7, §11.
