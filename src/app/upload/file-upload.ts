import { FileUploadStatus } from './file-upload-status.enum';
import { Subscription } from 'rxjs';
import { HttpRequest, HttpResponse, HttpErrorResponse } from '@angular/common/http';

export class FileUpload {
    public progress = 0;
    public eta: number;
    public uploadTimestamp: number;
    public loadedBytes: number;
    public file: File;
    public status: FileUploadStatus = FileUploadStatus.Pending;
    public request: Subscription = null;
    public response: HttpResponse<any> | HttpErrorResponse = null;

    constructor(file: File) {
        this.file = file;
    }

    public isPending = () => this.status === FileUploadStatus.Pending;
    public isSuccess = () => this.status === FileUploadStatus.Success;
    public isError = () => this.status === FileUploadStatus.Error;
    public inProgress = () => this.status === FileUploadStatus.Progress;
    public isUploadable = () => this.status === FileUploadStatus.Pending || this.status === FileUploadStatus.Error;
}
