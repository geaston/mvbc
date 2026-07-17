# 01 — System Overview

## Purpose

MVBK Apiary Manager is a member-only web application for mapping and managing apiaries associated with the Mohawk Valley Beekeepers Club.

The first version is a secure club map. The long-term direction is a broader apiary-management platform.

## Core components

### Front end

- Static web application hosted on GitHub Pages
- HTML, CSS, and JavaScript
- Leaflet for mapping
- Supabase JavaScript client for authentication and data access

### Back end

- Supabase Auth
- PostgreSQL
- PostGIS
- Row Level Security
- SQL views and RPC functions for safe data access

### Hosting

- GitHub for source control
- GitHub Pages for the front end
- Supabase for database, authentication, and API access

## V1 application flow

1. A member opens the site.
2. Supabase Auth verifies the member.
3. The application confirms the member is on the club allowlist.
4. The app requests member-safe apiary records.
5. Supabase returns only privacy-safe display locations and permitted fields.
6. Leaflet renders markers, counties, filters, and popups.
7. New apiary submissions are stored as pending.
8. An administrator reviews and activates approved records.

## Key design decisions

### Exact locations remain private

Each apiary stores:

- `private_location`
- `display_location`

The member map receives only `display_location`.

### The browser does not query the private table directly

The normal map should read from a safe view or RPC such as:

```text
apiaries_member_map
```

### One row represents one apiary yard

Individual hives, inspections, treatments, queens, harvests, and photos belong in related tables later.

## Non-goals for V1

- Full hive-by-hive management
- Offline mobile inspections
- Public apiary map
- Landcover analysis
- Drone congregation area analysis
- Advanced reporting
- Multi-club support
