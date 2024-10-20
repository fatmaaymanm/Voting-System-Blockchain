import React from 'react';
import { BrowserRouter as Router, Route, Switch, Routes } from 'react-router-dom';
import Navbar from './components/Navbar.js';
import Wallet from './components/Wallet.js';  
import Home from './components/Home.js';
import Candidates from './components/Candidates.js';
import Vote from './components/Vote.js';
import AddCandidates from './components/AddCandidates.js';
import Results from './components/Results.js';

function App() {
  const [account, setAccount] = React.useState(null);
    const [provider, setProvider] = React.useState(null);
    const [signer, setSigner] = React.useState(null);
    console.log(account, provider, signer);
  return (
    <>
    <Router>
      <Navbar setProvider={setProvider} setSigner={setSigner} setAccount={setAccount}/>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/candidates" element={<Candidates />} />
        <Route path="/vote" element={<Vote provider={provider} signer={signer} account={account} />} />
        <Route path="/addcandidates" element={<AddCandidates provider={provider} signer={signer} account={account}/>} />
        <Route path="/results" element={<Results provider={provider} signer={signer} account={account}/>} />
      </Routes>
    </Router>
    </>
  );
}

export default App;
