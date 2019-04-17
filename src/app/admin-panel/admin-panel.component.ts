import { Component, OnInit } from '@angular/core';
import { ChannelService } from '../core/services/channel.service';
import { VideoService } from '../core/services/video.service';
import { UserService } from '../shared/user.service';

@Component({
  selector: 'bs-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.scss']
})
export class AdminPanelComponent implements OnInit {

  channelsAmount: number;
  videosAmount: number;
  usersAmount: number;

  constructor(
    private channelService: ChannelService,
    private videoService: VideoService,
    private userService: UserService,
    ) { }

  ngOnInit() {
    this.loadChannelsAmount();
    this.loadVideosAmount();

  }

  loadChannelsAmount () {
    this.channelService.getAmount({}).subscribe((channelsAmount => {
      this.channelsAmount = channelsAmount;
    }));
  }

  loadVideosAmount () {
    this.videoService.getVideosAmount({}).subscribe((videosAmount => {
      this.videosAmount = videosAmount;
    }));
  }

}
