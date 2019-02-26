import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Channel } from '../shared/models/channel.model';
import { Video } from '../shared/models/video.model';
import { ChannelService } from '../core/services/channel.service';

@Component({
  selector: 'bs-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss']
})
export class SearchResultsComponent implements OnInit, OnDestroy {

  constructor(
    private route: ActivatedRoute,
    private channelService: ChannelService,
    ) { }

  routeQuerySubscription: any;
  channels: Channel[] = [];
  videos: Video[] = [];

  ngOnInit() {
    this.routeQuerySubscription = this.route.queryParams
    .subscribe( params => {
      const search_query = params.search_query;
      this.loadSearchedVideos(search_query);
      this.loadSearchedChannels(search_query);
    });
  }

  ngOnDestroy() {
    this.routeQuerySubscription.unsubscribe();
  }

  loadSearchedVideos(search: string) {
    
  }

  loadSearchedChannels(search: string) {
    const startIndex = 0;
    const channelsToLoad = 4;
    const endIndex = startIndex + channelsToLoad;

    this.channelService.search(search, startIndex, endIndex).subscribe(channels => {
        this.channels = channels;
    });
  }

}
