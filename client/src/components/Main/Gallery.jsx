import React from 'react';
import useWeb3 from '../hooks/useWeb3';
import ERC721PresetMinterPauserAutoId from '../../contracts/ERC721PresetMinterPauserAutoId.json';

const Gallery = () => {
  const { web3, walletAddress } = useWeb3();

  const handleClick = async () => {
    const token = new web3.eth.Contract(
      ERC721PresetMinterPauserAutoId.abi,
      ERC721PresetMinterPauserAutoId.networks[5777].address
    );
    const event = await token.methods.mint(walletAddress).send({ from: walletAddress });
    const balance = await token.methods.balanceOf(walletAddress)
    console.log('event!: ', event);
    console.log('Balance!: ', balance);
  };

  return (
    <div>
      <button onClick={handleClick}>MINT THE NFTS</button>
    </div>
  );
};

export default Gallery;
