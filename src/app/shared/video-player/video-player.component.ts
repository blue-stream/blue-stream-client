import { Component, OnInit, Input, ElementRef, ViewChild, Output, EventEmitter } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { HttpClient, HttpResponse } from '@angular/common/http';
import fscreen from 'fscreen';
import { saveAs } from 'file-saver';
import { BehaviorSubject } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import { Video } from '../models/video.model';

@Component({
  selector: 'bs-video-player',
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.scss']
})
export class VideoPlayerComponent implements OnInit {

  private static readonly timeToHideActions = 3 * 1000;

  @Input() video: Video;
  @ViewChild('videoPlayer') videoPlayer: ElementRef;
  @Output() toggleWideScreen: EventEmitter<boolean>;
  private playPromise: Promise<void>;
  private pausePromise: Promise<void>;
  mouseMove: BehaviorSubject<void>;
  previousVideoState: boolean | null = null;
  hideActions: boolean = false;
  isMenuOpened: boolean = false;
  fullscreen: boolean = false;
  volume: number;
  progress = 0;
  buffer = 0;

  constructor(private sanitizer: DomSanitizer, private httpClient: HttpClient) {
    this.toggleWideScreen = new EventEmitter<boolean>();
    this.mouseMove = new BehaviorSubject<void>(null);
    this.mouseMove
      .map(() => {
        this.hideActions = false;
      })
      .debounceTime(VideoPlayerComponent.timeToHideActions)
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

  speedChange(speed: number) {
    this.videoPlayer.nativeElement.playbackRate = speed;
  }

  updateProgress() {
    const { currentTime, duration } = this.videoPlayer.nativeElement;
    this.progress = ((100 / duration) * currentTime);
    const videoPlayer = this.videoPlayer.nativeElement;
    this.buffer = (videoPlayer.buffered.end(videoPlayer.buffered.length - 1) / videoPlayer.duration) * 100;
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

  onProgressChanged(progress: number) {
    const video = this.videoPlayer.nativeElement;
    this.progress = progress;
    video.currentTime = video.duration * progress / 100;
  }

  onCaptureImage() {
    const videoPaused = this.videoPlayer.nativeElement.paused;

    if (!videoPaused) {
      this.pauseVideo();
    }

    const canvas = document.createElement('canvas');
    canvas.width = this.videoPlayer.nativeElement.videoWidth;
    canvas.height = this.videoPlayer.nativeElement.videoHeight;
    const context = canvas.getContext('2d');
    context.drawImage(this.videoPlayer.nativeElement, 0, 0, canvas.width, canvas.height);

    const image = canvas.toDataURL('image/jpeg');
    const data = atob(image.substring('data:image/jpeg;base64,'.length));
    const asArray = new Uint8Array(data.length);

    for (let i = 0; i < data.length; ++i) {
      asArray[i] = data.charCodeAt(i);
    }

    const blob = new Blob([asArray.buffer], { type: 'image/jpeg' });
    const imageUrl = window.URL.createObjectURL(blob);
    saveAs(blob, `${this.video.title}-${this.videoPlayer.nativeElement.currentTime}.jpeg`);

    if (!videoPaused) {
      this.playVideo();
    }
  }

  onDownloadVideo() {
    this.httpClient
      .get(this.video.contentPath, { responseType: 'blob' })
      .subscribe(data => saveAs(data, `${this.video.title}.mp4`));
  }

  onToggleMenu(isOpened: boolean) {
    this.isMenuOpened = isOpened;
  }
}
