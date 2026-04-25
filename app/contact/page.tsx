import SectionHeader from "@/components/SectionHeader";
import { getSiteSettings } from "@/lib/settings";

export const metadata = { title: "Contact Us – St. Mary's Coptic Orthodox Church" };

export default async function ContactPage() {
  const s = await getSiteSettings();

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
      <SectionHeader title="Contact Us" subtitle="We'd love to hear from you" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Contact Info */}
        <div className="space-y-6">
          {[
            {
              icon: (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              ),
              label: "Address",
              value: s.address ?? "",
              href: undefined,
            },
            {
              icon: (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              ),
              label: "Phone",
              value: s.phone ?? "",
              href: s.phone ? `tel:${s.phone.replace(/\s/g, "")}` : undefined,
            },
            {
              icon: (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              ),
              label: "Email",
              value: s.email ?? "",
              href: s.email ? `mailto:${s.email}` : undefined,
            },
          ].map((item) => (
            <div key={item.label} className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-[var(--primary)] flex items-center justify-center text-white flex-shrink-0">
                {item.icon}
              </div>
              <div>
                <p className="text-xs text-gray-400 uppercase font-semibold tracking-wide">{item.label}</p>
                {item.href ? (
                  <a href={item.href} className="text-gray-800 text-sm mt-0.5 hover:text-[var(--primary)]">{item.value}</a>
                ) : (
                  <p className="text-gray-800 text-sm mt-0.5">{item.value}</p>
                )}
              </div>
            </div>
          ))}

          {/* Service Times */}
          <div className="bg-[var(--muted)] border border-[var(--border)] rounded-xl p-5">
            <h3 className="font-semibold text-gray-900 mb-3 text-sm">Service Schedule</h3>
            <div className="space-y-2 text-sm text-gray-700">
              {[
                { day: "Sunday", detail: "Divine Liturgy — 7:00 AM & 9:00 AM" },
                { day: "Friday", detail: "Vespers & Praises — 7:00 PM" },
                { day: "Wednesday", detail: "Bible Study — 7:00 PM" },
              ].map((s) => (
                <div key={s.day} className="flex justify-between gap-4">
                  <span className="font-medium">{s.day}</span>
                  <span className="text-gray-500 text-right">{s.detail}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick request links */}
          <div className="bg-white border border-[var(--border)] rounded-xl p-5">
            <h3 className="font-semibold text-gray-900 mb-3 text-sm">Submit a Request</h3>
            <div className="space-y-2">
              {[
                { label: "Prayer Request", href: s.prayerRequestUrl },
                { label: "Commemoration of the Departed", href: s.commemorationUrl },
                { label: "Priest Visitation", href: s.priestVisitationUrl },
                { label: "Ask a Question", href: s.askQuestionUrl },
                { label: "Have a Suggestion", href: s.suggestionUrl },
              ].filter((l) => l.href).map((link) => (
                <a key={link.label} href={link.href!} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between text-sm text-[var(--primary)] hover:underline py-1">
                  {link.label}
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-white border border-[var(--border)] rounded-xl p-6 shadow-sm">
          <h2 className="font-bold text-gray-900 mb-5">Send us a message</h2>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">First Name</label>
                <input type="text" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)]" />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Last Name</label>
                <input type="text" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)]" />
              </div>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Email</label>
              <input type="email" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)]" />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Subject</label>
              <select className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)] text-gray-700">
                <option value="">Select a topic…</option>
                <option>General Inquiry</option>
                <option>Prayer Request</option>
                <option>Priest Visit</option>
                <option>Venue Rental</option>
                <option>Youth Ministry</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Message</label>
              <textarea rows={5} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)] resize-none" />
            </div>
            <button className="w-full bg-[var(--primary)] hover:bg-[var(--primary-dark)] text-white font-semibold py-2.5 rounded-lg transition-colors text-sm">
              Send Message
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
