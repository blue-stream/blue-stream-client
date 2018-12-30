import { Component, Input } from '@angular/core';

@Component({
  selector: 'bs-channel-about',
  templateUrl: './channel-about.component.html',
  styleUrls: ['./channel-about.component.scss']
})
export class ChannelAboutComponent {
  @Input() description: string;
  constructor() { }
}
