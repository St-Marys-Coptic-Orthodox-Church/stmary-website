import client from "@/tina/__generated__/client";
import SectionHeader from "@/components/SectionHeader";

export const metadata = { title: "Gallery – St. Mary's Coptic Orthodox Church" };

export default async function GalleryPage() {
  const { data } = await client.queries.galleryConnection({ sort: "date" });
  const albums = (data.galleryConnection.edges ?? [])
    .map((e) => e?.node)
    .filter(Boolean)
    .reverse();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
      <SectionHeader title="Gallery" subtitle="Photos from our community events and services" />

      {albums.length === 0 ? (
        <p className="text-gray-500 text-sm py-8 text-center">No albums yet. Add one in the CMS admin.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {albums.map((album) => {
            if (!album) return null;
            const date = album.date
              ? new Date(album.date).toLocaleDateString("en-US", { month: "long", year: "numeric" })
              : null;
            const photoCount = album.photos?.length ?? 0;
            return (
              <div key={album.id} className="bg-white border border-[var(--border)] rounded-xl overflow-hidden hover:shadow-md transition-shadow cursor-pointer group">
                <div className="bg-[var(--muted)] aspect-video flex items-center justify-center relative overflow-hidden">
                  <svg className="w-12 h-12 text-gray-300 group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  {photoCount > 0 && (
                    <div className="absolute bottom-2 right-2 bg-black/60 text-white text-xs px-2 py-0.5 rounded">
                      {photoCount} photo{photoCount !== 1 ? "s" : ""}
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900">{album.title}</h3>
                  {date && <p className="text-gray-500 text-sm">{date}</p>}
                  {album.description && <p className="text-gray-500 text-xs mt-1 line-clamp-2">{album.description}</p>}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
