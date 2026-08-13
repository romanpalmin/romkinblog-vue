<template>
    <div class="mx-auto max-w-2xl">
        <section class="mb-10 flex flex-col items-center gap-4 text-center sm:flex-row sm:text-left">
            <img
                src="/images/cv/photo-edited.jpg"
                alt="Роман Пальмин"
                class="h-28 w-28 shrink-0 rounded-full border border-border-strong object-cover shadow-md"
            />
            <div>
                <p class="text-xs uppercase tracking-wide text-text-faint">frontend · vue · nuxt · typescript</p>
                <h1 class="font-display text-2xl font-medium text-text">Роман Пальмин</h1>
                <p class="text-text-dim">Senior Frontend / Tech Lead</p>
                <p class="mt-1 text-xs text-accent">● Открыт к новым предложениям</p>
            </div>
        </section>

        <p class="mb-8 text-text-dim">
            Ведущий фронтенд-разработчик с опытом разработки и сопровождения сложных web-приложений
            на Vue/Nuxt и TypeScript. Специализируюсь на сервисной архитектуре, миграции legacy-кода,
            real-time функциональности (WebSocket), аналитике (GTM, Яндекс.Метрика, A/B-тесты) и
            production-поддержке через Sentry/Kibana.
        </p>

        <section class="mb-8">
            <h2 class="mb-3 font-display text-lg font-medium text-text">Ключевой опыт — Flowwow (2023–2026)</h2>
            <p class="mb-3 text-sm text-text-faint">
                Старший разработчик пользовательских интерфейсов, крупный e-commerce маркетплейс
                (SSR, мультиязычность, мультивалютность), Nuxt.js 2 / Vue 2.7 / TypeScript.
            </p>
            <ul class="list-inside list-disc space-y-1.5 text-sm text-text-dim">
                <li>Спроектировал и реализовал модуль чатов с real-time обменом сообщениями через Centrifuge (WebSocket).</li>
                <li>Реализовал настраиваемую страницу магазина под бренд партнёров: тема, баннеры, товарные подборки.</li>
                <li>Провёл миграцию аналитики (500+ событий) с GTM на Яндекс.Метрику с сохранением обратной совместимости.</li>
                <li>Внедрил фронтенд-логику A/B-тестирования (AbTestService, Vuex-хранилище экспериментов).</li>
                <li>Анализ production-инцидентов через Sentry/Kibana, участие в релизном процессе.</li>
            </ul>
        </section>

        <section class="mb-8">
            <h2 class="mb-3 font-display text-lg font-medium text-text">Опыт до этого</h2>
            <ul class="space-y-2 text-sm text-text-dim">
                <li><span class="text-text">ООО «Наука»</span> — Ведущий разработчик, 2022–2023 (мессенджер и планировщик, Vue 2/3, Cypress)</li>
                <li><span class="text-text">CoinLoan</span> — Фронтенд-разработчик, 2021–2022 (крипто-платформа, Vue, Nuxt.js)</li>
                <li><span class="text-text">Ленвендо</span> — Фронтенд-разработчик, 2018–2021 (e-commerce для МТС, Магнит, Совкомбанк)</li>
            </ul>
            <p class="mt-2 text-xs text-text-faint">
                23+ года опыта в разработке в целом, включая сильный бэкграунд в backend/БД
                (Oracle, PostgreSQL, MS SQL) — до перехода в frontend в 2018 году.
            </p>
        </section>

        <section class="mb-8">
            <h2 class="mb-3 font-display text-lg font-medium text-text">Стек</h2>
            <div class="flex flex-wrap gap-2">
                <span v-for="skill in skills" :key="skill" class="rounded bg-accent-soft px-2 py-1 text-xs text-text-dim">
                    {{ skill }}
                </span>
            </div>
        </section>

        <section class="flex flex-wrap items-center gap-4 border-t border-border pt-6 text-sm">
            <a href="mailto:roman.palmin@gmail.com" class="text-accent hover:underline">roman.palmin@gmail.com</a>
            <a href="https://t.me/jromkin" target="_blank" rel="noopener" class="text-accent hover:underline">Telegram</a>
            <a href="https://www.linkedin.com/in/roman-palmin/" target="_blank" rel="noopener" class="text-accent hover:underline">LinkedIn</a>
            <NuxtLink
                to="/cv"
                class="ml-auto rounded border border-border-strong px-3 py-1.5 font-medium text-text transition-colors hover:border-accent hover:text-accent"
            >
                Полное резюме →
            </NuxtLink>
        </section>
    </div>
</template>

<script setup lang="ts">
// Короткая версия «об авторе» для блога — то, что раньше жило на /cv
// (PRD.md §3), теперь /cv содержит полную версию резюме без сокращений,
// эта страница — блоговый профиль со ссылкой на полную версию внизу.
const skills = [
    'Vue 2/3', 'Nuxt.js', 'TypeScript', 'JavaScript', 'SSR', 'Pinia', 'Vuex',
    'REST API', 'WebSocket', 'SCSS', 'Tailwind', 'Cypress', 'GitHub Actions/CI-CD',
    'GTM', 'PostgreSQL',
]

useHead({
    title: 'Об авторе — Роман Пальмин',
    meta: [
        {
            name: 'description',
            content: 'Роман Пальмин — автор romkin.blog, ведущий frontend-разработчик, Vue/Nuxt/TypeScript, real-time и production-поддержка e-commerce маркетплейса.',
        },
    ],
})
</script>
