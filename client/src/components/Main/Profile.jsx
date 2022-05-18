import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useWeb3 from '../hooks/useWeb3';

const Profile = () => {
  const { web3, walletAddress } = useWeb3();
  const [ethBalance, setEthBalance] = useState(null);
  const [nftBalance, setNftBalance] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!walletAddress) {
      navigate('/');
    }
  }, []);

  const handleEthBalance = async () => {
    try {
      const balance = await web3.eth.getBalance(walletAddress);
      setEthBalance(balance);
    } catch (error) {
      console.error(error);
    }
  };

  // https://ethereum.stackexchange.com/questions/82746/how-to-get-erc20-token-balance-using-web3
  // https://ethereum.stackexchange.com/questions/29914/getting-abi-data-for-erc20-tokens-programatically-with-web3
  const handleNftBalance = async () => {
    let tokenAddress = '0x20fe562d797a42dcb3399062ae9546cd06f63280';
    try {
      // The minimum ABI to get ERC20 Token balance
      let minABI = [
        // balanceOf
        {
          constant: true,
          inputs: [{ name: '_owner', type: 'address' }],
          name: 'balanceOf',
          outputs: [{ name: 'balance', type: 'uint256' }],
          type: 'function',
        },
        // decimals
        {
          constant: true,
          inputs: [],
          name: 'decimals',
          outputs: [{ name: '', type: 'uint8' }],
          type: 'function',
        },
      ];
      let contract = new web3.eth.Contract(minABI, tokenAddress);
      let balance = await contract.methods.balanceOf(walletAddress).call();
      setNftBalance(balance);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>{`Welcome, ${walletAddress}`}</h1>
      <button onClick={handleEthBalance}>See eth balance</button>
      <button onClick={handleNftBalance}>Display NFTs</button>
      {ethBalance && <h2>{`Eth: ${ethBalance}`}</h2>}
      {nftBalance && <h2>{`Nfts: ${nftBalance}`}</h2>}
    </div>
  );
};

export default Profile;
