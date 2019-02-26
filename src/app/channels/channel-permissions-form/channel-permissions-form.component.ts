import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Channel } from '../channel.model';
import { UserPermissions, PermissionTypes } from '../user-permissions.model';
import { FormGroup, FormBuilder, Validators, FormControl, ValidatorFn, FormArray } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';
import { environment } from 'src/environments/environment';
import { ChannelPermissionsService } from '../channel-permissions.service';
import { Observable } from 'rxjs';
import { User } from 'src/app/shared/models/user.model';
import { UserService } from 'src/app/shared/user.service';

@Component({
  selector: 'bs-channel-permissions-form',
  templateUrl: './channel-permissions-form.component.html',
  styleUrls: ['./channel-permissions-form.component.scss']
})
export class ChannelPermissionsFormComponent implements OnInit {
  @Input() channel: Channel;
  @Input() userPermissions: UserPermissions;
  @Output() closeForm: EventEmitter<void | UserPermissions> = new EventEmitter();

  userPermissionsForm: FormGroup;
  isEditForm: boolean = false;
  users: User[] = [];
  permissionsTypesArray: { name: string, type: PermissionTypes, value: boolean }[];

  constructor(
    private fb: FormBuilder,
    public snackBar: MatSnackBar,
    private translateService: TranslateService,
    private channelPermissionsService: ChannelPermissionsService,
    private userService: UserService,
  ) { }

  initUserPermissions() {
    this.permissionsTypesArray = [
      { name: 'CHANNEL.PERMISSIONS_FORM.ADMIN', type: PermissionTypes.Admin, value: false },
      { name: 'CHANNEL.PERMISSIONS_FORM.EDIT', type: PermissionTypes.Edit, value: false },
      { name: 'CHANNEL.PERMISSIONS_FORM.REMOVE', type: PermissionTypes.Remove, value: false },
      { name: 'CHANNEL.PERMISSIONS_FORM.UPLOAD', type: PermissionTypes.Upload, value: false },
    ];

    if (this.isEditForm) {
      this.permissionsTypesArray.map(permission => {
        if (this.userPermissions.permissions.indexOf(permission.type) !== -1) {
          permission.value = true;
        }

        return permission;
      });
    }
  }

  userNameDisplay(userId?: string) {
    return userId ? this.users.find(user => user.id === userId).name : undefined;
  }

  onType(searchFilter: string) {
    this.loadSearchedUsers(searchFilter);
  }

  loadSearchedUsers(searchFilter: string) {
    this.userService.getSearched(searchFilter, 0, 10).subscribe(users => {
      this.users = users;
    });
  }

  ngOnInit() {
    if (this.userPermissions) {
      this.isEditForm = true;
    }

    this.initUserPermissions();
    this.createForm();
    this.loadSearchedUsers('');
  }

  createForm() {
    const checkBoxControls = this.permissionsTypesArray.map(control => new FormControl(control.value));

    if (this.isEditForm) {
      this.userPermissionsForm = this.fb.group({
        permissions: this.fb.array(checkBoxControls, this.minSelectedCheckboxes(1)),
      });
    } else {
      this.userPermissionsForm = this.fb.group({
        permissions: this.fb.array(checkBoxControls, this.minSelectedCheckboxes(1)),
        user: this.fb.control('', [Validators.required, Validators.pattern(/\w@\w/)]),
      });
    }
  }

  onSubmit(event: Event) {
    const permissions = this.userPermissionsForm.value.permissions
      .map((value, index) => value ? this.permissionsTypesArray[index].type : null)
      .filter(value => value !== null);

    const userPermissions: UserPermissions = {
      channel: this.channel.id,
      user: { id: this.isEditForm ? this.userPermissions.user.id : this.userPermissionsForm.get('user').value.trim() },
      permissions,
    };

    if (this.isEditForm) {
      this.updateUserPermissions(userPermissions);
    } else {
      this.createUserPermissions(userPermissions);
    }
  }



  minSelectedCheckboxes(min = 1) {
    const validator: ValidatorFn = (formArray: FormArray) => {
      const totalSelected = formArray.controls
        .map(control => control.value)
        .reduce((prev, next) => next ? prev + next : prev, 0);

      return totalSelected >= min ? null : { required: true };
    };

    return validator;
  }

  updateUserPermissions(userPermissions: UserPermissions) {
    this.channelPermissionsService.update(userPermissions.user.id, this.channel.id, userPermissions.permissions)
      .subscribe(retUserPermissions => {

        this.translateService.get([
          'CHANNEL.PERMISSIONS_FORM.UPDATED',
          'CHANNEL.PERMISSIONS_FORM.UPDATED_APPROVE']).subscribe(translations => {
            this.snackBar.open(
              translations['CHANNEL.PERMISSIONS_FORM.UPDATED'],
              translations['CHANNEL.PERMISSIONS_FORM.UPDATED_APPROVE'],
              { duration: 2000 });
          });

        this.close(retUserPermissions);
      });
  }

  createUserPermissions(userPermissions: UserPermissions) {
    this.channelPermissionsService.create(userPermissions.user.id, userPermissions.channel, userPermissions.permissions)
      .catch((err, caught) => {
        this.translateService.get([
          'CHANNEL.PERMISSIONS_FORM.USER_ALREADY_EXISTS_ERROR',
          'CHANNEL.PERMISSIONS_FORM.CREATION_FAILED']).subscribe(translations => {
            this.snackBar.open(
              translations['CHANNEL.PERMISSIONS_FORM.USER_ALREADY_EXISTS_ERROR'],
              translations['CHANNEL.PERMISSIONS_FORM.CREATION_FAILED'],
              { duration: 2000 });
          });
        return new Observable(null);
      })
      .subscribe(retUserPermissions => {
        this.channelPermissionsService.userPermissionCreated.next();

        this.translateService.get([
          'CHANNEL.PERMISSIONS_FORM.CREATED',
          'CHANNEL.PERMISSIONS_FORM.CREATED_APPROVE']).subscribe(translations => {
            this.snackBar.open(
              translations['CHANNEL.PERMISSIONS_FORM.CREATED'],
              translations['CHANNEL.PERMISSIONS_FORM.CREATED_APPROVE'],
              { duration: 2000 });
          });
        this.closeForm.emit();
      });
  }

  close(userPermissions?: UserPermissions) {
    this.closeForm.emit(userPermissions);
  }
}
