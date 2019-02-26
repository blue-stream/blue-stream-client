import { Component, OnInit, Input } from '@angular/core';
import { ChannelService } from './channel.service';
import { Channel } from './channel.model';
import { UserService } from '../shared/user.service';
import { ActivatedRoute } from '@angular/router';
import { SearchService } from '../shared/search/search.service';
import { ChannelPermissionsService } from './channel-permissions.service';
import { PermissionTypes } from './user-permissions.model';

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
  searchFilter: string = '';

  urlSubscription: any;

  constructor(
    private channelService: ChannelService,
    private userService: UserService,
    private route: ActivatedRoute,
    private searchService: SearchService,
    private channelPermissions: ChannelPermissionsService) { }

  ngOnInit() {
    if (this.isSearch) {
      this.subscribeToSearch();
    } else {
      if (this.isUserChannels) {
        this.channelFilter.user = this.userService.currentUser.id;
      }

      this.urlSubscription = this.route.url.subscribe(url => {
        const urlString = url.pop();
        if (urlString) {
          this.changeFilter(urlString.toString());
        } else {
          this.changeFilter('');
        }

        this.loadNextChannels();
      });
    }
  }

  subscribeToSearch() {
    this.searchService.searchTyped.subscribe((searchFilter) => {
      this.searchFilter = searchFilter;
      this.loadSearchedChannels(0, this.channelsAmountToLoad);
    });
  }

  changeFilter(url: string) {
    if (url === 'user') {
      this.channelFilter = { user: this.userService.currentUser.id };
    } else if (url === 'upload') {
      this.channelFilter = {};
      this.isSelectForUpload = true;
    } else if (url === '') {
      this.channelFilter = {};
    }
  }

  loadPremittedChannels(startIndex: number, channelsToLoad: number) {
    const endIndex: number = startIndex + channelsToLoad;

    this.channelPermissions
      .getUserPermittedChannels([PermissionTypes.Admin, PermissionTypes.Upload], this.searchFilter, startIndex, endIndex)
      .subscribe((channelPermissions: any) => {
        const channels = channelPermissions.map(channelPermission => channelPermission.channel);

        if (startIndex === 0) {
          this.channels = channels;
        } else {
          this.channels = this.channels.concat(channels);
        }
      });
  }

  onScroll() {
    if (this.isPaginated) {
      this.loadNextChannels();
    }
  }

  loadNextChannels() {
    if (this.isSelectForUpload) {
      this.loadPremittedChannels(
        this.channels.length,
        this.channelsAmountToLoad);
    } else {
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
