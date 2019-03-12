import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'bs-no-videos-found',
  templateUrl: './no-videos-found.component.html',
  styleUrls: ['./no-videos-found.component.scss']
})
export class NoVideosFoundComponent {

  @Input() showImage: boolean = false;
  @Input() message: string;

  constructor() { }
}
