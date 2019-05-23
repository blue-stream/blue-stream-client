import { Component, OnInit } from '@angular/core';
import { VideoService } from '../core/services/video.service';
import { ActivatedRoute } from '@angular/router';
import { flatMap } from 'rxjs/operators';
import { ViewsService } from '../core/services/views.service';
import { Video } from '../shared/models/video.model';
import { EmbedService } from '../core/services/embed.service';
import 'rxjs/add/operator/map';

@Component({
  selector: 'bs-embed',
  templateUrl: './embed.component.html',
  styleUrls: ['./embed.component.scss']
})
export class EmbedComponent implements OnInit {
  routeIdSubscription: any;
  video: Video & { token: string };
  videoSubscription: any;


  constructor(
    private videoService: VideoService,
    private route: ActivatedRoute,
    private viewService: ViewsService,
    private embedService: EmbedService,
    ) { }

  ngOnInit() {
    this.embedService.embedVideoRequested.next();
    this.routeIdSubscription = this.route.params.pipe(
      flatMap(params => {
        const id = params.id;
        return this.viewService.increaseView(id).map(() => id);
      })
    ).subscribe((videoId: string) => {
      this.loadVideoInfo(videoId);

    });
  }

  loadVideoInfo(id: string) {
    this.videoSubscription = this.videoService.getVideo(id).subscribe(video => this.video = video);
  }

}
