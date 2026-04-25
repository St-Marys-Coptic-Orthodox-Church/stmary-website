import SectionHeader from "@/components/SectionHeader";
import Link from "next/link";

export const metadata = { title: "About Us – St. Mary's Coptic Orthodox Church" };

export default function AboutPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
      <SectionHeader title="About St. Mary's" />

      {/* History */}
      <section className="mb-12 prose prose-gray max-w-none">
        <h2 className="text-xl font-bold text-[var(--primary)] mb-4">Our History</h2>
        <div className="bg-[var(--muted)] border border-[var(--border)] rounded-xl p-6 text-gray-700 leading-relaxed space-y-3 text-sm">
          <p>
            St. Mary&apos;s Coptic Orthodox Church was established in Chicago in 1968, serving the growing Coptic
            community in the greater Chicago area. What began as a small gathering of faithful Coptic families
            has grown into a vibrant parish of hundreds of families united in faith and fellowship.
          </p>
          <p>
            The church is dedicated to the Virgin Mary, the Theotokos (God-bearer), who holds a place of great
            honor in the Coptic Orthodox tradition. Our parish continues to grow, welcoming Coptic families and
            those interested in learning about the ancient Christian faith of Egypt.
          </p>
          <p>
            Today, under the pastoral care of Fr. Yohanna Meshreki and Fr. David Hanna, the parish offers a
            full schedule of liturgical services, educational programs, youth ministry, and community outreach.
          </p>
        </div>
      </section>

      {/* Coptic Faith */}
      <section id="faith" className="mb-12">
        <h2 className="text-xl font-bold text-[var(--primary)] mb-4">The Coptic Orthodox Faith</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {[
            {
              icon: "✝",
              title: "Ancient Heritage",
              body: "The Coptic Orthodox Church was founded by St. Mark the Evangelist in Alexandria, Egypt, in the 1st century AD — one of the oldest Christian churches in the world.",
            },
            {
              icon: "🕊",
              title: "Liturgy & Worship",
              body: "Our Divine Liturgy is rooted in the ancient Alexandrian rite, conducted in Coptic, Arabic, and English, connecting us to 2,000 years of unbroken Christian tradition.",
            },
            {
              icon: "📖",
              title: "Scripture & Theology",
              body: "We hold firmly to the Nicene Creed and the teachings of the Church Fathers, particularly the great theologians of Alexandria such as St. Athanasius the Apostolic.",
            },
            {
              icon: "🙏",
              title: "Prayer & Fasting",
              body: "Coptic Christians observe over 210 days of fasting annually, maintaining a rich tradition of prayer, including seven canonical hours recited throughout the day.",
            },
          ].map((item) => (
            <div key={item.title} className="bg-white border border-[var(--border)] rounded-xl p-5">
              <div className="text-2xl mb-3">{item.icon}</div>
              <h3 className="font-semibold text-gray-900 mb-2">{item.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{item.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Etiquette */}
      <section className="mb-12">
        <h2 className="text-xl font-bold text-[var(--primary)] mb-4">Visiting Our Church</h2>
        <div className="bg-white border border-[var(--border)] rounded-xl p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-gray-700">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Dress Code</h3>
              <p className="leading-relaxed">We ask visitors to dress modestly and respectfully. Women are encouraged to cover their heads during the liturgy. Shoulders and knees should be covered.</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">During the Service</h3>
              <p className="leading-relaxed">Please silence your phone and refrain from eating or drinking in the sanctuary. Holy Communion is offered only to baptized and chrismated Coptic Orthodox Christians.</p>
            </div>
          </div>
        </div>
      </section>

      <div className="flex gap-4">
        <Link href="/staff" className="bg-[var(--primary)] hover:bg-[var(--primary-dark)] text-white font-semibold px-6 py-3 rounded-lg transition-colors text-sm">
          Meet Our Clergy
        </Link>
        <Link href="/contact" className="border border-[var(--border)] text-gray-700 hover:border-[var(--primary)] hover:text-[var(--primary)] font-semibold px-6 py-3 rounded-lg transition-colors text-sm">
          Contact Us
        </Link>
      </div>
    </div>
  );
}
