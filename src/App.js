import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MemeStickers from "./Pages/MemeStickers";
import InviteFriends from "./Pages/InviteFriends";
import Layout from "./Compoents/Layout"; // Import the layout
import Leaderboard from "./Pages/Leaderboard";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" index element={<MemeStickers />} />

          <Route
            path="/home/:chatid/:username/:referralid"
            index
            element={<MemeStickers />}
          />
          <Route path="/invite" element={<InviteFriends />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
