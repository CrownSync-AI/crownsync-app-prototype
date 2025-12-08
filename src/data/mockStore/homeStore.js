export const homeData = {
  // Identity
  user: {
    greetingName: "Verragio",
    isBrandAdmin: true,
  },

  // Launchpad (Setup Progress)
  setupProgress: {
    currentStep: 3,
    totalSteps: 4,
    percentage: 75,
    tasks: [
      {
        id: 1,
        title: "Brand Identity Set",
        subtitle: "Verragio",
        status: "done",
        actionLabel: "Edit",
      },
      {
        id: 2,
        title: "Domain Connected",
        subtitle: "verragio.com verified",
        status: "done",
        actionLabel: "Manage",
      },
      {
        id: 3,
        title: "Network Activated",
        subtitle: "120 Retailers joined",
        status: "done",
        actionLabel: "Invite More",
      },
      {
        id: 4,
        title: "Create First Campaign",
        subtitle: "Distribute assets to your network.",
        status: "todo",
        actionLabel: "Create Campaign",
      },
    ],
  },

  // Cockpit (Metrics)
  metrics: {
    partner: {
      adoptionRate: 72,
      activeRetailers: 125,
      totalRetailers: 150,
      needsAttentionCount: 15,
      attentionGroups: [
        {
          id: 1,
          reason: "Missed Latest Launch",
          count: 8,
          retailers: [
            { name: "Saks Fifth Avenue", avatar: "S" },
            { name: "Neiman Marcus", avatar: "N" },
            { name: "Nordstrom", avatar: "N" },
            { name: "Bloomingdale's", avatar: "B" },
            { name: "Macy's Herald Sq", avatar: "M" },
          ],
          action: "Nudge for 'Summer Collection'",
          copy: "Discover our newly launched Summer Collection assets.",
        },
        {
          id: 2,
          reason: "Inactive > 30 Days",
          count: 5,
          retailers: [
            { name: "Ben Bridge Jeweler", avatar: "B" },
            { name: "Helzberg Diamonds", avatar: "H" },
            { name: "Reeds Jewelers", avatar: "R" },
          ],
          action: "Send Re-engagement Email",
          copy: "We miss you! See what's new at Verragio.",
        },
        {
          id: 3,
          reason: "Profile Incomplete",
          count: 2,
          retailers: [
            { name: "London Jewelers", avatar: "L" },
            { name: "Hamilton Jewelers", avatar: "H" },
          ],
          action: "Remind to Setup",
          copy: "Please complete your retailer profile to access full features.",
        },
      ],
      regions: [
        { name: "Northeast", value: 85, status: "good" },
        { name: "Southeast", value: 68, status: "neutral" },
        { name: "Midwest", value: 62, status: "neutral" },
        { name: "South Central", value: 78, status: "good" },
        { name: "West", value: 45, status: "warning" },
      ],
    },
    directMarketing: {
      kpiData: {
        all: { totalReach: "2.4M", avgEngagement: "3.8%" },
        email: { totalReach: "850K", avgEngagement: "21.5%" },
        social: { totalReach: "1.5M", avgEngagement: "1.2%" },
      },
      trendData: {
        all: [
          { day: "1", value: 4000 },
          { day: "5", value: 3000 },
          { day: "10", value: 5000 },
          { day: "15", value: 7500 },
          { day: "20", value: 6000 },
          { day: "25", value: 8000 },
          { day: "30", value: 9500 },
        ],
        email: [
          { day: "1", value: 2000 },
          { day: "5", value: 2200 },
          { day: "10", value: 1800 },
          { day: "15", value: 4500 },
          { day: "20", value: 3000 },
          { day: "25", value: 5000 },
          { day: "30", value: 4200 },
        ],
        social: [
          { day: "1", value: 1500 },
          { day: "5", value: 800 },
          { day: "10", value: 3200 },
          { day: "15", value: 2800 },
          { day: "20", value: 3000 },
          { day: "25", value: 2500 },
          { day: "30", value: 5300 },
        ],
      },
    },
  },

  // Action Queue
  actions: [
    {
      id: 1,
      type: "approval",
      title: "Approval Request",
      desc: "Junior Marketer submitted 'Valentine's Day Promo' for review.",
      cta: "Review",
    },
    {
      id: 2,
      type: "alert",
      title: "Low Adoption Alert",
      desc: "'Pearl Series' assets have low download rates in West Coast.",
      cta: "Boost",
      priority: "high",
    },
    {
      id: 3,
      type: "event",
      title: "Scheduled Event",
      desc: "VIP Dinner Invite (Email) scheduled for Tomorrow, 10:00 AM.",
      cta: "Edit",
    },
  ],

  // Live Pulse
  livePulse: [
    {
      id: 1,
      time: "10:15",
      actor: "Bergdorf Goodman",
      action: "downloaded",
      target: "High_Res_Necklace.jpg",
    },
    {
      id: 2,
      time: "10:00",
      actor: "Neiman Marcus",
      action: "joined",
      target: "the network",
    },
    {
      id: 3,
      time: "09:45",
      actor: "London Jewelers",
      action: "launched",
      target: "Summer Sale Campaign",
    },
    {
      id: 4,
      time: "09:30",
      actor: "System",
      action: "synced",
      target: "Inventory Data",
    },
    {
      id: 5,
      time: "09:15",
      actor: "Mayors",
      action: "requested",
      target: "Co-op Funds",
    },
  ],

  // Alerts
  alerts: [
    {
      id: "compliance-1",
      type: "warning",
      title: "Launch Risk",
      message:
        "Q4 Bridal Collection' launches tomorrow, but 0 retailers in Northeast have adopted assets.",
      action: "Nudge All",
    },
  ],
};
