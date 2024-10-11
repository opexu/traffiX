<template>
    <BodyFilters 
    @price-filter-changed="resetYScroll"
    @views-filter-changed="resetYScroll"
    />
    <div class="w-full p-4 flex flex-col gap-4 overflow-auto">

        <div ref="cardRootRef" class="absolute w-full left-0 h-full flex gap-2 flex-row items-center justify-center overflow-hidden overflow-y-scroll">
            <div class="w-full lg:w-5/6 xl:w-2/3 h-full flex flex-col ">
            <div class="w-full h-fit pt-4 grid sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-2">
                <template v-for="(   account ) in xAccountsArr" :key="account.id">
                    <Card :x-account="account"
                    />
                </template>
            </div>
            <Preloader v-if="xAccountsArr.length > 0"
            class="w-full min-h-20"
            />
            </div>
        </div>
        
    </div>
</template>

<script setup lang="ts">
import Card from '@/components/common/Card/Card.vue';
import { useInfiniteScroll, useDebounceFn, useScroll } from '@vueuse/core';
import { onMounted, ref, watch } from 'vue';
import Preloader from '../common/Preloader.vue';
import { useXAccountsStore } from '@/stores/xAccountsStore';
import { storeToRefs } from 'pinia';
import BodyFilters from '@/components/body/BodyFilters.vue';

const cardRootRef = ref<HTMLDivElement | null>( null );
const xAccountsStore = useXAccountsStore();
const { xAccountsArr } = storeToRefs( xAccountsStore );
const { loadXAccounts } = xAccountsStore;

onMounted( async () => {
    await loadXAccounts();
});


const debouncedFn = useDebounceFn( async () => {
    await loadXAccounts();
}, 2000, { rejectOnCancel: true } )

const { reset, isLoading } = useInfiniteScroll(
    cardRootRef,
    debouncedFn,
    { distance: 10 }
)

const { y } = useScroll( cardRootRef );
function resetYScroll(){ y.value = 0; }
</script>