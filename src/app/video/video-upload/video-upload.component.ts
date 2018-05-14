import { Component, ViewChild, ElementRef, } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { VideoService } from '../video.service';
import { Observable } from 'rxjs';
import { UploadProgress } from '../upload-progress';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'bs-video-upload',
  templateUrl: './video-upload.component.html',
  styleUrls: ['./video-upload.component.scss']
})
export class VideoUploadComponent {

  private file: File;
  private fileUrl: SafeUrl;
  private progress: Observable<UploadProgress>;
  private isHighlighted = false;

  @ViewChild('fileInput') fileInput: ElementRef;

  constructor(
    private sanitizer: DomSanitizer,
    public snackBar: MatSnackBar,
    private videoService: VideoService,
  ) { }


  onDragOver(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();

    console.log(event);

    this.isHighlighted = true;
    return false;
  }

  onDragLeave(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();

    this.isHighlighted = false;
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();

    this.isHighlighted = false;

    const files = event.dataTransfer.files;
    if (files.length === 1) {
      this.setFile(files[0]);
    }
  }

  setFile(file: File) {
    if (file.type.startsWith('video/')) {
      this.file = file;
      this.fileUrl = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(file));
      this.uploadVideo();
    } else {
      this.snackBar.open('The file you are uploading is not a valid video file', null, {
        duration: 2000,
      });
    }
  }

  openFileBrowser() {
    this.fileInput.nativeElement.click();
  }

  onFileOpened() {
    this.setFile(this.fileInput.nativeElement.files[0]);
  }

  uploadVideo() {
    if (this.file) {
      // const test = new Set<File>();
      // test.add(this.file);
      // const status = this.videoService.uploadFiles(test);
      // const x = status[this.file.name].subscribe(console.log);
      // setTimeout(() => {
      //   x.unsubscribe();
      // }, 1000);
      this.progress = this.videoService.upload(this.file);
    }
  }
}
