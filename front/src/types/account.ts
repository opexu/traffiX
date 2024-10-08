export interface IXAccount {
    id: number;
    name: string;
    followers_number: number;
    avatar_url: string;
    average_views: number;
    price: number;
    description?: string;
    king?: boolean;
    flash?: boolean;
}