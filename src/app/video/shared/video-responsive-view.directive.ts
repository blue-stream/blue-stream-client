import { Directive, HostListener, DoCheck, HostBinding, ElementRef, EventEmitter, Output } from '@angular/core';

@Directive({
  selector: '[bsVideoResponsiveView]'
})
export class VideoResponsiveViewDirective implements DoCheck {

  private readonly videoTileWidth = 210;
  private readonly videoTileMargin = 2;
  private maxVideosAllowed: number;

  @Output() layoutChanged: EventEmitter<number>;
  @HostListener('window:resize') onResize() {
    this.calculateMaxVideosAllowed();
  }

  constructor(private el: ElementRef) {
    this.layoutChanged = new EventEmitter<number>();
  }

  ngDoCheck() {
    this.calculateMaxVideosAllowed();
  }

  private calculateMaxVideosAllowed() {
    const containerWidth = this.el.nativeElement.offsetWidth;
    const videoTileRequiredWidth = this.videoTileWidth + 2 * this.videoTileMargin;
    let maxVideosAllowed = Math.floor(containerWidth / videoTileRequiredWidth);
    maxVideosAllowed = Math.max(maxVideosAllowed, 1);
    if (!this.maxVideosAllowed || this.maxVideosAllowed !== maxVideosAllowed) {
      this.maxVideosAllowed = maxVideosAllowed;
      this.layoutChanged.next(this.maxVideosAllowed);
    }
  }


}
