import client from "@/tina/__generated__/client";
import SectionHeader from "@/components/SectionHeader";

export const metadata = { title: "Articles – St. Mary's Coptic Orthodox Church" };

export default async function ArticlesPage() {
  const { data } = await client.queries.articleConnection({ sort: "date" });
  const articles = (data.articleConnection.edges ?? [])
    .map((e) => e?.node)
    .filter(Boolean)
    .reverse();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
      <SectionHeader title="Articles" subtitle="Reflections and teachings from our clergy" />

      <div className="flex flex-wrap gap-2 mb-8">
        {["All", "English", "Arabic"].map((f) => (
          <button key={f} className={`px-4 py-1.5 rounded-full text-sm border transition-colors ${f === "All" ? "bg-[var(--primary)] text-white border-[var(--primary)]" : "border-[var(--border)] text-gray-600 hover:border-[var(--primary)] hover:text-[var(--primary)]"}`}>
            {f}
          </button>
        ))}
      </div>

      {articles.length === 0 ? (
        <p className="text-gray-500 text-sm py-8 text-center">No articles yet. Add one in the CMS admin.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {articles.map((a) => {
            if (!a) return null;
            const date = new Date(a.date).toLocaleDateString("en-US", {
              year: "numeric", month: "long", day: "numeric",
            });
            return (
              <article key={a.id} className="bg-white border border-[var(--border)] rounded-xl overflow-hidden hover:shadow-md transition-shadow flex flex-col">
                <div className="bg-[var(--muted)] h-44 flex items-center justify-center">
                  <svg className="w-10 h-10 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div className="p-5 flex flex-col flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    {a.language && (
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${a.language === "Arabic" ? "bg-amber-100 text-amber-700" : "bg-blue-100 text-blue-700"}`}>
                        {a.language}
                      </span>
                    )}
                    <span className="text-gray-400 text-xs">{date}</span>
                  </div>
                  <h2 className="font-semibold text-gray-900 text-base mb-1">{a.title}</h2>
                  {a.author && <p className="text-gray-500 text-xs mb-3">By {a.author}</p>}
                  {a.excerpt && <p className="text-gray-600 text-sm line-clamp-3 flex-1">{a.excerpt}</p>}
                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}
