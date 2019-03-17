import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Classification } from 'src/app/shared/models/classification.model';

const httpHeaders: HttpHeaders = new HttpHeaders({
  'Content-Type': 'application/json',
});


@Injectable({
  providedIn: 'root'
})
export class ClassificationService {


  private serviceUrl: string = environment.videoServiceUrl;
  private apiUrl: string = 'api/classification';

  constructor(private httpClient: HttpClient) { }

  searchUserSources(
    searchFilter: string = ''
  ): Observable<Classification[]> {
    if (!searchFilter.trim()) { return of([]); }
    const options = {
      httpHeaders,
      params: {
        searchFilter,
      },
    };
    return this.httpClient.get<Classification[]>(`${this.serviceUrl}${this.apiUrl}/sources`, options);
  }

  searchUserPps(
    searchFilter: string = ''
  ): Observable<Classification[]> {
    if (!searchFilter.trim()) { return of([]); }
    const options = {
      httpHeaders,
      params: {
        searchFilter,
      },
    };
    return this.httpClient.get<Classification[]>(`${this.serviceUrl}${this.apiUrl}/pps`, options);
  }

}
