import { Directive, HostListener, HostBinding, ElementRef, Renderer, OnInit } from '@angular/core';

@Directive({
  selector: '[bsFileDrop]'
})
export class FileDropDirective implements OnInit {

  private container: ElementRef;

  constructor(
    private el: ElementRef,
    private renderer: Renderer
  ) { }

  ngOnInit() {
    this.container = this.el.nativeElement.querySelector('.upload-icon-container');
  }

  @HostListener('dragover', ['$event']) onDragOver(evt) {
    evt.preventDefault();
    evt.stopPropagation();

    this.renderer.setElementClass(this.container, 'dragover', true);
  }

  @HostListener('dragleave', ['$event']) onDragLeave(evt) {
    evt.preventDefault();
    evt.stopPropagation();

    this.renderer.setElementClass(this.container, 'dragover', false);
  }

  @HostListener('drop', ['$event']) public onDrop(evt) {
    evt.preventDefault();
    evt.stopPropagation();

    this.renderer.setElementClass(this.container, 'dragover', false);
    const files = evt.dataTransfer.files;
    if (files.length > 0) {
      console.log(files);
    }
  }
}
