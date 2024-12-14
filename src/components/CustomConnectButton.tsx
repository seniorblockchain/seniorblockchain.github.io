import React from "react";
import { useTonConnectUI, useTonAddress } from "@tonconnect/ui-react";

export const CustomConnectButton: React.FC = () => {
  const [tonConnectUI] = useTonConnectUI();
  const userFriendlyAddress = useTonAddress();

  const handleConnect = async () => {
    if (!userFriendlyAddress) {
      try {
        // Initiate wallet connection
        await tonConnectUI.connectWallet();
      } catch (error) {
        console.error("Error connecting wallet:", error);
      }
    } else {
      try {
        // Clear wallet session and prevent automatic reconnection
        localStorage.removeItem("tonconnect");
        tonConnectUI.disconnect();
        window.location.reload(); // Reload to reset state
      } catch (error) {
        console.error("Error disconnecting wallet:", error);
      }
    }
  };

  return (
    <section className="bg-gradient-to-r from-bgDark2 to-bgDark3 shadow-lg rounded-lg p-8 w-full max-w-lg mt-8 flex justify-center items-center mb-8">
      <button
        onClick={handleConnect}
        className={`w-full py-3 px-6 text-lg font-bold rounded-lg shadow-md transition-transform transform hover:scale-105 focus:ring-4 focus:outline-none ${
          userFriendlyAddress
            ? "bg-red-600 text-white hover:bg-red-700 focus:ring-red-400"
            : "bg-primaryColor text-white hover:bg-primaryHover focus:ring-primaryColor"
        }`}
        aria-label={userFriendlyAddress ? "Disconnect Wallet" : "Connect Wallet"}
      >
        {userFriendlyAddress ? "Disconnect Wallet" : "Connect Wallet"}
      </button>
    </section>
  );
};
