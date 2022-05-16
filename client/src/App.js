import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Main } from './components/Main';
import { Footer } from './components/Footer';
import WalletProvider from './components/context/WalletContext';
import SimpleStorageContract from './contracts/SimpleStorage.json';
import getWeb3 from './getWeb3';
import { useEffect, useState } from 'react';
import './App.css';

const App = () => {
  const [storageValue, setStorageValue] = useState(0);
  const [web3, setWeb3] = useState(null);
  const [accounts, setAccounts] = useState(null);
  const [contract, setContract] = useState(null);

  useEffect(async () => {
    try {
      // Get network provider and web3 instance.
      const web3Instance = await getWeb3();
      // Keep track of web3Instance in the contract state.
      setWeb3(web3Instance);

      // Use web3 to get the user's accounts.
      const accountsAvailable = await web3Instance.eth.getAccounts();
      // Keep track of accountsAvailable in the contract state.
      setAccounts(accountsAvailable);

      // Get the contract instance.
      const networkId = await web3Instance.eth.net.getId();
      const deployedNetwork = SimpleStorageContract.networks[networkId];
      console.log('deployedNetowrk: ', deployedNetwork);
      const contractInstance = await new web3Instance.eth.Contract(
        SimpleStorageContract.abi,
        deployedNetwork && deployedNetwork.address
      );
      // Keep track of contractInstance in the contract state.
      setContract(contractInstance);
      // Proceed with an
      // example of interacting with the contract's methods.
      runExample(contractInstance, accountsAvailable);
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`
      );
      console.error(error);
    }
  }, []);

  const runExample = async (contractInstance, accountsAvailable) => {
    // Stores a given value, 5 by default.
    await contractInstance.methods.set(5).send({ from: accountsAvailable[0] });

    // Get the value from the contract to prove it worked.
    const response = await contractInstance.methods.get().call();

    // Update state with the result.
    setStorageValue(response);
  };
  return (
    <>
      <Router>
        <WalletProvider>
          <Navbar />
          <Main />
          <Footer />
        </WalletProvider>
      </Router>
      <div>
        STARTER CODE BELOW
        {!web3 ? (
          <div>Loading Web3, accounts, and contract...</div>
        ) : (
          <div className="App">
            <h1>Good to Go!</h1>
            <p>Your Truffle Box is installed and ready.</p>
            <h2>Smart Contract Example</h2>
            <p>
              If your contracts compiled and migrated successfully, below will
              show a stored value of 5 (by default).
            </p>
            <p>
              Try changing the value stored on <strong>line 42</strong> of
              App.js.
            </p>
            <div>The stored value is: {storageValue}</div>
          </div>
        )}
      </div>
    </>
  );
};
export default App;
