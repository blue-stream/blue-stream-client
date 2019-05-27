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
  reuploadedVideoId: string;
  isFilePickerDisabled: boolean;

  constructor(
    private fileUploaderService: FileUploaderService,
    private route: ActivatedRoute,
    private videoService: VideoService,
    private translateService: TranslateService,
    public snackBar: MatSnackBar) {
    super();

  }

  ngOnInit() {
    this.fileUploaderService.clearQueue();
    this.videoUploadQueue = this.fileUploaderService.getQueue();
    this.routeIdSubscription = this.route.params.subscribe(params => {
      if (params.id) {
        this.channelId = params.id;
      } else if (params.videoId) {
        this.reuploadedVideoId = params.videoId;
      }
    });
  }

  filesSelected(files: File[]) {
    const videosToUpload = [];
    const fileTypeRegex: RegExp = new RegExp(/(.*)\.(\w+)$/);
    const fileExtensionRegexGroupIndex: number = 2;

    files.forEach(file => {
      const executedRegex = fileTypeRegex.exec(file.name);

      if (!executedRegex ||
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

      if (file.size > environment.maxFileSize) {
        const errorMessageTranslation: string = 'SNACK_BARS.ERRORS.FILE_SIZE_TOO_BIG';
        const okTranslation: string = 'SNACK_BARS.CONFIRM.OK';

        this.translateService.get([
          errorMessageTranslation,
          okTranslation]).subscribe(translations => {
            this.snackBar.open(
              translations[errorMessageTranslation],
              translations[okTranslation],
              { duration: 2000 });
          });

        throw new Error(`File size is too big - max file size is ${environment.maxFileSize} bytes`);
      }

      const video: Partial<Video> = {
        title: file.name,
        channel: this.channelId,
      };

      if (this.reuploadedVideoId) {
        this.videoService.reupload(this.reuploadedVideoId)
        .catch((err, caught) => {
          let message: string = 'SNACK_BARS.ERRORS.UNPREMITTED_USER';
          let action: string = 'SNACK_BARS.BUTTONS.OK';

          if (err.status === 404) {
            message = 'SNACK_BARS.ERRORS.VIDEO_NOT_FOUND';
            action = 'SNACK_BARS.BUTTONS.OK';
          } else if (!err.error || err.error.type !== 'UnPremittedUserError') {
            message = 'SNACK_BARS.ERRORS.UNKNOWN';
            action = 'SNACK_BARS.BUTTONS.OK';
          }

          this.translateService.get([message, action]).subscribe(translations => {
            this.snackBar.open(
              translations[message],
              translations[action],
              { duration: 2000 });
          });

          return new Observable(null);
        })
        .subscribe(res => {
          this.fileUploaderService.addToQueue(file, this.reuploadedVideoId, res.token, true);
          this.fileUploaderService.uploadAll();
          this.isFilePickerDisabled = true;
        });
      } else {
        videosToUpload.push(this.videoService.create(video));
      }
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
