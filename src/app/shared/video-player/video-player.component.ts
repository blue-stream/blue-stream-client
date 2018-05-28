import { Component, OnInit, Input, ElementRef, ViewChild } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import fscreen from 'fscreen';
import { Video } from '../models/video.model';

@Component({
  selector: 'bs-video-player',
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.scss']
})
export class VideoPlayerComponent implements OnInit {

  @Input() source = 'assets/video2.mp4';
  @Input() video: Video;
  @ViewChild('video') videoPlayer: ElementRef;
  fullscreen: boolean = false;
  playing: boolean = true;
  volume: number;
  progress = 0;

  constructor(private sanitizer: DomSanitizer) {
  }

  ngOnInit() {
    this.volume = this.videoPlayer.nativeElement.volume;
  }

  toggleFullscreen() {
    if (!fscreen.fullscreenElement) {
      fscreen.requestFullscreen(this.videoPlayer.nativeElement.parentElement);
      this.fullscreen = true;
    } else {
      fscreen.exitFullscreen();
      this.fullscreen = false;
    }
  }

  toggleVideo() {
    const video = this.videoPlayer.nativeElement;
    if (video.paused) {
      video.play();
      this.playing = true;
    } else {
      video.pause();
      this.playing = false;
    }
  }

  volumeChange(volume: number) {
    this.videoPlayer.nativeElement.volume = volume;
  }

  updateProgress() {
    const { currentTime, duration } = this.videoPlayer.nativeElement;
    this.progress = Math.floor((100 / duration) * currentTime);
  }

  progressChanged(progress: number) {
    const video = this.videoPlayer.nativeElement;
    this.progress = progress;
    video.currentTime = video.duration * progress / 100;
  }
}
