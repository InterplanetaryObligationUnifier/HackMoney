import React from 'react';
import useWeb3 from '../hooks/useWeb3';

const PlaceBidForm = ({ nft }) => {
  const { web3 } = useWeb3();
  const handleSubmit = async (e) => {
    e.preventDefault();
    return;
  };
  return (
    <div className="bidForm">
      <form onSubmit={handleSubmit}>
        <button type="submit">Place Bid</button>
      </form>
    </div>
  );
};

export default PlaceBidForm;
