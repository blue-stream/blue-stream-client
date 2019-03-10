import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VideoEditComponent } from './video-edit.component';

const routes: Routes = [
  {
    path: ':id',
    component: VideoEditComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VideoEditRoutingModule { }
