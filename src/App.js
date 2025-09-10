// import './App.css';
// // import NavBar from './components/NavBar';
// import Header from './components/Header';
// import InfoSection from './components/InfoSection';
// import TwitchSlider from './components/TwitchSlider';
// // import NewsSection from './components/NewsSection';
// import MusicButton from "./components/MusicButton";
// // import Footer from './components/Footer';
// import UserPage from "./components/UserPage";
// import Leaderboard from './components/leaderboard';
// import VerticalTimeline from "./components/VerticalTimeline";
// import 'bootstrap/dist/css/bootstrap.min.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <div>
//           {/* <NavBar /> */}
//           <Header />
//           <InfoSection />
//           {/* <NewsSection /> */}
//           <Leaderboard/>
//           <VerticalTimeline/>
//           <TwitchSlider />
//           <MusicButton />
//           {/* <Footer/> */}
//         </div>
//       </header>
//     </div>
//   );
// }

// export default App;


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

          {/* UserPage layout: alleen user data */}
          <Route path="/user/:makerId" element={<UserPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;


