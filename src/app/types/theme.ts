import { User } from "./user";

export interface Theme
{
    subscribers: string[];
    posts: string[];
    themeName: string;
    userId: User;
    created_at: string;
    updatedAt: string;
    _v: number;
};