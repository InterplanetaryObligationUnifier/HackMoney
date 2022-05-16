import React from 'react';
import useWallet from '../hooks/useWallet';
import ConnectWalletBtn from './ConnectWalletBtn';
import Login from './Login';

const Navbar = () => {
  const { walletAddress } = useWallet();
  return (
    <div>
      I'm a navbar!
      <Login />
      <ConnectWalletBtn />
      {walletAddress && `Welcome, ${walletAddress}`}
    </div>
  );
};

export default Navbar;
