import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VideoRoutingModule } from './video-routing.module';
import { SharedModule } from '../shared/shared.module';
import { VideoSectionListComponent } from './video-section-list/video-section-list.component';
import { VideoSectionItemComponent } from './video-section-list/video-section-item/video-section-item.component';
import { VideoResponsiveViewDirective } from './shared/video-responsive-view.directive';

@NgModule({
  imports: [
    CommonModule,
    VideoRoutingModule,
    SharedModule,
  ],
  declarations: [
    VideoSectionListComponent,
    VideoSectionItemComponent,
    VideoResponsiveViewDirective
  ],
  providers: [
  ]
})
export class VideoModule { }
