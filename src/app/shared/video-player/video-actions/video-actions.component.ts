import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { MatSliderChange } from '@angular/material/slider';
import * as moment from 'moment';
import * as format from 'format-duration';

@Component({
  selector: 'bs-video-actions',
  templateUrl: './video-actions.component.html',
  styleUrls: ['./video-actions.component.scss']
})
export class VideoActionsComponent {

  @Input() volume: number;
  @Input() currentTime;
  @Input() duration;
  @Input() fullscreen: boolean;
  @Input() playing: boolean;
  @Output() volumeChange: EventEmitter<number>;
  @Output() toggleVideo: EventEmitter<boolean>;
  @Output() toggleFullscreen: EventEmitter<boolean>;
  @Output() toggleWideScreen: EventEmitter<boolean>;
  isWideScreen: boolean = false;

  constructor() {
    this.volumeChange = new EventEmitter<number>();
    this.toggleVideo = new EventEmitter<boolean>();
    this.toggleFullscreen = new EventEmitter<boolean>();
    this.toggleWideScreen = new EventEmitter<boolean>();
  }

  mute() {
    if (this.volume !== 0) {
      this.volumeChange.next(0);
    } else {
      this.volumeChange.next(1);
    }
  }

  toggleVideoClick() {
    this.toggleVideo.next(this.playing);
  }

  toggleFullscreenClick() {
    this.toggleFullscreen.next(this.fullscreen);
  }

  volumeSliderChange(event: MatSliderChange) {
    this.volumeChange.next(event.value);
  }

  secondsToTime(seconds) {
    return format(seconds * 1000);
  }

  onToggleWideScreen() {
    this.isWideScreen = !this.isWideScreen;
    this.toggleWideScreen.next(this.isWideScreen);
  }
}
