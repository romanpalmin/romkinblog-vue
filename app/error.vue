<template>
    <NuxtLayout>
        <div class="flex min-h-[60vh] flex-col items-center justify-center py-16 text-center">
            <p class="font-display text-8xl font-medium text-accent">404</p>
            <h1 class="mt-6 font-display text-2xl font-medium text-text">Такой страницы нет</h1>
            <p class="mt-3 max-w-sm text-text-dim">
                Ссылка битая, пост переехал в черновики, или её здесь никогда не было.
            </p>
            <NuxtLink
                to="/"
                class="mt-8 rounded border border-border-strong px-4 py-2 text-sm font-medium text-text transition-colors hover:border-accent hover:text-accent"
            >
                На главную
            </NuxtLink>
        </div>
    </NuxtLayout>
</template>

<script setup lang="ts">
defineProps<{ error: { statusCode: number, statusMessage?: string } }>()

useHead({
    title: 'Страница не найдена — romkin.blog',
})
</script>
