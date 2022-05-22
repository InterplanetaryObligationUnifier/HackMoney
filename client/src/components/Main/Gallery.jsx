import React, { useEffect, useState } from 'react';
import useWeb3 from '../hooks/useWeb3';
import Nft_init from '../../contracts/Nft_init.json';
import NftGallery from './NftGallery';

const Gallery = () => {
  const { web3, nfts, setNfts } = useWeb3();
  const [forSaleNfts, setForSaleNfts] = useState(null);

  let token;
  if (web3) {
    token = new web3.eth.Contract(
      Nft_init.abi,
      Nft_init.networks[5777].address
    );
  }

  useEffect(() => {
    if (!web3) {
      return;
    }
    const contractAddress = Nft_init.networks[5777].address;
    const getAllNfts = async () => {
      const supply = await token.methods.totalSupply().call();
      let allTokenURIs = [];
      let forSaleTokenURIs = [];
      for (let i = 0; i < supply; i++) {
        let tokenId = await token.methods.tokenByIndex(i).call();
        let uri = await token.methods.tokenURI(tokenId).call();
        allTokenURIs.push({ uri, tokenId });
        // get NFTs owned by the contract, i.e. for sale
        let owner = await token.methods.ownerOf(tokenId).call();
        if (owner === contractAddress) {
          forSaleTokenURIs.push({ uri, tokenId });
        }
      }
      let allJasons = [];
      for (let uri of allTokenURIs) {
        const parsed = uri.uri.slice(7);
        const fetched = await fetch(`https://ipfs.io/ipfs/${parsed}`);
        const data = await fetched.json();
        data.image = `https://ipfs.io/ipfs/${data.image.slice(7)}`;
        data.tokenId = uri.tokenId;
        allJasons.push(data);
      }
      let forSaleJasons = [];
      for (let uri of forSaleTokenURIs) {
        const parsed = uri.uri.slice(7);
        const fetched = await fetch(`https://ipfs.io/ipfs/${parsed}`);
        const data = await fetched.json();
        data.image = `https://ipfs.io/ipfs/${data.image.slice(7)}`;
        data.tokenId = uri.tokenId;
        forSaleJasons.push(data);
      }

      setNfts(allJasons);
      setForSaleNfts(forSaleJasons);
    };

    getAllNfts();
  }, [web3]);

  return (
    <div>
      <h1 className="">All IOU NFTs</h1>
      <div className="w-100">
        <NftGallery nfts={nfts} horizontal={true} />
      </div>
      <div className="mt-3">
        <h4>Currently For Sale</h4>
        <NftGallery nfts={forSaleNfts} forSale={true} />
      </div>
    </div>
  );
};

export default Gallery;
