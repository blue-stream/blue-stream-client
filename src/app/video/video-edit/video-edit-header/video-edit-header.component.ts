import { Component, OnInit, Input } from '@angular/core';
import { Video } from '../../../shared/models/video.model';

@Component({
  selector: 'bs-video-edit-header',
  templateUrl: './video-edit-header.component.html',
  styleUrls: ['./video-edit-header.component.scss']
})
export class VideoEditHeaderComponent implements OnInit {

  @Input() video: Video;
  constructor() { }

  ngOnInit() {
  }

}
