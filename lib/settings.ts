import client from "@/tina/__generated__/client";

export type SiteSettings = {
  address?: string | null;
  phone?: string | null;
  email?: string | null;
  donateUrl?: string | null;
  announcementsUrl?: string | null;
  announcementsArchiveUrl?: string | null;
  virtualMeetingsUrl?: string | null;
  sundaySchoolUrl?: string | null;
  venueRequestUrl?: string | null;
  prayerRequestUrl?: string | null;
  commemorationUrl?: string | null;
  priestVisitationUrl?: string | null;
  askQuestionUrl?: string | null;
  suggestionUrl?: string | null;
  stMaryStreamUrl?: string | null;
  archangelStreamUrl?: string | null;
  stMaryChannelId?: string | null;
  archangelPlaylistId?: string | null;
};

const defaults: SiteSettings = {
  address: "2100 West Frontage Road, Palatine, IL 60067",
  phone: "+1 224-210-5859",
  email: "treasurer@stmarychicago.com",
  donateUrl: "/donate",
  announcementsUrl: "https://drive.google.com/file/d/1NEj6SFrEySZPnaenptwk2hEncGppmXs8/view",
  announcementsArchiveUrl: "https://drive.google.com/drive/folders/1mx0GoCi6zHezMRb5btJfswPBTmAfT81X",
  virtualMeetingsUrl: "https://stmary-online.web.app",
  sundaySchoolUrl: "https://ssc.suscopts.org/",
  venueRequestUrl: "https://form.jotform.com/243578187970068",
  prayerRequestUrl: "https://form.jotform.com/90315647189161",
  commemorationUrl: "https://form.jotform.com/90314932395156",
  priestVisitationUrl: "https://form.jotform.com/90314829694163",
  askQuestionUrl: "https://form.jotform.com/92456557903163",
  suggestionUrl: "https://form.jotform.com/92456284619164",
  stMaryStreamUrl: "https://www.youtube.com/embed/live_stream?html5=1&channel=UCAPe8CTmWjrNq89B13tCLiQ",
  archangelStreamUrl: "https://www.youtube.com/embed/live_stream?channel=UCTEYU_FJ7cBcq013we4MByw",
  stMaryChannelId: "UCAPe8CTmWjrNq89B13tCLiQ",
  archangelPlaylistId: "PL6Oyeq05X3Gtl683LtobWnvsN-wUhJqDy",
};

export async function getSiteSettings(): Promise<SiteSettings> {
  try {
    const { data } = await client.queries.settings({ relativePath: "site.md" });
    return { ...defaults, ...data.settings };
  } catch {
    return defaults;
  }
}
