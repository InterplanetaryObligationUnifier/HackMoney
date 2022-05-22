import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useWeb3 from '../hooks/useWeb3';
import Nft_init from '../../contracts/Nft_init.json';
import PlaceBidForm from './PlaceBidForm';

const SingleNft = () => {
  const [nft, setNft] = useState(null);
  const [isBidding, setIsBidding] = useState(false);
  const [token, setToken] = useState(null);
  const [ethBalance, setEthBalance] = useState(null);
  const { id } = useParams();
  const { web3, walletAddress } = useWeb3();

  useEffect(() => {
    if (web3) {
      const newToken = new web3.eth.Contract(
        Nft_init.abi,
        Nft_init.networks[5777].address
      );
      setToken(newToken);
    }
  }, [web3]);

  useEffect(() => {
    const retrieveNft = async () => {
      let uri = await token.methods.tokenURI(id).call();
      let data = { uri, tokenId: id };
      const parsed = data.uri.slice(7);
      const fetched = await fetch(`https://ipfs.io/ipfs/${parsed}`);
      const json = await fetched.json();
      json.image = `https://ipfs.io/ipfs/${json.image.slice(7)}`;
      json.tokenId = uri.tokenId;
      json.owner = await token.methods.ownerOf(id).call();
      setNft(json);
    };

    if (token) {
      retrieveNft();
    }
  }, [token]);

  useEffect(() => {
    if (!web3) return;
    const getUserEthBalance = async () => {
      setEthBalance(
        (await web3.eth.getBalance(walletAddress)) / 1000000000000000000
      );
    };
    getUserEthBalance();
  }, [web3]);

  return (
    <div>
      {nft && nft.name ? (
        <div className="nft-container">
          <div className="nft-wrapper d-flex flex-wrap">
            <div className="nft-summary d-flex flex-column gap-3">
              <div className="nft-img-wrapper w-100 rounded p-3 bg-light">
                <div className="d-flex align-items-center justify-content-between">
                  <h1>{nft.name}</h1>
                  <h1 className="p-2 border rounded-circle">#{id}</h1>
                </div>
                <img className="nftImg w-100 rounded" src={nft.image} />
              </div>
              <div className="bg-light rounded p-3">
                <h4>Description</h4>
                <p>{nft.description}</p>
              </div>
              <div className="bg-light rounded p-3">
                <h4>Details</h4>
                <ul>
                  <li>
                    Contract:{' '}
                    <a
                      href={`https://etherscan.io/address/${Nft_init.networks[5777].address}`}
                    >{`${Nft_init.networks[5777].address.slice(
                      0,
                      5
                    )}...${Nft_init.networks[5777].address.slice(37)}`}</a>
                  </li>
                  <li>
                    Owner:{' '}
                    <a
                      href={`https://etherscan.io/address/${nft.owner}`}
                    >{`${nft.owner.slice(0, 5)}...${nft.owner.slice(37)}`}</a>
                  </li>
                  <li>Token ID: {id}</li>
                  <li>Standard: ERC-721</li>
                </ul>
              </div>
            </div>
            <div className="market">
              <h1>Market</h1>
              <div className="balance border">
                <h2>Current Balance</h2>
                <p>{ethBalance} ETH</p>
              </div>
              <button onClick={() => setIsBidding(!isBidding)}>Bid</button>
              {isBidding && <PlaceBidForm nft={nft} />}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default SingleNft;
