import { User } from './user.model';
import { Channel } from './channel.model';

export class Video {
  id?: string;
  title: string;
  description: string;
  views: number;
  owner: string | User;
  thumbnailPath: string;
  channel?: string | Channel;
  contentPath?: string;
  previewPath?: string;
  originalPath?: string;
  status?: VideoStatus;
  tags?: string[];
  published?: boolean;
  publishDate: Date;
}

export enum VideoStatus {
  UPLOADED = 'UPLOADED',
  PENDING = 'PENDING',
  FAILED = 'FAILED',
  READY = 'READY'
}
