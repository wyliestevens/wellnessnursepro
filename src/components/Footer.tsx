import Link from "next/link";

const quickLinks = [
  { href: "/", label: "Home" },
  { href: "/eight-laws-of-health", label: "Eight Laws of Health" },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About" },
];

export default function Footer() {
  return (
    <footer className="bg-[var(--primary-green)] text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-2 text-white no-underline">
              <span className="text-2xl" role="img" aria-label="leaf">
                🌿
              </span>
              <span className="text-xl font-bold font-[family-name:var(--font-lora)]">
                WellnessNursePro
              </span>
            </Link>
            <p className="mt-3 text-white/80 text-sm leading-relaxed">
              Empowering you with evidence-based wellness guidance rooted in the
              NEWSTART lifestyle principles. Your journey to vibrant health
              starts here.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold font-[family-name:var(--font-lora)] text-white mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/80 hover:text-[var(--accent-gold)] transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social / Connect */}
          <div>
            <h3 className="text-lg font-bold font-[family-name:var(--font-lora)] text-white mb-4">
              Connect
            </h3>
            <p className="text-white/80 text-sm leading-relaxed">
              Follow along for daily wellness tips, healthy recipes, and
              inspiration for living your healthiest life.
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-6 border-t border-white/20 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-white/60 text-sm">
            &copy; 2026 Wellness Nurse Pro. All rights reserved.
          </p>
          <p className="text-white/60 text-sm italic font-[family-name:var(--font-lora)]">
            &ldquo;Nurturing health, naturally.&rdquo;
          </p>
        </div>
      </div>
    </footer>
  );
}
