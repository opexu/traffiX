import { IPaginated, IXAccount, IXAccountUnverified } from "@/types/account";
import { CommonApi } from "./common-api";
import { Resource, type IAPI } from "./iapi";
import { IXPost } from "@/types/post";

export class API extends CommonApi implements IAPI {
    
    constructor(
        baseUrl: string,
    ){ super( baseUrl )}

    async getXAccounts( page: number, limit: number ): Promise<IPaginated<IXAccountUnverified[]>> {
        const url = new URL( this._baseUrl + '/' + Resource.XAccounts );
        return this._fetchGet( url, { page, limit } );
    }

    async submitAdPost( formData: FormData ): Promise<IXPost> {
        const url = new URL( this._baseUrl + '/' + Resource.AdPost );
        return this._fetchForm( url, formData );
    }
}