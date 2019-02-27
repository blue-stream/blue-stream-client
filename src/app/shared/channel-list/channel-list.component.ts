import { Component, OnInit, Input } from '@angular/core';
import { Channel } from '../models/channel.model';

@Component({
  selector: 'bs-channel-list',
  templateUrl: './channel-list.component.html',
  styleUrls: ['./channel-list.component.scss']
})
export class ChannelListComponent implements OnInit {

  constructor() { }
  @Input() channels: Channel[];
  @Input() description = true;
  @Input() mode: 'grid' | 'horizontal' | 'vertical' = 'vertical';
  ngOnInit() {
  }

}
