import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { FileUpload } from '../file-upload';
import { FileUploaderService } from '../file-uploader.service';
import { VideoService } from '../../core/services/video.service';
import { Video } from '../../shared/models/video.model';
import { VideoUpload } from '../video-upload.interface';

@Component({
  selector: 'bs-video-uploader',
  templateUrl: './video-uploader.component.html',
  styleUrls: ['./video-uploader.component.scss']
})
export class VideoUploaderComponent implements OnInit {
  videoUploadQueue: Observable<VideoUpload[]>;

  constructor(private fileUploaderService: FileUploaderService,
    private videoService: VideoService) { }

  ngOnInit() {
    this.videoUploadQueue = this.fileUploaderService.getQueue();
  }

  filesSelected(files: FileList) {
    Array.from(files).forEach(async file => {
      const video: Partial<Video> = {
        title: file.name,
      };

      this.videoService.create(video).subscribe(returnedVideo => {
        this.fileUploaderService.addToQueue(file, returnedVideo.id);
      });
    });
    this.fileUploaderService.uploadAll();
  }
}
