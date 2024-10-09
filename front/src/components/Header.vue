<template>
<div class="w-full h-20 p-4 gap-4 flex flex-row items-center justify-between">

    <HeaderInfo/>
    
    <WalletMultiButton >
        <!-- <template #default="modalScope">
            <button class="group px-4 py-3 bg-sol-400 rounded-xl font-bold text-xs sm:text-base whitespace-nowrap hover:gradient-animation" @click="modalScope.openModal()"
            v-if="!publicKey"
            >
                <p class="group-hover:animate-bounce">Connect wallet</p>
            </button>
        </template> -->
    </WalletMultiButton>
</div>
</template>

<script setup lang="ts">
import { useWallet, WalletMultiButton } from 'solana-wallets-vue';
import HeaderInfo from './HeaderInfo.vue';

const { publicKey, wallet, disconnect, connected, connecting, signMessage } = useWallet();

</script>

<style>
.swv-button {
    @apply rounded-xl w-full text-black;
}

.swv-button-trigger {
    @apply bg-sol-400 justify-center text-black !important;
}
</style>