import { Component, OnInit, Input } from '@angular/core';
import { FileUpload } from '../file-upload';
import { FileUploadStatus } from '../file-upload-status.enum';
import { FileUploaderService } from '../file-uploader.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../shared/confirm-dialog/confirm-dialog.component';
import { ConfirmDialogData } from '../../shared/confirm-dialog/confirm-dialog-data';

@Component({
  selector: 'bs-upload-progress-bar',
  templateUrl: './upload-progress-bar.component.html',
  styleUrls: ['./upload-progress-bar.component.scss']
})
export class UploadProgressBarComponent {

  @Input('file') file: FileUpload;
  fileUploadStatus = FileUploadStatus;

  constructor(
    private fileUploaderService: FileUploaderService,
    private dialog: MatDialog
  ) { }

  cancelUpload() {
    const confirmDialog = this.dialog.open(ConfirmDialogComponent, {
      width: '350px',
      data: {
        title: 'UPLOADER.UPLOAD_PROGRESS_BAR.CANCEL_UPLOAD_DIALOG.TITLE',
        text: 'UPLOADER.UPLOAD_PROGRESS_BAR.CANCEL_UPLOAD_DIALOG.TEXT',
        cancelButtonText: 'UPLOADER.UPLOAD_PROGRESS_BAR.CANCEL_UPLOAD_DIALOG.CANCEL_BUTTON',
        confirmButtonText: 'UPLOADER.UPLOAD_PROGRESS_BAR.CANCEL_UPLOAD_DIALOG.CONFIRM_BUTTON'
      } as ConfirmDialogData
    });

    confirmDialog.afterClosed().subscribe((confirm: boolean) => {
      if (confirm) {
        this.fileUploaderService.cancel(this.file);
      }
    });

  }
}
