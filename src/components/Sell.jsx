import { useState } from "react";
import { motion } from "framer-motion";
import { InvitationModal } from "./InvitationModal";
import dashboard from "../assets/images/dashboard.jpg";
import { TonConnectUIProvider, TonConnectButton } from "@tonconnect/ui-react";
import Send from "./Send";
import Receive from "./Receive";

export const Sell = () => {
  const manifestUrl = "https://seniorblockchain.io/tonconnect-manifest.json";

  return (

      <TonConnectUIProvider manifestUrl={manifestUrl}>
        <Receive client:only="react" />
      </TonConnectUIProvider>

      
  );
};
