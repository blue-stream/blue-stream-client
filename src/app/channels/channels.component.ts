import { Component, OnInit, Input } from '@angular/core';
import { ChannelService } from '../core/services/channel.service';
import { Channel } from '../shared/models/channel.model';
import { UserService } from '../shared/user.service';
import { ActivatedRoute } from '@angular/router';
import { ChannelPermissionsService } from './channel-permissions.service';
import { PermissionTypes } from './user-permissions.model';
import { Subject } from 'rxjs';

@Component({
  selector: 'bs-channels',
  templateUrl: './channels.component.html',
  styleUrls: ['./channels.component.scss']
})
export class ChannelsComponent implements OnInit {

  @Input() channelsAmountToLoad: number = 40;
  @Input() isPaginated: boolean = true;
  searchTyped = new Subject<string>();

  isSelectForUpload: boolean = false;
  channels: Channel[] = [];
  channelFilter: Partial<Channel> = {};
  searchFilter: string = '';
  isLoading: boolean = false;
  urlSubscription: any;
  isSysAdmin: boolean;

  constructor(
    private channelService: ChannelService,
    private userService: UserService,
    private route: ActivatedRoute,
    private channelPermissions: ChannelPermissionsService) { }

  ngOnInit() {
    this.isSysAdmin = this.userService.currentUser.isSysAdmin;

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

  changeFilter(url: string) {
    if (url === 'user') {
      this.channelFilter = { user: this.userService.currentUser.id };
    } else if (url === 'upload') {
      this.channelFilter = {};
      this.isSelectForUpload = true;
    } else if (url === 'profiles') {
      this.channelFilter = { isProfile: true };
    } else if (url === '') {
      this.channelFilter = { isProfile: false };
    }
  }

  loadAllChannels(startIndex: number, endIndex: number) {
    this.channelService.getMany({}, startIndex, endIndex).subscribe((channels: Channel[]) => {
      if (startIndex === 0) {
        this.channels = channels;
      } else {
        this.channels = this.channels.concat(channels);
      }
    });
  }

  loadPremittedChannels(startIndex: number, channelsToLoad: number) {
    const endIndex: number = startIndex + channelsToLoad;

    if (this.isSysAdmin) {
      this.loadAllChannels(startIndex, endIndex);
    } else {
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
      this.loadChannels(
        this.channels.length,
        this.channelsAmountToLoad);
    }
  }

  loadChannels(startIndex: number, channelsToLoad: number) {
    const endIndex: number = startIndex + channelsToLoad;

    this.isLoading = true;
    this.channelService.getMany(this.channelFilter, startIndex, endIndex).subscribe(channels => {
      this.channels = this.channels.concat(channels);
      this.isLoading = false;
    },
      (error) => {
        this.isLoading = false;
      });
  }
}
