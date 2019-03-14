import { Video } from './video.model';

export class VideoSection {
    title: string;
    isDismissable: boolean;
    videos?: Video[];
    avatarUrl?: string;
    isLoading?: boolean;
}
