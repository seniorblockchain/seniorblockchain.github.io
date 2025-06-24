import React, { useState, useEffect } from "react";
import { useTonConnectUI, useTonAddress } from "@tonconnect/ui-react";
import { handleSendUsdt } from "../payments/sendUsdt";
import { CustomConnectButton } from "./CustomConnectButton";
import { getJettonWalletAddress } from "../utils/getJettonWalletAddress";
import { USDT_MASTER_ADDRESS } from "../utils/transactionConfig";

const Send: React.FC = () => {
  const [tonConnectUI] = useTonConnectUI();
  const userFriendlyAddress = useTonAddress();
  const rawAddress = useTonAddress(false);
  const [usdtAmount, setUsdtAmount] = useState<number>(0);
  const [usdtBalance, setUsdtBalance] = useState<number>(0);
  const [isLoadingBalance, setIsLoadingBalance] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'buy' | 'portfolio' | 'history' | 'analysis'>('buy');

  // Fetch USDT balance when wallet is connected
  useEffect(() => {
    const fetchUsdtBalance = async () => {
      if (!userFriendlyAddress) {
        setUsdtBalance(0);
        return;
      }

      setIsLoadingBalance(true);
      try {
        const result = await getJettonWalletAddress(userFriendlyAddress, USDT_MASTER_ADDRESS);
        if (result.balance) {
          // Convert from smallest unit to USDT (6 decimals)
          const balanceInUsdt = result.balance / 1_000_000;
          setUsdtBalance(balanceInUsdt);
        } else {
          setUsdtBalance(0);
        }
      } catch (error) {
        console.error('Error fetching USDT balance:', error);
        setUsdtBalance(0);
      } finally {
        setIsLoadingBalance(false);
      }
    };

    fetchUsdtBalance();
  }, [userFriendlyAddress]);

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
                <div className="text-primaryText text-lg font-bold">
                  {userFriendlyAddress ? (
                    isLoadingBalance ? (
                      <span className="text-secondaryText">Loading...</span>
                    ) : (
                      `${usdtBalance.toFixed(2)} USDT`
                    )
                  ) : (
                    "N/A"
                  )}
                </div>
                <div className="text-secondaryText text-xs">TON Network</div>
              </div>
            </div>

            {/* Tab Navigation */}
            <div className="bg-bgDark2/50 backdrop-blur-sm rounded-2xl border border-mainBorder mb-6">
              <div className="flex flex-wrap gap-2 p-2">
                <button
                  onClick={() => setActiveTab('buy')}
                  className={`flex-1 min-w-[120px] px-4 py-3 rounded-xl font-medium transition-all duration-300 flex items-center justify-center gap-2 ${
                    activeTab === 'buy'
                      ? 'bg-primaryColor text-white shadow-lg'
                      : 'text-secondaryText hover:text-primaryText hover:bg-bgDark3/50'
                  }`}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  Buy SBC
                </button>
                <button
                  onClick={() => setActiveTab('portfolio')}
                  className={`flex-1 min-w-[120px] px-4 py-3 rounded-xl font-medium transition-all duration-300 flex items-center justify-center gap-2 ${
                    activeTab === 'portfolio'
                      ? 'bg-primaryColor text-white shadow-lg'
                      : 'text-secondaryText hover:text-primaryText hover:bg-bgDark3/50'
                  }`}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                  Portfolio
                </button>
                <button
                  onClick={() => setActiveTab('history')}
                  className={`flex-1 min-w-[120px] px-4 py-3 rounded-xl font-medium transition-all duration-300 flex items-center justify-center gap-2 ${
                    activeTab === 'history'
                      ? 'bg-primaryColor text-white shadow-lg'
                      : 'text-secondaryText hover:text-primaryText hover:bg-bgDark3/50'
                  }`}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                  History
                </button>
                <button
                  onClick={() => setActiveTab('analysis')}
                  className={`flex-1 min-w-[120px] px-4 py-3 rounded-xl font-medium transition-all duration-300 flex items-center justify-center gap-2 ${
                    activeTab === 'analysis'
                      ? 'bg-primaryColor text-white shadow-lg'
                      : 'text-secondaryText hover:text-primaryText hover:bg-bgDark3/50'
                  }`}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  Analysis
                </button>
              </div>
            </div>

            {/* Tab Content */}
            <div className="bg-bgDark2/50 backdrop-blur-sm rounded-2xl border border-mainBorder p-6 min-h-[600px]">
              {activeTab === 'buy' && (
                <div>
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
                      <span className="text-secondaryText text-sm">
                        Balance: {isLoadingBalance ? (
                          <span className="animate-pulse">Loading...</span>
                        ) : (
                          `${usdtBalance.toFixed(2)} USDT`
                        )}
                      </span>
                    </div>
                    <div className="flex items-center gap-4">
                      <input
                        type="number"
                        value={usdtAmount}
                        onChange={(e) => {
                          const value = parseFloat(e.target.value) || 0;
                          const maxValue = Math.min(value, usdtBalance);
                          setUsdtAmount(maxValue >= 0 ? maxValue : 0);
                        }}
                        placeholder="0.00"
                        min="0"
                        max={usdtBalance}
                        step="0.01"
                        className="flex-1 bg-transparent text-2xl font-bold text-primaryText placeholder-secondaryText focus:outline-none"
                      />
                      <div className="flex items-center gap-2 bg-green-500/20 rounded-lg px-3 py-2">
                        <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-xs font-bold text-white">$</div>
                        <span className="font-medium">USDT</span>
                      </div>
                    </div>
                    <div className="flex justify-end mt-2">
                      <button 
                        onClick={() => setUsdtAmount(usdtBalance)}
                        disabled={!userFriendlyAddress || usdtBalance === 0}
                        className="text-primaryColor text-sm hover:text-secondaryColor transition-colors disabled:text-secondaryText disabled:cursor-not-allowed"
                      >
                        Max
                      </button>
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
                    disabled={!userFriendlyAddress || usdtAmount <= 0 || usdtAmount > usdtBalance || isLoadingBalance}
                    className={`w-full py-4 rounded-xl text-lg font-bold transition-all duration-300 ${
                      userFriendlyAddress && usdtAmount > 0 && usdtAmount <= usdtBalance && !isLoadingBalance
                        ? "bg-gradient-to-r from-primaryColor to-secondaryColor hover:from-secondaryColor hover:to-primaryColor text-white shadow-lg hover:shadow-primaryColor/25 transform hover:scale-[1.02]"
                        : "bg-bgDark3 text-secondaryText cursor-not-allowed"
                    }`}
                  >
                    {!userFriendlyAddress 
                      ? "Connect Wallet" 
                      : isLoadingBalance 
                        ? "Loading Balance..." 
                        : usdtAmount <= 0 
                          ? "Enter Amount" 
                          : usdtAmount > usdtBalance 
                            ? "Insufficient Balance" 
                            : "Buy SBC Tokens"}
                  </button>
                </div>
              )}

              {activeTab === 'portfolio' && (
                <div>
                  <h2 className="text-2xl font-bold text-primaryText mb-6 flex items-center gap-3">
                    <div className="bg-primaryColor/20 p-2 rounded-lg">
                      <svg className="w-6 h-6 text-primaryColor" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                      </svg>
                    </div>
                    📊 Portfolio Summary
                  </h2>
                  
                  {!userFriendlyAddress ? (
                    <div className="text-center py-12">
                      <div className="bg-orange-500/20 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                        <svg className="w-8 h-8 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 0h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                      </div>
                      <h3 className="text-xl font-bold text-orange-400 mb-2">🔒 Wallet Required</h3>
                      <p className="text-secondaryText">Please connect your wallet to view portfolio details</p>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      {/* Wallet Overview */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-bgDark3/50 rounded-xl p-6">
                          <h3 className="text-lg font-bold text-primaryText mb-4">💼 Wallet Details</h3>
                          <div className="space-y-3">
                            <div>
                              <span className="text-secondaryText text-sm">Address:</span>
                              <p className="text-primaryText font-mono text-sm break-all mt-1">{userFriendlyAddress}</p>
                            </div>
                            <div>
                              <span className="text-secondaryText text-sm">Network:</span>
                              <p className="text-primaryText font-medium">TON Blockchain</p>
                            </div>
                            <div>
                              <span className="text-secondaryText text-sm">Status:</span>
                              <span className="inline-flex items-center gap-1 bg-green-500/20 text-green-400 px-2 py-1 rounded-lg text-sm font-medium ml-2">
                                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                                Active
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="bg-bgDark3/50 rounded-xl p-6">
                          <h3 className="text-lg font-bold text-primaryText mb-4">💰 Balance Overview</h3>
                          <div className="space-y-3">
                            <div className="flex justify-between items-center">
                              <span className="text-secondaryText">USDT Balance:</span>
                              <span className="text-primaryText font-bold">
                                {isLoadingBalance ? (
                                  <span className="animate-pulse">Loading...</span>
                                ) : (
                                  `${usdtBalance.toFixed(6)} USDT`
                                )}
                              </span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-secondaryText">Estimated SBC:</span>
                              <span className="text-primaryColor font-bold">{(usdtBalance * 100).toFixed(0)} SBC</span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-secondaryText">Portfolio Value:</span>
                              <span className="text-green-400 font-bold">${(usdtBalance + (usdtBalance * 100 * 0.01)).toFixed(2)}</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Asset Breakdown */}
                      <div className="bg-bgDark3/50 rounded-xl p-6">
                        <h3 className="text-lg font-bold text-primaryText mb-4">📈 Asset Breakdown</h3>
                        <div className="space-y-4">
                          <div className="flex items-center justify-between p-4 bg-bgDark3/30 rounded-lg">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white font-bold">$</div>
                              <div>
                                <p className="text-primaryText font-medium">USDT</p>
                                <p className="text-secondaryText text-sm">Tether USD</p>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="text-primaryText font-bold">{usdtBalance.toFixed(6)}</p>
                              <p className="text-secondaryText text-sm">${usdtBalance.toFixed(2)}</p>
                            </div>
                          </div>
                          
                          <div className="flex items-center justify-between p-4 bg-bgDark3/30 rounded-lg opacity-60">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 bg-primaryColor rounded-full flex items-center justify-center text-white font-bold">S</div>
                              <div>
                                <p className="text-primaryText font-medium">SBC</p>
                                <p className="text-secondaryText text-sm">Senior Blockchain</p>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="text-secondaryText">0.00</p>
                              <p className="text-secondaryText text-sm">$0.00</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Recent Activity */}
                      <div className="bg-bgDark3/50 rounded-xl p-6">
                        <h3 className="text-lg font-bold text-primaryText mb-4">⚡ Recent Activity</h3>
                        <div className="space-y-3">
                          <div className="flex items-center gap-3 p-3 bg-bgDark3/30 rounded-lg">
                            <div className="w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center">
                              <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                            </div>
                            <div className="flex-1">
                              <p className="text-primaryText text-sm font-medium">Wallet Connected</p>
                              <p className="text-secondaryText text-xs">{new Date().toLocaleDateString()}</p>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-3 p-3 bg-bgDark3/30 rounded-lg">
                            <div className="w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center">
                              <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                              </svg>
                            </div>
                            <div className="flex-1">
                              <p className="text-primaryText text-sm font-medium">Balance Loaded</p>
                              <p className="text-secondaryText text-xs">{usdtBalance.toFixed(2)} USDT detected</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'history' && (
                <div>
                  <h2 className="text-2xl font-bold text-primaryText mb-6 flex items-center gap-3">
                    <div className="bg-blue-500/20 p-2 rounded-lg">
                      <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                      </svg>
                    </div>
                    📋 Transaction History
                  </h2>
                  
                  {!userFriendlyAddress ? (
                    <div className="text-center py-12">
                      <div className="bg-orange-500/20 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                        <svg className="w-8 h-8 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 0h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                      </div>
                      <h3 className="text-xl font-bold text-orange-400 mb-2">🔒 Wallet Required</h3>
                      <p className="text-secondaryText">Please connect your wallet to view transaction history</p>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      {/* Transaction Stats */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-bgDark3/50 rounded-xl p-6 text-center">
                          <div className="text-2xl font-bold text-primaryColor mb-1">0</div>
                          <div className="text-secondaryText text-sm">Total Transactions</div>
                        </div>
                        <div className="bg-bgDark3/50 rounded-xl p-6 text-center">
                          <div className="text-2xl font-bold text-green-400 mb-1">$0.00</div>
                          <div className="text-secondaryText text-sm">Total Volume</div>
                        </div>
                        <div className="bg-bgDark3/50 rounded-xl p-6 text-center">
                          <div className="text-2xl font-bold text-blue-400 mb-1">0</div>
                          <div className="text-secondaryText text-sm">SBC Purchased</div>
                        </div>
                      </div>

                      {/* Recent Transactions */}
                      <div className="bg-bgDark3/50 rounded-xl p-6">
                        <h3 className="text-lg font-bold text-primaryText mb-4">📊 Recent Transactions</h3>
                        <div className="text-center py-8">
                          <div className="bg-blue-500/20 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                            <svg className="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                            </svg>
                          </div>
                          <h4 className="text-lg font-bold text-primaryText mb-2">📝 No Transactions Yet</h4>
                          <p className="text-secondaryText text-sm mb-4">Your transaction history will appear here after your first SBC purchase.</p>
                          <div className="bg-bgDark3/30 rounded-lg p-4 text-left">
                            <h5 className="text-primaryText font-medium mb-2">💡 Quick Tips:</h5>
                            <ul className="text-secondaryText text-sm space-y-1">
                              <li>• All transactions are recorded on TON blockchain</li>
                              <li>• Transaction fees are automatically calculated</li>
                              <li>• History includes buy/sell orders and transfers</li>
                              <li>• Click on any transaction for detailed view</li>
                            </ul>
                          </div>
                        </div>
                      </div>

                      {/* Quick Actions */}
                      <div className="bg-bgDark3/50 rounded-xl p-6">
                        <h3 className="text-lg font-bold text-primaryText mb-4">🚀 Quick Actions</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <a 
                            href={`https://tonviewer.com/${userFriendlyAddress}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-3 p-4 bg-bgDark3/30 rounded-lg hover:bg-bgDark3/50 transition-colors"
                          >
                            <div className="bg-blue-500/20 p-2 rounded-lg">
                              <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                              </svg>
                            </div>
                            <div>
                              <p className="text-primaryText font-medium">View on TON Explorer</p>
                              <p className="text-secondaryText text-sm">Check blockchain activity</p>
                            </div>
                          </a>
                          
                          <button 
                            onClick={() => setActiveTab('buy')}
                            className="flex items-center gap-3 p-4 bg-primaryColor/20 rounded-lg hover:bg-primaryColor/30 transition-colors"
                          >
                            <div className="bg-primaryColor/20 p-2 rounded-lg">
                              <svg className="w-5 h-5 text-primaryColor" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                              </svg>
                            </div>
                            <div>
                              <p className="text-primaryColor font-medium">Make First Purchase</p>
                              <p className="text-secondaryText text-sm">Start your SBC journey</p>
                            </div>
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'analysis' && (
                <div>
                  <h2 className="text-2xl font-bold text-primaryText mb-6 flex items-center gap-3">
                    <div className="bg-purple-500/20 p-2 rounded-lg">
                      <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    📈 Market Analysis
                  </h2>

                  <div className="space-y-6">
                    {/* Current Metrics */}
                    <div className="bg-bgDark3/50 rounded-xl p-6">
                      <h3 className="text-lg font-bold text-primaryText mb-4">💰 Current Metrics</h3>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="text-center">
                          <div className="text-xl font-bold text-primaryColor">$0.01</div>
                          <div className="text-secondaryText text-sm">Current Price</div>
                          <div className="text-green-400 text-xs mt-1">+5.2% ↗️</div>
                        </div>
                        <div className="text-center">
                          <div className="text-xl font-bold text-primaryText">$125K</div>
                          <div className="text-secondaryText text-sm">24h Volume</div>
                          <div className="text-green-400 text-xs mt-1">+12.8% ↗️</div>
                        </div>
                        <div className="text-center">
                          <div className="text-xl font-bold text-primaryText">$2.5M</div>
                          <div className="text-secondaryText text-sm">Market Cap</div>
                          <div className="text-blue-400 text-xs mt-1">Stable</div>
                        </div>
                        <div className="text-center">
                          <div className="text-xl font-bold text-primaryText">35M</div>
                          <div className="text-secondaryText text-sm">Circulating</div>
                          <div className="text-purple-400 text-xs mt-1">14% of Total</div>
                        </div>
                      </div>
                    </div>

                    {/* Key Insights */}
                    <div className="bg-bgDark3/50 rounded-xl p-6">
                      <h3 className="text-lg font-bold text-primaryText mb-4">🎯 Key Insights</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
                          <div className="flex items-center gap-2 mb-2">
                            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                            <span className="text-green-400 font-medium">⚡ Strong Momentum</span>
                          </div>
                          <p className="text-secondaryText text-sm">Upward price movement with healthy trading volume</p>
                        </div>
                        
                        <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                          <div className="flex items-center gap-2 mb-2">
                            <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                            <span className="text-blue-400 font-medium">🌐 Growing Community</span>
                          </div>
                          <p className="text-secondaryText text-sm">Increasing adoption and community engagement</p>
                        </div>
                        
                        <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-4">
                          <div className="flex items-center gap-2 mb-2">
                            <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                            <span className="text-purple-400 font-medium">💎 Regular Dividends</span>
                          </div>
                          <p className="text-secondaryText text-sm">Upcoming dividend distribution in 365 days</p>
                        </div>
                        
                        <div className="bg-orange-500/10 border border-orange-500/30 rounded-lg p-4">
                          <div className="flex items-center gap-2 mb-2">
                            <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                            <span className="text-orange-400 font-medium">🔒 TON Ecosystem</span>
                          </div>
                          <p className="text-secondaryText text-sm">Built on fast and secure TON blockchain</p>
                        </div>
                      </div>
                    </div>

                    {/* Technical Analysis */}
                    <div className="bg-bgDark3/50 rounded-xl p-6">
                      <h3 className="text-lg font-bold text-primaryText mb-4">📊 Technical Analysis</h3>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between p-3 bg-bgDark3/30 rounded-lg">
                          <span className="text-secondaryText">Support Level</span>
                          <span className="text-green-400 font-bold">$0.008</span>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-bgDark3/30 rounded-lg">
                          <span className="text-secondaryText">Resistance Level</span>
                          <span className="text-orange-400 font-bold">$0.015</span>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-bgDark3/30 rounded-lg">
                          <span className="text-secondaryText">RSI (14)</span>
                          <span className="text-blue-400 font-bold">65 (Bullish)</span>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-bgDark3/30 rounded-lg">
                          <span className="text-secondaryText">Trend Direction</span>
                          <span className="text-green-400 font-bold">Upward ⬆️</span>
                        </div>
                      </div>
                    </div>

                    {/* Investment Summary */}
                    <div className="bg-gradient-to-r from-primaryColor/10 to-secondaryColor/10 border border-primaryColor/30 rounded-xl p-6">
                      <h3 className="text-lg font-bold text-primaryColor mb-4">💡 Investment Summary</h3>
                      <div className="space-y-3">
                        <p className="text-primaryText text-sm">
                          <strong>SBC (Senior Blockchain)</strong> shows strong fundamentals with consistent growth potential and regular dividend distributions.
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                          <div className="bg-bgDark3/30 rounded-lg p-3">
                            <h4 className="text-primaryText font-medium mb-2">✅ Strengths:</h4>
                            <ul className="text-secondaryText text-sm space-y-1">
                              <li>• Strong price momentum (+5.2%)</li>
                              <li>• Regular dividend system</li>
                              <li>• TON blockchain integration</li>
                              <li>• Growing trading volume</li>
                            </ul>
                          </div>
                          <div className="bg-bgDark3/30 rounded-lg p-3">
                            <h4 className="text-primaryText font-medium mb-2">🚀 Opportunities:</h4>
                            <ul className="text-secondaryText text-sm space-y-1">
                              <li>• Early adoption phase</li>
                              <li>• Limited circulating supply</li>
                              <li>• Upcoming dividend cycle</li>
                              <li>• TON ecosystem growth</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
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
                <div className="bg-bgDark3/50 rounded-lg p-3 mb-3">
                  <p className="text-xs text-secondaryText mb-1">Address:</p>
                  <p className="text-sm text-primaryText font-mono truncate">{userFriendlyAddress}</p>
                </div>
                <div className="bg-bgDark3/50 rounded-lg p-3">
                  <p className="text-xs text-secondaryText mb-1">USDT Balance:</p>
                  <p className="text-sm text-primaryText font-bold">
                    {isLoadingBalance ? (
                      <span className="animate-pulse">Loading...</span>
                    ) : (
                      `${usdtBalance.toFixed(6)} USDT`
                    )}
                  </p>
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
            )}

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
