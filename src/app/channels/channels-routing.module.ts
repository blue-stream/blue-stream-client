import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChannelComponent } from './channel/channel.component';
import { ChannelsComponent } from './channels.component';
import { ChannelAddComponent } from './channel-add/channel-add.component';
import { ChannelSearchComponent } from './channel-search/channel-search.component';

const routes: Routes = [
  {
    path: 'upload',
    component: ChannelsComponent,
  },
  {
    path: 'create',
    component: ChannelAddComponent,
  },
  {
    path: 'search',
    component: ChannelSearchComponent,
  },
  {
    path: 'user',
    component: ChannelsComponent,
  },
  {
    path: 'profile/:userId',
    component: ChannelComponent,
  },
  {
    path: '',
    component: ChannelsComponent,
  },
  {
    path: ':id',
    component: ChannelComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChannelsRoutingModule { }
