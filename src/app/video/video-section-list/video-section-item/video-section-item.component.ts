import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { VideoSection } from '../../../shared/models/video-section.model';

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
