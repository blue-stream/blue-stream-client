import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { FileUploadStatus } from '../file-upload-status.enum';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../shared/confirm-dialog/confirm-dialog.component';
import { ConfirmDialogData } from '../../shared/confirm-dialog/confirm-dialog-data';
import { FileUploaderService } from '../file-uploader.service';
import { VideoUpload } from '../video-upload.interface';

@Component({
  selector: 'bs-video-upload-progress',
  templateUrl: './video-upload-progress.component.html',
  styleUrls: ['./video-upload-progress.component.scss']
})
export class VideoUploadProgressComponent implements OnInit {

  videoUrl: SafeUrl;
  uploadStatus = FileUploadStatus;
  videoWatchLink: string;
  @Input() videoUpload: VideoUpload;

  @ViewChild('videoPlayer') videoPlayer: ElementRef;

  constructor(private sanitizer: DomSanitizer,
              private fileUploaderService: FileUploaderService,
              private dialog: MatDialog) { }

  ngOnInit() {
    this.videoPlayer.nativeElement.muted = 'muted';
    this.videoUrl = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(this.videoUpload.fileUpload.file));
    this.videoWatchLink = `/watch/${this.videoUpload.id}`;
  }

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
        this.fileUploaderService.cancel(this.videoUpload);
      }
    });
  }
}
