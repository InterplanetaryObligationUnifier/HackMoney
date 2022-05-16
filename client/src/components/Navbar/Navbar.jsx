import React from 'react';
import { Link } from 'react-router-dom';
import useWallet from '../hooks/useWallet';
import ConnectWalletBtn from './ConnectWalletBtn';

const Navbar = () => {
  const { walletAddress } = useWallet();
  return (
    <div id="navbar">
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        {walletAddress ? (
          <li>
            <Link to="/profile">Profile</Link>
          </li>
        ) : null}
        <li>
          <ConnectWalletBtn />
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
