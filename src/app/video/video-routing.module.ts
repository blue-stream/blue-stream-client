import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VideoComponent } from './video.component';
import { VideoSectionListComponent } from './video-section-list/video-section-list.component';

const routes: Routes = [
  {
    path: 'watch/:id',
    component: VideoComponent
  },
  {
    path: '',
    component: VideoSectionListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VideoRoutingModule { }
