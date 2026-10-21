# romkin.blog — блог на Nuxt 3

Личный блог Романа Пальмина. Темы разные, не только разработка. Пока опубликованы две статьи про Event Loop (в браузере и в Node.js), остальные появятся позже. Сайт: https://romkin.blog

Проект сделан вместе с Claude Code: я ставил задачи и решал, как должно работать, код писал Claude Code, я читал его и принимал.

**English:** a personal blog built with Nuxt 3, Vue 3 (Composition API, TypeScript) and Nuxt Content, generated as a static site and deployed by GitHub Actions. No tests yet.

## Стек

- Nuxt 3, Vue 3 (`<script setup>`, TypeScript в компонентах и composable)
- Nuxt Content: статьи в Markdown, схема frontmatter в `content.config.ts`
- Tailwind CSS, светлая и тёмная тема (`@nuxtjs/color-mode`)
- статическая генерация (`nuxt generate`), хостинг без сервера на Node
- GitHub Actions: сборка и выкладка на хостинг по FTP при пуше в `main`

## Что внутри

- страницы: главная с пагинацией, категории, теги, статья, раздел `/live`, резюме `/cv`, страница об авторе (`app/pages`)
- `app/composables/usePaginatedPosts.ts` — общая логика пагинации для главной, категорий и тегов
- `scripts/generate-post.mjs` — генератор поста: берёт черновик с картинками из `post-drafts/<slug>/`, проверяет frontmatter по схеме, обрабатывает картинки (`sharp`), рисует обложку (`@napi-rs/canvas`) и кладёт результат в `content/post/` и `public/images/posts/`
- `scripts/lib/post-schema.mjs` — одна схема поста, её используют и генератор, и Nuxt Content, чтобы они не расходились

## Запуск

Нужен Node 24 (см. `.nvmrc`): CLI Nuxt использует `node:util.styleText`, которого нет в Node 20.

```bash
nvm use
npm install
npm run dev        # http://localhost:3000
npm run generate   # статическая сборка в .output/public
```

Новый пост через генератор: создать `post-drafts/<slug>/index.md` с картинками рядом и выполнить `npm run generate-post <slug>`. Папка `post-drafts/` в репозиторий не попадает.

## Чего пока нет

- тестов и линтера
- проверки типов отдельной командой (`vue-tsc`)
- английской версии сайта
