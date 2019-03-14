import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


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
    path: '',
    loadChildren: './video/video.module#VideoModule'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
