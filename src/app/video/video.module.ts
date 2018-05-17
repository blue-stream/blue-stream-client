import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VideoRoutingModule } from './video-routing.module';
import { VideoThumbnailComponent } from './video-thumbnail/video-thumbnail.component';
import { VideosComponent } from './videos/videos.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    VideoRoutingModule,
    SharedModule,
  ],
  declarations: [
    VideoThumbnailComponent,
    VideosComponent,
  ],
  providers: [
  ]
})
export class VideoModule { }
