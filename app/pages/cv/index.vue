<template>
    <div>
        <!-- 00 — hero -->
        <section class="mb-16 grid gap-10 sm:grid-cols-[1fr_auto] sm:items-center">
            <div>
                <p class="text-xs uppercase tracking-wide text-text-faint">frontend / vue · nuxt · typescript</p>
                <h1 class="mt-2 font-display text-3xl font-medium text-text sm:text-4xl">Роман Пальмин</h1>
                <p class="mt-1 text-lg text-text-dim">Senior Frontend / Tech Lead</p>
                <p class="mt-4 max-w-xl text-text-dim">
                    Ведущий фронтенд-разработчик с опытом разработки и сопровождения сложных web-приложений
                    на Vue/Nuxt и TypeScript. Специализируюсь на сервисной архитектуре, миграции legacy-кода,
                    real-time функциональности и production-поддержке.
                </p>
                <p class="mt-4 flex items-center gap-2 text-sm text-accent">
                    <span class="h-2 w-2 rounded-full bg-accent" aria-hidden="true"></span>
                    Открыт к новым предложениям
                </p>

                <dl class="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
                    <div v-for="stat in stats" :key="stat.label">
                        <dt class="text-xs uppercase tracking-wide text-text-faint">{{ stat.label }}</dt>
                        <dd class="mt-1 text-text">{{ stat.value }}</dd>
                    </div>
                </dl>

                <div class="mt-8 flex flex-wrap gap-3">
                    <a
                        href="mailto:roman.palmin@gmail.com"
                        class="rounded bg-accent px-4 py-2 text-sm font-medium text-accent-contrast transition-opacity hover:opacity-90"
                    >
                        Написать на почту
                    </a>
                    <a
                        href="https://t.me/jromkin"
                        target="_blank"
                        rel="noopener"
                        class="rounded border border-border-strong px-4 py-2 text-sm font-medium text-text transition-colors hover:border-accent hover:text-accent"
                    >
                        Telegram @jromkin
                    </a>
                    <a
                        href="https://www.linkedin.com/in/roman-palmin/"
                        target="_blank"
                        rel="noopener"
                        class="rounded border border-border-strong px-4 py-2 text-sm font-medium text-text transition-colors hover:border-accent hover:text-accent"
                    >
                        LinkedIn
                    </a>
                </div>
            </div>

            <div class="mx-auto w-48 shrink-0 overflow-hidden rounded border border-border-strong shadow-md sm:w-60">
                <img
                    src="/images/cv/photo-edited.jpg"
                    alt="Портрет Романа Пальмина"
                    width="659"
                    height="824"
                    class="h-full w-full object-cover"
                />
            </div>
        </section>

        <!-- 01 — обо мне -->
        <section class="mb-16 max-w-2xl">
            <p class="mb-3 text-xs uppercase tracking-wide text-text-faint">01 — обо мне</p>
            <p class="mb-4 text-text-dim">
                Есть сильный инженерный бэкграунд в backend-разработке и работе с базами данных: понимаю
                API-контракты, бизнес-логику на стороне сервера, структуры данных и интеграционные сценарии —
                это помогает эффективно взаимодействовать с backend-командами и быстрее находить причины
                проблем на стыке frontend/backend.
            </p>
            <p class="mb-4 text-text-faint">
                Активно использую AI-инструменты (Claude, Codex) для ускорения рутинных задач и
                прототипирования, но сохраняю способность решать сложные архитектурные задачи самостоятельно —
                критически оцениваю AI-сгенерированный код и адаптирую его под контекст проекта.
            </p>
            <p class="text-text-dim">
                Ищу роль <strong class="font-medium text-text">Ведущий разработчик / Senior Frontend / Tech
                Lead</strong> с фокусом на разработку, архитектуру и качество продукта.
            </p>
        </section>

        <!-- 02 — ключевые проекты -->
        <section class="mb-16">
            <p class="mb-2 text-xs uppercase tracking-wide text-text-faint">
                02 — ключевые проекты · flowwow, 2023 — наст. время
            </p>
            <h2 class="mb-2 font-display text-2xl font-medium text-text">Что делал на текущем месте</h2>
            <p class="mb-6 max-w-2xl text-text-dim">
                Крупный e-commerce маркетплейс (цветы и подарки) с SSR, мультиязычностью и мультивалютностью.
                Nuxt.js 2 / Vue 2.7 / TypeScript.
            </p>

            <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <article v-for="item in highlights" :key="item.title" class="rounded border border-border bg-bg-raised p-4">
                    <span class="mb-2 inline-block rounded bg-accent-soft px-2 py-0.5 text-xs text-text-faint">
                        {{ item.tag }}
                    </span>
                    <h3 class="mb-1 font-display text-base font-medium text-text">{{ item.title }}</h3>
                    <p class="text-sm text-text-dim">{{ item.description }}</p>
                </article>
            </div>
        </section>

        <!-- 03 — стек -->
        <section class="mb-16">
            <p class="mb-2 text-xs uppercase tracking-wide text-text-faint">03 — стек</p>
            <h2 class="mb-6 font-display text-2xl font-medium text-text">С чем работаю</h2>
            <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                <div v-for="group in stackGroups" :key="group.title">
                    <h3 class="mb-2 text-sm font-medium text-text">{{ group.title }}</h3>
                    <div class="flex flex-wrap gap-2">
                        <span
                            v-for="skill in group.items"
                            :key="skill"
                            class="rounded bg-accent-soft px-2 py-1 text-xs text-text-dim"
                        >
                            {{ skill }}
                        </span>
                    </div>
                </div>
            </div>
        </section>

        <!-- 04 — опыт -->
        <section class="mb-16">
            <p class="mb-2 text-xs uppercase tracking-wide text-text-faint">04 — опыт</p>
            <h2 class="mb-6 font-display text-2xl font-medium text-text">23 года в разработке</h2>

            <ol class="space-y-8 border-l border-border pl-6">
                <li v-for="job in timeline" :key="job.company">
                    <div class="text-xs text-text-faint">{{ job.dates }} · {{ job.duration }}</div>
                    <h3 class="mt-1 font-display text-base font-medium text-text">
                        {{ job.role }}
                        <span class="font-body text-sm font-normal text-text-faint">· {{ job.company }}</span>
                    </h3>
                    <p class="mt-1.5 text-sm text-text-dim">{{ job.description }}</p>
                    <div v-if="job.tags" class="mt-2 flex flex-wrap gap-2">
                        <span
                            v-for="tag in job.tags"
                            :key="tag"
                            class="rounded bg-accent-soft px-2 py-0.5 text-xs text-text-faint"
                        >
                            {{ tag }}
                        </span>
                    </div>
                </li>
            </ol>

            <details class="mt-8 rounded border border-border p-4">
                <summary class="cursor-pointer text-sm font-medium text-text">
                    Показать более раннюю историю (1999–2017, 9 мест работы)
                </summary>
                <ol class="mt-4 space-y-2.5 text-sm text-text-dim">
                    <li v-for="job in earlierTimeline" :key="job.company">
                        <span class="text-text-faint">{{ job.dates }}</span> — {{ job.text }}
                    </li>
                </ol>
            </details>

            <div class="mt-10 grid gap-6 sm:grid-cols-2">
                <div>
                    <h3 class="mb-1 text-sm font-medium text-text">Образование</h3>
                    <p class="text-sm text-text-dim">Высшее — 2004, ПГУПС, электротехнический факультет, бакалавр</p>
                </div>
                <div>
                    <h3 class="mb-1 text-sm font-medium text-text">Языки</h3>
                    <p class="text-sm text-text-dim">Русский — родной · Английский — B2 · Французский — A1</p>
                </div>
            </div>
        </section>

        <!-- 05 — контакты -->
        <section class="border-t border-border pt-10">
            <p class="mb-2 text-xs uppercase tracking-wide text-text-faint">05 — контакты</p>
            <h2 class="mb-2 font-display text-2xl font-medium text-text">Обсудим вакансию?</h2>
            <p class="mb-6 text-text-dim">Предпочитаемый способ связи — почта или Telegram. Отвечаю быстро.</p>
            <div class="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                <a href="mailto:roman.palmin@gmail.com" class="rounded border border-border p-4 transition-colors hover:border-accent">
                    <span class="block text-xs text-text-faint">Email</span>
                    <span class="block text-sm font-medium text-text">roman.palmin@gmail.com</span>
                </a>
                <a
                    href="https://t.me/jromkin"
                    target="_blank"
                    rel="noopener"
                    class="rounded border border-border p-4 transition-colors hover:border-accent"
                >
                    <span class="block text-xs text-text-faint">Telegram</span>
                    <span class="block text-sm font-medium text-text">@jromkin</span>
                </a>
                <a
                    href="https://www.linkedin.com/in/roman-palmin/"
                    target="_blank"
                    rel="noopener"
                    class="rounded border border-border p-4 transition-colors hover:border-accent"
                >
                    <span class="block text-xs text-text-faint">LinkedIn</span>
                    <span class="block text-sm font-medium text-text">in/roman-palmin</span>
                </a>
                <a
                    href="/images/cv/roman-palmin-frontend-resume.pdf"
                    target="_blank"
                    rel="noopener"
                    class="rounded border border-border p-4 transition-colors hover:border-accent"
                >
                    <span class="block text-xs text-text-faint">Резюме</span>
                    <span class="block text-sm font-medium text-text">Скачать PDF</span>
                </a>
            </div>
        </section>
    </div>
</template>

<script setup lang="ts">
// Полная версия — портирована 1:1 по содержанию из старой статической
// страницы WorkHunter/www/romkin.blog/cv/index.html (PRD.md §3), не
// сокращённый пересказ. Зарплата и телефон осознанно не публикуются —
// то же ограничение, что и в прежней версии (WorkHunter/profile/hr-narrative.md).

const stats = [
    { label: 'Опыт разработки', value: '23 года 9 мес.' },
    { label: 'Последнее место', value: 'Senior UI, e-commerce маркетплейс' },
    { label: 'Локация / формат', value: 'Санкт-Петербург · удалённо, гибрид' },
]

const highlights = [
    {
        tag: 'real-time',
        title: 'Чаты с магазинами и поддержкой',
        description:
            'Спроектировал и реализовал модуль чатов end-to-end за две итерации по ~4 месяца. Real-time обмен сообщениями через Centrifuge (WebSocket), обработка статусов диалогов и адаптивный интерфейс под мобильные и десктопные сценарии.',
    },
    {
        tag: 'миграция',
        title: 'Страница заказов',
        description:
            'Перенос страницы заказов со старой PHP-версии на современный фронтенд: список заказов, отображение и изменение данных, обновление статусов в реальном времени через WebSocket.',
    },
    {
        tag: 'e-commerce',
        title: 'Страница магазина под бренд партнёра',
        description:
            'Настраиваемая страница магазина end-to-end: тема, логотипы, баннеры, подборки и карточки товаров, фильтры, сортировка, пагинация и интеграция с корзиной.',
    },
    {
        tag: 'аналитика',
        title: 'GTM → Яндекс.Метрика',
        description:
            'Поддерживал схему аналитики с 500+ событиями в GTM и провёл поэтапную миграцию на Яндекс.Метрику с сохранением обратной совместимости — бизнес-логика и отчёты продолжили работать по старым ивентам.',
    },
    {
        tag: 'эксперименты',
        title: 'A/B-тестирование',
        description:
            'Внедрил и поддерживал фронтенд-логику A/B-тестов (AbTestService, Vuex-хранилище экспериментов) с переключением вариантов интерфейса в зависимости от участия пользователя.',
    },
    {
        tag: 'production',
        title: 'Релизы и диагностика инцидентов',
        description:
            'Анализ ошибок и регрессий в production через Sentry (stack traces, привязка к релизам) и Kibana (логи, пользовательские сценарии, API-взаимодействие).',
    },
]

const stackGroups = [
    { title: 'Core', items: ['Vue2', 'Vue3', 'Vue.js', 'Nuxt.js', 'TypeScript', 'JavaScript'] },
    { title: 'Состояние и роутинг', items: ['Vuex', 'Pinia', 'vue-router'] },
    { title: 'Real-time и API', items: ['WebSocket', 'REST API', 'Centrifuge', 'SSR'] },
    { title: 'UI и стили', items: ['SCSS / Sass', 'Tailwind', 'Element UI', 'HTML5'] },
    { title: 'Качество и инфраструктура', items: ['Git', 'GitHub Actions / CI-CD', 'Cypress', 'ESLint / Stylelint', 'Docker'] },
    { title: 'Понимание backend', items: ['Node.js', 'PostgreSQL', 'MS SQL', 'SQL'] },
    { title: 'Аналитика', items: ['GTM', 'Яндекс.Метрика'] },
]

const timeline = [
    {
        dates: 'Ноя 2023 — Июл 2026',
        duration: '2 года 9 мес.',
        role: 'Старший разработчик пользовательских интерфейсов',
        company: 'ФЛАУВАУ, Москва',
        description:
            'Разработка и развитие фронтенд-части e-commerce маркетплейса на Nuxt.js 2 / Vue 2.7 / TypeScript. Сервисная архитектура (Onion Architecture), интеграция с backend-API и real-time сервисами, миграция кодовой базы на TypeScript, участие в релизном процессе и production-поддержке.',
    },
    {
        dates: 'Авг 2022 — Окт 2023',
        duration: '1 год 3 мес.',
        role: 'Ведущий разработчик',
        company: 'ООО «Наука», Санкт-Петербург',
        description:
            'Клиентская часть корпоративного мессенджера и админ-панели на Vue 2/3. Проектирование новых модулей, e2e-тесты на Cypress, техническое лидерство небольшой команды фронтенда: код-ревью, декомпозиция задач.',
    },
    {
        dates: 'Дек 2021 — Авг 2022',
        duration: '9 мес.',
        role: 'Фронтенд-разработчик',
        company: 'CoinLoan, Эстония',
        description:
            'Веб-клиент и лендинги крипто-платформы для кредитования и работы с цифровыми активами. Новые модули и UI-компоненты, интеграция с REST API, адаптивная вёрстка по макетам.',
    },
    {
        dates: 'Июл 2018 — Апр 2021',
        duration: '2 года 10 мес.',
        role: 'Фронтенд-разработчик',
        company: 'ЛЕНВЕНДО, Санкт-Петербург',
        description:
            'Разработка и вёрстка фронтенда e-commerce приложений и интернет-магазинов по макетам для МТС, Магнит, Перекрёсток и Эльдорадо: новые страницы и блоки, поддержка и доработка существующих проектов, исправление багов, улучшение производительности и качества вёрстки. Участвовал в редизайне и адаптации интерфейсов: версия сайта для слабовидящих для страховой группы Совкомбанк Страхование, корпоративный сайт Газпромбанка, клуб «Эльдоблог» и интернет-магазин Эльдорадо. Проводил аудит фронтенд-части сайтов и внутренних приложений с рекомендациями по оптимизации (в т.ч. «Империя сумок»), участвовал в оценке тестовых заданий и технических интервью на позиции фронтенд-разработчика/верстальщика.',
        tags: ['Vue.js', 'Backbone', 'JavaScript (ES5+)', 'CSS / SCSS', 'Webpack', 'Gulp'],
    },
]

const earlierTimeline = [
    { company: 'concord', dates: 'Окт 2016 — Дек 2017', text: 'Ведущий разработчик · ХК «Конкорд», СПб — выбор стека, координация команды, Vue.js/Vuex' },
    { company: 'medlinesoft', dates: 'Окт 2014 — Июл 2016', text: 'Медлайнсофт, Москва — SPA медицинской информационной системы, рефакторинг модулей (AngularJS)' },
    { company: 'nic-etu', dates: 'Окт 2013 — Июн 2014', text: 'Инженер-программист БД · НИЦ СПб ЭТУ — PostgreSQL, Sybase, Oracle, MS SQL' },
    { company: 'spb-shipbuilding', dates: 'Окт 2012 — Мар 2013', text: 'Программист · Санкт-Петербургская судостроительная компания — БД, C#/WinForms' },
    { company: 'ntk-inturist', dates: 'Июл 2010 — Окт 2012', text: 'Программист · НТК-Интурист, СПб — системы онлайн-бронирования, ASP.NET/C#' },
    { company: 'general-satellite', dates: 'Июл 2008 — Сен 2010', text: 'Программист · General Satellite, СПб — ERP-система, ASP.NET/C#' },
    { company: 'russian-mir', dates: 'Сен 2004 — Апр 2008', text: 'Программист · Русский Мир, СК, СПб — хранилища данных (OLAP), MS SQL' },
    { company: 'komita', dates: 'Июн 2002 — Авг 2003', text: 'Программист · Комита, ЗАО, СПб — интерфейсы в Oracle Forms 9i' },
    { company: 'education-dept', dates: 'Сен 1999 — Июн 2002', text: 'Техник · ВО Отдел по образованию и культуре — видеомонтаж' },
]

useHead({
    title: 'Роман Пальмин — Senior Frontend / Tech Lead (Vue · Nuxt · TypeScript)',
    meta: [
        {
            name: 'description',
            content:
                'Роман Пальмин — ведущий frontend-разработчик, 23+ лет в разработке, 2.5+ года Senior UI на e-commerce маркетплейсе. Vue, Nuxt, TypeScript, real-time, production-поддержка.',
        },
    ],
})
</script>
