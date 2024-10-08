import { defineStore } from 'pinia'
import { API } from '@/api/api'

export const useAPIStore = defineStore( 'apiStore', () => {

    console.log('window.origin: ', window.origin)
    const api = new API( window.origin + '/api' );

    async function submitAdPost( formData: FormData ){
        return api.submitAdPost( formData );
    }

    return { submitAdPost }
} )
