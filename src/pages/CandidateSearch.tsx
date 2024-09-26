import { useState, useEffect } from 'react';
import { searchGithub, searchGithubUser } from '../api/API';  // Fetch list of candidates
import '../index.css';
import { Candidate } from '../interfaces/Candidate.interface';

const CandidateSearch = () => {
  const [candidate, setCandidate] = useState<Candidate>({
    id: 0,
    login: '',
    avatar_url: '',
    location: '',
    email: '',
    company: '',
    html_url: '',
  });

  useEffect(() => {
    // Fetch a candidate from the GitHub API
    searchGithub().then((candidates) => {
      const candidate = candidates[0];
      searchGithubUser(candidate.login).then((user) => {
        setCandidate(user);
      });
    });
  }, []);  // Only run once when the component mounts

  const saveCandidate = () => {
    // Retrieve saved candidates from localStorage
    const savedCandidates = JSON.parse(localStorage.getItem('savedCandidates') || '[]');
    // Add the current candidate to the saved candidates
    localStorage.setItem('savedCandidates', JSON.stringify([...savedCandidates, candidate]));
    // Fetch a new candidate from the GitHub API
  };

  const skipCandidate = () => {
    // Fetch a new candidate from the GitHub API
    searchGithub().then((candidates) => {
      const candidate = candidates[0];
      searchGithubUser(candidate.login).then((user) => {
        setCandidate(user);
      });
    });
  };



  return (
    <div>
      <h1>Candidate Search</h1>
      {/* Display current candidate */}
      <div>
        <img src={candidate.avatar_url} alt={candidate.login} width="100" />
        <p>{candidate.login}</p>
        <p>Location: {candidate.location || 'Not available'}</p>
        <p>Email: {candidate.email || 'Not available'}</p>
        <p>Company: {candidate.company || 'Not available'}</p>
        <p>
          Bio: <a href={candidate.html_url}>View on GitHub</a>
        </p>
      </div>
      {/* Buttons to save or skip candidate */}
      <button style={{ backgroundColor:'green' }} onClick={saveCandidate}>+</button>
      <button style={{ backgroundColor:'red' }} onClick={skipCandidate}>-</button>
    </div>
  );
};

export default CandidateSearch;
