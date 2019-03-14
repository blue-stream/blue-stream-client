import { Component, OnInit } from '@angular/core';
import { VideoConstants } from '../shared/constants';
import { VideoSection } from '../../shared/models/video-section.model';
import { VideoService } from '../../core/services/video.service';

@Component({
  selector: 'bs-video-section-list',
  templateUrl: './video-section-list.component.html',
  styleUrls: ['./video-section-list.component.scss']
})
export class VideoSectionListComponent implements OnInit {

  width: number;
  sections: VideoSection[] = [];
  constructor(private videoService: VideoService) { }

  ngOnInit() {
    this.initSections();
  }

  initSections() {
    this.loadPopularVideos();
    this.loadNewVideos();
  }

  loadPopularVideos() {
    this.videoService.getVideos({}, 0, 10, 'views', -1 ).subscribe(videos => {
      const section: VideoSection = {
        videos,
        title: 'VIDEO.VIDEO_SECTION_ITEM.MOST_VIEWED',
        isDismissable: false
      };

      this.sections.push(section);
    });
  }

  loadNewVideos() {
    this.videoService.getVideos({}, 0, 10, 'publishDate', -1 ).subscribe(videos => {
      const section: VideoSection = {
        videos,
        title: 'VIDEO.VIDEO_SECTION_ITEM.NEWEST',
        isDismissable: false
      };

      this.sections.push(section);
    });
  }

  layoutChanged(maxVideosAllowed: number) {
    this.videoService.maxVideoColumnsAllowed = maxVideosAllowed;
    this.width = maxVideosAllowed * VideoConstants.videoTileWidth;
  }
}
