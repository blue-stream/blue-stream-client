import { Directive, HostListener, DoCheck, HostBinding, ElementRef } from '@angular/core';

@Directive({
  selector: '[bsVideoResponsiveView]'
})
export class VideoResponsiveViewDirective implements DoCheck {

  private readonly videoTileWidth = 210;
  private readonly videoTileMargin = 2;
  private maxVideosAllowed: number;

  @HostBinding('style.width.px') width: number;
  @HostListener('window:resize') onResize() {
    this.calculateMaxVideosAllowed();
  }

  constructor(private el: ElementRef) { }

  ngDoCheck() {
    this.calculateMaxVideosAllowed();
  }

  private calculateMaxVideosAllowed() {
    const videoTileRequiredWidth = this.videoTileWidth + 2 * this.videoTileMargin;
    const containerWidth = this.el.nativeElement.offsetWidth;
    this.maxVideosAllowed = Math.floor(containerWidth / videoTileRequiredWidth);
    this.maxVideosAllowed = Math.max(this.maxVideosAllowed, 1);
    this.width = this.maxVideosAllowed * videoTileRequiredWidth;
    console.log(this.maxVideosAllowed);
  }


}
