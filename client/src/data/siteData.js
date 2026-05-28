export const images = {
    hero:
        "https://images.unsplash.com/photo-1770941450515-50f2b8ca380b?auto=format&fit=crop&w=2200&q=85",
    about:
        "https://images.unsplash.com/photo-1753605788101-04d1e653e74a?auto=format&fit=crop&w=1600&q=85",
    contact:
        "https://images.unsplash.com/photo-1759223607861-f0ef3e617739?auto=format&fit=crop&w=1600&q=85"
};

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

export const fallbackProducts = [
    {
        _id: "fallback-solstice",
        title: "Solstice Corner Jacuzzi",
        slug: "solstice-corner-jacuzzi",
        category: "jacuzzi",
        shortDescription: "A space-smart corner bathtub for compact premium bathrooms.",
        description:
            "Solstice is built for homeowners who want hydrotherapy without sacrificing the rest of the bathroom plan. Its angular corner format opens up circulation space while still offering a generous soak zone.",
        image: gallery.solstice[0],
        gallery: gallery.solstice,
        priceLabel: "Custom quote",
        rating: 4.9,
        tags: ["Corner fit", "Compact luxury", "Hydro jets"],
        isFeatured: true,
        features: [
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
        _id: "fallback-monaco",
        title: "Monaco Outdoor Spa Tub",
        slug: "monaco-outdoor-spa-tub",
        category: "outdoor",
        shortDescription: "A resort-style spa tub for terraces, courtyards, and pool decks.",
        description:
            "Monaco is made for outdoor entertaining and sunset rituals. Durable shell construction, weather-ready cabinetry, and immersive jets create the feeling of a private resort spa.",
        image: gallery.monaco[0],
        gallery: gallery.monaco,
        priceLabel: "Project quote",
        rating: 5,
        tags: ["Outdoor", "Resort", "Weather ready"],
        isFeatured: false,
        features: [
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
        _id: "fallback-verona",
        title: "Verona Whirlpool Bathtub",
        slug: "verona-whirlpool-bathtub",
        category: "jacuzzi",
        shortDescription: "A classic whirlpool bathtub with a polished hotel-suite character.",
        description:
            "Verona is a refined all-rounder for homeowners who want timeless luxury, reliable hydrotherapy, and a flexible built-in format. It works well with marble walls, warm wood, and gold fixtures.",
        image: gallery.verona[0],
        gallery: gallery.verona,
        priceLabel: "Premium range",
        rating: 4.8,
        tags: ["Whirlpool", "Classic", "Hotel suite"],
        isFeatured: true,
        features: [
            { title: "Deep Soak Basin", text: "Generous water depth for a calm, immersive bath." },
            { title: "Directional Jets", text: "Adjustable jets help target shoulders, back, and legs." },
            { title: "Quiet Circulation", text: "Engineered to keep the bathroom atmosphere serene." }
        ],
        specs: [
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
        _id: "fallback-aria",
        title: "Aria Compact Spa Bathtub",
        slug: "aria-compact-spa-bathtub",
        category: "spa",
        shortDescription: "A compact spa bathtub for modern apartments and wellness corners.",
        description:
            "Aria is made for smaller spaces that still deserve a luxurious bathing experience. The design keeps proportions compact while offering warm water circulation, an elegant shell, and simple maintenance.",
        image: gallery.aria[0],
        gallery: gallery.aria,
        priceLabel: "On request",
        rating: 4.9,
        tags: ["Compact", "Apartment", "Spa bath"],
        isFeatured: false,
        features: [
            { title: "Small Footprint", text: "Luxury bathing in layouts where space is carefully planned." },
            { title: "Fast Fill Profile", text: "Efficient basin volume for quicker everyday use." },
            { title: "Clean Controls", text: "Minimal controls keep the design uncluttered." }
        ],
        specs: [
            { label: "Capacity", value: "1 person" },
            { label: "Installation", value: "Alcove / built-in" },
            { label: "Finish", value: "White shell / custom panels" }
        ],
        details: [
            "Ideal for apartment bathrooms and secondary suites.",
            "Optional glass screen planning for bath-shower layouts.",
            "Low-maintenance acrylic shell with smooth internal corners."
        ],
        idealFor: ["Apartments", "Compact homes", "Guest bathrooms"]
    }
];

export const stats = [
    { value: "18+", label: "Years crafting premium wellness spaces" },
    { value: "640+", label: "Jacuzzi and spa installations planned" },
    { value: "32", label: "Hotel, villa, and penthouse partners" },
    { value: "24/7", label: "Consultation and care support" }
];

export const choosingTips = [
    {
        title: "Measure The Room First",
        text: "Confirm clear walking space, drain position, service access, and door swing before choosing a shell size."
    },
    {
        title: "Choose The Jet Experience",
        text: "Whirlpool jets feel energizing, air jets feel softer, and mixed systems give the broadest hydrotherapy range."
    },
    {
        title: "Plan The Mood",
        text: "Lighting, wall finishes, fixtures, and privacy matter as much as the bathtub when the goal is a luxury spa feel."
    },
    {
        title: "Check Service Access",
        text: "Premium bathrooms still need practical access panels, electrical planning, drainage, and safe anti-slip surfaces."
    }
];

export const projects = [
    {
        title: "Marble Penthouse Suite",
        category: "modern",
        image:
            "https://images.unsplash.com/photo-1759223607861-f0ef3e617739?auto=format&fit=crop&w=1200&q=80"
    },
    {
        title: "Classic Brass Residence",
        category: "classic",
        image:
            "https://images.unsplash.com/photo-1621215058889-885f3d5a143c?auto=format&fit=crop&w=1200&q=80"
    },
    {
        title: "Private Spa Courtyard",
        category: "spa",
        image:
            "https://images.unsplash.com/photo-1693320417682-ad805ed70d3c?auto=format&fit=crop&w=1200&q=80"
    },
    {
        title: "Minimal City Apartment",
        category: "modern",
        image:
            "https://images.unsplash.com/photo-1770941450515-50f2b8ca380b?auto=format&fit=crop&w=1200&q=80"
    },
    {
        title: "Hotel Wellness Suite",
        category: "spa",
        image:
            "https://images.unsplash.com/photo-1724873290064-8a78a1d2c30e?auto=format&fit=crop&w=1200&q=80"
    },
    {
        title: "Heritage Villa Bathtub",
        category: "classic",
        image:
            "https://images.unsplash.com/photo-1753605788101-04d1e653e74a?auto=format&fit=crop&w=1200&q=80"
    }
];

export const fallbackTestimonials = [
    {
        _id: "testimonial-1",
        name: "Ananya Mehra",
        role: "Villa Owner",
        location: "Goa",
        image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=600&q=80",
        review:
            "The team understood the mood we wanted immediately. Our bathroom now feels like a private spa, and the jacuzzi installation was handled with real polish.",
        rating: 5
    },
    {
        _id: "testimonial-2",
        name: "Rahul Khanna",
        role: "Boutique Hotel Director",
        location: "Udaipur",
        image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80",
        review:
            "Guests mention the bathtubs constantly. The product guidance, drawings, and after-installation support made the project feel very controlled.",
        rating: 5
    },
    {
        _id: "testimonial-3",
        name: "Mira Sethi",
        role: "Interior Designer",
        location: "New Delhi",
        image: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=600&q=80",
        review:
            "Their catalog has the finish quality high-end clients expect. I especially appreciate the clear specs and practical installation notes.",
        rating: 5
    },
    {
        _id: "testimonial-4",
        name: "Arjun Rao",
        role: "Real Estate Developer",
        location: "Bengaluru",
        image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=600&q=80",
        review:
            "We used their jacuzzi models across premium sample apartments. The design language is restrained, modern, and easy to sell.",
        rating: 4.8
    },
    {
        _id: "testimonial-5",
        name: "Sofia Fernandes",
        role: "Resort Consultant",
        location: "Alibaug",
        image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=600&q=80",
        review:
            "The outdoor spa recommendation was perfect for the property. It looks expensive, performs beautifully, and photographs incredibly well.",
        rating: 5
    },
    {
        _id: "testimonial-6",
        name: "Dev Malhotra",
        role: "Homeowner",
        location: "Mumbai",
        image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=600&q=80",
        review:
            "From product selection to final handover, the process was calm and professional. The final bathroom has exactly the luxury feel we wanted.",
        rating: 5
    }
];

export const team = [
    {
        name: "Marcus Lobo",
        role: "Founder and Design Director",
        image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=700&q=80"
    },
    {
        name: "Naina Kapoor",
        role: "Luxury Bathtub Consultant",
        image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=700&q=80"
    },
    {
        name: "Kabir Anand",
        role: "Installation Lead",
        image: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?auto=format&fit=crop&w=700&q=80"
    }
];

export const faqs = [
    {
        question: "How long does a Jacuzzi bathtub installation take?",
        answer:
            "Most prepared bathrooms take 2 to 5 days after plumbing, electrical, and civil work are ready. Larger spa suites and outdoor tubs may need a longer project schedule."
    },
    {
        question: "Can the bathtub finish be customized?",
        answer:
            "Yes. Shell color, exterior cladding, fixture finish, lighting, headrests, and control packages can be selected according to the bathroom design."
    },
    {
        question: "Do I need special plumbing or electrical work?",
        answer:
            "A jacuzzi bath usually needs dedicated electrical safety planning, drainage, water supply, and a service access zone. The backend project team can record enquiries for a site consultation."
    },
    {
        question: "Are these suitable for hotels and resorts?",
        answer:
            "Yes. The catalog includes built-in, freestanding, compact, and outdoor spa formats suitable for villas, hotels, resorts, and premium apartments."
    },
    {
        question: "How is maintenance handled?",
        answer:
            "We recommend accessible panels, easy-clean surfaces, water care guidance, and periodic service checks to preserve performance and finish quality."
    },
    {
        question: "Can I request a quote from the website?",
        answer:
            "Yes. The contact form sends your name, email, phone, and message so the consultation team can follow up with a tailored next step."
    }
];