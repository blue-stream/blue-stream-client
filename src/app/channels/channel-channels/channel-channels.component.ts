import { Component, OnInit, Input } from '@angular/core';
import { ChannelService } from '../channel.service';

@Component({
  selector: 'bs-channel-channels',
  templateUrl: './channel-channels.component.html',
  styleUrls: ['./channel-channels.component.scss']
})
export class ChannelChannelsComponent implements OnInit {
  @Input() user: string;

  constructor(private channelService: ChannelService) { }

  ngOnInit() {
  }
}
