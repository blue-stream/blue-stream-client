import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { throwError } from 'rxjs';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { Video } from '../../shared/models/video.model';
import { VIDEOS1, SECTIONS } from '../../shared/models/mock-videos';
import { VideoSection } from '../../shared/models/video-section.model';

import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VideoService {

  private serviceUrl: string = environment.videoServiceUrl;
  private apiUrl: string = 'api/video';

  public maxVideoColumnsAllowed: number;

  constructor(private http: Http) { }

  create(video: Partial<Video>): Observable<Video> {
    return this.http.post(`${this.serviceUrl}${this.apiUrl}`, video)
      .map((res: Response) => res.json())
      .catch((error: any) => throwError(error.json().error || 'Server error'));
  }


  getVideos(): Observable<Video[]> {
    return Observable.of(VIDEOS1);
  }

  getSections(): Observable<VideoSection[]> {
    return Observable.of(SECTIONS);
  }
}
