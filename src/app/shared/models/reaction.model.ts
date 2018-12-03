export enum ReactionType {
    Like = 'LIKE',
    Dislike = 'DISLIKE',
}

export enum ResourceType {
    Comment = 'COMMENT',
    Video = 'VIDEO',
}

export interface Reaction {
    resource: string;
    resourceType: ResourceType;
    user: string;
    type: ReactionType;
}
