import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpRequest, HttpEventType } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

const url = 'http://localhost:3001/upload';

@Injectable()
export class UploadService {

  constructor(private httpClient: HttpClient) {
  }

  public upload(files: Set<File>): { [key: string]: Observable<number> } {
    const status = {};

    files.forEach(file => {
      const formData: FormData = new FormData();
      formData.append('file', file, file.name);

      const req = new HttpRequest('POST', url, formData, {
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

      status[file.name] = {
        progress: progress.asObservable()
      };

    });

    return status;
  }
}
