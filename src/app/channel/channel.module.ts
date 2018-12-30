import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChannelComponent } from './channel.component';
import { ChannelService } from './channel.service';
import { ChannelRoutingModule } from './channel-routing.module';
import { ChannelHeaderComponent } from './channel-header/channel-header.component';
import { SharedModule } from '../shared/shared.module';
import { ChannelAboutComponent } from './channel-about/channel-about.component';
import { ChannelHomeComponent } from './channel-home/channel-home.component';
import { ChannelStatsComponent } from './channel-stats/channel-stats.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ChannelRoutingModule,
  ],
  declarations: [ChannelComponent, ChannelHeaderComponent, ChannelAboutComponent, ChannelHomeComponent, ChannelStatsComponent],
  providers: [ChannelService],
})
export class ChannelModule { }
