import { Component, OnInit, Input } from '@angular/core';
import { VideoStatus } from '../../shared/models/video.model';

@Component({
  selector: 'bs-watch-alert-message',
  templateUrl: './watch-alert-message.component.html',
  styleUrls: ['./watch-alert-message.component.scss']
})
export class WatchAlertMessageComponent implements OnInit {

  @Input() status: VideoStatus;
  failed = VideoStatus.FAILED;

  constructor() { }

  ngOnInit() {
  }

}
