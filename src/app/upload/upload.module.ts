import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UploadRoutingModule } from './upload-routing.module';
import { FileUploaderComponent } from './file-uploader/file-uploader.component';
import { FileUploaderService } from './file-uploader.service';
import { FileDropDirective } from './file-drop.directive';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    UploadRoutingModule,

    SharedModule
  ],
  declarations: [FileUploaderComponent, FileDropDirective],
  providers: [FileUploaderService]
})
export class UploadModule { }
