import { Component, OnInit, Input, ViewChild, ElementRef, EventEmitter, Output } from '@angular/core';
import { MatSliderChange } from '@angular/material/slider';
import { Subject } from 'rxjs';
import 'rxjs/add/operator/throttleTime';

@Component({
  selector: 'bs-video-progress',
  templateUrl: './video-progress.component.html',
  styleUrls: ['./video-progress.component.scss']
})
export class VideoProgressComponent implements OnInit {

  @Input() value = 0;
  @Input() duration;
  @ViewChild('videoProgress') videoProgress: ElementRef;
  @Output() progressChangeStart: EventEmitter<void>;
  @Output() progressChanged: EventEmitter<number>;
  @Output() progressChangeEnd: EventEmitter<void>;
  progressSliderChange: Subject<MatSliderChange>;

  constructor() {
    this.progressChanged = new EventEmitter<number>();
    this.progressChangeStart = new EventEmitter<void>();
    this.progressChangeEnd = new EventEmitter<void>();
    this.progressSliderChange = new Subject<MatSliderChange>();
    this.progressSliderChange
      .map((event: MatSliderChange) => {
        return event.value;
      })
      .subscribe((progress: number) => {
        this.progressChangeStart.next();
        if (Math.abs(progress - this.value) >= 1) {
          this.progressChanged.next(progress);
        }
      });
  }

  onProgressChange() {
    this.progressChangeEnd.next();
  }

  ngOnInit() {
  }
}
