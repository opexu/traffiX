<template>
<div class="w-full h-fit flex flex-col p-4 gap-4 border border-slate-800 rounded-3xl hover:gradient-animation-2 divide-y-2 divide-slate-800">
    <CardHeader
    :account="xAccount"
    />
    <!-- <CardBody 
    :description="xAccount.description"
    /> -->
    <CardFooter
    :price="xAccount.price"
    @buy="isBuyForm = true"
    />

    <Modal :show="isBuyForm">
        <div class="w-full h-2/3 gap-4 flex flex-col items-center justify-center text-white">
            <button class="hover:text-sol-400"
            @click="isBuyForm = false"
            >[ Go back ]</button>
            <BuyForm :x-account="xAccount"/>
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
import { ref } from 'vue';

defineProps<{ xAccount: IXAccount }>();

const isBuyForm = ref( false );
</script>