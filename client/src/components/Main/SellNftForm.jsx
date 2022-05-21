import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import useWeb3 from '../hooks/useWeb3';
import Nft_init from '../../contracts/Nft_init.json';

const SellNftForm = ({ isSelling, setIsSelling, tokenId }) => {
  const { walletAddress, web3 } = useWeb3();
  const [maturity, setMaturity] = useState(1);
  const [price, setPrice] = useState(0);
  const [upfront, setUpfront] = useState(10);
  const [expire, setExpire] = useState(5);

  const token = new web3.eth.Contract(
    Nft_init.abi,
    Nft_init.networks[5777].address
  );

  const handleClose = () => {
    setIsSelling(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // CREATES ERROR;
    const event = await token.methods
      .safeTransferFrom(
        walletAddress,
        Nft_init.networks[5777].address,
        tokenId,
        [maturity, price, upfront, expire]
      )
      .send({
        from: walletAddress,
      });
    console.log(event);
  };

  return (
    <Modal show={isSelling} onHide={handleClose}>
      <header className="modal-header justify-content-center border-bottom">
        <h2 className="fw-bold mb-0 text-center">Sell Your NFT</h2>
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
          <div className="mb-3">
            <input
              name="expire"
              value={expire}
              type="range"
              min="5"
              max="60"
              onChange={(e) => setExpire(e.target.value)}
            />
            <label htmlFor="expire">{` Bidding will expire ${expire} days from list date`}</label>
          </div>
          <button className="btn w-100 btn-dark">Place for Sale</button>
        </form>
      </div>
      <div className="modal-footer">
        {`Your NFT will be held by the IOU custodial smart contract. Bidding will start at ${price} ETH until expiry on ${expire} days from now
        . Once a bid has been secured, ${upfront}% will be collected by the
        custodial wallet. If full payment has not been made within ${maturity} months, your NFT will be returned to you in addition to 19% of the
        upfront fee. 1% is retained as a service fee to IOU.`}
      </div>
    </Modal>
  );
};

export default SellNftForm;
