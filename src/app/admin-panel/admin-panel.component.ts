import { Component, OnInit } from '@angular/core';
import { ChannelService } from '../core/services/channel.service';
import { VideoService } from '../core/services/video.service';
import { CommentService } from '../core/services/comment.service';

@Component({
  selector: 'bs-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.scss']
})
export class AdminPanelComponent implements OnInit {

  channelsAmount: number = 0;
  profileChannelsAmount: number = 0;
  videosAmount: number = 0;
  commentsAmount: number = 0;

  constructor(
    private channelService: ChannelService,
    private videoService: VideoService,
    private commentService: CommentService,
  ) { }

  ngOnInit() {
    this.loadChannelsAmount();
    this.loadVideosAmount();
    this.loadCommentsAmount();
    this.loadProfileChannelsAmount();
  }

  loadChannelsAmount() {
    this.channelService.getAmount({ isProfile: false }).subscribe((channelsAmount => {
      this.channelsAmount = channelsAmount;
    }));
  }

  loadProfileChannelsAmount() {
    this.channelService.getAmount({ isProfile: true }).subscribe((profileChannelsAmount => {
      this.profileChannelsAmount = profileChannelsAmount;
    }));
  }

  loadVideosAmount() {
    this.videoService.getVideosAmount({}).subscribe((videosAmount => {
      this.videosAmount = videosAmount;
    }));
  }

  loadCommentsAmount() {
    this.commentService.getAmount({}).subscribe((commentsAmount => {
      this.commentsAmount = commentsAmount;
    }));
  }
}
