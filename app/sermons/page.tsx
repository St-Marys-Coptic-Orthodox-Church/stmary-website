import client from "@/tina/__generated__/client";
import SectionHeader from "@/components/SectionHeader";

export const metadata = { title: "Sermons – St. Mary's Coptic Orthodox Church" };

export default async function SermonsPage() {
  const { data } = await client.queries.sermonConnection({ sort: "date" });
  const sermons = (data.sermonConnection.edges ?? [])
    .map((e) => e?.node)
    .filter(Boolean)
    .reverse();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
      <SectionHeader title="Sermons" subtitle="Audio and video recordings from our clergy" />

      <div className="flex flex-wrap gap-2 mb-8">
        {["All", "English", "Arabic", "Fr. Yohanna", "Fr. David"].map((f) => (
          <button
            key={f}
            className={`px-4 py-1.5 rounded-full text-sm border transition-colors ${
              f === "All"
                ? "bg-[var(--primary)] text-white border-[var(--primary)]"
                : "border-[var(--border)] text-gray-600 hover:border-[var(--primary)] hover:text-[var(--primary)]"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {sermons.length === 0 ? (
        <p className="text-gray-500 text-sm py-8 text-center">No sermons yet. Add one in the CMS admin.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {sermons.map((sermon) => {
            if (!sermon) return null;
            const date = new Date(sermon.date).toLocaleDateString("en-US", {
              year: "numeric", month: "long", day: "numeric",
            });
            return (
              <div key={sermon.id} className="bg-white rounded-xl border border-[var(--border)] shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                <div className="bg-[var(--primary)] aspect-video flex items-center justify-center relative">
                  <button className="w-14 h-14 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors">
                    <svg className="w-7 h-7 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </button>
                </div>
                <div className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    {sermon.language && (
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${sermon.language === "Arabic" ? "bg-amber-100 text-amber-700" : "bg-blue-100 text-blue-700"}`}>
                        {sermon.language}
                      </span>
                    )}
                    <span className="text-gray-400 text-xs">{date}</span>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-1">{sermon.title}</h3>
                  {sermon.speaker && <p className="text-gray-500 text-sm">{sermon.speaker}</p>}
                  {sermon.body && <p className="text-gray-500 text-xs mt-2 line-clamp-2">{sermon.body}</p>}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
