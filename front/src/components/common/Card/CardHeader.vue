<template>
<div class="w-full h-auto pl-4 flex flex-row items-start justify-center gap-4 md:gap-4">
    
    <!-- logo block -->
    <div class="relative min-w-24 min-h-24 flex flex-row items-center justify-center">
        <img :src="account.avatar_url" draggable="false"
        class="w-full h-full rounded-full object-cover active:animate-spin"
        @load="onAvatarLoad"
        @error="onAvatarError"
        />
        <div v-if="isAvatarLoading"
        class="absolute top-0 left-0 loader"></div>
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
import ProgressSvgSrc from '@/assets/svg/progress.svg';

import { ref } from 'vue';

const props = defineProps<{
    account: IXAccount;
}>();

const isAvatarLoading = ref(true);
function onAvatarLoad(){
    isAvatarLoading.value = false;
}

function onAvatarError(){
    isAvatarLoading.value = true;
    props.account.avatar_url = XSvgSrc;
}
</script>

<style scoped>
.loader {
    width: 50px;
    aspect-ratio: 1;
    display: grid;
    border: 4px solid #0000;
    border-radius: 50%;
    border-right-color: #25b09b;
    animation: l15 1s infinite linear;
}

.loader::before,
.loader::after {
    content: "";
    grid-area: 1/1;
    margin: 2px;
    border: inherit;
    border-radius: 50%;
    animation: l15 2s infinite;
}

.loader::after {
    margin: 8px;
    animation-duration: 3s;
}

@keyframes l15 {
    100% {
        transform: rotate(1turn)
    }
}
</style>