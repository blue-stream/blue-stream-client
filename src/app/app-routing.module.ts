import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CanSysAdminActivateGuard } from './core/guards/can-sysadmin-activate.guard';


const routes: Routes = [
  {
    path: 'edit',
    loadChildren: './video-edit/video-edit.module#VideoEditModule'
  },
  {
    path: 'results',
    loadChildren: './search-results/search-results.module#SearchResultsModule'
  },
  {
    path: 'popular',
    loadChildren: './popular/popular.module#PopularModule'
  },
  {
    path: 'watch',
    loadChildren: './watch/watch.module#WatchModule'
  },
  {
    path: 'upload',
    loadChildren: './upload/upload.module#UploadModule',
  },
  {
    path: 'channels',
    loadChildren: './channels/channels.module#ChannelsModule',
  },
  {
    path: 'user',
    loadChildren: './channels/channels.module#ChannelsModule',
  },
  {
    path: 'admin',
    loadChildren: './admin-panel/admin-panel.module#AdminPanelModule',
    canActivate: [ CanSysAdminActivateGuard ],
  },
  {
    path: 'history',
    loadChildren: './history/history.module#HistoryModule',
  },
  {
    path: 'reactions',
    loadChildren: './user-reactions/user-reactions.module#UserReactionsModule',
  },
  {
    path: 'settings',
    loadChildren: './settings/settings.module#SettingsModule',
  },
  {
    path: '',
    loadChildren: './video/video.module#VideoModule'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
