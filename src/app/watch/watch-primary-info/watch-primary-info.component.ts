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

  constructor(private reactionService: ReactionService) { }

  ngOnInit() {
    this.loadReaction();
  }

  loadReaction() {
    this.reactionService.getOne({ user: 'a@a', resource: this.video.id } as Reaction).subscribe(returnedReaction => {
      if (returnedReaction) {
        this.currentReactionType = returnedReaction.type;
      }
    });
  }

  getLikesToDislikesRatio(): number {
    return (this.video.likes * 100) / (this.video.likes + this.video.dislikes);
  }

  likeVideo() {
    this.reactToVideo(ReactionType.Like);
  }

  dislikeVideo() {
    this.reactToVideo(ReactionType.Dislike);
  }

  isLike() {
    return this.currentReactionType === ReactionType.Like;
  }

  isDislike() {
    return this.currentReactionType === ReactionType.Dislike;
  }

  reactToVideo(reactionType: ReactionType) {
    const resource: string = this.video.id;
    const resourceType: ResourceType = ResourceType.Video;
    const user: string = 'a@a';

    let reaction: Reaction;

    if (this.currentReactionType === reactionType) {
      reactionType = undefined;
      this.reactionService.delete(resource, user).subscribe(returnedReaction => {

      });
    } else if (this.currentReactionType === undefined) {
      reaction = {
        resource,
        resourceType,
        user,
        type: reactionType,
      };
      this.reactionService.create(reaction).subscribe(returnedReaction => {
      });
    } else {
      this.reactionService.update(resource, user, reactionType).subscribe(returnedReaction => {
      });
    }

    this.currentReactionType = reactionType;
  }
}
