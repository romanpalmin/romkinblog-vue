<template>
    <div>
        <h1 class="mb-6 font-display text-2xl font-medium">#{{ tagName }}</h1>
        <PostsGrid :posts="posts" />
        <PostsPagination :current-page="currentPage" :total-pages="totalPages" :base-url="`/tag/${tagName}`" />
    </div>
</template>

<script setup lang="ts">
const route = useRoute()
const tagName = route.params.tagName as string
const currentPage = computed(() => Math.max(1, parseInt(route.params.page as string) || 1))

const { posts, totalPages } = await usePaginatedPosts({
    cacheKey: `posts-tag-${tagName}-${currentPage.value}`,
    page: currentPage.value,
    tag: tagName,
})

if (currentPage.value > totalPages) {
    throw createError({ statusCode: 404, statusMessage: 'Страница не найдена' })
}

useHead({ title: `#${tagName} — страница ${currentPage.value} — romkin.blog` })
</script>
