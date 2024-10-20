import React, { useEffect, useState } from "react";
import VotingSystemABI from "D:/Fatma/ITI/Blockchain Development/Voting-System/voting-system/src/abis/votingsystem.json";
import { ethers } from "ethers";

const Candidates = () => {
    const CONTRACT_ADDRESS = "0x4322EF4Df2Fa4E6d2C3Dd7Fb1D3624f85EA35f3A";
    
    const [candidates, setCandidates] = useState([]);
    const [loading, setLoading] = useState(false);
    const INFURA_PROVIDER = "https://sepolia.infura.io/v3/2779b9a21fd34143b14d3931e4e70f94";

    useEffect(() => {
        loadCandidates();
    }, []);

    const loadCandidates = async () => {
        try {
            setLoading(true); 
            const provider = new ethers.JsonRpcProvider(INFURA_PROVIDER);
            const contract = new ethers.Contract(CONTRACT_ADDRESS, VotingSystemABI, provider);

            // Fetch the number of candidates
            const candidatesCount = await contract.getCandidatesCount();
            console.log("Candidates Count:", candidatesCount.toString());

            const candidates = [];
            for (let i = 0; i < candidatesCount; i++) {
                const candidate = await contract.candidates(i);
                candidates.push(candidate);
            }

            setCandidates(candidates);
            console.log("Candidates:", candidates);
        } catch (error) {
            console.error("Error loading candidates:", error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="container">
            <h1>Candidates</h1>
            {loading ? (
                <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            ) : (
                <ol>
                    {candidates.map((candidate, index) => (
                        <li key={index}>{candidate.name}</li>
                    ))}
                </ol>
            )}
        </div>
    );
}

export default Candidates;
