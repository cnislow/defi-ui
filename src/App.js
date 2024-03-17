import React, { useState, useEffect } from 'react';
const ethers = require("ethers")
// import { ethers } from "ethers";

function App() {
  const[greet, setGreet] = useState('');
  const[balance, setBalance] = useState('');
  const [depositValue, setDepositValue] = useState('')
  const [greetingValue, setGreetingValue] = useState('')

  const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3"
  // A Web3Provider wraps a standard Web3 provider, which is
  // what MetaMask injects as window.ethereum into each page
  // const provider = new ethers.BrowserProvider(window.ethereum)

  // The MetaMask plugin also allows signing transactions to
  // send ether and pay to change state within the blockchain.
  // For this, you need the account signer...
  // const signer = provider.getSigner()

  let signer = null;

  let provider;
  
  if (window.ethereum == null) {

    // If MetaMask is not installed, we use the default provider,
    // which is backed by a variety of third-party services (such
    // as INFURA). They do not have private keys installed,
    // so they only have read-only access
    console.log("MetaMask not installed; using read-only defaults")
    provider = ethers.getDefaultProvider()

  } else {

      // Connect to the MetaMask EIP-1193 object. This is a standard
      // protocol that allows Ethers access to make all read-only
      // requests through MetaMask.
      provider = new ethers.BrowserProvider(window.ethereum)
  }

  //do inside a use effect so this pops up when the component loads
  useEffect(() => {
    const connectWallet = async () => {
      // MetaMask requires requesting permission to connect users accounts
      const accounts = await provider.send("eth_requestAccounts", []);

      signer = await provider.getSigner();
    
    }

    const getBalance = async () => {
      // Get the current balance of an account (by address or ENS name)
      const balance = await provider.getBalance(contractAddress);
      
      // no longer need '.utils' in v6
      const formattedBalance = ethers.formatEther(balance);
      
      setBalance(formattedBalance);
    }
    
    connectWallet().catch(console.error);

    getBalance().catch(console.error);
  });

  const handleDepositChange = (e) => {
    setDepositValue(e.target.value);
  }

  const handleGreetingChange = (e) => {
    setGreetingValue(e.target.value);
  }

  const handleDepositSubmit = (e) => {
    e.preventDefault();
    console.log(depositValue);
  }

  const handleGreetingSubmit = (e) => {
    e.preventDefault();
    console.log(greetingValue);
  }

  return (
    <div className="container">
      <div className="container"> 
        <div className="row mt-5">
          <div className="col">
            <h3>Greetings</h3>
            <p>Contract balance: {balance}</p>
          </div>
          <div className="col">
          <form onSubmit={handleDepositSubmit} className="mt-5">
            <div className="mb-3">
              <input type="number" className="form-control" placeholder="0" onChange={handleDepositChange} value={depositValue} />
            </div>
            <button type="submit" className="btn btn-success">Deposit</button>
          </form>
          <form onSubmit={handleGreetingSubmit} className="mt-5">
            <div className="mb-3">
              <input type="text" className="form-control" onChange={handleGreetingChange} value={greetingValue} />
            </div>
            <button type="submit" className="btn btn-dark">Change</button>
          </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
