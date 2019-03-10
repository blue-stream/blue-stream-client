import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChannelComponent } from './channel/channel.component';
import { ChannelService } from '../core/services/channel.service';
import { ChannelsRoutingModule } from './channels-routing.module';
import { ChannelHeaderComponent } from './channel-header/channel-header.component';
import { SharedModule } from '../shared/shared.module';
import { ChannelAboutComponent } from './channel-about/channel-about.component';
import { ChannelHomeComponent } from './channel-home/channel-home.component';
import { ChannelStatsComponent } from './channel-stats/channel-stats.component';
import { ChannelManageComponent } from './channel-manage/channel-manage.component';
import { ChannelFormComponent } from './channel-form/channel-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ChannelGridComponent } from './channel-grid/channel-grid.component';
import { ChannelGridItemComponent } from './channel-grid-item/channel-grid-item.component';
import { ChannelsComponent } from './channels.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { ChannelAddComponent } from './channel-add/channel-add.component';
import { ChannelVideosComponent } from './channel-videos/channel-videos.component';
import { ChannelPermissionsComponent } from './channel-permissions/channel-permissions.component';
import { ChannelPermissionsFormComponent } from './channel-permissions-form/channel-permissions-form.component';
import { ChannelPermissionComponent } from './channel-permission/channel-permission.component';


@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ChannelsRoutingModule,
    ReactiveFormsModule,
    InfiniteScrollModule,
  ],
  declarations: [
    ChannelComponent,
    ChannelHeaderComponent,
    ChannelAboutComponent,
    ChannelHomeComponent,
    ChannelStatsComponent,
    ChannelManageComponent,
    ChannelFormComponent,
    ChannelGridComponent,
    ChannelGridItemComponent,
    ChannelsComponent,
    ChannelAddComponent,
    ChannelVideosComponent,
    ChannelPermissionsComponent,
    ChannelPermissionsFormComponent,
    ChannelPermissionComponent
  ],
  providers: [ChannelService],
})
export class ChannelsModule { }
