import { HttpClient } from '@angular/common/http';
import { AfterViewChecked, ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, OnInit, Output, HostListener, ElementRef, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/map';
import { Video } from '../models/video.model';
import { playerConfig } from './video-player.config';
import { VgAPI } from 'videogular2/core';

@Component({
  selector: 'bs-video-player',
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.scss']
})
export class VideoPlayerComponent implements OnChanges, AfterViewChecked {

  private videoApi: VgAPI;

  @Input() video: Video & { token: string };
  @Output() toggleWideScreen: EventEmitter<boolean>;
  @ViewChild('videoPlayer') videoPlayer: ElementRef;

  constructor(private cdRef: ChangeDetectorRef) {
    this.toggleWideScreen = new EventEmitter<boolean>();
  }

  onPlayerReady(api: VgAPI) {
    this.videoApi = api;
    this.videoApi.play();
  }

  toggleFullscreen() {
    this.videoApi.fsAPI.toggleFullscreen();
  }

  toggleVideoState() {
    if (this.videoApi.state === 'playing') {
      this.videoApi.pause();
    } else {
      this.videoApi.play();
    }
  }

  ngAfterViewChecked() {
    this.cdRef.detectChanges();
  }

  ngOnChanges() {
    if (this.videoPlayer) {
      this.videoPlayer.nativeElement.load();
      this.videoPlayer.nativeElement.play();
    }
    if (this.video && this.video.contentPath) {
      this.video.contentPath += `?video-token=${this.video.token}`;
    }
  }

  // onCaptureImage() {
  //   const videoPaused = this.videoPlayer.nativeElement.paused;

  //   if (!videoPaused) {
  //     this.pauseVideo();
  //   }

  //   const canvas = document.createElement('canvas');
  //   canvas.width = this.videoPlayer.nativeElement.videoWidth;
  //   canvas.height = this.videoPlayer.nativeElement.videoHeight;
  //   const context = canvas.getContext('2d');
  //   context.drawImage(this.videoPlayer.nativeElement, 0, 0, canvas.width, canvas.height);

  //   const image = canvas.toDataURL('image/jpeg');
  //   const data = atob(image.substring('data:image/jpeg;base64,'.length));
  //   const asArray = new Uint8Array(data.length);

  //   for (let i = 0; i < data.length; ++i) {
  //     asArray[i] = data.charCodeAt(i);
  //   }

  //   const blob = new Blob([asArray.buffer as any], { type: 'image/jpeg' });
  //   const imageUrl = window.URL.createObjectURL(blob);
  //   saveAs(blob, `${this.video.title}-${this.videoPlayer.nativeElement.currentTime}.jpeg`);

  //   if (!videoPaused) {
  //     this.playVideo();
  //   }
  // }

  // onDownloadVideo() {
  //   this.httpClient
  //     .get(this.video.contentPath, { responseType: 'blob' })
  //     .subscribe(data => saveAs(data, `${this.video.title}.mp4`));
  // }

}
