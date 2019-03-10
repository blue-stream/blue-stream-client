import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { FileUploaderService } from '../file-uploader.service';
import { VideoService } from '../../core/services/video.service';
import { Video } from '../../shared/models/video.model';
import { VideoUpload } from '../video-upload.interface';
import { forkJoin } from 'rxjs';
import { ComponentCanDeactivate } from 'src/app/core/can-deactivate/component-can-deactivate';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'bs-video-uploader',
  templateUrl: './video-uploader.component.html',
  styleUrls: ['./video-uploader.component.scss']
})
export class VideoUploaderComponent extends ComponentCanDeactivate implements OnInit {
  videoUploadQueue: Observable<VideoUpload[]>;
  routeIdSubscription: any;
  channelId: string;

  constructor(
    private fileUploaderService: FileUploaderService,
    private route: ActivatedRoute,
    private videoService: VideoService) {
    super();
  }

  ngOnInit() {
    this.videoUploadQueue = this.fileUploaderService.getQueue();
    this.routeIdSubscription = this.route.params.subscribe(params => {
      if (params.id) {
        this.channelId = params.id;
      }
    });
  }

  filesSelected(files: FileList) {
    const videosToUpload = [];

    Array.from(files).forEach(file => {
      const video: Partial<Video> = {
        title: file.name,
        channel: this.channelId,
      };

      videosToUpload.push(this.videoService.create(video));
    });

    forkJoin(videosToUpload).subscribe(videos => {
      videos.forEach((video, index) => {
        this.fileUploaderService.addToQueue(files[index], video.id, video.token);
      });

      this.fileUploaderService.uploadAll();
    });
  }

  onVideoPublish(videoId: string) {
    this.fileUploaderService.markVideoAsPublished(videoId);
  }

  onVideoSaved(videoId: string) {
    this.fileUploaderService.markVideoAsSaved(videoId);
  }

  canDeactivate() {
    return this.fileUploaderService.areVideosPublished() || this.fileUploaderService.areVideosSaved();
  }
}
