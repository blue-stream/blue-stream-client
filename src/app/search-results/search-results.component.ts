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

  routeQuerySubscription: any;
  videosSubscription: any;
  channelsSubscription: any;
  channels: Channel[];
  videos: Video[];
  search: string;
  videosToLoad = 10;
  channelsToLoad = 10;
  isLoadingChannels: boolean = false;
  isLoadingVideos: boolean = false;

  ngOnInit() {
    this.routeQuerySubscription = this.route.queryParams
      .subscribe(params => {
        this.channels = [];
        this.videos = [];
        this.search = params.search_query;
        this.loadSearchedChannels(0, this.channelsToLoad);
        this.loadNext();
      });
  }

  ngOnDestroy() {
    this.routeQuerySubscription.unsubscribe();
    this.channelsSubscription.unsubscribe();
    this.videosSubscription.unsubscribe();
  }

  loadNext() {
    this.loadSearchedVideos(
      this.videos.length,
      this.videosToLoad);
  }

  loadSearchedVideos(startIndex = 0, amountToLoad) {
    const endIndex = startIndex + amountToLoad;

    this.isLoadingVideos = true;
    this.videosSubscription = this.videoService.search(this.search, startIndex, endIndex).subscribe(videos => {
      this.videos = this.videos.concat(videos);
      this.isLoadingVideos = false;
    },
      (error) => {
        this.isLoadingVideos = false;
      });
  }

  loadSearchedChannels(startIndex = 0, amountToLoad) {
    const endIndex = startIndex + amountToLoad;

    this.isLoadingChannels = true;
    this.channelsSubscription = this.channelService.search(this.search, startIndex, endIndex).subscribe(channels => {
      this.channels = this.channels.concat(channels);
      this.isLoadingChannels = false;
    },
      (error) => {
        this.isLoadingChannels = false;
      });
  }

  onScroll() {
    this.loadNext();
  }

}
