import { Component, Input } from '@angular/core';

@Component({
  selector: 'bs-channel-stats',
  templateUrl: './channel-stats.component.html',
  styleUrls: ['./channel-stats.component.scss']
})
export class ChannelStatsComponent {

  @Input() creationDate: Date | string;
  @Input() totalViews: number;
  @Input() videosAmount: number;

  constructor() { }
}
