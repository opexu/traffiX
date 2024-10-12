import { defineStore, storeToRefs } from "pinia";
import { useWallet } from "solana-wallets-vue";
import { ref, watch } from "vue";

export enum BuyState { POST, WAIT, CONGRATULATION };

export const useBuyState = defineStore('BuyState', () => {

    const BUY_STATE = ref<BuyState>( BuyState.POST );

    function setState( newState: BuyState ){
        if( BUY_STATE.value === newState ) return;
        BUY_STATE.value = newState;
    }
    
    return { BUY_STATE, setState }
})