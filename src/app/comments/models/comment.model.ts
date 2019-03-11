import { User } from '../../shared/models/user.model';

export interface Comment {
    id: string;
    user: string | User;
    text: string;
    createdAt: Date;
    likes: number;
    dislikes: number;
    parent: string | null;
    resource: string;
    repliesAmount: number;
}
