<template>
    <div>
        <h1 class="mb-6 font-display text-2xl font-medium capitalize">{{ categoryName }}</h1>
        <PostsGrid :posts="posts" />
        <PostsPagination :current-page="1" :total-pages="totalPages" :base-url="`/category/${categoryName}`" />
    </div>
</template>

<script setup lang="ts">
const route = useRoute()
const categoryName = route.params.categoryName as string

const { posts, totalPages } = await usePaginatedPosts({
    cacheKey: `posts-category-${categoryName}-1`,
    page: 1,
    category: categoryName,
})

useHead({ title: `${categoryName} — romkin.blog` })
</script>
