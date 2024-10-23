<template>
<div class="w-full lg:w-5/6 xl:w-2/3 h-50 md:h-20 p-4 gap-4 flex flex-col items-center justify-between">
    <div class="w-full h-fit flex flex-row items-center justify-between">
        <HeaderInfo/>
    
        <HeaderText class="w-full h-full px-4 py-2 flex flex-row items-center justify-center"
        text="Buy Influence, Boost your Meme, Cash out Big!"
        v-if="!isMobile"
        />
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
    
    <HeaderText class="w-full h-full px-4 py-2 flex flex-row items-center justify-center"
    @click="isHeaderTextVisible = false"
    text="Buy Influence, Boost your Meme, Cash out Big!"
    v-if="isMobile && isHeaderTextVisible"
    />
</div>
</template>

<script setup lang="ts">
import { useWallet, WalletMultiButton } from 'solana-wallets-vue';
import HeaderInfo from './HeaderInfo.vue';
import { ref, watch } from 'vue';
import { GTM_EVENTS, useGTMStore } from '@/stores/GTMStore';
import HeaderText from './HeaderText.vue';
import { useBreakpoints } from '@vueuse/core';

const { publicKey, wallet, disconnect, connected, connecting, signMessage, sendTransaction  } = useWallet();

const GTMStore = useGTMStore();
watch( connected, ( value ) => {
    if( value ){
        GTMStore.pushEvent( GTM_EVENTS.CONNECT_WALLET, { 'wallet': wallet.value?.adapter.name })
    }else{
        GTMStore.pushEvent( GTM_EVENTS.DISCONNECT_WALLET, { 'wallet': wallet.value?.adapter.name })
    }
});

const breakpoints = useBreakpoints({
  mobile: 0, // optional
  tablet: 768,
  laptop: 1024,
  desktop: 1280,
})

// true or false
const isMobile = breakpoints.between('mobile', 'tablet');
const isHeaderTextVisible = ref(true);
</script>

<style>
.swv-button {
    @apply w-full text-black px-4 py-3 rounded-2xl text-base;
}

.swv-button-trigger {
    @apply bg-sol-400 justify-center text-black !important;
}
</style>