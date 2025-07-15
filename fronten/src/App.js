import React, { useState } from 'react';
import Leaderboard from './components/Leaderboard';
// import UserClaim from './components/ClaimButton';

function App() {
  const [refresh, setRefresh] = useState(false);
  return (
    <div>
      <Leaderboard />
    </div>
  );
}

export default App;
