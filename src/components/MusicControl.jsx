import { useEffect, useRef, useState } from 'react';
import { Volume2, VolumeX, Music } from 'lucide-react';

export default function MusicControl({ music }) {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.45);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  if (!music?.enabled || !music?.src || hasError) {
    return null;
  }

  const togglePlay = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      try {
        await audio.play();
        setIsPlaying(true);
      } catch {
        setHasError(true);
      }
    }
  };

  return (
    <div className="fixed bottom-5 right-5 z-40 flex items-center gap-2.5 rounded-full glass-card px-3.5 py-2 shadow-glow">
      <audio
        ref={audioRef}
        src={music.src}
        loop
        preload="none"
        onError={() => setHasError(true)}
      />

      <button
        type="button"
        onClick={togglePlay}
        aria-label={isPlaying ? 'Couper la musique' : 'Activer la musique'}
        title={music.title || 'Musique de fond'}
        className="flex h-8 w-8 items-center justify-center rounded-full bg-pink-500/25 text-pink-100 transition hover:bg-pink-500/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-300"
      >
        {isPlaying ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
      </button>

      {isPlaying && (
        <div className="flex items-center gap-2 pr-1">
          <Music className="h-3.5 w-3.5 text-amber-200 animate-pulse" />
          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={volume}
            onChange={(e) => setVolume(parseFloat(e.target.value))}
            aria-label="Volume de la musique"
            className="h-1 w-16 cursor-pointer accent-pink-400"
          />
        </div>
      )}
    </div>
  );
}
