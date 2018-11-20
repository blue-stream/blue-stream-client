export interface Comment {
    _id: string;
    user: string;
    text: string;
    date: Date;
    likes: number;
    dislikes: number;
    parent: string | null;
    video: string;
    repliesAmount: number;
}
