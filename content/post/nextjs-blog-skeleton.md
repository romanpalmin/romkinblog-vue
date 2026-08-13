---
title: "Минимальный скелет блога на Next.js App Router: как файлы становятся страницами"
headline: "Минимальный скелет блога на Next.js App Router: как файлы становятся страницами"
description: "Разбор структуры романовского блога на Next.js 16: App Router, серверные и клиентские компоненты, MDX с zod-валидацией фронтматтера."
excerpt: "В App Router файл — это не просто файл. Его имя (page.tsx, [slug], \"use client\") определяет, что именно он делает во время рендера."
date: 2026-08-11
image: "/images/common/placeholder.png"
imageAlt: "Схема App Router: layout.tsx оборачивает page.tsx, динамический сегмент [slug] читает MDX-файл"
tags: ["nextjs", "react", "frontend"]
categories: ["frontend"]
author: "romkin"
---

Каркас этого блога — не «шаблон из коробки», собран по шагам курса из голого `create-next-app`.
Полезно разобрать, из чего он реально состоит: пять файлов, но каждый отвечает за свою роль
в App Router, и роль определяется не содержимым, а именем и местом файла в дереве.

## Дерево

```
src/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   └── post/[slug]/page.tsx
├── components/
│   └── theme-toggle.tsx
└── lib/content/
    ├── posts.ts
    └── schema.ts
```

## `layout.tsx` — корень, который не перерендеривается

```tsx
export default function RootLayout({children}: LayoutProps<"/">) {
  return (
    <html lang="ru" suppressHydrationWarning className={`${fraunces.variable} ...`}>
      <body className="min-h-full flex flex-col">
        <ThemeProvider attribute="data-theme" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
```

В App Router `layout.tsx` — это не «общий header/footer вручную на каждой странице», а отдельный
уровень дерева рендера: он оборачивает `page.tsx` и не размонтируется при переходе между
страницами внутри себя. Здесь же подключены шрифты через `next/font/google` (шрифт грузится и
самохостится на этапе сборки, а не тянется с Google Fonts в рантайме) и `ThemeProvider` из
`next-themes`, который ставит атрибут `data-theme` на `<html>` до первой отрисовки — отсюда
`suppressHydrationWarning`: React ожидает, что серверный и клиентский HTML совпадут, а тема
неизбежно решается уже в браузере.

## `page.tsx` — файл равно маршрут

```tsx
export default function Home() {
  const posts = getAllPosts();
  return (/* список постов */);
}
```

Ничего похожего на `Route.get('/', handler)` — сам путь к файлу и есть маршрут. `page.tsx` в
`app/` — это `/`. По умолчанию это серверный компонент: `getAllPosts()` читает файлы с диска
(`fs.readdirSync`) прямо внутри компонента, без API-роута и без `useEffect` — код выполняется
только на сервере при генерации страницы, в браузер попадает уже готовый HTML.

## `post/[slug]/page.tsx` — динамический сегмент и статическая генерация

```tsx
export function generateStaticParams() {
  return getAllPosts().map((post) => ({slug: post.slug}));
}

export default async function PostPage({params}: {params: Promise<{slug: string}>}) {
  const {slug} = await params;
  const post = await getPostBySlug(slug).catch(() => null);
  if (!post) notFound();
  ...
}
```

Квадратные скобки в имени папки (`[slug]`) — динамический сегмent маршрута: `post/zamykaniya-v-js`
попадает сюда с `params.slug = "zamykaniya-v-js"`. `generateStaticParams` говорит Next.js заранее
собрать статический HTML для каждого поста во время сборки, а не рендерить их по запросу — тот же
принцип, что и `getStaticPaths` в Pages Router, только без отдельного экспорта под конкретное имя.
Компонент — `async function`: в App Router серверный компонент может быть `async` и обращаться
к данным (здесь — к файловой системе) напрямую внутри тела функции.

## `lib/content/` — источник данных без бэкенда

`schema.ts` описывает фронтматтер через `zod`:

```ts
export const postFrontmatterSchema = z.object({
  title: z.string().min(1),
  date: z.coerce.date(),
  image: z.string().min(1),
  tags: z.array(z.string().min(1)).default([]),
  ...
});
```

`posts.ts` читает `.mdx`-файлы (`gray-matter` разделяет фронтматтер и тело), прогоняет
фронтматтер через `postFrontmatterSchema.safeParse` и явно бросает ошибку со списком проблем,
если пост не соответствует схеме — это происходит на этапе сборки, а не когда читатель уже открыл
страницу. Тело MDX компилируется в React-дерево через `compileMDX` из `next-mdx-remote/rsc` —
тоже на сервере, без клиентского MDX-парсера в бандле.

## `theme-toggle.tsx` — граница `"use client"`

```tsx
"use client";

export function ThemeToggle() {
  const {resolvedTheme, setTheme} = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) return <div className="h-8 w-8 rounded-full border border-border-strong" />;
  ...
}
```

Единственный файл с `"use client"` во всём каркасе. Всё остальное — серверные компоненты по
умолчанию; директива нужна именно там, где есть интерактивность (`onClick`) или хуки состояния
(`useState`, `useEffect`). Паттерн `mounted`-заглушки — не декоративный: на сервере тема ещё
неизвестна (`next-themes` резолвит её в браузере), поэтому первый рендер клиента обязан совпасть
с серверным HTML, а настоящая иконка темы подставляется только после `useEffect`, то есть уже
после гидратации.

## Почему это так устроено

Файловая структура App Router кодирует три вещи одновременно: маршрут (путь до `page.tsx`),
границу сервер/клиент (`"use client"` или её отсутствие) и момент генерации (обычный `page.tsx`
против `generateStaticParams`). Ничего из этого не настраивается конфигом — компилятор Next.js
разбирает дерево `app/` и решает, что с каким файлом делать, по соглашению об именах.

## Коротко

- `layout.tsx` — уровень дерева рендера, а не «общий хедер», подключается один раз и не
  перемонтируется при навигации внутри себя.
- Путь к `page.tsx` в `app/` и есть маршрут; `[slug]` — динамический сегмент.
- Серверные компоненты по умолчанию читают данные напрямую в теле функции; `"use client"` нужен
  только там, где есть состояние или обработчики событий.
- `generateStaticParams` заранее собирает статический HTML для каждого поста на этапе сборки.
- Фронтматтер валидируется через `zod` при чтении файла — сломанный пост падает на сборке, а не
  у читателя в браузере.
