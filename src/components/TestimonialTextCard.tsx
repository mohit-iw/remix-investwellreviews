import type { ReactNode } from "react";
import type { Testimonial } from "@/lib/testimonials.types";

type Props = {
  testimonial: Testimonial;
};

function Star() {
  return (
    <svg
      viewBox="0 0 20 20"
      className="w-4 h-4"
      fill="#F5A623"
      aria-hidden="true"
    >
      <path d="M10 1.5l2.6 5.27 5.82.85-4.21 4.1.99 5.78L10 14.77l-5.2 2.73.99-5.78L1.58 7.62l5.82-.85L10 1.5z" />
    </svg>
  );
}

function formatDate(iso: string | null): string | null {
  if (!iso) return null;
  try {
    const d = new Date(iso);
    if (Number.isNaN(d.getTime())) return null;
    return new Intl.DateTimeFormat("en-IN", {
      month: "short",
      year: "numeric",
    }).format(d);
  } catch {
    return null;
  }
}

function parseReviewText(text: string | null): ReactNode[] | null {
  if (!text || text.length === 0) return null;
  const parts = text.split("==");
  const nodes: ReactNode[] = [];
  for (let i = 0; i < parts.length; i++) {
    if (parts[i].length === 0) continue;
    const isLast = i === parts.length - 1;
    const isOdd = i % 2 === 1;
    const isHighlight = isOdd && !isLast;
    if (isHighlight) {
      nodes.push(
        <mark key={i} className="bg-[#dbeafe] rounded-sm px-0.5 font-medium">
          {parts[i]}
        </mark>
      );
    } else {
      nodes.push(parts[i]);
    }
  }
  return nodes;
}

export function TestimonialTextCard({ testimonial }: Props) {
  const {
    name,
    organization,
    city,
    aum,
    rating,
    featured: _featured,
    showAum,
    reviewText,
    clientPhotoUrl,
    dateSubmitted,
  } = testimonial;

  const showStars =
    typeof rating === "number" && rating >= 1 && rating <= 5;
  const starCount = showStars ? Math.round(rating as number) : 0;

  const formattedDate = formatDate(dateSubmitted);
  const aumPart =
    showAum && typeof aum === "number" && aum > 0 ? `AUM ₹${aum} Cr` : null;

  const footerParts: ReactNode[] = [];
  if (city) footerParts.push(<span key="city">{city}</span>);
  if (aumPart) footerParts.push(<span key="aum">{aumPart}</span>);
  if (formattedDate) footerParts.push(<span key="date">{formattedDate}</span>);

  const hasPhoto = typeof clientPhotoUrl === "string" && clientPhotoUrl.length > 0;
  const hasName = typeof name === "string" && name.length > 0;
  const hasOrg = typeof organization === "string" && organization.length > 0;
  const hasHeader = hasPhoto || hasName || hasOrg;
  const hasReview = typeof reviewText === "string" && reviewText.length > 0;
  const hasFooter = footerParts.length > 0;

  return (
    <article
      className="bg-white rounded-[12px] border-[0.5px] border-[#E5E7EB] p-6 md:p-7 font-sans transition-[transform,border-color] duration-200 ease-out hover:border-[#0e78b7] hover:-translate-y-1 will-change-transform"
    >
      {hasHeader && (
        <header className="flex items-center gap-4">
          {hasPhoto && (
            <img
              src={clientPhotoUrl as string}
              alt={hasName ? `${name}${hasOrg ? `, ${organization}` : ""} — Investwell review` : "Investwell MFD reviewer photo"}
              loading="lazy"
              className="w-12 h-12 rounded-full object-cover flex-shrink-0"
            />
          )}
          {(hasName || hasOrg) && (
            <div className="min-w-0">
              {hasName && (
                <div className="text-[15px] font-medium text-neutral-900 leading-tight">
                  {name}
                </div>
              )}
              {hasOrg && (
                <div className="text-sm text-neutral-500 leading-snug mt-0.5">
                  {organization}
                </div>
              )}
            </div>
          )}
        </header>
      )}

      {showStars && (
        <div
          className="mt-4 flex gap-1"
          role="img"
          aria-label={`${starCount} out of 5 stars`}
        >
          {Array.from({ length: starCount }).map((_, i) => (
            <Star key={i} />
          ))}
        </div>
      )}

      {hasReview && (
        <p className="mt-4 text-[15px] leading-relaxed text-neutral-800 whitespace-pre-line">
          {parseReviewText(reviewText)}
        </p>
      )}

      {hasFooter && (
        <footer className="mt-6 pt-4 border-t-[0.5px] border-[#E5E7EB] flex flex-wrap items-center gap-x-2 text-xs text-neutral-500">
          {footerParts.map((part, i) => (
            <span key={i} className="flex items-center gap-x-2">
              {i > 0 && (
                <span aria-hidden="true" className="text-neutral-400">
                  •
                </span>
              )}
              {part}
            </span>
          ))}
        </footer>
      )}
    </article>
  );
}

export default TestimonialTextCard;
