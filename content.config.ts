import { defineContentConfig, defineCollection } from '@nuxt/content'
import { postSchema } from './scripts/lib/post-schema.mjs'

export default defineContentConfig({
    collections: {
        post: defineCollection({
            source: 'post/**.md',
            type: 'page',
            // Схема вынесена в scripts/lib/post-schema.mjs — тот же контракт
            // использует generate-post.mjs, чтобы не расходиться (PRD.md §7 Phase 2).
            schema: postSchema,
        }),
    },
})
