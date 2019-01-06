import { Component, OnInit } from '@angular/core';
import { ChannelService } from './channel.service';
import { Channel } from './channel.model';
import { UserService } from '../shared/user.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'bs-channels',
  templateUrl: './channels.component.html',
  styleUrls: ['./channels.component.scss']
})
export class ChannelsComponent implements OnInit {

  channels: Channel[] = [];
  urlSubscription: any;

  constructor(
    private channelService: ChannelService,
    private userService: UserService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.urlSubscription = this.route.url.subscribe(url => {
      const filter: Partial<Channel> = this.getFilter(url.pop().toString());
      this.loadChannels(filter);
    });
  }

  getFilter(url: string) {
    if (url === 'user') {
      return { user: this.userService.getUser() };
    } else if (url === 'all') {
      return {};
    }
  }

  loadChannels(channelFilter: Partial<Channel>) {
    this.channelService.getMany(channelFilter, 0, 20).subscribe(channels => {
      this.channels = channels;
    });
  }

}
