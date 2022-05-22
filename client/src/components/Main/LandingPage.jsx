import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useWeb3 from '../hooks/useWeb3';
import { connectWallet } from '../Wallet/connectors';

const LandingPage = () => {
  const { setWeb3, walletAddress, setWalletAddress } = useWeb3();
  const navigate = useNavigate();
  const handleClick = async () => {
    try {
      const web3 = await connectWallet();
      const accounts = await web3.eth.getAccounts();
      const wallet = accounts[0]; // primary wallet
      setWalletAddress(wallet);
      setWeb3(web3);
      navigate('/gallery');
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <section className="text-center m-auto">
      <div className="container">
        <h1>IOU</h1>
        <h4>Decentralizing NFT Purchase Contracts</h4>
        <p>
          We connect buyers and sellers of NFTs through an auction environment
          with custom payment contracts.
        </p>
        <p>
          {walletAddress ? (
            <Link className="btn btn-dark" to="/gallery">
              View NFTs
            </Link>
          ) : (
            <button onClick={handleClick} className="btn btn-dark">
              Connect to Continue
            </button>
          )}
        </p>
      </div>
    </section>
  );
};

export default LandingPage;
