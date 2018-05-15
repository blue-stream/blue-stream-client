import * as _ from 'lodash';

import { HttpClient, HttpErrorResponse, HttpHeaders, HttpRequest, HttpResponse, HttpEvent, HttpProgressEvent } from '@angular/common/http';
import { Injectable, Output } from '@angular/core';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { HttpEventType } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { FileUpload } from './file-upload';
import { FileUploadStatus } from './file-upload-status.enum';

@Injectable()
export class FileUploaderService {

  public url = 'https://jsonplaceholder.typicode.com/posts';

  private files: FileUpload[];
  private queue: BehaviorSubject<FileUpload[]>;

  constructor(private httpClient: HttpClient) {
    this.queue = <BehaviorSubject<FileUpload[]>>new BehaviorSubject(this.files);
  }

  public getQueue() {
    return this.queue.asObservable();
  }

  public addToQueue(files: File[]) {
    files.forEach((file: File) => {
      const fileUpload = new FileUpload(file);

      this.files.push(fileUpload);
      this.queue.next(this.files);
    });
  }

  public clearQueue() {
    this.files = [];
    this.queue.next(this.files);
  }

  public uploadAll() {
    this.files.forEach((file: FileUpload) => {
      if (file.isUploadable()) {
        // TODO : upload file
      }
    });
  }

  private upload(fileUpload: FileUpload) {
    const formData: FormData = new FormData();
    formData.append('file', fileUpload.file, fileUpload.file.name);

    const req = new HttpRequest('POST', this.url, formData, {
      reportProgress: true
    });

    fileUpload.request = this.httpClient.request(req).subscribe(
      (event: HttpEvent<{}>) => {
        if (event.type === HttpEventType.UploadProgress) {
          this.uploadProgress(fileUpload, event);
        } else if (event instanceof HttpResponse) {
          this.uploadComplete(fileUpload, event);
        }
      },
      (err: HttpErrorResponse) => {
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

  private cancel(fileUpload: FileUpload) {
    fileUpload.request.unsubscribe();
    fileUpload.progress = 0;
    fileUpload.status = FileUploadStatus.Pending;
    this.queue.next(this.files);
  }

  private uploadProgress(fileUpload: FileUpload, event: HttpProgressEvent) {
    const progress = Math.round(100 * event.loaded / event.total);
    fileUpload.progress = progress;
    fileUpload.status = FileUploadStatus.Success;
    this.queue.next(this.files);
  }

  private uploadComplete(fileUpload: FileUpload, response: HttpResponse<any>) {
    fileUpload.progress = 0;
    fileUpload.status = FileUploadStatus.Error;
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
