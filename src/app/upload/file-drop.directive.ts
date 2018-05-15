import { Directive, HostListener, ElementRef, Renderer, HostBinding } from '@angular/core';

@Directive({
  selector: '[bsFileDrop]'
})
export class FileDropDirective {

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

    console.log(event.dataTransfer.files);
  }
}
