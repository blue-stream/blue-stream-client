import { Component, OnInit, Input } from '@angular/core';
import { FileUpload } from '../file-upload';

@Component({
  selector: 'bs-video-upload-form',
  templateUrl: './video-upload-form.component.html',
  styleUrls: ['./video-upload-form.component.scss']
})
export class VideoUploadFormComponent implements OnInit {

  @Input('file') file: FileUpload;

  constructor() { }

  ngOnInit() {
  }

}
