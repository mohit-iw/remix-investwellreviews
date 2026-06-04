// Server-only helpers for Airtable testimonials fetch. Kept separate from
// .functions.ts to avoid tss-serverfn-split sibling-reference issues.

import type { Testimonial, TestimonialsResponse } from "./testimonials.types";

type AirtableRecord = {
  id: string;
  fields: Record<string, unknown>;
};

const CACHE_TTL_MS = 60 * 60 * 1000; // 60 minutes

let cache: { data: TestimonialsResponse; expiresAt: number } | null = null;

function mapRecord(rec: AirtableRecord): Testimonial {
  const f = rec.fields;
  const str = (k: string) => (typeof f[k] === "string" ? (f[k] as string) : null);
  const num = (k: string) => (typeof f[k] === "number" ? (f[k] as number) : null);
  const bool = (k: string) => f[k] === true;
  const reviewTypeRaw = str("Review Type");
  const reviewType =
    reviewTypeRaw === "Text" || reviewTypeRaw === "Video" ? reviewTypeRaw : null;

  return {
    id: rec.id,
    name: str("Name") ?? "",
    organization: str("Organization"),
    city: str("City"),
    aum: num("AUM"),
    rating: num("Rating"),
    reviewType,
    featured: bool("Featured"),
    displayOrder: num("Display Order") ?? 0,
    showAum: bool("Show AUM"),
    pullQuote: str("Pull Quote"),
    reviewText: str("Review Text"),
    videoUrl: str("Video URL"),
    videoDuration: str("Video Duration"),
    transcript: str("Transcript"),
    clientPhotoUrl: str("Client Photo URL"),
    orgLogoUrl: str("Org Logo URL"),
    dateSubmitted: str("Date Submitted"),
  };
}

async function fetchAllFromAirtable(
  baseId: string,
  tableId: string,
  pat: string,
): Promise<AirtableRecord[]> {
  const records: AirtableRecord[] = [];
  let offset: string | undefined = undefined;

  do {
    const params = new URLSearchParams();
    params.append("pageSize", "100");
    params.append("sort[0][field]", "Featured");
    params.append("sort[0][direction]", "desc");
    params.append("sort[1][field]", "Display Order");
    params.append("sort[1][direction]", "asc");
    if (offset) params.append("offset", offset);

    const url = `https://api.airtable.com/v0/${baseId}/${encodeURIComponent(tableId)}?${params.toString()}`;
    const res = await fetch(url, {
      headers: { Authorization: `Bearer ${pat}` },
    });

    if (!res.ok) {
      const body = await res.text();
      throw new Error(`Airtable error ${res.status}: ${body.slice(0, 300)}`);
    }

    const json = (await res.json()) as {
      records: AirtableRecord[];
      offset?: string;
    };
    records.push(...json.records);
    offset = json.offset;
  } while (offset);

  return records;
}

export async function loadTestimonials(): Promise<TestimonialsResponse> {
  if (cache && Date.now() < cache.expiresAt) {
    return cache.data;
  }

  const pat = process.env.AIRTABLE_PAT;
  const baseId = process.env.AIRTABLE_BASE_ID;
  const tableId = process.env.AIRTABLE_TABLE_ID;

  if (!pat || !baseId || !tableId) {
    const missing = [
      ...(!pat ? ["AIRTABLE_PAT"] : []),
      ...(!baseId ? ["AIRTABLE_BASE_ID"] : []),
      ...(!tableId ? ["AIRTABLE_TABLE_ID"] : []),
    ].join(", ");
    return {
      records: [],
      cachedAt: new Date().toISOString(),
      error: `Missing required secret(s): ${missing}`,
    };
  }

  try {
    const raw = await fetchAllFromAirtable(baseId, tableId, pat);
    const records = raw
      .map(mapRecord)
      .sort((a, b) => {
        if (a.featured !== b.featured) return a.featured ? -1 : 1;
        return a.displayOrder - b.displayOrder;
      });

    const data: TestimonialsResponse = {
      records,
      cachedAt: new Date().toISOString(),
      error: null,
    };
    cache = { data, expiresAt: Date.now() + CACHE_TTL_MS };
    return data;
  } catch (err) {
    console.error("[testimonials] Airtable fetch failed:", err);
    return {
      records: [],
      cachedAt: new Date().toISOString(),
      error: err instanceof Error ? err.message : "Unknown error",
    };
  }
}
