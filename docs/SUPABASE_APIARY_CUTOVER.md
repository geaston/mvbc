# Supabase Apiary Cutover

1. Replace `js/data.js` with the supplied file.
2. Add `ENABLE_APIARY_JSON_FALLBACK: true` to `window.MVBK_CONFIG`.
3. Convert the existing JSON:

```bash
node scripts/convert-apiaries-to-sql.mjs apiaries.json apiaries-import.sql
```

4. Review and run `apiaries-import.sql` in Supabase.
5. Imported coordinates are stored only in `private_location`; records remain pending and hidden.
6. Assign a safe display point with `approve_apiary()`.
7. Confirm the console says `Loaded N apiaries from Supabase.`
8. Test markers, popups, owner/county/type filters, mite fields, honey fields, mobile, and authentication.
9. Set `ENABLE_APIARY_JSON_FALLBACK: false` and test again.
10. Remove the public JSON file only after the no-fallback test succeeds.

Example approval:

```javascript
await supabaseClient.rpc('approve_apiary', {
  p_apiary_id: 'APIARY_UUID',
  p_display_lat: 42.695,
  p_display_lng: -74.395,
  p_privacy_method: 'nearest_intersection'
});
```

Final Git commands:

```bash
git rm apiaries.json
git add js/data.js js/config.js scripts/convert-apiaries-to-sql.mjs docs/SUPABASE_APIARY_CUTOVER.md
git commit -m "Load apiaries securely from Supabase"
git push
```

Keep a private backup of the original JSON outside the public repository if it contains exact coordinates.
