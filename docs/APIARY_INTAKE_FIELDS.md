# MVBK Apiary Intake Fields

**Status:** Simplified V1 proposal for club review

## Purpose

This version keeps the member intake form and map popup intentionally simple. Members fill out only the main information needed to create an apiary record and display it on the club map.

The form contains **10 member-facing fields**. Protected database fields such as exact coordinates, user IDs, record status, and timestamps are handled separately by the application or an administrator.

## Member form and popup fields

| # | Database field | Form label | Input type | Required | Purpose |
|---:|---|---|---|---:|---|
| 1 | `apiary_name` | Apiary Name | Short text | Yes | Name used to identify the yard. |
| 2 | `owner_display_name` | Owner / Beekeeper Name | Short text | Yes | Name displayed to approved club members. |
| 3 | `yard_type` | Yard Type | Dropdown | Yes | Primary use of the yard. |
| 4 | `county_name` | County | Dropdown | Yes | County used for map filtering. |
| 5 | `hive_count` | Number of Hives | Whole number | Yes | Current colony count at the yard. |
| 6 | `mite_count` | Latest Mite Count (%) | Decimal number | No | Most recent mite level; blank if not tested. |
| 7 | `treated` | Treated This Season | Yes / No | Yes | Whether the yard has received a mite treatment this season. |
| 8 | `nys_inspected` | NYS Inspected | Yes / No | Yes | Whether a current NYS inspection is recorded. |
| 9 | `mite_biter` | Mite-Biter Genetics | Yes / No | Yes | Whether mite-biter genetics are present at the yard. |
| 10 | `honey_produced_lbs` | Honey Produced This Year (lb) | Decimal number | No | Current-year honey production; blank if not reported. |

## Recommended yard-type options

- Honey Yard
- Nuc Yard
- Queen Mating Yard
- Drone Flood Yard
- Resource Yard
- Educational Yard
- Other

## Suggested popup layout

The map popup could show:

1. Apiary name
2. Owner/beekeeper name
3. Yard type
4. County
5. Number of hives
6. Latest mite count
7. Treated this season
8. NYS inspected
9. Mite-biter genetics
10. Honey produced this year

Blank optional values should be omitted instead of showing `N/A`.

## Protected fields not entered in the public form

These fields still belong in the database, but they should not appear in the normal member form or popup:

| Field | Purpose |
|---|---|
| `id` | Supabase-generated primary key |
| `owner_user_id` | Connects the apiary to the authenticated member |
| `private_location` | Exact owner/admin-only coordinate |
| `display_location` | Privacy-safe point shown on the member map |
| `location_privacy_method` | Records how the safe point was created |
| `status` | Pending, active, inactive, or archived |
| `created_at` | Record creation time |
| `updated_at` | Last update time |

## Location-entry recommendation

Location should be handled as a separate protected step:

1. The member provides an exact address or selects the apiary on a private map.
2. The system stores the exact point in `private_location`.
3. An administrator or database function creates `display_location`.
4. The normal member map receives only `display_location`.

Exact latitude and longitude should never be returned by the member-map query.

## Data that can be added later

Keep these out of the first intake form:

- Individual hive records
- Full mite-test history
- Treatment products and dates
- Inspection history
- Queen records
- Harvest history
- Photos
- Private notes
- Co-managers and permissions

These can become related tables in later versions without making the initial signup form difficult.

## Club-review questions

1. Should owner names be displayed by default?
2. Should honey production show exact pounds or a range?
3. Should mite counts older than 30–45 days be marked as stale?
4. Does “treated this season” mean the calendar year or the current beekeeping season?
5. Should members enter an address, exact map point, or both for the protected location step?

## Recommended first implementation

1. Approve the 10 member-facing fields.
2. Build the simple intake form.
3. Store new records as `pending`.
4. Have an administrator review the location and create the safe display point.
5. Activate the record so it appears on the member map.
