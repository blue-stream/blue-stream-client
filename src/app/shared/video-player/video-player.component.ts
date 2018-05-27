import { Component, OnInit, Input, ElementRef, ViewChild } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import fscreen from 'fscreen';

@Component({
  selector: 'bs-video-player',
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.scss']
})
export class VideoPlayerComponent implements OnInit {

  @Input() source = 'assets/video.mp4';
  @ViewChild('video') video: ElementRef;
  fullscreen: boolean = false;
  playing: boolean = true;
  volume: number;
  progress = 0;

  constructor(private sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.volume = this.video.nativeElement.volume;
  }

  toggleFullscreen() {
    if (!fscreen.fullscreenElement) {
      fscreen.requestFullscreen(this.video.nativeElement.parentElement);
      this.fullscreen = true;
    } else {
      fscreen.exitFullscreen();
      this.fullscreen = false;
    }
  }

  toggleVideo() {
    const video = this.video.nativeElement;
    if (video.paused) {
      video.play();
      this.playing = true;
    } else {
      video.pause();
      this.playing = false;
    }
  }

  volumeChange(volume: number) {
    this.video.nativeElement.volume = volume;
  }

  updateProgress() {
    const { currentTime, duration } = this.video.nativeElement;
    this.progress = (100 / duration) * currentTime;
  }

  progressChanged(progress: number) {
    const video = this.video.nativeElement;
    this.progress = progress;
    video.currentTime = video.duration * progress / 100;
  }
}
