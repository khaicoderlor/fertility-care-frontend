import type Profile from "./Profile";

export interface Blog {
    id: string,

    author: Profile,

    title: string,

    content: string,

    fullName: string,

    status: string,

    category: string,

    createdAt: string,

    updatedAt: string,

    imageUrl: string,

    avatarUrl: string

}