import { Component, Input } from '@angular/core';
import { Channel } from '../../shared/models/channel.model';

@Component({
  selector: 'bs-channel-manage',
  templateUrl: './channel-manage.component.html',
  styleUrls: ['./channel-manage.component.scss']
})
export class ChannelManageComponent {
  @Input() channel: Channel;
  isEditActive: boolean = false;

  constructor() { }
}
