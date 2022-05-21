import React, { useState } from 'react';
import { Link } from 'react-router-dom';
const NftGallery = ({ nfts, owner }) => {
  const [isSelling, setIsSelling] = useState();
  return (
    <div className="glarrery">
      <div className="d-flex gap-3 flex-wrap">
        {nfts.map((nft, i) => {
          console.log(nft);
          return (
            <div className="card nftCard" key={`nftGallery: ${i}`}>
              <p>{nft.name}</p>
              <p>{nft.description}</p>
              <img className="nftThumbnail" src={nft.image} />
              <Link to={`/nft/${nft.tokenId}`}>
                <button>View NFT</button>
              </Link>
              {owner && <button>Put up for Sale</button>}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default NftGallery;
