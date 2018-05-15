import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VideosComponent } from './videos/videos.component';
import { VideoComponent } from './video.component';
import { VideoUploadComponent } from './video-upload/video-upload.component';

const routes: Routes = [
  {
    path: '',
    component: VideosComponent
  },
  {
    path: 'watch/:id',
    component: VideoComponent
  },
  {
    path: 'upload',
    component: VideoUploadComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VideoRoutingModule { }
