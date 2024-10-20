import React from "react";
import VotingSystemABI from "D:/Fatma/ITI/Blockchain Development/Voting-System/voting-system/src/abis/votingsystem.json";
import { ethers } from "ethers";

const Vote = ({provider, signer, account}) => {
    const [candidateID, setCandidateID] = React.useState("");
    const [loading, setLoading] = React.useState(false);
    const [loading1, setLoading1] = React.useState(false);
    const CONTRACT_ADDRESS = "0x4322EF4Df2Fa4E6d2C3Dd7Fb1D3624f85EA35f3A";

    const registerVoter = async () => {
        try {
            console.log("Account:", account);
            if (!account) {
                throw new Error("Please connect your wallet");
            }else{
            setLoading(true);
            const contract = new ethers.Contract(CONTRACT_ADDRESS, VotingSystemABI, signer);
            const transaction = await contract.registerVoter();
            await transaction.wait();
            console.log("Voter registered successfully");
            alert("Voter registered successfully");}
        } catch (error) {
            console.error("Error registering voter:", error);
            alert("Error registering voter or Voter already registered");
        } finally {
            setLoading(false);
        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            if (!account) {
                throw new Error("Please connect your wallet");
            }
            if (!candidateID) {
                throw new Error("Please enter a valid Candidate ID");
            }

            // Convert candidateID to a number and subtract one
            const adjustedCandidateID = parseInt(candidateID, 10) - 1;

            if (adjustedCandidateID < 0) {
                throw new Error("Invalid Candidate ID. Please enter a number greater than 0.");
            }

            setLoading1(true);
            const contract = new ethers.Contract(CONTRACT_ADDRESS, VotingSystemABI, signer);
            const transaction = await contract.vote(adjustedCandidateID);
            await transaction.wait();
            console.log("Vote cast successfully");
            alert("Vote cast successfully");
        } catch (error) {
            console.error("Error casting vote:", error);
            alert("Error casting vote. Please try again.");
        } finally {
            setLoading1(false);
        }
    };
    return (
        <div className="container">
        <h1>Vote</h1>
        <p>Vote for your favorite candidate</p>
        <button type="button" class="btn btn-primary" disabled={loading} onClick={registerVoter}>Register Voter</button>
        <div className="container p-3">
        {loading && (
        <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        )}
        </div>
        <div className="container p-3">
        <form onSubmit={handleSubmit}>
        <div class="mb-3">
            <input type="text" class="form-control" placeholder="Enter the Candidate ID" value={candidateID}
                        onChange={(e) => setCandidateID(e.target.value)}/>
        </div>
        <button type="submit" class="btn btn-primary" disabled={loading1}>Vote</button>
        </form>
        {loading1 && (
                <div className="container p-3">
                    <div className="spinner-border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            )}
        </div>
        </div>
    );
}

export default Vote;