import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VideoRoutingModule } from './video-routing.module';
import { VideoThumbnailComponent } from './video-thumbnail/video-thumbnail.component';
import { SharedModule } from '../shared/shared.module';
import { VideoComponent } from './video.component';
import { CommentsModule } from '../comments/comments.module';
import { VideoPrimaryInfoComponent } from './video-primary-info/video-primary-info.component';
import { VideoSecondaryInfoComponent } from './video-secondary-info/video-secondary-info.component';
import { VideoOwnerComponent } from './video-owner/video-owner.component';
import { VideoDescriptionComponent } from './video-description/video-description.component';
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
    CommentsModule
  ],
  declarations: [
    VideoThumbnailComponent,
    VideoComponent,
    VideoPrimaryInfoComponent,
    VideoSecondaryInfoComponent,
    VideoOwnerComponent,
    VideoDescriptionComponent,
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
