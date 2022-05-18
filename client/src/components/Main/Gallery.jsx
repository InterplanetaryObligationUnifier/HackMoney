import React from 'react';
import useWeb3 from '../hooks/useWeb3';
import ERC721PresetMinterPauserAutoId from '../../contracts/ERC721PresetMinterPauserAutoId.json';
import Nft_init from '../../contracts/Nft_init.json';
import axios from 'axios';

const Gallery = () => {
  const { web3, walletAddress, nfts, setNfts } = useWeb3();

  const handleClick = async () => {
    const token = new web3.eth.Contract(
      Nft_init.abi,
      Nft_init.networks[5777].address
    );
    try {
      const event = await token.methods
        .awardItem(
          walletAddress,
          'https://ipfs.io/ipfs/QmaREKtCMMpyUQ2XcycRmtJFWvxMZV6CqZxCLWUUb8NR4u?filename=nft1.json'
        )
        .send({
          from: walletAddress,
        });
      console.log('event!: ', event);
      const tokenId = event.events.Transfer.returnValues.tokenId;
      console.log('tokenId: ', tokenId);
      const uri = await token.methods.tokenURI(tokenId).call();
      console.log('uri: ', uri);
      const realData = await axios.get(uri);
      console.log(realData.data);
      setNfts([...nfts, realData.data]);
    } catch (error) {
      console.log(error.code, `${error.message}`);
    }
  };
  const handleFakeClick = async () => {
    const token = new web3.eth.Contract(
      ERC721PresetMinterPauserAutoId.abi,
      ERC721PresetMinterPauserAutoId.networks[5777].address
    );
    try {
      const event = await token.methods
        .mint(walletAddress)
        .send({ from: walletAddress });
      const balance = await token.methods.balanceOf(walletAddress);
      console.log('Balance!: ', balance);
      console.log('event!: ', event);
    } catch (error) {
      console.log(error.code, `${error.message}`);
    }
  };

  return (
    <div>
      <button onClick={handleFakeClick}>MINT THE NFTS</button>
      <button onClick={handleClick}>But for real this time</button>
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
