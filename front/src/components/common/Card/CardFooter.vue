<template>
    <div class="w-full h-fit pt-4 flex flex-row items-center justify-center gap-4">
        <div class="group max-w-44 w-36 h-auto px-4 flex flex-row items-center justify-center gap-2">
            <p class="animate-pulse group-active:animate-spin font-bold text-white">{{ price }}</p>
            <img class="active:animate-ping" :src="solLogoSrc" alt="Logo" draggable="false"/>
        </div>
        <button
        v-if="connected"
        class="w-full h-fit py-3 rounded-2xl items-center justify-center text-center font-bold active:bg-lime-400 bg-sol-400 [&:not(:active):not(:disabled)]:hover:gradient-animation transition-all duration-500"
        @click="$emit('buy')">
        Buy
        </button>
        <div class="w-full h-fit"
        v-else>
        <WalletMultiButton>
            <template #default="modalScope">
                <button class="w-full h-fit py-3 rounded-2xl items-center justify-center text-center font-bold active:bg-lime-400 bg-sol-400 [&:not(:active):not(:disabled)]:hover:gradient-animation transition-all duration-500" 
                @click="modalScope.openModal"
                v-if="!publicKey"
                >
                Buy
                </button>
            </template> 
        </WalletMultiButton>
        </div>
    </div>
</template>

<script setup lang="ts">
import solLogoSrc from '@/assets/svg/solana-sol-logo-1.svg';
import { useWallet, WalletMultiButton } from 'solana-wallets-vue';

defineEmits([ 'buy' ]);
defineProps<{ price: number, canBuy: boolean }>();

const { publicKey, wallet, disconnect, connected, connecting, signMessage } = useWallet();

</script>

<style scoped>
</style>