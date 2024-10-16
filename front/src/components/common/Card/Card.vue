<template>
<div class="w-full h-fit flex flex-col p-4 gap-4 border border-slate-800 rounded-3xl hover:gradient-animation-2 divide-y-2 divide-slate-800"
:class="[ xAccount.bounce ? 'animate-bounce-2' : '']"
@click="onEmptyCardClick"
>
    <CardHeader
    :xAccount="xAccount"
    />
    <!-- <CardBody 
    :description="xAccount.description"
    /> -->
    <CardFooter
    :price="xAccount.price"
    @buy="isBuyForm = true"
    />

    <Modal :show="isBuyForm">
        <div class="w-full h-fit gap-2 md:gap-4 flex flex-col items-center justify-center text-white">
            <button class="hover:text-sol-400"
            @click.stop.prevent="isBuyForm = false"
            >[ Go back ]</button>
            <BuyForm 
            :xAccount="xAccount"
            @close="isBuyForm = false"
            />
        </div>
    </Modal>
</div>
</template>

<script setup lang="ts">
import type { IXAccount } from '@/types/account';
import CardBody from './CardBody.vue';
import CardFooter from './CardFooter.vue';
import CardHeader from './CardHeader.vue';
import Modal from '../Modal.vue';
import BuyForm from '../BuyForm/BuyForm.vue';
import { ref, watch } from 'vue';
import { GTM_EVENTS, useGTMStore } from '@/stores/GTMStore';

const props = defineProps<{ xAccount: IXAccount }>();

const isBuyForm = ref( false );

const GTMStore = useGTMStore();
watch( isBuyForm, ( value ) => {
    if( value ) GTMStore.pushEvent( GTM_EVENTS.BUY_CARD_CLICK, { name: props.xAccount.name, price: props.xAccount.price } );
    else GTMStore.pushEvent( GTM_EVENTS.GO_BACK_CLICK, { name: props.xAccount.name, price: props.xAccount.price });
});

function onEmptyCardClick(){
    GTMStore.pushEvent( GTM_EVENTS.EMPTY_CARD_CLICK, { name: props.xAccount.name } );
    isBuyForm.value = true;
}
</script>