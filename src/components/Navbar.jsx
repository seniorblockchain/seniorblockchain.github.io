import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import WalletService from "../services/WalletService";
import { SeniorBlockchainLogo } from "../assets/logos/SeniorBlockchainLogo";
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
  const [isConnected, setIsConnected] = useState(false);
  const [isClient, setIsClient] = useState(false); // To handle SSR

  // Check the connection status on the client side
  useEffect(() => {
    setIsClient(true); // Mark that the component has mounted on the client

    if (WalletService.getConnectionStatus()) {
      setIsConnected(true);
    }
  }, []);

  const connectWallet = async () => {
    await WalletService.connectWallet();
    setIsConnected(WalletService.getConnectionStatus());
  };

  const disconnectWallet = () => {
    WalletService.disconnectWallet();
    setIsConnected(WalletService.getConnectionStatus());
  };

  if (!isClient) {
    // Render a placeholder during SSR to avoid mismatches
    return null;
  }

  return (
    <nav
      className="w-full h-20 flex flex-col justify-center items-center fixed bg-bgDark1 lg:bg-bgDarkTransparent z-40 lg:backdrop-blur-xl"
      aria-label="Main navigation"
    >
      <div className="2xl:w-[1280px] xl:w-10/12 w-11/12 flex justify-between items-center relative">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }} exit={{ opacity: 0 }}>
          <a href="/#home" aria-label="Home">
            <div className="flex justify-start items-center grow basis-0">
              <div className="text-white mr-2 text-6xl">
                <SeniorBlockchainLogo />
              </div>
              <div className="text-white font-['Inter'] font-bold text-xl">Senior Blockchain</div>
            </div>
          </a>
        </motion.div>

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
      </div>
    </nav>
  );
};
