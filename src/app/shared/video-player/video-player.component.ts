import { Component, OnInit, Input, ElementRef, ViewChild } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'bs-video-player',
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.scss']
})
export class VideoPlayerComponent implements OnInit {

  @Input() source = 'assets/video2.mp4';
  @ViewChild('video') video: ElementRef;
  progress = 0;

  constructor(private sanitizer: DomSanitizer) {
  }

  ngOnInit() {
  }

  toggleVideo() {
    const video = this.video.nativeElement;
    console.log(video.currentTime);
    if (video.paused) {
      video.play();
    } else {
      video.pause();
    }
  }

  updateProgress() {
    const { currentTime, duration } = this.video.nativeElement;
    this.progress = (100 / duration) * currentTime;
  }

  progressChanged(progress: number) {
    console.log(progress);
    const video = this.video.nativeElement;
    this.progress = progress;
    video.currentTime = video.duration * progress / 100;
  }
}
