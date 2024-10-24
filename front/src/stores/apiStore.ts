import { defineStore } from 'pinia'
import { API, IOrderPayload } from '@/traffix-api'
import { Utils } from '@/scripts/utils';
import { IPaginated, IXAccount } from '@/types/account';
import { ref } from 'vue';
import { fakeAccounts } from '@/assets/fake/accounts';
import { IPagination } from '@/composables/usePagination';

export const useAPIStore = defineStore( 'apiStore', () => {

    console.log('window.origin: ', window.origin)
    const api = new API( window.origin + '/api' );

    async function getXAccounts( page: number, limit: number, order?: IOrderPayload ): Promise<IPaginated<IXAccount[]>>{
        const res = await api.getXAccounts( page, limit, order );
        ( res.data as unknown as IXAccount[] ) = res.data.map( xaccount => Utils.validateAccount( xaccount ) );
        return res as unknown as IPaginated<IXAccount[]>;
        
        // const data = fakeAccounts( 100 );
        // const pagination: IPagination = {
        //     page: 0,
        //     perPage: 0,
        //     totalPages: 0,
        //     count: 0
        // }
        // return { data, pagination }
    }
    
    async function submitAdPost( formData: FormData ){
        return api.submitAdPost( formData );
    }


    return { getXAccounts, submitAdPost }
} )
