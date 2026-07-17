# 05 — Development Roadmap

## Phase 1 — Secure member map

Status: In progress

- GitHub repository
- Modular front-end structure
- Supabase authentication
- Member allowlist
- County polygons
- Apiary search and filters
- Landcover disabled
- DCA disabled
- Define simple intake fields
- Create `apiaries` table
- Import existing JSON data
- Add Row Level Security
- Create member-safe map view
- Load apiaries from Supabase

## Phase 2 — Intake and administration

- Member apiary submission form
- Pending review status
- Admin approval screen
- Privacy-safe location workflow
- Edit own apiary
- Archive or deactivate apiary
- Validation and error messages
- Basic dashboard counts

## Phase 3 — Apiary management

- Individual hive records
- Inspection records
- Mite-test history
- Treatment history
- Queen records
- Feeding records
- Harvest records
- Photos and notes

## Phase 4 — Club operations

- Swarm-call tracking
- Club events
- Educational resources
- Aggregate statistics
- Reports
- Export to CSV
- Member notifications

## Phase 5 — Advanced GIS and analytics

- Landcover analysis
- Bloom scoring
- Drone congregation areas
- Forage overlap analysis
- Heat maps
- Seasonal trends
- Regional mite-risk indicators

## Immediate next build sequence

1. Finalize the V1 `apiaries` table.
2. Create the SQL migration.
3. Create Row Level Security policies.
4. Import the current apiary data.
5. Build `apiaries_member_map`.
6. Update the Leaflet app to use Supabase.
7. Test all current filters and popups.
8. Build the member intake form.
9. Build admin approval.
