import React, { useState } from 'react';
import { NFTStorage } from 'nft.storage';
import useWeb3 from '../hooks/useWeb3';

const MintForm = ({ token }) => {
  const { walletAddress, nfts, setNfts } = useWeb3();
  const API_KEY = process.env.REACT_APP_API_KEY;
  const [nftName, setNftName] = useState('');
  const [nftDescription, setNftDescription] = useState('');
  const [nftImg, setNftImg] = useState('');

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

  return (
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
  );
};

export default MintForm;
