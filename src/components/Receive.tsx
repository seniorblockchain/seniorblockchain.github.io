import React, { useState } from "react";
import { TonConnectButton, useTonConnectUI, useTonAddress } from "@tonconnect/ui-react";
import { handleSendSBC } from "../payments/sendSBC";
import { CustomConnectButton } from "./CustomConnectButton";

const Receive: React.FC = () => {
  const [tonConnectUI] = useTonConnectUI();
  const userFriendlyAddress = useTonAddress();
  const rawAddress = useTonAddress(false);
  const [sbcAmount, setSBCAmount] = useState<number>(0);

  return (
    <div className="flex flex-col items-center justify-center text-primaryText font-Inter p-8 min-h-screen bg-gradient-to-br from-bgDark1 to-bgDark2">


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
              <h2 className="text-2xl font-bold text-primaryColor">
                Wallet Connected
              </h2>
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
            htmlFor="sbcAmount"
            className="block text-lg font-semibold mb-3 text-primaryText"
          >
            Enter SBC Amount
          </label>
          <input
            type="number"
            id="sbcAmount"
            value={sbcAmount}
            onChange={(e) => setSBCAmount(parseFloat(e.target.value))}
            placeholder="Amount in SBC"
            min="0"
            className="w-full px-4 py-2 border border-mainBorder bg-bgDark3 text-primaryText rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primaryColor focus:border-primaryColor"
          />
          <p className="text-sm text-secondaryText mt-2">
      By sending this amount, you will receive <span className="font-bold text-primaryColor">{sbcAmount/100 || 0}</span> USDT.
    </p>
        </div>
        <button
          onClick={() => handleSendSBC(tonConnectUI, userFriendlyAddress, sbcAmount)}
          disabled={!userFriendlyAddress || sbcAmount <= 0}
          className={`w-full px-6 py-3 rounded-md text-lg font-semibold transition-transform transform ${
            userFriendlyAddress && sbcAmount > 0
              ? "bg-primaryColor text-white hover:bg-secondaryColor hover:scale-105 focus:ring-4 focus:ring-primaryColor"
              : "bg-bgDark4 text-secondaryText cursor-not-allowed"
          }`}
        >
          <i className="fas fa-paper-plane mr-2"></i>
          Sell SBC
        </button>
      </section>

      <section className="bg-gradient-to-r from-bgDark2 to-bgDark3 shadow-lg rounded-lg p-8 w-full max-w-lg mt-8">
  <a
    href="/buy"
    className="block w-full px-6 py-3 rounded-md text-lg font-semibold text-center bg-green-600 text-white hover:bg-green-700 transition-transform transform hover:scale-105 focus:ring-4 focus:ring-green-400"
  >
    Go to Buy Page
  </a>
</section>


    </div>
  );
};

export default Receive;
