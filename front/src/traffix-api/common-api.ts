export interface IIterable<T> {
    [key: string]: T
}

export type IGetPayload = IIterable<string|number>;

export class CommonApi {

    constructor(
        protected readonly _baseUrl: string,
    ){}

    protected async _fetch<T>( url: URL ): Promise<T> {
        const res = await fetch( url );
        const data = await res.json() as T;
        return data;
    }

    protected async _fetchForm<T>( url: URL, formData: FormData ): Promise<T> {
        const res = await fetch( url, { method: 'POST', body: formData } );
        const data = await res.json() as T;
        return data;
    }

    protected async _fetchGet<T>( url: URL, queryObj?: IGetPayload ): Promise<T> {
        if( queryObj && typeof queryObj === 'object' ){
            for( const [ key, value ] of Object.entries( queryObj )){ url.searchParams.append( key, typeof value === 'string' ? value : value.toString() ); }
        }
        const res = await fetch( url, { method: 'GET' } );
        const data = await res.json() as T;
        return data;
    }
}