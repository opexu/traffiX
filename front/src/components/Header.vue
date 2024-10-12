<template>
<div class="w-full lg:w-5/6 xl:w-2/3 h-20 p-4 gap-4 flex flex-row items-center justify-between">

    <HeaderInfo/>
    
    <WalletMultiButton>
        <template #default="modalScope">
            <button class="w-full h-fit px-4 py-4 rounded-2xl items-center justify-center text-center text-xs md:text-base whitespace-nowrap font-bold active:bg-lime-400 bg-sol-400 [&:not(:active):not(:disabled)]:hover:gradient-animation transition-all duration-500" 
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
import { watch } from 'vue';
import { GTM_EVENTS, useGTMStore } from '@/stores/GTMStore';

const { publicKey, wallet, disconnect, connected, connecting, signMessage, sendTransaction  } = useWallet();

const GTMStore = useGTMStore();
watch( connected, ( value ) => {
    if( value ){
        GTMStore.pushEvent( GTM_EVENTS.CONNECT_WALLET, { 'wallet': wallet.value?.adapter.name })
    }else{
        GTMStore.pushEvent( GTM_EVENTS.DISCONNECT_WALLET, { 'wallet': wallet.value?.adapter.name })
    }
})
</script>

<style>
.swv-button {
    @apply w-full text-black px-4 py-3 rounded-2xl text-base;
}

.swv-button-trigger {
    @apply bg-sol-400 justify-center text-black !important;
}
</style>