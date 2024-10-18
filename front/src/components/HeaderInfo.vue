<template>
<div class="w-fit h-full gap-4 flex flex-row items-center justify-center">
    <img :src="PinSrc" class="w-fit h-fit hover:animate-bounce active:animate-ping" draggable="false"/>
    <div class="w-fit h-fit flex-wrap flex flex-col text-white whitespace-nowrap">
        <div class="w-36 sm:w-24 h-fit flex-wrap flex flex-row items-center justify-between text-sm md:text-base">

            <button class="hover:text-sol-400"
            @click="howItWorks = !howItWorks"
            >[ How it works ]</button>
                        
            <div class="w-full h-fit gap-2 flex flex-row items-center justify-between">
                <a class="hover:text-sol-400" href="https://x.com/degenbuzz_space" target="_blank" rel="noopener noreferrer"
                >[ X ]</a>

                <a class="hover:text-sol-400" href="https://t.me/degenbuzzsupport" target="_blank" rel="noopener noreferrer"
                >[ Support ]</a>
            </div>
            
        </div>
    </div>
    
    <Modal :show="howItWorks">
        <div class="w-full h-2/3 gap-4 flex flex-col items-center justify-center text-white">
            <button class="hover:text-sol-400"
            @click="howItWorks = false"
            >[ Go back ]</button>
            <div class="max-w-xl h-fit py-16 px-8 gap-8 rounded-3xl flex flex-col items-start justify-start bg-slate-950">
                <h1 class="text-3xl">How it works:</h1>
                <p class="text-sol-400">DegenBuzz is a free scam platform, where all crypto payments are safe</p>
                <p><span class="text-slate-300">Step</span> <span class="text-sol-400">1:</span> Pick influencer that you like</p>
                <p><span class="text-slate-300">Step</span> <span class="text-sol-400">2:</span> Make a post</p>
                <p><span class="text-slate-300">Step</span> <span class="text-sol-400">3:</span> Watch your token pump</p>
            </div>
        </div>
    </Modal>
</div>
</template>

<script setup lang="ts">
import PinSrc from '@/assets/svg/pin.svg';
import { ref, watch } from 'vue';
import Modal from './common/Modal.vue';
import { GTM_EVENTS, useGTMStore } from '@/stores/GTMStore';

const howItWorks = ref(false);

let startTime = Date.now();
const GTMStore = useGTMStore();
watch( howItWorks, ( value ) => {
    if( value ) {
        startTime = Date.now();
        GTMStore.pushEvent( GTM_EVENTS.HOW_IT_WORKS_ENTER, { startTime });
    }
    else {
        const endTime = Date.now();
        const spentTime = endTime - startTime;
        GTMStore.pushEvent( GTM_EVENTS.HOW_IT_WORKS_LEAVE, { endTime, spentTime });
    }
})
</script>