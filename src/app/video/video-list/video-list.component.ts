import { Component, OnInit, Input, ElementRef, ViewChild, DoCheck, HostListener } from '@angular/core';
import { Video } from '../shared/video.model';

@Component({
  selector: 'bs-video-list',
  templateUrl: './video-list.component.html',
  styleUrls: ['./video-list.component.scss']
})
export class VideoListComponent implements DoCheck {

  // TODO : Add RTL support (use Directionality)

  readonly videoTileWidth = 210;
  readonly videoTileMargin = 2;
  maxColumns: number;
  startIndex = 0;
  @Input() horizontal = false;
  @Input() videos: Video[];
  @ViewChild('videoListContainer') videoListContainer: ElementRef;

  constructor() { }

  @HostListener('window:resize') onResize() {
    this.calculateMaxVideoTiles();
  }

  ngDoCheck() {
    this.calculateMaxVideoTiles();
  }

  calculateMaxVideoTiles() {
    const containerWidth = this.videoListContainer.nativeElement.offsetWidth;
    const videoTileRequiredWidth = this.videoTileWidth + 2 * this.videoTileMargin;
    this.maxColumns = Math.floor(containerWidth / videoTileRequiredWidth);
    if (this.maxColumns < 1) {
      this.maxColumns = 1;
    }
  }

  scrollLeft() {
    this.startIndex = Math.max(this.startIndex - this.maxColumns, 0);
  }

  scrollRight() {
    if (this.startIndex + this.maxColumns < this.videos.length) {
      this.startIndex += this.maxColumns;
    }
  }
}
