import { Component, OnInit, Input, ViewChild, ElementRef, EventEmitter, Output } from '@angular/core';
import { MatSliderChange } from '@angular/material/slider';

@Component({
  selector: 'bs-video-progress',
  templateUrl: './video-progress.component.html',
  styleUrls: ['./video-progress.component.scss']
})
export class VideoProgressComponent implements OnInit {

  @Input() value = 0;
  @ViewChild('videoProgress') videoProgress: ElementRef;
  @Output() progressChanged: EventEmitter<number>;

  constructor() {
    this.progressChanged = new EventEmitter<number>();
  }

  ngOnInit() {
  }

  changeTime(event: MatSliderChange) {
    this.progressChanged.next(event.value);
  }

}
