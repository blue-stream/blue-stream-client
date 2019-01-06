import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VideoSectionListComponent } from './video-section-list/video-section-list.component';
import { VideoEditComponent } from './video-edit/video-edit.component';

const routes: Routes = [
  {
    path: '',
    component: VideoSectionListComponent
  },
  {
    path: 'video/:id/edit',
    component: VideoEditComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VideoRoutingModule { }
