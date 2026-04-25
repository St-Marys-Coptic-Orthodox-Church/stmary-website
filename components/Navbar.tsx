"use client";

import Link from "next/link";
import { useState } from "react";
import type { SiteSettings } from "@/lib/settings";

type NavChild = { label: string; href: string; external?: boolean };
type NavGroup = { label: string; items: NavChild[] };
type NavItem =
  | { label: string; href: string }
  | { label: string; groups: NavGroup[] }
  | { label: string; children: NavChild[] };

function buildNav(s: SiteSettings): NavItem[] {
  return [
    { label: "Home", href: "/" },
    {
      label: "Services",
      groups: [
        {
          label: "Main Services",
          items: [
            { label: "This Week's Announcements", href: s.announcementsUrl ?? "#", external: true },
            { label: "Archive of Announcements", href: s.announcementsArchiveUrl ?? "#", external: true },
            { label: "Sermons", href: "/sermons" },
            { label: "Weekly Articles", href: "/articles" },
            { label: "Liturgical Services", href: "/#schedule" },
            { label: "Events", href: "/events" },
            { label: "Virtual Meetings", href: s.virtualMeetingsUrl ?? "#", external: true },
            { label: "Calendar", href: "/events" },
            { label: "Sunday School Curriculum", href: s.sundaySchoolUrl ?? "#", external: true },
          ],
        },
        {
          label: "Our Facilities",
          items: [
            { label: "Venue Request Form", href: s.venueRequestUrl ?? "#", external: true },
          ],
        },
        {
          label: "Requests",
          items: [
            { label: "Prayer Request", href: s.prayerRequestUrl ?? "#", external: true },
            { label: "Commemoration of the Departed", href: s.commemorationUrl ?? "#", external: true },
            { label: "Priest Visitation", href: s.priestVisitationUrl ?? "#", external: true },
            { label: "Ask a Question", href: s.askQuestionUrl ?? "#", external: true },
            { label: "Have a Suggestion", href: s.suggestionUrl ?? "#", external: true },
          ],
        },
      ],
    },
    {
      label: "About Us",
      children: [
        { label: "History of the Coptic Church", href: "/about-us" },
        { label: "History of St. Mary's", href: "/about-us#history" },
        { label: "Attending Church Etiquette", href: "/about-us#etiquette" },
        { label: "Dress Code", href: "/about-us#dress-code" },
        { label: "Clergy & Staff", href: "/staff" },
        { label: "Our Community", href: "/staff" },
      ],
    },
    { label: "Gallery", href: "/gallery" },
    { label: "Contact Us", href: "/contact" },
  ];
}

function hasGroups(item: NavItem): item is { label: string; groups: NavGroup[] } {
  return "groups" in item;
}
function hasChildren(item: NavItem): item is { label: string; children: NavChild[] } {
  return "children" in item;
}
function hasHref(item: NavItem): item is { label: string; href: string } {
  return "href" in item;
}

export default function Navbar({ settings }: { settings: SiteSettings }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const nav = buildNav(settings);
  const donateUrl = settings.donateUrl ?? "/donate";

  return (
    <header className="bg-[var(--primary)] shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 flex-shrink-0">
            <div className="w-10 h-10 rounded-full bg-[var(--gold)] flex items-center justify-center text-white font-bold text-lg">
              ✝
            </div>
            <span className="text-white font-semibold text-sm sm:text-base leading-tight">
              St. Mary&apos;s<br />
              <span className="text-[var(--gold-light)] text-xs font-normal">Coptic Orthodox Church</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {nav.map((item) => {
              if (hasHref(item)) {
                return (
                  <Link key={item.label} href={item.href} className="text-white/90 hover:text-white px-3 py-2 text-sm font-medium transition-colors">
                    {item.label}
                  </Link>
                );
              }

              return (
                <div
                  key={item.label}
                  className="relative group"
                  onMouseEnter={() => setOpenDropdown(item.label)}
                  onMouseLeave={() => setOpenDropdown(null)}
                >
                  <button className="text-white/90 hover:text-white px-3 py-2 text-sm font-medium flex items-center gap-1 transition-colors">
                    {item.label}
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {openDropdown === item.label && (
                    <div className="absolute top-full left-0 mt-0 bg-white shadow-xl rounded-b border-t-2 border-[var(--gold)] z-50 min-w-[200px]">
                      {hasGroups(item) ? (
                        <div className="flex gap-0 divide-x divide-gray-100">
                          {item.groups.map((group) => (
                            <div key={group.label} className="min-w-[200px] p-3">
                              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider px-1 mb-2">{group.label}</p>
                              {group.items.map((child) => (
                                <Link
                                  key={child.label}
                                  href={child.href}
                                  target={child.external ? "_blank" : undefined}
                                  rel={child.external ? "noopener noreferrer" : undefined}
                                  className="block px-2 py-1.5 text-sm text-gray-700 hover:bg-[var(--muted)] hover:text-[var(--primary)] rounded transition-colors"
                                >
                                  {child.label}
                                </Link>
                              ))}
                            </div>
                          ))}
                        </div>
                      ) : hasChildren(item) ? (
                        item.children.map((child) => (
                          <Link
                            key={child.label}
                            href={child.href}
                            className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-[var(--muted)] hover:text-[var(--primary)] transition-colors"
                          >
                            {child.label}
                          </Link>
                        ))
                      ) : null}
                    </div>
                  )}
                </div>
              );
            })}
          </nav>

          {/* Donate */}
          <div className="hidden md:flex items-center gap-2">
            <Link href={donateUrl} className="bg-[var(--gold)] hover:bg-[var(--gold-light)] text-white text-sm font-semibold px-4 py-2 rounded transition-colors">
              Donate
            </Link>
          </div>

          {/* Mobile menu button */}
          <button className="md:hidden text-white p-2" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Toggle menu">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {mobileOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-[var(--primary-dark)] border-t border-white/10 max-h-[80vh] overflow-y-auto">
          {nav.map((item) => (
            <div key={item.label}>
              {hasHref(item) ? (
                <Link href={item.href} className="block text-white/90 hover:text-white px-4 py-3 text-sm font-medium transition-colors" onClick={() => setMobileOpen(false)}>
                  {item.label}
                </Link>
              ) : (
                <>
                  <button
                    className="w-full text-left text-white/90 px-4 py-3 text-sm font-medium flex justify-between items-center"
                    onClick={() => setOpenDropdown(openDropdown === item.label ? null : item.label)}
                  >
                    {item.label}
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {openDropdown === item.label && (
                    <div className="bg-[var(--primary)] pl-4">
                      {hasGroups(item)
                        ? item.groups.flatMap((g) => g.items).map((child) => (
                            <Link key={child.label} href={child.href} target={child.external ? "_blank" : undefined} rel={child.external ? "noopener noreferrer" : undefined} className="block text-white/80 hover:text-white px-4 py-2 text-sm" onClick={() => setMobileOpen(false)}>
                              {child.label}
                            </Link>
                          ))
                        : hasChildren(item)
                        ? item.children.map((child) => (
                            <Link key={child.label} href={child.href} className="block text-white/80 hover:text-white px-4 py-2 text-sm" onClick={() => setMobileOpen(false)}>
                              {child.label}
                            </Link>
                          ))
                        : null}
                    </div>
                  )}
                </>
              )}
            </div>
          ))}
          <div className="px-4 py-3">
            <Link href={donateUrl} className="block w-full text-center bg-[var(--gold)] text-white text-sm font-semibold px-4 py-2 rounded" onClick={() => setMobileOpen(false)}>
              Donate
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
