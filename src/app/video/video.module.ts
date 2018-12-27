import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VideoRoutingModule } from './video-routing.module';
import { SharedModule } from '../shared/shared.module';
import { CommentsModule } from '../comments/comments.module';
import { VideoSectionListComponent } from './video-section-list/video-section-list.component';
import { VideoSectionItemComponent } from './video-section-list/video-section-item/video-section-item.component';
import { VideoResponsiveViewDirective } from './shared/video-responsive-view.directive';
import { VideoEditComponent } from './video-edit/video-edit.component';
import { VideoEditHeaderComponent } from './video-edit/video-edit-header/video-edit-header.component';

@NgModule({
  imports: [
    CommonModule,
    VideoRoutingModule,
    SharedModule,
  ],
  declarations: [
    VideoSectionListComponent,
    VideoSectionItemComponent,
    VideoResponsiveViewDirective,
    VideoEditComponent,
    VideoEditHeaderComponent
  ],
  providers: [
  ]
})
export class VideoModule { }
