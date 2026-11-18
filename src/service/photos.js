// Keyless place photos: resolve the name through Wikipedia's search, then
// take the article's main image. Returns null when nothing fits so the
// caller can fall back to a placeholder.
const cache = new Map();

async function resolveTitle(query) {
  // Comma-heavy queries ("Hampi, Karnataka, India") match nothing, so walk
  // from the full string down to the first segment until something hits.
  const parts = query.split(",").map((s) => s.trim()).filter(Boolean);
  const candidates = [];
  for (let i = parts.length; i >= 1; i--) candidates.push(parts.slice(0, i).join(", "));
  for (const candidate of candidates) {
    try {
      const resp = await fetch(
        `https://en.wikipedia.org/w/api.php?action=opensearch&format=json&origin=*&limit=1&search=${encodeURIComponent(candidate)}`
      );
      if (!resp.ok) continue;
      const data = await resp.json();
      const title = data?.[1]?.[0];
      if (title) return title;
    } catch {
      /* try the next candidate */
    }
  }
  return null;
}

export async function fetchPlacePhoto(query) {
  if (!query) return null;
  const cacheKey = query.toLowerCase();
  if (cache.has(cacheKey)) return cache.get(cacheKey);

  let url = null;
  try {
    const title = await resolveTitle(query);
    if (title) {
      const resp = await fetch(
        `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(title.replace(/ /g, "_"))}`
      );
      if (resp.ok) {
        const data = await resp.json();
        url = data?.originalimage?.source || data?.thumbnail?.source || null;
      }
    }
  } catch {
    url = null;
  }
  cache.set(cacheKey, url);
  return url;
}
