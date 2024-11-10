import { TonConnectUI } from "@tonconnect/ui";

class WalletService {
  constructor() {
    this.tonConnect = null;
    this.isConnected = false;

    // Initialize only if localStorage and window are available
    if (typeof window !== "undefined" && typeof localStorage !== "undefined") {
      const storedConnectionStatus = JSON.parse(localStorage.getItem("isConnected"));
      this.isConnected = storedConnectionStatus || false;

      try {
        this.tonConnect = new TonConnectUI({
          manifestUrl: "https://seniorblockchain.io/tonconnect-manifest.json",
        });
      } catch (error) {
        console.error("TonConnectUI initialization failed:", error);
      }
    }
  }

  async connectWallet() {
    if (!this.tonConnect || this.isConnected) return;

    try {
      await this.tonConnect.connectWallet();
      this.isConnected = true;
      localStorage.setItem("isConnected", true);
    } catch (error) {
      console.error("Wallet connection failed:", error);
    }
  }

  disconnectWallet() {
    if (!this.tonConnect || !this.isConnected) return;

    this.tonConnect.disconnect();
    this.isConnected = false;
    localStorage.setItem("isConnected", false);
  }

  getConnectionStatus() {
    return this.isConnected;
  }
}

export default new WalletService();
