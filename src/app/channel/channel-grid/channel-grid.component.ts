import { Component, OnInit, Input } from '@angular/core';
import { Channel } from '../channel.model';

@Component({
  selector: 'bs-channel-grid',
  templateUrl: './channel-grid.component.html',
  styleUrls: ['./channel-grid.component.scss']
})
export class ChannelGridComponent implements OnInit {
  @Input() channels: Channel[];

  constructor() { }

  ngOnInit() {
  }

}
