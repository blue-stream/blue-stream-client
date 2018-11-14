import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FileUpload } from '../file-upload';
import { FileUploadStatus } from '../file-upload-status.enum';

@Component({
  selector: 'bs-upload-progress-bar',
  templateUrl: './upload-progress-bar.component.html',
  styleUrls: ['./upload-progress-bar.component.scss']
})
export class UploadProgressBarComponent {
  @Output() uploadCancelled: EventEmitter<null> = new EventEmitter();
  @Input('file') file: FileUpload;
  fileUploadStatus = FileUploadStatus;

  constructor() { }

  cancelUpload() {
    this.uploadCancelled.emit();
  }
}
