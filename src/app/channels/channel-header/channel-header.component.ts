import { Component, Input } from '@angular/core';
import { Channel } from '../../shared/models/channel.model';
import { UserService } from 'src/app/shared/user.service';
import { User } from 'src/app/shared/models/user.model';

@Component({
  selector: 'bs-channel-header',
  templateUrl: './channel-header.component.html',
  styleUrls: ['./channel-header.component.scss']
})
export class ChannelHeaderComponent {
  @Input() channel: Channel;
  @Input() user: User;

  constructor() {}
}
