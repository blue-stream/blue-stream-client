import { Component, OnInit, Input } from '@angular/core';
import { Channel } from '../models/channel.model';
import { PatternGeneratorService } from '../pattern-generator.service';
import { Router } from '@angular/router';

@Component({
  selector: 'bs-channel-tile',
  templateUrl: './channel-tile.component.html',
  styleUrls: ['./channel-tile.component.scss']
})
export class ChannelTileComponent implements OnInit {

  constructor(
    private patternGenerator: PatternGeneratorService
  ) { }

  @Input() horizontal = true;
  @Input() description = true;
  @Input() channel: Channel;
  image: any;
  channelViews: number = 0;

  ngOnInit() {
    this.getImage();
  }

  getImage() {
    const source = this.channel.isProfile ? this.channel.user : this.channel.name;
    this.image = this.patternGenerator.getPatternAsSafeStyle(source);
  }

}
