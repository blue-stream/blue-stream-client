import { Component, OnInit, Input } from '@angular/core';
import { Channel } from 'src/app/shared/models/channel.model';
import { User } from 'src/app/shared/models/user.model';

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

  constructor() { }

  ngOnInit() {
    this.channelLink = `/channels/${this.channel.id}`;
  }
}
