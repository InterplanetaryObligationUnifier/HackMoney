import React, { useState } from 'react';
import { NFTStorage } from 'nft.storage';
import useWeb3 from '../hooks/useWeb3';

const MintForm = ({ token }) => {
  const { walletAddress, nfts, setNfts } = useWeb3();
  const API_KEY = process.env.REACT_APP_API_KEY;
  const [nftName, setNftName] = useState('');
  const [nftDescription, setNftDescription] = useState('');
  const [nftImg, setNftImg] = useState('');
  // On file select (from the pop up)
  const onFileChange = (e) => {
    const file = e.target.files[0];
    // console.log(file)
    // // Update state with the selected file.
    // const formData = {
    //   file,
    //   fileName: file.name
    // };
    //     // Send formData to state in MintForm
    setNftImg(file);
  };

  const mint = async () => {
    console.log(nftImg);
    console.log('Your image is this blob', nftImg);
    try {
      const nftToStore = {
        image: nftImg,
        name: nftName,
        description: nftDescription,
        properties: {},
      };
      console.log(API_KEY, 'this is your API key');
      const client = new NFTStorage({ token: API_KEY });
      const metadata = await client.store(nftToStore);
      console.log('ALL Metadata', metadata);
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
  const fileData = () => {
    if (nftImg) {
      return (
        <div>
          <h2>File Details:</h2>
          <p>File Name: {nftImg.name}</p>
          <p>File Type: {nftImg.type}</p>
          <p>Last Modified: {nftImg.lastModifiedDate.toDateString()}</p>
        </div>
      );
    } else {
      return (
        <div>
          <br />
          <h4>Choose before Pressing the Upload button</h4>
        </div>
      );
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
      <div>
        <h3>Select File to Upload</h3>
        <div>
          <input type="file" onChange={onFileChange} />
        </div>
        {fileData()}
      </div>
      <button type="submit">MINT!</button>
    </form>
  );
};

export default MintForm;
// const getImage = async (img) => {
//   const imageOriginUrl = img;
//   try {
//     const response = await fetch(imageOriginUrl);
//     console.log('response', response);
//     const image = await response.blob();
//     return image;
//   } catch (error) {
//     console.error(error);
//   }
// };
