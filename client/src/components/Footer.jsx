import {
  Mail,
  MapPin,
  Phone,
  Bath,
} from "lucide-react";

import { FaFacebookF, FaInstagram } from "react-icons/fa";
import { Link } from "react-router-dom";
import logo from "../assets/imperial_logo.png";



const Footer = () => {
  // Social media links and icons.
  const socialLinks = [
    { Icon: FaFacebookF, url: "https://www.facebook.com/share/1Ctkc7w4eh/?mibextid=wwXIfr" },
    { Icon: FaInstagram, url: "https://www.instagram.com/imperialbathsolution?igsh=ZWE4YXprNGF1YzNu&utm_source=ig_contact_invite" },
    // { Icon: FaLinkedinIn, url: "#" }
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
            {/* </div> */}
            <h1 className="text-2xl md:text-2xl font-display font-extrabold tracking-wide text-[#D4AF37] drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]">
              Imperial Bath Solutions
            </h1>
          </Link>

          <p className="mt-4 text-sm text-gray-400 leading-6">
            Premium Jacuzzi bathtubs designed to bring luxury, comfort, and relaxation to your home, villa, hotel, or resort bathroom spaces.
          </p>

          {/* SOCIAL */}
          <div className="flex gap-4 mt-6">
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

        {/* COMPANY */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Company</h3>
          <ul className="space-y-2 text-gray-400">
            <li><Link to="/about" className="hover:text-yellow-400">About Us</Link></li>
            <li><Link to="/products" className="hover:text-yellow-400">Products</Link></li>
            <li><Link to="/contact" className="hover:text-yellow-400">Contact</Link></li>
          </ul>
        </div>

        {/* PRODUCTS */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Products</h3>
          <ul className="space-y-2 text-gray-400">
            <li className="hover:text-yellow-400 cursor-pointer">Jacuzzi Bathtubs</li>
            <li className="hover:text-yellow-400 cursor-pointer">About</li>
            <li className="hover:text-yellow-400 cursor-pointer">Projects</li>
            {/* <li className="hover:text-yellow-400 cursor-pointer">FAQ</li> */}
            <li className="hover:text-yellow-400 cursor-pointer">Contact Us</li>
          </ul>
        </div>

        {/* CONTACT */}
        <div className="max-w-sm">
          <h3 className="text-lg font-semibold mb-4 text-white">Contact</h3>

          <div className="space-y-4 text-gray-400 text-sm">

            {/* Address Section - Icon aligned beautifully */}
            <div className="flex gap-3 items-start">
              {/* Icon is aligned with the first address line. */}
              <MapPin size={22} className="text-yellow-400 mt-1 shrink-0" />
              <span className="leading-relaxed">
                Hanuman Tikri, Ward No. 24<br />
                Shiv Bihar Colony 2<br />
                Near Greenwich School, Tiwari Chowk<br />
                Deoghar, Jharkhand – 814112<br />
                India
              </span>
            </div>

            {/* Phone Section */}
            <div className="flex gap-3 items-center">
              <Phone size={18} className="text-yellow-400 shrink-0" />
              <span>+91 62019 862459</span>
            </div>

            {/* Mail Section */}
            <div className="flex gap-3 items-center">
              <Mail size={18} className="text-yellow-400 shrink-0" />
              <span className="break-all">imperialbathsolution@gmail.com</span>
            </div>

          </div>
        </div>
      </div>

      <div className="border-t border-gray-700 text-center py-5 text-sm text-gray-500">
        © 2026 Imperial Luxury Bathtubs. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
