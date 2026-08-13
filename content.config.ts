import { defineContentConfig, defineCollection, z } from '@nuxt/content'

export default defineContentConfig({
    collections: {
        post: defineCollection({
            source: 'post/**.md',
            type: 'page',
            schema: z.object({
                title: z.string(),
                headline: z.string(),
                date: z.date(),
                excerpt: z.string().optional(),
                description: z.string(),
                image: z.string(),
                imageAlt: z.string(),
                imageCaption: z.string().optional(),
                tags: z.array(z.string()),
                categories: z.array(z.string()),
                author: z.string(),
                // Задел на будущее (Phase 7, PRD §6) — не используется в Phase 1.
                telegramMessageUrl: z.string().optional(),
            }),
        }),
    },
})
