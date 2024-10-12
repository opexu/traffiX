<template>
<div class="w-full h-24 px-4 flex flex-row items-start justify-center gap-4 md:gap-4">
    
    <!-- logo block -->
    <div class="relative min-w-24 min-h-24 flex flex-row items-center justify-center">
        <img :src="xAccount.avatar_url" draggable="false"
        class="w-full h-full rounded-full object-cover active:animate-spin shadow-[0_0_24px_2px_rgba(134,239,172,0.5)]"
        @load="onAvatarLoad"
        @error="onAvatarError"
        />
        <div v-if="isAvatarLoading"
        class="absolute top-0 left-0 loader"></div>
    </div>

    <!-- info block -->
    <div class="w-full h-full flex flex-row items-start gap-1 truncate">
        <img :src="XSvgSrc" class="min-w-2 h-auto" draggable="false"/>
        <div class="w-full h-full flex flex-col gap-2 justify-between truncate ...">
            <div class="w-full h-fit flex-wrap flex flex-row items-center justify-between gap-1">
                <a class="w-auto font-bold text-white hover:text-sol-400 truncate ..." :href="xProfileLink" target="_blank" rel="noopener noreferrer">{{ xAccount.name }}</a>
                <div class="w-fit h-fit flex flex-row items-center justify-center gap-2">
                    <img v-if="xAccount.king" class="max-w-6 max-h-6 object-contain" :src="KingSrc" draggable="false"/>
                    <img v-if="xAccount.flash" class="max-w-6 max-h-6 object-contain" :src="FlashSrc" draggable="false"/>
                </div>
            </div>
            <div class="w-full h-fit flex-wrap flex flex-row items-center justify-between text-sm truncate">
                <div class="w-fit h-fit gap-2 flex flex-row items-center justify-center">
                    <PersonSvg class="fill-slate-400"/>
                    <p class="text-slate-400 truncate ...">{{ formatFollowers }}</p>
                </div>
                
                <div class="w-fit h-fit gap-2 flex flex-row items-center justify-center"
                v-if="formatAverageViews"
                >
                    <EyeSvg class="fill-sol-400"/>
                    <p class="text-sol-400 truncate ...">{{ formatAverageViews }}</p>
                </div>
                
            </div>
            
        </div>
        
    </div>
</div>
</template>

<script setup lang="ts">
import { IXAccount } from '@/types/account';
import XSvgSrc from '@/assets/svg/x.svg';
import KingSrc from '@/assets/king.png';
import FlashSrc from '@/assets/flash.png';
import EyeSvg from '@/assets/svg/Eye.vue';
import PersonSvg from '@/assets/svg/Person.vue';

import { computed, ref } from 'vue';
import { Utils } from '@/scripts/utils';

const props = defineProps<{
    xAccount: IXAccount;
}>();

const xProfileLink = computed(() => 'https://twitter.com/' + props.xAccount.name );
const formatFollowers = computed(() => Utils.formatNumber( props.xAccount.followers_number ) );
const formatAverageViews = computed(() => props.xAccount.average_views ? Utils.formatNumber( props.xAccount.average_views ) : 0 );

const isAvatarLoading = ref(true);
function onAvatarLoad(){
    isAvatarLoading.value = false;
}

function onAvatarError(){
    isAvatarLoading.value = true;
    props.xAccount.avatar_url = XSvgSrc;
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