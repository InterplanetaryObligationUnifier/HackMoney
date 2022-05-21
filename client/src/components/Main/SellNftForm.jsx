import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';

const SellNftForm = ({ isSelling, setIsSelling }) => {
  const [maturity, setMaturity] = useState(1);
  const [price, setPrice] = useState(0);
  const [upfront, setUpfront] = useState(10);
  const [expire, setExpire] = useState(null);
  const handleClose = () => {
    setIsSelling(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <Modal show={isSelling} onHide={handleClose}>
      <header className="modal-header border-bottom-0">
        <h2 className="fw-bold mb-0 text-center">Sell Your NFT</h2>
        <button
          type="button"
          className="btn-close"
          data-bs-dismiss="modal"
          aria-label="Close"
          onClick={() => setIsSelling(false)}
        ></button>
      </header>
      <div className="modal-body">
        <form onSubmit={handleSubmit}>
          <div>
            <input
              value={price}
              type="number"
              style={{ width: '50px' }}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="0.00"
            />
            <label htmlFor="price">Minimum Price in ETH</label>
          </div>
          <div>
            <input
              name="maturity"
              value={maturity}
              onChange={(e) => setMaturity(e.target.value)}
              type="range"
              min="1"
              max="6"
            />
            <label htmlFor="maturity">{` ${maturity} Months until Maturity`}</label>
          </div>
          <div>
            <input
              name="upfront"
              value={upfront}
              onChange={(e) => setUpfront(e.target.value)}
              type="range"
              min="10"
              max="20"
            />
            <label htmlFor="upfront">{` ${upfront}% deposit from buyer`}</label>
          </div>
          <div>
            <input
              name="expire"
              value={expire}
              onChange={(e) => setExpire(e.target.value)}
              type="datetime-local"
            />
          </div>
          <button className="btn btn-outline-dark">Place for Sale</button>
        </form>
      </div>
      <div className="modal-footer">{`Your NFT will be held by the IOU custodial smart contract. Bidding will start at ${price} ETH until expiry on ${expire}. Once a bid has been secured, ${upfront}% will be collected by the custodial wallet. If full payment has not been made within ${maturity} months, your NFT will be returned to you in addition to 20% of the upfront fee.`}</div>
    </Modal>
  );
};

export default SellNftForm;
