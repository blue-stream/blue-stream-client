import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpRequest, HttpClient, HttpEventType, HttpResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class VideoService {
  private readonly url = 'http://localhost:3001/api/upload';

  constructor(private httpClient: HttpClient) { }

  public upload(file: File): Observable<number> {

    const formData: FormData = new FormData();
    formData.append('videoFile', file, file.name);

    const req = new HttpRequest('POST', this.url, formData, {
      reportProgress: true
    });

    const progress = new Subject<number>();

    this.httpClient.request(req).subscribe(event => {
      if (event.type === HttpEventType.UploadProgress) {
        const percentDone = Math.round(100 * event.loaded / event.total);

        progress.next(percentDone);
      } else if (event instanceof HttpResponse) {
        progress.complete();
      }
    });

    return progress.asObservable();
  }
}
