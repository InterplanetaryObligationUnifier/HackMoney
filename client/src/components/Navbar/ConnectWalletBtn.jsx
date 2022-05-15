import React from 'react';
import useWallet from '../hooks/useWallet';
import { connectWallet } from '../Wallet/connectors';

const ConnectWalletBtn = () => {
  const { walletAddress, setWalletAddress, setWeb3 } = useWallet();

  const handleConnect = async () => {
    const web3 = await connectWallet();
    const accounts = await web3.eth.getAccounts();
    const wallet = accounts[0]; // primary wallet
    setWalletAddress(wallet);
    setWeb3(web3);
  };
  const handleDisconnect = () => {
    setWalletAddress(null);
  };

  return (
    <div>
      <button onClick={handleConnect}>Connect your wallet</button>
      {walletAddress && <button onClick={handleDisconnect}>Disconnect</button>}
    </div>
  );
};

export default ConnectWalletBtn;
