import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { VideoService } from '../video.service';
import { Observable } from 'rxjs';
import { UploadProgress } from '../upload-progress';

@Component({
  selector: 'bs-video-upload',
  templateUrl: './video-upload.component.html',
  styleUrls: ['./video-upload.component.scss']
})
export class VideoUploadComponent implements OnInit {

  private file: File;
  private fileUrl: SafeUrl;
  private progress: Observable<UploadProgress>;

  @ViewChild('fileInput') fileInput: ElementRef;

  constructor(
    private sanitizer: DomSanitizer,
    private videoService: VideoService
  ) { }

  ngOnInit() {
  }

  openFileBrowser() {
    this.fileInput.nativeElement.click();
  }

  onFileOpened() {
    this.file = this.fileInput.nativeElement.files[0];
    this.fileUrl = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(this.file));
  }

  uploadVideo() {
    if (this.file) {
      this.progress = this.videoService.upload(this.file);
    }
  }
}
