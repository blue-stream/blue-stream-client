import { Component, OnInit, Input } from '@angular/core';
import { FileUpload } from '../file-upload';
import { FileUploadStatus } from '../file-upload-status.enum';

@Component({
  selector: 'bs-upload-progress-bar',
  templateUrl: './upload-progress-bar.component.html',
  styleUrls: ['./upload-progress-bar.component.scss']
})
export class UploadProgressBarComponent {

  @Input('file') file: FileUpload;
  fileUploadStatus = FileUploadStatus;

  constructor() { }
}
