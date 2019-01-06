import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChannelComponent } from './channel/channel.component';
import { ChannelsComponent } from './channels.component';

const routes: Routes = [
  {
    path: 'all',
    component: ChannelsComponent
  },
  {
    path: 'user',
    component: ChannelsComponent
  },
  {
    path: 'channel/:id',
    component: ChannelComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChannelsRoutingModule { }
