import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'bs-channel-add',
  templateUrl: './channel-add.component.html',
  styleUrls: ['./channel-add.component.scss']
})
export class ChannelAddComponent {

  constructor(private router: Router, private location: Location) { }

  onClose(channelId: string) {
    if (channelId) {
      this.router.navigate(['/channels/', channelId]);
    } else {
      this.location.back();
    }
  }
}
