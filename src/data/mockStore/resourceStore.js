import cover1 from "../../assets/mock/verragio/brand/cover/cover1.png";
import cover2 from "../../assets/mock/verragio/brand/cover/cover2.png";
import cover3 from "../../assets/mock/verragio/brand/cover/cover3.png";
import cover4 from "../../assets/mock/verragio/brand/cover/cover4.png";
import cover5 from "../../assets/mock/verragio/brand/cover/cover5.png";
import cover6 from "../../assets/mock/verragio/brand/cover/cover6.png";

export const resourceData = {
  folders: [
    {
      id: "res-001",
      title: "Visual Merchandising 2025",
      coverImage: cover1,
      coverColor: "bg-neutral-100",
      status: "Visible", // Visible / Hidden
      audience: "All Retailers", // All Retailers / Platinum Only / Gold+
      updatedAt: "2d ago",
      fileCount: 15,
      isNew: true,
    },
    {
      id: "res-002",
      title: "Brand Identity Guidelines",
      coverImage: cover2,
      coverColor: "bg-indigo-50",
      status: "Visible",
      audience: "All Retailers",
      updatedAt: "1 week ago",
      fileCount: 4,
      isNew: false,
    },
    {
      id: "res-003",
      title: "Platinum Exclusive Assets",
      coverImage: cover3,
      coverColor: "bg-slate-800",
      status: "Visible",
      audience: "Platinum Only",
      updatedAt: "3d ago",
      fileCount: 8,
      isNew: true,
      isExclusive: true,
    },
    {
      id: "res-004",
      title: "Store Display Setup Guide",
      coverImage: cover4,
      coverColor: "bg-amber-50",
      status: "Hidden",
      audience: "All Retailers",
      updatedAt: "Just now",
      fileCount: 1,
      isNew: false,
    },
    {
      id: "res-005",
      title: "Q1 Marketing Claims",
      coverImage: cover5,
      coverColor: "bg-rose-50",
      status: "Visible",
      audience: "Gold+",
      updatedAt: "1 month ago",
      fileCount: 12,
      isNew: false,
    },
    {
      id: "res-006",
      title: "Staff Training Manuals",
      coverImage: cover6,
      coverColor: "bg-blue-50",
      status: "Visible",
      audience: "All Retailers",
      updatedAt: "2 weeks ago",
      fileCount: 6,
      isNew: false,
    },
  ],
  files: {
    "res-001": [
      {
        id: "f1",
        name: "VM_Guide_Spring_2025.pdf",
        type: "pdf",
        size: "12.5 MB",
        addedAt: "2d ago",
      },
      {
        id: "f2",
        name: "Window_Display_Planogram.jpg",
        type: "image",
        size: "4.2 MB",
        addedAt: "2d ago",
      },
      {
        id: "f3",
        name: "Showcase_Lighting_Specs.pdf",
        type: "pdf",
        size: "1.8 MB",
        addedAt: "5d ago",
      },
      {
        id: "f4",
        name: "Fixture_Order_Form.xlsx",
        type: "sheet",
        size: "45 KB",
        addedAt: "1w ago",
      },
    ],
    "res-002": [
      {
        id: "f5",
        name: "Verragio_Logo_Pack.zip",
        type: "zip",
        size: "156 MB",
        addedAt: "1 week ago",
      },
      {
        id: "f6",
        name: "Brand_Voice_Guidelines.pdf",
        type: "pdf",
        size: "3.4 MB",
        addedAt: "1 week ago",
      },
      {
        id: "f7",
        name: "Typography_SuisseIntl.zip",
        type: "zip",
        size: "12 MB",
        addedAt: "1 week ago",
      },
      {
        id: "f8",
        name: "Color_Palette_2025.ase",
        type: "file",
        size: "2 KB",
        addedAt: "1 week ago",
      },
    ],
    "res-003": [
      {
        id: "f9",
        name: "VIP_Event_Invitation_Template.indd",
        type: "file",
        size: "45 MB",
        addedAt: "3d ago",
      },
      {
        id: "f10",
        name: "Concierge_Service_Manual.pdf",
        type: "pdf",
        size: "2.1 MB",
        addedAt: "3d ago",
      },
      {
        id: "f11",
        name: "High_Jewelry_Catalog_Digital.pdf",
        type: "pdf",
        size: "85 MB",
        addedAt: "3d ago",
      },
    ],
    "res-004": [
      {
        id: "f12",
        name: "Draft_Setup_Diagram.png",
        type: "image",
        size: "2.3 MB",
        addedAt: "Just now",
      },
    ],
    "res-005": [
      {
        id: "f13",
        name: "Legal_Claims_Matrix.xlsx",
        type: "sheet",
        size: "35 KB",
        addedAt: "1 mo ago",
      },
      {
        id: "f14",
        name: "Q1_Talking_Points.pdf",
        type: "pdf",
        size: "1.2 MB",
        addedAt: "1 mo ago",
      },
    ],
    "res-006": [
      {
        id: "f15",
        name: "Sales_Ritual_Training.mp4",
        type: "video",
        size: "250 MB",
        addedAt: "2w ago",
      },
      {
        id: "f16",
        name: "Diamond_Knowledge_Base.pdf",
        type: "pdf",
        size: "5.6 MB",
        addedAt: "2w ago",
      },
    ],
  },
};
