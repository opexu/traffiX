import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useDataStore = defineStore( 'dataStore', () => {

    const isLoading = ref(false);

    async function init(){

    }

    return { isLoading, init }
} )
