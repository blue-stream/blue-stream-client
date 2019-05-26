import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const httpHeaders: HttpHeaders = new HttpHeaders({
  'Content-Type': 'application/json',
});

const httpOptions = {
  headers: httpHeaders,
};


@Injectable({
  providedIn: 'root'
})
export class ViewsService {


  private serviceUrl: string = environment.videoServiceUrl;
  private apiUrl: string = 'api/view';

  constructor(private httpClient: HttpClient) { }

  public increaseView(videoId: string): Observable<void> {
    return this.httpClient.post<void>(`${this.serviceUrl}${this.apiUrl}/${videoId}`, null);
  }

  getChannelViews(id: string): Observable<number> {
    return this.httpClient.get<number>(`${this.serviceUrl}${this.apiUrl}/channel/${id}`, httpOptions);
  }

  getUserViews(startIndex: number = 0, endIndex: number = 20): Observable<any> {
    const options = {
      httpHeaders,
      params: {
        startIndex: startIndex.toString(),
        endIndex: endIndex.toString(),
      } as { [key: string]: any },
    };

    Object.keys(options.params).forEach(key => {
      if (options.params[key] === undefined) {
        delete options.params[key];
      }
    });

    return this.httpClient.get<any>(`${this.serviceUrl}${this.apiUrl}/`, options);
  }
}
