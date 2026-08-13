<template>
    <NuxtLink
        to="/about/author"
        class="block h-9 w-9 shrink-0 overflow-hidden rounded-full border border-border-strong shadow-sm transition-transform duration-200 ease-in-out hover:scale-125"
        aria-label="Об авторе"
        title="Об авторе"
    >
        <img :src="src" :alt="alt" class="h-full w-full object-cover" />
    </NuxtLink>
</template>

<script setup lang="ts">
withDefaults(
    defineProps<{ src?: string; alt?: string }>(),
    {
        src: '/images/cv/photo-edited.jpg',
        alt: 'Роман Пальмин',
    },
)
</script>
