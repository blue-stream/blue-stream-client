import { Component, OnInit, OnDestroy, OnChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Channel } from '../shared/models/channel.model';
import { Video } from '../shared/models/video.model';
import { ChannelService } from '../core/services/channel.service';
import { VideoService } from '../core/services/video.service';

@Component({
  selector: 'bs-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss']
})
export class SearchResultsComponent implements OnDestroy, OnChanges {

  constructor(
    private route: ActivatedRoute,
    private channelService: ChannelService,
    private videoService: VideoService
    ) { }

  routeQuerySubscription: any;
  channels: Channel[] = [];
  videos: Video[] = [];
  search: string;
  amountToLoad = 40;

  ngOnChanges() {
    this.routeQuerySubscription = this.route.queryParams
    .subscribe( params => {
      this.search = params.search_query;
      this.loadSearchedVideos();
      this.loadSearchedChannels();
    });
  }

  ngOnDestroy() {
    this.routeQuerySubscription.unsubscribe();
  }

  loadSearchedVideos(startIndex = 0) {
    const endIndex = startIndex + this.amountToLoad;

    this.videoService.search(this.search, startIndex, endIndex).subscribe(videos => {
      if (startIndex === 0) {
        this.videos = videos;
      } else {
        this.videos = this.videos.concat(videos);
      }
    });
  }

  loadSearchedChannels() {
    const startIndex = 0;
    const channelsToLoad = 4;
    const endIndex = startIndex + channelsToLoad;

    this.channelService.search(this.search, startIndex, endIndex).subscribe(channels => {
        this.channels = channels;
    });
  }

  onScroll() {
    this.loadSearchedVideos(this.videos.length);
  }

}
