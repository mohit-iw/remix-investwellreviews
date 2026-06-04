type LogoEntry = {
  name: string;
  size: number;
  src: string;
};

const logos: LogoEntry[] = [
  { name: "symphonia",        size: 120, src: "https://docs.investwellonline.com/cloud_investwell_images/logo/Large/symphonia_Logo.png?v=1779874359000" },
  { name: "naikwealth",       size: 113, src: "https://docs.investwellonline.com/cloud_investwell_images/logo/Large/naikwealth_Logo.png?v=1779874359000" },
  { name: "capitalleaguellp", size: 103, src: "https://docs.investwellonline.com/cloud_investwell_images/logo/Large/capitalleaguellp_Logo.png?v=1779874359000" },
  { name: "siftcapital",      size: 103, src: "https://docs.investwellonline.com/cloud_investwell_images/logo/Large/siftcapital_Logo.png?v=1779874359000" },
  { name: "wiseturtle",       size: 99,  src: "https://docs.investwellonline.com/cloud_investwell_images/logo/Large/wiseturtle_Logo.png?v=1779874359000" },
  { name: "sapientfinserv",   size: 98,  src: "https://docs.investwellonline.com/cloud_investwell_images/logo/Large/sapientfinserv_Logo.png?v=1779874359000" },
  { name: "madhuvan",         size: 96,  src: "https://docs.investwellonline.com/cloud_investwell_images/logo/Large/madhuvan_Logo.png?v=1779874359000" },
  { name: "trufid",           size: 96,  src: "https://docs.investwellonline.com/cloud_investwell_images/logo/Large/trufid_Logo.png?v=1779874359000" },
  { name: "pranityawealth",   size: 98,  src: "https://docs.investwellonline.com/cloud_investwell_images/logo/Large/pranityawealth_Logo.png?v=1779874359000" },
  { name: "bajajcapital",     size: 89,  src: "https://docs.investwellonline.com/cloud_investwell_images/logo/Large/bajajcapital_Logo.png?v=1779874359000" },
  { name: "abacusinvestment", size: 86,  src: "https://docs.investwellonline.com/cloud_investwell_images/logo/Large/abacusinvestment_Logo.png?v=1779874359000" },
  { name: "alphacapital",     size: 84,  src: "https://docs.investwellonline.com/cloud_investwell_images/logo/Large/alphacapital_Logo.png?v=1779874359000" },
  { name: "arihantcapital",   size: 84,  src: "https://docs.investwellonline.com/cloud_investwell_images/logo/Large/arihantcapital_Logo.png?v=1779874359000" },
  { name: "eticawealth",      size: 84,  src: "https://docs.investwellonline.com/cloud_investwell_images/logo/Large/eticawealth_Logo.png?v=1779874359000" },
  { name: "brainpointinv",    size: 84,  src: "https://docs.investwellonline.com/cloud_investwell_images/logo/Large/brainpointinv_Logo.png?v=1779874359000" },
  { name: "blueedge",         size: 84,  src: "https://docs.investwellonline.com/cloud_investwell_images/logo/Large/blueedge_Logo.png?v=1779874359000" },
];

type Position = {
  top: string;
  left: string;
  duration: number;
  delay: number;
};

// 16 desktop positions — existing 13 arc positions preserved, plus 3 added
// at the outer edges (clear of the centered max-w-3xl text safe zone).
const desktopPositions: Position[] = [
  { top: "30%", left: "2%",  duration: 7.2, delay: 0   }, // symphonia
  { top: "52%", left: "12%", duration: 6.5, delay: 1.2 }, // naikwealth
  { top: "38%", left: "14%", duration: 8.0, delay: 0.6 }, // capitalleaguellp
  { top: "28%", left: "88%", duration: 6.8, delay: 1.8 }, // siftcapital
  { top: "52%", left: "92%", duration: 7.6, delay: 0.4 }, // wiseturtle
  { top: "66%", left: "4%",  duration: 6.4, delay: 2.1 }, // sapientfinserv
  { top: "74%", left: "16%", duration: 7.0, delay: 0.9 }, // madhuvan
  { top: "70%", left: "26%", duration: 7.8, delay: 1.5 }, // trufid
  { top: "78%", left: "40%", duration: 6.6, delay: 2.4 }, // pranityawealth
  { top: "76%", left: "52%", duration: 8.1, delay: 0.3 }, // bajajcapital
  { top: "74%", left: "64%", duration: 6.9, delay: 1.7 }, // abacusinvestment
  { top: "70%", left: "74%", duration: 7.4, delay: 2.6 }, // alphacapital
  { top: "66%", left: "86%", duration: 6.2, delay: 1.0 }, // arihantcapital
  { top: "20%", left: "4%",  duration: 7.1, delay: 1.4 }, // eticawealth (added)
  { top: "22%", left: "94%", duration: 6.7, delay: 2.0 }, // brainpointinv (added)
  { top: "16%", left: "14%", duration: 7.9, delay: 0.8 }, // blueedge (added)
];

// 16 tablet positions — on tablet the centered text spans nearly the full
// viewport width, so all circles sit BELOW the trust stats in a two-row arc
// to keep the text safe zone completely clear.
const tabletPositions: Position[] = [
  { top: "66%", left: "2%",  duration: 7.2, delay: 0   },
  { top: "78%", left: "8%",  duration: 6.5, delay: 1.2 },
  { top: "68%", left: "18%", duration: 8.0, delay: 0.6 },
  { top: "80%", left: "28%", duration: 6.8, delay: 1.8 },
  { top: "70%", left: "36%", duration: 7.6, delay: 0.4 },
  { top: "82%", left: "46%", duration: 6.4, delay: 2.1 },
  { top: "68%", left: "54%", duration: 7.0, delay: 0.9 },
  { top: "80%", left: "62%", duration: 7.8, delay: 1.5 },
  { top: "70%", left: "70%", duration: 6.6, delay: 2.4 },
  { top: "82%", left: "78%", duration: 8.1, delay: 0.3 },
  { top: "68%", left: "86%", duration: 6.9, delay: 1.7 },
  { top: "78%", left: "94%", duration: 7.4, delay: 2.6 },
  { top: "62%", left: "12%", duration: 6.2, delay: 1.0 },
  { top: "62%", left: "42%", duration: 7.1, delay: 1.4 },
  { top: "62%", left: "72%", duration: 6.7, delay: 2.0 },
  { top: "88%", left: "38%", duration: 7.9, delay: 0.8 },
];

export function Hero() {
  return (
    <section
      className="relative overflow-hidden pt-16 md:pt-20"
      style={{
        background:
          "linear-gradient(180deg, #ffffff 0%, #ffffff 55%, #eef0f8 75%, #dfe4f5 100%)",
      }}
    >


      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 md:min-h-[560px] lg:min-h-[560px]">
        {/* Tablet circle layer (768px – 1023px), scaled to 80% */}
        <div className="hidden md:block lg:hidden absolute inset-0 pointer-events-none">
          {tabletPositions.map((pos, i) => (
            <LogoCircle
              key={i}
              logo={logos[i]}
              position={pos}
              scale={0.8}
            />
          ))}
        </div>
        {/* Desktop circle layer (>=1024px) */}
        <div className="hidden lg:block absolute inset-0 pointer-events-none">
          {desktopPositions.map((pos, i) => (
            <LogoCircle
              key={i}
              logo={logos[i]}
              position={pos}
              scale={1}
            />
          ))}
        </div>

        {/* Centered text */}
        <div className="relative z-10 mx-auto max-w-3xl pt-10 sm:pt-14 md:pt-14 lg:pt-16 pb-10 md:pb-12 lg:pb-16 text-center">
          <h1
            className="text-4xl sm:text-5xl md:text-5xl lg:text-6xl tracking-tight text-foreground leading-[1.05]"
            style={{ fontWeight: 500 }}
          >
            India's <span style={{ fontWeight: 700, color: '#0e78b7' }}>MFDs</span> have spoken.
          </h1>
          <p className="mx-auto mt-5 sm:mt-6 max-w-2xl text-base md:text-base lg:text-lg text-muted-foreground leading-relaxed">
            From solo advisors in Siliguri to national distributors in Mumbai -
            MFDs across India have given their Investwell Mint reviews and
            testimonials. The verdict is unanimous.
          </p>

          <div className="mt-8 sm:mt-10 flex flex-wrap items-center justify-center gap-x-8 sm:gap-x-10 lg:gap-x-12 gap-y-6">
            <Stat number="5,000+" label="MFDs & IFAs" />
            <Divider />
            <Stat number="4.8 / 5" label="Rating" />
            <Divider />
            <Stat number="26 Years" label="In the Market" />
          </div>
        </div>
      </div>

      {/* Mobile horizontal auto-scrolling logo marquee */}
      <div className="md:hidden hero-scroll-hide overflow-hidden pb-10 pt-2">
        <div className="flex items-center gap-4 px-4 w-max hero-marquee">
          {[...logos, ...logos].map((logo, i) => (
            <div
              key={i}
              data-logo={logo.name}
              aria-hidden
              className="shrink-0 rounded-full bg-white shadow-md flex items-center justify-center"
              style={{
                ["--circle-size" as never]: "72px",
                width: "var(--circle-size)",
                height: "var(--circle-size)",
                aspectRatio: "1 / 1",
                borderRadius: "50%",
                opacity: 0.85,
              }}
            >
              <div style={{ width: "100%", height: "100%", padding: "16%" }}>
                <img
                  src={logo.src}
                  alt={`${logo.name} — Investwell mutual fund distributor`}
                  loading="lazy"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                    objectPosition: "center",
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Curved bottom edge — stretches with viewport, more pronounced on mobile */}
      <svg
        aria-hidden
        className="block w-full h-[40px] sm:h-[60px] md:h-[80px]"
        viewBox="0 0 1440 80"
        preserveAspectRatio="none"
      >
        <path
          d="M0,80 L0,40 Q720,120 1440,40 L1440,80 Z"
          fill="#ffffff"
        />
      </svg>
    </section>
  );
}

function Stat({ number, label }: { number: string; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <span className="text-2xl sm:text-3xl font-bold text-foreground">
        {number}
      </span>
      <span className="mt-1 text-xs sm:text-sm text-muted-foreground uppercase tracking-wide">
        {label}
      </span>
    </div>
  );
}

function Divider() {
  return <span aria-hidden className="hidden sm:block h-10 w-px bg-hairline" />;
}

function LogoCircle({
  logo,
  position,
  scale,
}: {
  logo: LogoEntry;
  position: Position;
  scale: number;
}) {
  const size = Math.round(logo.size * scale);
  return (
    <div
      data-logo={logo.name}
      aria-hidden
      className="hero-float absolute rounded-full bg-white shadow-md flex items-center justify-center"
      style={{
        ["--circle-size" as never]: `${size}px`,
        width: "var(--circle-size)",
        height: "var(--circle-size)",
        aspectRatio: "1 / 1",
        borderRadius: "50%",
        opacity: 0.85,
        top: position.top,
        left: position.left,
        animation: `hero-float ${position.duration}s ease-in-out ${position.delay}s infinite`,
      }}
    >
              <div style={{ width: "100%", height: "100%", padding: "16%" }}>
                <img
                  src={logo.src}
                  alt={`${logo.name} — Investwell mutual fund distributor`}
                  loading="lazy"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                    objectPosition: "center",
                  }}
                />
      </div>
    </div>
  );
}
