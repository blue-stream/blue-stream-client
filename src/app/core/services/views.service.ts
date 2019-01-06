import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

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
}
