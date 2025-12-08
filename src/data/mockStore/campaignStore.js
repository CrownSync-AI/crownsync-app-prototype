import coverImage_1 from "../../assets/mock/verragio/brand/campaigns/1/cover.png";
import coverImage_2 from "../../assets/mock/verragio/brand/campaigns/2/cover.png";
import coverImage_3 from "../../assets/mock/verragio/brand/campaigns/3/cover.png";
import coverImage_4 from "../../assets/mock/verragio/brand/campaigns/4/cover.png";
import coverImage_5 from "../../assets/mock/verragio/brand/campaigns/5/cover.png";
import coverImage_6 from "../../assets/mock/verragio/brand/campaigns/6/cover.png";
import coverImage_7 from "../../assets/mock/verragio/brand/campaigns/7/cover.png";
import coverImage_8 from "../../assets/mock/verragio/brand/campaigns/8/cover.png";
import coverImage_9 from "../../assets/mock/verragio/brand/campaigns/9/cover.png";
import coverImage_10 from "../../assets/mock/verragio/brand/campaigns/10/cover.png";
import coverImage_11 from "../../assets/mock/verragio/brand/campaigns/11/cover.png";
import coverImage_12 from "../../assets/mock/verragio/brand/campaigns/12/cover.png";
import coverImage_13 from "../../assets/mock/verragio/brand/campaigns/13/cover.png";
import coverImage_14 from "../../assets/mock/verragio/brand/campaigns/14/cover.png";
import coverImage_15 from "../../assets/mock/verragio/brand/campaigns/15/cover.png";
import coverImage_16 from "../../assets/mock/verragio/brand/campaigns/16/cover.png";
import coverImage_17 from "../../assets/mock/verragio/brand/campaigns/17/cover.png";

import { getMember } from "./memberStore";

export const campaignData = {
  // 1. Master Campaign List
  // ORDER: Newest Created First
  campaigns: [
    // 1. Active / Pinned / Full Content / High Perf / Good
    {
      id: "camp-001",
      title: "A perfect pair in radiant yellow gold. 💛",
      description: `Celebrate your love story with two timeless designs:
💍 Tradition-250DFR – A classic engagement ring with Verragio’s signature detailing and unmatched craftsmanship.
💍 VWRD7703 – A bold men’s band featuring channel-set round diamonds for a look that’s strong, sleek, and sophisticated.
Together, they embody elegance, commitment, and individuality.
🔗 Explore more and schedule your private viewing at Verragio.com

#Verragio
#YellowGoldRing #EngagementRing
`,
      status: "Active",
      coverImage: coverImage_1,
      cover: "bg-rose-100",
      audience: "All Retailers",
      isPinned: true,
      updatePending: false,
      adoptionRate: 78,
      usageCount: 3450,
      overviewId: "active-high",
      contentId: "full-content",
      insightsId: "high-perf",
      adoptionId: "good",
      createdAt: "2025-12-05",
      startDate: "2025-12-15",
      endDate: "2026-1-15",
      createdBy: {
        name: getMember("u-guest").name,
        avatar: getMember("u-guest").avatarUrl,
      },
    },
    // 2. Active / Pinned / Social Heavy / Avg Perf / Avg
    {
      id: "camp-002",
      title: "✨ Celebrate Love This Thanksgiving ✨Holiday Collection Launch",
      description:
        "Gratitude is all about cherishing the moments that truly matter, and what could be more meaningful than a love that stands the test of time? Our gorgeous bridal set, radiating in yellow gold, showcases an elegant oval-cut diamond engagement ring, perfectly complemented by a stunning diamond wedding band. For him, a stylish yellow gold band with channel-set diamonds offers a touch of refined sophistication, making this a perfect way to say 'I love you' this holiday season. ❤️",
      status: "Active",
      coverImage: coverImage_2,
      cover: "bg-amber-100",
      audience: "VIP Retailers",
      isPinned: true,
      updatePending: true,
      adoptionRate: 45,
      usageCount: 890,
      overviewId: "active-high",
      contentId: "social-heavy",
      insightsId: "avg-perf", // Mocked below
      adoptionId: "avg",
      createdAt: "2025-12-04",
      startDate: "2025-12-10",
      endDate: "2026-02-28",
      createdBy: {
        name: getMember("u-guest").name,
        avatar: getMember("u-guest").avatarUrl,
      },
    },
    // 3. Active / Full Content / High Perf / Poor
    {
      id: "camp-003",
      title: "Delicate or dramatic--you decide!",
      description:
        "Delicate or dramatic--you decide! The elegant twist of the Verragio 18k yellow gold and diamond braided hoop is made to be cherished.",
      status: "Active",
      coverImage: coverImage_3,
      cover: "bg-purple-100",
      audience: "Unspecified",
      isPinned: false,
      updatePending: false,
      adoptionRate: 25,
      usageCount: 120,
      overviewId: "active-avg", // Reusing high for metrics structure, actual data differs by ID usually but mocking
      contentId: "full-content",
      insightsId: "high-perf",
      adoptionId: "poor",
      createdAt: "2025-12-03",
      startDate: "2026-02-01",
      endDate: "2026-02-14",
      createdBy: {
        name: getMember("u-admin").name,
        avatar: getMember("u-admin").avatarUrl,
      },
    },
    // 4. Active / Files Only / Avg Perf / Avg
    {
      id: "camp-004",
      title: "LUMINO Collection. Pure brilliance.",
      description: `
An oval-cut diamond. Sleek white gold. Every detail is designed for those who value understated luxury and unparalleled craftsmanship.

This is more than an engagement ring—it’s a statement of your journey.

💍: Lumino-801-Oval {NEW}

#Verragio

#EngagementRing #DiamondRing
`,
      status: "Active",
      coverImage: coverImage_4,
      cover: "bg-blue-50",
      audience: "All Retailers",
      isPinned: false,
      updatePending: false,
      adoptionRate: 60,
      usageCount: 1200,
      overviewId: "active-avg",
      contentId: "files-only",
      insightsId: "avg-perf",
      adoptionId: "avg",
      createdAt: "2025-12-02",
      startDate: "2025-11-01",
      endDate: "Permanent",
      createdBy: {
        name: getMember("u-admin").name,
        avatar: getMember("u-admin").avatarUrl,
      },
    },
    // 5. Scheduled
    {
      id: "camp-005",
      title: "Spring Renew",
      description: "Refresh your inventory with our spring collection.",
      status: "Scheduled",
      coverImage: coverImage_5,
      cover: "bg-green-100",
      audience: "All Retailers",
      isPinned: false,
      updatePending: false,
      adoptionRate: 0,
      usageCount: 0,
      overviewId: "scheduled",
      contentId: "draft-empty",
      insightsId: "empty",
      adoptionId: "empty",
      createdAt: "2025-12-01",
      startDate: "2026-03-01",
      endDate: "2026-04-30",
      createdBy: {
        name: getMember("u-guest").name,
        avatar: getMember("u-guest").avatarUrl,
      },
    },
    // 6. Draft
    {
      id: "camp-006",
      title: "Diamond Guide 2026",
      description: "Educational guide for staff and customers.",
      status: "Draft",
      coverImage: coverImage_6,
      cover: "bg-slate-100",
      audience: "Staff Training",
      isPinned: false,
      updatePending: false,
      adoptionRate: null,
      usageCount: null,
      overviewId: "draft",
      contentId: "draft-empty",
      insightsId: "empty",
      adoptionId: "empty",
      createdAt: "2025-11-30",
      startDate: "TBD",
      endDate: "Permanent",
      createdBy: {
        name: getMember("u-admin").name,
        avatar: getMember("u-admin").avatarUrl,
      },
    },
    // 7. Ended
    {
      id: "camp-007",
      title: "Autumn Gold",
      description: "Fall season specific marketing assets.",
      status: "Ended",
      coverImage: coverImage_7,
      cover: "bg-orange-100",
      audience: "All Retailers",
      isPinned: false,
      updatePending: false,
      adoptionRate: 88,
      usageCount: 4500,
      overviewId: "ended-high",
      contentId: "full-content",
      insightsId: "high-perf",
      adoptionId: "good",
      createdAt: "2025-11-29",
      startDate: "2025-09-01",
      endDate: "2025-11-30",
      createdBy: {
        name: getMember("u-guest").name,
        avatar: getMember("u-guest").avatarUrl,
      },
    },
    // 8. Scheduled
    {
      id: "camp-008",
      title: "Mother's Day Early Bird",
      description: "Early access assets for Mother's Day planning.",
      status: "Scheduled",
      coverImage: coverImage_8,
      cover: "bg-pink-100",
      audience: "VIP Retailers",
      isPinned: false,
      updatePending: false,
      adoptionRate: 0,
      usageCount: 0,
      overviewId: "scheduled",
      contentId: "social-heavy",
      insightsId: "empty",
      adoptionId: "empty",
      createdAt: "2025-11-28",
      startDate: "2026-04-01",
      endDate: "2026-05-10",
      createdBy: {
        name: getMember("u-admin").name,
        avatar: getMember("u-admin").avatarUrl,
      },
    },
    // 9. Active
    {
      id: "camp-009",
      title: "Classic Bands",
      description: "Evergreen content for our classic wedding bands.",
      status: "Active",
      coverImage: coverImage_9,
      cover: "bg-gray-200",
      audience: "All Retailers",
      isPinned: false,
      updatePending: false,
      adoptionRate: 65,
      usageCount: 2100,
      overviewId: "active-avg",
      contentId: "files-only",
      insightsId: "avg-perf",
      adoptionId: "avg",
      createdAt: "2025-11-27",
      startDate: "2025-01-01",
      endDate: "Permanent",
      createdBy: {
        name: getMember("u-guest").name,
        avatar: getMember("u-guest").avatarUrl,
      },
    },
    // 10. Archived
    {
      id: "camp-010",
      title: "Summer 2025 Clearance",
      description: "Old assets from the summer sale.",
      status: "Archived",
      coverImage: coverImage_10,
      cover: "bg-yellow-100",
      audience: "All Retailers",
      isPinned: false,
      updatePending: false,
      adoptionRate: 55,
      usageCount: 1500,
      overviewId: "ended-avg",
      contentId: "full-content",
      insightsId: "avg-perf",
      adoptionId: "poor",
      createdAt: "2025-11-26",
      startDate: "2025-06-01",
      endDate: "2025-08-31",
      createdBy: {
        name: getMember("u-admin").name,
        avatar: getMember("u-admin").avatarUrl,
      },
    },
    // 11. Active
    {
      id: "camp-011",
      title: "Platinum Perfection",
      description: "Highlighting our platinum range.",
      status: "Active",
      coverImage: coverImage_11,
      cover: "bg-slate-300",
      audience: "All Retailers",
      isPinned: false,
      updatePending: false,
      adoptionRate: 42,
      usageCount: 800,
      overviewId: "active-avg",
      contentId: "social-heavy",
      insightsId: "avg-perf",
      adoptionId: "poor",
      createdAt: "2025-11-25",
      startDate: "2025-10-01",
      endDate: "2026-03-31",
      createdBy: {
        name: getMember("u-guest").name,
        avatar: getMember("u-guest").avatarUrl,
      },
    },
    // 12. Active
    {
      id: "camp-012",
      title: "Rose Gold Romance",
      description: "Targeting the romantic demographic.",
      status: "Active",
      coverImage: coverImage_12,
      cover: "bg-rose-200",
      audience: "All Retailers",
      isPinned: false,
      updatePending: false,
      adoptionRate: 81,
      usageCount: 3200,
      overviewId: "active-high",
      contentId: "full-content",
      insightsId: "high-perf",
      adoptionId: "good",
      createdAt: "2025-11-24",
      startDate: "2025-09-15",
      endDate: "2026-02-14",
      createdBy: {
        name: getMember("u-admin").name,
        avatar: getMember("u-admin").avatarUrl,
      },
    },
    // 13. Draft
    {
      id: "camp-013",
      title: "Sustainability Initiative",
      description: "Communicating our green efforts.",
      status: "Draft",
      coverImage: coverImage_13,
      cover: "bg-emerald-100",
      audience: "All Retailers",
      isPinned: false,
      updatePending: false,
      adoptionRate: null,
      usageCount: null,
      overviewId: "draft",
      contentId: "draft-empty",
      insightsId: "empty",
      adoptionId: "empty",
      createdAt: "2025-11-23",
      startDate: "TBD",
      endDate: "Permanent",
      createdBy: {
        name: getMember("u-guest").name,
        avatar: getMember("u-guest").avatarUrl,
      },
    },
    // 14. Active
    {
      id: "camp-014",
      title: "Men's Wedding Bands",
      description: "Focus on the groom.",
      status: "Active",
      coverImage: coverImage_14,
      cover: "bg-gray-600",
      audience: "All Retailers",
      isPinned: false,
      updatePending: true,
      adoptionRate: 50,
      usageCount: 1100,
      overviewId: "active-avg",
      contentId: "files-only",
      insightsId: "avg-perf",
      adoptionId: "avg",
      createdAt: "2025-11-22",
      startDate: "2025-08-01",
      endDate: "Permanent",
      createdBy: {
        name: getMember("u-admin").name,
        avatar: getMember("u-admin").avatarUrl,
      },
    },
    // 15. Archived
    {
      id: "camp-015",
      title: "Black Friday 2024",
      description: "Past Black Friday assets.",
      status: "Archived",
      coverImage: coverImage_15,
      cover: "bg-black",
      audience: "All Retailers",
      isPinned: false,
      updatePending: false,
      adoptionRate: 95,
      usageCount: 6700,
      overviewId: "ended-high",
      contentId: "full-content",
      insightsId: "high-perf",
      adoptionId: "good",
      createdAt: "2025-11-21",
      startDate: "2024-11-01",
      endDate: "2024-11-30",
      createdBy: {
        name: getMember("u-guest").name,
        avatar: getMember("u-guest").avatarUrl,
      },
    },
    // 16. Active
    {
      id: "camp-016",
      title: "Anniversary Collection",
      description: "Celebrating 20 years of excellence.",
      status: "Active",
      coverImage: coverImage_16,
      cover: "bg-purple-200",
      audience: "VIP Retailers",
      isPinned: false,
      updatePending: false,
      adoptionRate: 68,
      usageCount: 2400,
      overviewId: "active-avg",
      contentId: "social-heavy",
      insightsId: "avg-perf",
      adoptionId: "avg",
      createdAt: "2025-11-20",
      startDate: "2025-05-01",
      endDate: "2026-05-01",
      createdBy: {
        name: getMember("u-admin").name,
        avatar: getMember("u-admin").avatarUrl,
      },
    },
    // 17. Active
    {
      id: "camp-017",
      title: "Gemstone Gala",
      description: "Colorful stones for the season.",
      status: "Active",
      coverImage: coverImage_17,
      cover: "bg-indigo-100",
      audience: "All Retailers",
      isPinned: false,
      updatePending: false,
      adoptionRate: 30,
      usageCount: 400,
      overviewId: "active-low",
      contentId: "full-content",
      insightsId: "med-perf", // Maps to med-perf below if added
      adoptionId: "poor",
      createdAt: "2025-11-19",
      startDate: "2025-11-01",
      endDate: "2026-01-31",
      createdBy: {
        name: getMember("u-guest").name,
        avatar: getMember("u-guest").avatarUrl,
      },
    },
  ],

  // Global Mock Templates/Files for List Views
  publishableContent: [
    { id: "t-1", type: "social", platforms: ["instagram", "facebook"] },
    { id: "t-2", type: "email" },
    { id: "t-3", type: "sms" },
    { id: "t-x", type: "social", platforms: ["x"] },
    { id: "t-x-google", type: "social", platforms: ["x", "google"] },
    { id: "t-ins-x", type: "social", platforms: ["instagram", "x"] },
    {
      id: "t-ins-x-google",
      type: "social",
      platforms: ["instagram", "x", "google"],
    },
    {
      id: "t-all-social",
      type: "social",
      platforms: ["instagram", "facebook", "x", "google"],
    },
  ],
  downloadableFiles: [],

  // 2. Tab Data: Overview Maps
  overviewMap: {
    draft: {
      status: "Draft",
      completion: 25,
      nextStep: "Upload Assets",
      timeline: { start: null, end: null },
      summary: "Campaign is in setup phase.",
      metrics: null,
    },
    scheduled: {
      status: "Scheduled",
      completion: 100,
      nextStep: "Auto-publish on Jan 5",
      timeline: { start: "2026-01-05", end: "2026-02-28" },
      summary: "Ready for launch. All assets approved.",
      metrics: null, // Scheduled usually matches Draft/Empty metrics until live
    },
    "active-high": {
      status: "Active",
      completion: 100,
      nextStep: "Monitor Performance",
      timeline: { start: "2025-11-15", end: "2026-01-15" },
      summary: "Performing above average. Strong adoption in Northeast.",
      metrics: {
        retailersActive: 142,
        totalRetailers: 180,
        adoptionRate: 78,
        totalViews: 4520,
        downloads: 3450,
        shares: 1200,
        timeLeft: "22 Days", // Optional override
      },
      needsAttention: [
        { name: "Nordstrom (Seattle)", adoptionRate: 10, lastActive: "2d ago" },
        { name: "Macy's (Herald Sq)", adoptionRate: 15, lastActive: "4h ago" },
        {
          name: "Bloomingdale's (SoHo)",
          adoptionRate: 20,
          lastActive: "1d ago",
        },
      ],
      topPerformingContent: [
        {
          title: "Summer_Vibe_Post_01",
          type: "image",
          metricLabel: "Most Shared",
          thumbnail: coverImage_1,
        },
        {
          title: "Lookbook_2025.pdf",
          type: "file",
          metricLabel: "Most Downloaded",
          thumbnail: coverImage_4, // Using a different cover as thumbnail mock
        },
      ],
      activityFeed: [
        {
          id: 1,
          retailer: "Neiman Marcus",
          initials: "NM",
          action: "sent the Email Campaign.",
          time: "15 mins ago",
        },
        {
          id: 2,
          retailer: "Galeries Lafayette",
          initials: "GL",
          action: "downloaded Lookbook.pdf.",
          time: "30 mins ago",
        },
        {
          id: 3,
          retailer: "Saks Fifth Avenue",
          initials: "SFA",
          action: "published to Instagram.",
          time: "45 mins ago",
        },
        {
          id: 4,
          retailer: "Lane Crawford",
          initials: "LC",
          action: "viewed the campaign.",
          time: "1 hour ago",
        },
        {
          id: 5,
          retailer: "Bergdorf Goodman",
          initials: "BG",
          action: "shared on Facebook.",
          time: "1 hour ago",
        },
      ],
    },
    "active-avg": {
      status: "Active",
      completion: 100,
      nextStep: "Boost Adoption",
      timeline: { start: "2025-07-01", end: "2025-09-30" },
      summary:
        "Steady performance. Suggest re-sending invite to inactive retailers.",
      metrics: {
        retailersActive: 85,
        totalRetailers: 180,
        adoptionRate: 47,
        totalViews: 2100,
        downloads: 1200,
        shares: 450,
        timeLeft: "45 Days",
      },
      needsAttention: [
        {
          name: "Ben Bridge (Bellevue)",
          adoptionRate: 5,
          lastActive: "5d ago",
        },
        {
          name: "Helzberg (Disney Springs)",
          adoptionRate: 12,
          lastActive: "1w ago",
        },
        { name: "Reeds (Wilmington)", adoptionRate: 18, lastActive: "3d ago" },
      ],
      topPerformingContent: [
        {
          title: "Holiday_Promo_Video.mp4",
          type: "video",
          metricLabel: "Most Viewed",
          thumbnail: coverImage_2,
        },
        {
          title: "Engagement_Ring_Guide.pdf",
          type: "file",
          metricLabel: "Most Downloaded",
          thumbnail: coverImage_5,
        },
      ],
      activityFeed: [
        {
          id: 1,
          retailer: "Neiman Marcus",
          initials: "NM",
          action: "sent the Email Campaign.",
          time: "15 mins ago",
        },
        {
          id: 2,
          retailer: "Galeries Lafayette",
          initials: "GL",
          action: "downloaded Lookbook.pdf.",
          time: "30 mins ago",
        },
      ],
    },
    "ended-avg": {
      // Added this new key referenced in Camp 4
      status: "Ended",
      completion: 100,
      nextStep: "View Final Report",
      timeline: { start: "2025-07-01", end: "2025-09-30" },
      summary: "Campaign concluded with average engagement.",
      metrics: {
        retailersActive: 70,
        totalRetailers: 180,
        adoptionRate: 38,
        totalViews: 1800,
        downloads: 900,
        shares: 300,
        finalRoi: "2.1x",
        timeLeft: "Ended",
      },
    },
    "ended-high": {
      status: "Ended",
      completion: 100,
      nextStep: "View Final Report",
      timeline: { start: "2025-03-01", end: "2025-04-30" },
      summary: "Campaign concluded with record engagement.",
      metrics: {
        retailersActive: 165,
        totalRetailers: 180,
        adoptionRate: 92,
        downloads: 5600,
        shares: 2300,
        finalRoi: "4.5x",
      },
    },
  },

  // 3. Tab Data: Content Maps (Assets)
  contentMap: {
    "draft-empty": {
      id: "draft-empty",
      publishable: [],
      downloadable: [],
    },
    "full-content": {
      id: "full-content",
      publishable: [
        {
          id: "t-soc-1",
          type: "social post",
          platform: ["instagram", "facebook"],
          caption: "Discover the new Winter Collection. Elegant. Timeless.",
          image:
            "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=1000&auto=format&fit=crop",
          lastEdited: "2 days ago",
        },
        {
          id: "t-soc-2",
          type: "social post",
          platform: ["x", "google business profile"],
          caption: "New arrivals valid until Feb 28.",
          lastEdited: "2 days ago",
        },
        {
          id: "t-email-1",
          type: "email",
          subject: "Exclusive Preview: Winter Bridal 2026",
          previewText: "Be the first to showcase our latest masterpieces...",
          lastEdited: "1 week ago",
        },
        {
          id: "t-sms-1",
          type: "sms",
          message:
            "Verragio: New Winter Collection is here! Check your portal for exclusive assets.",
          lastEdited: "1 week ago",
        },
      ],
      downloadable: Array.from({ length: 10 }).map((_, i) => ({
        id: `f-full-${i}`,
        name:
          i === 0 ? "Campaign_Master_Pack.zip" : `HighRes_Image_${i + 1}.jpg`,
        type: i === 0 ? "ZIP" : "Image",
        size: i === 0 ? "450 MB" : "12 MB",
        lastActivity: "3 days ago",
      })),
    },
    "social-heavy": {
      id: "social-heavy",
      publishable: [
        {
          id: "t-soc-h-1",
          type: "social post",
          platform: ["instagram"],
          caption: "Flash Sale starts tomorrow!",
          image: coverImage_4,
          lastEdited: "5 hours ago",
        },
        {
          id: "t-soc-h-2",
          type: "social post",
          platform: ["facebook", "x"],
          caption: "Don't miss out on our seasonal favorites.",
          lastEdited: "5 hours ago",
        },
      ],
      downloadable: Array.from({ length: 6 }).map((_, i) => ({
        id: `f-soc-${i}`,
        name: `Social_Asset_${i + 1}.png`,
        type: "Image",
        size: "5 MB",
        lastActivity: "1 day ago",
      })),
    },
    "files-only": {
      id: "files-only",
      publishable: [],
      downloadable: Array.from({ length: 15 }).map((_, i) => ({
        id: `f-only-${i}`,
        name:
          i % 2 === 0
            ? `Product_Spec_Sheet_${i + 1}.pdf`
            : `Marketing_Asset_${i + 1}.jpg`,
        type: i % 2 === 0 ? "PDF" : "Image",
        size: i % 2 === 0 ? "2 MB" : "15 MB",
        lastActivity: "1 week ago",
      })),
    },
    "email-only": {
      id: "email-only",
      publishable: [
        {
          id: "t-email-1",
          type: "email",
          subject: "Exclusive Preview: Winter Bridal 2026",
          previewText: "Be the first to showcase our latest masterpieces...",
          lastEdited: "1 week ago",
        },
      ],
      downloadable: [],
    },
  },

  // 4. Tab Data: Adoption Maps (Retailers)
  adoptionMap: {
    good: {
      id: "good",
      totalInvited: 32,
      joined: 32,
      adoptionRate: 100,
      needsAttentionCount: 0,
      zeroActionCount: 0,

      // Top Advocates: 5
      topAdvocates: [
        {
          id: "ta1",
          name: "Saks Fifth Avenue",
          avatar:
            "https://images.unsplash.com/photo-1541577141970-eebc83ebe30e?w=100&h=100&fit=crop",
          tier: "Platinum",
        },
        {
          id: "ta2",
          name: "Neiman Marcus",
          avatar:
            "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&h=100&fit=crop",
          tier: "Platinum",
        },
        {
          id: "ta3",
          name: "Bergdorf Goodman",
          avatar:
            "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=100&h=100&fit=crop",
          tier: "Gold",
        },
        {
          id: "ta4",
          name: "Nordstrom",
          avatar:
            "https://images.unsplash.com/photo-1485290334039-a3c69043e541?w=100&h=100&fit=crop",
          tier: "Gold",
        },
        {
          id: "ta5",
          name: "Bloomingdales",
          avatar:
            "https://images.unsplash.com/photo-1520810627419-35e362c5dc07?w=100&h=100&fit=crop",
          tier: "Gold",
        },
      ],

      // Full List (32 items)
      list: Array.from({ length: 32 }).map((_, i) => {
        const luxuryRetailers = [
          "Saks Fifth Avenue",
          "Neiman Marcus",
          "Bergdorf Goodman",
          "Nordstrom",
          "Bloomingdales",
          "Harrods",
          "Selfridges",
          "Lane Crawford",
          "Galeries Lafayette",
          "Holt Renfrew",
          "David Jones",
          "Myer",
          "TsUM",
          "La Rinascente",
          "KaDeWe",
          "Isetan",
          "Takashimaya",
          "Hankyu",
          "SKP Beijing",
          "The Hour Glass",
          "Cortina Watch",
          "Seddiqi & Sons",
          "Bucherer",
          "Wempe",
          "Watches of Switzerland",
          "Mayors",
          "Ben Bridge",
          "Harding & Co",
          "London Jewelers",
          "Reeds Jewelers",
          "Govberg",
          "Westime",
        ];
        return {
          id: `r-good-${i}`,
          name: luxuryRetailers[i] || `Retailer ${i + 1}`,
          tier: i < 10 ? "Platinum" : i < 20 ? "Gold" : "Silver",
          status: "Participated", // Critical Fix: Capitalized
          usage:
            i < 20
              ? { social: true, email: true, downloads: true }
              : { social: true, email: false, downloads: true }, // Mixed usage
          impact: i < 10 ? "2.4k Reach" : "1.2k Reach",
          lastActive: "2 hours ago",
        };
      }),
    },

    avg: {
      id: "avg",
      totalInvited: 50,
      joined: 35, // 70%
      adoptionRate: 70,
      needsAttentionCount: 15, // 30%
      zeroActionCount: 15, // Same group usually

      // Top Advocates: 3
      topAdvocates: [
        { id: "ta1", name: "Harrods", tier: "Platinum" },
        { id: "ta2", name: "Selfridges", tier: "Platinum" },
        { id: "ta3", name: "Lane Crawford", tier: "Gold" },
      ],

      // Full List (50 items: 35 Active, 15 Inactive)
      list: Array.from({ length: 50 }).map((_, i) => {
        const luxuryRetailers = [
          "Harrods",
          "Selfridges",
          "Lane Crawford",
          "Galeries Lafayette",
          "Holt Renfrew",
          "Saks Fifth Avenue",
          "Neiman Marcus",
          "Bergdorf Goodman",
          "Nordstrom",
          "Bloomingdales",
          "David Jones",
          "Myer",
          "TsUM",
          "La Rinascente",
          "KaDeWe",
          "Isetan",
          "Takashimaya",
          "Hankyu",
          "SKP Beijing",
          "The Hour Glass",
          "Cortina Watch",
          "Seddiqi & Sons",
          "Bucherer",
          "Wempe",
          "Watches of Switzerland",
          "Mayors",
          "Ben Bridge",
          "Harding & Co",
          "London Jewelers",
          "Reeds Jewelers",
          "Govberg",
          "Westime",
          "Patek Salon",
          "Rolex Boutique",
          "Cartier Mansion",
          "Van Cleef & Arpels",
          "Tiffany & Co.",
          "Bulgari",
          "Chopard",
          "Graff",
          "Harry Winston",
          "Piaget",
          "Breguet",
          "Audemars Piguet",
          "Vacheron Constantin",
          "Jaeger-LeCoultre",
          "Omega",
          "IWC",
          "Panerai",
          "Hublot",
        ];
        // Logic:
        // 0-34 (35): Participated (High tiers)
        // 35-39 (5): Viewed (Should include some high tiers for Needs Attention)
        // 40-49 (10): Unopened (Should include some high tiers for Needs Attention)

        let tier = "Silver";
        if (i < 10) tier = "Platinum";
        else if (i < 25) tier = "Gold";
        else if (i >= 40) tier = "Platinum"; // Force high tier for unopened to show in Needs Attention

        let status = "Participated";
        if (i >= 35 && i < 40) status = "Viewed";
        if (i >= 40) status = "Unopened";

        const name = luxuryRetailers[i] || `Retailer ${i + 1}`;

        return {
          id: `r-avg-${i}`,
          name,
          tier,
          status,
          usage: i < 35 ? { social: i % 2 === 0, email: true } : {},
          impact: i < 35 ? "1.2k Reach" : "-",
          lastActive: i < 35 ? "Yesterday" : i < 40 ? "3 days ago" : "-",
        };
      }),
    },

    poor: {
      id: "poor",
      totalInvited: 120,
      joined: 48, // 40%
      adoptionRate: 40,
      needsAttentionCount: 72, // 60%
      zeroActionCount: 72,

      // Top Advocates: 0
      topAdvocates: [],

      // Full List (120 items: 48 Active, 72 Inactive)
      list: Array.from({ length: 120 }).map((_, i) => {
        const luxuryRetailers = [
          "Saks Fifth Avenue",
          "Neiman Marcus",
          "Bergdorf Goodman",
          "Nordstrom",
          "Bloomingdales",
          "Harrods",
          "Selfridges",
          "Lane Crawford",
          "Galeries Lafayette",
          "Holt Renfrew",
          "David Jones",
          "Myer",
          "TsUM",
          "La Rinascente",
          "KaDeWe",
          "Isetan",
          "Takashimaya",
          "Hankyu",
          "SKP Beijing",
          "The Hour Glass",
          "Cortina Watch",
          "Seddiqi & Sons",
          "Bucherer",
          "Wempe",
          "Watches of Switzerland",
          "Mayors",
          "Ben Bridge",
          "Harding & Co",
          "London Jewelers",
          "Reeds Jewelers",
          "Govberg",
          "Westime",
          "Patek Salon",
          "Rolex Boutique",
          "Cartier Mansion",
          "Van Cleef & Arpels",
          "Tiffany & Co.",
          "Bulgari",
          "Chopard",
          "Graff",
          "Harry Winston",
          "Piaget",
          "Breguet",
          "Audemars Piguet",
          "Vacheron Constantin",
          "Jaeger-LeCoultre",
          "Omega",
          "IWC",
          "Panerai",
          "Hublot",
          "Richard Mille",
          "F.P. Journe",
        ];

        // 0-47: Participated
        // 48-59: Viewed
        // 60-119: Unopened

        let tier = "Silver";
        if (i < 15) tier = "Platinum";
        else if (i >= 48 && i < 55) tier = "Gold"; // Needs Attention candidates
        else if (i >= 60 && i < 70) tier = "Platinum"; // Needs Attention candidates

        let status = "Participated";
        if (i >= 48 && i < 60) status = "Viewed";
        if (i >= 60) status = "Unopened";

        return {
          id: `r-poor-${i}`,
          name:
            luxuryRetailers[i % luxuryRetailers.length] || `Retailer ${i + 1}`,
          tier,
          status,
          usage: i < 48 ? { downloads: true } : {},
          impact: i < 48 ? "500 Reach" : "-",
          lastActive: i < 48 ? "Last week" : "-",
        };
      }),
    },
  },

  // 5. Tab Data: Insights Maps (Performance)
  insightsMap: {
    empty: {
      hasData: false,
      message: "No performance data available yet.",
    },
    "high-perf": {
      hasData: true,
      totalReach: "1.2M",
      engagementRate: "4.8%",
      topRetailer: "Saks NYC",
      bestChannel: "Instagram",
      // Rich Content for ContentInsightsTab
      socialContent: [
        {
          id: "post-1",
          title: "Summer Collection Launch",
          thumbnail:
            "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=100&h=100&fit=crop",
          platforms: ["instagram", "facebook"],
          totalShares: 445,
          estReach: 45000,
          avgEngagement: 4.8,
          details: [
            { platform: "instagram", shares: 85, likes: 3200, comments: 145 },
            { platform: "facebook", shares: 35, reactions: 850, comments: 42 },
          ],
        },
        {
          id: "post-2",
          title: "Behind the Scenes Video",
          thumbnail:
            "https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?w=100&h=100&fit=crop",
          platforms: ["twitter", "instagram"],
          totalShares: 280,
          estReach: 125000,
          avgEngagement: 7.2,
          details: [
            { platform: "twitter", shares: 190, views: 85000, likes: 12400 },
            { platform: "instagram", shares: 90, views: 32000, likes: 4500 },
          ],
        },
        {
          id: "post-3",
          title: "Store Event Promo",
          thumbnail:
            "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=100&h=100&fit=crop",
          platforms: ["google_business"],
          totalShares: 45,
          estReach: 12000,
          avgEngagement: 3.5,
          details: [
            {
              platform: "google_business",
              shares: 45,
              views: 8500,
              clicks: 320,
            },
          ],
        },
      ],
      emailContent: [
        {
          id: "email-1",
          subject: "VIP Invite: Summer Preview",
          sent: 450,
          openRate: 45,
          clickRate: 12,
          usageCount: 15,
        },
        {
          id: "email-2",
          subject: "Last Chance for Early Access",
          sent: 320,
          openRate: 38,
          clickRate: 8,
          usageCount: 10,
        },
        {
          id: "email-3",
          subject: "New Arrivals are Here",
          sent: 580,
          openRate: 25,
          clickRate: 4,
          usageCount: 22,
        },
      ],
      smsContent: [
        {
          id: "sms-1",
          message: "Your exclusive access code is here! Shop now.",
          sent: 1200,
          deliveryRate: 98.5,
          clickRate: 18.2,
          usageCount: 45,
        },
        {
          id: "sms-2",
          message: "Flash Sale starts in 1 hour. Don't miss out.",
          sent: 850,
          deliveryRate: 99.1,
          clickRate: 22.5,
          usageCount: 32,
        },
      ],
      assetContent: [
        {
          id: "asset-1",
          name: "Lookbook_Q3_2024.pdf",
          type: "PDF",
          size: "15 MB",
          downloads: 145,
          coverage: 80,
          lastActivity: "2h ago",
        },
        {
          id: "asset-2",
          name: "Campaign_Video_Main.mp4",
          type: "Video",
          size: "45 MB",
          downloads: 89,
          coverage: 65,
          lastActivity: "5h ago",
        },
        {
          id: "asset-3",
          name: "Social_Assets_Pack.zip",
          type: "ZIP",
          size: "128 MB",
          downloads: 210,
          coverage: 92,
          lastActivity: "10m ago",
        },
        {
          id: "asset-4",
          name: "Product_Shot_01.jpg",
          type: "Image",
          size: "2.4 MB",
          downloads: 56,
          coverage: 40,
          lastActivity: "1d ago",
        },
        {
          id: "asset-5",
          name: "Product_Shot_02.jpg",
          type: "Image",
          size: "2.2 MB",
          downloads: 48,
          coverage: 35,
          lastActivity: "1d ago",
        },
      ],
    },
    "avg-perf": {
      hasData: true,
      totalReach: "450K",
      engagementRate: "2.1%",
      topRetailer: "Nordstrom",
      bestChannel: "Email",
      // Rich Content for ContentInsightsTab
      socialContent: [
        {
          id: "post-1",
          title: "Summer Collection Launch",
          thumbnail:
            "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=100&h=100&fit=crop",
          platforms: ["instagram", "facebook"],
          totalShares: 445,
          estReach: 45000,
          avgEngagement: 4.8,
          details: [
            { platform: "instagram", shares: 85, likes: 3200, comments: 145 },
            { platform: "facebook", shares: 35, reactions: 850, comments: 42 },
          ],
        },
        {
          id: "post-2",
          title: "Behind the Scenes Video",
          thumbnail:
            "https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?w=100&h=100&fit=crop",
          platforms: ["twitter", "instagram"],
          totalShares: 280,
          estReach: 125000,
          avgEngagement: 7.2,
          details: [
            { platform: "twitter", shares: 190, views: 85000, likes: 12400 },
            { platform: "instagram", shares: 90, views: 32000, likes: 4500 },
          ],
        },
        {
          id: "post-3",
          title: "Store Event Promo",
          thumbnail:
            "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=100&h=100&fit=crop",
          platforms: ["google_business"],
          totalShares: 45,
          estReach: 12000,
          avgEngagement: 3.5,
          details: [
            {
              platform: "google_business",
              shares: 45,
              views: 8500,
              clicks: 320,
            },
          ],
        },
      ],
      emailContent: [
        {
          id: "email-1",
          subject: "VIP Invite: Summer Preview",
          sent: 450,
          openRate: 45,
          clickRate: 12,
          usageCount: 15,
        },
        {
          id: "email-2",
          subject: "Last Chance for Early Access",
          sent: 320,
          openRate: 38,
          clickRate: 8,
          usageCount: 10,
        },
        {
          id: "email-3",
          subject: "New Arrivals are Here",
          sent: 580,
          openRate: 25,
          clickRate: 4,
          usageCount: 22,
        },
      ],
      smsContent: [
        {
          id: "sms-1",
          message: "Your exclusive access code is here! Shop now.",
          sent: 1200,
          deliveryRate: 98.5,
          clickRate: 18.2,
          usageCount: 45,
        },
        {
          id: "sms-2",
          message: "Flash Sale starts in 1 hour. Don't miss out.",
          sent: 850,
          deliveryRate: 99.1,
          clickRate: 22.5,
          usageCount: 32,
        },
      ],
      assetContent: [
        {
          id: "asset-1",
          name: "Lookbook_Q3_2024.pdf",
          type: "PDF",
          size: "15 MB",
          downloads: 145,
          coverage: 80,
          lastActivity: "2h ago",
        },
        {
          id: "asset-2",
          name: "Campaign_Video_Main.mp4",
          type: "Video",
          size: "45 MB",
          downloads: 89,
          coverage: 65,
          lastActivity: "5h ago",
        },
        {
          id: "asset-3",
          name: "Social_Assets_Pack.zip",
          type: "ZIP",
          size: "128 MB",
          downloads: 210,
          coverage: 92,
          lastActivity: "10m ago",
        },
        {
          id: "asset-4",
          name: "Product_Shot_01.jpg",
          type: "Image",
          size: "2.4 MB",
          downloads: 56,
          coverage: 40,
          lastActivity: "1d ago",
        },
        {
          id: "asset-5",
          name: "Product_Shot_02.jpg",
          type: "Image",
          size: "2.2 MB",
          downloads: 48,
          coverage: 35,
          lastActivity: "1d ago",
        },
      ],
    },
  },
};
