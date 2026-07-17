# System Architecture Diagram

```mermaid
flowchart LR
    U[Club Member] --> B[Browser]
    A[Club Admin] --> B

    B --> GH[GitHub Pages Front End]
    GH --> SA[Supabase Auth]
    GH --> API[Supabase REST / RPC]

    SA --> M[(members)]
    API --> V[Member-safe Views and RPCs]
    V --> AP[(apiaries)]
    V --> C[(counties)]

    AP --> PL[private_location]
    AP --> DL[display_location]

    PL -. admin/owner only .-> A
    DL --> MAP[Leaflet Member Map]

    AP --> H[(hives - future)]
    H --> I[(inspections - future)]
    H --> T[(treatments - future)]
    H --> Q[(queens - future)]
    AP --> HR[(harvests - future)]
```

## Security boundary

The member map uses only safe views or RPC functions.

The private base table is protected by Row Level Security.

The browser never receives exact apiary coordinates for normal map use.
