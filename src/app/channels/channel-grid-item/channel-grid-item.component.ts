import { Component, OnChanges , Input } from '@angular/core';
import { PatternGeneratorService } from 'src/app/shared/pattern-generator.service';
import { Channel } from '../../shared/models/channel.model';
import { Router } from '@angular/router';

@Component({
  selector: 'bs-channel-grid-item',
  templateUrl: './channel-grid-item.component.html',
  styleUrls: ['./channel-grid-item.component.scss']
})
export class ChannelGridItemComponent implements OnChanges {
  @Input() channel: Channel;
  @Input() isUploadLink: boolean = false;

  image: any;

  constructor(
    private patternGenerator: PatternGeneratorService,
    private router: Router
  ) { }

  ngOnChanges() {
    this.getImage();
  }

  getImage() {
    const source = this.channel.isProfile ? this.channel.user : this.channel.name;
    this.image = this.patternGenerator.getPatternAsSafeStyle(source);
  }

  onClick() {
    if (this.isUploadLink) {
      this.openUploadPage();
    } else {
      this.openChannel();
    }
  }

  openUploadPage() {
    this.router.navigate(['/upload/', this.channel.id]);
  }

  openChannel() {
    this.router.navigate(['/channels/', this.channel.id]);
  }

}
