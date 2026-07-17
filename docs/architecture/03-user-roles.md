# 03 — User Roles and Permissions

## Roles

### Member

A verified club member.

Can:

- Sign in
- View active apiaries
- View privacy-safe map locations
- Search and filter the map
- Submit a new apiary
- Edit their own pending or active apiaries
- Hide their own apiary from the map

Cannot:

- View exact locations of other members
- Approve submissions
- Edit another member's records
- Change club roles

### Admin

A trusted club administrator.

Can:

- Perform all member actions
- Review pending apiaries
- Approve, reject, archive, or deactivate records
- Generate or adjust privacy-safe display locations
- Edit member records when needed
- View exact locations when operationally necessary
- Manage member status

### Super Admin

Technical or club system owner.

Can:

- Perform all admin actions
- Assign roles
- Manage application settings
- Perform database maintenance
- Review security configuration

## Recommended permission matrix

| Action | Member | Admin | Super Admin |
|---|---:|---:|---:|
| View active member map | Yes | Yes | Yes |
| View own exact location | Yes | Yes | Yes |
| View another member's exact location | No | Yes | Yes |
| Submit apiary | Yes | Yes | Yes |
| Edit own apiary | Yes | Yes | Yes |
| Edit another member's apiary | No | Yes | Yes |
| Approve apiary | No | Yes | Yes |
| Manage roles | No | No | Yes |
| Archive records | Own only | Yes | Yes |

## Row Level Security principles

- Deny access by default.
- Grant only the minimum needed.
- Use `auth.uid()` to identify the current user.
- Do not rely on hidden buttons for security.
- Enforce access in PostgreSQL, not only in JavaScript.
- Keep exact locations out of member-safe views.
