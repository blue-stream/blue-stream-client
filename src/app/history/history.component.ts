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

  viewedVideos: { user: string, amount: number, updatedAt: string, video: Video }[];
  videos: Video[] = [];

  ngOnInit() {
    this.loadHistory();
  }

  loadHistory() {
    this.viewsService.getUserViews(0, 20).subscribe(views => {
      this.viewedVideos = views;
      this.viewedVideos = this.viewedVideos.filter(viewedVideo => viewedVideo.video);
      this.videos = this.viewedVideos.map(viewedVideo => concatStreamerUrl(viewedVideo.video));
      console.log(this.viewedVideos);
    });
  }
}
