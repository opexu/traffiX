<template>
<div class="w-full h-fit flex flex-col bg-slate-950">
    <Transition name="fade" mode="out-in" appear>
    <div class="w-full h-full" :key="$route.fullPath">
        <RouterView/>
    </div>
    </Transition>
    <Transition name="fade" mode="out-in" appear>
    <Preloader v-if="isLoading"/>
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