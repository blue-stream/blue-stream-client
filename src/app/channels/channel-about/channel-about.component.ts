import { Component, Input } from '@angular/core';
import { Channel } from '../channel.model';

@Component({
  selector: 'bs-channel-about',
  templateUrl: './channel-about.component.html',
  styleUrls: ['./channel-about.component.scss']
})
export class ChannelAboutComponent {
  @Input() channel: Channel;
  constructor() { }
}
