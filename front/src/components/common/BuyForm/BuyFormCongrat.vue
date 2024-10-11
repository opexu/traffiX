<template>
<div class="w-full h-full p-8 flex flex-row items-center justify-start">

    <div class="w-full h-fit p-8 gap-4 flex flex-col items-start ">
        
        <h1 class="text-xl">Congratulations!</h1>

        <h1>Please wait...</h1>

    </div>

</div>
</template>

<script setup lang="ts">
import { IXAccount } from '@/types/account';


defineProps<{ xAccount: IXAccount }>();
</script>