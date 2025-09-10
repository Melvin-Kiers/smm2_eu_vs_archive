import { useState, useRef } from "react";

export default function Hero() {
  const [animate, setAnimate] = useState(false);
  const audioRef = useRef(null); // ref voor het geluid

  const handleClick = () => {
    // Animatie resetten
    setAnimate(false);
    setTimeout(() => setAnimate(true), 10);

    // Geluid afspelen
    if (audioRef.current) {
      audioRef.current.currentTime = 0; // herstart geluid
      audioRef.current.play();
      audioRef.current.volume = 0.25;
    }
  };

  return (
    <section className="hero-section">
      <img src="/images/topGroundSet.png" alt="" className="section-divider-top" />

      <div
        className={`hero-content ${animate ? "active" : ""}`}
        id="HeroText"
        onClick={handleClick}
      >
        <h1>
          The Super <span className="no-break">
            Mar
            <span className="landing-spot">
              i
              {animate && (
                <img
                  src="/images/smm_parakeet.png"
                  alt="Bird"
                  className="drop-in-out"
                />
              )}
            </span>
            o
          </span> Maker 2 <span className="orange">EU VS</span> Archive
        </h1>
        <p>Discover amazing things with us.</p>
      </div>

      <img src="/images/bottomGroundSet.png" alt="" className="section-divider" />

      {/* Audio-element */}
      <audio ref={audioRef} src="/smb_coin.wav"/>
    </section>
  );
}
