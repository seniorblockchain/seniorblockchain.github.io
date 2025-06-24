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
    <div className="min-h-screen bg-gradient-to-br from-bgDark1 via-bgDark2 to-bgDark3 text-primaryText font-Inter">
      {/* Header */}
      <div className="bg-bgDark2/80 backdrop-blur-md border-b border-mainBorder">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-red-400">
                Sell Dashboard
              </h1>
              <p className="text-secondaryText text-sm sm:text-base mt-1">
                Sell your SBC tokens for instant USDT
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
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">              <div className="bg-bgDark2/50 backdrop-blur-sm rounded-2xl p-4 border border-mainBorder">
                <div className="text-secondaryText text-xs uppercase tracking-wider mb-1">SBC Price</div>
                <div className="text-red-400 text-lg font-bold">$0.00</div>
                <div className="text-red-400 text-xs">Selling Disabled</div>
              </div>              <div className="bg-bgDark2/50 backdrop-blur-sm rounded-2xl p-4 border border-mainBorder">
                <div className="text-secondaryText text-xs uppercase tracking-wider mb-1">Sell Volume</div>
                <div className="text-primaryText text-lg font-bold">$0</div>
                <div className="text-red-400 text-xs">Disabled</div>
              </div>
              <div className="bg-bgDark2/50 backdrop-blur-sm rounded-2xl p-4 border border-mainBorder">
                <div className="text-secondaryText text-xs uppercase tracking-wider mb-1">Available</div>
                <div className="text-primaryText text-lg font-bold">{userFriendlyAddress ? "1,250 SBC" : "N/A"}</div>
                <div className="text-secondaryText text-xs">Your Balance</div>
              </div>              <div className="bg-bgDark2/50 backdrop-blur-sm rounded-2xl p-4 border border-mainBorder">
                <div className="text-secondaryText text-xs uppercase tracking-wider mb-1">Sell Status</div>
                <div className="text-red-400 text-lg font-bold">✗ Disabled</div>
                <div className="text-secondaryText text-xs">Not Available</div>
              </div></div>

            {/* Sell Form */}
            <div className="bg-bgDark2/50 backdrop-blur-sm rounded-2xl border border-mainBorder p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-primaryText">Sell SBC Tokens</h2>                <div className="flex items-center gap-2 bg-red-600/20 rounded-lg px-3 py-1">
                  <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                  <span className="text-xs text-red-400">Selling Disabled</span>
                </div>
              </div>

              {/* Sell Form */}
              <div className="bg-bgDark3/50 rounded-xl p-4 mb-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-secondaryText text-sm">You Sell</span>
                  <span className="text-secondaryText text-sm">Available: {userFriendlyAddress ? "1,250 SBC" : "0 SBC"}</span>
                </div>
                <div className="flex items-center gap-4">
                  <input
                    type="number"
                    value={sbcAmount}
                    onChange={(e) => setSBCAmount(parseFloat(e.target.value))}
                    placeholder="0"
                    min="0"
                    max={userFriendlyAddress ? 1250 : 0}
                    className="flex-1 bg-transparent text-2xl font-bold text-primaryText placeholder-secondaryText focus:outline-none"
                  />
                  <div className="flex items-center gap-2 bg-primaryColor/20 rounded-lg px-3 py-2">
                    <div className="w-6 h-6 bg-primaryColor rounded-full flex items-center justify-center text-xs font-bold text-white">S</div>
                    <span className="font-medium text-primaryColor">SBC</span>
                  </div>
                </div>
                <div className="flex justify-end mt-2">
                  <button 
                    onClick={() => setSBCAmount(userFriendlyAddress ? 1250 : 0)}
                    className="text-primaryColor text-sm hover:text-secondaryColor transition-colors"
                  >
                    Max
                  </button>
                </div>
              </div>

              {/* Swap Arrow */}
              <div className="flex justify-center mb-6">
                <div className="bg-bgDark3 border-2 border-mainBorder rounded-full p-2">
                  <svg className="w-4 h-4 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                  </svg>
                </div>
              </div>

              {/* Receive */}
              <div className="bg-bgDark3/50 rounded-xl p-4 mb-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-secondaryText text-sm">You Receive</span>
                  <span className="text-secondaryText text-sm">≈ ${(sbcAmount * 0.0098).toFixed(4)}</span>
                </div>
                <div className="flex items-center gap-4">                  <div className="flex-1 text-2xl font-bold text-red-400">
                    0.0000
                  </div>
                  <div className="flex items-center gap-2 bg-green-600/20 rounded-lg px-3 py-2">
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-xs font-bold text-white">$</div>
                    <span className="font-medium text-green-400">USDT</span>
                  </div>
                </div>
              </div>

              {/* Transaction Details */}
              <div className="bg-bgDark3/30 rounded-xl p-4 mb-6 space-y-2">                <div className="flex justify-between text-sm">
                  <span className="text-secondaryText">Exchange Rate</span>
                  <span className="text-red-400">Selling Disabled</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-secondaryText">Network Fee</span>
                  <span className="text-primaryText">~0.05 TON</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-secondaryText">Processing Time</span>
                  <span className="text-green-400">Instant</span>
                </div>
              </div>

              {/* Sell Button */}              <button
                disabled={true}
                className="w-full py-4 rounded-xl text-lg font-bold bg-bgDark3 text-secondaryText cursor-not-allowed"
              >
                Selling Currently Disabled
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
                    <p className="text-secondaryText text-sm">Ready to sell</p>
                  </div>
                </div>
                <div className="bg-bgDark3/50 rounded-lg p-3 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-secondaryText">SBC Balance:</span>
                    <span className="text-primaryColor font-bold">1,250 SBC</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-secondaryText">Value:</span>
                    <span className="text-green-400 font-bold">$12.25</span>
                  </div>
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
                <p className="text-secondaryText text-sm">Connect your wallet to view balance</p>
              </div>
            )}

            {/* Quick Actions */}
            <div className="bg-bgDark2/50 backdrop-blur-sm rounded-2xl border border-mainBorder p-6">
              <h3 className="text-lg font-bold text-primaryText mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <a
                  href="/buy"
                  className="block w-full bg-gradient-to-r from-primaryColor/20 to-secondaryColor/20 hover:from-primaryColor/30 hover:to-secondaryColor/30 border border-primaryColor/30 text-primaryColor font-medium py-3 px-4 rounded-xl text-center transition-all duration-300"
                >
                  Buy SBC Tokens
                </a>
                <button className="block w-full bg-bgDark3 hover:bg-bgDark3Hover text-secondaryText font-medium py-3 px-4 rounded-xl text-center transition-all duration-300">
                  View Portfolio
                </button>
                <button className="block w-full bg-bgDark3 hover:bg-bgDark3Hover text-secondaryText font-medium py-3 px-4 rounded-xl text-center transition-all duration-300">
                  Transaction History
                </button>
              </div>
            </div>

            {/* Sell Information */}
            <div className="bg-bgDark2/50 backdrop-blur-sm rounded-2xl border border-mainBorder p-6">
              <h3 className="text-lg font-bold text-primaryText mb-4">Sell Information</h3>
              <div className="space-y-4">
                <div>
                  <div className="text-secondaryText text-sm mb-1">Minimum Sell</div>
                  <div className="text-primaryText font-bold">10 SBC</div>
                </div>
                <div>
                  <div className="text-secondaryText text-sm mb-1">Daily Sell Limit</div>
                  <div className="text-primaryText font-bold">10,000 SBC</div>
                </div>
                <div>
                  <div className="text-secondaryText text-sm mb-1">Processing Time</div>
                  <div className="text-green-400 font-bold">Instant</div>
                </div>                <div>
                  <div className="text-secondaryText text-sm mb-1">Current Rate</div>
                  <div className="text-red-400 font-bold">Selling Disabled</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Receive;
