import { useState } from "react";
import { NavLink } from "react-router-dom";

import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

const navItems = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "APOD", path: "/apod" },
  { name: "Mars Rover", path: "/mars-rover" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-4 left-1/2 transform -translate-x-1/2 w-[95vw] max-w-5xl z-50 rounded-2xl bg-white/10 backdrop-blur-xl border border-cyan-400/20 shadow-[0_8px_32px_0_rgba(0,0,0,0.25)] transition-all duration-300">
      <div className="w-full px-4 sm:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <NavLink to="/" className="flex items-center gap-2 select-none">
            <img
              src="/logo.png"
              alt="StellarSnap Logo"
              className="h-10 w-10 rounded-full shadow-md border-2 border-cyan-400/40 bg-black/60"
              style={{ maxHeight: "40px" }}
            />
            <span className="font-black text-xl tracking-wider heading text-cyan-200 drop-shadow-sm">
              StellarSnap
            </span>
          </NavLink>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4 flex-wrap relative max-w-full">
            {navItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                className={({ isActive }) =>
                  `relative px-4 py-2 rounded-xl font-semibold text-base transition-all duration-200 group focus:outline-none focus:ring-2 focus:ring-cyan-400 nav-link shadow-sm backdrop-blur-md
                  ${
                    isActive
                      ? "text-cyan-300 bg-cyan-400/10 shadow-[0_0_8px_2px_#22d3ee55]"
                      : "text-white/90 hover:text-cyan-200 hover:bg-cyan-400/5"
                  }`
                }
                style={{ fontFamily: "Lexend, sans-serif" }}
              >
                {item.name}
                <span className="absolute left-1/2 -bottom-1 w-0 h-0.5 bg-cyan-400 transition-all duration-300 group-hover:w-3/4 group-focus:w-3/4 -translate-x-1/2 rounded-full"></span>
              </NavLink>
            ))}
          </div>

          {/* Mobile Navigation Button */}
          <button
            className="md:hidden text-cyan-200 hover:text-cyan-400 p-2 rounded-lg border border-cyan-400/30 bg-black/30 shadow"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? (
              <XMarkIcon className="h-7 w-7" />
            ) : (
              <Bars3Icon className="h-7 w-7" />
            )}
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        {isOpen && (
          <div className="md:hidden bg-white/10 backdrop-blur-xl rounded-2xl border border-cyan-400/20 shadow-lg mt-2">
            <div className="px-4 pt-4 pb-4 space-y-2">
              {navItems.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.path}
                  className={({ isActive }) =>
                    `block px-4 py-2 rounded-xl font-semibold text-base transition-all duration-200 nav-link shadow-sm backdrop-blur-md
                    ${
                      isActive
                        ? "text-cyan-300 bg-cyan-400/10 shadow-[0_0_8px_2px_#22d3ee55]"
                        : "text-white/90 hover:text-cyan-200 hover:bg-cyan-400/5"
                    }`
                  }
                  style={{ fontFamily: "Lexend, sans-serif" }}
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </NavLink>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
