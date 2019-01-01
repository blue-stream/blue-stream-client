import { Component, OnInit, Input } from '@angular/core';
import { Channel } from '../channel.model';

@Component({
  selector: 'bs-channel-manage',
  templateUrl: './channel-manage.component.html',
  styleUrls: ['./channel-manage.component.scss']
})
export class ChannelManageComponent implements OnInit {
  @Input() channel: Channel;

  constructor() { }

  ngOnInit() {
  }

}
