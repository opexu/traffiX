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
}