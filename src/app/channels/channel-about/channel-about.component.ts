import { Component, Input, OnChanges } from '@angular/core';
import { Channel } from '../../shared/models/channel.model';
import { ViewsService } from 'src/app/core/services/views.service';
import { VideoService } from 'src/app/core/services/video.service';
import { UserPermissions } from '../user-permissions.model';
import { ChannelPermissionsService } from '../channel-permissions.service';

@Component({
  selector: 'bs-channel-about',
  templateUrl: './channel-about.component.html',
  styleUrls: ['./channel-about.component.scss']
})
export class ChannelAboutComponent implements OnChanges {
  @Input() channel: Channel;

  views: number;
  videosAmount: number;
  admins: UserPermissions[] = [];
  adminsAmountToLoad: number = 10;

  constructor(
    private viewsService: ViewsService,
    private videoService: VideoService,
    private userPermissionsService: ChannelPermissionsService) {}

  ngOnChanges() {
      this.loadChannelViews();
      this.loadVideosAmount();

      if (!this.channel.isProfile) {
        this.loadNextAdmins();
      }
  }

  loadChannelViews() {
    this.viewsService.getChannelViews(this.channel.id).subscribe(views => {
      this.views = views;
    });
  }

  loadVideosAmount() {
    this.videoService.getVideosAmount({channel: this.channel.id}).subscribe(amount => {
      this.videosAmount = amount;
    });
  }

  onScroll() {
    if (!this.channel.isProfile) {
      this.loadNextAdmins();
    }
  }

  loadNextAdmins() {
    this.loadAdmins(
      this.admins.length,
      this.adminsAmountToLoad);
  }

  loadAdmins(startIndex: number, adminsAmountToLoad: number) {
    const endIndex: number = startIndex + adminsAmountToLoad;

    this.userPermissionsService.getChannelAdmins(this.channel.id, startIndex, endIndex).subscribe((admins) => {
      if (startIndex === 0) {
        this.admins = admins;
      } else {
        this.admins = this.admins.concat(admins);
      }
    });
  }
}
