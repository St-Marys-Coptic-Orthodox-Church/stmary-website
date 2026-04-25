export type YTVideo = {
  id: string;
  title: string;
  published: string;
  thumbnail: string;
  url: string;
};

async function fetchFeed(feedUrl: string, count = 4): Promise<YTVideo[]> {
  try {
    const res = await fetch(feedUrl, { next: { revalidate: 3600 } });
    if (!res.ok) return [];
    const xml = await res.text();

    const entries = xml.split("<entry>").slice(1);
    return entries.slice(0, count).map((entry) => {
      const videoId = (entry.match(/<yt:videoId>([^<]+)<\/yt:videoId>/) ?? [])[1] ?? "";
      const title = (entry.match(/<title>([^<]+)<\/title>/) ?? [])[1] ?? "";
      const published = (entry.match(/<published>([^<]+)<\/published>/) ?? [])[1] ?? "";
      return {
        id: videoId,
        title: decodeXml(title),
        published,
        thumbnail: `https://i.ytimg.com/vi/${videoId}/mqdefault.jpg`,
        url: `https://www.youtube.com/watch?v=${videoId}`,
      };
    });
  } catch {
    return [];
  }
}

function decodeXml(str: string) {
  return str
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");
}

export async function getStMaryVideos(channelId: string, count = 4) {
  return fetchFeed(
    `https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`,
    count
  );
}

export async function getArchangelVideos(playlistId: string, count = 4) {
  return fetchFeed(
    `https://www.youtube.com/feeds/videos.xml?playlist_id=${playlistId}`,
    count
  );
}
