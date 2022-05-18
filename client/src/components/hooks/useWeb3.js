import { useContext } from 'react';
import { Web3Context } from '../context/Web3Context';

const useWeb3 = () => {
  const { walletAddress, setWalletAddress, web3, setWeb3 } =
    useContext(Web3Context);

  return { walletAddress, setWalletAddress, web3, setWeb3 };
};

export default useWeb3;
