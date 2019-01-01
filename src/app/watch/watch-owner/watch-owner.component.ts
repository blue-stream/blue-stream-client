import { Component, OnInit, Input } from '@angular/core';
import { VideoService } from '../../core/services/video.service';
import { TranslateService } from '@ngx-translate/core';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'bs-watch-owner',
  templateUrl: './watch-owner.component.html',
  styleUrls: ['./watch-owner.component.scss']
})
export class WatchOwnerComponent implements OnInit {

  @Input() owner: string;
  @Input() publishDate: string;
  @Input() videoId: string;
  @Input() userId: string;
  currentUser: string = 'user@domain';

  constructor(
    private videoService: VideoService,
    private translateService: TranslateService,
    private snackBar: MatSnackBar,
    private router: Router
  ) { }

  ngOnInit() {
  }

  onDeleteVideo() {
    this.translateService.get('WATCH.WATCH_OWNER.DELETE.CONFIRM_MESSAGE')
    .subscribe(translation => {
        if (confirm(translation)) {
            return this.deleteVideo();
        } else {
            return false;
        }
    });
  }

  deleteVideo() {
    this.videoService.delete(this.videoId).subscribe(video => {
      this.translateService.get([
        'WATCH.WATCH_OWNER.DELETE.DELETE_SUCCESS',
        'WATCH.WATCH_OWNER.DELETE.DELETE_SUCCESS_APPROVAL']).subscribe(translations => {
          this.snackBar.open(
            translations['WATCH.WATCH_OWNER.DELETE.DELETE_SUCCESS'],
            translations['WATCH.WATCH_OWNER.DELETE.DELETE_SUCCESS_APPROVAL'],
            { duration: 2000 });
          this.router.navigate(['/']);
        });
    });
  }

}
