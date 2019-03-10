import { Component, Input } from '@angular/core';
import { UserPermissions } from '../user-permissions.model';
import { Channel } from '../../shared/models/channel.model';
import { ChannelPermissionsService } from '../channel-permissions.service';
import { MatSnackBar } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'bs-channel-permission',
  templateUrl: './channel-permission.component.html',
  styleUrls: ['./channel-permission.component.scss']
})
export class ChannelPermissionComponent {
  @Input() userPermissions: UserPermissions;
  @Input() isOwner: boolean = false;
  @Input() channel: Channel;

  showEditForm: boolean = false;

  constructor(
    private userPermisssionsService: ChannelPermissionsService,
    public snackBar: MatSnackBar,
    private translateService: TranslateService,
  ) { }

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
    this.userPermisssionsService.delete(this.userPermissions.user.id, this.channel.id)
    .catch((err, caught) => {
      this.translateService.get([
        'CHANNEL.PERMISSIONS_FORM.CAN_NOT_REMOVE_OWNER_ERROR',
        'CHANNEL.PERMISSIONS_FORM.DELETE_FAILED']).subscribe(translations => {
          this.snackBar.open(
            translations['CHANNEL.PERMISSIONS_FORM.CAN_NOT_REMOVE_OWNER_ERROR'],
            translations['CHANNEL.PERMISSIONS_FORM.DELETE_FAILED'],
            { duration: 2000 });
        });
      return new Observable(null);
    })
    .subscribe(deletedUserPermissions => {
      this.userPermisssionsService.userPermissionDeleted.next();
      this.translateService.get([
        'CHANNEL.CHANNEL_PERMISSIONS.DELETED',
        'CHANNEL.CHANNEL_PERMISSIONS.DELETED_APPROVE']).subscribe(translations => {
          this.snackBar.open(
            translations['CHANNEL.CHANNEL_PERMISSIONS.DELETED'],
            translations['CHANNEL.CHANNEL_PERMISSIONS.DELETED_APPROVE'],
            { duration: 2000 });
        });
    });
  }
}
