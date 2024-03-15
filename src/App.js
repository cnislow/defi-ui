import React, { useState, useEffect } from 'react';

function App() {
  const[greet, setGreet] = useState('');
  const [depositValue, setDepositValue] = useState('')
  const [greetingValue, setGreetingValue] = useState('')

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
            <h3>Greeting</h3>
            <p>Contract balance: 0</p>
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
