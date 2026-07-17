# 04 — API Design

## Preferred approach

Use Supabase-generated APIs, SQL views, and RPC functions instead of building a separate server initially.

## Map endpoints

### Read member-safe apiaries

Preferred source:

```text
apiaries_member_map
```

Returned fields:

```text
id
apiary_name
owner_display_name
yard_type
county_name
hive_count
mite_count
treated
nys_inspected
mite_biter
honey_produced_lbs
display_lat
display_lng
```

### Read counties

Use the existing county RPC or view that returns GeoJSON for the requested map area.

## Intake endpoints

### Create apiary submission

Insert a new apiary with:

```text
status = pending
owner_user_id = auth.uid()
```

The user may provide an exact map point or address in a protected form.

### Update own apiary

Members may update only their own allowed fields.

### Approve apiary

Admin-only workflow:

1. Review submission
2. Verify exact location
3. Create or confirm `display_location`
4. Set status to `active`
5. Record `approved_at` and `approved_by`

## Recommended RPC functions

| Function | Purpose |
|---|---|
| `get_member_apiaries()` | Returns member-safe active records |
| `submit_apiary(...)` | Creates a pending apiary |
| `update_own_apiary(...)` | Updates fields owned by the current user |
| `approve_apiary(apiary_id)` | Admin approval workflow |
| `set_display_location(apiary_id, ...)` | Admin-safe privacy location update |
| `archive_apiary(apiary_id)` | Soft deletion |

## Error handling

The front end should handle:

- Not authenticated
- Member not approved
- No map records
- Network failure
- Permission denied
- Invalid location
- Duplicate submission
- Approval required

## Security rules

- Never send `private_location` to the normal member map.
- Never trust role values stored only in the browser.
- Never expose service-role keys in GitHub or client JavaScript.
- Use only the Supabase anon key in the browser.
- Protect all private data with Row Level Security.
