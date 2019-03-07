import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'bs-channel-add',
  templateUrl: './channel-add.component.html',
  styleUrls: ['./channel-add.component.scss']
})
export class ChannelAddComponent {

  constructor(private router: Router) { }

  onClose(channelId: string) {
    this.router.navigate(['/channels/', channelId]);
  }
}
