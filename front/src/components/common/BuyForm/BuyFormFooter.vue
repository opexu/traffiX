<template>
<div class="w-full h-fit p-4 md:p-8 flex flex-row items-center justify-end rounded-3xl bg-slate-950">
    
    <div class="w-full h-fit gap-4 flex sm:flex-row flex-col items-center justify-between"
    v-if="connected"
    >
        <div class="wallet-button-root h-full flex flex-row items-center justify-center">
        <WalletMultiButton>
            <template #default="modalScope">
                <button class="sm:w-fit w-full h-fit px-16 py-4 flex flex-row items-center justify-center rounded-xl active:bg-lime-400 bg-sol-400 font-bold text-black [&:not(:active)]:hover:gradient-animation transition-all duration-500" 
                v-if="!publicKey"
                >
                Connect Wallet
                </button>
            </template> 
        </WalletMultiButton>
        </div>
        <button
        class="sm:w-fit w-full h-fit px-16 py-4 flex flex-row items-center justify-center rounded-xl active:bg-lime-400 bg-sol-400 font-bold text-black [&:not(:active)]:hover:gradient-animation transition-all duration-500"
        @click.stop.prevent="$emit('buy')">
            <p>{{ btnText }}</p>
        </button>
    </div>
    

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
import { BuyState, useBuyState } from '@/stores/buyStateStore';
import { storeToRefs } from 'pinia';
import { useWallet, WalletMultiButton } from 'solana-wallets-vue';
import { computed } from 'vue';

defineEmits([ 'buy' ]);
const canBuy = defineModel<boolean>('canBuy');
const { publicKey, wallet, disconnect, connected, connecting, signMessage } = useWallet();
const buyStateStore = useBuyState();
const { BUY_STATE } = storeToRefs( buyStateStore );
const btnText = computed(() => {
    switch( BUY_STATE.value ){
        case BuyState.CONGRATULATION: { return 'Continue'; }
        default: { return 'Buy Post'; }
    }
})

function onModalScope( modalScope: any ){
    modalScope.openModal();
}

</script>

<style>
.wallet-button-root > div > div {
    @apply w-full sm:w-fit;
}
.wallet-button-root > div {
    @apply w-full sm:w-fit;
}
.wallet-button-root {
    @apply w-full sm:w-fit;
}
</style>