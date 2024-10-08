<template>
<div class="w-full h-fit flex flex-col p-4 border border-slate-800 rounded-lg">
    <CardHeader/>
    <CardBody 
    :description="xAccount.description"
    />
    <CardFooter
    :price="xAccount.price"
    />
</div>
</template>

<script setup lang="ts">
import { IXAccount } from '@/types/account';
import CardBody from './CardBody.vue';
import CardFooter from './CardFooter.vue';
import CardHeader from './CardHeader.vue';

defineProps<{ xAccount: IXAccount }>()
</script>