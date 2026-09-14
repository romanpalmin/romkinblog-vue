<template>
    <figure class="quote-block relative my-8 rounded border border-border bg-bg-raised px-6 py-6 sm:px-10 sm:py-7">
        <span class="quote-glyph" aria-hidden="true">&ldquo;</span>

        <blockquote class="quote-body relative font-display text-lg italic leading-relaxed text-text sm:text-xl">
            <slot />
        </blockquote>

        <figcaption v-if="hasMeta" class="mt-4 flex flex-wrap items-baseline gap-x-2 text-sm not-italic text-text-dim">
            <span v-if="author" class="font-medium text-text">{{ author }}</span>
            <span v-if="author && hasSourceOrLink" class="text-text-faint" aria-hidden="true">·</span>
            <a
                v-if="link"
                :href="link"
                target="_blank"
                rel="noopener noreferrer"
                class="text-accent hover:underline"
            >{{ sourceLabel }}</a>
            <span v-else-if="source">{{ source }}</span>
            <span v-if="(author || hasSourceOrLink) && date" class="text-text-faint" aria-hidden="true">·</span>
            <span v-if="date" class="text-text-faint">{{ date }}</span>
        </figcaption>

        <p v-if="note" class="quote-note mt-2 text-sm not-italic text-text-faint">
            {{ note }}
        </p>
    </figure>
</template>

<script setup lang="ts">
interface Props {
    author?: string
    date?: string
    link?: string
    source?: string
    note?: string
}

const props = withDefaults(defineProps<Props>(), {
    author: '',
    date: '',
    link: '',
    source: '',
    note: '',
})

const hasSourceOrLink = computed(() => !!(props.source || props.link))
const hasMeta = computed(() => !!(props.author || hasSourceOrLink.value || props.date))

// Если ссылка есть, а подписи для неё (source) нет — показываем хост
// ссылки вместо голого длинного URL.
const sourceLabel = computed(() => {
    if (props.source) return props.source
    if (!props.link) return ''
    try {
        return new URL(props.link).hostname.replace(/^www\./, '')
    }
    catch {
        return props.link
    }
})
</script>

<style scoped>
.quote-glyph {
    @apply font-display;
    position: absolute;
    top: -0.35rem;
    left: 1.1rem;
    font-size: 4.5rem;
    line-height: 1;
    color: var(--accent-soft);
    pointer-events: none;
    user-select: none;
}

.quote-body {
    padding-left: 2.25rem;
}

.quote-body :deep(p) {
    margin: 0;
}

.quote-body :deep(p + p) {
    margin-top: 0.75em;
}

.quote-note {
    padding-left: 2.25rem;
}
</style>
