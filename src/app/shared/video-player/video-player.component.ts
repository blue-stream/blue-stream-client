import { Component, OnInit, Input, ElementRef, ViewChild, Output, EventEmitter } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import fscreen from 'fscreen';
import { Video } from '../models/video.model';
import { BehaviorSubject } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

@Component({
  selector: 'bs-video-player',
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.scss']
})
export class VideoPlayerComponent implements OnInit {

  @Input() video: Video;
  @ViewChild('videoPlayer') videoPlayer: ElementRef;
  @Output() toggleWideScreen: EventEmitter<boolean>;
  private playPromise: Promise<void>;
  private pausePromise: Promise<void>;
  mouseMove: BehaviorSubject<void>;
  previousVideoState: boolean | null = null;
  hideActions: boolean = false;
  fullscreen: boolean = false;
  volume: number;
  progress = 0;

  constructor(private sanitizer: DomSanitizer) {
    this.toggleWideScreen = new EventEmitter<boolean>();
    this.mouseMove = new BehaviorSubject<void>(null);
    this.mouseMove
      .map(() => {
        this.hideActions = false;
      })
      .debounceTime(300000)
      .subscribe(() => {
        this.hideActions = true;
      });
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
      this.playVideo();
    } else {
      this.pauseVideo();
    }
  }

  pauseVideo() {
    Promise.all([this.playPromise, this.pausePromise]).then(() => {
      this.pausePromise = this.videoPlayer.nativeElement.pause();
    });
  }

  playVideo() {
    Promise.all([this.playPromise, this.pausePromise]).then(() => {
      this.playPromise = this.videoPlayer.nativeElement.play();
    });
  }

  volumeChange(volume: number) {
    this.videoPlayer.nativeElement.volume = volume;
  }

  updateProgress() {
    const { currentTime, duration } = this.videoPlayer.nativeElement;
    this.progress = Math.floor((100 / duration) * currentTime);
  }

  onProgressChangeStart() {
    const video = this.videoPlayer.nativeElement as HTMLVideoElement;
    if (this.previousVideoState === null) {
      this.previousVideoState = !video.paused;
    }
    this.pauseVideo();
  }

  onProgressChangeEnd() {
    if (this.previousVideoState !== null) {
      this.previousVideoState ? this.playVideo() : this.pauseVideo();
      this.previousVideoState = null;
    }
  }

  progressChanged(progress: number) {
    const video = this.videoPlayer.nativeElement;
    this.progress = progress;
    video.currentTime = video.duration * progress / 100;
  }
}
