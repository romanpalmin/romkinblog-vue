<template>
    <div>
        <PostsGrid :posts="posts" />
        <PostsPagination :current-page="1" :total-pages="totalPages" base-url="/live" />
    </div>
</template>

<script setup lang="ts">
const { posts, totalPages } = await usePaginatedPosts({ cacheKey: 'posts-live-1', page: 1 })

useHead({
    title: 'Live — romkin.blog',
    meta: [{ name: 'description', content: 'Все статьи romkin.blog подряд, без разбивки по разделам' }],
})
</script>
