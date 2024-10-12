import { defineStore } from "pinia";

export enum GTM_EVENTS {
    CONNECT_WALLET = 'connect-wallet',
    DISCONNECT_WALLET = 'disconnect-wallet',
    HOW_IT_WORKS_ENTER = 'how-it-works-enter',
    HOW_IT_WORKS_LEAVE = 'how-it-works-leave',
    PRICE_ORDER = 'price-order',
    VIEWS_ORDER = 'views-order',
    EMPTY_CARD_CLICK = 'card-click-empty',
    BUY_CARD_CLICK = 'card-click-buy',
    BUY_POST = 'buy-post',
    CONGRATULATION_RECEIVED = 'congratulation-received',
    CONTINUE_CLICK = 'continue-click',
    GO_BACK_CLICK = 'go-gack-click',
    PAGE_VIEWED = 'page-viewed',
}



export const useGTMStore = defineStore('GTMStore', () => {

    window.dataLayer =  window.dataLayer as unknown as any || [];

    function pushEvent( event: GTM_EVENTS, data?: {[key:string]: any } ){
        window.dataLayer.push( { 'event': event, ...data });
    }

    return { pushEvent }
});