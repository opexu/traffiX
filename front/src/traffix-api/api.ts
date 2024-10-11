import { IPaginated, IXAccount, IXAccountUnverified } from "@/types/account";
import { CommonApi, IGetPayload } from "./common-api";
import { IOrderPayload, Resource, type IAPI } from "./iapi";
import { IXPost } from "@/types/post";

export class API extends CommonApi implements IAPI {
    
    constructor(
        baseUrl: string,
    ){ super( baseUrl )}

    async getXAccounts( page: number, limit: number, order?: IOrderPayload ): Promise<IPaginated<IXAccountUnverified[]>> {
        const url = new URL( this._baseUrl + '/' + Resource.XAccounts );
        const queryObj: IGetPayload = { page, limit };
        if( order?.priceOrder ) queryObj[ 'price_order' ] = order?.priceOrder;
        if( order?.viewsOrder ) queryObj[ 'views_order' ] = order?.viewsOrder;
        return this._fetchGet( url, queryObj );
    }

    async submitAdPost( formData: FormData ): Promise<IXPost> {
        const url = new URL( this._baseUrl + '/' + Resource.AdPost );
        return this._fetchForm( url, formData );
    }
}