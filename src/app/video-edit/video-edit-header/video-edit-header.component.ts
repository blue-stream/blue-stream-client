import { Component, OnInit, Input } from '@angular/core';
import { Video } from '../../shared/models/video.model';
import { ChannelPermissionsService } from 'src/app/channels/channel-permissions.service';
import { UserService } from 'src/app/shared/user.service';

@Component({
  selector: 'bs-video-edit-header',
  templateUrl: './video-edit-header.component.html',
  styleUrls: ['./video-edit-header.component.scss']
})
export class VideoEditHeaderComponent implements OnInit {

  @Input() video: Video;
  @Input() isEdit: boolean = false;

  hasReUploadPermissions: boolean = false;

  constructor(private channelPermissionsService: ChannelPermissionsService, private userService: UserService) { }

  ngOnInit() {
    let channelId;

    if (typeof this.video.channel === 'string') {
      channelId = this.video.channel;
    } else {
      channelId = this.video.channel.id;
    }

    this.channelPermissionsService.getIsAdmin(channelId).subscribe(isAdmin => {
      const ownerId = typeof this.video.owner === 'string' ?  this.video.owner : this.video.owner.id;
      this.hasReUploadPermissions = isAdmin || ownerId === this.userService.currentUser.id;
    });
  }
}
