import React from "react";
import { Link } from "react-router-dom";  
import Wallet from "./Wallet";  


const Navbar = ({ setProvider, setSigner, setAccount }) => {
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
            <a className="navbar-brand" href="/">Voting System</a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                <div className="navbar-nav">
                    <a className="nav-link active" aria-current="page" href="/">Home</a>
                    <a className="nav-link" href="/candidates">Candidates</a>
                    <a className="nav-link" href="vote">Vote</a>
                    <a className="nav-link" href="addcandidates">Add Candidates</a>
                    <a className="nav-link" href="results">Results</a>
                </div>
            </div>
            <Wallet setAccount={setAccount} setProvider={setProvider} setSigner={setSigner}/>
        </div>
    </nav>
  );
};

export default Navbar;