import React, { useState } from 'react';

export const Web3Context = React.createContext();

const Web3Provider = ({ children }) => {
  const [walletAddress, setWalletAddress] = useState(null);
  const [web3, setWeb3] = useState(null);
  const [nfts, setNfts] = useState([]);

  return (
    <Web3Context.Provider
      value={{ walletAddress, setWalletAddress, web3, nfts, setNfts, setWeb3 }}
    >
      {children}
    </Web3Context.Provider>
  );
};

export default Web3Provider;
