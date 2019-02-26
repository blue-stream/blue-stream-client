import { Component, OnInit, Input } from '@angular/core';
import { PatternGeneratorService } from '../pattern-generator.service';
import { UserService } from '../user.service';

@Component({
  selector: 'bs-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss']
})
export class AvatarComponent implements OnInit {

  @Input() source: string;
  @Input() size: 'x-small' | 'small' | 'medium' | 'large' | 'x-large' = 'medium';
  @Input() alt?: string;

  constructor(private userService: UserService, private patternGenerator: PatternGeneratorService) { }

  ngOnInit() {
    if (!this.source) {
      this.source = this.patternGenerator.getPatternAsUri(this.userService.currentUser.id);
    }
  }

}
