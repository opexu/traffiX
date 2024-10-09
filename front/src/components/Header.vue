<template>
<div class="w-full h-20 p-4 gap-4 flex flex-row items-center justify-between">

    <HeaderInfo/>
    
    <WalletMultiButton>
        <template #default="modalScope">
            <button class="w-full h-fit px-4 py-3 rounded-2xl items-center justify-center text-center text-xs md:text-base whitespace-nowrap font-bold active:bg-lime-400 bg-sol-400 [&:not(:active):not(:disabled)]:hover:gradient-animation transition-all duration-500" 
            @click="modalScope.openModal"
            v-if="!publicKey"
            >
            Connect Wallet
            </button>
        </template> 
    </WalletMultiButton>
</div>
</template>

<script setup lang="ts">
import { useWallet, WalletMultiButton } from 'solana-wallets-vue';
import HeaderInfo from './HeaderInfo.vue';

const { publicKey, wallet, disconnect, connected, connecting, signMessage, sendTransaction  } = useWallet();

</script>

<style>
.swv-button {
    @apply rounded-xl w-full text-black;
}

.swv-button-trigger {
    @apply bg-sol-400 justify-center text-black !important;
}
</style>