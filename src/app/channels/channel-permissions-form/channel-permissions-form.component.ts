import { Component, OnInit, Input } from '@angular/core';
import { Channel } from '../channel.model';
import { UserPermissions } from '../user-permissions.model';

@Component({
  selector: 'bs-channel-permissions-form',
  templateUrl: './channel-permissions-form.component.html',
  styleUrls: ['./channel-permissions-form.component.scss']
})
export class ChannelPermissionsFormComponent implements OnInit {
  @Input() channel: Channel;
  @Input() userPermissions: UserPermissions;

  constructor() { }

  ngOnInit() {
  }

}
