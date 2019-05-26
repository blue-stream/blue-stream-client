import { Component, OnInit } from '@angular/core';
import { ViewsService } from '../core/services/views.service';
import { Video } from '../shared/models/video.model';
import { concatStreamerUrl } from '../core/services/video.service';


@Component({
  selector: 'bs-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {

  constructor(private viewsService: ViewsService) { }

  videos: Video[] = [];
  videosToLoad: number = 20;
  isLoading: boolean = false;

  ngOnInit() {
    this.loadNextVideos();
  }

  loadHistory(startIndex: number, amountToLoad: number) {
    const endIndex: number = startIndex + amountToLoad;

    this.viewsService.getUserViews(startIndex, endIndex).subscribe(views => {
      const viewedVideos: { user: string, amount: number, lastViewDate: string, video: Video }[] = views;
      this.isLoading = false;

      const newVideos = viewedVideos.map(viewedVideo => {
        if (viewedVideo.video) {
          return {
            ...concatStreamerUrl(viewedVideo.video),
            userWatchCount: viewedVideo.amount,
            lastViewDate: viewedVideo.lastViewDate,
          };
        } else {
          return {
            userWatchCount: viewedVideo.amount,
            lastViewDate: viewedVideo.lastViewDate,
          };
        }
      });

      this.videos = this.videos.concat(newVideos);

    }, (error) => {
      this.isLoading = false;
    });
  }

  loadNextVideos() {
    this.loadHistory(
      this.videos.length,
      this.videosToLoad);
  }

  onScroll() {
    this.loadNextVideos();
  }
}
