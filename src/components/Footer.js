import React from "react";
import {
  FaTwitter,
  FaTwitch,
  FaYoutube,
  FaDiscord,
} from "react-icons/fa";

function Footer() {
  return (
    <div className="footer-dark">
      <footer>
        <div className="container">
          <div className="row">
            {/* Navigation */}
            <div className="col-sm-6 col-md-3 item">
              <h3>Navigation</h3>
              <ul>
                <li><a href="#leaderboard-section">Leaderboard</a></li>
                <li><a href="#bg-timeline">History of EU VS</a></li>
                <li><a href="#video-section">Highlights</a></li>
              </ul>
            </div>

            {/* Project info / credits */}
            <div className="col-sm-6 col-md-3 item">
              <h3>Credits</h3>
              <ul>
                <li><span>My very first project 🎉</span></li>
                <li><span>Built with React</span></li>
                <li>
                  <a
                    href="https://bootsnipp.com/snippets/bxDBA"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Footer design credits
                  </a>
                </li>
              </ul>
            </div>

            {/* About text */}
            <div className="col-md-6 item text">
              <h3>Community Project</h3>
              <p>
                This website was created as my very first project to bring our
                gaming community together. Feedback and suggestions are always
                welcome!
              </p>
            </div>

            {/* Social media */}
            <div className="col item social mt-5">
              <a href="https://www.twitch.tv/melvin_mm2"><FaTwitch /></a>
              <a href="https://x.com/Melvin_Kiers?t=wCyVgFg1oGZe7Rs8ulzAxg&s=09"><FaTwitter /></a>
              <a href="https://www.youtube.com/@Melvin_MM2"><FaYoutube /></a>
              <a href="https://discord.com/users/486926410129211392"><FaDiscord /></a>
            </div>
          </div>

          {/* Copyright */}
          <p className="copyright">
            © {new Date().getFullYear()} My Game Community – All rights reserved
          </p>
          <p className="copyright">
            Made with ❤️ by Melvin MM2
          </p>
        </div>
      </footer>
      <div className="footer_img mt-5">
        <img src="/images/PeachCastle1.png" alt="" />
      </div>
    </div>
    
  );
}

export default Footer;
