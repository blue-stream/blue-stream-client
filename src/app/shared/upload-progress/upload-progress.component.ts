import { Component, OnInit, Input } from '@angular/core';
import { UploadProgress } from '../../video/upload-progress';

@Component({
  selector: 'bs-upload-progress',
  templateUrl: './upload-progress.component.html',
  styleUrls: ['./upload-progress.component.scss']
})
export class UploadProgressComponent implements OnInit {

  @Input('fileName') fileName: string;
  @Input('progress') progress: UploadProgress;

  constructor() { }

  ngOnInit() {
  }

}
