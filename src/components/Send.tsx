import React, { useState, useEffect } from "react";
import { gsap } from "gsap";
import { TonConnectButton, useTonConnectUI, useTonAddress } from "@tonconnect/ui-react";
import { handleSendUsdt } from "../payments/sendUsdt";
import { CustomConnectButton } from "./CustomConnectButton"; 
interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const Send: React.FC = () => {
  const [tonConnectUI] = useTonConnectUI();
  const userFriendlyAddress = useTonAddress();
  const rawAddress = useTonAddress(false);
  const [usdtAmount, setUsdtAmount] = useState<number>(0);
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const targetDate = new Date("2025-03-01T00:00:00");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const diff = targetDate.getTime() - now.getTime();

      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / 1000 / 60) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      setTimeLeft({ days, hours, minutes, seconds });

      localStorage.setItem("rialTimer", JSON.stringify({ days, hours, minutes, seconds }));
    };

    const savedTimer = localStorage.getItem("rialTimer");
    if (savedTimer) {
      setTimeLeft(JSON.parse(savedTimer));
    }

    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    gsap.fromTo(
      ".timer-box",
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1, stagger: 0.2 }
    );
  }, []);

  return (
    <div className="flex flex-col items-center justify-center text-primaryText font-Inter p-8 min-h-screen bg-gradient-to-br from-bgDark1 to-bgDark2">
      {/* Countdown Timer */}
      <div className="flex flex-wrap justify-center items-center mb-8 mt-8">
        {Object.entries(timeLeft).map(([unit, value]) => (
          <div
            key={unit}
            className="timer-box bg-primaryColor text-white rounded-lg p-4 w-24 sm:w-28 lg:w-32 shadow-md flex flex-col items-center mx-2 mt-4"
          >
            <p className="text-3xl sm:text-4xl font-extrabold">{value}</p>
            <p className="text-sm sm:text-base mt-1 uppercase tracking-wide">{unit}</p>
          </div>
        ))}
      </div>

      {/* Wallet Connect Button */}
         <CustomConnectButton/>
 
 
       {/* Address Display (Only if Connected) */}
      {userFriendlyAddress && rawAddress ? (
        <section className="bg-gradient-to-r from-bgDark2 to-bgDark3 shadow-lg rounded-lg p-6 w-full max-w-lg transform transition hover:scale-105">
          <div className="flex items-center space-x-4">
            <div className="bg-primaryColor text-primaryText rounded-full p-3">
              <i className="fas fa-wallet text-xl"></i>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-primaryColor">Wallet Connected</h2>
              <p className="text-secondaryText text-sm">
                Your wallet is successfully connected. Start your transactions now.
              </p>
            </div>
          </div>
        </section>
      ) : (
        <div className="bg-gradient-to-r from-bgDark3 to-bgDark2 text-secondaryText shadow-lg rounded-lg p-6 w-full max-w-lg text-center transform transition hover:scale-105">
          <p className="text-lg">Please connect your wallet to proceed.</p>
        </div>
      )}

      {/* USDT Input and Send Button */}
      <section className="bg-gradient-to-r from-bgDark2 to-bgDark3 shadow-lg rounded-lg p-8 w-full max-w-lg mt-8">
        <div className="mb-6">
          <label
            htmlFor="usdtAmount"
            className="block text-lg font-semibold mb-3 text-primaryText"
          >
            Enter USDT Amount
          </label>
          <input
            type="number"
            id="usdtAmount"
            value={usdtAmount}
            onChange={(e) => setUsdtAmount(parseFloat(e.target.value))}
            placeholder="Amount in USDT"
            min="0"
            className="w-full px-4 py-2 border border-mainBorder bg-bgDark3 text-primaryText rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primaryColor focus:border-primaryColor"
          />
          <p className="text-sm text-secondaryText mt-2">
            By sending this amount, you will receive{" "}
            <span className="font-bold text-primaryColor">{usdtAmount*100 || 0}</span> SBCs.
          </p>
        </div>
        <button
          onClick={() => handleSendUsdt(tonConnectUI, userFriendlyAddress, usdtAmount)}
          disabled={!userFriendlyAddress || usdtAmount <= 0}
          className={`w-full px-6 py-3 rounded-md text-lg font-semibold transition-transform transform ${
            userFriendlyAddress && usdtAmount > 0
              ? "bg-primaryColor text-white hover:bg-secondaryColor hover:scale-105 focus:ring-4 focus:ring-primaryColor"
              : "bg-bgDark4 text-secondaryText cursor-not-allowed"
          }`}
        >
          <i className="fas fa-paper-plane mr-2"></i>
          Buy SBC
        </button>
      </section>

      <section className="bg-gradient-to-r from-bgDark2 to-bgDark3 shadow-lg rounded-lg p-8 w-full max-w-lg mt-8">
        <a
          href="/sell"
          className="block w-full px-6 py-3 rounded-md text-lg font-semibold text-center bg-red-600 text-white hover:bg-red-700 transition-transform transform hover:scale-105 focus:ring-4 focus:ring-red-400"
        >
          Go to Sell Page
        </a>
      </section>
    </div>
  );
};

export default Send;
