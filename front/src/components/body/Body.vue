<template>
    <div class="w-full p-4 flex flex-col gap-4 overflow-auto">
        <!-- <BodyFilters /> -->
        <div ref="cardRootRef" class="w-full h-full gap-2 flex flex-col overflow-hidden overflow-y-scroll">
            <div class="w-full h-fit grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                <template v-for="(   account ) in xAccountsArr" :key="account.id">
                    <Card :x-account="account" 
                    />
                </template>
            </div>
            <Preloader 
            class="w-full min-h-20"
            />
        </div>
        
    </div>
</template>

<script setup lang="ts">
import { fakeAccounts } from '@/assets/fake/accounts';
import BodyFilters from '@/components/body/BodyFilters.vue';
import Card from '@/components/common/Card/Card.vue';
import { useInfiniteScroll, useDebounceFn } from '@vueuse/core';
import { ref } from 'vue';
import Preloader from '../common/Preloader.vue';

const cardRootRef = ref<HTMLDivElement | null>( null );
const debouncedFn = useDebounceFn( () => {
    console.log( '10' )
    xAccountsArr.value.push( ...fakeAccounts( 10 ) )
}, 1000 )

const { reset, isLoading } = useInfiniteScroll(
    cardRootRef,
    debouncedFn,
    { distance: 10 }
)

const xAccountsArr = ref( fakeAccounts( 20 ) );
</script>