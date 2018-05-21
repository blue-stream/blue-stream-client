import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VideoUploaderComponent } from './video-uploader/video-uploader.component';

const routes: Routes = [
  { path: '', component: VideoUploaderComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UploadRoutingModule { }
