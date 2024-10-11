<template>
<form ref="form" class="w-full md:w-2/3 2xl:w-3/5 max-h-xl gap-4 flex flex-col items-center justify-center"
    @submit.prevent="submitForm">

    <div class="w-full h-full flex flex-col rounded-3xl bg-slate-950 overflow-hidden">
        <BuyFormHeader :xAccount="xAccount" />
        <Transition name="fade">
        <BuyFormBody :xAccount="xAccount" 
        v-if="!isCongratView"
        />
        <BuyFormCongrat :xAccount="xAccount" 
        v-else
        />
        </Transition>
    </div>

    <BuyFormFooter 
    v-model:canBuy="canBuy"
    @buy="debouncedFn"
    />
</form>
</template>

<script setup lang="ts">
import { IXAccount } from '@/types/account';
import BuyFormHeader from './BuyFormHeader.vue';
import BuyFormBody from './BuyFormBody.vue';
import BuyFormFooter from './BuyFormFooter.vue';
import { ref } from 'vue';
import { useAPIStore } from '@/stores/apiStore';
import { useSolanaWallet } from '@/composables/useSolanaWallet';
import { useDebounceFn } from '@vueuse/core';
import { useWallet } from 'solana-wallets-vue';
import BuyFormCongrat from './BuyFormCongrat.vue';

const props = defineProps<{ xAccount: IXAccount }>();
const form = ref<HTMLFormElement>();
const apiStore = useAPIStore();

const isCongratView = ref( false );

const { publicKey, wallet, disconnect, connected, connecting, signMessage } = useWallet();
const { sendSol } = useSolanaWallet();

const debouncedFn = useDebounceFn( onBuyClick, 1000 )

const canBuy = ref(true);
async function onBuyClick(){
    
    try{
        const TO_ADDRESS = 'GY5CpB1L1BtCW9KANRKyb3jUnN9YguhinkTeCcxv5QEB';
        await sendSol( props.xAccount.price, TO_ADDRESS );
    }finally{
        isCongratView.value = true;
        canBuy.value = true;
    }
    
}

// пока не используется
async function submitForm() {
    if ( !form.value ) {
        console.warn( 'Form invalidated' );
        return;
    }
    const formData = new FormData( form.value );
    formData.append('x_author', props.xAccount.name);
    const xpost = await apiStore.submitAdPost( formData );
    console.log('xpost: ', xpost)
}
</script>