// https://github.com/pedrouid/web3modal-ethers-example

import Web3 from 'web3';
import Web3Modal from 'web3modal';
import WalletConnectProvider from '@walletconnect/web3-provider';
import CoinbaseWalletSDK from '@coinbase/wallet-sdk';

const providerOptions = {
  walletconnect: {
    package: WalletConnectProvider,
    options: {
      infuraId: '27e484dcd9e3efcfd25a83a78777cdf1',
    },
  },
  coinbasewallet: {
    package: CoinbaseWalletSDK,
    options: {
      infuraId: '27e484dcd9e3efcfd25a83a78777cdf1',
    },
  },
};

const web3Modal = new Web3Modal({
  providerOptions,
});

// start session
export const connectWallet = async () => {
  try {
    const provider = await web3Modal.connect();
    const web3 = new Web3(provider);

    // subscribe to disconnected
    provider.on('disconnect', (code, reason) => {
      console.log('disconnect: ', code, reason);
    });

    // subscribe to accounts change
    provider.on('accountsChanged', (accounts) => {
      console.log('accountsChanged: ', accounts);
    });

    // subscribe to chainId change
    provider.on('chainChanged', (chainId) => {
      console.log('chainChanged: ', chainId);
    });

    return web3;
  } catch (error) {
    console.error(error);
  }
};

// export const disconnectWallet = async () => {
//   try {
//     console.log(web3Modal);
//   } catch (error) {
//     console.error(error);
//   }
// };
