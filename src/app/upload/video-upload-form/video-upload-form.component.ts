import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { VideoUpload } from '../video-upload.interface';
import { Video } from 'src/app/shared/models/video.model';
import { FileUploaderService } from '../file-uploader.service';

@Component({
  selector: 'bs-video-upload-form',
  templateUrl: './video-upload-form.component.html',
  styleUrls: ['./video-upload-form.component.scss']
})
export class VideoUploadFormComponent implements OnInit {

  @Input() isPublishReady: boolean;
  @Input() isReupload: boolean = false;
  @Input() videoUpload: VideoUpload;
  @Output() videoPublished: EventEmitter<string> = new EventEmitter();
  videoSaved = false;
  initVideo: Partial<Video>;

  constructor(private fileUploaderService: FileUploaderService) {}

  ngOnInit() {
    this.initVideo = { title: this.videoUpload.fileUpload.file.name, id: this.videoUpload.id };
  }

  onVideoSavedEvent() {
    this.fileUploaderService.markVideoAsPublished(this.videoUpload.id);
    this.videoSaved = true;
  }

}
