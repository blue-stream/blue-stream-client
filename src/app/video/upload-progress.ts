import { HttpEventType } from '@angular/common/http';

export enum UploadStatus {
    UPLOADING = 'UPLOADING',
    FAILED = 'FAILED',
    DONE = 'DONE'
}

export interface UploadProgress {
    percent: number;
    eta: number;
    status: UploadStatus;
}
