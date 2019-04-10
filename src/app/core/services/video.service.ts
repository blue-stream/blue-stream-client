import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { delay } from "rxjs/operators";
import { map } from 'rxjs/operators';

import { Video, VideoStatus } from '../../shared/models/video.model';
import { VideoSection } from '../../shared/models/video-section.model';

import { environment } from '../../../environments/environment';

const httpHeaders: HttpHeaders = new HttpHeaders({
  'Content-Type': 'application/json',
});

const httpOptions = {
  headers: httpHeaders,
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

  getVideosAmount(videoFilter?: Partial<Video>): Observable<number> {
    const options = {
      headers: httpHeaders,
      params: {
        id: videoFilter ? videoFilter.id : undefined,
        title: videoFilter ? videoFilter.title : undefined,
        description: videoFilter ? videoFilter.description : undefined,
        owner: videoFilter ? videoFilter.owner : undefined,
        status: videoFilter ? videoFilter.status : undefined,
        channel: videoFilter ? videoFilter.channel : undefined,
      } as { [param: string]: string | string[] },
    };

    Object.keys(options.params).forEach(key => {
      if (options.params[key] === undefined) {
        delete options.params[key];
      }
    });

    return this.httpClient.get<number>(`${this.serviceUrl}${this.apiUrl}/amount`, options);
  }

  getTags(startIndex?: number,
    endIndex?: number): Observable<string[]> {
      return of(['חצב/סוריה', 'חצב/סוריה','חצב/סוריה', 'חצב/סוריה','חצב/סוריה', 'חצב/סוריה','חצב/סוריה', 'חצב/סוריה','חצב/סוריה', 'חצב/סוריה','חצב/שדגדשג', 'חצב/סוריה','חצב/גשדגדשג', 'חצב/דשגדשגדשג','חצב/גשדגשדג', 'חצב/סוריה','חצב/סוריה']).pipe(delay(5000));
      const options = {
        headers: httpHeaders,
        params: {
          startIndex: Number.isInteger(startIndex) ? startIndex.toString() : 0,
          endIndex: Number.isInteger(endIndex) ? endIndex.toString() : 20,
        } as { [param: string]: string | string[] },
      };

      Object.keys(options.params).forEach(key => {
        if (options.params[key] === undefined) {
          delete options.params[key];
        }
      });

      return this.httpClient.get<string[]>(`${this.serviceUrl}${this.apiUrl}/tags`, options);
  }

  getVideos(
    videoFilter?: Partial<Video>,
    startIndex?: number,
    endIndex?: number,
    sortBy?: keyof Video,
    sortOrder?: -1 | 1): Observable<Video[]> {
    const options = {
      headers: httpHeaders,
      params: {
        sortBy: sortBy ? sortBy.toString() : undefined,
        sortOrder: sortOrder ? sortOrder.toString() : undefined,
        startIndex: Number.isInteger(startIndex) ? startIndex.toString() : 0,
        endIndex: Number.isInteger(endIndex) ? endIndex.toString() : 10,
        id: videoFilter ? videoFilter.id : undefined,
        title: videoFilter ? videoFilter.title : undefined,
        description: videoFilter ? videoFilter.description : undefined,
        owner: videoFilter ? videoFilter.owner : undefined,
        status: videoFilter ? videoFilter.status : undefined,
        channel: videoFilter ? videoFilter.channel : undefined,
      } as { [param: string]: string | string[] },
    };

    Object.keys(options.params).forEach(key => {
      if (options.params[key] === undefined) {
        delete options.params[key];
      }
    });

    return this.httpClient.get<Video[]>(`${this.serviceUrl}${this.apiUrl}`, options)
      .pipe(
        map((videos: Video[]) => videos.map(concatStreamerUrl))
      );
  }

  getVideo(id: string): Observable<Video & { token: string }> {
    return this.httpClient.get<Video>(`${this.serviceUrl}${this.apiUrl}/${id}`, httpOptions).
      pipe(map(concatStreamerUrl));
  }

  getSections(): Observable<VideoSection[]> {
    const popularSection: VideoSection = {
      isDismissable: false,
      title: 'סרטונים פופולארים',
    };

    return this.getVideos().pipe(map((videos: Video[]) => {
      popularSection.videos = videos;
      return [popularSection];
    }));
  }

  search(
    searchFilter: string = '',
    startIndex: number,
    endIndex: number,
    sortBy: 'title' | 'views' | 'owner' | 'createdAt' = 'views'): Observable<Video[]> {
    if (!searchFilter.trim()) { return of([]); }
    const options = {
      httpHeaders,
      params: {
        searchFilter,
        startIndex: startIndex.toString(),
        endIndex: endIndex.toString(),
        sortBy,
      },
    };

    return this.httpClient.get<Video[]>(`${this.serviceUrl}${this.apiUrl}/search`, options)
      .pipe(
        map(videos => videos.map(concatStreamerUrl))
      );
  }

}
