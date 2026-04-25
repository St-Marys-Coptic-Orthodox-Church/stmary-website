import { getSiteSettings } from "@/lib/settings";
import { redirect } from "next/navigation";

export const metadata = { title: "Announcements – St. Mary's Coptic Orthodox Church" };

export default async function AnnouncementsPage() {
  const s = await getSiteSettings();
  if (s.announcementsUrl) redirect(s.announcementsUrl);
  redirect("/");
}
