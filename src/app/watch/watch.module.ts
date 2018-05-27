import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WatchRoutingModule } from './watch-routing.module';
import { WatchComponent } from './watch.component';
import { WatchDescriptionComponent } from './watch-description/watch-description.component';
import { WatchOwnerComponent } from './watch-owner/watch-owner.component';
import { WatchPrimaryInfoComponent } from './watch-primary-info/watch-primary-info.component';
import { WatchSecondaryInfoComponent } from './watch-secondary-info/watch-secondary-info.component';
import { SharedModule } from '../shared/shared.module';
import { CommentsModule } from '../comments/comments.module';

@NgModule({
  imports: [
    CommonModule,
    WatchRoutingModule,

    SharedModule,
    CommentsModule
  ],
  declarations: [
    WatchComponent,
    WatchDescriptionComponent,
    WatchOwnerComponent,
    WatchPrimaryInfoComponent,
    WatchSecondaryInfoComponent
  ]
})
export class WatchModule { }
