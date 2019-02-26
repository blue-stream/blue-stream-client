export interface Channel {
    id: string;
    user: string;
    name: string;
    description: string;
    createdAt: Date;
    updatedAt: Date;
    isProfile: boolean;
}
