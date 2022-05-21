import React from 'react';

const PlaceBidForm = ({ nft }) => {
  const handleSubmit = async (e) => {
    e.preventDefault();
    return;
  };
  return (
    <div className="bidForm">
      <form onSubmit={handleSubmit}>
        <button type="submit"></button>
      </form>
    </div>
  );
};

export default PlaceBidForm;
