<template>
<div class="w-full md:w-2/3 2xl:w-3/5 h-fit gap-4 flex flex-col items-center justify-center">

    <div class="w-full h-fit flex flex-col rounded-3xl bg-slate-950 overflow-hidden">
        <BuyFormHeader :xAccount="xAccount" />
        <Transition name="fade" mode="out-in">
        <BuyFormBody :xAccount="xAccount" 
        v-model:file="file"
        v-model:text="text"
        v-if="BUY_STATE !== BuyState.CONGRATULATION"
        />
        <BuyFormCongrat :xAccount="xAccount" 
        v-else
        />
        </Transition>
    </div>

    <BuyFormFooter 
    v-model:canBuy="canBuy"
    @buy="onBuyClick"
    />

    <Modal :show="BUY_STATE === BuyState.WAIT">
        <div class="w-full h-2/3 gap-4 flex flex-col items-center justify-center text-white">
            <Preloader/>
        </div>
    </Modal>
</div>
</template>

<script setup lang="ts">
import { IXAccount } from '@/types/account';
import BuyFormHeader from './BuyFormHeader.vue';
import BuyFormBody from './BuyFormBody.vue';
import BuyFormFooter from './BuyFormFooter.vue';
import { computed, ref, watch } from 'vue';
import { useAPIStore } from '@/stores/apiStore';
import { useSolanaWallet } from '@/composables/useSolanaWallet';
import { useDebounceFn } from '@vueuse/core';
import BuyFormCongrat from './BuyFormCongrat.vue';
import { BuyState, useBuyState } from '@/stores/buyStateStore';
import { storeToRefs } from 'pinia';
import Modal from '../Modal.vue';
import Preloader from '../Preloader.vue';
import { GTM_EVENTS, useGTMStore } from '@/stores/GTMStore';

const emit = defineEmits([ 'close' ]);
const props = defineProps<{ xAccount: IXAccount }>();
const apiStore = useAPIStore();
const buyStateStore = useBuyState();
const { BUY_STATE } = storeToRefs( buyStateStore );
const { setState } = buyStateStore;
watch( BUY_STATE, ( value ) => { console.log( 'BUY_STATE: ', value ) });


const file = ref<File|null>(null);
const text = ref<string>('');

const { sendSol } = useSolanaWallet();
const GTMStore = useGTMStore();

const canBuy = computed(() => BUY_STATE.value !== BuyState.WAIT );
async function onBuyClick(){
    switch( BUY_STATE.value ){
        case BuyState.POST: {
            setState( BuyState.WAIT );
            GTMStore.pushEvent( GTM_EVENTS.BUY_POST, { name: props.xAccount.name, price: props.xAccount.price });
            try{
                await debouncedFn();
                setState( BuyState.CONGRATULATION );
                GTMStore.pushEvent( GTM_EVENTS.CONGRATULATION_RECEIVED, { name: props.xAccount.name, price: props.xAccount.price });
                console.log('congratulation received')
            }catch(e){
                console.log('catch received')
                setState( BuyState.POST );
            }
            finally{
                
            }
            break;
        }
        case BuyState.CONGRATULATION: {
            emit('close');
            setState( BuyState.POST );
            GTMStore.pushEvent( GTM_EVENTS.CONTINUE_CLICK, { name: props.xAccount.name, price: props.xAccount.price });
            break;
        }
    }
}
const debouncedFn = useDebounceFn( processPost, 1000, { rejectOnCancel: true } )
async function processPost(){
    const TO_ADDRESS = import.meta.env.VITE_WALLET_PUBKEY;
    console.log('TO_ADDRESS: ', TO_ADDRESS)
    submitForm();
    await sendSol( props.xAccount.price, TO_ADDRESS );
}

// пока не используется
async function submitForm() {
    
    const formData = new FormData();
    formData.append('x_author', props.xAccount.name);
    formData.append('text', text.value);
    if( file.value ) formData.append('file', file.value);
    // try{
    //     const xpost = await apiStore.submitAdPost( formData );
    //     console.log('xpost: ', xpost)
    // }finally{

    // }
}

</script>