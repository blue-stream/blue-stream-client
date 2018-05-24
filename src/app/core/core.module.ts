import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VideoService } from './services/video.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers: [
    VideoService
  ]
})
export class CoreModule { }
