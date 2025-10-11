import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from './components/Header';
import InfoSection from './components/InfoSection';
import TwitchSlider from './components/TwitchSlider';
import MusicButton from "./components/MusicButton";
import UserPage from "./components/UserPage";
import Leaderboard from './components/leaderboard';
import VerticalTimeline from "./components/VerticalTimeline";
import 'bootstrap/dist/css/bootstrap.min.css';
import UserOverview from "./components/UserOverview";
import CtaFooter from './components/CtaFooter';
import Footer from './components/Footer';
import VideosPage from './components/VideoPage'; 
import OtherLeaderboards from "./components/OtherLeaderboards";
import MostPlaysFull from "./pages/otherFullLeaderboards/MostPlaysFull";
import MostWinsFull from "./pages/otherFullLeaderboards/MostWinsFull";
import TopWinrateFull from "./pages/otherFullLeaderboards/TopWinrateFull";
import MostKillsFull from "./pages/otherFullLeaderboards/MostKillsFull";
import TopDeathsFull from "./pages/otherFullLeaderboards/TopDeathsFull";
import TopKDFull from "./pages/otherFullLeaderboards/TopKDFull";
import MostDCsFull from "./pages/otherFullLeaderboards/MostDCsFull";
import HighestUnk13Full from "./pages/otherFullLeaderboards/HighestUnk13Full";
import HighestUnk14Full from "./pages/otherFullLeaderboards/HighestUnk14Full";
import BestRecentPerformanceFull from "./pages/otherFullLeaderboards/BestRecentPerformanceFull";
import DebugUnknowns from "./pages/DebugUnknowns";
import DebugPredictUnknowns from "./pages/DebugPredictUnknowns";


function App() {
  return (
    <div className="App">
      <Router basename="/smm2_eu_vs_archive">
        <Routes>
          {/* Homepage layout */}
          <Route
            path="/"
            element={
              <>
                <Header />
                <InfoSection />
                <Leaderboard />
                <VerticalTimeline />
                <TwitchSlider />
                <MusicButton />
              </>
            }
          />

          {/* UserPage layout */}
          <Route path="/user" element={<UserOverview />} /> 
          <Route path="/user/:makerId" element={<UserPage />} />

          {/* Nieuwe videos pagina */}
          <Route path="/videos" element={<VideosPage />} />

          <Route path="/other-leaderboards" element={<OtherLeaderboards />} />
          <Route path="/other-leaderboards/most-plays" element={<MostPlaysFull />} />
          <Route path="/other-leaderboards/most-wins" element={<MostWinsFull />} />
          <Route path="/other-leaderboards/top-winrate" element={<TopWinrateFull />} />
          <Route path="/other-leaderboards/most-kills" element={<MostKillsFull />} />
          <Route path="/other-leaderboards/top-deaths" element={<TopDeathsFull />} />
          <Route path="/other-leaderboards/top-kd" element={<TopKDFull />} />
          <Route path="/other-leaderboards/most-dcs" element={<MostDCsFull />} />
          <Route path="/other-leaderboards/highest-unk13" element={<HighestUnk13Full />} />
          <Route path="/other-leaderboards/highest-unk14" element={<HighestUnk14Full />} />
          <Route path="/other-leaderboards/recent-performance" element={<BestRecentPerformanceFull />} />
          <Route path="/debug-unknowns" element={<DebugUnknowns />} />
          <Route path="/debug-predict-unknowns" element={<DebugPredictUnknowns />} />

          

        </Routes>

        <CtaFooter />
        <Footer />
      </Router>
    </div>
  );
}

export default App;


