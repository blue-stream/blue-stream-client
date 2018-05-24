import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'bs-video-actions',
  templateUrl: './video-actions.component.html',
  styleUrls: ['./video-actions.component.scss']
})
export class VideoActionsComponent implements OnInit {

  @Input() volume: number;
  @Input() currentTime;
  @Input() duration;
  @Output() volumeChange: EventEmitter<number>;
  @Output() toggleVideo: EventEmitter<void>;

  constructor() {
    this.volumeChange = new EventEmitter<number>();
    this.toggleVideo = new EventEmitter<void>();
  }

  ngOnInit() {
    console.log('volume', this.volume);
    console.log('currentTime', this.currentTime);
    console.log('duration', this.duration);
  }

}
