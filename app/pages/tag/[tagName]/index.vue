<template>
    <div>
        <h1 class="mb-6 font-display text-2xl font-medium">#{{ tagName }}</h1>
        <PostsGrid :posts="posts" />
        <PostsPagination :current-page="1" :total-pages="totalPages" :base-url="`/tag/${tagName}`" />
    </div>
</template>

<script setup lang="ts">
const route = useRoute()
const tagName = route.params.tagName as string

const { posts, totalPages } = await usePaginatedPosts({
    cacheKey: `posts-tag-${tagName}-1`,
    page: 1,
    tag: tagName,
})

useHead({ title: `#${tagName} — romkin.blog` })
</script>
