<template>
    <div>
        <PostsGrid :posts="posts" />
        <PostsPagination :current-page="1" :total-pages="totalPages" base-url="/" />
    </div>
</template>

<script setup lang="ts">
const { posts, totalPages } = await usePaginatedPosts({ cacheKey: 'posts-dev-1', page: 1, category: 'dev' })

useHead({
    title: 'romkin.blog',
    meta: [{ name: 'description', content: 'Список последних статей romkin.blog' }],
})
</script>
