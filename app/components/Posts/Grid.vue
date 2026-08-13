<template>
    <div v-if="posts.length" class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <PostsCard
            v-for="post in posts"
            :key="post.path"
            :headline="post.headline"
            :description="post.description"
            :excerpt="post.excerpt"
            :tags="post.tags"
            :path="post.path"
            :image="post.image"
            :image-alt="post.imageAlt"
        />
    </div>
    <p v-else class="py-12 text-center text-text-faint">Статей пока нет</p>
</template>

<script setup lang="ts">
defineProps<{ posts: any[] }>()
</script>
