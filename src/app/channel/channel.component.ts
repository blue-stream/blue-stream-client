import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ChannelService } from './channel.service';
import { Channel } from './channel.model';
import { PatternGeneratorService } from '../shared/pattern-generator.service';

@Component({
  selector: 'bs-channel',
  templateUrl: './channel.component.html',
  styleUrls: ['./channel.component.scss']
})
export class ChannelComponent implements OnInit, OnDestroy {
  routeIdSubscription: any;
  channel: Partial<Channel> = {};
  headerImage: any;

  constructor(private patternGenerator: PatternGeneratorService, private route: ActivatedRoute, private channelService: ChannelService) { }

  ngOnInit() {
    this.routeIdSubscription = this.route.params.subscribe(params => {
      this.loadChannel(params.id);
    });
  }

  loadChannel(id: string) {
    this.channelService.getChannel(id).subscribe(channel => {
      this.channel = channel;
      this.headerImage = this.patternGenerator.getPatternAsUrl(channel.name);
    });
  }

  ngOnDestroy() {
    this.routeIdSubscription.unsubscribe();
  }
}
