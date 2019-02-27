import { Component, OnInit, Input } from '@angular/core';
import { Channel } from '../models/channel.model';
import { PatternGeneratorService } from '../pattern-generator.service';
import { Router } from '@angular/router';

@Component({
  selector: 'bs-channel-tile',
  templateUrl: './channel-tile.component.html',
  styleUrls: ['./channel-tile.component.scss']
})
export class ChannelTileComponent implements OnInit {
  
  constructor(    
    private patternGenerator: PatternGeneratorService,
    private router: Router
  ) { }

  @Input() horizontal = true;
  @Input() description = true;
  @Input() channel: Channel
  image: string;

  ngOnInit() {
    this.getImage();
  }

  getImage() {
    this.image = this.patternGenerator.getPatternAsUrl(this.channel.name);
  }

  onClick() {
    this.openChannel();
  }

  openChannel() {
    this.router.navigate(['/channels/', this.channel.id]);
  }

}
