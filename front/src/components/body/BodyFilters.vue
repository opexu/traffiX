<template>
<div class="w-full h-fit gap-8 px-4 py-2 flex flex-row items-center justify-start text-white bg-inherit">
    <button class="w-fit h-fit flex flex-row disabled:text-slate-500"
    :disabled="IS_FILTERS_DISABLED"
    @click="onPriceOrderClick"
    >Price: &nbsp <span
    :class="priceOrderClass"
    > [{{ priceOrderText ?? ' - ' }}]</span></button>
    <button name="views-order" class="w-fit h-fit flex flex-row disabled:text-slate-500"
    :disabled="IS_FILTERS_DISABLED"
    @click="onViewsOrderClick"
    >Views: &nbsp <span
    :class="viewOrderClass"
    >[{{ viewsOrderText ?? ' - ' }}]</span></button>
</div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { useXAccountsStore } from '@/stores/xAccountsStore';
import { storeToRefs } from 'pinia';
import { IOrderFilter } from '@/composables/useFilters';
import { GTM_EVENTS, useGTMStore } from '@/stores/GTMStore';

const emit = defineEmits([ 'price-filter-changed', 'views-filter-changed' ]);

const IS_FILTERS_DISABLED = computed(() => isFilterClicked.value || isLoading.value );
let isFilterClicked = ref( false );

const xAccountsStore = useXAccountsStore();
const { priceOrder, viewsOrder, isLoading } = storeToRefs( xAccountsStore );
const { onPriceChange, onViewsChange } = xAccountsStore;

const priceOrderText = computed(() => priceOrder.value === 'ASC' ? 'LOW' : priceOrder.value === 'DESC' ? 'HIGH' : null );
const viewsOrderText = computed(() => viewsOrder.value === 'ASC' ? 'LOW' : viewsOrder.value === 'DESC' ? 'HIGH' : null );

const priceOrderClass = computed(() => priceOrder.value === 'ASC' ? 'text-sol-400' : priceOrder.value === 'DESC' ? 'text-red-400' : 'text-white' );
const viewOrderClass = computed(() => viewsOrder.value === 'ASC' ? 'text-sol-400' : viewsOrder.value === 'DESC' ? 'text-red-400' : 'text-white' );

const GTMStore = useGTMStore();
async function onPriceOrderClick(){
    try{
        isFilterClicked.value = true;
        let newPrice = calcNewOrder( priceOrder.value );
        GTMStore.pushEvent( GTM_EVENTS.PRICE_ORDER, { price: newPrice })
        await onPriceChange( newPrice );
    }finally{
        isFilterClicked.value = false;
    }
}

async function onViewsOrderClick(){
    try{
        isFilterClicked.value = true;
        let newViews = calcNewOrder( viewsOrder.value );
        GTMStore.pushEvent( GTM_EVENTS.VIEWS_ORDER, { views: newViews })
        await onViewsChange( newViews );
    }finally{
        isFilterClicked.value = false;
    }
}

function calcNewOrder( prevOrder: IOrderFilter ): IOrderFilter {
    let newOrder: IOrderFilter = null;
    switch( prevOrder ){
        case 'ASC': { newOrder = 'DESC'; break; }
        case 'DESC': { newOrder = null; break; }
        default: { newOrder = 'ASC'; break; }
    }
    return newOrder;
}
</script>