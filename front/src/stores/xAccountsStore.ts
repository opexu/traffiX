import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { useAPIStore } from './apiStore';
import { IXAccount } from '@/types/account';
import { usePagination } from '@/composables/usePagination';

export const useXAccountsStore = defineStore( 'xAccountsStore', () => {

    const xAccountsArr = ref<IXAccount[]>([]);

    const { getXAccounts, submitAdPost } = useAPIStore();
    const { pagination, update: udpatePagination } = usePagination({ page: 0, perPage: 100, count: 0, totalPages: 0 });

    async function loadXAccounts(){
        const paginatedAccounts = await getXAccounts( pagination.value.page + 1, pagination.value.perPage );
        udpatePagination( paginatedAccounts.pagination );
        xAccountsArr.value.push( ...paginatedAccounts.data );
    }

    return { xAccountsArr, loadXAccounts }
} )
