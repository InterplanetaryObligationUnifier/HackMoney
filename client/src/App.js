import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Main } from './components/Main';
import { Footer } from './components/Footer';
import Web3Provider from './components/context/Web3Context';
import './App.css';

const App = () => {
  return (
    <Router>
      <Web3Provider>
        <Navbar />
        <Main />
        <Footer />
      </Web3Provider>
    </Router>
  );
};
export default App;
