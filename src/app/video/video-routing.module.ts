import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VideoSectionListComponent } from './video-section-list/video-section-list.component';

const routes: Routes = [
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
