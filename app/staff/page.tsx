import Image from "next/image";
import client from "@/tina/__generated__/client";
import SectionHeader from "@/components/SectionHeader";

export const metadata = { title: "Clergy & Staff – St. Mary's Coptic Orthodox Church" };

function Avatar({ name, photo, large }: { name: string; photo?: string | null; large?: boolean }) {
  const size = large ? "w-24 h-24" : "w-12 h-12";
  if (photo) {
    return (
      <div className={`${size} rounded-full overflow-hidden flex-shrink-0 border-2 border-[var(--border)]`}>
        <Image src={photo} alt={name} width={large ? 96 : 48} height={large ? 96 : 48} className="object-cover w-full h-full" />
      </div>
    );
  }
  const initials = name
    .split(" ")
    .filter((w) => /^[A-Z]/.test(w))
    .slice(0, 2)
    .map((w) => w[0])
    .join("");
  return (
    <div className={`${size} rounded-full bg-[var(--primary)] flex items-center justify-center text-white font-bold flex-shrink-0 ${large ? "text-2xl" : "text-base"}`}>
      {initials}
    </div>
  );
}

export default async function StaffPage() {
  const { data } = await client.queries.staffConnection({ sort: "order" });
  const all = (data.staffConnection.edges ?? [])
    .map((e) => e?.node)
    .filter(Boolean);

  const clergy = all.filter((p) => p?.type === "Clergy");
  const others = all.filter((p) => p?.type !== "Clergy");

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
      <SectionHeader title="Clergy & Staff" subtitle="The shepherds and servants of our community" />

      {clergy.length > 0 && (
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-gray-700 mb-5 border-b border-[var(--border)] pb-2">Clergy</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {clergy.map((person) => {
              if (!person) return null;
              return (
                <div key={person.id} className="bg-white border border-[var(--border)] rounded-xl p-6 flex gap-5 hover:shadow-sm transition-shadow">
                  <Avatar name={person.name} photo={person.photo} large />
                  <div>
                    <h3 className="font-bold text-gray-900 text-lg">{person.name}</h3>
                    <p className="text-[var(--primary)] text-sm font-medium mb-3">{person.title}</p>
                    {person.body && <p className="text-gray-600 text-sm leading-relaxed">{person.body}</p>}
                    {person.email && (
                      <a href={`mailto:${person.email}`} className="text-xs text-[var(--primary)] hover:underline mt-2 block">
                        {person.email}
                      </a>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {others.length > 0 && (
        <section>
          <h2 className="text-lg font-semibold text-gray-700 mb-5 border-b border-[var(--border)] pb-2">Deacons & Staff</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {others.map((person) => {
              if (!person) return null;
              return (
                <div key={person.id} className="bg-white border border-[var(--border)] rounded-xl p-4 flex items-center gap-4 hover:shadow-sm transition-shadow">
                  <Avatar name={person.name} photo={person.photo} />
                  <div>
                    <h3 className="font-semibold text-gray-900 text-sm">{person.name}</h3>
                    <p className="text-gray-500 text-xs">{person.title}</p>
                    {person.type && (
                      <span className={`text-xs px-2 py-0.5 rounded-full mt-1 inline-block font-medium ${person.type === "Deacon" ? "bg-purple-100 text-purple-700" : "bg-gray-100 text-gray-600"}`}>
                        {person.type}
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {all.length === 0 && (
        <p className="text-gray-500 text-sm py-8 text-center">No staff listed yet. Add them in the CMS admin.</p>
      )}
    </div>
  );
}
