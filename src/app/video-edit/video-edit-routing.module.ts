import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VideoEditComponent } from './video-edit.component';
import { CanDeactivateGuard } from '../core/can-deactivate/can-deactivate.guard';

const routes: Routes = [
  {
    path: ':id',
    component: VideoEditComponent,
    canDeactivate: [CanDeactivateGuard],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VideoEditRoutingModule { }
