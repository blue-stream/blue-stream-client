import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: 'watch',
    loadChildren: './watch/watch.module#WatchModule'
  },
  {
    path: 'upload',
    loadChildren: './upload/upload.module#UploadModule',
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
