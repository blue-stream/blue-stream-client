import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VideoUploaderComponent } from './video-uploader/video-uploader.component';
import { CanDeactivateGuard } from '../core/can-deactivate/can-deactivate.guard';


const routes: Routes = [
  {
    path: '',
    component: VideoUploaderComponent,
    canDeactivate: [CanDeactivateGuard],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UploadRoutingModule { }
