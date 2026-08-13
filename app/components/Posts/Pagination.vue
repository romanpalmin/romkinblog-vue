<template>
    <nav v-if="totalPages > 1" class="mt-10 flex justify-center gap-1">
        <NuxtLink
            v-for="page in pages"
            :key="page"
            :to="getPageLink(page)"
            class="rounded px-3 py-1.5 text-sm transition-colors"
            :class="page === currentPage
                ? 'bg-accent text-accent-contrast'
                : 'text-text-dim hover:bg-accent-soft'"
        >
            {{ page }}
        </NuxtLink>
    </nav>
</template>

<script setup lang="ts">
const props = defineProps<{
    currentPage: number
    totalPages: number
    baseUrl: string
}>()

const pages = computed(() => {
    const start = Math.max(1, props.currentPage - 2)
    const end = Math.min(props.totalPages, props.currentPage + 2)
    return Array.from({ length: end - start + 1 }, (_, i) => start + i)
})

const getPageLink = (page: number) => {
    const normalizedBase = props.baseUrl.replace(/\/$/, '')
    return page === 1 ? (normalizedBase || '/') : `${normalizedBase}/page/${page}`
}
</script>
