import { Directive, HostListener, HostBinding, Output, EventEmitter, Input } from '@angular/core';

@Directive({
  selector: '[bsFileDrop]'
})
export class FileDropDirective {

  @Input() isMultiFile: boolean = true;
  @Output() private filesSelected = new EventEmitter<File[]>();
  @HostBinding('class') elementClass = '';

  constructor() { }

  @HostListener('dragover', ['$event'])
  @HostListener('dragstart', ['$event'])
  onDragOver(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();

    this.elementClass = 'highlight';

    return false;
  }

  @HostListener('dragleave', ['$event'])
  onDragLeave(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();

    this.elementClass = '';

    return false;
  }

  @HostListener('drop', ['$event'])
  onDrop(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();

    this.elementClass = '';
    const files: File[] = Array.from(event.dataTransfer.files);

    if (this.isMultiFile) {
      this.filesSelected.emit(files);
    } else {      
      this.filesSelected.emit([files[0]]);
    }
  }
}
