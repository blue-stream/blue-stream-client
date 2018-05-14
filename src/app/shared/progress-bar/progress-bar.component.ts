import { Component, OnInit, Input } from '@angular/core';
import { UploadProgress } from '../../video/upload-progress';

@Component({
  selector: 'bs-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.scss']
})
export class ProgressBarComponent {

  @Input('progress') progress: UploadProgress;

  constructor() { }

}
