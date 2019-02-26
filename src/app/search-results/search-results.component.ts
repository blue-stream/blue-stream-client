import { Component, OnDestroy, OnInit } from '@angular/core';
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
export class SearchResultsComponent implements OnDestroy, OnInit {

  constructor(
    private route: ActivatedRoute,
    private channelService: ChannelService,
    private videoService: VideoService
    ) { }

  routeQuerySub: any;
  videosSub: any;
  channelsSub: any;
  channels: Channel[] = [];
  videos: Video[] = [];
  search: string;
  amountToLoad = 40;

  ngOnInit() {
    this.routeQuerySub = this.route.queryParams
    .subscribe( params => {
      this.search = params.search_query;
      this.loadSearchedVideos();
      this.loadSearchedChannels();
    });
  }

  ngOnDestroy() {
    this.routeQuerySub.unsubscribe();
    this.channelsSub.unsubscribe();
    this.videosSub.unsubscribe();
  }

  loadSearchedVideos(startIndex = 0) {
    const endIndex = startIndex + this.amountToLoad;

    this.videosSub = this.videoService.search(this.search, startIndex, endIndex).subscribe(videos => {
      this.videos = this.videos.concat(videos);
      console.log(this.videos)
    });
  }

  loadSearchedChannels() {
    const startIndex = 0;
    const channelsToLoad = 4;
    const endIndex = startIndex + channelsToLoad;

    this.channelsSub = this.channelService.search(this.search, startIndex, endIndex).subscribe(channels => {
        this.channels = channels;
    });
  }

  onScroll() {
    this.loadSearchedVideos(this.videos.length);
  }

}
