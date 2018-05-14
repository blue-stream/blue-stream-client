import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VideoRoutingModule } from './video-routing.module';
import { VideoThumbnailComponent } from './video-thumbnail/video-thumbnail.component';
import { VideosComponent } from './videos/videos.component';
import { SharedModule } from '../shared/shared.module';
import { VideoUploadComponent } from './video-upload/video-upload.component';
import { VideoService } from './video.service';
import { VideoUploadProgressComponent } from './video-upload-progress/video-upload-progress.component';

@NgModule({
  imports: [
    CommonModule,
    VideoRoutingModule,
    SharedModule,
  ],
  declarations: [
    VideoThumbnailComponent,
    VideosComponent,
    VideoUploadComponent,
    VideoUploadProgressComponent,
  ],
  providers: [
    VideoService
  ]
})
export class VideoModule { }
