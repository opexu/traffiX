import { CommonApi } from "./common-api";
import { Resource, type IAPI, type IFetchStatus } from "./iapi";

export class API extends CommonApi implements IAPI {
    
    constructor(
        baseUrl: string,
    ){ super( baseUrl )}

    async submitAdPost( formData: FormData ): Promise<IFetchStatus> {
        const url = new URL( this._baseUrl + '/' + Resource.AdPost );
        return this._fetchForm( url, formData );
    }
}