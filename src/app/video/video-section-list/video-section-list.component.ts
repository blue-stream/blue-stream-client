import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { VideoService } from '../shared/video.service';
import { VideoSection } from '../shared/video-section.model';
import { VideoConstants } from '../shared/constants';

@Component({
  selector: 'bs-video-section-list',
  templateUrl: './video-section-list.component.html',
  styleUrls: ['./video-section-list.component.scss']
})
export class VideoSectionListComponent implements OnInit {

  width: number;
  sections: Observable<VideoSection[]>;
  constructor(private videoService: VideoService) { }

  ngOnInit() {
    this.sections = this.videoService.getSections();
  }

  layoutChanged(maxVideosAllowed: number) {
    this.videoService.maxVideoColumnsAllowed = maxVideosAllowed;
    this.width = maxVideosAllowed * VideoConstants.videoTileWidth;
  }
}