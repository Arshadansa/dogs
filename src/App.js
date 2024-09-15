import {React,useEffect} from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MemeStickers from "./Pages/MemeStickers";
import InviteFriends from "./Pages/InviteFriends";
import Layout from "./Compoents/Layout"; // Import the layout
import Leaderboard from "./Pages/Leaderboard";
import { useExpand,useThemeParams } from "@vkruglikov/react-telegram-web-app";
const App = () => {
  const [isExpanded, expand] = useExpand();
  useEffect(() => {
    if (!isExpanded) {
      expand();
    }
  }, [isExpanded, expand]);

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
           <Route
            path="/home/:chatid/:username"
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
