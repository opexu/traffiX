<template>
<div class="w-full h-auto pl-4 flex flex-row items-start justify-center gap-4 md:gap-4">
    
    <!-- logo block -->
    <div class="min-w-24 min-h-24 flex flex-row items-center justify-center">
        <img :src="account.avatar_url" draggable="false"
        class="w-full h-full rounded-full object-cover active:animate-spin"
        />
    </div>

    <!-- info block -->
    <div class="w-full h-full flex flex-col">
        
        <div class="w-full h-fit flex-wrap flex flex-row items-center justify-between">
            <div class="w-fit h-fit flex flex-row items-center justify-center gap-1">
                <img :src="XSvgSrc" draggable="false"/>
                <p class="font-bold text-white truncate ...">{{ account.name }}</p>
            </div>
            <div class="w-fit h-fit flex flex-row items-center justify-center gap-2">
                <img v-if="account.king" class="min-w-7 min-h-7" :src="KingSrc" draggable="false"/>
                <img v-if="account.flash" class="min-w-7 min-h-7" :src="FlashSrc" draggable="false"/>
            </div>
            <!-- todo stars -->
        </div>
        
        <div class="w-full h-fit flex flex-row items-center justify-between">

        </div>
    </div>
</div>
</template>

<script setup lang="ts">
import { IXAccount } from '@/types/account';
import XSvgSrc from '@/assets/svg/x.svg';
import KingSrc from '@/assets/king.png';
import FlashSrc from '@/assets/flash.png';

defineProps<{
    account: IXAccount;
}>();
</script>