"use client";

import { useAccount, useConnect, useDisconnect } from "@starknet-react/core";
import { useMemo, useEffect } from "react";
import { Button } from "./ui/Button";
import React from 'react';

interface WalletBarProps {
  onWalletConnect?: (status: boolean) => void;
}

function WalletConnected({ onWalletConnect }: WalletBarProps) {
  const { address } = useAccount();
  const { disconnect } = useDisconnect();

  // Notify parent about the connection status
  useEffect(() => {
    if (onWalletConnect) {
      onWalletConnect(true);
    }
  }, [address, onWalletConnect]);

  const shortenedAddress = useMemo(() => {
    if (!address) return "";
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  }, [address]);

  return (
    <div>
      <span>Connected: {shortenedAddress}</span>
      <button onClick={() => disconnect()}>Disconnect</button>
    </div>
  );
}

function ConnectWallet() {
  const { connectors, connect } = useConnect();

  return (
    <div>
      <span>Login with wallet: </span>
      {connectors.map((connector) => {
        return (
          <Button
            key={connector.id}
            onClick={() => connect({ connector })}
            className="gap-x-2 mr-2"
          >
            {connector.id}
          </Button>
        );
      })}
    </div>
  );
}

export default function WalletBar({ onWalletConnect }: WalletBarProps) {
  const { address } = useAccount();

  return address ? (
    <WalletConnected onWalletConnect={onWalletConnect} />
  ) : (
    <ConnectWallet />
  );
}
