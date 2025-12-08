const coverImage_1 = "img1";
const coverImage_2 = "img2";
const coverImage_3 = "img3";
const getMember = () => ({ name: "User", avatarUrl: "url" });

export const campaignData = {
  campaigns: [
    {
      id: "camp-001",
      status: "Active",
    },
    {
      id: "camp-002",
      title: "Holiday Collection Launch",
      description:
        "Premium launch assets for the new Winter Bridal Collection.",
      status: "Active",
      coverImage: coverImage_2,
      cover: "bg-amber-100",
      audience: "VIP Retailers",
      isPinned: true,
      updatePending: true,
      adoptionRate: 45,
    },
  ],
};
