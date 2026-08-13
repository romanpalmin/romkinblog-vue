import { ITEMS_PER_PAGE } from '~/utils/constants'

interface PaginatedPostsOptions {
    cacheKey: string
    page: number
    category?: string
    tag?: string
}

/**
 * Общая загрузка + фильтрация + пагинация постов для `/`, `/category/*`, `/tag/*`.
 * Фильтрация происходит в JS (не в SQL-запросе `@nuxt/content`) — для личного блога
 * с десятками, не тысячами постов, простая и надёжная сортировка/фильтр списка
 * в памяти предпочтительнее гадания с версией query-API коллекции.
 */
export async function usePaginatedPosts(options: PaginatedPostsOptions) {
    const { cacheKey, page, category, tag } = options

    const { data } = await useAsyncData(cacheKey, async () => {
        const all = await queryCollection('post').order('date', 'DESC').all()

        const filtered = all.filter((post) => {
            if (category && !post.categories?.includes(category)) return false
            if (tag && !post.tags?.includes(tag)) return false
            return true
        })

        const total = filtered.length
        const start = (page - 1) * ITEMS_PER_PAGE
        const posts = filtered.slice(start, start + ITEMS_PER_PAGE)

        return { posts, total }
    })

    const posts = data.value?.posts ?? []
    const total = data.value?.total ?? 0
    const totalPages = Math.max(1, Math.ceil(total / ITEMS_PER_PAGE))

    return { posts, total, totalPages }
}
