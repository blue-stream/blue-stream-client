export interface Comment {
    id: string;
    user: string;
    text: string;
    createdAt: Date;
    likes: number;
    dislikes: number;
    parent: string | null;
    video: string;
    repliesAmount: number;
}
