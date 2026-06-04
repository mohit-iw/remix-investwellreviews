import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";

import appCss from "../styles.css?url";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { name: "robots", content: "index, follow" },
      { title: "Investwell Reviews — MFD & IFA Reviews from India" },
      {
        name: "description",
        content:
          "Honest Investwell reviews from 5,000+ mutual fund distributors and IFAs across India. 4.8/5 rating, 26 years in the market.",
      },
      { name: "author", content: "Investwell" },
      { property: "og:site_name", content: "Investwell Reviews" },
      { property: "og:title", content: "Investwell Reviews — MFD & IFA Reviews from India" },
      {
        property: "og:description",
        content:
          "Honest Investwell reviews from 5,000+ mutual fund distributors and IFAs across India.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://investwellreviews.com/" },
      { property: "og:image", content: "https://investwellonline.com/wp-content/uploads/2026/05/OG-Image-investwellreviewsdotcom.png" },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      {
        property: "og:image:alt",
        content:
          "Investwell Reviews — 5,000 MFDs have spoken. 4.8/5 rating from advisors across India.",
      },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Investwell Reviews — MFD & IFA Reviews from India" },
      {
        name: "twitter:description",
        content: "Honest Investwell reviews from 5,000+ MFDs and IFAs across India.",
      },
      { name: "twitter:image", content: "https://investwellonline.com/wp-content/uploads/2026/05/OG-Image-investwellreviewsdotcom.png" },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap",
      },
      {
        rel: "stylesheet",
        href: appCss,
      },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "Investwell",
          url: "https://investwellonline.com",
          logo: "https://investwellonline.com/wp-content/uploads/2025/07/IW-logo-3-Blue-3-1.png",
          sameAs: [
            "https://investwellonline.com",
            "https://www.linkedin.com/company/excel-net-solutions-pvt-ltd-",
            "https://www.youtube.com/user/Investwellsoftware",
            "https://www.facebook.com/investwellsoftware/",
            "https://www.instagram.com/investwellsoftware/",
          ],
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: "Investwell Reviews",
          url: "https://investwellreviews.com/",
          inLanguage: "en-IN",
          publisher: { "@type": "Organization", name: "Investwell" },
        }),
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IN">
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':\nnew Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],\nj=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=\n'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);\n})(window,document,'script','dataLayer','GTM-59WW42WR');`,
          }}
        />
        <HeadContent />
      </head>
      <body>
        <noscript
          dangerouslySetInnerHTML={{
            __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-59WW42WR"
height="0" width="0" style="display:none;visibility:hidden"></iframe>`,
          }}
        />
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <Outlet />
    </QueryClientProvider>
  );
}
