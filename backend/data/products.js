const starterImage = "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1200&q=80";

const gallery = {
  nero: [
    "https://images.unsplash.com/photo-1693320417682-ad805ed70d3c?auto=format&fit=crop&w=1400&q=80",
    "https://images.unsplash.com/photo-1724873290064-8a78a1d2c30e?auto=format&fit=crop&w=1400&q=80",
    "https://images.unsplash.com/photo-1723040211147-c843091a9142?auto=format&fit=crop&w=1400&q=80"
  ],
  aurelia: [
    "https://images.unsplash.com/photo-1770941450515-50f2b8ca380b?auto=format&fit=crop&w=1400&q=80",
    "https://images.unsplash.com/photo-1753605788101-04d1e653e74a?auto=format&fit=crop&w=1400&q=80",
    "https://images.unsplash.com/photo-1759223607861-f0ef3e617739?auto=format&fit=crop&w=1400&q=80"
  ],
  solstice: [
    "https://images.unsplash.com/photo-1621215058889-885f3d5a143c?auto=format&fit=crop&w=1400&q=80",
    "https://images.unsplash.com/photo-1693320417682-ad805ed70d3c?auto=format&fit=crop&w=1400&q=80",
    "https://images.unsplash.com/photo-1723040211147-c843091a9142?auto=format&fit=crop&w=1400&q=80"
  ],
  monaco: [
    "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1400&q=80",
    "https://images.unsplash.com/photo-1615874694520-474822394e73?auto=format&fit=crop&w=1400&q=80",
    "https://images.unsplash.com/photo-1759223607861-f0ef3e617739?auto=format&fit=crop&w=1400&q=80"
  ],
  verona: [
    "https://images.unsplash.com/photo-1759223607861-f0ef3e617739?auto=format&fit=crop&w=1400&q=80",
    "https://images.unsplash.com/photo-1600607687644-c7171b42498f?auto=format&fit=crop&w=1400&q=80",
    "https://images.unsplash.com/photo-1621215058889-885f3d5a143c?auto=format&fit=crop&w=1400&q=80"
  ],
  aria: [
    "https://images.unsplash.com/photo-1753605788101-04d1e653e74a?auto=format&fit=crop&w=1400&q=80",
    "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1400&q=80",
    "https://images.unsplash.com/photo-1770941450515-50f2b8ca380b?auto=format&fit=crop&w=1400&q=80"
  ]
};

const products = [
  {
    title: "Corner Wellness Bathtub",
    slug: "corner-wellness-bathtub",
    category: "bathtub",
    shortDescription: "A compact corner bathtub built for renovation and space-efficient luxury.",
    description: "Suitable for urban homes and secondary bathrooms, it combines efficient planning with relaxation features.",
    image: starterImage,
    gallery: [starterImage, gallery.nero[0], gallery.aurelia[0]],
    priceLabel: "Project quote",
    rating: 4.5,
    tags: ["Corner", "Renovation", "Luxury"],
    isFeatured: true,
    features: [
      { title: "Built To Fit", text: "Useful for room-size and planning details." },
      { title: "Corner Geometry", text: "Fits efficiently into compact bathroom plans." },
      { title: "Dual Backrests", text: "Comfortable support for shared relaxation." },
      { title: "Easy Service Panel", text: "Designed for practical long-term maintenance access." }
    ],
    specs: [
      { label: "Capacity", value: "1-2 people" },
      { label: "Installation", value: "Corner built-in" },
      { label: "Finish", value: "White acrylic / custom cladding" }
    ],
    details: [
      "Great for renovations with fixed plumbing positions.",
      "Textured base improves stability during entry and exit.",
      "Optional headrests and side-mounted mixer package."
    ],
    idealFor: ["Urban homes", "Renovations", "Guest suites"]
  },
  {
    title: "Monaco Outdoor Spa Tub",
    slug: "monaco-outdoor-spa-tub",
    category: "outdoor",
    shortDescription: "A resort-style spa tub for terraces, courtyards, and pool decks.",
    description: "Monaco is made for outdoor entertaining and sunset rituals. Durable shell construction, weather-ready cabinetry, and immersive jets create the feeling of a private resort spa.",
    image: gallery.monaco[0],
    gallery: gallery.monaco,
    priceLabel: "Project quote",
    rating: 5,
    tags: ["Outdoor", "Resort", "Weather ready"],
    isFeatured: false,
    features: [
      { title: "Compact Planning", text: "Simple content block for site and space requirements." },
      { title: "Low Maintenance", text: "Placeholder for service and usage details." },
      { title: "Daily Wellness", text: "Benefit-led block for everyday wellness positioning." },
      { title: "All-Weather Cabinet", text: "Durable exterior surfaces for covered outdoor spaces." },
      { title: "Social Seating", text: "A balanced seat plan for relaxed conversation." },
      { title: "Night Spa Lighting", text: "Low-glare waterline lighting for evening ambience." }
    ],
    specs: [
      { label: "Capacity", value: "4-5 people" },
      { label: "Installation", value: "Outdoor / covered terrace" },
      { label: "Finish", value: "Charcoal cabinet / white shell" }
    ],
    details: [
      "Thermal cover and equipment bay included in planning.",
      "Recommended with deck drainage and non-slip flooring.",
      "Optional audio and aromatherapy package."
    ],
    idealFor: ["Resorts", "Farmhouses", "Private terraces"]
  },
  {
    title: "Verona Whirlpool Bathtub",
    slug: "verona-whirlpool-bathtub",
    category: "jacuzzi",
    shortDescription: "A classic whirlpool bathtub with a polished hotel-suite character.",
    description: "Verona is a refined all-rounder for homeowners who want timeless luxury, reliable hydrotherapy, and a flexible built-in format. It works well with marble walls, warm wood, and gold fixtures.",
    image: gallery.verona[0],
    gallery: gallery.verona,
    priceLabel: "Premium range",
    rating: 4.8,
    tags: ["Whirlpool", "Classic", "Hotel suite"],
    isFeatured: true,
    features: [
      { title: "Deep Soak Basin", text: "Generous water depth for a calm, immersive bathtubs." },
      { title: "Directional Jets", text: "Adjustable jets help target shoulders, back, and legs." },
      { title: "Quiet Circulation", text: "Engineered to keep the bathroom atmosphere serene." }
    ],
    specs: [
      { label: "Use", value: "Homes / clubs" },
      { label: "Door", value: "Glass panel" },
      { label: "Control", value: "Digital panel" },
      { label: "Capacity", value: "1-2 people" },
      { label: "Installation", value: "Built-in" },
      { label: "Finish", value: "Gloss white / stone surround" }
    ],
    details: [
      "Compatible with deck-mounted or wall-mounted fixtures.",
      "Simple control panel for daily use.",
      "Pairs well with under-ledge lighting and niche storage."
    ],
    idealFor: ["Family homes", "Premium rentals", "Hotel suites"]
  },
  {
    title: "Aria Compact Spa Bathtub",
    slug: "aria-compact-spa-bathtub",
    category: "spa",
    shortDescription: "A compact spa bathtub for modern apartments and wellness corners.",
    description: "Aria is made for smaller spaces that still deserve a luxurious bathing experience. The design keeps proportions compact while offering warm water circulation, an elegant shell, and simple maintenance.",
    image: gallery.aria[0],
    gallery: gallery.aria,
    priceLabel: "On request",
    rating: 4.9,
    tags: ["Compact", "Apartment", "Spa bathtub"],
    isFeatured: false,
    features: [
      { title: "Resort Ready", text: "Placeholder for hospitality use cases." },
      { title: "Durable Shell", text: "Flexible product quality copy." },
      { title: "Guided Setup", text: "Space for installation and support notes." },
      { title: "Small Footprint", text: "Luxury bathing in layouts where space is carefully planned." },
      { title: "Fast Fill Profile", text: "Efficient basin volume for quicker everyday use." },
      { title: "Clean Controls", text: "Minimal controls keep the design uncluttered." }
    ],
    specs: [
      { label: "Use", value: "Resorts / villas" },
      { label: "Placement", value: "Outdoor" },
      { label: "Finish", value: "Custom" },
      { label: "Capacity", value: "1 person" },
      { label: "Installation", value: "Alcove / built-in" },
      { label: "Finish", value: "White shell / custom panels" }
    ],
    details: [
      "Ideal for apartment bathrooms and secondary suites.",
      "Optional glass screen planning for bathtub-shower layouts.",
      "Low-maintenance acrylic shell with smooth internal corners."
    ],
    idealFor: ["Apartments", "Compact homes", "Guest bathrooms"]
  }
];

export default products;
