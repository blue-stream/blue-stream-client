import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { VideoUpload } from '../video-upload.interface';
import { Video } from 'src/app/shared/models/video.model';

@Component({
  selector: 'bs-video-upload-form',
  templateUrl: './video-upload-form.component.html',
  styleUrls: ['./video-upload-form.component.scss']
})
export class VideoUploadFormComponent {

  @Input() isPublishReady: boolean;
  @Input() videoUpload: VideoUpload;
  @Output() videoPublished: EventEmitter<string> = new EventEmitter();
  videoSaved = false;

  onVideoSavedEvent() {
    this.videoPublished.emit(this.videoUpload.id);
    this.videoSaved = true;
  }

}
