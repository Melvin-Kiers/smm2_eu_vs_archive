import React from 'react';
import InfoCard from './InfoCard';

import AOS from 'aos';
import 'aos/dist/aos.css';

AOS.init({
  duration: 800,
  once: false,
});

const InfoSection = () => {
  return (
    <section className="info-section text-center bg-infoSection">
      <div className="container pt-5">
        <h5 className="section-subtitle">Race</h5>
        <h2 className="section-title">
          <span className="medal-icon" />
          <div>Compete to Reach the Goal First!</div>
          <span className="medal-icon" />
        </h2>
        <p className="section-description mx-auto">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer laoreet lectus vitae pulvinar malesuada.
          In hac habitasse platea dictumst. Donec in enim lectus. Integer vel semper magna, nec sollicitudin ex...
        </p>

        <div className="row mt-5">
          <div className="col-lg-4 d-flex" data-aos="zoom-in" data-aos-delay="0">
            <InfoCard
              title="What is Multiplayer Versus?"
              text="Multiplayer Versus is an online competitive mode in Super Mario Maker 2 where four players race through the same user-created level in real time. The goal is simple: reach the finish flag before anyone else! You can jump on opponents, use power-ups, and take risky shortcuts but one mistake can cost you the lead."
              number="01"
            />
          </div>
          <div className="col-lg-4 d-flex" data-aos="zoom-in" data-aos-delay="150">
            <InfoCard
              title="Ranking & Matchmaking"
              text="Players are matched based on their Versus Rating, which increases with wins and decreases with losses. Ratings are grouped into ranks, from D (beginner) all the way up to S+ (elite). As you climb the ranks, you’ll face tougher opponents and more complex levels made specifically for Versus play."
              number="02"
            />
          </div>
          <div className="col-lg-4 d-flex" data-aos="zoom-in" data-aos-delay="300">
            <InfoCard
              title="Chaos, Strategy & Fun"
              text="Multiplayer Versus can be chaotic, levels aren’t always fair, and physics can get wild when four players collide. Success often means balancing speed with caution. Do you rush ahead and risk a trap? Or play it safe and wait for others to fail? Either way, every match is unpredictable and hilarious."
              number="03"
            />
          </div>
        </div>
      </div>
      <div className="svg-wrapper">
        <img src="/images/underGround2.png" alt="" />
      </div>
      <div className="marioWalking">
        <img src="/images/mario_walking.gif" alt="" />
      </div>
    </section>
  );
};

export default InfoSection;
