import { User } from '../shared/models/user.model';

export enum PermissionTypes {
    Upload = 'UPLOAD',
    Edit = 'EDIT',
    Remove = 'REMOVE',
    Admin = 'ADMIN',
}

export interface UserPermissions {
    user: Partial<User>;
    channel: string;
    permissions: PermissionTypes[];
}
