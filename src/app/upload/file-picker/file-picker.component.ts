import { Component, ViewChild, Output, EventEmitter, ElementRef, Input } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { FileUpload } from '../file-upload';

@Component({
  selector: 'bs-file-picker',
  templateUrl: './file-picker.component.html',
  styleUrls: ['./file-picker.component.scss']
})
export class FilePickerComponent {

  @Input() isMultiFile: boolean = true;
  uploadQueue: Observable<FileUpload[]>;
  @Output() private filesSelected: EventEmitter<File[]>;
  @ViewChild('fileInput') fileInput: ElementRef;

  constructor() {
    this.filesSelected = new EventEmitter<File[]>();
  }

  openFileBrowser() {
    this.fileInput.nativeElement.click();
  }

  onFilesSelected(files: File[]) {
    this.filesSelected.emit(files);
  }
}
