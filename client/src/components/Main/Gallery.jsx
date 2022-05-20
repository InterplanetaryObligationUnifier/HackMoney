import React, { useEffect, useState } from 'react';
import useWeb3 from '../hooks/useWeb3';
import Nft_init from '../../contracts/Nft_init.json';
import { NFTStorage } from 'nft.storage';
import NftGallery from './NftGallery';

const API_KEY = process.env.REACT_APP_API_KEY;

const Gallery = () => {
  const { web3, walletAddress, nfts, setNfts } = useWeb3();
  const [mintForm, setMintForm] = useState(false);
  const [nftName, setNftName] = useState('');
  const [nftDescription, setNftDescription] = useState('');
  const [nftImg, setNftImg] = useState('');

  let token;
  if (web3) {
    token = new web3.eth.Contract(
      Nft_init.abi,
      Nft_init.networks[5777].address
    );
  }

  const getImage = async (img) => {
    const imageOriginUrl = img;
    try {
      const response = await fetch(imageOriginUrl);
      console.log('response', response);
      const image = await response.blob();
      return image;
    } catch (error) {
      console.error(error);
    }
  };
  const handleClick = () => setMintForm(!mintForm);

  const mint = async () => {
    const image = await getImage(nftImg);
    console.log('Your image is this blob', image);
    try {
      const nftToStore = {
        image,
        name: nftName,
        description: nftDescription,
        properties: {},
      };
      console.log(API_KEY, 'this is your API key');
      const client = new NFTStorage({ token: API_KEY });
      const metadata = await client.store(nftToStore);
      console.log('Metadata URI', metadata.url);
      const event = await token.methods
        .awardItem(walletAddress, metadata.url)
        .send({
          from: walletAddress,
        });
      console.log('event!: ', event);
      const tokenId = event.events.Transfer.returnValues.tokenId;
      const uri = await token.methods.tokenURI(tokenId).call();
      setNfts([...nfts, uri]);
    } catch (error) {
      console.error(error);
    }
  };

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
      {mintForm && (
        <div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              mint();
            }}
          >
            <label htmlFor="nftName">Nft Name</label>
            <input
              name="nftName"
              type="text"
              required={true}
              value={nftName}
              onChange={(e) => setNftName(e.target.value)}
            />
            <label htmlFor="nftDescription">Nft Description</label>
            <input
              name="nftDescription"
              type="text"
              required={true}
              value={nftDescription}
              onChange={(e) => setNftDescription(e.target.value)}
            />
            <label htmlFor="nftImg">Nft ImgURL</label>
            <input
              name="nftImg"
              type="text"
              required={true}
              value={nftImg}
              onChange={(e) => setNftImg(e.target.value)}
            />
            <button type="submit">MINT!</button>
          </form>
        </div>
      )}
      <NftGallery nfts={nfts} />
    </div>
  );
};

export default Gallery;
