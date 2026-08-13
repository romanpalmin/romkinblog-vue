<template>
    <footer class="border-t border-border py-8">
        <div class="mx-auto flex max-w-blog flex-col items-center gap-2 px-4 text-sm text-text-faint md:flex-row md:justify-between">
            <span>© {{ year }} romkin.blog</span>
            <a href="https://t.me/jromkin" target="_blank" rel="noopener" class="hover:text-accent">Telegram</a>
        </div>
    </footer>
</template>

<script setup lang="ts">
const year = new Date().getFullYear()
</script>
