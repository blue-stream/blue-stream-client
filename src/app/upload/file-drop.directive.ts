import { Directive, HostListener, HostBinding, Output, EventEmitter } from '@angular/core';

@Directive({
  selector: '[bsFileDrop]'
})
export class FileDropDirective {

  @Output() private filesSelected = new EventEmitter<FileList>();
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
    this.filesSelected.emit(event.dataTransfer.files);
  }
}
