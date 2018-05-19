import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VideoRoutingModule } from './video-routing.module';
import { VideoThumbnailComponent } from './video-thumbnail/video-thumbnail.component';
import { SharedModule } from '../shared/shared.module';
import { VideoTileComponent } from './video-tile/video-tile.component';
import { VideoSectionListComponent } from './video-section-list/video-section-list.component';
import { VideoSectionItemComponent } from './video-section-list/video-section-item/video-section-item.component';
import { VideoListComponent } from './video-list/video-list.component';
import { VideoResponsiveViewDirective } from './shared/video-responsive-view.directive';

@NgModule({
  imports: [
    CommonModule,
    VideoRoutingModule,
    SharedModule,
  ],
  declarations: [
    VideoThumbnailComponent,
    VideoTileComponent,
    VideoSectionListComponent,
    VideoSectionItemComponent,
    VideoListComponent,
    VideoResponsiveViewDirective
  ],
  providers: [
  ]
})
export class VideoModule { }
