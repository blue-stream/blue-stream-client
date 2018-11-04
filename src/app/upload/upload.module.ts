import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UploadRoutingModule } from './upload-routing.module';
import { FilePickerComponent } from './file-picker/file-picker.component';
import { FileUploaderService } from './file-uploader.service';
import { FileDropDirective } from './file-drop.directive';
import { SharedModule } from '../shared/shared.module';
import { VideoUploaderComponent } from './video-uploader/video-uploader.component';
import { VideoUploadFormComponent } from './video-upload-form/video-upload-form.component';
import { VideoUploadProgressComponent } from './video-upload-progress/video-upload-progress.component';
import { UploadProgressBarComponent } from './upload-progress-bar/upload-progress-bar.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    UploadRoutingModule,
    ReactiveFormsModule,
    SharedModule
  ],
  declarations: [
    FilePickerComponent,
    FileDropDirective,
    VideoUploaderComponent,
    VideoUploadFormComponent,
    VideoUploadProgressComponent,
    UploadProgressBarComponent
  ],
  providers: [FileUploaderService]
})
export class UploadModule { }
