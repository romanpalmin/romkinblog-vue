<template>
    <div>
        <h1 class="mb-6 font-display text-2xl font-medium capitalize">{{ categoryName }}</h1>
        <PostsGrid :posts="posts" />
        <PostsPagination :current-page="currentPage" :total-pages="totalPages" :base-url="`/category/${categoryName}`" />
    </div>
</template>

<script setup lang="ts">
const route = useRoute()
const categoryName = route.params.categoryName as string
const currentPage = computed(() => Math.max(1, parseInt(route.params.page as string) || 1))

const { posts, totalPages } = await usePaginatedPosts({
    cacheKey: `posts-category-${categoryName}-${currentPage.value}`,
    page: currentPage.value,
    category: categoryName,
})

if (currentPage.value > totalPages) {
    throw createError({ statusCode: 404, statusMessage: 'Страница не найдена' })
}

useHead({ title: `${categoryName} — страница ${currentPage.value} — romkin.blog` })
</script>
