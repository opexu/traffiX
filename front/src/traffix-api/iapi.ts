import { IOrderFilter } from "@/composables/useFilters";
import { IPaginated, IXAccountUnverified } from "@/types/account";
import { IXPost } from "@/types/post";

export enum Resource {
    XAccounts = 'accounts',
    AdPost = 'accounts/post/create',
    Analytics = 'analytics/save',
}

export type IOrderPayload = { priceOrder?: IOrderFilter, viewsOrder?: IOrderFilter };
export type IAnalyticsPayload = { user: string, key: string, created_at: string, data?: {[key:string]:any} };

export interface IAPI {
    getXAccounts( page: number, limit: number, order?: IOrderPayload ): Promise<IPaginated<IXAccountUnverified[]>>
    submitAdPost( formData: FormData ): Promise<IXPost>;
    sendAnalytics( analytics: IAnalyticsPayload[] ): Promise<{ status: number }>;
}