import React, { useEffect, useState } from 'react';
import useWeb3 from '../hooks/useWeb3';
import Nft_init from '../../contracts/Nft_init.json';
import NftGallery from './NftGallery';
import MintForm from './MintForm';

const Gallery = () => {
  const { web3, nfts, setNfts } = useWeb3();
  const [mintForm, setMintForm] = useState(false);

  let token;
  if (web3) {
    token = new web3.eth.Contract(
      Nft_init.abi,
      Nft_init.networks[5777].address
    );
  }

  const handleClick = () => setMintForm(!mintForm);

  useEffect(() => {
    if (!web3) return;
    const getNfts = async () => {
      const supply = await token.methods.totalSupply().call();
      let tokenURIs = [];
      for (let i = 0; i < supply; i++) {
        let tokenId = await token.methods.tokenByIndex(i).call();
        let uri = await token.methods.tokenURI(tokenId).call();
        tokenURIs.push(uri);
      }
      let jasons = [];
      for (let uri of tokenURIs) {
        const parsed = uri.slice(7);
        const fetched = await fetch(`https://ipfs.io/ipfs/${parsed}`);
        const data = await fetched.json();
        data.image = `https://ipfs.io/ipfs/${data.image.split('/')[2]}/blob`;
        jasons.push(data);
      }
      setNfts(jasons);
    };

    getNfts();
  }, [web3]);

  return (
    <div>
      <button onClick={handleClick}>MINT THE NFTS</button>
      {mintForm && <MintForm token={token} />}
      <NftGallery nfts={nfts} />
    </div>
  );
};

export default Gallery;
