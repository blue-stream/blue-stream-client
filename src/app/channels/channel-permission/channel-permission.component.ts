import { Component, OnInit, Input } from '@angular/core';
import { UserPermissions } from '../user-permissions.model';
import { Channel } from '../channel.model';
import { ChannelPermissionsService } from '../channel-permissions.service';
import { MatSnackBar } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'bs-channel-permission',
  templateUrl: './channel-permission.component.html',
  styleUrls: ['./channel-permission.component.scss']
})
export class ChannelPermissionComponent implements OnInit {
  @Input() userPermissions: UserPermissions;
  @Input() isOwner: boolean = false;
  @Input() channel: Channel;

  showEditForm: boolean = false;

  constructor(
    private userPermisssionsService: ChannelPermissionsService,
    public snackBar: MatSnackBar,
    private translateService: TranslateService,
  ) { }

  ngOnInit() {
  }

  onEdit() {
    this.showEditForm = !this.showEditForm;
  }

  onClose(userPermissions?: UserPermissions) {
    this.showEditForm = false;
    if (userPermissions) {
      this.userPermissions.permissions = userPermissions.permissions;
    }
  }

  onDelete() {
    this.userPermisssionsService.delete(this.userPermissions.user.id, this.channel.id).subscribe(deletedUserPermissions => {
      this.userPermisssionsService.userPermissionDeleted.next();
      this.translateService.get([
        'CHANNEL.FORM.CREATED',
        'CHANNEL.FORM.CREATED_APPROVE']).subscribe(translations => {
          this.snackBar.open(
            translations['CHANNEL.FORM.CREATED'],
            translations['CHANNEL.FORM.CREATED_APPROVE'],
            { duration: 2000 });
        });

    });
  }
}
