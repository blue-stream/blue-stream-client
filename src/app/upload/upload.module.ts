import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UploadComponent } from './upload/upload.component';
import { SharedModule } from '../shared/shared.module';
import { UploadService } from './upload.service';
import { UploadDialogComponent } from './upload-dialog/upload-dialog.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule
  ],
  declarations: [
    UploadComponent,
    UploadDialogComponent],
  exports: [
    UploadComponent
  ],
  entryComponents: [
    UploadDialogComponent
  ],
  providers: [
    UploadService
  ]
})
export class UploadModule { }
