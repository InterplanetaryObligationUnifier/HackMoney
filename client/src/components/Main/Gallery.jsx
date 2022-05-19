import React, { useEffect } from 'react';
import useWeb3 from '../hooks/useWeb3';
import Nft_init from '../../contracts/Nft_init.json';
import { NFTStorage } from "nft.storage";

const API_KEY = process.env.REACT_APP_API_KEY

const Gallery = () => {
  const { web3, walletAddress, nfts, setNfts } = useWeb3();
  const token = new web3.eth.Contract(
    Nft_init.abi,
    Nft_init.networks[5777].address
  );
  const getExampleImage = async () => {
    const imageOriginUrl = "https://user-images.githubusercontent.com/87873179/144324736-3f09a98e-f5aa-4199-a874-13583bf31951.jpg"
    try {
      const response = await fetch(imageOriginUrl, { mode: 'no-cors' })
      console.log("Here is the returned blob", response.blob)
      return "TestImage.png"
    } catch (error) {
      console.error(error)
    }
  }
  const handleClick = async () => {
    const image = await getExampleImage()
    console.log("Your image is this blob", image)
    try {
      const nftToStore = {
        image, 
        name: "Hard coded",
        description: "Hard coded",
        properties: {},
      }
      console.log(API_KEY, "this is your API key")
      const client = new NFTStorage({ token: API_KEY })
      const metadata = await client.store(nftToStore)
      console.log('Metadata URI', metadata.url)
      const event = await token.methods
        .awardItem(
          walletAddress,
          metadata.url
        )
        .send({
          from: walletAddress,
        });
      console.log('event!: ', event);
      const tokenId = event.events.Transfer.returnValues.tokenId;
      const uri = await token.methods.tokenURI(tokenId).call();
      setNfts([...nfts, uri])
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    const getNfts = async() => {
      const owned = await token.methods.balanceOf(walletAddress).call()
      let tokenIds = [];
      for (let i = 0; i < owned ; i++){
        tokenIds.push(await token.methods.tokenOfOwnerByIndex(walletAddress, i).call())
      }
      let ownerURIs = [];
      for (let tokenId of tokenIds) {
        console.log(tokenId)
        ownerURIs.push(await token.methods.tokenURI(tokenId).call())
      }
      let jasons = []
      for (let uri of ownerURIs) {
        const parsed = uri.slice(7)
        const fetched = await fetch(`https://ipfs.io/ipfs/${parsed}`)
        const data = await fetched.json()
        data.image = `https://ipfs.io/ipfs/${data.image.split('/')[2]}/blob.png`
        jasons.push(data)
      }
      console.log("Here are the jasons", jasons)
      setNfts(jasons)
    }

      getNfts()
  },[])
  return (
    <div>
      <button onClick={handleClick}>MINT THE NFTS</button>
      <div className="glarrery">
        {nfts.map((nft, i) => {
          return (
            <div key={i}>
              <p>{nft.name}</p>
              <p>{nft.description}</p>
              <img src={nft.image} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Gallery;
