import { Menu, X } from "lucide-react";
import { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import logo from "../assets/imperial_logo.png"; 

const navItems = [
  { label: "About", href: "/#about" },
  { label: "Jacuzzi Bathtubs", href: "/#jacuzzi" },
  { label: "Projects", href: "/#projects" },
  { label: "Contact Us", href: "/contact" },
];

const Navbar = ({ onQuoteClick }) => {
  const [isOpen, setIsOpen] = useState(false);
  const closeMenu = () => setIsOpen(false);

  const whatsappLink = "https://wa.me/message/NRKZJWGA3TRLI1";

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-ink/90 text-white backdrop-blur-xl">
      <nav className="container-shell flex h-20 items-center justify-between">
        
        {/* Logo Section */}
        <Link to="/" className="flex items-center gap-1" onClick={closeMenu}>
          <img
            src={logo}
            alt="Imperial Logo"
            className="h-[80px] w-[80px] object-contain ml-[-30px]"
          />
          <span>
            <span className="block font-display text-2xl font-bold leading-none text-[#D4AF37]">Imperial</span>
            <span className="text-[9px] font-bold uppercase tracking-[0.32em] text-[#D4AF37]">Bath solutions</span>
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
                    isActive ? "text-champagne" : "text-white/70 hover:text-champagne"
                  }`
                }
              >
                {item.label}
              </NavLink>
            )
          )}
        </div>

        {/* Desktop Buttons Section (Chat Us aur Get Quote dono box mein) */}
        <div className="flex items-center gap-3">
          {/* Chat Us Box Button (Desktop) */}
          <a 
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary hidden lg:inline-flex text-sm font-semibold uppercase tracking-[0.18em]"
          >
            Chat Us
          </a>

          {/* Get Quote Box Button (Desktop) */}
          <button className="btn-primary hidden lg:inline-flex" onClick={onQuoteClick}>
            Get Quote
          </button>

          <NavLink
            to="/admin-login"
            className="btn-primary hidden lg:inline-flex text-sm font-semibold uppercase tracking-[0.18em]"
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
        <div className="border-t border-white/10 bg-ink lg:hidden">
          <div className="container-shell grid gap-1 py-5">
            {navItems.map((item) =>
              item.href.startsWith("/#") ? (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={closeMenu}
                  className="block px-2 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-white/75 hover:text-champagne"
                >
                  {item.label}
                </a>
              ) : (
                <NavLink
                  key={item.label}
                  to={item.href}
                  onClick={closeMenu}
                  className={({ isActive }) => 
                    `block px-2 py-3 text-sm font-semibold uppercase tracking-[0.18em] ${
                      isActive ? "text-champagne" : "text-white/75 hover:text-champagne"
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              )
            )}
            
            {/* Login Link */}
            <NavLink 
              to="/login" 
              onClick={closeMenu} 
              className={({ isActive }) => 
                `block px-2 py-3 text-sm font-semibold uppercase tracking-[0.18em] mb-4 ${
                  isActive ? "text-champagne" : "text-white/75 hover:text-champagne"
                }`
              }
            >
              Login
            </NavLink>

            {/* Mobile View Buttons (Done full width box mein dikhenge) */}
            <div className="flex flex-col gap-2 mt-2">
              <a 
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                onClick={closeMenu}
                className="btn-primary w-full text-center justify-center py-3 text-sm font-semibold uppercase tracking-[0.18em]"
              >
                Chat Us
              </a>

              <button 
                className="btn-primary w-full text-center justify-center py-3" 
                onClick={() => { closeMenu(); onQuoteClick(); }}
              >
                Get Quote
              </button>

              <NavLink
                to="/admin-login"
                onClick={closeMenu}
                className="btn-primary w-full text-center justify-center py-3 text-sm font-semibold uppercase tracking-[0.18em]"
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
