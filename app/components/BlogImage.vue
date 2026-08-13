<template>
    <figure class="my-6">
        <img
            v-if="src"
            :src="src"
            :alt="alt || 'Иллюстрация к статье'"
            :title="title"
            class="w-full rounded shadow-lg"
            loading="lazy"
            decoding="async"
        >
        <div
            v-else
            class="flex h-64 w-full items-center justify-center rounded bg-bg-raised text-text-faint"
        >
            <span>Изображение не загружено</span>
        </div>

        <figcaption v-if="caption" class="mt-2 text-center text-sm italic text-text-faint">
            {{ caption }}
        </figcaption>
    </figure>
</template>

<script setup lang="ts">
interface Props {
    src?: string
    alt?: string
    title?: string
    caption?: string
}

withDefaults(defineProps<Props>(), {
    alt: '',
    title: '',
    caption: '',
})
</script>
