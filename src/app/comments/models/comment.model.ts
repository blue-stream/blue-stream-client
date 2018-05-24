export interface Comment {
    id: string;
    user: string;
    text: string;
    date: string;
    likes: number;
    dislikes: number;
    replies: Comment[];
}
