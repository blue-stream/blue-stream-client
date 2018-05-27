import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { MatSliderChange } from '@angular/material/slider';
import * as moment from 'moment';
import * as format from 'format-duration';
@Component({
  selector: 'bs-video-actions',
  templateUrl: './video-actions.component.html',
  styleUrls: ['./video-actions.component.scss']
})
export class VideoActionsComponent implements OnInit {

  @Input() volume: number;
  @Input() currentTime;
  @Input() duration;
  @Input() fullscreen: boolean;
  @Input() playing: boolean;
  @Output() volumeChange: EventEmitter<number>;
  @Output() toggleVideo: EventEmitter<void>;
  @Output() toggleFullscreen: EventEmitter<void>;

  constructor() {
    this.volumeChange = new EventEmitter<number>();
    this.toggleVideo = new EventEmitter<void>();
    this.toggleFullscreen = new EventEmitter<void>();
  }

  ngOnInit() {
    console.log('volume', this.volume);
    console.log('currentTime', this.currentTime);
    console.log('duration', this.duration);
  }

  mute() {
    if (this.volume !== 0) {
      this.volumeChange.next(0);
    } else {
      this.volumeChange.next(1);
    }
  }

  toggleVideoClick() {
    this.toggleVideo.next();
  }

  toggleFullscreenClick() {
    this.toggleFullscreen.next();
  }

  volumeSliderChange(event: MatSliderChange) {
    this.volumeChange.next(event.value);
  }

  secondsToTime(seconds) {
    return format(seconds * 1000);
  }

}
