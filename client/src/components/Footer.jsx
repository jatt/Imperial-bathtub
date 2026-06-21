import {
  Mail,
  MapPin,
  Phone,
  Bath,
} from "lucide-react";

import { FaFacebookF, FaInstagram, FaWhatsapp } from "react-icons/fa";
import { Link } from "react-router-dom";
import logo from "../assets/imperial_logo.png";

const Footer = () => {
  const productCategoryLinks = [
    { label: "Bathtubs", category: "bathtubs" },
    { label: "Shower Solutions", category: "shower-solutions" },
    { label: "Wellness & Spa", category: "wellness" },
    { label: "Faucets & Accessories", category: "faucets-accessories" },
  ];

  // Social media links and icons.
  const socialLinks = [
    { Icon: FaWhatsapp, url: "https://wa.me/916201986245" },
    { Icon: FaInstagram, url: "https://www.instagram.com/imperialbathsolution?igsh=ZWE4YXprNGF1YzNu&utm_source=ig_contact_invite" },
    { Icon: FaFacebookF, url: "https://www.facebook.com/share/1Ctkc7w4eh/?mibextid=wwXIfr" },
  ];

  return (
    <footer className="bg-[#0f172a] text-white">

      <div className="max-w-7xl mx-auto px-6 py-14 flex flex-col md:grid md:grid-cols-2 lg:flex lg:flex-row lg:justify-between gap-12">

        {/* BRAND */}
        <div className="max-w-sm">
          <Link to="/" className="flex items-center gap-3">
            <img
              src={logo}
              alt="Imperial Logo"
              className="h-[80px] w-[80px] object-contain"
            />
            <h1 className="text-2xl md:text-2xl font-display font-extrabold tracking-wide text-[#D4AF37] drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]">
              Imperial Bath Solutions
            </h1>
          </Link>

          <p className="mt-4 text-sm text-gray-400 leading-6 ml-4">
            Premium bathroom and wellness solutions designed to bring comfort, elegance, and relaxation to homes, villas, hotels, and hospitality spaces across India.
          </p>

          {/* SOCIAL */}
          <div className="flex gap-4 mt-6 ml-2">
            {socialLinks.map(({ Icon, url }, i) => (
              <a
                key={i}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 border border-gray-600 rounded-full hover:bg-yellow-400 hover:text-black transition duration-300 cursor-pointer flex items-center justify-center"
              >
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>

        {/* QUICK LINKS */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-gray-400">
            <li><a href="/#about" className="hover:text-yellow-400">About Us</a></li>
            <li><a href="/#jacuzzi" className="hover:text-yellow-400">Products</a></li>
            <li><a href="/#projects" className="hover:text-yellow-400">Gallery</a></li>
            <li><a href="/#testimonials" className="hover:text-yellow-400">Customer Reviews</a></li>
            <li><Link to="/contact" className="hover:text-yellow-400">Contact Us</Link></li>
          </ul>
        </div>

        {/* PRODUCT CATEGORIES */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Our Products</h3>
          <ul className="space-y-2 text-gray-400">
            {productCategoryLinks.map((item) => (
                <li key={item.category}>
                  <Link
                    to={{
                      pathname: "/products",
                      search: `?category=${item.category}`,
                      hash: "#product-catalog",
                    }}
                    className="inline-flex hover:text-yellow-400 transition"
                  >
                    {item.label}
                  </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* CONTACT */}
        <div className="max-w-sm">
          <h3 className="text-lg font-semibold mb-4 text-white">Contact Us</h3>

          <div className="space-y-4 text-gray-400 text-sm">
            <div className="flex gap-3 items-start">
              <MapPin size={18} className="text-yellow-400 mt-1  shrink-0" />
              <span className="leading-relaxed">
                Hanuman Tikri, Ward No. 24<br />
                Shiv Bihar Colony 2<br />
                Near Greenwich School, Tiwari Chowk<br />
                Deoghar, Jharkhand â€“ 814112<br />
                India
              </span>
            </div>

            <div className="flex gap-3 items-center ml-1">
              <Phone size={22} className="text-yellow-400 shrink-0" />
              <a href="tel:+916201986245" className="text-gray-300 transition hover:text-yellow-400" aria-label="Call Imperial Bath Solutions">
                +91 62019 862459
              </a>
            </div>

            <div className="flex gap-3 items-center ml-1">
              <Mail size={18} className="text-yellow-400 shrink-0" />
              <a href="mailto:imperialbathsolution@gmail.com" className="break-all text-gray-300 transition hover:text-yellow-400" aria-label="Email Imperial Bath Solutions">
                imperialbathsolution@gmail.com
              </a>
            </div>

            <div className="flex gap-3 items-center ml-1">
              <Bath size={18} className="text-yellow-400 shrink-0" />
              <a
                href="https://wa.me/916201986245?text=Hello%20Imperial%20Bath%20Solutions%2C%20I%20need%20support%20with%20your%20products"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-emerald-400/25 bg-emerald-500/10 px-3 py-2 text-gray-100 transition duration-300 hover:border-emerald-300/50 hover:bg-emerald-500/20 hover:text-white"
              >
                <FaWhatsapp size={14} className="text-emerald-400" />
                WhatsApp Support
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-700 text-center py-5 text-sm text-gray-500">
        Â© 2026 Imperial Bath Solutions. All Rights Reserved. Luxury Bathroom Solutions for Modern Living.
      </div>
    </footer>
  );
};

export default Footer;
