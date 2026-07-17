# MVBK Apiary Manager Architecture

This folder contains the living architecture documents for the MVBK Apiary Manager.

## Documents

1. [System Overview](01-system-overview.md)
2. [Database Schema](02-database-schema.md)
3. [User Roles and Permissions](03-user-roles.md)
4. [API Design](04-api-design.md)
5. [Development Roadmap](05-roadmap.md)
6. [Architecture Diagram](diagrams/system-architecture.md)

## Current product scope

The first release remains focused on the member-only apiary map.

V1 priorities:

- Supabase authentication
- Club-member allowlist
- Member-safe apiary locations
- Counties and county filters
- Apiary search and filters
- Simple apiary intake form
- Admin approval workflow
- Row Level Security

Later versions may add hives, inspections, treatments, queens, harvests, photos, reports, events, and swarm calls.

## Architecture principle

The browser should never receive exact apiary coordinates unless the signed-in user is explicitly authorized to view them. The normal map must use a privacy-safe database view or RPC.
