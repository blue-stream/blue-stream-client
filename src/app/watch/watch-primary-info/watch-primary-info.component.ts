import { Component, OnInit, Input } from '@angular/core';
import { Video } from '../../shared/models/video.model';


@Component({
  selector: 'bs-watch-primary-info',
  templateUrl: './watch-primary-info.component.html',
  styleUrls: ['./watch-primary-info.component.scss']
})
export class WatchPrimaryInfoComponent implements OnInit {

  @Input() video: Video;

  constructor() { }

  ngOnInit() {
  }

  getLikesToDislikesRatio(): number {
    return (this.video.likes * 100) / (this.video.likes + this.video.dislikes);
  }
}
