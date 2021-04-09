import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { VideoService } from 'src/app/core/services/video.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'bs-popular-tags',
  templateUrl: './popular-tags.component.html',
  styleUrls: ['./popular-tags.component.scss']
})
export class PopularTagsComponent implements OnInit, OnDestroy {

  tags: string[];
  tagsToLoad = 30;
  amountOfTagsToShowInPage = 100;
  tagsSubscription: any;
  isLoading = false;
  @Output() tagClicked: EventEmitter<string> = new EventEmitter();

  constructor(
    private videoService: VideoService) {
  }

  ngOnInit() {
    this.tags = [];
    this.loadPopularTags(0, this.tagsToLoad);
  }

  loadNextTags() {
    this.loadPopularTags(
      this.tags.length,
      this.tagsToLoad);
  }

  loadPopularTags(startIndex = 0, amountToLoad) {
    const endIndex = startIndex + amountToLoad;
    this.isLoading = true;

    this.tagsSubscription = this.videoService.getTags(startIndex, endIndex).subscribe(tags => {
      this.tags = this.tags.concat(tags);
      this.isLoading = false;
    },
      (error) => {
        this.isLoading = false;
      });
  }

  onTagClick(tag: string) {
    this.tagClicked.emit(tag);
  }

  ngOnDestroy() {
    this.tagsSubscription.unsubscribe();
  }

  areTagsAvailable() {
    return this.tags.length % this.tagsToLoad === 0;
  }

}
