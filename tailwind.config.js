/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ['selector', '[data-theme="dark"]'],
    content: [
        `app/components/**/*.{vue,js,ts}`,
        `app/layouts/**/*.vue`,
        `app/pages/**/*.vue`,
        `app/composables/**/*.{js,ts}`,
        `app/app.vue`,
    ],
    theme: {
        extend: {
            colors: {
                bg: 'var(--bg)',
                'bg-raised': 'var(--bg-raised)',
                text: 'var(--text)',
                'text-dim': 'var(--text-dim)',
                'text-faint': 'var(--text-faint)',
                border: 'var(--border)',
                'border-strong': 'var(--border-strong)',
                accent: 'var(--accent)',
                'accent-soft': 'var(--accent-soft)',
                'accent-contrast': 'var(--accent-contrast)',
            },
            fontFamily: {
                display: ['Fraunces', 'ui-serif', 'Georgia', 'serif'],
                body: ['"IBM Plex Sans"', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
                mono: ['"IBM Plex Mono"', 'ui-monospace', '"SFMono-Regular"', 'Menlo', 'monospace'],
            },
            borderRadius: {
                DEFAULT: 'var(--radius)',
            },
            maxWidth: {
                blog: 'var(--container)',
            },
        },
    },
    plugins: [],
}
