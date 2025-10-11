import { useState, useRef, useEffect } from "react";

export default function MusicButton() {
  const [isPlaying, setIsPlaying] = useState(false);
  const musicRef = useRef(null);

  useEffect(() => {
    // Zorg dat audio geladen wordt bij component mount
    if (musicRef.current) {
      musicRef.current.load();
      musicRef.current.volume = 0.05; // zet volume op 30%
    }
  }, []);

  const toggleMusic = () => {
    if (!musicRef.current) return;

    if (isPlaying) {
      musicRef.current.pause();
    } else {
      musicRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <>
      <button id="music-btn" onClick={toggleMusic}>
        {isPlaying ? "⏸️" : "▶️"}
      </button>
      <audio ref={musicRef} loop>
        <source src={process.env.PUBLIC_URL + "/courseWorld.mp3"} type="audio/mpeg" />
        Je browser ondersteunt audio niet.
      </audio>
    </>
  );
}
