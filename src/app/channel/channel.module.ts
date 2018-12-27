import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChannelComponent } from './channel.component';
import { ChannelService } from './channel.service';
import { ChannelRoutingModule } from './channel-routing.module';
import { ChannelHeaderComponent } from './channel-header/channel-header.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ChannelRoutingModule,
  ],
  declarations: [ChannelComponent, ChannelHeaderComponent],
  providers: [ChannelService],
})
export class ChannelModule { }
