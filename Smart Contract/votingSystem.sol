// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract VotingSystem {
    struct Candidate {
        string name;
        uint256 id;
    }

    struct Voter {
        bool isRegistered;
        bool hasVoted;
    }

    mapping(address => Voter) public voters;
    Candidate[] public candidates;
    mapping(uint256 => uint256) public votes;

    uint256 private nextCandidateId;

    function registerVoter() public {
        require(!voters[msg.sender].isRegistered, "Voter is already registered");
        voters[msg.sender] = Voter(true, false);
    }

    function registerCandidate(string memory candidateName) public {
        candidates.push(Candidate(candidateName, nextCandidateId));
        nextCandidateId++;
    }

    function vote(uint256 candidateId) public {
        require(voters[msg.sender].isRegistered, "You are not registered to vote");
        require(!voters[msg.sender].hasVoted, "You have already voted");
        require(candidateId < nextCandidateId, "Invalid candidate ID");

        votes[candidateId]++;
        voters[msg.sender].hasVoted = true;
    }

    function announceResults() public view returns (string memory winnerName, uint256 winnerVotes) {
        uint256 maxVotes = 0;
        string memory winningCandidate;

        for (uint256 i = 0; i < candidates.length; i++) {
            if (votes[candidates[i].id] > maxVotes) {
                maxVotes = votes[candidates[i].id];
                winningCandidate = candidates[i].name;
            }
        }

        return (winningCandidate, maxVotes);
    }

    function getCandidates() public view returns (Candidate[] memory) {
        return candidates;
    }

    function candidatesCount() public view returns (uint256) {
        return candidates.length;
    }

    function getCandidatesCount() public view returns (uint256) {
        return candidates.length;
    }

    function isVoterRegistered(address voter) public view returns (bool) {
        return voters[voter].isRegistered;
    }

    function hasVoterVoted(address voter) public view returns (bool) {
        return voters[voter].hasVoted;
    }

}