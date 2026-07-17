/* MVBK Apiary Manager — Supabase data loading */

async function loadApiariesFromSupabase() {
  const { data, error } = await supabaseClient.rpc('get_member_apiaries');
  if (error) throw new Error('Apiary RPC failed: ' + error.message);
  if (!Array.isArray(data)) throw new Error('get_member_apiaries() did not return an array.');
  return data.map(normalizeApiaryRecord).filter(Boolean);
}

function normalizeApiaryRecord(apiary) {
  if (!apiary || typeof apiary !== 'object') return null;
  const lat = Number(apiary.lat);
  const lng = Number(apiary.lng);
  if (!Number.isFinite(lat) || !Number.isFinite(lng)) {
    console.warn('Skipping apiary with invalid display coordinates:', apiary);
    return null;
  }
  return {
    id: apiary.id,
    name: apiary.name || 'Unnamed apiary',
    owner: apiary.owner || 'Unknown',
    type: normalizeYardTypeForMap(apiary.type),
    county: apiary.county || '',
    hives: toNonNegativeNumber(apiary.hives, 0),
    miteCount: toNullableNumber(apiary.miteCount),
    treated: apiary.treated === true,
    nysInspected: apiary.nysInspected === true,
    miteBiter: apiary.miteBiter === true,
    honeyProduced: toNullableNumber(apiary.honeyProduced),
    lat,
    lng,
    status: apiary.status || 'active',
    notes: apiary.notes || '',
    inspectionDate: apiary.inspectionDate || null,
    treatmentDate: apiary.treatmentDate || null
  };
}

function normalizeYardTypeForMap(value) {
  const normalized = String(value || '').trim().toLowerCase().replaceAll('_', ' ');
  const labels = {
    honey: 'honey yard', 'honey yard': 'honey yard',
    nuc: 'nuc yard', 'nuc yard': 'nuc yard',
    'queen mating': 'queen mating', 'queen mating yard': 'queen mating',
    'drone flood': 'drone flood', 'drone flood yard': 'drone flood',
    resource: 'resource yard', 'resource yard': 'resource yard',
    educational: 'educational yard', 'educational yard': 'educational yard',
    other: 'other'
  };
  return labels[normalized] || normalized || 'other';
}

function toNonNegativeNumber(value, fallback) {
  const number = Number(value);
  return Number.isFinite(number) && number >= 0 ? number : fallback;
}

function toNullableNumber(value) {
  if (value === null || value === undefined || value === '') return null;
  const number = Number(value);
  return Number.isFinite(number) ? number : null;
}

async function loadApiariesFromJsonFallback() {
  const response = await fetch('./apiaries.json', { cache: 'no-store' });
  if (!response.ok) throw new Error('HTTP ' + response.status + ' while loading apiaries.json fallback.');
  const apiaries = await response.json();
  if (!Array.isArray(apiaries)) throw new Error('apiaries.json must contain a JSON array.');
  return apiaries;
}

async function loadApiaries() {
  try {
    const apiaries = await loadApiariesFromSupabase();
    console.info('Loaded ' + apiaries.length + ' apiaries from Supabase.');
    return apiaries;
  } catch (supabaseError) {
    const fallbackEnabled = window.MVBK_CONFIG && window.MVBK_CONFIG.ENABLE_APIARY_JSON_FALLBACK === true;
    if (!fallbackEnabled) throw supabaseError;
    console.warn('Supabase apiary loading failed. Using temporary JSON fallback:', supabaseError);
    return loadApiariesFromJsonFallback();
  }
}

async function loadCountiesFromSupabase() {
  const selectColumns = [COUNTY_ID_COLUMN, COUNTY_NAME_COLUMN, COUNTY_GEOMETRY_COLUMN].join(',');
  const { data, error } = await supabaseClient.from(COUNTY_TABLE).select(selectColumns);
  if (error) throw new Error('County database query failed: ' + error.message);
  if (!Array.isArray(data)) throw new Error('County database query did not return an array.');

  const features = data.map(row => {
    let geometry = row[COUNTY_GEOMETRY_COLUMN];
    if (typeof geometry === 'string') {
      try { geometry = JSON.parse(geometry); }
      catch (error) { console.warn('Skipping county with invalid geometry JSON:', row, error); return null; }
    }
    if (!geometry || !geometry.type || !geometry.coordinates) return null;
    const countyName = row[COUNTY_NAME_COLUMN] || row.NAME || row.name || row.county || row.County || 'County';
    return { type: 'Feature', id: row[COUNTY_ID_COLUMN], properties: { id: row[COUNTY_ID_COLUMN], name: countyName, NAME: countyName }, geometry };
  }).filter(Boolean);

  return { type: 'FeatureCollection', features };
}

async function loadData() {
  try {
    const [apiaries, countiesGeoJson] = await Promise.all([loadApiaries(), loadCountiesFromSupabase()]);
    if (!countiesGeoJson || countiesGeoJson.type !== 'FeatureCollection' || !Array.isArray(countiesGeoJson.features)) {
      throw new Error('County database query must produce a GeoJSON FeatureCollection.');
    }
    loadedApiaries = apiaries;
    bloomAreaData = { type: 'FeatureCollection', features: [] };
    countiesGeoData = countiesGeoJson;
    if (ENABLE_LANDCOVER_FEATURES) {
      loadCustomBloomPolygons();
      loadCustomBloomData();
      refreshCustomBloomEditLayer();
    }
    renderCountyBaseLayer();
    populateOwnerFilter();
    populateCountyFilter();
    refreshView();
  } catch (error) {
    console.error('Failed to load map data:', error);
    showError('Could not load map data from Supabase. Confirm that you are signed in, your member record is active, get_member_apiaries() is installed, and the county table is accessible. Details: ' + error.message);
  }
}
