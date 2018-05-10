import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpRequest, HttpClient, HttpEventType, HttpResponse } from '@angular/common/http';
import { UploadProgress } from './upload-progress';

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
        });
      } else if (event instanceof HttpResponse) {
        progress.complete();
      }
    });

    return progress.asObservable();
  }
}
