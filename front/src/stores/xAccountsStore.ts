import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { useAPIStore } from './apiStore';
import { IXAccount } from '@/types/account';
import { usePagination } from '@/composables/usePagination';
import { IOrderFilter, useFilters } from '@/composables/useFilters';
import { IOrderPayload } from '@/traffix-api';
import { GTM_EVENTS, useGTMStore } from './GTMStore';

export const useXAccountsStore = defineStore( 'xAccountsStore', () => {
    
    const xAccountsArr = ref<IXAccount[]>([]);

    const { getXAccounts } = useAPIStore();
    const { pagination, update: udpatePagination, reset: resetPagination } = usePagination({ page: 0, perPage: 100, count: 0, totalPages: 0 });
    const { priceOrder, viewsOrder, setPriceFilter, setViewsFilter } = useFilters();
    
    const isDefaultLoading = ref(false);
    const isLoadingWithFilters = ref(false);
    const isLoading = computed(() => isDefaultLoading.value || isLoadingWithFilters.value );

    const GTMStore = useGTMStore();

    async function loadXAccountsWithFilters( order: IOrderPayload ){
        try{
            isLoadingWithFilters.value = true;
            const paginatedAccounts = await getXAccounts( pagination.value.page + 1, pagination.value.perPage, order );
            udpatePagination( paginatedAccounts.pagination );
            xAccountsArr.value.push( ...paginatedAccounts.data );
        }finally{
            isLoadingWithFilters.value = false;
            GTMStore.pushEvent( GTM_EVENTS.PAGE_VIEWED, { page: pagination.value.page, perPage: pagination.value.perPage });
        }
    }

    async function loadXAccounts(){
        try{
            isDefaultLoading.value = true;
            const orderPayload: IOrderPayload = {};
            if( priceOrder.value ) orderPayload.priceOrder = priceOrder.value;
            if( viewsOrder.value ) orderPayload.viewsOrder = viewsOrder.value;
            const paginatedAccounts = await getXAccounts( pagination.value.page + 1, pagination.value.perPage, orderPayload );
            udpatePagination( paginatedAccounts.pagination );
            xAccountsArr.value.push( ...paginatedAccounts.data );
        }finally{
            isDefaultLoading.value = false;
            GTMStore.pushEvent( GTM_EVENTS.PAGE_VIEWED, { page: pagination.value.page, perPage: pagination.value.perPage });
        }
    }

    async function onPriceChange( priceOrder: IOrderFilter ){
        xAccountsArr.value = [];
        resetPagination();
        if( priceOrder ){
            await loadXAccountsWithFilters({ priceOrder });
        }else{
            await loadXAccounts();
        }
        setPriceFilter( priceOrder );
    }

    async function onViewsChange( viewsOrder: IOrderFilter ){
        xAccountsArr.value = [];
        resetPagination();
        if( priceOrder ){
            await loadXAccountsWithFilters({ viewsOrder });
        }else{
            await loadXAccounts();
        }
        setViewsFilter( viewsOrder );
    }

    return { isLoading, xAccountsArr, loadXAccounts, priceOrder, viewsOrder, onPriceChange, onViewsChange }
} )
