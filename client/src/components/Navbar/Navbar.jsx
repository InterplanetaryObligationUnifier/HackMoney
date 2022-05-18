import React from 'react';
import { Link } from 'react-router-dom';
import useWeb3 from '../hooks/useWeb3';
import ConnectWalletBtn from './ConnectWalletBtn';

const Navbar = () => {
  const { walletAddress } = useWeb3();
  return (
    <div id="navbar">
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/gallery">Gallery</Link>
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
