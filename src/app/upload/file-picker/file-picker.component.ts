import { Component, ViewChild, Output, EventEmitter, ElementRef, Input } from '@angular/core';
import { FileUploaderService } from '../file-uploader.service';
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
  @Output() private filesSelected: EventEmitter<FileList>;
  @ViewChild('fileInput') fileInput: ElementRef;

  constructor() {
    this.filesSelected = new EventEmitter<FileList>();
  }

  openFileBrowser() {
    this.fileInput.nativeElement.click();
  }

  onFilesSelected(files: FileList) {
    this.filesSelected.emit(files);
  }
}
