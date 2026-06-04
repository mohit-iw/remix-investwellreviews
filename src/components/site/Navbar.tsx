import investwellLogo from "@/assets/investwell-logo-blue.svg";

export function Navbar() {
  return (
    <header className="fixed top-4 left-0 right-0 z-50 px-5">
      <div className="max-w-[1200px] mx-auto">
        <nav className="glass-card rounded-full px-4 md:px-6 py-3 shadow-[0px_8px_13px_rgba(0,0,0,0.1)]">
          <div className="flex items-center justify-between">
            <a href="/">
              <img
                src={investwellLogo}
                alt="Investwell mutual fund software logo"
                className="h-6 md:h-7 w-auto"
                width={121}
                height={28}
              />
            </a>
            <a
              href="https://investwellonline.com"
              className="inline-flex items-center justify-center rounded-full px-3 md:px-6 py-2 text-xs md:text-sm font-semibold text-white transition-opacity hover:opacity-90"
              style={{ backgroundColor: "#0e78b7" }}
            >
              Book a Demo
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}
