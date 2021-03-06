import { Component, OnChanges, OnInit, Input } from '@angular/core';
import { PatternGeneratorService } from '../pattern-generator.service';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'bs-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss']
})
export class AvatarComponent implements OnChanges, OnInit {

  @Input() source: string;
  @Input() size: 'x-small' | 'small' | 'medium' | 'large' | 'x-large' = 'medium';
  @Input() alt?: string;
  @Input() userId?: string;
  @Input() channelId?: string;
  imageSvg: string;

  constructor(
    private userService: UserService,
    private patternGenerator: PatternGeneratorService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.loadImage();
  }

  ngOnChanges() {
    this.loadImage();
  }

  loadImage() {
    if (!this.imageSvg && !this.source) {
      this.imageSvg = this.patternGenerator.getPatternAsUri(this.userService.currentUser.id);
    } else if (!this.imageSvg) {
      this.imageSvg = this.patternGenerator.getPatternAsUri(this.source);
    }
  }

  onClick() {
    if (this.userId) {
      this.router.navigate(['/channels/profile/', this.userId]);
    } else if (this.channelId) {
      this.router.navigate(['/channels/', this.channelId]);
    }
  }
}
