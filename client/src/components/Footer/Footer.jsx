import React from 'react';
import useWeb3 from '../hooks/useWeb3';

const Footer = () => {
  const { walletAddress } = useWeb3();
  return (
    <div
      id="footer"
      className="d-flex justify-content-center gap-5 align-items-center"
    >
      <h4 className="m-0">IOU</h4>
      {walletAddress && <div>{walletAddress}</div>}
    </div>
  );
};

export default Footer;
