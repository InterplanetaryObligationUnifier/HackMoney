import React from 'react';
import { Link } from 'react-router-dom';
import useWeb3 from '../hooks/useWeb3';
import ConnectWalletBtn from './ConnectWalletBtn';

const Navbar = () => {
  const { walletAddress } = useWeb3();
  return (
    <div id="navbar" className="d-flex justify-content-between">
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        {walletAddress ? (
          <>
            <li>
              <Link to="/gallery">Gallery</Link>
            </li>
            <li>
              <Link to="/profile">Profile</Link>
            </li>
          </>
        ) : null}
      </ul>
      <ul>
        <li className={walletAddress ? 'btn btn-danger' : 'btn btn-primary'}>
          <ConnectWalletBtn />
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
