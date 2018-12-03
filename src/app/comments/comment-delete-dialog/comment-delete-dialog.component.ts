import { Component, ViewEncapsulation } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'bs-comment-delete-dialog',
  templateUrl: './comment-delete-dialog.component.html',
  styleUrls: ['./comment-delete-dialog.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
})
export class CommentDeleteDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<CommentDeleteDialogComponent>) { }

  onCancel(): void {
    this.dialogRef.close(false);
  }

  onApprove(): void {
    this.dialogRef.close(true);
  }
}
