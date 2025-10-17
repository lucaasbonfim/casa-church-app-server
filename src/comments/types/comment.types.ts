export type CreateComment = {
    postId: string;
    userId: string;
    content: string;
}

export type UpdateComment = {
    postId?: string;
    userId?: string;
    content?: string;
}