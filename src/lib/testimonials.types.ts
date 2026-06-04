// Shared Testimonial types. Safe to import from both server and client code.

export type Testimonial = {
  id: string;
  name: string;
  organization: string | null;
  city: string | null;
  aum: number | null;
  rating: number | null;
  reviewType: "Text" | "Video" | null;
  featured: boolean;
  displayOrder: number;
  showAum: boolean;
  pullQuote: string | null;
  reviewText: string | null;
  videoUrl: string | null;
  videoDuration: string | null;
  transcript: string | null;
  clientPhotoUrl: string | null;
  orgLogoUrl: string | null;
  dateSubmitted: string | null;
};

export type TestimonialsResponse = {
  records: Testimonial[];
  cachedAt: string;
  error: string | null;
};
