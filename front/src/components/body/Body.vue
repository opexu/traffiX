<template>
    <div class="w-full p-4 flex flex-col gap-4 overflow-auto">
        <!-- <BodyFilters /> -->
        <div ref="cardRootRef" class="w-full h-full gap-2 flex flex-col overflow-hidden overflow-y-scroll">
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
</template>

<script setup lang="ts">
import BodyFilters from '@/components/body/BodyFilters.vue';
import Card from '@/components/common/Card/Card.vue';
import { useInfiniteScroll, useDebounceFn } from '@vueuse/core';
import { onMounted, ref } from 'vue';
import Preloader from '../common/Preloader.vue';
import { useXAccountsStore } from '@/stores/xAccountsStore';

const { xAccountsArr, loadXAccounts } = useXAccountsStore();

onMounted( async () => {
    await loadXAccounts();
});

const cardRootRef = ref<HTMLDivElement | null>( null );
const debouncedFn = useDebounceFn( async () => {
    await loadXAccounts();
}, 2000, { rejectOnCancel: true } )

const { reset, isLoading } = useInfiniteScroll(
    cardRootRef,
    debouncedFn,
    { distance: 10 }
)

</script>