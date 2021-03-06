import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useWeb3 from '../hooks/useWeb3';
import NftGallery from './NftGallery';
import Nft_init from '../../contracts/Nft_init.json';
import MintForm from './MintForm';

const Profile = () => {
  const { web3, walletAddress, nfts } = useWeb3();
  const [ethBalance, setEthBalance] = useState(null);
  const [mintForm, setMintForm] = useState(false);
  const [myNfts, setMyNfts] = useState(null);
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
      setEthBalance(balance / 1000000000000000000);
    } catch (error) {
      console.error(error);
    }
  };

  const handleClick = () => setMintForm(!mintForm);

  useEffect(() => {
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
            let uri = await token.methods.tokenURI(tokenId).call();
            ownerURIs.push({ uri, tokenId });
          }
          let jasons = [];
          for (let uri of ownerURIs) {
            console.log('uri: ', uri);
            const parsed = uri.uri.slice(7);
            const fetched = await fetch(`https://ipfs.io/ipfs/${parsed}`);
            const data = await fetched.json();
            console.log('data: ', data);
            data.image = `https://ipfs.io/ipfs/${data.image.slice(7)}`;
            data.tokenId = uri.tokenId;
            jasons.push(data);
          }
          console.log('here are jasons: ', jasons);
          setMyNfts(jasons);
        };

        getNfts(token);
      } catch (error) {
        console.error(error);
      }
    };
    handleNftBalance();
  }, [nfts]);

  return (
    <>
      {!web3 ? (
        navigate('/')
      ) : (
        <div>
          <h1>{`Welcome, ${walletAddress.slice(0, 5)}...${walletAddress.slice(
            37
          )}`}</h1>
          <button onClick={handleEthBalance}>See eth balance</button>
          <button onClick={handleClick}>Mint a new NFT</button>
          {mintForm && (
            <MintForm
              token={token}
              mintForm={mintForm}
              setMintForm={setMintForm}
            />
          )}
          {ethBalance && <h2>{`Eth: ${ethBalance}`}</h2>}
          {myNfts && (
            <>
              <h2>My Nfts:</h2>
              <NftGallery nfts={myNfts} owner={true} />
            </>
          )}
        </div>
      )}
    </>
  );
};

export default Profile;
