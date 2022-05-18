import React from 'react';
import useWeb3 from '../hooks/useWeb3';

const Gallery = () => {
  const { web3 } = useWeb3();
  const handleClick = async () => {
    console.log(await web3.eth.net.getId());
  };

  return (
    <div>
      <button onClick={handleClick}>MINT THE NFTS</button>
    </div>
  );
};

export default Gallery;
