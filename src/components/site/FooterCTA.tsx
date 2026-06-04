export function FooterCTA() {
  return (
    <section className="relative font-sans">
      <div
        className="relative overflow-hidden px-4 sm:px-6 lg:px-8 pt-32 md:pt-40 lg:pt-44 pb-20 md:pb-24 lg:pb-28 text-center"
        style={{
          background:
            "radial-gradient(ellipse 60% 80% at center, #1a9de8 0%, #0a4a8a 100%)",
        }}
      >
        <svg
          aria-hidden
          viewBox="0 0 1440 120"
          preserveAspectRatio="none"
          className="absolute top-0 left-0 w-full h-[80px] md:h-[120px]"
        >
          <path d="M0,0 L1440,0 L1440,10 C1080,130 360,130 0,10 Z" fill="#ffffff" />
        </svg>
        <h2 className="text-white font-bold tracking-tight text-3xl sm:text-4xl md:text-5xl lg:text-6xl">
          Want more than reviews & testimonials?<br />Book a demo.
        </h2>
        <p className="mt-5 text-white text-base sm:text-lg md:text-xl max-w-2xl mx-auto">
          A free, personalised demo built around your workflow, where your every
          question gets answered.
        </p>
        <a
          href="https://investwellonline.com/contact/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block mt-8 bg-white text-[#0e78b7] font-semibold px-8 py-3 rounded-[6px] hover:bg-white/95 transition-colors"
        >
          Book Your Free Demo
        </a>
        <p className="mt-10 text-white/60 text-sm">
          © 2026 Investwell. All rights reserved.
        </p>
      </div>
    </section>
  );
}
