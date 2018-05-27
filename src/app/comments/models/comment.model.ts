export interface Comment {
    id: string;
    user: string;
    text: string;
    date: Date;
    likes: number;
    dislikes: number;
    parentCommentId: string;
}
