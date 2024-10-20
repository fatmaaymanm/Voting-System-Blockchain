import React from "react";
import { ethers } from "ethers";
import VotingSystemABI from "D:/Fatma/ITI/Blockchain Development/Voting-System/voting-system/src/abis/votingsystem.json";

const AddCandidates = ({provider, signer, account}) => {
    const CONTRACT_ADDRESS = "0x4322EF4Df2Fa4E6d2C3Dd7Fb1D3624f85EA35f3A";
    const [loading, setLoading] = React.useState(false);
    const [name, setName] = React.useState("");

    const addCandidate = async (event) => {
        try {
            event.preventDefault();
            if (!account) {
                throw new Error("Please connect your wallet");
            }

            if (!name) {
                throw new Error("Please enter a valid name");
            }

            setLoading(true);
            const contract = new ethers.Contract(CONTRACT_ADDRESS, VotingSystemABI, signer);
            const transaction = await contract.registerCandidate(name);
            await transaction.wait();
            console.log("Candidate added successfully");
            alert("Candidate added successfully");
        } catch (error) {
            console.error("Error adding candidate:", error);
            alert("Error adding candidate");
            setName(""); 
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="container p-3">
            <h1>Add Candidate</h1>
            <form onSubmit={addCandidate}>
                <div className="mb-3">
                    <input type="text" className="form-control" placeholder="Candidate Name" id="name" value={name} onChange={(event) => setName(event.target.value)} />
                </div>
                <button type="submit" className="btn btn-primary" >Add Candidate</button>
            </form>

            {loading && (
        <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>)}
        </div>
    );
}

export default AddCandidates;
