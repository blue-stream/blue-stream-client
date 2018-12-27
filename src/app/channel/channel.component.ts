import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChannelService } from './channel.service';
import { Channel } from './channel.model';

@Component({
  selector: 'bs-channel',
  templateUrl: './channel.component.html',
  styleUrls: ['./channel.component.scss']
})
export class ChannelComponent implements OnInit, OnDestroy {
  routeIdSubscription: any;
  channel: Channel;

  constructor(private route: ActivatedRoute, private channelService: ChannelService) { }

  ngOnInit() {
    this.routeIdSubscription = this.route.params.subscribe(params => {
      this.loadChannel(params.id);
    });
  }

  loadChannel(id: string) {
    console.log(id);
    this.channelService.getChannel(id).subscribe(channel => {
      this.channel = channel;
      console.log(channel);
    });
  }

  ngOnDestroy() {
    this.routeIdSubscription.unsubscribe();
  }
}
