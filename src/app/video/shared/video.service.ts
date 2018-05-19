import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import 'rxjs/add/observable/of';
import { VIDEOS1, SECTIONS } from './mock-videos';
import { Video } from './video.model';
import { VideoSection } from './video-section.model';

@Injectable({
  providedIn: 'root'
})
export class VideoService {

  public maxVideoColumnsAllowed: number;

  constructor() { }

  getVideos(): Observable<Video[]> {
    return Observable.of(VIDEOS1);
  }

  getSections(): Observable<VideoSection[]> {
    return Observable.of(SECTIONS);
  }
}
