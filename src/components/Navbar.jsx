import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { SBCLogo } from "../assets/logos/SBCLogo";
import { WalletIcon } from "../assets/icons/WalletIcon";

const navbarLinks = [
  { label: "Home", href: "/#home", ariaLabel: "Home" },
  { label: "Features", href: "/#features", ariaLabel: "Features" },
  { label: "FAQ", href: "/#FAQ", ariaLabel: "FAQ" },
  { label: "Buy", href: "/buy", ariaLabel: "Buy SBC" },
];

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav
      className="w-full h-[calc(5rem+env(safe-area-inset-top,0px))] pt-[env(safe-area-inset-top,0px)] flex flex-col justify-center items-center fixed top-0 bg-bgDark1/95 backdrop-blur-xl border-b border-mainBorder z-50 shadow-xl"
      aria-label="Main navigation"
    >
      <div className="safe-x w-full max-w-7xl flex justify-between items-center lg:px-8">
        {/* Logo Section */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center space-x-3"
        >
          <a href="/#home" aria-label="Home" className="flex items-center group">
            <div className="bg-gradient-to-r from-primaryColor to-secondaryColor p-2 rounded-xl group-hover:shadow-lg group-hover:shadow-primaryColor/25 transition-all duration-300">
              <SBCLogo className="text-white text-2xl" />
            </div>
            <div className="ml-3">
              <span className="text-white font-bold text-xl tracking-tight">SBC</span>
              <div className="text-primaryColor text-xs font-medium">Senior Blockchain Company</div>
            </div>
          </a>
        </motion.div>

        {/* Desktop Navigation Links */}
        <motion.div
          className="hidden lg:flex items-center space-x-8"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {navbarLinks.map(({ href, label, ariaLabel }, index) => (
            <motion.a
              key={label}
              href={href}
              aria-label={ariaLabel}
              className="text-secondaryText hover:text-primaryColor font-medium text-base px-2 py-1 rounded-md transition-colors duration-200 focus:outline-none focus:ring-0 border-none bg-transparent shadow-none"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 + index * 0.1 }}
            >
              {label}
            </motion.a>
          ))}        </motion.div>        {/* Desktop Action Buttons */}
        <motion.div
          className="hidden lg:flex items-center space-x-4"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <a
            href="/buy"
            aria-label="Buy SBC"
            className="bg-gradient-to-r from-primaryColor to-secondaryColor hover:from-secondaryColor hover:to-primaryColor text-white font-bold py-2.5 px-6 rounded-xl text-sm transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-primaryColor/25 flex items-center gap-2"
          >
            <WalletIcon className="w-4 h-4" />
            Buy SBC
          </a>
        </motion.div>

        {/* Mobile Menu Toggle */}
        <motion.button
          className="lg:hidden flex flex-col justify-center items-center w-11 h-11 rounded-lg focus:outline-none group"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
          aria-expanded={isOpen}
          aria-controls="mobile-navigation"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <span className={`w-6 h-0.5 bg-white transition-all duration-300 ${isOpen ? 'rotate-45 translate-y-1.5' : ''}`}></span>
          <span className={`w-6 h-0.5 bg-white my-1 transition-all duration-300 ${isOpen ? 'opacity-0' : ''}`}></span>
          <span className={`w-6 h-0.5 bg-white transition-all duration-300 ${isOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></span>
        </motion.button>
      </div>

      {/* Mobile Navbar */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="mobile-navigation"
            className="menu-dropdown absolute right-[max(1rem,env(safe-area-inset-right,0px))] top-[calc(5rem+env(safe-area-inset-top,0px))] max-h-[calc(100dvh-6rem-env(safe-area-inset-top,0px)-env(safe-area-inset-bottom,0px))] overflow-y-auto overscroll-contain w-56 bg-bgDark2 border border-mainBorder rounded-xl shadow-2xl z-50 flex flex-col items-stretch py-3"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {navbarLinks.map(({ label, href, ariaLabel }, index) => (
              <motion.a
                key={label}
                href={href}
                aria-label={ariaLabel}
                onClick={() => setIsOpen(false)}
                className="px-5 py-3 text-secondaryText hover:text-primaryColor text-base font-medium transition-all duration-200 rounded-md bg-transparent border-none shadow-none focus:outline-none focus:ring-0 text-left"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.2, delay: index * 0.05 }}
              >
                {label}
              </motion.a>
            ))}
            <motion.a
              href="/buy"
              onClick={() => setIsOpen(false)}
              className="mx-4 mt-2 bg-gradient-to-r from-primaryColor to-secondaryColor text-white font-bold py-2 rounded-lg text-center text-base transition-all duration-200"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2, delay: 0.2 }}
            >
              Buy SBC
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
