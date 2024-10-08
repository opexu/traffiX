<template>
<form ref="form" class="w-full md:w-2/3 2xl:w-3/5 max-h-xl gap-4 flex flex-col items-center justify-center"
    @submit.prevent="submitForm">

    <div class="w-full h-full flex flex-col rounded-3xl bg-slate-950 overflow-hidden">
        <BuyFormHeader :x-account="xAccount" />
        <BuyFormBody :x-account="xAccount" />
    </div>

    <BuyFormFooter />
</form>
</template>

<script setup lang="ts">
import { IXAccount } from '@/types/account';
import BuyFormHeader from './BuyFormHeader.vue';
import BuyFormBody from './BuyFormBody.vue';
import BuyFormFooter from './BuyFormFooter.vue';
import { ref } from 'vue';
import { useAPIStore } from '@/stores/apiStore';

defineProps<{ xAccount: IXAccount }>();
const form = ref<HTMLFormElement>();
const apiStore = useAPIStore();

async function submitForm() {
    if ( !form.value ) {
        console.warn( 'Form invalidated' );
        return;
    }
    const formData = new FormData( form.value );

    await apiStore.submitAdPost( formData );
    
}
</script>