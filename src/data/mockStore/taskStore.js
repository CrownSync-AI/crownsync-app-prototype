// --- Reusable Mock Data ---

const creators = {
  marketing: {
    name: "Sarah Jenkins",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=60",
    role: "Marketing Director",
  },
  visual: {
    name: "Marc Andre",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=60",
    role: "Visual Merchandising Lead",
  },
  system: {
    name: "System",
    avatar: null,
    role: "Automated",
  },
  sales: {
    name: "Jessica Lee",
    avatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=60",
    role: "Sales Operations",
  },
};

const mockSubmissionsPool = [
  {
    id: "s-001",
    retailerId: "r1",
    retailerName: "The Luxury Boutique",
    retailerAvatar:
      "https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?q=80&w=150",
    tier: "Platinum",
    zone: "West",
    date: "2025-12-05 14:30",
    status: "Pending",
    image:
      "https://plus.unsplash.com/premium_photo-1709033404514-c3953af680b4?q=80&w=800",
    comment: "Setup complete. Please advise on lighting for the corner case.",
  },
  {
    id: "s-002",
    retailerId: "r2",
    retailerName: "Global Retail Inc",
    retailerAvatar:
      "https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?w=100&auto=format&fit=crop&q=60",
    tier: "Gold",
    zone: "Northeast",
    date: "2025-12-06 09:15",
    status: "Approved",
    image:
      "https://images.unsplash.com/photo-1618713041735-adb0de8316ea?q=80&w=700",
    comment: "Looks great in the morning light!",
  },
  {
    id: "s-003",
    retailerId: "r7",
    retailerName: "London Fashion",
    retailerAvatar:
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=100&auto=format&fit=crop&q=60",
    tier: "Silver",
    zone: "Southeast",
    date: "2025-12-07 11:20",
    status: "Rejected",
    image:
      "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=600&auto=format&fit=crop&q=60",
    comment: "We used the older signage because the new kit hasn’t arrived.",
    rejectionReason: "Please wait for the new kit. Do not use 2024 branding.",
  },
  {
    id: "s-004",
    retailerId: "r4",
    retailerName: "Nordic Style",
    retailerAvatar: null,
    tier: "Silver",
    zone: "Midwest",
    date: "2025-12-08 10:00",
    status: "Pending",
    image:
      "https://images.unsplash.com/photo-1522001947148-8b4dfe064edc?q=80&w=600",
    comment: "Ready for holiday season!",
  },
  {
    id: "s-005",
    retailerId: "r5",
    retailerName: "Dubai Luxury",
    retailerAvatar:
      "https://plus.unsplash.com/premium_photo-1682216872195-0bfacc36b02c?q=80&w=100",
    tier: "Platinum",
    zone: "Southwest",
    date: "2025-12-08 11:45",
    status: "Pending",
    image:
      "https://plus.unsplash.com/premium_photo-1724075864074-6143de3397c7?q=80&w=500",
    comment: "Awaiting final approval.",
  },
  {
    id: "s-006",
    retailerId: "r6",
    retailerName: "Chicago Gem Co.",
    retailerAvatar:
      "https://images.unsplash.com/photo-1550927312-3af5c5656390?w=100&auto=format&fit=crop&q=60",
    tier: "Gold",
    zone: "Midwest",
    date: "2025-12-09 08:30",
    status: "Approved",
    image:
      "https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?q=80&w=600",
    comment: "",
  },
];

// Helper to get random submissions variations
const getSubmissions = (count = 5) => {
  // Return a sliced or mixed version of the pool
  return mockSubmissionsPool.slice(0, count);
};

export const taskData = {
  tasks: [
    // 1. Visual Merchandising (Holiday)
    {
      id: "t-001",
      title: "Holiday Window Display Setup",
      description:
        'Implement the "Venetian Winter" guidelines. Main focus: Center the Verragio logo riser, use the white/gold velvet props, and ensure the snowflake decals are applied to the top 1/3 of the glass only. Upload a photo of the exterior window during daytime.',
      priority: "High",
      deadline: "2025-12-15",
      audience: "All Retailers",
      audienceCount: 156,
      completionRate: 68,
      status: "Active",
      verificationType: "photo",
      campaignId: "c-001",
      createdAt: "2025-12-01",
      createdBy: creators.visual,
      submissions: getSubmissions(5),
    },
    // 2. Marketing (Social Media)
    {
      id: "t-002",
      title: "Social Campaign: #VerragioLove Stories",
      description:
        "Post 3 Instagram Stories featuring a real proposal or a customer trying on a ring. Must use the hashtag #VerragioLove and tag @Verragio. Upload a screenshot of the story analytics or the story itself.",
      priority: "Normal",
      deadline: "2025-12-20",
      audience: "All Retailers",
      audienceCount: 156,
      completionRate: 45,
      status: "Active",
      verificationType: "photo",
      campaignId: "c-002",
      createdAt: "2025-12-05",
      createdBy: creators.marketing,
      submissions: getSubmissions(3),
    },
    // 3. Training & Certification
    {
      id: "t-003",
      title: "Staff Training: The Parisian Collection",
      description:
        "Ensure all floor staff have completed the 15-minute training module on the new Parisian Collection features (Lace Shank details). Upload the completion certificate generated by the Learning Portal.",
      priority: "High",
      deadline: "2025-11-30",
      audience: "Sales Managers",
      audienceCount: 80,
      completionRate: 92,
      status: "Ended",
      verificationType: "file",
      campaignId: null,
      createdAt: "2025-11-10",
      createdBy: creators.sales,
      submissions: getSubmissions(6),
    },
    // 4. Inventory/Ops
    {
      id: "t-004",
      title: "Q4 Inventory Audit: Solitaire Rings",
      description:
        'Perform a physical count of all SKU starting with "SOL-". Enter the total count and upload a photo of the count sheet. Discrepancies must be noted in the comments.',
      priority: "Critical",
      deadline: "2025-12-10",
      audience: "Store Managers",
      audienceCount: 156,
      completionRate: 88,
      status: "Active",
      verificationType: "photo",
      campaignId: null,
      createdAt: "2025-11-25",
      createdBy: creators.system,
      submissions: getSubmissions(4),
    },
    // 5. In-Store Event
    {
      id: "t-005",
      title: "Trunk Show: VIP Night Setup",
      description:
        'Preparation for the upcoming weekend trunk show. Ensure champagne bar is set up and "Event Special" pricing signage is visible. Upload a wide shot of the event space.',
      priority: "Normal",
      deadline: "2025-12-12",
      audience: "Select Partners (Platinum)",
      audienceCount: 24,
      completionRate: 15,
      status: "Active",
      verificationType: "photo",
      campaignId: "c-003",
      createdAt: "2025-12-08",
      createdBy: creators.marketing,
      submissions: getSubmissions(2),
    },
    // 6. Brand Compliance
    {
      id: "t-006",
      title: 'Remove "Summer 2024" Signage',
      description:
        "Urgent: Ensure all Summer promo materials are removed from the sales floor to avoid confusion with the Holiday pricing. Upload a photo of the clean counter space.",
      priority: "High",
      deadline: "2025-10-31",
      audience: "All Retailers",
      audienceCount: 156,
      completionRate: 100,
      status: "Ended",
      verificationType: "photo",
      campaignId: null,
      createdAt: "2025-10-25",
      createdBy: creators.visual,
      submissions: getSubmissions(5),
    },
    // 7. Customer Clienteling
    {
      id: "t-007",
      title: "Top Client Outreach: Holiday Wishlist",
      description:
        'Contact your top 20 clients from the last 2 years. Invite them to create a "Holiday Wishlist" in store. Confirm completion by uploading the call log summary.',
      priority: "Normal",
      deadline: "2025-12-01",
      audience: "Sales Associates",
      audienceCount: 300,
      completionRate: 75,
      status: "Active",
      verificationType: "text",
      campaignId: "c-001",
      createdAt: "2025-11-15",
      createdBy: creators.sales,
      submissions: [],
    },
    // 8. Visual Merchandising (Small scale)
    {
      id: "t-008",
      title: "Case Refresh: Bridal Section",
      description:
        'Re-organize the Bridal section to highlight the "Classic" series in the front row. Ensure lighting is angled at 45 degrees for maximum sparkle.',
      priority: "Normal",
      deadline: "2026-01-15",
      audience: "All Retailers",
      audienceCount: 156,
      completionRate: 5,
      status: "Active",
      verificationType: "photo",
      campaignId: null,
      createdAt: "2025-12-08",
      createdBy: creators.visual,
      submissions: [],
    },
    // 9. Digital Marketing
    {
      id: "t-009",
      title: "Website Banner Update: New Year",
      description:
        'Download the "New Year, New Sparkle" assets from the Resource Hub and replace your homepage carousel banner. Link to the /engagement page.',
      priority: "Normal",
      deadline: "2025-12-28",
      audience: "E-commerce Partners",
      audienceCount: 45,
      completionRate: 0,
      status: "Active",
      verificationType: "link",
      campaignId: "c-004",
      createdAt: "2025-12-08",
      createdBy: creators.marketing,
      submissions: [],
    },
    // 10. Operational
    {
      id: "t-010",
      title: "Update Store Hours (Google Maps)",
      description:
        "Ensure your special Holiday Hours are updated on your Google Business Profile to prevent customer frustration. Upload a screenshot of the updated profile.",
      priority: "Low",
      deadline: "2025-12-01",
      audience: "Store Managers",
      audienceCount: 156,
      completionRate: 50,
      status: "Active",
      verificationType: "photo",
      campaignId: null,
      createdAt: "2025-11-20",
      createdBy: creators.system,
      submissions: getSubmissions(1),
    },
  ],
};
