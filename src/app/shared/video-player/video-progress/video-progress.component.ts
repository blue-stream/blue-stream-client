import { Component, OnInit, Input, EventEmitter, Output, ElementRef } from '@angular/core';
import { MatSliderChange } from '@angular/material/slider';
import { Subject } from 'rxjs';
import 'rxjs/add/operator/throttleTime';

@Component({
  selector: 'bs-video-progress',
  templateUrl: './video-progress.component.html',
  styleUrls: ['./video-progress.component.scss']
})
export class VideoProgressComponent {

  @Input() value = 0;
  @Input() buffer = 0;
  @Input() duration;
  @Output() progressChangeStart: EventEmitter<void>;
  @Output() progressChanged: EventEmitter<number>;
  @Output() progressChangeEnd: EventEmitter<void>;
  progressSliderChange: Subject<MatSliderChange>;
  mouseProgress: number;

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
        if (this.duration * Math.abs(progress - this.value) / 100 >= 3) {
          this.progressChanged.next(progress);
        }
      });
  }

  onProgressChange(progress: number) {
    this.progressChanged.next(progress);
    this.progressChangeEnd.next();
  }

  onMouseProgressMove(event: MouseEvent) {
    this.mouseProgress = event.offsetX;
  }
}
