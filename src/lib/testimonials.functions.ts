import { createServerFn } from "@tanstack/react-start";
import { loadTestimonials } from "./testimonials.server";

export const getTestimonials = createServerFn({ method: "GET" }).handler(
  async () => {
    return loadTestimonials();
  },
);
