import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { VideoService } from '../../shared/video.service';
import { Video } from '../../shared/video.model';
import { VideoSection } from '../../shared/video-section.model';

@Component({
  selector: 'bs-video-section-item',
  templateUrl: './video-section-item.component.html',
  styleUrls: ['./video-section-item.component.scss']
})
export class VideoSectionItemComponent implements OnInit {
  @Input() sections: VideoSection[];
  constructor() { }

  ngOnInit() {
  }
}
