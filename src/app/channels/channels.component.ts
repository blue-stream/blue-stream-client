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
  channelFilter: Partial<Channel> = {};
  urlSubscription: any;
  totalChannelsAmount: number;
  channelsToLoad: number = 40;

  constructor(
    private channelService: ChannelService,
    private userService: UserService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.urlSubscription = this.route.url.subscribe(url => {
      this.changeFilter(url.pop().toString());
      this.loadChannelsAmount();
      this.loadNextChannels();
    });
  }

  loadChannelsAmount() {
    this.channelService.getAmount(this.channelFilter).subscribe(amount => {
      this.totalChannelsAmount = amount;
    });
  }

  changeFilter(url: string) {
    if (url === 'user') {
      this.channelFilter = { user: this.userService.getUser() };
    } else if (url === 'all') {
      this.channelFilter = {};
    }
  }

  onScroll() {
    this.loadNextChannels();
  }

  loadNextChannels() {
    this.loadChannels(
      this.channels.length,
      this.channelsToLoad);
  }

  loadChannels(startIndex: number, channelsToLoad: number) {
    const endIndex: number = startIndex + channelsToLoad;

    this.channelService.getMany(this.channelFilter, startIndex, endIndex).subscribe(channels => {
      this.channels = this.channels.concat(channels);
    });
  }

}
