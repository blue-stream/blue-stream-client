import { Component, OnInit, Input, ElementRef, ViewChild, DoCheck, HostListener } from '@angular/core';
import { Video } from '../../shared/models/video.model';
import { VideoConstants } from '../../video/shared/constants';

@Component({
  selector: 'bs-video-list',
  templateUrl: './video-list.component.html',
  styleUrls: ['./video-list.component.scss']
})
export class VideoListComponent implements OnInit, DoCheck {

  // TODO : Add RTL support (use Directionality)

  readonly videoConstants = VideoConstants;
  showNextButton = true;
  startIndex = 0;
  endIndex = 0;
  @Input() videos: Video[];
  @Input() mode: 'grid' | 'horizontal' | 'vertical';
  @ViewChild('videoList') videoList: ElementRef;

  constructor() { }

  ngOnInit(): void {
    this.endIndex = this.getVideosPerRow();
  }

  ngDoCheck() {
    const videosPerRow = this.getVideosPerRow();
    if (this.startIndex + videosPerRow > this.videos.length) {
      this.startIndex = this.videos.length - videosPerRow;
    }
    this.endIndex = this.startIndex + videosPerRow;
  }

  scrollLeft() {
    const videosPerRow = this.getVideosPerRow();
    this.startIndex = Math.max(this.startIndex - videosPerRow, 0);
  }

  scrollRight() {
    const videosPerRow = this.getVideosPerRow();
    if (this.startIndex + videosPerRow < this.videos.length) {
      this.startIndex = Math.min(this.startIndex + videosPerRow, this.videos.length - videosPerRow);
    }
  }

  private getVideosPerRow() {
    return this.videoList.nativeElement.offsetWidth / VideoConstants.videoTileWidth;
  }
}
