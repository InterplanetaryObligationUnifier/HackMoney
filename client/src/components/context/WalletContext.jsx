import React, { useState, useEffect } from 'react';

export const WalletContext = React.createContext();

const WalletProvider = ({ children }) => {
  const [walletAddress, setWalletAddress] = useState(null);
  const [web3, setWeb3] = useState(null);

  return (
    <WalletContext.Provider
      value={{ walletAddress, setWalletAddress, web3, setWeb3 }}
    >
      {children}
    </WalletContext.Provider>
  );
};

export default WalletProvider;
