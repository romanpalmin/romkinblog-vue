<template>
    <div>
        <PostsGrid :posts="posts" />
        <PostsPagination :current-page="currentPage" :total-pages="totalPages" base-url="/" />
    </div>
</template>

<script setup lang="ts">
const route = useRoute()
const currentPage = computed(() => Math.max(1, parseInt(route.params.page as string) || 1))

const { posts, totalPages } = await usePaginatedPosts({
    cacheKey: `posts-live-${currentPage.value}`,
    page: currentPage.value,
})

if (currentPage.value > totalPages) {
    throw createError({ statusCode: 404, statusMessage: 'Страница не найдена' })
}

useHead({ title: `Страница ${currentPage.value} — romkin.blog` })
</script>
