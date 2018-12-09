import { Component, OnInit, Input } from '@angular/core';
import { Video } from '../../shared/models/video.model';
import { ReactionService } from 'src/app/core/services/reaction.service';
import { Reaction, ResourceType, ReactionType } from 'src/app/shared/models/reaction.model';

@Component({
  selector: 'bs-watch-primary-info',
  templateUrl: './watch-primary-info.component.html',
  styleUrls: ['./watch-primary-info.component.scss']
})
export class WatchPrimaryInfoComponent implements OnInit {

  @Input() video: Video;
  currentReactionType: ReactionType;
  resourceType: ResourceType = ResourceType.Video;

  constructor(private reactionService: ReactionService) { }

  ngOnInit() {
  }
}
