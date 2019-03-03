import { Component, Input } from '@angular/core';
import { Channel } from '../../shared/models/channel.model';

@Component({
  selector: 'bs-channel-header',
  templateUrl: './channel-header.component.html',
  styleUrls: ['./channel-header.component.scss']
})
export class ChannelHeaderComponent {
  @Input() channel: Channel;
  constructor() { }
}
