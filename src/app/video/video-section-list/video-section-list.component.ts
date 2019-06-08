import { Component, OnInit } from '@angular/core';
import { VideoConstants } from '../shared/constants';
import { VideoSection } from '../../shared/models/video-section.model';
import { VideoService, concatStreamerUrl } from '../../core/services/video.service';
import { Router } from '@angular/router';
import { ReactionService } from 'src/app/core/services/reaction.service';
import { ReactionType, ResourceType } from 'src/app/shared/models/reaction.model';
import { Video } from 'src/app/shared/models/video.model';

@Component({
  selector: 'bs-video-section-list',
  templateUrl: './video-section-list.component.html',
  styleUrls: ['./video-section-list.component.scss']
})
export class VideoSectionListComponent implements OnInit {

  width: number;
  sections: VideoSection[] = [];
  noVideosInSections: boolean = true;
  isLoading: boolean = true;

  constructor(private router: Router, private videoService: VideoService, private reactionService: ReactionService) { }

  ngOnInit() {
    this.initSections();
  }

  initSections() {
    this.loadPopularVideos();
    this.loadNewVideos();
    this.loadLikedVideos();
  }

  loadPopularVideos() {
    const section: VideoSection = {
      title: 'VIDEO.VIDEO_SECTION_ITEM.MOST_VIEWED',
      isDismissable: false,
      isLoading: true,
    };

    this.sections.push(section);

    this.videoService.getVideos({}, 0, 10, 'views', -1).subscribe(videos => {
      section.videos = videos;
      section.isLoading = false;
      this.isLoading = false;

      if (section.videos && section.videos.length > 0) {
        this.noVideosInSections = false;
        this.isLoading = false;
      }
    },
      (error) => {
        section.isLoading = false;
      });
  }

  loadNewVideos() {
    const section: VideoSection = {
      title: 'VIDEO.VIDEO_SECTION_ITEM.NEWEST',
      isDismissable: false,
      isLoading: true,
    };

    this.sections.push(section);

    this.videoService.getVideos({}, 0, 10, 'publishDate', -1).subscribe(videos => {
      section.videos = videos;
      section.isLoading = false;
      this.isLoading = false;

      if (section.videos && section.videos.length > 0) {
        this.noVideosInSections = false;
      }
    },
      (error) => {
        section.isLoading = false;
        this.isLoading = false;
      });
  }

  loadLikedVideos() {
    const section: VideoSection = {
      title: 'VIDEO.VIDEO_SECTION_ITEM.MOST_LIKED',
      isDismissable: false,
      isLoading: true,
    };

    this.sections.push(section);

    this.reactionService.getAllTypesAmountsOfResource(ReactionType.Like, ResourceType.Video, 0, 10, '-').subscribe(TypeAmountOfResource => {
      section.videos = (TypeAmountOfResource.map(typeAmount => concatStreamerUrl(typeAmount.resource)) as Video[]);
      section.isLoading = false;
      this.isLoading = false;

      if (section.videos && section.videos.length > 0) {
        this.noVideosInSections = false;
      }
    },
      (error) => {
        section.isLoading = false;
        this.isLoading = false;
      });
  }

  layoutChanged(maxVideosAllowed: number) {
    this.videoService.maxVideoColumnsAllowed = maxVideosAllowed;
    this.width = maxVideosAllowed * VideoConstants.videoTileWidth;
  }

  onTagClick(tag: string) {
    this.router.navigate(['/results'], { queryParams: { search_query: tag } });
  }
}
