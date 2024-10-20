import React from "react";
import { ethers } from "ethers";
import VotingSystemABI from "D:/Fatma/ITI/Blockchain Development/Voting-System/voting-system/src/abis/votingsystem.json";

const Results = ({provider, signer, account}) => {
    const [loading, setLoading] = React.useState(false);
    const CONTRACT_ADDRESS = "0x4322EF4Df2Fa4E6d2C3Dd7Fb1D3624f85EA35f3A";
    const [winner, setWinner] = React.useState(null);

    const getWinner = async () => {
        try {
            setLoading(true);
            const contract = new ethers.Contract(CONTRACT_ADDRESS, VotingSystemABI, provider);
            const winner = await contract.announceResults();
            setWinner(winner);
            console.log("Winner:", winner.toString());
        } catch (error) {
            console.error("Error getting winner:", error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="container p-3">
            <h1>Results</h1>
            <button type="button" className="btn btn-primary" onClick={getWinner}>Announce Results</button>
            <div className="container p-3">{loading && (
                <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            )}
            </div>
            {winner && (
                <h2>Winner: {winner}</h2>
            )}
        </div>
    );
}

export default Results;