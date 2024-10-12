<template>
<div class="w-full h-full p-8 flex flex-row items-center justify-start">

    <div class="w-full h-fit p-8 gap-4 flex flex-col items-start ">
        
        <h1 class="text-xl">Congratulations!</h1>

        <p class="text-sol-400">Post created</p>

        <p class="text-slate-400">Continue?</p>
    </div>

</div>
</template>

<script setup lang="ts">
import { IXAccount } from '@/types/account';


defineProps<{ xAccount: IXAccount }>();
</script>