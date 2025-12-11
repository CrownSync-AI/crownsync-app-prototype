import { fileStore, getFileById } from "./fileStore";

// Initial Mock Data for Download History
// This simulates the log of what the retailer has downloaded.

const generateMockHistory = () => {
  const users = [
    "Sarah Jenkins",
    "Mike Store Manager",
    "Eleanor Pena",
    "Ralph Edwards",
    "Cody Fisher",
  ];
  const brands = ["b-verragio", "b-rolex", "b-cartier"];
  const sources = [
    { type: "campaign", title: "Spring Renew" },
    { type: "campaign", title: "Autumn Gold" },
    { type: "campaign", title: "Holiday 2024" },
    { type: "resource", title: "Visual Merchandising 2025" },
    { type: "resource", title: "Staff Training Manuals" },
    { type: "resource", title: "Brand Guidelines" },
  ];

  // Base manual items for specific scenarios testing - DATES SET TO NOW TO ENSURE TOP OF LIST
  const now = new Date();
  const oneHourAgo = new Date(now.getTime() - 60 * 60 * 1000).toISOString();
  const twoHoursAgo = new Date(
    now.getTime() - 2 * 60 * 60 * 1000
  ).toISOString();
  const threeHoursAgo = new Date(
    now.getTime() - 3 * 60 * 60 * 1000
  ).toISOString();
  const yesterday = new Date(now.getTime() - 24 * 60 * 60 * 1000).toISOString();

  const manualItems = [
    {
      id: "dh-001",
      fileId: "f-img-1", // Image with thumbnail -> LATEST
      brandId: "b-verragio",
      sourceType: "campaign",
      sourceTitle: "Spring Renew",
      downloadedAt: oneHourAgo,
      downloadedBy: "Sarah Jenkins",
      versionDownloaded: "v1.0",
      currentVersionStatus: "latest",
      frequency: 2,
    },
    {
      id: "dh-002",
      fileId: "f-updated-01", // Update Available -> UPDATE
      brandId: "b-verragio",
      sourceType: "resource",
      sourceTitle: "Staff Training Manuals",
      downloadedAt: twoHoursAgo,
      downloadedBy: "Mike Store Manager",
      versionDownloaded: "v1.0",
      currentVersionStatus: "update_available",
      frequency: 1,
    },
    {
      id: "dh-test-pdf",
      fileId: "f-pdf-test", // REACT-PDF Test
      brandId: "b-verragio",
      sourceType: "campaign",
      sourceTitle: "Technical Specs",
      downloadedAt: new Date(now.getTime() - 2 * 60 * 1000).toISOString(), // 2 mins ago
      downloadedBy: "Me",
      versionDownloaded: "v1.2",
      currentVersionStatus: "latest",
      frequency: 3,
      logs: [
        {
          userName: "Sarah Jenkins",
          date: new Date(now.getTime() - 2 * 60 * 1000).toISOString(),
          status: "Latest",
        },
        {
          userName: "Mike Ross",
          date: new Date(now.getTime() - 45 * 60 * 1000).toISOString(),
          status: "Latest",
        },
        {
          userName: "Tom Ford",
          date: new Date(now.getTime() - 120 * 60 * 1000).toISOString(),
          status: "Latest",
        },
      ],
    },
    {
      id: "dh-test-webp",
      fileId: "f-webp-test", // WebP Test
      brandId: "b-cartier",
      sourceType: "campaign",
      sourceTitle: "Homepage Banner",
      downloadedAt: new Date(now.getTime() - 5 * 60 * 1000).toISOString(), // 5 mins ago
      downloadedBy: "Me",
      versionDownloaded: "v1.0",
      currentVersionStatus: "latest",
      frequency: 1,
      // No logs array implied = Single record (handled in UI logic)
    },
    {
      id: "dh-test-jpg",
      fileId: "f-jpg-test", // JPG Test
      brandId: "b-verragio",
      sourceType: "campaign",
      sourceTitle: "Lifestyle Shot",
      downloadedAt: new Date(now.getTime() - 10 * 60 * 1000).toISOString(), // 10 mins ago
      downloadedBy: "Me",
      versionDownloaded: "v1.0",
      currentVersionStatus: "latest",
      frequency: 5,
      logs: [
        {
          userName: "Sarah Jenkins",
          date: "2025-10-27T10:00:00Z",
          status: "Latest",
        },
        { userName: "Me", date: "2025-10-26T14:30:00Z", status: "Latest" },
        {
          userName: "Mike Ross",
          date: "2025-10-24T14:00:00Z",
          status: "Previous",
        },
        {
          userName: "Tom Ford",
          date: "2025-10-20T09:00:00Z",
          status: "Previous",
        },
        {
          userName: "Jessica Pearson",
          date: "2025-10-18T16:45:00Z",
          status: "Previous",
        },
      ],
    },
    {
      id: "dh-003",
      fileId: "f-deleted-01", // Deleted PDF -> DELETED
      brandId: "b-verragio",
      sourceType: "resource",
      sourceTitle: "2024 Planning Archive",
      downloadedAt: threeHoursAgo,
      downloadedBy: "Sarah Jenkins",
      versionDownloaded: "v1.0",
      currentVersionStatus: "source_deleted",
      frequency: 5,
    },
    {
      id: "dh-004-video",
      fileId: "f15", // Video -> LATEST
      brandId: "b-cartier",
      sourceType: "resource",
      sourceTitle: "Sales Training",
      downloadedAt: new Date(now.getTime() - 10 * 60 * 1000).toISOString(), // 10 mins ago
      downloadedBy: "Sarah Jenkins",
      versionDownloaded: "v1.0",
      currentVersionStatus: "latest",
      frequency: 3,
    },
    {
      id: "dh-004",
      fileId: "f-img-deleted", // Deleted Image -> DELETED
      brandId: "b-rolex",
      sourceType: "resource",
      sourceTitle: "2024 Planning Archive",
      downloadedAt: yesterday,
      downloadedBy: "Cody Fisher",
      versionDownloaded: "v1.0",
      currentVersionStatus: "source_deleted",
      frequency: 1,
    },
  ];

  const generatedItems = [];
  // Adjusted distribution: More Images/Videos/PDFs, fewer ZIPs
  const startFileIds = [
    "f-img-1",
    "f-img-2", // Images
    "f1",
    "f3",
    "f6",
    "f10",
    "f11",
    "f14",
    "f16", // PDFs
    "f2",
    "f12", // More Images
    "f15", // Video
    "f-full-1", // Keep one ZIP
  ]; // From fileStore & resourceStore

  for (let i = 0; i < 26; i++) {
    const fileId = startFileIds[i % startFileIds.length];
    const brand = brands[Math.floor(Math.random() * brands.length)];
    const source = sources[Math.floor(Math.random() * sources.length)];
    const user = users[Math.floor(Math.random() * users.length)];
    // Random time within last 30 days, avoiding "now" to keep manual items at top
    const daysAgo = Math.floor(Math.random() * 29) + 1;
    const date = new Date();
    date.setDate(date.getDate() - daysAgo);
    date.setHours(
      Math.floor(Math.random() * 24),
      Math.floor(Math.random() * 60)
    );

    generatedItems.push({
      id: `dh-gen-${i}`,
      fileId: fileId,
      brandId: brand,
      sourceType: source.type,
      sourceTitle: source.title,
      downloadedAt: date.toISOString(),
      downloadedBy: user,
      versionDownloaded: "v1.0",
      currentVersionStatus: "latest",
      frequency: Math.floor(Math.random() * 10) + 1,
    });
  }

  return [...manualItems, ...generatedItems].sort(
    (a, b) => new Date(b.downloadedAt) - new Date(a.downloadedAt)
  );
};

const initialHistory = generateMockHistory();

// In a real app, this would be a Zustand store or Context
// For prototype, we export a mutable array and helper functions

export const downloadHistoryData = [...initialHistory];

export const getDownloadHistory = () => {
  // Enrich history with fresh file metadata from fileStore
  return downloadHistoryData
    .map((item) => {
      const file = getFileById(item.fileId);
      return {
        ...item,
        file: file || { name: "Unknown File", type: "unknown", size: 0 }, // Fallback
      };
    })
    .sort((a, b) => new Date(b.downloadedAt) - new Date(a.downloadedAt));
};

export const addDownloadLog = (
  fileId,
  brandId,
  sourceType,
  sourceTitle,
  userName = "Sarah Jenkins"
) => {
  // 1. Check if exists
  const existingIndex = downloadHistoryData.findIndex(
    (d) => d.fileId === fileId
  );

  // 2. Mock current timestamp
  const now = new Date().toISOString(); // Real-time for interaction

  if (existingIndex !== -1) {
    // Update existing log and move to top (Aggregation)
    const existing = downloadHistoryData[existingIndex];
    const updatedLog = {
      ...existing,
      downloadedAt: now,
      downloadedBy: userName,
      frequency: existing.frequency + 1,
      versionDownloaded:
        "v" +
        (parseFloat(existing.versionDownloaded.replace("v", "")) + 0.1).toFixed(
          1
        ), // Mock version bump if it was update_available
      currentVersionStatus:
        existing.currentVersionStatus === "update_available"
          ? "latest"
          : existing.currentVersionStatus,
    };

    // Remove old entry and unshift updated one
    downloadHistoryData.splice(existingIndex, 1);
    downloadHistoryData.unshift(updatedLog);
  } else {
    // Create new log
    downloadHistoryData.unshift({
      id: `dh-${Date.now()}`,
      fileId,
      brandId,
      sourceType,
      sourceTitle,
      downloadedAt: now,
      downloadedBy: userName,
      versionDownloaded: "v1.0",
      currentVersionStatus: "latest",
      frequency: 1,
    });
  }
};
