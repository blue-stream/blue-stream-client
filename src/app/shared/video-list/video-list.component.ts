import { Directionality } from '@angular/cdk/bidi';
import { Component, DoCheck, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Video } from '../../shared/models/video.model';
import { VideoConstants } from '../../video/shared/constants';

@Component({
  selector: 'bs-video-list',
  templateUrl: './video-list.component.html',
  styleUrls: ['./video-list.component.scss']
})
export class VideoListComponent implements OnInit, DoCheck {

  readonly videoConstants = VideoConstants;
  showNextButton = true;
  startIndex = 0;
  endIndex = 0;
  @Input() videos: Video[];
  @Input() description = false;
  @Input() mode: 'grid' | 'horizontal' | 'vertical';
  @ViewChild('videoList') videoList: ElementRef;

  constructor(private dir: Directionality) { }

  ngOnInit(): void {
    if (this.videoList && this.mode === 'horizontal') { this.endIndex = this.getVideosPerRow(); }
  }

  ngDoCheck() {
    if (this.videoList && this.mode === 'horizontal') {
      const videosPerRow = this.getVideosPerRow();
      if (this.startIndex + videosPerRow > this.videos.length) {
        this.startIndex = Math.max(this.videos.length - videosPerRow, 0);
      }
      this.endIndex = this.startIndex + videosPerRow;
    }
  }

  clickLeft() {
    if (this.dir.value === 'rtl') {
      this.scrollNext();
    } else {
      this.scrollPrev();
    }
  }

  clickRight() {
    if (this.dir.value === 'rtl') {
      this.scrollPrev();
    } else {
      this.scrollNext();
    }
  }

  scrollNext() {
    const videosPerRow = this.getVideosPerRow();
    if (this.startIndex + videosPerRow < this.videos.length) {
      this.startIndex = Math.min(this.startIndex + videosPerRow, this.videos.length - videosPerRow);
    }
  }

  scrollPrev() {
    const videosPerRow = this.getVideosPerRow();
    this.startIndex = Math.max(this.startIndex - videosPerRow, 0);
  }

  private getVideosPerRow() {
    return this.videoList.nativeElement.offsetWidth / VideoConstants.videoTileWidth;
  }
}
