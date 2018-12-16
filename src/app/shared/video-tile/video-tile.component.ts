import { Component, OnInit, Input } from '@angular/core';
import { Video } from '../models/video.model';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'bs-video-tile',
  templateUrl: './video-tile.component.html',
  styleUrls: ['./video-tile.component.scss']
})
export class VideoTileComponent implements OnInit {

  @Input() horizontal = false;
  @Input() description = false;
  @Input() video: Video;
  streamerUrl: string;

  constructor() {
    const apiUrl = 'api/streamer/thumbnail/';
    this.streamerUrl = environment.streamerServiceUrl + apiUrl;
  }

  ngOnInit() {
  }

}
