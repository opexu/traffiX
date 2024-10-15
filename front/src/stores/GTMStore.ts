import { defineStore } from "pinia";
import { useLocalStorage } from "@vueuse/core";
import { API, IAnalyticsPayload } from "@/traffix-api";

export enum GTM_EVENTS {
    LINK_REDIRECT = 'link-redirect',
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



export const useGTMStore = defineStore( 'GTMStore', () => {

    // const { pushEvent } = useDataLayer();
    const { pushEvent, init } = useCustomAnalytics();

    return { pushEvent, init }
} );

function useCustomAnalytics() {
    const sessionId = useLocalStorage( 'sessionId', crypto.randomUUID() );
    const api = new API( window.origin + '/api' );
    let analytics: IAnalyticsPayload[] = [];

    setInterval( () => {
        if ( analytics.length === 0 ) return;
        api.sendAnalytics( analytics );
        analytics = [];
    }, 10000 );

    function pushEvent( event: GTM_EVENTS, data?: { [ key: string ]: any } ) {
        analytics.push( {
            user: sessionId.value,
            key: event,
            date: new Date().toISOString(),
            data
        } )
    }

    function init() {
        document.addEventListener( 'click', function ( event ) {
            if( !event.target ) return;
            const target = event.target.closest( 'a' );
            if ( target && target.tagName === 'A' ) {
                event.preventDefault();

                const url = target.href;
                pushEvent( GTM_EVENTS.LINK_REDIRECT, { url });
                window.open( url, '_blank')
            }
        } );
    }

    return { pushEvent, init }
}

function useDataLayer() {

    window.dataLayer = window.dataLayer as unknown as any || [];

    function pushEvent( event: GTM_EVENTS, data?: { [ key: string ]: any } ) {
        window.dataLayer.push( { 'event': event, ...data } );
    }
    return { pushEvent };
}