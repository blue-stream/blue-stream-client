import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { FileUpload } from '../file-upload';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { FileUploadStatus } from '../file-upload-status.enum';

@Component({
  selector: 'bs-video-upload-progress',
  templateUrl: './video-upload-progress.component.html',
  styleUrls: ['./video-upload-progress.component.scss']
})
export class VideoUploadProgressComponent implements OnInit {

  videoUrl: SafeUrl;
  uploadStatus = FileUploadStatus;
  @Input('uploadFile') uploadFile: FileUpload;
  @ViewChild('videoPlayer') videoPlayer: ElementRef;

  constructor(private sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.videoPlayer.nativeElement.muted = 'muted';
    this.videoUrl = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(this.uploadFile.file));
  }

}
