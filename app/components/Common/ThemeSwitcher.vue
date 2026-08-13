<template>
    <ClientOnly>
        <button
            type="button"
            class="flex h-8 w-8 items-center justify-center rounded-full border border-border-strong text-text transition-colors hover:border-accent hover:text-accent"
            :aria-label="isDark ? 'Включить светлую тему' : 'Включить тёмную тему'"
            @click="colorMode.preference = isDark ? 'light' : 'dark'"
        >
            <span class="font-mono text-xs">{{ isDark ? '☾' : '☀' }}</span>
        </button>
        <template #fallback>
            <div class="h-8 w-8 rounded-full border border-border-strong" />
        </template>
    </ClientOnly>
</template>

<script setup lang="ts">
const colorMode = useColorMode()
const isDark = computed(() => colorMode.value === 'dark')
</script>
