import { Component, Input } from '@angular/core';
import { Channel } from '../../shared/models/channel.model';

@Component({
  selector: 'bs-channel-grid',
  templateUrl: './channel-grid.component.html',
  styleUrls: ['./channel-grid.component.scss']
})
export class ChannelGridComponent {
  @Input() channels: Channel[] = [];
  @Input() isSelectForUpload: boolean = false;

  constructor() { }
}
