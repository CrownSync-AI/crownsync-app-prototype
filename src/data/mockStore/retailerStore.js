export const zones = [
  { id: "northeast", label: "Northeast" },
  { id: "southeast", label: "Southeast" },
  { id: "midwest", label: "Midwest" },
  { id: "southwest", label: "Southwest" },
  { id: "west-coast", label: "West Coast" },
  { id: "international", label: "International" },
];

export const tiers = [
  { id: "platinum", label: "Platinum" },
  { id: "gold", label: "Gold" },
  { id: "silver", label: "Silver" },
];

export const groups = [
  { id: "vip", label: "VIP Retailers" },
  { id: "high-risk", label: "High Risk" },
  { id: "new-partners", label: "New Partners" },
];

// Helper to generate consistent mock data
const generateRetailers = (count) => {
  const retailers = [];
  const names = [
    "Luxe Jewelers",
    "Diamond Haven",
    "Smith & Co.",
    "Royal Gems",
    "Elite Timepieces",
    "Golden Era",
    "Prestige Jewelers",
    "Crown & Caliber",
    "Timeless Treasures",
    "Sparkle Boutique",
    "Vantage Watches",
    "Heritage Gold",
    "Pure Radiance",
    "Noble Gems",
    "Legacy Jewelers",
    "Summit Stones",
    "Pacific Pearls",
    "Metro Diamonds",
    "Capital Jewelers",
    "Starlight Gems",
  ];

  const locations = [
    "New York, NY",
    "Los Angeles, CA",
    "Chicago, IL",
    "Houston, TX",
    "Miami, FL",
    "Seattle, WA",
    "Boston, MA",
  ];

  for (let i = 1; i <= count; i++) {
    const zone = zones[Math.floor(Math.random() * zones.length)];
    const tier = tiers[Math.floor(Math.random() * tiers.length)];
    const baseName = names[Math.floor(Math.random() * names.length)];
    const location = locations[Math.floor(Math.random() * locations.length)];

    // 30% chance to be in a special group
    const group =
      Math.random() > 0.7
        ? groups[Math.floor(Math.random() * groups.length)].id
        : null;

    retailers.push({
      id: `r-${i}`,
      name: `${baseName} ${i}`, // Unique element
      email: `store${i}@example.com`,
      location: location,
      zone: zone.id,
      tier: tier.id,
      group: group,
      initials: baseName.substring(0, 2).toUpperCase(),
      avatarColor: [
        "bg-blue-600",
        "bg-emerald-600",
        "bg-purple-600",
        "bg-amber-600",
        "bg-rose-600",
        "bg-gray-800",
      ][i % 6],
      joinedDate: new Date(2023, 0, 1 + i).toISOString().split("T")[0],
      isActive: Math.random() > 0.05, // 95% active
    });
  }
  return retailers;
};

export const retailers = generateRetailers(152);

// Helpers
export const getRetailerCount = (filters = {}) => {
  if (!filters || Object.keys(filters).length === 0) return retailers.length;

  return retailers.filter((r) => {
    // Check Zone (OR logic within zones if array, but simple match for now)
    if (
      filters.zones &&
      filters.zones.length > 0 &&
      !filters.zones.includes(r.zone)
    )
      return false;
    // Check Tier
    if (
      filters.tiers &&
      filters.tiers.length > 0 &&
      !filters.tiers.includes(r.tier)
    )
      return false;
    // Check Group
    if (
      filters.groups &&
      filters.groups.length > 0 &&
      r.group !== filters.groups[0]
    )
      return false; // Simple single group logic for now

    return true;
  }).length;
};

export const filterRetailers = (filters = {}) => {
  if (!filters) return retailers;

  return retailers.filter((r) => {
    if (
      filters.search &&
      !r.name.toLowerCase().includes(filters.search.toLowerCase())
    )
      return false;
    if (
      filters.zones &&
      filters.zones.length > 0 &&
      !filters.zones.includes(r.zone)
    )
      return false;
    if (
      filters.tiers &&
      filters.tiers.length > 0 &&
      !filters.tiers.includes(r.tier)
    )
      return false;
    // if filters.selectedIds exists, we might want to return only those or exclude... usually specific filtering logic
    return true;
  });
};
