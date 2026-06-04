import type { Testimonial } from "@/lib/testimonials.types";
import { TestimonialTextCard } from "@/components/TestimonialTextCard";
import { TestimonialVideoCard } from "@/components/TestimonialVideoCard";

type Props = { testimonials: Testimonial[] };

export function TestimonialsGrid({ testimonials }: Props) {
  if (!testimonials || testimonials.length === 0) return null;

  return (
    <section className="bg-white pt-0 pb-16 md:pb-20 lg:pb-24 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6">
          {testimonials.map((t) => (
            <div key={t.id} className="break-inside-avoid mb-6">
              {t.reviewType === "Video" ? (
                <TestimonialVideoCard testimonial={t} />
              ) : (
                <TestimonialTextCard testimonial={t} />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
