import { Component, OnInit, OnDestroy, OnChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ChannelService } from '../channel.service';
import { Channel } from '../channel.model';
import { PatternGeneratorService } from '../../shared/pattern-generator.service';
import { UserService } from '../../shared/user.service';

@Component({
  selector: 'bs-channel',
  templateUrl: './channel.component.html',
  styleUrls: ['./channel.component.scss']
})
export class ChannelComponent implements OnInit, OnChanges, OnDestroy {
  routeIdSubscription: any;
  channel: Partial<Channel>;
  headerImage: any;
  isUserOwner: boolean = false;

  constructor(private userService: UserService,
    private patternGenerator: PatternGeneratorService,
    private route: ActivatedRoute,
    private channelService: ChannelService) {
    this.channelService.channelUpdated.subscribe((channel) => {
      this.channel = channel;
      this.loadHeaderImage();
    });
  }

  ngOnInit() {
    this.routeIdSubscription = this.route.params.subscribe(params => {
      this.loadChannel(params.id);
    });
  }

  ngOnChanges() {
      this.isUserOwner = this.channel.user === this.userService.getUser();
  }

  loadHeaderImage() {
    this.headerImage = this.patternGenerator.getPatternAsUrl(this.channel.name);
  }

  loadChannel(id: string) {
    this.channelService.getChannel(id).subscribe(channel => {
      this.channel = channel;
      this.loadHeaderImage();

      if (this.channel.user === this.userService.getUser()) {
        this.isUserOwner = true;
      }
    });
  }

  ngOnDestroy() {
    this.routeIdSubscription.unsubscribe();
  }
}
