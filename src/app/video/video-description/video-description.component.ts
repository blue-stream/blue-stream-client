import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'bs-video-description',
  templateUrl: './video-description.component.html',
  styleUrls: ['./video-description.component.scss']
})
export class VideoDescriptionComponent implements OnInit {

  @Input() text: string;

  constructor() { }

  ngOnInit() {
  }

}
