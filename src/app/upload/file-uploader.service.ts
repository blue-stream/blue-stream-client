import {
  HttpClient,
  HttpErrorResponse,
  HttpEvent,
  HttpEventType,
  HttpParams,
  HttpProgressEvent,
  HttpRequest,
  HttpResponse
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { environment } from '../../environments/environment';
import { FileUpload } from './file-upload';
import { FileUploadStatus } from './file-upload-status.enum';
import { VideoUpload } from './video-upload.interface';
import { VideoService } from '../core/services/video.service';

@Injectable()
export class FileUploaderService {

  private serviceUrl: string = environment.uploadServiceUrl;
  private apiUrl: string = 'api/upload';

  private files: VideoUpload[];
  private queue: BehaviorSubject<VideoUpload[]>;

  constructor(
      private httpClient: HttpClient,
      private videoService: VideoService) {
    this.files = [];
    this.queue = <BehaviorSubject<VideoUpload[]>>new BehaviorSubject(this.files);
  }

  public markVideoAsPublished(id: string) {
    const videoIndex = this.files.findIndex((videoUpload) => videoUpload.id === id);
    this.files[videoIndex].published = true;
  }

  public areVideosPublished(): boolean {
    let areVideosPublished: boolean = true;

    this.files.forEach((file) => {
      if (!file.published) {
        areVideosPublished = false;
      }
    });

    return areVideosPublished;
  }

  public getQueue() {
    return this.queue.asObservable();
  }

  public addToQueue(file: File, videoId: string, videoToken: string) {
    const fileUpload = new FileUpload(file);
    const videoUpload: VideoUpload = { fileUpload: fileUpload, id: videoId, token: videoToken, published: false };
    this.files.push(videoUpload);
    this.queue.next(this.files);
  }

  public clearQueue() {
    this.files = [];
    this.queue.next(this.files);
  }

  public uploadAll() {
    this.files.forEach((video: VideoUpload) => {
      if (video.fileUpload.isUploadable()) {
        this.upload(video);
      }
    });
  }

  private removeFromQueue(videoUpload: VideoUpload) {
    this.files = this.files.filter((video: VideoUpload) => {
      return video.id !== videoUpload.id;
    });

    this.queue.next(this.files);
  }

  private upload(videoUpload: VideoUpload) {
    const videoToken: string = videoUpload.token;
    const fileUpload: FileUpload = videoUpload.fileUpload;

    const formData: FormData = new FormData();
    formData.append('videoFile', fileUpload.file, fileUpload.file.name);
    const req = new HttpRequest('POST', `${this.serviceUrl}${this.apiUrl}`, formData, {
      reportProgress: true,
      params: new HttpParams().set('videoToken', videoToken)
    });

    fileUpload.loadedBytes = 0;
    fileUpload.uploadTimestamp = Date.now();
    fileUpload.request = this.httpClient.request(req).subscribe(
      (event: HttpEvent<{}>) => {
        if (event.type === HttpEventType.UploadProgress) {
          this.uploadProgress(fileUpload, event);
        } else if (event instanceof HttpResponse) {
          this.uploadComplete(fileUpload, event);
        }
      },
      (err: HttpErrorResponse) => {
        this.videoService.delete(videoUpload.id).subscribe(res => {});
        if (err.error instanceof Error) {
          // TODO : Client-side or network error occured.
        } else {
          // TODO : Backend returned an unsuccessful response code
        }
        this.uploadFailed(fileUpload, err);
      }
    );

    return fileUpload;
  }

  public cancel(videoUpload: VideoUpload) {
    videoUpload.fileUpload.request.unsubscribe();
    videoUpload.fileUpload.progress = 0;
    videoUpload.fileUpload.status = FileUploadStatus.Pending;
    this.removeFromQueue(videoUpload);
  }

  private uploadProgress(fileUpload: FileUpload, event: HttpProgressEvent) {
    const progress = Math.round(100 * event.loaded / event.total);

    const chunkSize = event.loaded - fileUpload.loadedBytes;
    fileUpload.loadedBytes = event.loaded;

    const timestamp = Date.now();
    const chunkUploadTime = timestamp - fileUpload.uploadTimestamp;
    fileUpload.uploadTimestamp = timestamp;

    const uploadSpeed = ((chunkSize) / (chunkUploadTime / 1000));

    fileUpload.progress = progress;
    fileUpload.status = FileUploadStatus.Progress;
    fileUpload.eta = Number(((event.total - event.loaded) / uploadSpeed).toFixed());

    this.queue.next(this.files);
  }

  private uploadComplete(fileUpload: FileUpload, response: HttpResponse<any>) {
    fileUpload.progress = 100;
    fileUpload.eta = 0;
    fileUpload.status = FileUploadStatus.Success;
    fileUpload.response = response;
    this.queue.next(this.files);
    this.onFileUploadComplete(fileUpload, response.body);
  }

  private uploadFailed(fileUpload: FileUpload, response: HttpErrorResponse) {
    fileUpload.progress = 0;
    fileUpload.status = FileUploadStatus.Error;
    fileUpload.response = response;
    this.queue.next(this.files);
  }

  private onFileUploadComplete(fileUpload: FileUpload, response: HttpResponse<any>) {
    return { fileUpload, response };
  }
}
