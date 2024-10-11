import { computed, ref } from "vue";

export type IOrderFilter = 'ASC'|'DESC'|null;

export function useFilters(){

    const priceOrder = ref<IOrderFilter>( null );
    const viewsOrder = ref<IOrderFilter>( null );

    function setPriceFilter( filter: IOrderFilter ){
        if( priceOrder.value === filter ) return;
        priceOrder.value = filter;
    }

    function setViewsFilter( filter: IOrderFilter ){
        if( viewsOrder.value === filter ) return;
        viewsOrder.value = filter;
    }

    return { priceOrder, viewsOrder, setPriceFilter, setViewsFilter }
}