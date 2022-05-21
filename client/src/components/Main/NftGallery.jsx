import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import SellNftForm from './SellNftForm';

const NftGallery = ({ nfts, owner, forSale }) => {
  const [isSelling, setIsSelling] = useState(false);
  return (
    <div className="glarrery">
      <div className="d-flex gap-3 flex-wrap">
        {nfts
          ? nfts.map((nft, i) => {
              console.log(nft);
              return (
                <div className="card nftCard" key={`nftGallery: ${i}`}>
                  <p>{nft.name}</p>
                  <p>{nft.description}</p>
                  <img className="nftThumbnail" src={nft.image} />
                  {forSale && (
                    <Link to={`/nft/${nft.tokenId}`}>
                      <button>View NFT</button>
                    </Link>
                  )}
                  {owner && (
                    <button onClick={() => setIsSelling(!isSelling)}>
                      Put up for Sale
                    </button>
                  )}
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
