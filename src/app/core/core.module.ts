import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VideoService } from './services/video.service';
import { ChannelService } from './services/channel.service';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [],
  providers: [
    VideoService,
    ChannelService
  ]
})
export class CoreModule { }
