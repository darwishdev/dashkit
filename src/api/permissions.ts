import type { PermissionsListResponse } from "./ApiTypes"

const perms: PermissionsListResponse = {
    "permissions": [
        {
            "permissions": [
                {
                    "permissionId": 1,
                    "permissionName": "create role",
                    "permissionFunction": "",
                    "permissionDescription": "Permission to create a role"
                },
                {
                    "permissionId": 2,
                    "permissionName": "update role",
                    "permissionFunction": "",
                    "permissionDescription": "Permission to update a role"
                },
                {
                    "permissionId": 3,
                    "permissionName": "list roles",
                    "permissionFunction": "",
                    "permissionDescription": "Permission to list roles"
                },
                {
                    "permissionId": 4,
                    "permissionName": "find role",
                    "permissionFunction": "",
                    "permissionDescription": "Permission to find a role"
                },
                {
                    "permissionId": 5,
                    "permissionName": "delete/restore role",
                    "permissionFunction": "",
                    "permissionDescription": "Permission to delete or restore a role"
                }
            ],
            "group": "roles"
        },
        {
            "permissions": [
                {
                    "permissionId": 6,
                    "permissionName": "create user",
                    "permissionFunction": "",
                    "permissionDescription": "Permission to create a user"
                },
                {
                    "permissionId": 7,
                    "permissionName": "update user",
                    "permissionFunction": "",
                    "permissionDescription": "Permission to update a user"
                },
                {
                    "permissionId": 8,
                    "permissionName": "list users",
                    "permissionFunction": "",
                    "permissionDescription": "Permission to list users"
                },
                {
                    "permissionId": 9,
                    "permissionName": "find user",
                    "permissionFunction": "",
                    "permissionDescription": "Permission to find a user"
                },
                {
                    "permissionId": 10,
                    "permissionName": "delete/restore user",
                    "permissionFunction": "",
                    "permissionDescription": "Permission to delete or restore a user"
                },
                {
                    "permissionId": 11,
                    "permissionName": "update user roles/permissions",
                    "permissionFunction": "",
                    "permissionDescription": "Permission to update user roles and permissions"
                }
            ],
            "group": "users"
        },
        {
            "permissions": [
                {
                    "permissionId": 12,
                    "permissionName": "find menu",
                    "permissionFunction": "",
                    "permissionDescription": "Permission to find a menu"
                }
            ],
            "group": "menu"
        },
        {
            "permissions": [
                {
                    "permissionId": 13,
                    "permissionName": "create order",
                    "permissionFunction": "",
                    "permissionDescription": "Permission to create an order"
                }
            ],
            "group": "orders"
        }
    ],
    "permissionsIds": [
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11,
        12,
        13
    ]
}
export default perms