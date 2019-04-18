import { Component, OnInit } from '@angular/core';
import { ChannelService } from '../core/services/channel.service';
import { VideoService } from '../core/services/video.service';
import { CommentService } from '../comments/comment.service';

@Component({
  selector: 'bs-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.scss']
})
export class AdminPanelComponent implements OnInit {

  channelsAmount: number;
  videosAmount: number;
  commentsAmount: number;

  constructor(
    private channelService: ChannelService,
    private videoService: VideoService,
    private commentService: CommentService,
    ) { }

  ngOnInit() {
    this.loadChannelsAmount();
    this.loadVideosAmount();
    this.loadCommentsAmount();

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

  loadCommentsAmount () {
    this.commentService.getAmount({}).subscribe((commentsAmount => {
      this.commentsAmount = commentsAmount;
    }));
  }
}
