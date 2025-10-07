import React from "react";
import StatsCard from './StatsCard';
import "aos/dist/aos.css";

const CommunityIntro = ({ summary }) => {

  return (
    <section className="community-intro">
      {/* Container voor de tekst en statistieken */}
      <div className="container">
        <h2 className="community-intro-title mb-2">
          Welcome to the <span className="orange">Super Mario Maker 2</span> EU Versus Community!
        </h2>
        <p className="community-intro-text">
          Every match in Versus mode is a mix of skill, chaos, and a bit of luck. Builders become rivals, 
          friendships are tested, and sometimes the lag decides who takes the flag.
          The data below represents performance from the top 80 players across Europe, capturing thousands of races, 
          clutch wins, unlucky deaths, and unexpected comebacks.
          These stats highlight what makes Versus mode so unpredictable — the thrill of competition, 
          the frustration of near misses, and the fun that keeps players coming back for more.
        </p>
        {/* Stat-kaarten in 2 rijen van 3 kolommen */}
        <div className="community-stats row mt-4 mb-5">
          <div className="col-md-4 d-flex" data-aos="zoom-in">
            <StatsCard
              title="Total Matches"
              text="The total number of matches played."
              number={summary.versusPlays.toLocaleString()}
              image="/images/data/marioflag.png"
            />
          </div>
          <div className="col-md-4 d-flex" data-aos="zoom-in" data-aos-delay="150">
            <StatsCard
              title="Total Wins"
              text="The total number of wins by all players."
              number={summary.versusWon.toLocaleString()}
              image="/images/data/winStreak.png"
            />
          </div>
          <div className="col-md-4 d-flex" data-aos="zoom-in" data-aos-delay="300">
            <StatsCard
              title="Total Losses"
              text="The total number of losses by all players."
              number={summary.versusLose.toLocaleString()}
              image="/images/data/loseStreak.png"
            />
          </div>
          <div className="col-md-4 d-flex" data-aos="zoom-in" data-aos-delay="450">
            <StatsCard
              title="Total Kills"
              text="The total number of kills by players."
              number={summary.versusKills.toLocaleString()}
              image="/images/MarioHat.png"
            />
          </div>
          <div className="col-md-4 d-flex" data-aos="zoom-in" data-aos-delay="600">
            <StatsCard
              title="Deaths by Others"
              text="The total number of times players were killed by others."
              number={summary.versusKilledByOthers.toLocaleString()}
              image="/images/Ninji.png"
            />
          </div>
          <div className="col-md-4 d-flex" data-aos="zoom-in" data-aos-delay="750">
            <StatsCard
              title="Disconnects"
              text="Total number of disconnects in matches."
              number={summary.versusDC.toLocaleString()}
              image="/images/smb1_yellowToad.png"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default CommunityIntro;
