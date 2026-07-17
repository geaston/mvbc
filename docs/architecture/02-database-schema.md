# 02 — Database Schema

## V1 tables

### `members`

Approved club members and application roles.

Suggested fields:

| Field | Type | Purpose |
|---|---|---|
| `id` | uuid | Primary key |
| `user_id` | uuid | References `auth.users.id` |
| `email` | text | Approved member email |
| `display_name` | text | Name shown in the application |
| `role` | text | `member`, `admin`, or `super_admin` |
| `status` | text | `active`, `pending`, `inactive` |
| `created_at` | timestamptz | Creation timestamp |
| `updated_at` | timestamptz | Last update timestamp |

### `apiaries`

One row per apiary yard.

#### Member-facing fields

| Field | Type | Purpose |
|---|---|---|
| `apiary_name` | text | Yard name |
| `owner_display_name` | text | Member-facing beekeeper name |
| `yard_type` | text | Honey, nuc, queen mating, resource, etc. |
| `county_name` | text | County filter and popup |
| `hive_count` | integer | Current number of colonies |
| `mite_count` | numeric | Latest mite count |
| `treated` | boolean | Treated this season |
| `nys_inspected` | boolean | NYS inspection indicator |
| `mite_biter` | boolean | Mite-biter genetics indicator |
| `honey_produced_lbs` | numeric | Current-year production |

#### Protected fields

| Field | Type | Purpose |
|---|---|---|
| `id` | uuid | Primary key |
| `owner_user_id` | uuid | Owner reference |
| `private_location` | geography(Point,4326) | Exact private coordinate |
| `display_location` | geography(Point,4326) | Safe member-map coordinate |
| `location_privacy_method` | text | How the safe point was created |
| `status` | text | `pending`, `active`, `inactive`, `archived` |
| `created_at` | timestamptz | Creation timestamp |
| `updated_at` | timestamptz | Last update timestamp |
| `approved_at` | timestamptz | Approval timestamp |
| `approved_by` | uuid | Administrator who approved it |

### `counties`

Existing PostGIS county polygons used for map display and filtering.

## Recommended V1 views

### `apiaries_member_map`

Returns active records only, including:

- Safe display point
- Popup fields
- County
- Yard type
- Map visibility fields

It must not return:

- Exact coordinates
- Private notes
- Owner user ID
- Approval metadata

### `apiaries_owner`

Returns records belonging to the authenticated owner.

### `apiaries_admin`

Returns all records for authorized administrators.

## Future tables

| Table | Purpose |
|---|---|
| `hives` | Individual colonies |
| `inspections` | Dated inspection records |
| `mite_tests` | Full mite-test history |
| `treatments` | Treatment events |
| `queens` | Queen origin and status |
| `harvests` | Honey harvest records |
| `apiary_photos` | Images and captions |
| `apiary_notes` | Timestamped notes |
| `apiary_members` | Co-managers and permissions |
| `swarm_calls` | Club swarm-call tracking |
| `club_events` | Meetings and field days |

## Relationship summary

```text
members
  └── apiaries
        ├── hives
        │     ├── inspections
        │     ├── mite_tests
        │     ├── treatments
        │     └── queens
        ├── harvests
        ├── apiary_photos
        └── apiary_notes
```
