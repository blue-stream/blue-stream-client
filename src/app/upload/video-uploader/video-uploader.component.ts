import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { FileUpload } from '../file-upload';
import { FileUploaderService } from '../file-uploader.service';

@Component({
  selector: 'bs-video-uploader',
  templateUrl: './video-uploader.component.html',
  styleUrls: ['./video-uploader.component.scss']
})
export class VideoUploaderComponent implements OnInit {
  fileUploadQueue: Observable<FileUpload[]>;

  constructor(private fileUploaderService: FileUploaderService) { }

  ngOnInit() {
    this.fileUploadQueue = this.fileUploaderService.getQueue();
  }

  filesSelected(files: FileList) {
    this.addToQueue(files);
    this.fileUploaderService.uploadAll();
  }

  addToQueue(files: FileList) {
    this.fileUploaderService.addToQueue(Array.from(files));
  }

}
