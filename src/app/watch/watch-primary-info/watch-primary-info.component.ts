import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Video } from '../../shared/models/video.model';
import { ReactionService } from 'src/app/core/services/reaction.service';
import { Reaction, ResourceType, ReactionType } from 'src/app/shared/models/reaction.model';
import { Router } from '@angular/router';
import { VideoService } from '../../core/services/video.service';
import { TranslateService } from '@ngx-translate/core';
import { MatSnackBar } from '@angular/material';
import { UserService } from 'src/app/shared/user.service';
import { User } from 'src/app/shared/models/user.model';
import { Observable } from 'rxjs';
import { ChannelPermissionsService } from 'src/app/channels/channel-permissions.service';
import { UserPermissions, PermissionTypes } from 'src/app/channels/user-permissions.model';
import { Channel } from 'src/app/shared/models/channel.model';
import 'rxjs/add/operator/catch';

@Component({
  selector: 'bs-watch-primary-info',
  templateUrl: './watch-primary-info.component.html',
  styleUrls: ['./watch-primary-info.component.scss']
})
export class WatchPrimaryInfoComponent implements OnInit, OnChanges {

  @Input() video: Video;
  currentReactionType: ReactionType;
  resourceType: ResourceType = ResourceType.Video;
  currentUser: User;
  canEdit: boolean = false;
  canRemove: boolean = false;

  constructor(
    private reactionService: ReactionService,
    private videoService: VideoService,
    private permissionsService: ChannelPermissionsService,
    private translateService: TranslateService,
    private snackBar: MatSnackBar,
    private router: Router,
    private userService: UserService,
  ) { }

  ngOnInit() {
    this.currentUser = this.userService.currentUser;
  }

  ngOnChanges() {
    this.loadUserPermissions();
  }

  loadUserPermissions () {
    const channelId: string = (this.video.channel as Channel).id || (this.video.channel as string);

    this.permissionsService.getOne(channelId).subscribe(channelPermissions => {
      if (!channelPermissions) {
        this.canEdit = false;
        this.canRemove = false;
      } else {
        const permissions = channelPermissions.permissions;
        const hasEditPermissions: boolean = permissions.includes(PermissionTypes.Edit);
        const hasRemovePermissions: boolean = permissions.includes(PermissionTypes.Remove);
        const isAdmin: boolean = permissions.includes(PermissionTypes.Admin);
        const isVideoOwner: boolean = ((this.video.owner as User).id || this.video.owner) === this.currentUser.id;

        this.canEdit = hasEditPermissions || isAdmin || isVideoOwner;
        this.canRemove = hasRemovePermissions || isAdmin || isVideoOwner;
      }
    });
  }

  onDeleteVideo() {
    this.translateService.get('SNACK_BARS.CONFIRM.VIDEO_DELETE')
      .subscribe(translation => {
        if (confirm(translation)) {
          return this.deleteVideo();
        } else {
          return false;
        }
      });
  }

  deleteVideo() {
    this.videoService.delete(this.video.id)
      .catch((err, caught) => {
        let message: string = 'SNACK_BARS.ERRORS.UNPREMITTED_USER';
        let action: string = 'SNACK_BARS.BUTTONS.OK';

        if (err.error.type !== 'UnPremittedUserError') {
          message = 'SNACK_BARS.ERRORS.UNKNOWN';
          action = 'SNACK_BARS.BUTTONS.OK';
        }

        this.translateService.get([message, action]).subscribe(translations => {
          this.snackBar.open(
            translations[message],
            translations[action],
            { duration: 2000 });
        });

        return new Observable(null);

      })
      .subscribe(video => {
        const message: string = 'SNACK_BARS.SUCCESSFUL.VIDEO_DELETE';
        const action: string = 'SNACK_BARS.CONFIRM.OK';
        this.translateService.get([message, action]).subscribe(translations => {
          this.snackBar.open(translations[message], translations[action], { duration: 2000 });
          this.router.navigate(['/']);
        });
      });
  }
}
