import { Component, Input, OnChanges } from '@angular/core';
import { Channel } from '../../shared/models/channel.model';
import { UserService } from 'src/app/shared/user.service';
import { User } from 'src/app/shared/models/user.model';

@Component({
  selector: 'bs-channel-header',
  templateUrl: './channel-header.component.html',
  styleUrls: ['./channel-header.component.scss']
})
export class ChannelHeaderComponent implements OnChanges {
  @Input() channel: Channel;

  user: User;

  constructor(private userService: UserService) {}

  ngOnChanges() {
    if (this.channel.isProfile) {
      this.loadUser();
    }
  }

  loadUser() {
    this.userService.get(this.channel.user).subscribe(user => {
      this.user = user;
    });
  }
}
