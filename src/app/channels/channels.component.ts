import { Component, OnInit, Input } from '@angular/core';
import { ChannelService } from './channel.service';
import { Channel } from './channel.model';
import { UserService } from '../shared/user.service';
import { ActivatedRoute } from '@angular/router';
import { SearchService } from '../shared/search/search.service';

@Component({
  selector: 'bs-channels',
  templateUrl: './channels.component.html',
  styleUrls: ['./channels.component.scss']
})
export class ChannelsComponent implements OnInit {

  @Input() channelsAmountToLoad: number = 40;
  @Input() isPaginated: boolean = true;
  @Input() isUserChannels: boolean;
  @Input() isSearch: boolean = false;

  isSelectForUpload: boolean = false;
  channels: Channel[] = [];
  channelFilter: Partial<Channel> = {};
  searchFilter: string;

  urlSubscription: any;
  totalChannelsAmount: number;

  constructor(
    private channelService: ChannelService,
    private userService: UserService,
    private route: ActivatedRoute,
    private searchService: SearchService) { }

  ngOnInit() {
    if (this.isSearch) {
      this.subscribeToSearch();
      this.loadSearchedChannelsAmount();
    } else {
      if (this.isUserChannels) {
        this.channelFilter.user = this.userService.getUser();
      }

      this.urlSubscription = this.route.url.subscribe(url => {
        this.changeFilter(url.pop().toString());
        this.loadChannelsAmount();
        this.loadNextChannels();
      });
    }
  }

  subscribeToSearch() {
    this.searchService.searchTyped.subscribe((searchFilter) => {
      this.searchFilter = searchFilter;
      this.loadSearchedChannels(0, this.channelsAmountToLoad);
      this.loadSearchedChannelsAmount();
    });
  }

  loadSearchedChannelsAmount() {
    this.channelService.searchAmount(this.searchFilter).subscribe(amount => {
      this.totalChannelsAmount = amount;
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
    } else if (url === 'upload') {
      this.channelFilter = {};
      this.isSelectForUpload = true;
    }
  }

  onScroll() {
    if (this.isPaginated) {
      this.loadNextChannels();
    }
  }

  loadNextChannels() {
    if (this.isSearch) {
      this.loadSearchedChannels(
        this.channels.length,
        this.channelsAmountToLoad);
    } else {
      this.loadChannels(
        this.channels.length,
        this.channelsAmountToLoad);
    }
  }

  loadSearchedChannels(startIndex: number, channelsToLoad: number) {
    const endIndex: number = startIndex + channelsToLoad;

    this.channelService.search(this.searchFilter, startIndex, endIndex).subscribe(channels => {
      if (startIndex === 0) {
        this.channels = channels;
      } else {
        this.channels = this.channels.concat(channels);
      }
    });
  }

  loadChannels(startIndex: number, channelsToLoad: number) {
    const endIndex: number = startIndex + channelsToLoad;

    this.channelService.getMany(this.channelFilter, startIndex, endIndex).subscribe(channels => {
      this.channels = this.channels.concat(channels);
    });
  }
}
