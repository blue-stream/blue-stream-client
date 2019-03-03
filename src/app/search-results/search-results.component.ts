import { Component, OnDestroy, OnChanges, OnInit } from '@angular/core';
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
  channels: Channel[];
  videos: Video[];
  search: string;
  videosToLoad = 40;
  channelsToLoad = 40;

  ngOnInit() {
    this.routeQuerySub = this.route.queryParams
    .subscribe( params => {
      this.channels = [];
      this.videos = [];
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
    const endIndex = startIndex + this.videosToLoad;

    this.videosSub = this.videoService.search(this.search, startIndex, endIndex).subscribe(videos => {
      this.videos = this.videos.concat(videos);
    });
  }

  loadSearchedChannels() {
    const startIndex = 0;
    const endIndex = startIndex + this.channelsToLoad;

    this.channelsSub = this.channelService.search(this.search, startIndex, endIndex).subscribe(channels => {
        this.channels = this.channels.concat(channels);
    });
  }

  onScroll() {
    this.loadSearchedVideos(this.videos.length);
  }

}
