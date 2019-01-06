import { Component, OnInit, Input } from '@angular/core';
import { PatternGeneratorService } from 'src/app/shared/pattern-generator.service';
import { Channel } from '../channel.model';
import { Router } from '@angular/router';

@Component({
  selector: 'bs-channel-grid-item',
  templateUrl: './channel-grid-item.component.html',
  styleUrls: ['./channel-grid-item.component.scss']
})
export class ChannelGridItemComponent implements OnInit {
  @Input() channel: Channel;
  image: string;

  constructor(
    private patternGenerator: PatternGeneratorService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getImage();
  }

  getImage() {
    this.image = this.patternGenerator.getPatternAsUrl(this.channel.name);
  }

  openChannel() {
    this.router.navigate(['/channels/channel/', this.channel.id]);
  }

}
