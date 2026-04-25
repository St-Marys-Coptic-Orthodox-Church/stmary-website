import Link from "next/link";
import Image from "next/image";
import SectionHeader from "@/components/SectionHeader";
import { getSiteSettings, type SiteSettings } from "@/lib/settings";
import { getStMaryVideos, getArchangelVideos, type YTVideo } from "@/lib/youtube";

function Hero() {
  return (
    <section className="relative bg-[var(--primary)] text-white overflow-hidden min-h-[480px] flex items-center">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `repeating-linear-gradient(
              45deg,
              transparent,
              transparent 20px,
              rgba(255,255,255,0.05) 20px,
              rgba(255,255,255,0.05) 40px
            )`,
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-20 text-center w-full">
        <div className="inline-block text-[var(--gold)] text-5xl mb-6">✝</div>
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight mb-4">
          St. Mary&apos;s Coptic Orthodox Church
        </h1>
        <p className="text-[var(--gold-light)] text-lg sm:text-xl mb-2 font-medium">
          Chicago, Illinois
        </p>
        <p className="text-white/70 text-base sm:text-lg max-w-2xl mx-auto mb-10">
          A community of faith rooted in the ancient Coptic Orthodox tradition, serving
          Chicago since 1968.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/about-us"
            className="bg-[var(--gold)] hover:bg-[var(--gold-light)] text-white font-semibold px-8 py-3 rounded transition-colors"
          >
            Learn About Us
          </Link>
          <Link
            href="/#live"
            className="border border-white/40 hover:border-white text-white font-semibold px-8 py-3 rounded transition-colors"
          >
            Watch Live
          </Link>
        </div>
      </div>
    </section>
  );
}

function ServiceTimes() {
  const services = [
    { day: "Sunday", time: "7:00 AM & 9:00 AM", label: "Divine Liturgy" },
    { day: "Friday", time: "7:00 PM", label: "Vespers & Praises" },
    { day: "Wednesday", time: "7:00 PM", label: "Bible Study" },
  ];

  return (
    <section className="bg-[var(--muted)] border-b border-[var(--border)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {services.map((s) => (
            <div key={s.day} className="bg-white rounded-lg p-4 flex items-center gap-4 shadow-sm border border-[var(--border)]">
              <div className="w-10 h-10 rounded-full bg-[var(--primary)] flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <p className="font-semibold text-[var(--primary)] text-sm">{s.day}</p>
                <p className="text-gray-600 text-xs">{s.label}</p>
                <p className="text-gray-900 text-sm font-medium">{s.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function LiveStreaming({ settings }: { settings: SiteSettings }) {
  const streams = [
    { name: "St. Mary's Church", location: "Palatine, IL", url: settings.stMaryStreamUrl },
    { name: "Archangel Michael's Church", location: "Sister Parish", url: settings.archangelStreamUrl },
  ];

  return (
    <section id="live" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <SectionHeader title="Live Streaming" subtitle="Watch our services from anywhere in the world" centered />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {streams.map((church) => (
            <div key={church.name} className="border border-[var(--border)] rounded-xl overflow-hidden shadow-sm">
              {church.url ? (
                <div className="aspect-video">
                  <iframe src={church.url} className="w-full h-full" frameBorder="0" allowFullScreen title={`${church.name} Live Stream`} />
                </div>
              ) : (
                <div className="bg-[var(--muted)] aspect-video flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-16 h-16 rounded-full bg-[var(--primary)] flex items-center justify-center mx-auto mb-3">
                      <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                    <p className="text-gray-500 text-sm">Live stream unavailable</p>
                  </div>
                </div>
              )}
              <div className="p-4">
                <h3 className="font-semibold text-gray-900">{church.name}</h3>
                <p className="text-gray-500 text-sm">{church.location}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function VideoCard({ video }: { video: YTVideo }) {
  const date = new Date(video.published).toLocaleDateString("en-US", {
    month: "short", day: "numeric", year: "numeric",
  });
  return (
    <a
      href={video.url}
      target="_blank"
      rel="noopener noreferrer"
      className="bg-white rounded-xl shadow-sm border border-[var(--border)] overflow-hidden hover:shadow-md transition-shadow group block"
    >
      <div className="relative aspect-video bg-[var(--muted)] overflow-hidden">
        <Image
          src={video.thumbnail}
          alt={video.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors flex items-center justify-center">
          <div className="w-12 h-12 rounded-full bg-red-600 flex items-center justify-center shadow-lg">
            <svg className="w-5 h-5 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>
      </div>
      <div className="p-3">
        <p className="text-gray-400 text-xs mb-1">{date}</p>
        <h3 className="font-semibold text-gray-900 text-sm line-clamp-2 leading-snug">{video.title}</h3>
      </div>
    </a>
  );
}

function SermonColumn({
  title,
  channelLabel,
  channelUrl,
  videos,
}: {
  title: string;
  channelLabel: string;
  channelUrl: string;
  videos: YTVideo[];
}) {
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold text-[var(--primary)] text-lg">{title}</h3>
        <a
          href={channelUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs font-medium text-gray-500 hover:text-[var(--primary)] transition-colors"
        >
          {channelLabel} →
        </a>
      </div>
      {videos.length === 0 ? (
        <p className="text-gray-400 text-sm italic">No videos available.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {videos.map((v) => <VideoCard key={v.id} video={v} />)}
        </div>
      )}
    </div>
  );
}

async function LatestSermons({ settings }: { settings: SiteSettings }) {
  const [stMaryVideos, archangelVideos] = await Promise.all([
    getStMaryVideos(settings.stMaryChannelId ?? "UCAPe8CTmWjrNq89B13tCLiQ", 4),
    getArchangelVideos(settings.archangelPlaylistId ?? "PL6Oyeq05X3Gtl683LtobWnvsN-wUhJqDy", 4),
  ]);

  return (
    <section className="py-16 bg-[var(--muted)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-end justify-between mb-8">
          <SectionHeader title="Latest Sermons" />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <SermonColumn
            title="St. Mary's Church"
            channelLabel="View channel"
            channelUrl="https://www.youtube.com/@StMaryChicago/videos"
            videos={stMaryVideos}
          />
          <SermonColumn
            title="Archangel Michael's Church"
            channelLabel="View playlist"
            channelUrl={`https://www.youtube.com/playlist?list=${settings.archangelPlaylistId ?? "PL6Oyeq05X3Gtl683LtobWnvsN-wUhJqDy"}`}
            videos={archangelVideos}
          />
        </div>
      </div>
    </section>
  );
}

function LatestArticles() {
  const placeholders = [
    { title: "The Significance of Holy Week", author: "Fr. Yohanna Meshreki", date: "April 15, 2026", excerpt: "Holy Week is the most sacred period in the Coptic liturgical calendar, commemorating the Passion of our Lord..." },
    { title: "Understanding the Coptic Cross", author: "Fr. David Hanna", date: "March 28, 2026", excerpt: "The Coptic cross is one of the oldest Christian symbols and carries profound theological meaning..." },
    { title: "فضيلة الصوم", author: "Fr. Yohanna Meshreki", date: "March 10, 2026", excerpt: "يُعدّ الصوم في الكنيسة القبطية الأرثوذكسية من أعظم الفضائل الروحية..." },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-end justify-between mb-8">
          <SectionHeader title="Latest Articles" />
          <Link href="/articles" className="text-[var(--primary)] hover:text-[var(--primary-dark)] text-sm font-medium">
            View all →
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {placeholders.map((article) => (
            <article key={article.title} className="border border-[var(--border)] rounded-xl overflow-hidden hover:shadow-md transition-shadow">
              <div className="bg-[var(--muted)] h-40 flex items-center justify-center">
                <svg className="w-10 h-10 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div className="p-5">
                <p className="text-gray-400 text-xs mb-2">{article.date} · {article.author}</p>
                <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">{article.title}</h3>
                <p className="text-gray-500 text-sm line-clamp-3">{article.excerpt}</p>
                <Link href="/articles" className="inline-block mt-3 text-[var(--primary)] text-sm font-medium hover:underline">
                  Read more →
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function UpcomingEvents() {
  const events = [
    { title: "Divine Liturgy – Feast of St. Mark", date: "Apr 30", time: "7:00 AM", location: "Main Church" },
    { title: "Youth Group Meeting", date: "May 3", time: "6:00 PM", location: "Parish Hall" },
    { title: "Coptic Language Class", date: "May 10", time: "5:00 PM", location: "Classroom B" },
    { title: "Annual Church Picnic", date: "May 24", time: "12:00 PM", location: "Caldwell Woods" },
  ];

  return (
    <section className="py-16 bg-[var(--muted)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-end justify-between mb-8">
          <SectionHeader title="Upcoming Events" />
          <Link href="/events" className="text-[var(--primary)] hover:text-[var(--primary-dark)] text-sm font-medium">
            Full calendar →
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {events.map((event) => (
            <div key={event.title} className="bg-white border border-[var(--border)] rounded-xl p-4 flex items-start gap-4 hover:shadow-sm transition-shadow">
              <div className="w-14 h-14 bg-[var(--primary)] rounded-lg flex flex-col items-center justify-center flex-shrink-0 text-white">
                <span className="text-xs font-medium uppercase leading-none">{event.date.split(" ")[0]}</span>
                <span className="text-xl font-bold leading-none">{event.date.split(" ")[1]}</span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 text-sm">{event.title}</h3>
                <p className="text-gray-500 text-xs mt-1">{event.time} · {event.location}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function GalleryPreview() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-end justify-between mb-8">
          <SectionHeader title="Gallery" subtitle="Moments from our community" />
          <Link href="/gallery" className="text-[var(--primary)] hover:text-[var(--primary-dark)] text-sm font-medium">
            View all →
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="aspect-square bg-[var(--muted)] border border-[var(--border)] rounded-lg flex items-center justify-center hover:opacity-90 transition-opacity cursor-pointer">
              <svg className="w-8 h-8 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function NewMemberSignup() {
  return (
    <section className="py-16 bg-[var(--primary)]">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center">
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">New to St. Mary&apos;s?</h2>
        <p className="text-white/70 mb-8">Register with our church community and stay connected.</p>
        <div className="bg-white rounded-xl p-6 text-left shadow-xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
              <input type="text" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)]" placeholder="John" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
              <input type="text" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)]" placeholder="Doe" />
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input type="email" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)]" placeholder="john@example.com" />
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
            <input type="tel" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)]" placeholder="(773) 555-0000" />
          </div>
          <button className="w-full bg-[var(--primary)] hover:bg-[var(--primary-dark)] text-white font-semibold py-2.5 rounded-lg transition-colors">
            Register
          </button>
        </div>
      </div>
    </section>
  );
}

export default async function HomePage() {
  const settings = await getSiteSettings();

  return (
    <>
      <Hero />
      <ServiceTimes />
      <LiveStreaming settings={settings} />
      <LatestSermons settings={settings} />
      <LatestArticles />
      <UpcomingEvents />
      <GalleryPreview />
      <NewMemberSignup />
    </>
  );
}
