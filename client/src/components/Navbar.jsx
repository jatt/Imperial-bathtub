import { Menu, X } from "lucide-react";
import { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import logo from "../assets/imperial_logo.png";
import { FaWhatsapp } from "react-icons/fa";

const navItems = [
  { label: "About Us", href: "/#about" },
  { label: "Products", href: "/#jacuzzi" },
  { label: "Gallery", href: "/#projects" },
  { label: "Contact", href: "/contact" },
  { label: "Testimonials", href: "/#testimonials" },
];

const Navbar = ({ onQuoteClick }) => {
  const [isOpen, setIsOpen] = useState(false);
  const closeMenu = () => setIsOpen(false);

  const whatsappLink = "https://wa.me/916201986245?text=Hello%20Imperial%20Bath%20Solutions,%20I%20am%20interested%20in%20your%20products";

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-ink/90 text-white backdrop-blur-xl">
      <nav className="container-shell flex h-20 items-center justify-between gap-3 sm:gap-5">
        {/* Logo Section */}
        <Link to="/" className="flex items-center gap-2.5" onClick={closeMenu}>
          <img
            src={logo}
            alt="Imperial Logo"
            className="h-11 w-11 sm:h-[72px] sm:w-[72px] object-contain"
          />
          <span className="flex flex-col justify-center leading-none">
            <span className="block font-display text-lg sm:text-[1.55rem] font-bold leading-none text-[#D4AF37]">
              Imperial
            </span>
            <span className="mt-1 text-[8px] sm:text-[9px] font-bold uppercase tracking-[0.3em] text-[#D4AF37]/90">
              Bath solutions
            </span>
          </span>
        </Link>

        {/* Desktop Navigation Links (Normal Links) */}
        <div className="hidden items-center gap-8 lg:flex">
          {navItems.map((item) =>
            item.href.startsWith("/#") ? (
              <a
                key={item.label}
                href={item.href}
                className="text-sm font-semibold uppercase tracking-[0.18em] text-white/70 transition hover:text-champagne"
              >
                {item.label}
              </a>
            ) : (
              <NavLink
                key={item.label}
                to={item.href}
                className={({ isActive }) =>
                  `text-sm font-semibold uppercase tracking-[0.18em] transition ${
                    isActive
                      ? "text-champagne"
                      : "text-white/70 hover:text-champagne"
                  }`
                }
              >
                {item.label}
              </NavLink>
            ),
          )}
        </div>

        {/* Desktop action buttons */}
        <div className="flex items-center gap-3">
          {/* Chat Us Box Button (Desktop) */}
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden lg:inline-flex items-center justify-center gap-2 rounded-full border border-emerald-400/30 bg-gradient-to-r from-emerald-500 via-emerald-500 to-emerald-600 px-3.5 py-2.5 text-[11px] font-semibold text-white shadow-[0_14px_28px_-14px_rgba(16,185,129,0.95)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_36px_-14px_rgba(16,185,129,1)]"
            aria-label="Chat on WhatsApp"
          >
            <span className="grid h-6 w-6 place-items-center rounded-full bg-white/15 ring-1 ring-white/15">
              <FaWhatsapp size={16} />
            </span>
            <span className="uppercase tracking-[0.14em] text-[10px]">
              Chat
            </span>
          </a>

          {/* Get Quote Box Button (Desktop) */}
          <button
            className="btn-primary hidden sm:inline-flex rounded-full px-3.5 py-2 text-[11px] font-semibold uppercase tracking-[0.16em]"
            onClick={onQuoteClick}
          >
            Get Quote
          </button>

          <NavLink
            to="/admin-login"
            className="hidden sm:inline-flex items-center rounded-full px-2 py-1 text-[10px] font-medium uppercase tracking-[0.22em] text-white/35 transition hover:text-white/70"
          >
            Admin
          </NavLink>

          {/* Mobile Menu Hamburger Trigger */}
          <button
            type="button"
            aria-label="Toggle navigation"
            onClick={() => setIsOpen((v) => !v)}
            className="grid h-11 w-11 place-items-center border border-white/20 text-white lg:hidden"
          >
            {isOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Drawer */}
      {isOpen && (
        <div className="border-t border-white/10 bg-ink/95 backdrop-blur-xl lg:hidden">
          <div className="container-shell grid gap-2 py-4">
            {navItems.map((item) =>
              item.href.startsWith("/#") ? (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={closeMenu}
                  className="block rounded-2xl px-4 py-3 text-base font-semibold uppercase tracking-[0.18em] text-white/85 transition hover:text-champagne"
                >
                  {item.label}
                </a>
              ) : (
                <NavLink
                  key={item.label}
                  to={item.href}
                  onClick={closeMenu}
                  className={({ isActive }) =>
                    `block rounded-2xl px-4 py-3 text-base font-semibold uppercase tracking-[0.18em] transition ${
                      isActive
                        ? "text-champagne"
                        : "text-white/85 hover:text-champagne"
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              ),
            )}

            {/* Login Link */}
            <NavLink
              to="/login"
              onClick={closeMenu}
              className={({ isActive }) =>
                `block rounded-2xl px-4 py-3 text-base font-semibold uppercase tracking-[0.18em] text-white/85 transition ${
                  isActive
                    ? "text-champagne"
                    : "text-white/75 hover:text-champagne"
                } mb-2`
              }
            >
              Login
            </NavLink>

            {/* Mobile action buttons */}
            <div className="flex flex-col gap-3 mt-2">
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                onClick={closeMenu}
                className="inline-flex w-full items-center justify-center gap-3 rounded-full border border-emerald-400/30 bg-gradient-to-r from-emerald-500 via-emerald-500 to-emerald-600 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-white shadow-[0_14px_28px_-14px_rgba(16,185,129,0.95)] transition duration-300 hover:-translate-y-0.5"
              >
                <span className="grid h-7 w-7 place-items-center rounded-full bg-white/15 ring-1 ring-white/15">
                  <FaWhatsapp size={16} />
                </span>
                Chat Us
              </a>

              <button
                className="btn-primary w-full text-center justify-center py-3 text-sm font-semibold uppercase tracking-[0.18em]"
                onClick={() => {
                  closeMenu();
                  onQuoteClick();
                }}
              >
                Get Quote
              </button>

              <NavLink
                to="/admin-login"
                onClick={closeMenu}
                className="w-full rounded-2xl px-4 py-3 text-center text-[11px] font-medium uppercase tracking-[0.22em] text-white/40 transition hover:text-white/70"
              >
                Admin
              </NavLink>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
