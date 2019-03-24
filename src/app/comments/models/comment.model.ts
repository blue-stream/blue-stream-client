import { User } from '../../shared/models/user.model';
import { ReactionType } from 'src/app/shared/models/reaction.model';

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
    reactions?: { [id in ReactionType]: number };
    reaction?: ReactionType | null;
}
