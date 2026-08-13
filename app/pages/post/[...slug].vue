<template>
    <article>
        <h1 class="mb-2 font-display text-3xl font-medium text-text">{{ page?.headline || page?.title }}</h1>
        <p class="mb-6 text-sm text-text-faint">
            {{ formattedDate }}
            <span v-if="page?.tags?.length"> · {{ page.tags.join(', ') }}</span>
        </p>
        <ContentRenderer v-if="page" :value="page" class="prose max-w-none" />
    </article>
</template>

<script lang="ts" setup>
const route = useRoute()

const slugPath = computed(() => {
    const slug = route.params.slug
    return Array.isArray(slug) ? slug.join('/') : slug
})

const { data: page } = await useAsyncData(`page-${route.path}`, () => {
    return queryCollection('post').path(`/post/${slugPath.value}`).first()
})

if (!page.value) {
    throw createError({ statusCode: 404, statusMessage: 'Статья не найдена', fatal: false })
}

const formattedDate = computed(() => {
    return page.value?.date
        ? new Date(page.value.date).toLocaleDateString('ru-RU', { year: 'numeric', month: 'long', day: 'numeric' })
        : ''
})

// OG/Twitter meta-паритет с romkinblogsimple (PRD.md §7) — перенесено дословно.
useHead({
    title: page.value.title || 'Статья — romkin.blog',
    meta: [
        { name: 'description', content: page.value.description || page.value.excerpt || 'Статья на блоге romkin.blog' },
        { property: 'og:title', content: page.value.title || 'Статья — romkin.blog' },
        { property: 'og:description', content: page.value.description || page.value.excerpt || 'Статья на блоге romkin.blog' },
        { property: 'og:image', content: page.value.image || 'https://romkin.blog/default-og-image.jpg' },
        { property: 'og:url', content: `https://romkin.blog${route.path}` },
        { property: 'og:site_name', content: 'romkin.blog' },
        { property: 'og:type', content: 'article' },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: page.value.title || 'Статья — romkin.blog' },
        { name: 'twitter:description', content: page.value.description || page.value.excerpt || 'Статья на блоге romkin.blog' },
        { name: 'twitter:image', content: page.value.image || 'https://romkin.blog/default-og-image.jpg' },
        { name: 'author', content: page.value.author || 'romkin.blog' },
        { name: 'article:published_time', content: page.value.date ? new Date(page.value.date).toISOString() : '' },
        { name: 'keywords', content: page.value.tags?.join(', ') || '' },
    ],
})
</script>
