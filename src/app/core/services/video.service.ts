import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { Video } from '../../shared/models/video.model';
import { VIDEOS1, SECTIONS } from '../../shared/models/mock-videos';
import { VideoSection } from '../../shared/models/video-section.model';

import { environment } from '../../../environments/environment';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root'
})
export class VideoService {

  private serviceUrl: string = environment.videoServiceUrl;
  private apiUrl: string = 'api/video';

  public maxVideoColumnsAllowed: number;

  constructor(private httpClient: HttpClient) { }

  create(video: Partial<Video>): Observable<Video> {
    return this.httpClient.post<Video>(`${this.serviceUrl}${this.apiUrl}`, video, httpOptions);
  }


  getVideos(): Observable<Video[]> {
    return Observable.of(VIDEOS1);
  }

  getSections(): Observable<VideoSection[]> {
    return Observable.of(SECTIONS);
  }
}
