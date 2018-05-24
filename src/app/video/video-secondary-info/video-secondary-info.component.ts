import { Component, OnInit, Input } from '@angular/core';

import { Video } from '../models/video.model';

@Component({
  selector: 'bs-video-secondary-info',
  templateUrl: './video-secondary-info.component.html',
  styleUrls: ['./video-secondary-info.component.scss']
})
export class VideoSecondaryInfoComponent implements OnInit {

  @Input() video: Video;

  constructor() { }

  ngOnInit() {
  }

}
