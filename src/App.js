import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MemeStickers from "./Pages/MemeStickers";
import InviteFriends from "./Pages/InviteFriends";
import Layout from "./Compoents/Layout"; // Correct the typo in Components
import Leaderboard from "./Pages/Leaderboard";

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Parent route with dynamic segments */}
        <Route path="/" element={<Layout />}>
          {/* Nested routes: no leading slashes */}
          <Route index element={<MemeStickers />} />
          <Route path="invite" element={<InviteFriends />} />
          <Route path="leaderboard" element={<Leaderboard />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
