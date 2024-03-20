import React, { useState, useEffect } from 'react';
const ethers = require("ethers")

function App() {
  const[greet, setGreet] = useState('');
  const[balance, setBalance] = useState('');
  const [depositValue, setDepositValue] = useState('')
  const [greetingValue, setGreetingValue] = useState('')
  const [isWalletConnected, setIsWalletConnected] = useState(false)

  const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3"

  const ABI = [
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "_greeting",
          "type": "string"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "inputs": [],
      "name": "deposit",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "greet",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "_greeting",
          "type": "string"
        }
      ],
      "name": "setGreeting",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ];

  const checkIfWalletIsConnected = async () => {
    try {
      if (window.ethereum) {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
        const account = accounts[0];
        setIsWalletConnected(true);
        console.log("Account Connected: ", account);
      } else {
        console.log("No Metamask detected");
      }
    } catch (error) {
      console.log(error);
    }
  }

  const getBalance = async () => {
    try{
        if(window.ethereum){
            // read data
            const provider = new ethers.BrowserProvider(window.ethereum);
            // const contract = new ethers.Contract(contractAddress, ABI, provider);

            const balance = await provider.getBalance(contractAddress)
            const balanceFormatted = ethers.formatEther(balance)
            setBalance(balanceFormatted)
        } else{
            console.log("Ethereum object not found, install Metamask.");
        }
    } catch (error) {
        console.log(error)
    }
  }

  const getGreeting = async () => {
    try{
        if(window.ethereum){
            // read data
            const provider = new ethers.BrowserProvider(window.ethereum);
            const contract = new ethers.Contract(contractAddress, ABI, provider);

            const greeting = await contract.greet()
            setGreet(greeting)
        } else{
            console.log("Ethereum object not found, install Metamask.");
        }
    } catch (error) {
        console.log(error)
    }
  }

  const handleGreetingChange = (e) => {
    setGreetingValue(e.target.value)
  }
  
  const handleGreetingSubmit = async (e) => {
    try{
        e.preventDefault()
        if(window.ethereum){
            const provider = new ethers.BrowserProvider(window.ethereum);
            const signer = await provider.getSigner();
            const contract = new ethers.Contract(contractAddress, ABI, signer);

            const greetingUpdate = await contract.setGreeting(greetingValue)
            await greetingUpdate.wait()
            setGreet(greetingValue)
            setGreetingValue('')
        } else {
            console.log("Ethereum object not found, install Metamask.");
        }
    } catch (error) {
        console.log(error)
    }
  } 

  const handleDepositChange = (e) => {
    setDepositValue(e.target.value)
  }

  const handleDepositSubmit = async (e) => {
    try{
        e.preventDefault()
        if(window.ethereum){
            const provider = new ethers.BrowserProvider(window.ethereum);
            const signer = await provider.getSigner();
            const contract = new ethers.Contract(contractAddress, ABI, signer);

            const ethValue = ethers.parseEther(depositValue)
            const depositEth = await contract.deposit({value: ethValue})
            await depositEth.wait()
            const balance = await provider.getBalance(contractAddress)
            const balanceFormatted = ethers.formatEther(balance)
            setBalance(balanceFormatted)
        } else {
            console.log("Ethereum object not found, install Metamask.");
        }
    } catch (error) {
        console.log(error)
    }
  }

  useEffect(() => {
    checkIfWalletIsConnected();
    getBalance();
    getGreeting()
  }, [isWalletConnected])
  
  return (
    <div className="container">
      <div className="container"> 
        <div className="row mt-5">
          <div className="col">
            <h3>Greetings: {greet}</h3>
            <p>Contract balance: {balance} ETH</p>
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
