export class Video {
    id: string;
    title: string;
    description: string;
    views: number;
    publishDate: Date;
    likes: number;
    dislikes: number;
    catagory?: string;
    owner: string;
    tags?: string[];
    thumbnailUrl: string;
    sourceUrl?: string;
}
