import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useWeb3 from '../hooks/useWeb3';
import NftGallery from './NftGallery';
import Nft_init from '../../contracts/Nft_init.json';
import MintForm from './MintForm';

const Profile = () => {
  const { web3, walletAddress } = useWeb3();
  const [ethBalance, setEthBalance] = useState(null);
  const [mintForm, setMintForm] = useState(false);
  const [nfts, setNfts] = useState(null);
  const navigate = useNavigate();

  let token;
  if (web3) {
    token = new web3.eth.Contract(
      Nft_init.abi,
      Nft_init.networks[5777].address
    );
  }

  useEffect(() => {
    if (!walletAddress) {
      navigate('/');
    }
  }, []);

  const handleEthBalance = async () => {
    try {
      const balance = await web3.eth.getBalance(walletAddress);
      setEthBalance(balance);
    } catch (error) {
      console.error(error);
    }
  };

  const handleClick = () => setMintForm(!mintForm);

  const handleNftBalance = async () => {
    try {
      const token = new web3.eth.Contract(
        Nft_init.abi,
        Nft_init.networks[5777].address
      );
      const getNfts = async (token) => {
        const owned = await token.methods.balanceOf(walletAddress).call();
        let tokenIds = [];
        for (let i = 0; i < owned; i++) {
          tokenIds.push(
            await token.methods.tokenOfOwnerByIndex(walletAddress, i).call()
          );
        }
        let ownerURIs = [];
        for (let tokenId of tokenIds) {
          console.log(tokenId);
          ownerURIs.push(await token.methods.tokenURI(tokenId).call());
        }
        let jasons = [];
        for (let uri of ownerURIs) {
          const parsed = uri.slice(7);
          const fetched = await fetch(`https://ipfs.io/ipfs/${parsed}`);
          const data = await fetched.json();
          data.image = `https://ipfs.io/ipfs/${data.image.split('/')[2]}/TestImage.png`;
          jasons.push(data);
        }
        console.log('Here are the jasons', jasons);
        setNfts(jasons);
      };

      getNfts(token);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>{`Welcome, ${walletAddress}`}</h1>
      <button onClick={handleEthBalance}>See eth balance</button>
      <button onClick={handleClick}>Mint a new NFT</button>
      {mintForm && <MintForm token={token} />}
      <button onClick={handleNftBalance}>Display NFTs</button>
      {ethBalance && <h2>{`Eth: ${ethBalance}`}</h2>}
      {nfts && (
        <>
          <h2>My Nfts:</h2>
          <NftGallery nfts={nfts} />
        </>
      )}
    </div>
  );
};

export default Profile;
