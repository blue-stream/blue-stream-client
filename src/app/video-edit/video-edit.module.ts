import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VideoEditRoutingModule } from './video-edit-routing.module';
import { SharedModule } from '../shared/shared.module';
import { VideoEditComponent } from './video-edit.component';
import { VideoEditHeaderComponent } from './video-edit-header/video-edit-header.component';

@NgModule({
  imports: [
    CommonModule,
    VideoEditRoutingModule,
    SharedModule,
  ],
  declarations: [
    VideoEditComponent,
    VideoEditHeaderComponent
  ],
  providers: [
  ]
})
export class VideoEditModule { }
