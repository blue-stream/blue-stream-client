import { Component, OnInit } from '@angular/core';
import { ChannelService } from '../core/services/channel.service';
import { VideoService } from '../core/services/video.service';
import { CommentService } from '../core/services/comment.service';
import { UserService } from '../shared/user.service';

interface EntityAmount {
  title: string;
  amount: number;
  icon: string;
}

@Component({
  selector: 'bs-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.scss']
})
export class AdminPanelComponent implements OnInit {

  entitiesAmounts: EntityAmount[] = [];

  constructor(
    private channelService: ChannelService,
    private videoService: VideoService,
    private commentService: CommentService,
    private userService: UserService,
  ) { }

  ngOnInit() {
    this.loadChannelsAmount();
    this.loadVideosAmount();
    this.loadCommentsAmount();
    this.loadProfileChannelsAmount();
    this.loadUsersAmount();
    this.loadSysAdminsAmount();
  }

  loadUsersAmount() {
    this.userService.getAmount({}).subscribe((usersAmount => {
      this.entitiesAmounts.push({
        title: 'ADMIN_PANEL.USERS_AMOUNT',
        amount: usersAmount,
        icon: 'people',
      });
    }));
  }

  loadSysAdminsAmount() {
    this.userService.getAmount({ isSysAdmin: true }).subscribe((sysAdminsAmount => {
      this.entitiesAmounts.push({
        title: 'ADMIN_PANEL.SYSADMINS_AMOUNT',
        amount: sysAdminsAmount,
        icon: 'people',
      });
    }));
  }

  loadChannelsAmount() {
    this.channelService.getAmount({ isProfile: false }).subscribe((channelsAmount => {
      this.entitiesAmounts.push({
        title: 'ADMIN_PANEL.CHANNELS_AMOUNT',
        amount: channelsAmount,
        icon: 'ondemand_video',
      });
    }));
  }

  loadProfileChannelsAmount() {
    this.channelService.getAmount({ isProfile: true }).subscribe((profileChannelsAmount => {
      this.entitiesAmounts.push({
        title: 'ADMIN_PANEL.PROFILES_AMOUNT',
        amount: profileChannelsAmount,
        icon: 'people',
      });
    }));
  }

  loadVideosAmount() {
    this.videoService.getVideosAmount({}).subscribe((videosAmount => {
      this.entitiesAmounts.push({
        title: 'ADMIN_PANEL.VIDEOS_AMOUNT',
        amount: videosAmount,
        icon: 'video_library',
      });
    }));
  }

  loadCommentsAmount() {
    this.commentService.getAmount({}).subscribe((commentsAmount => {
      this.entitiesAmounts.push({
        title: 'ADMIN_PANEL.COMMENTS_AMOUNT',
        amount: commentsAmount,
        icon: 'comment',
      });
    }));
  }
}
