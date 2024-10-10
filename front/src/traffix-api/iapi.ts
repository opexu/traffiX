import { IPaginated, IXAccountUnverified } from "@/types/account";
import { IXPost } from "@/types/post";

export enum Resource {
    XAccounts = 'accounts',
    AdPost = 'accounts/post/create',
}

export interface IAPI {
    getXAccounts( page: number, limit: number ): Promise<IPaginated<IXAccountUnverified[]>>
    submitAdPost( formData: FormData ): Promise<IXPost>;
}