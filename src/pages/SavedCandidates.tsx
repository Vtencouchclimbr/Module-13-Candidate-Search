import { useState, useEffect } from 'react';
import '../index.css';
import { Candidate } from '../interfaces/Candidate.interface';

const SavedCandidates = () => {
  const [savedCandidates, setSavedCandidates] = useState<Candidate[]>([]);

  useEffect(() => {
    // Retrieve saved candidates from localStorage
    const candidates = JSON.parse(localStorage.getItem('savedCandidates') || '[]');
    setSavedCandidates(candidates);
  }, []);  // Only run once when the component mounts

  return (
    <>
      <h1>Potential Candidates</h1>
      {/* Show message if there are no saved candidates */}
      {savedCandidates.length === 0 ? (
        <p>No candidates have been accepted yet.</p>
      ) : (
        <ul>
          {savedCandidates.map((candidate) => (
            <li key={candidate.id}>
              <img src={candidate.avatar_url} alt={candidate.login} width="50" />
              <p>Name: {candidate.name}</p>
              <p>Username: {candidate.login}</p>
              <p>Location: {candidate.location || 'Location not available'}</p>
              <p>Email: {candidate.email || 'Email not available'}</p>
              <p>Company: {candidate.company || 'Company not available'}</p>
              <p>
                Profile: <a href={candidate.html_url}>View on GitHub</a>
              </p>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default SavedCandidates;
