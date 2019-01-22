import { Component, Input } from '@angular/core';
import { SubscribeService } from '../subscribe.service';

@Component({
  selector: 'bs-subscribe-button',
  templateUrl: './subscribe-button.component.html',
  styleUrls: ['./subscribe-button.component.scss']
})
export class SubscribeButtonComponent {
  @Input() channelId: string;
  @Input() subscribersAmount: number;
  @Input() color: string = '#f00';
  @Input() textColor: string = '#fff';

  constructor(private subscribeService: SubscribeService) { }

  onClick() {
    this.subscribeService.subscribe(this.channelId);
  }
}
