import { Component, OnInit, Input } from '@angular/core';
import * as moment from 'moment';
import { Channel } from 'src/app/shared/models/channel.model';
import { User } from 'src/app/shared/models/user.model';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'bs-watch-owner',
  templateUrl: './watch-owner.component.html',
  styleUrls: ['./watch-owner.component.scss']
})
export class WatchOwnerComponent implements OnInit {

  @Input() owner: User;
  @Input() channel: Channel;
  @Input() publishDate: string;

  channelLink: string;
  uploadDate: string;
  uploadTime: string;

  constructor(private translateService: TranslateService) { }

  ngOnInit() {
    this.channelLink = `/channels/${this.channel.id}`;
    const momentDate = moment(this.publishDate).locale(this.translateService.currentLang);
    this.uploadDate = momentDate.format('DD MMM YYYY');
    this.uploadTime = momentDate.format('HH:mm');
  }
}
