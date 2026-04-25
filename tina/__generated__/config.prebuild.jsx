// tina/config.ts
import { defineConfig } from "tinacms";
var branch = process.env.GITHUB_BRANCH || process.env.VERCEL_GIT_COMMIT_REF || process.env.HEAD || "main";
var config_default = defineConfig({
  branch,
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID,
  token: process.env.TINA_TOKEN,
  build: {
    outputFolder: "admin",
    publicFolder: "public"
  },
  media: {
    tina: {
      mediaRoot: "uploads",
      publicFolder: "public"
    }
  },
  schema: {
    collections: [
      {
        name: "page",
        label: "Pages",
        path: "content/pages",
        format: "mdx",
        fields: [
          {
            type: "string",
            name: "title",
            label: "Title",
            isTitle: true,
            required: true
          },
          {
            type: "string",
            name: "description",
            label: "SEO Description"
          },
          {
            type: "rich-text",
            name: "body",
            label: "Body",
            isBody: true
          }
        ]
      },
      {
        name: "sermon",
        label: "Sermons",
        path: "content/sermons",
        format: "md",
        fields: [
          {
            type: "string",
            name: "title",
            label: "Title",
            isTitle: true,
            required: true
          },
          {
            type: "datetime",
            name: "date",
            label: "Date",
            required: true
          },
          {
            type: "string",
            name: "speaker",
            label: "Speaker"
          },
          {
            type: "string",
            name: "language",
            label: "Language",
            options: ["English", "Arabic"],
            ui: { component: "select" }
          },
          {
            type: "string",
            name: "audioUrl",
            label: "Audio URL"
          },
          {
            type: "string",
            name: "videoUrl",
            label: "Video URL (YouTube/Vimeo)"
          },
          {
            type: "image",
            name: "thumbnail",
            label: "Thumbnail"
          },
          {
            type: "string",
            name: "body",
            label: "Description",
            ui: { component: "textarea" }
          }
        ]
      },
      {
        name: "article",
        label: "Articles",
        path: "content/articles",
        format: "mdx",
        fields: [
          {
            type: "string",
            name: "title",
            label: "Title",
            isTitle: true,
            required: true
          },
          {
            type: "datetime",
            name: "date",
            label: "Published Date",
            required: true
          },
          {
            type: "string",
            name: "author",
            label: "Author"
          },
          {
            type: "string",
            name: "language",
            label: "Language",
            options: ["English", "Arabic"],
            ui: { component: "select" }
          },
          {
            type: "image",
            name: "coverImage",
            label: "Cover Image"
          },
          {
            type: "string",
            name: "excerpt",
            label: "Excerpt",
            ui: { component: "textarea" }
          },
          {
            type: "rich-text",
            name: "body",
            label: "Body",
            isBody: true
          }
        ]
      },
      {
        name: "event",
        label: "Events",
        path: "content/events",
        format: "md",
        fields: [
          {
            type: "string",
            name: "title",
            label: "Title",
            isTitle: true,
            required: true
          },
          {
            type: "datetime",
            name: "startDate",
            label: "Start Date & Time",
            required: true
          },
          {
            type: "datetime",
            name: "endDate",
            label: "End Date & Time"
          },
          {
            type: "string",
            name: "location",
            label: "Location"
          },
          {
            type: "boolean",
            name: "isRecurring",
            label: "Recurring Event"
          },
          {
            type: "string",
            name: "recurringPattern",
            label: 'Recurring Pattern (e.g. "Every Sunday at 8am")'
          },
          {
            type: "image",
            name: "image",
            label: "Event Image"
          },
          {
            type: "string",
            name: "body",
            label: "Description",
            ui: { component: "textarea" }
          }
        ]
      },
      {
        name: "staff",
        label: "Staff & Clergy",
        path: "content/staff",
        format: "md",
        fields: [
          {
            type: "string",
            name: "name",
            label: "Name",
            isTitle: true,
            required: true
          },
          {
            type: "string",
            name: "title",
            label: "Title / Role",
            required: true
          },
          {
            type: "string",
            name: "type",
            label: "Type",
            options: ["Clergy", "Deacon", "Staff", "Community"],
            ui: { component: "select" }
          },
          {
            type: "image",
            name: "photo",
            label: "Photo"
          },
          {
            type: "string",
            name: "email",
            label: "Email"
          },
          {
            type: "string",
            name: "phone",
            label: "Phone"
          },
          {
            type: "string",
            name: "body",
            label: "Bio",
            ui: { component: "textarea" }
          },
          {
            type: "number",
            name: "order",
            label: "Display Order"
          }
        ]
      },
      {
        name: "gallery",
        label: "Gallery Albums",
        path: "content/gallery",
        format: "md",
        fields: [
          {
            type: "string",
            name: "title",
            label: "Album Title",
            isTitle: true,
            required: true
          },
          {
            type: "datetime",
            name: "date",
            label: "Date"
          },
          {
            type: "image",
            name: "coverImage",
            label: "Cover Image"
          },
          {
            type: "string",
            name: "description",
            label: "Description",
            ui: { component: "textarea" }
          },
          {
            type: "object",
            name: "photos",
            label: "Photos",
            list: true,
            fields: [
              {
                type: "image",
                name: "src",
                label: "Image"
              },
              {
                type: "string",
                name: "caption",
                label: "Caption"
              }
            ]
          }
        ]
      },
      {
        name: "settings",
        label: "Site Settings",
        path: "content/settings",
        format: "md",
        ui: {
          allowedActions: { create: false, delete: false },
          global: true
        },
        fields: [
          // Contact info
          {
            type: "string",
            name: "address",
            label: "Address"
          },
          {
            type: "string",
            name: "phone",
            label: "Phone"
          },
          {
            type: "string",
            name: "email",
            label: "Email"
          },
          {
            type: "string",
            name: "donateUrl",
            label: "Donate URL"
          },
          // External service links
          {
            type: "string",
            name: "announcementsUrl",
            label: "This Week's Announcements URL (Google Drive)"
          },
          {
            type: "string",
            name: "announcementsArchiveUrl",
            label: "Archive of Announcements URL (Google Drive)"
          },
          {
            type: "string",
            name: "virtualMeetingsUrl",
            label: "Virtual Meetings URL"
          },
          {
            type: "string",
            name: "sundaySchoolUrl",
            label: "Sunday School Curriculum URL"
          },
          {
            type: "string",
            name: "venueRequestUrl",
            label: "Venue Request Form URL"
          },
          // Request form links
          {
            type: "string",
            name: "prayerRequestUrl",
            label: "Prayer Request Form URL"
          },
          {
            type: "string",
            name: "commemorationUrl",
            label: "Commemoration of the Departed Form URL"
          },
          {
            type: "string",
            name: "priestVisitationUrl",
            label: "Priest Visitation Form URL"
          },
          {
            type: "string",
            name: "askQuestionUrl",
            label: "Ask a Question Form URL"
          },
          {
            type: "string",
            name: "suggestionUrl",
            label: "Have a Suggestion Form URL"
          },
          // Live streaming
          {
            type: "string",
            name: "stMaryStreamUrl",
            label: "St. Mary's Live Stream URL (YouTube embed)"
          },
          {
            type: "string",
            name: "archangelStreamUrl",
            label: "Archangel Michael's Live Stream URL (YouTube embed)"
          },
          // YouTube sermon feeds
          {
            type: "string",
            name: "stMaryChannelId",
            label: "St. Mary's YouTube Channel ID (for sermons feed)"
          },
          {
            type: "string",
            name: "archangelPlaylistId",
            label: "Archangel Michael's YouTube Playlist ID (for sermons feed)"
          }
        ]
      }
    ]
  }
});
export {
  config_default as default
};
