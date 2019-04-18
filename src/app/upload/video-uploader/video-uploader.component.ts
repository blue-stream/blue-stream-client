import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { FileUploaderService } from '../file-uploader.service';
import { VideoService } from '../../core/services/video.service';
import { Video } from '../../shared/models/video.model';
import { VideoUpload } from '../video-upload.interface';
import { forkJoin } from 'rxjs';
import { ComponentCanDeactivate } from 'src/app/core/can-deactivate/component-can-deactivate';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { MatSnackBar } from '@angular/material';
import { environment } from '../../../environments/environment';
import { FileUploadStatus } from '../file-upload-status.enum';

@Component({
  selector: 'bs-video-uploader',
  templateUrl: './video-uploader.component.html',
  styleUrls: ['./video-uploader.component.scss']
})
export class VideoUploaderComponent extends ComponentCanDeactivate implements OnInit {
  videoUploadQueue: Observable<VideoUpload[]>;
  routeIdSubscription: any;
  channelId: string;
  uploadSuccessStatus: FileUploadStatus = FileUploadStatus.Success;

  constructor(
    private fileUploaderService: FileUploaderService,
    private route: ActivatedRoute,
    private videoService: VideoService,
    private translateService: TranslateService,
    public snackBar: MatSnackBar) {
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
    const fileTypeRegex: RegExp = new RegExp(/(video)\/(.*)/);
    const fileTypeRegexGorupIndex: number = 1;
    const fileExtensionRegexGroupIndex: number = 2;

    Array.from(files).forEach(file => {
      const executedRegex = fileTypeRegex.exec(file.type);

      if (!executedRegex ||
          executedRegex[fileTypeRegexGorupIndex] !== 'video' ||
          environment.supportedFileFormats.indexOf(executedRegex[fileExtensionRegexGroupIndex].toLocaleLowerCase()) === -1) {
        const errorMessageTranslation: string = 'SNACK_BARS.ERRORS.UNKNOWN_FILE_TYPE';
        const okTranslation: string = 'SNACK_BARS.CONFIRM.OK';

        this.translateService.get([
          errorMessageTranslation,
          okTranslation]).subscribe(translations => {
            this.snackBar.open(
              translations[errorMessageTranslation],
              translations[okTranslation],
              { duration: 2000 });
          });

        throw new Error('Unsupported file format');
      }

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

  canDeactivate() {
    return this.fileUploaderService.areVideosPublished();
  }
}
