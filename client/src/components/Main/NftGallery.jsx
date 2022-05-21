import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import SellNftForm from './SellNftForm';

const NftGallery = ({ nfts, owner, forSale, horizontal }) => {
  const [isSelling, setIsSelling] = useState(false);
  return (
    <div className="glarrery">
      <div
        className={`d-flex gap-3 ${horizontal ? 'overflow-auto' : 'flex-wrap'}`}
      >
        {nfts
          ? nfts.map((nft, i) => {
              console.log(nft);
              return (
                <div
                  className={`card nftCard rounded-3 p-2 ${
                    horizontal ? 'flex-shrink-0' : ''
                  }`}
                  key={`nftGallery: ${i}`}
                >
                  <h4 className="d-flex justify-content-between">
                    <span>{nft.name}</span>
                    <span>#{nft.tokenId}</span>
                  </h4>
                  <div className="p-1 h-100 rounded-3 d-flex align-items-center border bg-light">
                    <img className="nftThumbnail" src={nft.image} />
                  </div>
                  <div className="mt-3 d-flex justify-content-center gap-3">
                    {/* {forSale && (put the below Link, ViewNFT button in here when you have forSale working)} */}
                    <Link to={`/nft/${nft.tokenId}`}>
                      <button className="btn btn-dark bg-gradient">View</button>
                    </Link>

                    {owner && (
                      <button
                        className="btn btn-dark bg-gradient"
                        onClick={() => setIsSelling(!isSelling)}
                      >
                        Sell
                      </button>
                    )}
                  </div>
                  {isSelling && (
                    <SellNftForm
                      isSelling={isSelling}
                      setIsSelling={setIsSelling}
                      tokenId={nft.tokenId}
                    />
                  )}
                </div>
              );
            })
          : null}
      </div>
    </div>
  );
};

export default NftGallery;
