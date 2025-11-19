export declare class FindCommentsQueryDto {
    page: number;
    limit: number;
    postId?: string;
    orderBy: string;
    orderDirection: "ASC" | "DESC";
}
