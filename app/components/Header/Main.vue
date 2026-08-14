<template>
    <header class="sticky top-0 z-10 border-b border-border bg-bg/90 backdrop-blur-sm">
        <div class="mx-auto flex h-14 max-w-blog items-center justify-between px-4">
            <NuxtLink to="/" class="font-display text-lg font-medium text-text">
                romkin<span class="text-accent">.</span>blog
            </NuxtLink>

            <button
                class="p-2 text-text md:hidden"
                :aria-expanded="isMenuOpen"
                aria-label="Меню"
                @click="isMenuOpen = !isMenuOpen"
            >
                <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                        v-if="!isMenuOpen"
                        stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M4 6h16M4 12h16M4 18h16"
                    />
                    <path
                        v-else
                        stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M6 18L18 6M6 6l12 12"
                    />
                </svg>
            </button>

            <nav class="hidden items-center gap-6 md:flex">
                <NuxtLink
                    v-for="link in NAV_LINKS"
                    :key="link.url"
                    :to="link.url"
                    class="text-sm font-medium text-text-dim transition-colors hover:text-accent"
                    active-class="text-accent"
                >
                    {{ link.title }}
                </NuxtLink>
                <CommonThemeSwitcher />
                <CommonAvatar />
            </nav>
        </div>

        <transition name="fade">
            <nav v-show="isMenuOpen" class="flex flex-col gap-4 border-t border-border px-4 py-4 md:hidden">
                <NuxtLink
                    v-for="link in NAV_LINKS"
                    :key="link.url"
                    :to="link.url"
                    class="text-sm font-medium text-text-dim"
                    @click="isMenuOpen = false"
                >
                    {{ link.title }}
                </NuxtLink>
                <div class="flex items-center gap-4 pt-2">
                    <CommonThemeSwitcher />
                    <CommonAvatar />
                </div>
            </nav>
        </transition>
    </header>
</template>

<script setup lang="ts">
import { NAV_LINKS } from '~/utils/constants'

const isMenuOpen = ref(false)
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
    transition: opacity 0.15s ease;
}
.fade-enter-from, .fade-leave-to {
    opacity: 0;
}
</style>
