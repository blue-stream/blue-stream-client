import { Component, OnInit, Input } from '@angular/core';
import { Channel } from '../models/channel.model';

@Component({
  selector: 'bs-channel-tile',
  templateUrl: './channel-tile.component.html',
  styleUrls: ['./channel-tile.component.scss']
})
export class ChannelTileComponent implements OnInit {

  constructor() { }
  @Input() channel: Channel

  ngOnInit() {
  }

}
