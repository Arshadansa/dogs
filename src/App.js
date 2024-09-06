import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import MemeStickers from "./Pages/MemeStickers";
import InviteFriends from "./Pages/InviteFriends";
import Layout from "./Compoents/Layout"; // Adjust the path to your Layout component
import Leaderboard from "./Pages/Leaderboard";

const NotFound = () => <h1>404 - Page Not Found</h1>;

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route
            path="/home/:chatid/:username/:referralid"
            element={<Layout />}
          >
            <Route index element={<MemeStickers />} />
          </Route>
          <Route index element={<MemeStickers />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/invite" element={<InviteFriends />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
