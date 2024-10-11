<template>
<div class="w-full h-fit p-8 flex flex-row items-center justify-end rounded-3xl bg-slate-950">
    <!-- <button class="sm:w-fit w-full h-fit px-16 py-4 flex flex-row items-center justify-center rounded-xl active:bg-lime-400 bg-sol-400 font-bold text-black [&:not(:active)]:hover:gradient-animation transition-all duration-500"
    type="submit"
    >Buy Post</button> -->
    <button
    v-if="connected"
    class="sm:w-fit w-full h-fit px-16 py-4 flex flex-row items-center rounded-xl active:bg-lime-400 bg-sol-400 font-bold text-black [&:not(:active)]:hover:gradient-animation transition-all duration-500"
    @click="$emit('buy')">
    Buy Post
    </button>
    <div class="w-full h-fit flex flex-row items-center sm:justify-end"
    v-else>
    <WalletMultiButton>
        <template #default="modalScope">
            <button class="sm:w-fit w-full h-fit px-16 py-4 flex flex-row items-center justify-center rounded-xl active:bg-lime-400 bg-sol-400 font-bold text-black [&:not(:active)]:hover:gradient-animation transition-all duration-500" 
            :disabled="!canBuy"
            @click="onModalScope( modalScope )"
            v-if="!publicKey"
            >
            Connect Wallet
            </button>
        </template> 
    </WalletMultiButton>
    </div>
</div>
</template>

<script setup lang="ts">
import { useSolanaWallet } from '@/composables/useSolanaWallet';
import { useDebounceFn } from '@vueuse/core';
import { useWallet, WalletMultiButton } from 'solana-wallets-vue';

defineEmits([ 'buy' ]);
const canBuy = defineModel<boolean>('canBuy');
const { publicKey, wallet, disconnect, connected, connecting, signMessage } = useWallet();

function onModalScope( modalScope: any ){
    modalScope.openModal(); 
    canBuy.value = false;
}
</script>