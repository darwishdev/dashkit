import type {
    FileUploadRequest, FileUploadResponse, FileRemoveRequest, FileRemoveResponse
} from '@/types/types'
export interface Permission {
    permissionId: number
    permissionName: string
    permissionFunction: string
    permissionDescription: string
}

export interface PermissionsListRow {
    group: string;

    permissions: Permission[];

}
export interface PermissionsListResponse {
    permissions: PermissionsListRow[],
    permissionsIds: number[]

}
export interface User {
    userId: number;
    userName: string;
    userPhone: string;
    userEmail: string;
    userPassword: string;
    userRoles: number[];
}

export interface UserCreateRequest {
    userName: string;
    userPhone: string;
    userEmail: string;
    userPassword: string;
    userRoles: number[];
}

export interface UserCreateResponse {
    user?: User;
}

export interface LoginRequest {
    userName: string;
    userPassword: string;
}

export interface LoginResponse {
    user: {
        userName: string
        userPhone: string
        userEmail: string
    },
    loginInfo: {
        accessToken: string
        refreshToken: string
    },
    permissions: string;
    sidebar: string;
}

export interface UserUpdateRequest {
    userId: number;
    userName: string;
    userPhone: string;
    userEmail: string;
    userPassword: string;
    userRoles: number[];
}

export interface UserUpdateResponse {
    user?: User;
}


export interface UserFindRequest {
    userId: number;
}

export interface UserFindResponse {
    userId: number;
    userName: string;
    userPhone: string;
    userEmail: string;
    userPassword: string;
    userRoles: number[];
}

export interface RolesListRequest { }

export interface RolesListRow {
    roleId: number;
    roleName: string;
    roleUsers: number;
    rolePermissions: number;
}

export interface RolesListResponse {
    roles: RolesListRow[];
    deleteRoles: RolesListRow[];
}





export interface Role {
    roleId: number;
    roleName: string;
    roleDescription: string;
    createdAt?: Date;
    deletedAt?: Date;
}

export interface RoleCreateRequest {
    roleName: string;
    roleDescription: string;
    permissions: number[];
}

export interface RoleCreateResponse {
    role?: Role;
}



export interface RoleBulkCreateRequest {
    roles: RoleCreateRequest[]
}

export interface RoleBulkCreateResponse {
    roles?: Role[];
}

export interface RoleUpdateRequest {
    roleId: number;
    roleName: string;
    roleDescription: string;
    permissions: number[];
}

export interface RoleUpdateResponse {
    role?: Role;
}


export interface RoleFindRequest {
    roleId: number;
}

export interface RoleFindResponse {
    roleName: string;
    roleDescription: string;
    permissions: number[];
}

export interface RoleFindResponse {
    roleId: number;
    roleName: string;
    roleUsers: number;
    rolePermissions: number;
}
export interface RoleDeleteRestoreRequest {
    roleId: number;
}
export interface UserDeleteRestoreRequest {
    userId: number;
}
export interface ApiClient {
    
    permissionsList: () => Promise<PermissionsListResponse>
    login: (req: LoginRequest) => Promise<LoginResponse>
    userCreate: (req: UserCreateRequest) => Promise<UserCreateResponse>
    userCreateWithErr: (req: UserCreateRequest) => Promise<UserCreateResponse>
    userCreateWithGlobalErr: (req: UserCreateRequest) => Promise<UserCreateResponse>
    userUpdate: (req: UserUpdateRequest) => Promise<UserUpdateResponse>
    userUpdateWithErr: (req: UserUpdateRequest) => Promise<UserUpdateResponse>
    userUpdateWithGlobalErr: (req: UserUpdateRequest) => Promise<UserUpdateResponse>
    userFind: (req: UserFindRequest) => Promise<UserFindResponse>
    userFindWithErr: (req: UserFindRequest) => Promise<UserFindResponse>
    rolesList: (request: RolesListRequest) => Promise<RolesListResponse>
    rolesListWithErr: (request: RolesListRequest) => Promise<RolesListResponse>
    roleDeleteRestore: (request: RoleDeleteRestoreRequest) => Promise<void>
    userDeleteRestore: (request: UserDeleteRestoreRequest) => Promise<void>
    roleCreate: (req: RoleCreateRequest) => Promise<RoleCreateResponse>
    roleCreateWithErr: (req: RoleCreateRequest) => Promise<RoleCreateResponse>
    loginWithPwErr: (req: LoginRequest) => Promise<LoginResponse>
    roleCreateWithGlobalErr: (req: RoleCreateRequest) => Promise<RoleCreateResponse>
    roleBulkCreate: (req: RoleBulkCreateRequest) => Promise<RoleBulkCreateResponse>
    roleUpdate: (req: RoleUpdateRequest) => Promise<RoleUpdateResponse>
    roleUpdateWithErr: (req: RoleUpdateRequest) => Promise<RoleUpdateResponse>
    roleUpdateWithGlobalErr: (req: RoleUpdateRequest) => Promise<RoleUpdateResponse>
    roleFind: (req: RoleFindRequest) => Promise<RoleFindResponse>
    roleFindWithErr: (req: RoleFindRequest) => Promise<RoleFindResponse>
    fileRemove: (req: FileRemoveRequest) => Promise<FileRemoveResponse>
    fileUpload: (req: FileUploadRequest) => Promise<FileUploadResponse>
}