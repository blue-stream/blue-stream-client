import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpRequest, HttpClient, HttpEventType, HttpResponse, HttpEvent } from '@angular/common/http';
import { UploadProgress, UploadStatus } from './upload-progress';
import 'rxjs/add/operator/map';

@Injectable({
  providedIn: 'root'
})
export class VideoService {
  private readonly url = 'http://localhost:3001/api/upload';

  constructor(private httpClient: HttpClient) { }

  public upload(file: File): Observable<UploadProgress> {

    const formData: FormData = new FormData();
    formData.append('videoFile', file, file.name);

    const req = new HttpRequest('POST', this.url, formData, {
      reportProgress: true
    });

    const progress = new Subject<UploadProgress>();

    let startTimestamp = Date.now();
    let loadedBytes = 0;

    this.httpClient.request(req).subscribe(event => {
      if (event.type === HttpEventType.UploadProgress) {
        const percentDone = Math.round(100 * event.loaded / event.total);

        const chunkSize = event.loaded - loadedBytes;
        loadedBytes = event.loaded;

        const timestamp = Date.now();
        const chunkTimestamp = timestamp - startTimestamp;
        startTimestamp = timestamp;

        const speed = ((chunkSize) / (chunkTimestamp / 1000));

        progress.next({
          eta: Number(((event.total - event.loaded) / speed).toFixed()),
          percent: percentDone,
          status: UploadStatus.UPLOADING
        });
      } else if (event instanceof HttpResponse) {
        progress.next({
          eta: 0,
          percent: 100,
          status: event.ok ? UploadStatus.DONE : UploadStatus.FAILED
        });
        progress.complete();
      }
    });

    return progress.asObservable();
  }

  public uploadFiles(files: Set<File>): { [key: string]: Observable<number> } {
    const status = {};

    files.forEach(file => {
      const formData: FormData = new FormData();
      formData.append('videoFile', file, file.name);

      const req = new HttpRequest('POST', this.url, formData, {
        reportProgress: true
      });

      status[file.name] = this.httpClient.request(req).map(event => {
        if (event.type === HttpEventType.UploadProgress) {
          return Math.round(100 * event.loaded / event.total);
        } else if (event instanceof HttpResponse) {
          return 100;
        }
      });
    });

    return status;
  }
}
