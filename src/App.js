import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MemeStickers from "./Pages/MemeStickers";
import InviteFriends from "./Pages/InviteFriends";
import Layout from "./Compoents/Layout"; // Corrected the typo
import Leaderboard from "./Pages/Leaderboard";

const App = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" index element={<MemeStickers />} />
          <Route path="invite" element={<InviteFriends />} />
          <Route path="leaderboard" element={<Leaderboard />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
