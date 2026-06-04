import { useState, type ReactNode } from "react";
import type { Testimonial } from "@/lib/testimonials.types";

type Props = {
  testimonial: Testimonial;
};

function getYouTubeId(url: string | null): string | null {
  if (!url) return null;
  try {
    const u = new URL(url);
    const host = u.hostname.replace(/^www\./, "");
    if (host === "youtu.be") {
      const id = u.pathname.slice(1);
      return /^[a-zA-Z0-9_-]{6,}$/.test(id) ? id : null;
    }
    if (host === "youtube.com" || host === "m.youtube.com") {
      if (u.pathname === "/watch") {
        const id = u.searchParams.get("v");
        return id && /^[a-zA-Z0-9_-]{6,}$/.test(id) ? id : null;
      }
      const embedMatch = u.pathname.match(/^\/embed\/([a-zA-Z0-9_-]{6,})/);
      if (embedMatch) return embedMatch[1];
      const shortsMatch = u.pathname.match(/^\/shorts\/([a-zA-Z0-9_-]{6,})/);
      if (shortsMatch) return shortsMatch[1];
    }
    return null;
  } catch {
    return null;
  }
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

export function TestimonialVideoCard({ testimonial }: Props) {
  const {
    name,
    organization,
    city,
    aum,
    showAum,
    pullQuote,
    videoUrl,
    transcript,
    dateSubmitted,
  } = testimonial;

  const [isPlaying, setIsPlaying] = useState(false);

  const videoId = getYouTubeId(videoUrl);
  const hasVideo = videoId !== null;
  const hasName = typeof name === "string" && name.length > 0;
  const hasOrg = typeof organization === "string" && organization.length > 0;
  const hasPullQuote = typeof pullQuote === "string" && pullQuote.length > 0;
  const hasTranscript = typeof transcript === "string" && transcript.length > 0;

  const formattedDate = formatDate(dateSubmitted);
  const aumPart =
    showAum && typeof aum === "number" && aum > 0 ? `AUM ₹${aum} Cr` : null;

  const metaParts: ReactNode[] = [];
  if (aumPart) metaParts.push(<span key="aum">{aumPart}</span>);
  if (city) metaParts.push(<span key="city">{city}</span>);
  if (formattedDate) metaParts.push(<span key="date">{formattedDate}</span>);

  const hasFooter = hasName || hasOrg || metaParts.length > 0;
  const videoTitle = `Video testimonial${hasName ? ` from ${name}` : ""}`;

  return (
    <article className="bg-white rounded-[12px] border-[0.5px] border-[#E5E7EB] p-6 md:p-7 font-sans transition-[transform,border-color] duration-200 ease-out hover:border-[#0e78b7] hover:-translate-y-1 will-change-transform">
      {hasVideo && (
        <div className="relative w-full aspect-[9/16] rounded-[8px] overflow-hidden bg-neutral-100">
          {isPlaying ? (
            <iframe
              src={`https://www.youtube.com/embed/${videoId}?autoplay=1&controls=0`}
              title={videoTitle}
              allow="autoplay; encrypted-media; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            />
          ) : (
            <button
              type="button"
              onClick={() => setIsPlaying(true)}
              aria-label="Play video"
              className="group absolute inset-0 w-full h-full cursor-pointer"
            >
              <img
                src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
                alt={`Watch video testimonial${hasName ? ` from ${name}` : ""}`}
                loading="lazy"
                className="w-full h-full object-cover"
              />
              <span className="absolute inset-0 flex items-center justify-center">
                <span className="w-16 h-16 rounded-full bg-white flex items-center justify-center transition-transform duration-200 group-hover:scale-110">
                  <svg
                    viewBox="0 0 24 24"
                    className="w-6 h-6 ml-1"
                    fill="#0e78b7"
                    aria-hidden="true"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </span>
              </span>
            </button>
          )}
        </div>
      )}

      {hasPullQuote && (
        <blockquote className="mt-5 border-l-2 border-[#0e78b7] pl-4 text-[15px] font-medium text-neutral-900 leading-relaxed">
          {pullQuote}
        </blockquote>
      )}

      {hasFooter && (
        <footer className="mt-6 pt-4 border-t-[0.5px] border-[#E5E7EB]">
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
          {metaParts.length > 0 && (
            <div className="mt-2 flex flex-wrap items-center gap-x-2 text-xs text-neutral-500">
              {metaParts.map((part, i) => (
                <span key={i} className="flex items-center gap-x-2">
                  {i > 0 && (
                    <span aria-hidden="true" className="text-neutral-400">
                      •
                    </span>
                  )}
                  {part}
                </span>
              ))}
            </div>
          )}
          {hasTranscript && (
            <details className="group mt-3">
              <summary className="flex items-center justify-between gap-2 cursor-pointer list-none text-xs font-medium text-neutral-600 hover:text-[#0e78b7] transition-colors [&::-webkit-details-marker]:hidden">
                <span>Read full transcript</span>
                <svg
                  viewBox="0 0 20 20"
                  className="w-3.5 h-3.5 flex-shrink-0 transition-transform duration-200 group-open:rotate-180"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  aria-hidden="true"
                >
                  <path d="M5 8l5 5 5-5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </summary>
              <p className="mt-2 text-xs leading-relaxed text-neutral-700 whitespace-pre-line">
                {transcript}
              </p>
            </details>
          )}
        </footer>
      )}
    </article>
  );
}

export default TestimonialVideoCard;
