import React from 'react';

const NftGallery = ({ nfts }) => {
  return (
    <div className="glarrery">
      <div className="d-flex gap-3 flex-wrap">
        {nfts.map((nft, i) => {
          return (
            <div className="card nftCard" key={`nftGallery: ${i}`}>
              <p>{nft.name}</p>
              <p>{nft.description}</p>
              <img className="nftThumbnail" src={nft.image} />
              <button>View NFT</button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default NftGallery;