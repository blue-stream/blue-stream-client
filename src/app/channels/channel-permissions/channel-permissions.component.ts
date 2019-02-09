import { Component, OnInit, Input } from '@angular/core';
import { ChannelPermissionsService } from '../channel-permissions.service';
import { UserPermissions } from '../user-permissions.model';
import { Channel } from '../channel.model';

@Component({
  selector: 'bs-channel-permissions',
  templateUrl: './channel-permissions.component.html',
  styleUrls: ['./channel-permissions.component.scss']
})
export class ChannelPermissionsComponent implements OnInit {

  @Input() channel: Channel;

  permittedUsers: UserPermissions[] = [];

  constructor(private userPermissionsService: ChannelPermissionsService) { }

  ngOnInit() {
    this.loadPermittedUsers();
  }

  loadPermittedUsers() {
    this.userPermissionsService.getChannelPermittedUsers(this.channel.id, 0, 10).subscribe((usersPermissions) => {
      this.permittedUsers = usersPermissions;
    });
  }

}
