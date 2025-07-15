import React, { useEffect, useState } from 'react';
import { getAllUsers, claimPoints, getUserHistory } from '../api/api';
import styled from 'styled-components';

const Container = styled.div`
  max-width: 800px;
  margin: auto;
  padding: 20px;
`;

const Select = styled.select`
  padding: 10px;
  width: 100%;
  margin-bottom: 15px;
`;

const Button = styled.button`
  padding: 10px;
  background: green;
  color: white;
  border: none;
  margin-bottom: 20px;
  cursor: pointer;

  &:hover {
    background: darkgreen;
  }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;

  th, td {
    border: 1px solid #ddd;
    padding: 10px;
  }
`;

const HistoryList = styled.ul`
  list-style: none;
  padding: 0;
`;

export default function ClaimLeaderboard() {
  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState('');
  const [claimedPoints, setClaimedPoints] = useState(null);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    if (selectedUserId) {
      fetchHistory(selectedUserId);
    } else {
      setHistory([]);
    }
  }, [selectedUserId]);

  const fetchUsers = async () => {
    try {
      const res = await getAllUsers();
      setUsers(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchHistory = async (userId) => {
    try {
      const res = await getUserHistory(userId);
      setHistory(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleClaim = async () => {
    if (!selectedUserId) {
      alert("Please select a user.");
      return;
    }

    try {
      const response = await claimPoints(selectedUserId);
      alert(`User earned ${response.data.points} points!`);
      setClaimedPoints(response.data.points);
      fetchUsers(); // Refresh leaderboard after claim
      fetchHistory(selectedUserId); // Refresh history after claim
    } catch (error) {
      console.error(error);
      alert("Claim failed. Check console.");
    }
  };

  return (
    <Container>
      <h2>Claim Points & Leaderboard</h2>

      <Select onChange={(e) => setSelectedUserId(e.target.value)} value={selectedUserId}>
        <option value="">Select User</option>
        {users.map((user) => (
          <option key={user._id} value={user._id}>
            {user.username}
          </option>
        ))}
      </Select>

      <Button onClick={handleClaim}>Claim Points</Button>

      {claimedPoints !== null && (
        <p>Claimed: {claimedPoints} points!</p>
      )}

      <h3>Leaderboard</h3>
      <Table>
        <thead>
          <tr>
            <th>Rank</th>
            <th>Username</th>
            <th>Total Points</th>
          </tr>
        </thead>
        <tbody>
  {[...users]
    .sort((a, b) => (parseInt(b.wealthPoints) + parseInt(b.contributionPoints)) -
                     (parseInt(a.wealthPoints) + parseInt(a.contributionPoints)))
    .map((user, index) => (
    <tr key={user._id}>
      <td>{index + 1}</td>
      <td style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <img
          src={user.avatarUrl}
          alt={user.username}
          style={{ width: '30px', height: '30px', borderRadius: '50%', objectFit: 'cover' }}
        />
        {user.username}
      </td>
      <td>{parseInt(user.wealthPoints) + parseInt(user.contributionPoints)}</td>
    </tr>
  ))}
</tbody>

      </Table>

      {selectedUserId && (
        <>
          <h3>Claim History for Selected User</h3>
          <HistoryList>
            {history.length === 0 && <li>No history available</li>}
            {history.map(item => (
              <li key={item._id}>
                {item.pointsClaimed} points on {new Date(item.claimedAt).toLocaleString()}
              </li>
            ))}
          </HistoryList>
        </>
      )}
    </Container>
  );
}
