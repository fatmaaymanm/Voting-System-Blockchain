import React from "react";
import { ethers } from "ethers";

const Wallet = ({setProvider, setSigner, setAccount}) => {
    const[error, setError] = React.useState(null);
    const connectWalletHandler = async () => {
        if (window.ethereum) {
            try {
                const provider = new ethers.BrowserProvider(window.ethereum);
                const signer = await provider.getSigner();
                const accounts = await provider.send("eth_requestAccounts", []);
                setProvider(provider);
                setSigner(signer);
                setAccount(accounts[0]);
                setError(null);
                console.log(accounts);
                alert("Wallet connected successfully! Welcome " + accounts[0]);
            } catch (error) {
                setError(error);
                console.error(error.message);
                alert("Error connecting wallet");
            }
        }
        else {
            throw new Error('No crypto wallet detected');
        }
    }


  return (
    <button class="btn btn-outline-success me-2" type="button" onClick={connectWalletHandler}>Connect Wallet</button>
  );
}

export default Wallet;
