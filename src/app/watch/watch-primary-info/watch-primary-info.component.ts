import { Component, OnInit, Input } from '@angular/core';
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

@Component({
  selector: 'bs-watch-primary-info',
  templateUrl: './watch-primary-info.component.html',
  styleUrls: ['./watch-primary-info.component.scss']
})
export class WatchPrimaryInfoComponent implements OnInit {

  @Input() video: Video;
  currentReactionType: ReactionType;
  resourceType: ResourceType = ResourceType.Video;
  currentUser: User;

  constructor(
    private reactionService: ReactionService,
    private videoService: VideoService,
    private translateService: TranslateService,
    private snackBar: MatSnackBar,
    private router: Router,
    private userService: UserService,
  ) { }

  ngOnInit() {
    this.currentUser = this.userService.currentUser;
  }

  onDeleteVideo() {
    this.translateService.get('WATCH.WATCH_PRIMARY_INFO.DELETE.CONFIRM_MESSAGE')
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
        this.translateService.get([
          'WATCH.WATCH_PRIMARY_INFO.DELETE.DELETE_SUCCESS',
          'WATCH.WATCH_PRIMARY_INFO.DELETE.DELETE_SUCCESS_APPROVAL']).subscribe(translations => {
            this.snackBar.open(
              translations['WATCH.WATCH_PRIMARY_INFO.DELETE.DELETE_SUCCESS'],
              translations['WATCH.WATCH_PRIMARY_INFO.DELETE.DELETE_SUCCESS_APPROVAL'],
              { duration: 2000 });
            this.router.navigate(['/']);
          });
      });
  }
}
