<template>
    <NuxtLink
        :to="path"
        class="flex flex-col gap-4 py-6 transition-opacity hover:opacity-90 sm:flex-row sm:gap-6"
    >
        <div class="overflow-hidden rounded border border-border bg-bg-raised sm:w-56 sm:flex-shrink-0">
            <img :src="imageSrc" :alt="imageAlt" class="h-44 w-full object-cover sm:h-36" />
        </div>
        <div class="min-w-0 flex-1">
            <h2 class="mb-2 font-display text-lg font-medium text-text">{{ headline }}</h2>
            <p class="mb-3 text-sm text-text-dim">{{ excerpt || description }}</p>
            <div class="flex flex-wrap gap-2">
                <span
                    v-for="tag in tags"
                    :key="tag"
                    class="rounded bg-accent-soft px-2 py-0.5 text-xs text-text-faint"
                >
                    {{ tag }}
                </span>
            </div>
        </div>
    </NuxtLink>
</template>

<script setup lang="ts">
import { PLACEHOLDER_IMAGE } from '~/utils/constants'

const props = defineProps<{
    headline: string
    description?: string
    excerpt?: string
    tags?: string[]
    path: string
    image?: string
    imageAlt?: string
}>()

const imageSrc = computed(() => props.image?.trim() || PLACEHOLDER_IMAGE)
</script>
