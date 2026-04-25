import client from "@/tina/__generated__/client";
import SectionHeader from "@/components/SectionHeader";

export const metadata = { title: "Events – St. Mary's Coptic Orthodox Church" };

function formatDate(dateStr: string) {
  const d = new Date(dateStr);
  return {
    month: d.toLocaleDateString("en-US", { month: "short" }),
    day: d.getDate(),
    full: d.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" }),
    time: d.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" }),
  };
}

export default async function EventsPage() {
  const { data } = await client.queries.eventConnection({ sort: "startDate" });
  const events = (data.eventConnection.edges ?? [])
    .map((e) => e?.node)
    .filter(Boolean);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
      <SectionHeader title="Events & Calendar" subtitle="Upcoming services, activities, and gatherings" />

      {events.length === 0 ? (
        <p className="text-gray-500 text-sm py-8 text-center">No events yet. Add one in the CMS admin.</p>
      ) : (
        <div className="space-y-4">
          {events.map((event) => {
            if (!event) return null;
            const { month, day, full, time } = formatDate(event.startDate);
            return (
              <div key={event.id} className="bg-white border border-[var(--border)] rounded-xl p-5 flex items-start gap-5 hover:shadow-sm transition-shadow">
                <div className="w-16 h-16 bg-[var(--muted)] border border-[var(--border)] rounded-xl flex flex-col items-center justify-center flex-shrink-0 text-[var(--primary)]">
                  <span className="text-xs font-semibold uppercase">{month}</span>
                  <span className="text-2xl font-bold leading-tight">{day}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    {event.isRecurring && (
                      <span className="text-xs px-2 py-0.5 rounded-full font-medium bg-purple-100 text-purple-700">Recurring</span>
                    )}
                  </div>
                  <h3 className="font-semibold text-gray-900">{event.title}</h3>
                  <p className="text-gray-500 text-sm mt-1">{full}</p>
                  <p className="text-gray-500 text-sm">
                    {time}{event.location ? ` · ${event.location}` : ""}
                  </p>
                  {event.recurringPattern && (
                    <p className="text-gray-400 text-xs mt-1 italic">{event.recurringPattern}</p>
                  )}
                  {event.body && <p className="text-gray-600 text-sm mt-2">{event.body}</p>}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
