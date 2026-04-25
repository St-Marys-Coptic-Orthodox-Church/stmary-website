import Link from "next/link";
import type { SiteSettings } from "@/lib/settings";

export default function Footer({ settings }: { settings: SiteSettings }) {
  const { address, phone, email, donateUrl } = settings;

  return (
    <footer className="bg-[var(--primary-dark)] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-full bg-[var(--gold)] flex items-center justify-center text-white font-bold">✝</div>
              <span className="font-semibold text-sm leading-tight">
                St. Mary&apos;s<br />
                <span className="text-[var(--gold-light)] text-xs font-normal">Coptic Orthodox Church</span>
              </span>
            </div>
            <p className="text-white/60 text-sm leading-relaxed">
              Serving the Chicagoland community in faith, worship, and fellowship.
            </p>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-[var(--gold-light)] font-semibold text-sm uppercase tracking-wider mb-4">Services</h3>
            <ul className="space-y-2">
              {[
                { label: "This Week's Announcements", href: settings.announcementsUrl ?? "#", external: true },
                { label: "Sermons", href: "/sermons" },
                { label: "Weekly Articles", href: "/articles" },
                { label: "Events", href: "/events" },
                { label: "Virtual Meetings", href: settings.virtualMeetingsUrl ?? "#", external: true },
                { label: "Sunday School", href: settings.sundaySchoolUrl ?? "#", external: true },
              ].map((link) => (
                <li key={link.label}>
                  <Link href={link.href} target={link.external ? "_blank" : undefined} rel={link.external ? "noopener noreferrer" : undefined} className="text-white/70 hover:text-white text-sm transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* About */}
          <div>
            <h3 className="text-[var(--gold-light)] font-semibold text-sm uppercase tracking-wider mb-4">About</h3>
            <ul className="space-y-2">
              {[
                { label: "Our History", href: "/about-us" },
                { label: "Clergy & Staff", href: "/staff" },
                { label: "Gallery", href: "/gallery" },
                { label: "Contact Us", href: "/contact" },
                { label: "Prayer Request", href: settings.prayerRequestUrl ?? "#", external: true },
                { label: "Venue Request", href: settings.venueRequestUrl ?? "#", external: true },
              ].map((link) => (
                <li key={link.label}>
                  <Link href={link.href} target={(link as { external?: boolean }).external ? "_blank" : undefined} rel={(link as { external?: boolean }).external ? "noopener noreferrer" : undefined} className="text-white/70 hover:text-white text-sm transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-[var(--gold-light)] font-semibold text-sm uppercase tracking-wider mb-4">Contact</h3>
            <address className="not-italic text-white/70 text-sm space-y-2">
              {address && <p>{address}</p>}
              {phone && (
                <p>
                  <a href={`tel:${phone.replace(/\s/g, "")}`} className="hover:text-white transition-colors">{phone}</a>
                </p>
              )}
              {email && (
                <p>
                  <a href={`mailto:${email}`} className="hover:text-white transition-colors">{email}</a>
                </p>
              )}
            </address>
            <div className="mt-4">
              <Link href={donateUrl ?? "/donate"} className="inline-block bg-[var(--gold)] hover:bg-[var(--gold-light)] text-white text-sm font-semibold px-4 py-2 rounded transition-colors">
                Donate Online
              </Link>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-white/40 text-xs">
            © {new Date().getFullYear()} St. Mary&apos;s Coptic Orthodox Church. All rights reserved.
          </p>
          <p className="text-white/40 text-xs">Coptic Orthodox Diocese of the Southern United States</p>
        </div>
      </div>
    </footer>
  );
}
