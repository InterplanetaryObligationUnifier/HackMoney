import { useContext } from 'react';
import { WalletContext } from '../context/WalletContext';

const useWallet = () => {
  const { walletAddress, setWalletAddress, web3, setWeb3 } =
    useContext(WalletContext);

  return { walletAddress, setWalletAddress, web3, setWeb3 };
};

export default useWallet;
