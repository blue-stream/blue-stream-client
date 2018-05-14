import { Component, OnInit, Input } from '@angular/core';
import { UploadProgress } from '../upload-progress';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'bs-video-upload-progress',
  templateUrl: './video-upload-progress.component.html',
  styleUrls: ['./video-upload-progress.component.scss']
})
export class VideoUploadProgressComponent implements OnInit {

  @Input('videoFile') videoFile: File;
  @Input('progress') progress: UploadProgress;
  fileUrl: SafeUrl;
  fileSize: number;

  constructor(private sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.fileUrl = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(this.videoFile));
    this.fileSize = Number((this.videoFile.size / 1024 / 1024).toFixed(2));
  }

}
