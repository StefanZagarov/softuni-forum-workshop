import { Post } from "./post";
import { User } from "./user";

export interface Theme
{
    _id: string;
    subscribers: string[];
    posts: Post[];
    themeName: string;
    userId: User;
    created_at: string;
    updatedAt: string;
    _v: number;
};