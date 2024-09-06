import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import MemeStickers from './Pages/MemeStickers';
import InviteFriends from './Pages/InviteFriends';
import Layout from './Compoents/Layout'; // Adjust the path to your Layout component
import Leaderboard from './Pages/Leaderboard';

const NotFound = () => <h1>404 - Page Not Found</h1>;

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Redirect or root route */}
        <Route path="/" element={<Navigate to="/home/1234999/test/115568" />} />

        {/* Parent route with dynamic segments */}
        <Route path="/home/:chatid/:username/:referralid" element={<Layout />}>
          <Route index element={<MemeStickers />} />
          <Route path="invite" element={<InviteFriends />} />
          <Route path="leaderboard" element={<Leaderboard />} />
        </Route>

        {/* Independent routes for direct access */}
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/invite" element={<InviteFriends />} />

        {/* 404 route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
