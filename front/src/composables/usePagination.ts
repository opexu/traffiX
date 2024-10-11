import { ref } from "vue";

export interface IPagination {
    page: number, // from 0
    perPage: number,
    totalPages: number,
    count: number,
}

export function usePagination( init: IPagination ){

    const pagination = ref<IPagination>( init );

    function update( newPagination: IPagination ){
        pagination.value = newPagination;
    }

    function nextPage(){
        if( pagination.value.page === pagination.value.totalPages ) return;
        else if( pagination.value.page > pagination.value.totalPages ){
            pagination.value.page = pagination.value.totalPages;
        }else{
            pagination.value.page += 1;
        }
    }

    function prevPage(){
        if( pagination.value.page === 1 ) return;
        else if( pagination.value.page < 1 ){
            pagination.value.page = 1;
        }
        else{
            pagination.value.page -= 1;
        }
    }

    function reset(){
        pagination.value = { ...pagination.value, page: 0 }
    }

    return { pagination, update, nextPage, prevPage, reset }
}