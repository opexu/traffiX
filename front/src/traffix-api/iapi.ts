import { IOrderFilter } from "@/composables/useFilters";
import { IPaginated, IXAccountUnverified } from "@/types/account";
import { IXPost } from "@/types/post";

export enum Resource {
    XAccounts = 'accounts',
    AdPost = 'accounts/post/create',
}

export type IOrderPayload = { priceOrder?: IOrderFilter, viewsOrder?: IOrderFilter };

export interface IAPI {
    getXAccounts( page: number, limit: number, order?: IOrderPayload ): Promise<IPaginated<IXAccountUnverified[]>>
    submitAdPost( formData: FormData ): Promise<IXPost>;
}