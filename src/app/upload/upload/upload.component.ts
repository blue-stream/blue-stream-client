import { Component, } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UploadService } from '../upload.service';
import { UploadDialogComponent } from '../upload-dialog/upload-dialog.component';

@Component({
  selector: 'bs-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent {

  constructor(public dialog: MatDialog, public uploadService: UploadService) { }

  public openUploadDialog() {
    let dialogRef = this.dialog.open(UploadDialogComponent, { width: '50%', height: '50%' });
  }
}
