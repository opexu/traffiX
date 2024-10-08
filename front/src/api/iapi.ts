export enum Resource {
    AdPost = 'ad-post',
}

export interface IFetchStatus {
    status: number
}

export interface IAPI {
    submitAdPost( formData: FormData ): Promise<IFetchStatus>;
}