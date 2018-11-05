import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { FileUpload } from '../file-upload';
import { FileUploaderService } from '../file-uploader.service';
import { VideoService } from '../../core/services/video.service';
import { Video } from '../../shared/models/video.model';
import { VideoUpload } from '../video-upload.interface';
import { forkJoin, of, interval } from 'rxjs';
import { MatSnackBar } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'bs-video-uploader',
  templateUrl: './video-uploader.component.html',
  styleUrls: ['./video-uploader.component.scss']
})
export class VideoUploaderComponent implements OnInit {
  videoUploadQueue: Observable<VideoUpload[]>;

  constructor(
    private fileUploaderService: FileUploaderService,
    private videoService: VideoService,
    public snackBar: MatSnackBar,
    private translateService: TranslateService) { }

  ngOnInit() {
    this.videoUploadQueue = this.fileUploaderService.getQueue();
  }

  publishVideo(video: Video) {
    this.videoService.update(video).subscribe(updatedVideo => {
      this.translateService.get([
        'UPLOADER.VIDEO_UPLOADER.PUBLISH_SUCCESS',
        'UPLOADER.VIDEO_UPLOADER.PUBLISH_SUCCESS_APPROVAL']).subscribe(translations => {
          this.snackBar.open(
            translations['UPLOADER.VIDEO_UPLOADER.PUBLISH_SUCCESS'],
            translations['UPLOADER.VIDEO_UPLOADER.PUBLISH_SUCCESS_APPROVAL'],
            { duration: 2000 });
        });
    });
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
