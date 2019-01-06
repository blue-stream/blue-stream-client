import { Component, OnInit } from '@angular/core';
import { ChannelService } from './channel.service';
import { Channel } from './channel.model';
import { UserService } from '../shared/user.service';

@Component({
  selector: 'bs-channels',
  templateUrl: './channels.component.html',
  styleUrls: ['./channels.component.scss']
})
export class ChannelsComponent implements OnInit {

  channels: Channel[] = [];

  constructor(private channelService: ChannelService, private userService: UserService) { }

  ngOnInit() {
    this.loadChannels();
  }

  loadChannels() {
    const channelFilter: Partial<Channel> = {
      user: this.userService.getUser(),
    };
    this.channelService.getMany(channelFilter, 0, 20).subscribe(channels => {
      this.channels = channels;
      console.log(channels);
    });
  }

}
