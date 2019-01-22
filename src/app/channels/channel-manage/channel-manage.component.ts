import { Component, OnInit, Input } from '@angular/core';
import { Channel } from '../channel.model';
import { ChannelService } from '../channel.service';

@Component({
  selector: 'bs-channel-manage',
  templateUrl: './channel-manage.component.html',
  styleUrls: ['./channel-manage.component.scss']
})
export class ChannelManageComponent implements OnInit {
  @Input() channel: Channel;
  isEditActive: boolean = false;

  constructor(private channelService: ChannelService) { }

  ngOnInit() {
  }
}
