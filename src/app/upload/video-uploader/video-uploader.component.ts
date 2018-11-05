import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { FileUpload } from '../file-upload';
import { FileUploaderService } from '../file-uploader.service';
import { VideoService } from '../../core/services/video.service';
import { Video } from '../../shared/models/video.model';
import { VideoUpload } from '../video-upload.interface';
import { forkJoin, of, interval } from 'rxjs';

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

  publishVideo(video: Video) {
    console.log(video);
   /* this.videoService.update(video).subscribe(updatedVideo => {
      console.log('Video published');
    }); */
  }

  filesSelected(files: FileList) {
    const videosToUpload = [];

    Array.from(files).forEach(async file => {
      const video: Partial<Video> = {
        title: file.name,
      };

      videosToUpload.push(this.videoService.create(video));
    });

    forkJoin(videosToUpload).subscribe(videoIds => {
      videoIds.forEach((video, index) => {
        this.fileUploaderService.addToQueue(files[index], video.id);
      });

      this.fileUploaderService.uploadAll();
    });

  }
}
