import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TonConnectUI } from "@tonconnect/ui"; // Correct import
import { SeniorBlockchainLogo } from "../assets/logos/SeniorBlockchainLogo";
import { GithubIcon } from "../assets/icons/GithubIcon";
import { WalletIcon } from "../assets/icons/WalletIcon";

const navbarLinks = [
  { label: "Home", href: "/#home", ariaLabel: "Home" },
  { label: "Features", href: "/#features", ariaLabel: "Features" },
  { label: "Pricing", href: "/#pricing", ariaLabel: "Pricing" },
  { label: "Feedback", href: "/#feedback", ariaLabel: "Feedback" },
  { label: "FAQ", href: "/#FAQ", ariaLabel: "FAQ" },
];

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [tonConnect, setTonConnect] = useState(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      // Initialize TonConnect
      const tonConnectInstance = new TonConnectUI({
        manifestUrl: "https://seniorblockchain.io/tonconnect-manifest.json",
      });
      setTonConnect(tonConnectInstance);
    }
  }, []);

  const connectWallet = async () => {
    if (tonConnect) {
      try {
        await tonConnect.connectWallet();
        setIsConnected(true);
      } catch (error) {
        console.error("Wallet connection failed:", error);
      }
    }
  };

  const disconnectWallet = () => {
    if (tonConnect) {
      tonConnect.disconnect();
      setIsConnected(false);
    }
  };

  return (
    <nav
      className="w-full h-20 flex flex-col justify-center items-center fixed bg-bgDark1 lg:bg-bgDarkTransparent z-40 lg:backdrop-blur-xl"
      aria-label="Main navigation"
    >
      <div className="2xl:w-[1280px] xl:w-10/12 w-11/12 flex justify-between items-center relative">
        {/* Logo */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }} exit={{ opacity: 0 }}>
          <a href="/#home" aria-label="Home">
            <div className="flex justify-start items-center grow basis-0">
              <div className="text-white mr-2 text-6xl">
                <SeniorBlockchainLogo />
              </div>
              <div className="text-white font-['Inter'] font-bold text-xl">
                Senior Blockchain
              </div>
            </div>
          </a>
        </motion.div>

        {/* Navbar Links */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }} exit={{ opacity: 0 }}>
          <div className="hidden lg:flex h-full pl-12 pb-2">
            {navbarLinks.map(({ href, label, ariaLabel }) => (
              <a
                className="text-white lg:text-base text-2xl leading-6 mr-4 ml-4 2xl:mr-6 2xl:ml-6 cursor-pointer font-normal lg:font-medium hover:scale-110 transition h-full pt-2"
                href={href}
                aria-label={ariaLabel}
                key={label}
              >
                {label}
              </a>
            ))}
          </div>
        </motion.div>

        {/* Wallet Connect Button */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }} exit={{ opacity: 0 }}>
          <div className="grow basis-0 justify-end hidden lg:flex">
            {isConnected ? (
              <button
                onClick={disconnectWallet}
                className="text-white main-border-gray rounded-xl bg-red-500 hover:bg-red-600 border-gray-700 pl-6 pr-8 pt-2 pb-2 text-sm flex"
              >
                <WalletIcon />
                <span className="pt-px">Disconnect Wallet</span>
              </button>
            ) : (
              <button
                onClick={connectWallet}
                className="text-white main-border-gray rounded-xl bg-bgDark2 hover:bg-bgDark3 border-gray-700 pl-6 pr-8 pt-2 pb-2 text-sm flex"
              >
                <WalletIcon />
                <span className="pt-px">Connect Wallet</span>
              </button>
            )}
          </div>
        </motion.div>

        {/* Mobile Menu Toggle */}
        <div
          className="lg:hidden flex flex-col px-2 py-3 border-solid border border-gray-600 rounded-md cursor-pointer hover:bg-bgDark2"
          onClick={() => setIsOpen(!isOpen)}
        >
          <div className="w-5 h-0.5 bg-gray-500 mb-1"></div>
          <div className="w-5 h-0.5 bg-gray-500 mb-1"></div>
          <div className="w-5 h-0.5 bg-gray-500"></div>
        </div>
      </div>

      {/* Mobile Navbar */}
      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }} exit={{ opacity: 0 }}>
            <div className="flex flex-col mt-16 lg:hidden absolute top-4 left-0 bg-bgDark1 z-50 w-full items-center gap-10 pb-10 border-y border-solid border-bgDark3 pt-10">
              {navbarLinks.map(({ label, href, ariaLabel }) => (
                <a
                  key={href}
                  className="text-white lg:text-base text-2xl leading-6 mr-4 ml-4 2xl:mr-6 2xl:ml-6 cursor-pointer font-normal lg:font-medium hover:scale-110 transition duration-300 h-full pt-2"
                  href={href}
                  onClick={() => setIsOpen(false)}
                  aria-label={ariaLabel}
                >
                  {label}
                </a>
              ))}
              {isConnected ? (
                <button onClick={disconnectWallet} className="outlined-button pl-6 pr-8 pt-2 pb-2 flex">
                  <WalletIcon />
                  Disconnect Wallet
                </button>
              ) : (
                <button onClick={connectWallet} className="outlined-button pl-6 pr-8 pt-2 pb-2 flex">
                  <WalletIcon />
                  Connect Wallet
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
