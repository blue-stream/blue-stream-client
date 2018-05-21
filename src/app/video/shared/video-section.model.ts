import { Video } from '../../shared/models/video.model';

export class VideoSection {
    title: string;
    isDismissable: boolean;
    videos: Video[];
    avatarUrl: string;
}
