<template>
<div class="w-full h-full flex flex-col bg-slate-950 justify-center items-center overflow-hidden">
    <Transition name="fade" mode="out-in" appear>
    <div class="w-full xl:w-2/3 h-full" :key="$route.fullPath">
        <RouterView/>
    </div>
    </Transition>
    <Transition name="fade" mode="out-in" appear>
    <Preloader v-if="isLoading"
    class="absolute w-full h-full"
    />
    </Transition>
</div>
</template>

<script setup lang="ts">
import { onBeforeMount } from 'vue';
import { RouterView } from 'vue-router';
import Preloader from './components/common/Preloader.vue';
import { storeToRefs } from 'pinia';
import { useDataStore } from '@/stores/dataStore';

const dataStore = useDataStore();
const { isLoading } = storeToRefs( dataStore );

onBeforeMount( async () => {
    await dataStore.init();
})
</script>