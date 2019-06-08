import { Component, OnInit } from '@angular/core';
import { Video } from '../shared/models/video.model';
import { ReactionService } from '../core/services/reaction.service';
import { Reaction, ReactionType, ResourceType } from '../shared/models/reaction.model';
import { UserService } from '../shared/user.service';
import { concatStreamerUrl } from '../core/services/video.service';

@Component({
  selector: 'bs-user-reactions',
  templateUrl: './user-reactions.component.html',
  styleUrls: ['./user-reactions.component.scss']
})
export class UserReactionsComponent implements OnInit {

  videos: Video[] = [];
  videosToLoad: number = 20;
  isLoading: boolean = false;

  constructor(private reactionService: ReactionService, private userService: UserService) { }

  ngOnInit() {
    this.loadNextVideos();
  }

  loadLikedVideos(startIndex: number, amountToLoad: number) {
    const endIndex: number = startIndex + amountToLoad;
    this.isLoading = true;

    const filter: Partial<Reaction> = {
      type: ReactionType.Like,
      user: this.userService.currentUser.id,
      resourceType: ResourceType.Video,
    };

    console.log(filter);

    this.reactionService.getReactedVideos(filter, startIndex, endIndex).subscribe(reactions => {
      this.isLoading = false;
      const newVideos = reactions.map(reaction => {
        if (reaction.resource) {
          return concatStreamerUrl(reaction.resource);
        }
      });

      this.videos = this.videos.concat(newVideos);

    }, (error) => {
      this.isLoading = false;
    });
  }

  loadNextVideos() {
    this.loadLikedVideos(
      this.videos.length,
      this.videosToLoad);
  }

  onScroll() {
    this.loadNextVideos();
  }
}
