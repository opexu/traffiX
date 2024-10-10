import { IPagination } from "@/composables/usePagination";

export interface IXAccountUnverified {
    id: number;
    name: string; // +
    followers_number: number; // +
    avatar_url: string; // +
    average_views: number; // +
    price: string; // +
    description?: string;
    king?: boolean;
    flash?: boolean;
}

export interface IXAccount {
    id: number;
    name: string; // +
    followers_number: number; // +
    avatar_url: string; // +
    average_views: number; // +
    price: number; // +
    description?: string;
    king: boolean;
    flash: boolean;
    bounce: boolean;
}

export interface IPaginated<T> {
    data: T,
    pagination: IPagination,
}