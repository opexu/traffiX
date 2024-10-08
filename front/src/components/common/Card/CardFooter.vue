<template>
    <div class="w-full h-fit p-4 flex flex-row items-center justify-center gap-4">
        <div class="group max-w-44 w-36 h-auto px-4 flex flex-row items-center justify-center gap-2">
            <p class="animate-pulse group-active:animate-spin font-bold text-white">{{ price }}</p>
            <img class="active:animate-ping" :src="solLogoSrc" alt="Logo" />
        </div>
        <button
        class="w-full h-fit py-3 rounded-2xl items-center justify-center text-center font-bold active:bg-lime-400 bg-sol-400 [&:not(:active)]:hover:gradient-animation transition-all duration-500"
        @click="placeBid">Bid</button>
    </div>
</template>

<script setup lang="ts">
import solLogoSrc from '@/assets/svg/solana-sol-logo-1.svg';

defineProps<{ price: number }>();

function placeBid() {

}
</script>

<style scoped>
</style>