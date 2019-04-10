import { Component, OnInit } from '@angular/core';
import { VideoConstants } from '../shared/constants';
import { VideoSection } from '../../shared/models/video-section.model';
import { VideoService } from '../../core/services/video.service';
import { Router } from '@angular/router';

@Component({
  selector: 'bs-video-section-list',
  templateUrl: './video-section-list.component.html',
  styleUrls: ['./video-section-list.component.scss']
})
export class VideoSectionListComponent implements OnInit {

  width: number;
  sections: VideoSection[] = [];
  noVideosInSections: boolean = true;
  isLoading: boolean = true;

  constructor(private router: Router, private videoService: VideoService) { }

  ngOnInit() {
    this.initSections();
  }

  initSections() {
    this.loadPopularVideos();
    this.loadNewVideos();
  }

  loadPopularVideos() {
    const section: VideoSection = {
      title: 'VIDEO.VIDEO_SECTION_ITEM.MOST_VIEWED',
      isDismissable: false,
      isLoading: true,
    };

    this.sections.push(section);

    this.videoService.getVideos({}, 0, 10, 'views', -1 ).subscribe(videos => {
      section.videos = videos;
      section.isLoading = false;
      this.isLoading = false;

      if (section.videos && section.videos.length > 0) {
        this.noVideosInSections = false;
        this.isLoading = false;
      }
    },
    (error) => {
      section.isLoading = false;
    });
  }

  loadNewVideos() {
    const section: VideoSection = {
      title: 'VIDEO.VIDEO_SECTION_ITEM.NEWEST',
      isDismissable: false,
      isLoading: true,
    };

    this.sections.push(section);

    this.videoService.getVideos({}, 0, 10, 'publishDate', -1 ).subscribe(videos => {
      section.videos = videos;
      section.isLoading = false;
      this.isLoading = false;

      if (section.videos && section.videos.length > 0) {
        this.noVideosInSections = false;
      }
    },
    (error) => {
      section.isLoading = false;
      this.isLoading = false;
    });
  }

  layoutChanged(maxVideosAllowed: number) {
    this.videoService.maxVideoColumnsAllowed = maxVideosAllowed;
    this.width = maxVideosAllowed * VideoConstants.videoTileWidth;
  }

  onTagClick(tag: string) {
    this.router.navigate(['/results'], { queryParams: { search_query: tag } });
  }
}
