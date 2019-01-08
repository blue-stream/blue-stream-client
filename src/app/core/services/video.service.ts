import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { Video, VideoStatus } from '../../shared/models/video.model';
import { VIDEOS1, SECTIONS } from '../../shared/models/mock-videos';
import { VideoSection } from '../../shared/models/video-section.model';

import { environment } from '../../../environments/environment';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
 }),
};
const streamerServiceUrl: string = environment.streamerServiceUrl;
const contentApiUrl: string = streamerServiceUrl + 'api/streamer/video/';
const thumbnailApiUrl: string = streamerServiceUrl + 'api/streamer/thumbnail/';
const previewApiUrl: string = streamerServiceUrl + 'api/streamer/preview/';

const concatStreamerUrl = video => {
  video.contentPath = contentApiUrl.concat(video.contentPath);
  video.thumbnailPath = thumbnailApiUrl.concat(video.thumbnailPath);
  video.previewPath = previewApiUrl.concat(video.previewPath);
  return video;
};

const checkReadyStatus = video => {
  return video.status === VideoStatus.READY;
};

const checkPublished = video => {
  return video.published === true;
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

  update(video: Partial<Video>): Observable<Video> {
    return this.httpClient.put<Video>(`${this.serviceUrl}${this.apiUrl}/${video.id}`, video, httpOptions);
  }

  delete(id: string) {
    return this.httpClient.delete<Video>(`${this.serviceUrl}${this.apiUrl}/${id}`, httpOptions);
  }

  getVideos(): Observable<Video[]> {
    return this.httpClient.get<Video[]>(`${this.serviceUrl}${this.apiUrl}`, httpOptions).
    pipe(
      map(videos => videos.map(concatStreamerUrl)),
      map(videos => videos.filter(checkReadyStatus)),
      map(videos => videos.filter(checkPublished))
    );
  }

  getVideo(id: string): Observable<Video> {
    return this.httpClient.get<Video>(`${this.serviceUrl}${this.apiUrl}/${id}`, httpOptions).
    pipe( map(concatStreamerUrl) );
  }

  getSections(): Observable<VideoSection[]> {
    const popularSection: VideoSection = {
      isDismissable: false,
      title: 'סרטונים פופולארים',
    };

    return this.getVideos().pipe( map( (videos: Video[]) => {
      popularSection.videos = videos;
      return [popularSection];
    }) );
  }
}
