export const placeholderImages = {
  hero:
    "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1800&q=80",
  jacuzzi:
    "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1200&q=80",
  sauna:
    "https://images.unsplash.com/photo-1596178065887-1198b6148b2b?auto=format&fit=crop&w=1200&q=80",
  steam:
    "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80",
  spa:
    "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80"
};

export const fallbackProducts = [
  {
    _id: "fallback-1",
    title: "Signature Hydro Jacuzzi",
    slug: "signature-hydro-jacuzzi",
    category: "jacuzzi",
    shortDescription: "Premium hydrotherapy bathtub layout for homes and boutique stays.",
    description:
      "A refined product page for premium bathtub, wellness, and installation storytelling.",
    image: placeholderImages.jacuzzi,
    priceLabel: "Premium range",
    tags: ["Hydrotherapy", "Indoor", "Luxury homes"],
    isFeatured: true,
    features: [
      { title: "Hydro Massage", text: "Editable block for jet and comfort details." },
      { title: "Modern Controls", text: "Space for lights, temperature, and controls." },
      { title: "Custom Finish", text: "Use this area for colors and material choices." }
    ],
    specs: [
      { label: "Use", value: "Residential / hospitality" },
      { label: "Installation", value: "Indoor or covered outdoor" },
      { label: "Support", value: "Site planning ready" }
    ]
  },
  {
    _id: "fallback-2",
    title: "Executive Sauna Room",
    slug: "executive-sauna-room",
    category: "sauna",
    shortDescription: "Warm sauna room card for premium wellness pages.",
    description:
      "A sauna room concept for catalog grids, comparison sections, and product detail pages.",
    image: placeholderImages.sauna,
    priceLabel: "Custom quote",
    tags: ["Sauna", "Wellness", "Custom room"],
    isFeatured: true,
    features: [
      { title: "Thermal Comfort", text: "Use this area for heater information." },
      { title: "Wood Finish", text: "Placeholder for finish customization." },
      { title: "Built To Fit", text: "Useful for room-size and planning details." }
    ],
    specs: [
      { label: "Use", value: "Private villas / resorts" },
      { label: "Power", value: "Site-specific" },
      { label: "Finish", value: "Custom material palette" }
    ]
  },
  {
    _id: "fallback-3",
    title: "Compact Steam Suite",
    slug: "compact-steam-suite",
    category: "steam",
    shortDescription: "Steam room structure for compact wellness installations.",
    description:
      "A compact steam-room concept for benefits, requirements, and inquiry flows.",
    image: placeholderImages.steam,
    priceLabel: "On request",
    tags: ["Steam", "Compact", "Wellness"],
    isFeatured: false,
    features: [
      { title: "Compact Planning", text: "Simple content block for space requirements." },
      { title: "Low Maintenance", text: "Placeholder for service and usage details." },
      { title: "Daily Wellness", text: "Benefit-led block for everyday relaxation." }
    ],
    specs: [
      { label: "Use", value: "Homes / clubs" },
      { label: "Door", value: "Glass panel" },
      { label: "Control", value: "Digital panel" }
    ]
  },
  {
    _id: "fallback-4",
    title: "Outdoor Spa Pool",
    slug: "outdoor-spa-pool",
    category: "spa",
    shortDescription: "Large-format spa card for destination and outdoor projects.",
    description:
      "A flexible outdoor spa model for grid cards, landing sections, and enquiry flows.",
    image: placeholderImages.spa,
    priceLabel: "Project quote",
    tags: ["Outdoor", "Spa", "Resort"],
    isFeatured: true,
    features: [
      { title: "Resort Ready", text: "Placeholder for hospitality use cases." },
      { title: "Durable Shell", text: "Flexible product quality copy." },
      { title: "Guided Setup", text: "Space for installation and support notes." }
    ],
    specs: [
      { label: "Use", value: "Resorts / villas" },
      { label: "Placement", value: "Outdoor" },
      { label: "Finish", value: "Custom" }
    ]
  }
];

export const categories = [
  {
    title: "Jacuzzi Bathtubs",
    text: "Hydrotherapy models for premium bathrooms and wellness suites.",
    image: placeholderImages.jacuzzi
  },
  {
    title: "Sauna Rooms",
    text: "Custom sauna concepts for homes, resorts, and spa facilities.",
    image: placeholderImages.sauna
  },
  {
    title: "Steam Rooms",
    text: "Steam wellness spaces planned for compact and premium interiors.",
    image: placeholderImages.steam
  }
];

export const stats = [
  // { value: "20+", label: "Years of experience" },
  // { value: "500+", label: "Projects planned" },
  // { value: "Pan India", label: "Delivery support" },
  // { value: "Custom", label: "Project solutions" }
];

export const services = [
  {
    title: "Smart 3D Design",
    text: "Plan layouts, space requirements, and product fit before execution."
  },
  {
    title: "Installation",
    text: "Show a clean process for site checks, delivery, and installation."
  },
  {
    title: "Smart Care",
    text: "Reserve space for maintenance, support, and post-sale confidence."
  }
];

export const faqs = [
  {
    question: "Can products be customized?",
    answer: "Yes. Product details, images, finishes, and pricing can be adjusted for each project."
  },
  {
    question: "How do enquiries get handled?",
    answer: "Product information and enquiries are organized so the team can manage them clearly."
  },
  {
    question: "Can I preview a starter catalog?",
    answer: "A starter catalog is available for quick previews and early project discussions."
  }
];