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
import UserOverview from "./components/UserOverview"; // overzichtspagina
import CtaFooter from './components/CtaFooter';
import Footer from './components/Footer';
import VideosPage from './components/VideoPage'; 

function App() {
  return (
    <div className="App">
      <Router>
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
        </Routes>

        <CtaFooter />
        <Footer />
      </Router>
    </div>
  );
}

export default App;


