import React, { useState } from "react";
import { useTonConnectUI, useTonAddress } from "@tonconnect/ui-react";
import { handleSendUsdt } from "../payments/sendUsdt";
import { CustomConnectButton } from "./CustomConnectButton";

const Send: React.FC = () => {
  const [tonConnectUI] = useTonConnectUI();
  const userFriendlyAddress = useTonAddress();
  const rawAddress = useTonAddress(false);
  const [usdtAmount, setUsdtAmount] = useState<number>(0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-bgDark1 via-bgDark2 to-bgDark3 text-primaryText font-Inter">
      {/* Header */}
      <div className="bg-bgDark2/80 backdrop-blur-md border-b border-mainBorder">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-primaryColor">
                Exchange Dashboard
              </h1>
              <p className="text-secondaryText text-sm sm:text-base mt-1">
                Buy SBC tokens securely and efficiently
              </p>
            </div>           
             <div className="flex items-center gap-4">

              <CustomConnectButton/>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Trading Panel */}
          <div className="lg:col-span-2">
            {/* Market Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
              <div className="bg-bgDark2/50 backdrop-blur-sm rounded-2xl p-4 border border-mainBorder">
                <div className="text-secondaryText text-xs uppercase tracking-wider mb-1">SBC Price</div>
                <div className="text-primaryColor text-lg font-bold">$0.01</div>
                <div className="text-green-400 text-xs">+5.2%</div>
              </div>
              <div className="bg-bgDark2/50 backdrop-blur-sm rounded-2xl p-4 border border-mainBorder">
                <div className="text-secondaryText text-xs uppercase tracking-wider mb-1">24h Volume</div>
                <div className="text-primaryText text-lg font-bold">$125K</div>
                <div className="text-green-400 text-xs">+12.8%</div>
              </div>
              <div className="bg-bgDark2/50 backdrop-blur-sm rounded-2xl p-4 border border-mainBorder">
                <div className="text-secondaryText text-xs uppercase tracking-wider mb-1">Market Cap</div>
                <div className="text-primaryText text-lg font-bold">$2.5M</div>
                <div className="text-blue-400 text-xs">Stable</div>
              </div>
              <div className="bg-bgDark2/50 backdrop-blur-sm rounded-2xl p-4 border border-mainBorder">
                <div className="text-secondaryText text-xs uppercase tracking-wider mb-1">Your Balance</div>
                <div className="text-primaryText text-lg font-bold">{userFriendlyAddress ? "Connected" : "N/A"}</div>
                <div className="text-secondaryText text-xs">TON Network</div>
              </div>
            </div>            {/* Trading Form */}
            <div className="bg-bgDark2/50 backdrop-blur-sm rounded-2xl border border-mainBorder p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-primaryText">Buy SBC Tokens</h2>
                <div className="flex items-center gap-2 bg-bgDark3 rounded-lg px-3 py-1">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-xs text-secondaryText">Market Open</span>
                </div>
              </div>

              {/* Trading Pair */}
              <div className="bg-bgDark3/50 rounded-xl p-4 mb-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-secondaryText text-sm">You Pay</span>
                  <span className="text-secondaryText text-sm">Balance: 0.00 USDT</span>
                </div>
                <div className="flex items-center gap-4">
                  <input
                    type="number"
                    value={usdtAmount}
                    onChange={(e) => setUsdtAmount(parseFloat(e.target.value))}
                    placeholder="0.00"
                    min="0"
                    className="flex-1 bg-transparent text-2xl font-bold text-primaryText placeholder-secondaryText focus:outline-none"
                  />
                  <div className="flex items-center gap-2 bg-bgDark2 rounded-lg px-3 py-2">
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-xs font-bold text-white">$</div>
                    <span className="font-medium">USDT</span>
                  </div>
                </div>
              </div>

              {/* Swap Arrow */}
              <div className="flex justify-center mb-6">
                <div className="bg-bgDark3 border-2 border-mainBorder rounded-full p-2">
                  <svg className="w-4 h-4 text-primaryColor" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                </div>
              </div>

              {/* Receive */}
              <div className="bg-bgDark3/50 rounded-xl p-4 mb-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-secondaryText text-sm">You Receive</span>
                  <span className="text-secondaryText text-sm">≈ ${(usdtAmount * 100 * 0.01).toFixed(2)}</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex-1 text-2xl font-bold text-primaryColor">
                    {usdtAmount ? (usdtAmount * 100).toFixed(0) : "0"}
                  </div>
                  <div className="flex items-center gap-2 bg-primaryColor/20 rounded-lg px-3 py-2">
                    <div className="w-6 h-6 bg-primaryColor rounded-full flex items-center justify-center text-xs font-bold text-white">S</div>
                    <span className="font-medium text-primaryColor">SBC</span>
                  </div>
                </div>
              </div>

              {/* Transaction Details */}
              <div className="bg-bgDark3/30 rounded-xl p-4 mb-6 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-secondaryText">Exchange Rate</span>
                  <span className="text-primaryText">1 USDT = 100 SBC</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-secondaryText">Network Fee</span>
                  <span className="text-primaryText">~0.05 TON</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-secondaryText">Slippage</span>
                  <span className="text-primaryText">0.1%</span>
                </div>
              </div>

              {/* Buy Button */}
              <button
                onClick={() => handleSendUsdt(tonConnectUI, userFriendlyAddress, usdtAmount)}
                disabled={!userFriendlyAddress || usdtAmount <= 0}
                className={`w-full py-4 rounded-xl text-lg font-bold transition-all duration-300 ${
                  userFriendlyAddress && usdtAmount > 0
                    ? "bg-gradient-to-r from-primaryColor to-secondaryColor hover:from-secondaryColor hover:to-primaryColor text-white shadow-lg hover:shadow-primaryColor/25 transform hover:scale-[1.02]"
                    : "bg-bgDark3 text-secondaryText cursor-not-allowed"
                }`}
              >
                {!userFriendlyAddress ? "Connect Wallet" : usdtAmount <= 0 ? "Enter Amount" : "Buy SBC Tokens"}
              </button>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Wallet Status */}
            {userFriendlyAddress ? (
              <div className="bg-gradient-to-r from-green-600/20 to-green-500/20 backdrop-blur-sm rounded-2xl border border-green-500/30 p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-green-500 text-white rounded-full p-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-green-400">Wallet Connected</h3>
                    <p className="text-secondaryText text-sm">Ready to trade</p>
                  </div>
                </div>
                <div className="bg-bgDark3/50 rounded-lg p-3">
                  <p className="text-xs text-secondaryText mb-1">Address:</p>
                  <p className="text-sm text-primaryText font-mono truncate">{userFriendlyAddress}</p>
                </div>
              </div>
            ) : (
              <div className="bg-gradient-to-r from-orange-600/20 to-orange-500/20 backdrop-blur-sm rounded-2xl border border-orange-500/30 p-6 text-center">
                <div className="bg-orange-500 text-white rounded-full p-3 w-12 h-12 mx-auto mb-4 flex items-center justify-center">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 0h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-orange-400 mb-2">Wallet Required</h3>
                <p className="text-secondaryText text-sm">Connect your wallet to start trading</p>
              </div>
            )}            {/* Quick Actions */}
            <div className="bg-bgDark2/50 backdrop-blur-sm rounded-2xl border border-mainBorder p-6">
              <h3 className="text-lg font-bold text-primaryText mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button className="block w-full bg-bgDark3 hover:bg-bgDark3Hover text-secondaryText font-medium py-3 px-4 rounded-xl text-center transition-all duration-300">
                  View Portfolio
                </button>
                <button className="block w-full bg-bgDark3 hover:bg-bgDark3Hover text-secondaryText font-medium py-3 px-4 rounded-xl text-center transition-all duration-300">
                  Transaction History
                </button>
                <button className="block w-full bg-bgDark3 hover:bg-bgDark3Hover text-secondaryText font-medium py-3 px-4 rounded-xl text-center transition-all duration-300">
                  Market Analysis
                </button>
              </div>
            </div>

            {/* Market Info */}
            <div className="bg-bgDark2/50 backdrop-blur-sm rounded-2xl border border-mainBorder p-6">
              <h3 className="text-lg font-bold text-primaryText mb-4">Market Information</h3>
              <div className="space-y-4">
                <div>
                  <div className="text-secondaryText text-sm mb-1">Total Supply</div>
                  <div className="text-primaryText font-bold">250,000,000 SBC</div>
                </div>
                <div>
                  <div className="text-secondaryText text-sm mb-1">Circulating Supply</div>
                  <div className="text-primaryText font-bold">35,000,000 SBC</div>
                </div>
                <div>
                  <div className="text-secondaryText text-sm mb-1">Next Dividend</div>
                  <div className="text-green-400 font-bold">365 days</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Send;
