<template>
    <div class="flex min-h-screen flex-col bg-bg text-text">
        <HeaderMain />
        <main class="flex-grow">
            <div class="mx-auto max-w-blog px-4 py-8">
                <slot />
            </div>
        </main>
        <FooterMain />
    </div>
</template>
