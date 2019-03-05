import { Component, OnInit, Input } from '@angular/core';
import { PatternGeneratorService } from '../pattern-generator.service';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'bs-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss']
})
export class AvatarComponent implements OnInit {

  @Input() source: string;
  @Input() size: 'x-small' | 'small' | 'medium' | 'large' | 'x-large' = 'medium';
  @Input() alt?: string;
  @Input() userId?: string;
  @Input() channelId?: string;

  constructor(
    private userService: UserService,
    private patternGenerator: PatternGeneratorService,
    private router: Router,
    ) { }

  ngOnInit() {
    if (!this.source) {
      this.source = this.patternGenerator.getPatternAsUri(this.userService.currentUser.id);
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
