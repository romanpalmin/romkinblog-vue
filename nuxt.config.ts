// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    modules: [
        '@nuxt/content',
        '@nuxt/icon',
        '@nuxtjs/tailwindcss',
        '@nuxtjs/color-mode',
    ],
    css: [
        './app/assets/css/main.css',
    ],
    colorMode: {
        classSuffix: '',
        preference: 'system',
        fallback: 'light',
        storageKey: 'romkinblog-color-scheme',
        dataValue: 'theme',
    },
    app: {
        head: {
            link: [
                { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
                { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
                {
                    rel: 'stylesheet',
                    href: 'https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,500;0,9..144,600;1,9..144,500&family=IBM+Plex+Mono:wght@400;500;600&family=IBM+Plex+Sans:wght@400;500;600&display=swap',
                },
            ],
        },
    },
    nitro: {
        prerender: {
            autoSubfolderIndex: false,
            crawlLinks: true,
            routes: ['/'],
        },
    },
    devtools: { enabled: true },
    future: {
        compatibilityVersion: 4,
    },
    compatibilityDate: '2026-08-13',
    experimental: {
        payloadExtraction: false,
    },
    router: {
        options: {
            strict: false,
        },
    },
    sourcemap: false,
    routeRules: {
        '/': { ssr: true },
        '/post/**': { prerender: true },
    },
})
