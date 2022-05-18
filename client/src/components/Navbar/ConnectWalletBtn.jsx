import React from 'react';
import { useNavigate } from 'react-router-dom';
import useWeb3 from '../hooks/useWeb3';
import { connectWallet } from '../Wallet/connectors';

const ConnectWalletBtn = () => {
  const { walletAddress, setWalletAddress, setWeb3 } = useWeb3();
  const navigate = useNavigate();

  const handleConnect = async () => {
    try {
      const web3 = await connectWallet();
      const accounts = await web3.eth.getAccounts();
      const wallet = accounts[0]; // primary wallet
      setWalletAddress(wallet);
      setWeb3(web3);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDisconnect = () => {
    setWalletAddress(null);
    navigate('/');
  };

  return (
    <>
      {walletAddress ? (
        <div onClick={handleDisconnect}>Disconnect</div>
      ) : (
        <div onClick={handleConnect}>Connect Wallet</div>
      )}
    </>
  );
};

export default ConnectWalletBtn;
