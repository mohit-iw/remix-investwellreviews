import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/site/Navbar";
import { Hero } from "@/components/site/Hero";
import { TransitionSection } from "@/components/site/TransitionSection";
import { TestimonialsGrid } from "@/components/site/TestimonialsGrid";
import { FooterCTA } from "@/components/site/FooterCTA";
import { getTestimonials } from "@/lib/testimonials.functions";
import type { Testimonial } from "@/lib/testimonials.types";

function compact<T extends Record<string, unknown>>(obj: T): Record<string, unknown> {
  const out: Record<string, unknown> = {};
  for (const [k, v] of Object.entries(obj)) {
    if (v === null || v === undefined) continue;
    if (typeof v === "string" && v.trim() === "") continue;
    out[k] = v;
  }
  return out;
}

function getYouTubeId(url: string | null): string | null {
  if (!url) return null;
  const patterns = [
    /youtu\.be\/([a-zA-Z0-9_-]{11})/,
    /youtube\.com\/watch\?v=([a-zA-Z0-9_-]{11})/,
    /youtube\.com\/embed\/([a-zA-Z0-9_-]{11})/,
  ];
  for (const p of patterns) {
    const m = url.match(p);
    if (m) return m[1];
  }
  return null;
}

function toIso8601Duration(input: string | null): string | null {
  if (!input) return null;
  const s = input.trim();
  if (!s) return null;
  if (/^PT(?:\d+H)?(?:\d+M)?(?:\d+S)?$/.test(s) && s !== "PT") return s;
  const colon = s.match(/^(\d+):(\d{1,2})(?::(\d{1,2}))?$/);
  if (colon) {
    const a = parseInt(colon[1], 10);
    const b = parseInt(colon[2], 10);
    const c = colon[3] ? parseInt(colon[3], 10) : null;
    const h = c !== null ? a : 0;
    const m = c !== null ? b : a;
    const sec = c !== null ? c : b;
    let out = "PT";
    if (h) out += `${h}H`;
    if (m) out += `${m}M`;
    if (sec) out += `${sec}S`;
    return out === "PT" ? null : out;
  }
  if (/^\d+$/.test(s)) {
    const total = parseInt(s, 10);
    if (total <= 0) return null;
    const h = Math.floor(total / 3600);
    const m = Math.floor((total % 3600) / 60);
    const sec = total % 60;
    let out = "PT";
    if (h) out += `${h}H`;
    if (m) out += `${m}M`;
    if (sec) out += `${sec}S`;
    return out;
  }
  return null;
}

function buildItem(t: Testimonial): Record<string, unknown> | null {
  if (t.reviewType === "Video") {
    const ytId = getYouTubeId(t.videoUrl);
    const duration = toIso8601Duration(t.videoDuration);
    const item = compact({
      "@type": "VideoObject",
      name: t.pullQuote ?? undefined,
      description: t.pullQuote ?? undefined,
      transcript: t.transcript ?? undefined,
      duration: duration ?? undefined,
      thumbnailUrl: ytId ? `https://img.youtube.com/vi/${ytId}/hqdefault.jpg` : undefined,
      uploadDate: t.dateSubmitted ?? undefined,
      contentUrl: t.videoUrl ?? undefined,
      embedUrl: ytId ? `https://www.youtube.com/embed/${ytId}` : undefined,
    });
    return Object.keys(item).length > 1 ? item : null;
  }

  const item = compact({
    "@type": "Review",
    reviewBody: t.reviewText ?? undefined,
    reviewRating:
      typeof t.rating === "number"
        ? { "@type": "Rating", ratingValue: t.rating, bestRating: 5 }
        : undefined,
    author: t.name ? {
      "@type": "Person",
      name: t.name,
      worksFor: t.organization ? {
        "@type": "Organization",
        name: t.organization,
        address: t.city ? {
          "@type": "PostalAddress",
          addressLocality: t.city,
          addressCountry: "IN",
        } : undefined,
      } : undefined,
    } : undefined,
    datePublished: t.dateSubmitted ?? undefined,
    itemReviewed: { "@type": "SoftwareApplication", name: "Investwell Mint" },
  });
  return Object.keys(item).length > 1 ? item : null;
}

export const Route = createFileRoute("/")({
  component: Index,
  loader: () => getTestimonials(),
  head: ({ loaderData }) => {
    const records = loaderData?.records ?? [];
    const items = records
      .map((t, i) => {
        const item = buildItem(t);
        if (!item) return null;
        return { "@type": "ListItem", position: i + 1, item };
      })
      .filter(Boolean);

    const itemList = {
      "@context": "https://schema.org",
      "@type": "ItemList",
      itemListElement: items,
    };

    const TITLE = "Investwell Reviews — Trusted by MFDs & IFAs across India";
    const DESC =
      "Read honest Investwell reviews from 5,000+ MFDs and IFAs across India. 4.8/5 rating, 26 years in the market. See real testimonials, then book a free demo.";
    const URL = "https://investwellreviews.com/";
    const OG_IMAGE = "https://investwellonline.com/wp-content/uploads/2026/05/OG-Image-investwellreviewsdotcom.png";

    return {
      meta: [
        { title: TITLE },
        { name: "description", content: DESC },
        { property: "og:title", content: TITLE },
        { property: "og:description", content: DESC },
        { property: "og:type", content: "website" },
        { property: "og:url", content: URL },
        { property: "og:image", content: OG_IMAGE },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: TITLE },
        { name: "twitter:description", content: DESC },
        { name: "twitter:image", content: OG_IMAGE },
      ],
      links: [{ rel: "canonical", href: URL }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            name: "Investwell Mint",
            url: "https://investwellonline.com/investwell-mint/",
            applicationCategory: "FinanceApplication",
            operatingSystem: "Web, Android, iOS",
            description: "Mutual fund software for MFDs, IFAs, and RIAs in India. Covers portfolio review, online transactions, CRM, business analytics, and brokerage management.",
            provider: {
              "@type": "Organization",
              name: "Investwell",
              url: "https://investwellonline.com",
            },
            aggregateRating: {
              "@type": "AggregateRating",
              ratingValue: "4.8",
              reviewCount: String(records.length),
              bestRating: "5",
              worstRating: "1",
            },
          }),
        },
        {
          type: "application/ld+json",
          children: JSON.stringify(itemList),
        },
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: URL },
              { "@type": "ListItem", position: 2, name: "Reviews", item: URL },
            ],
          }),
        },
      ],
    };
  },
});

function Index() {
  const { records } = Route.useLoaderData();
  return (
    <div className="min-h-screen bg-background font-sans">
      <Navbar />
      <main>
        <Hero />
        <TransitionSection />
        <TestimonialsGrid testimonials={records} />
        <FooterCTA />
      </main>
    </div>
  );
}
