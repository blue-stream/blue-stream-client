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
  fileUploadQueue: Observable<VideoUpload[]>;

  constructor(private fileUploaderService: FileUploaderService,
    private videoService: VideoService) { }

  ngOnInit() {
    this.fileUploadQueue = this.fileUploaderService.getQueue();
  }

  filesSelected(files: FileList) {
    Array.from(files).forEach(async file => {
      const video: Partial<Video> = {
        title: files[0].name,
      };

      this.videoService.create(video).subscribe(returnedVideo => {
        this.fileUploaderService.addToQueue(file, returnedVideo.id);
      });
    });

    this.fileUploaderService.uploadAll();
  }
}
