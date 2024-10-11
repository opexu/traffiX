<template>
<div ref="appChildRef" class="w-full h-full flex flex-col bg-slate-950 justify-center items-center overflow-hidden">
    <Transition name="fade" mode="out-in" appear>
    <div class="w-full lg:w-5/6 xl:w-2/3 h-full" :key="$route.fullPath">
        <RouterView/>
    </div>
    </Transition>
    <Transition name="fade" mode="out-in" appear>
    <Preloader v-if="xAccountsArr.length === 0"
    class="absolute w-full h-full"
    />
    </Transition>
</div>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router';
import Preloader from './components/common/Preloader.vue';
import { storeToRefs } from 'pinia';
import { useXAccountsStore } from './stores/xAccountsStore';
import { useScroll } from '@vueuse/core';
import { ref, watch } from 'vue';

const xAccountsStore = useXAccountsStore();
const { xAccountsArr } = storeToRefs( xAccountsStore );

const appChildRef = ref();

</script>