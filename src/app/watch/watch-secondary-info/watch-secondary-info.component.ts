import { Component, OnInit, Input } from '@angular/core';
import { Video } from '../../shared/models/video.model';


@Component({
  selector: 'bs-watch-secondary-info',
  templateUrl: './watch-secondary-info.component.html',
  styleUrls: ['./watch-secondary-info.component.scss']
})
export class WatchSecondaryInfoComponent implements OnInit {

  @Input() video: Video;

  constructor() { }

  ngOnInit() {
  }

}
