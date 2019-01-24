import { Component, OnChanges, Input } from '@angular/core';
import { ReactionType, ResourceType, Reaction } from '../models/reaction.model';
import { ReactionService } from 'src/app/core/services/reaction.service';
import { Observable } from 'rxjs';
import 'rxjs/add/observable/empty';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Component({
  selector: 'bs-reactions',
  templateUrl: './reactions.component.html',
  styleUrls: ['./reactions.component.scss']
})
export class ReactionsComponent implements OnChanges {

  @Input() resource: string;
  @Input() resourceType: ResourceType = ResourceType.Video;
  @Input() showAmounts: boolean = true;
  @Input() showBar: boolean = true;
  @Input() smallIcons: boolean = false;
  @Input() reactions;

  likesAmount: number;
  dislikesAmount: number;
  chosenReactionType: ReactionType;
  user = 'user@domain';

  constructor(private reactionService: ReactionService) { }

  ngOnChanges() {
    this.likesAmount = 0;
    this.dislikesAmount = 0;
    this.chosenReactionType = undefined;
    this.loadReaction();
    this.loadReactionsAmount();
  }

  like() {
    this.react(ReactionType.Like);
  }

  dislike() {
    this.react(ReactionType.Dislike);
  }

  isLike() {
    return this.chosenReactionType === ReactionType.Like;
  }

  isDislike() {
    return this.chosenReactionType === ReactionType.Dislike;
  }

  getLikesToDislikesRatio(): number {
    return (this.likesAmount * 100) / (this.likesAmount + this.dislikesAmount);
  }

  loadReactionsAmount() {
    this.reactionService.getAmountOfTypes(this.resource).subscribe(returnedAmounts => {
      returnedAmounts.forEach(typeAmount => {
        if (typeAmount.type === ReactionType.Like) {
          this.likesAmount = typeAmount.amount;
        } else {
          this.dislikesAmount = typeAmount.amount;
        }
      });
    });
  }

  loadReaction() {
    this.reactionService.getOne({ user: this.user, resource: this.resource } as Reaction)
      .catch(error => {
        return Observable.empty();
      })
      .subscribe(
        returnedReaction => {
          if (returnedReaction) {
            this.chosenReactionType = (returnedReaction as Reaction).type;
          }
        },
        error => {
          if (error.status === 404) {
            this.chosenReactionType = undefined;
          } else {
            throw error;
          }
        });
  }

  updateAmountsLocally(previousReactionType: ReactionType, newReactionType: ReactionType) {
    if (previousReactionType === ReactionType.Like) {
      if (newReactionType === undefined || newReactionType === ReactionType.Like) {
        this.likesAmount--;
      } else {
        this.dislikesAmount++;
        this.likesAmount--;
      }
    } else if (previousReactionType === ReactionType.Dislike) {
      if (newReactionType === undefined || newReactionType === ReactionType.Dislike) {
        this.dislikesAmount--;
      } else if (newReactionType === ReactionType.Like) {
        this.dislikesAmount--;
        this.likesAmount++;
      }
    } else if (previousReactionType === undefined) {
      if (newReactionType === ReactionType.Like) {
        this.likesAmount++;
      } else if (newReactionType === ReactionType.Dislike) {
        this.dislikesAmount++;
      }
    }
  }

  react(reactionType: ReactionType) {
    let reaction: Reaction;

    if (this.chosenReactionType === reactionType) {
      reactionType = undefined;
      this.reactionService.delete(this.resource, this.user).subscribe(returnedReaction => {
        this.updateAmountsLocally(this.chosenReactionType, this.chosenReactionType);
        this.chosenReactionType = reactionType;
      });

    } else if (this.chosenReactionType === undefined) {

      reaction = {
        resourceType: this.resourceType,
        user: this.user,
        resource: this.resource,
        type: reactionType,
      };

      this.reactionService.create(reaction).subscribe(returnedReaction => {
        this.updateAmountsLocally(undefined, reactionType);
        this.chosenReactionType = reactionType;
      });

    } else {
      this.reactionService.update(this.resource, this.user, reactionType).subscribe(returnedReaction => {
        this.updateAmountsLocally(this.chosenReactionType, reactionType);
        this.chosenReactionType = reactionType;
      });
    }
  }
}
