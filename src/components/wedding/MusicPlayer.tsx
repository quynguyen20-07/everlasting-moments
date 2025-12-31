import { Button } from "@/components/ui/button";
import { Pause, Play } from "lucide-react";
import { useEffect, useRef } from "react";

interface MusicPlayerProps {
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    text: string;
    muted: string;
    music?: string;
  };
  isPlaying: boolean;
  onToggle: () => void;
  templateSlug: string;
}

const MusicPlayer = ({
  colors,
  isPlaying,
  onToggle,
  templateSlug,
}: MusicPlayerProps) => {
  const audioRef = useRef<HTMLAudioElement>(null);

  // Default music tracks for each template
  const getMusicSrc = () => {
    const defaultMusic = "/music/default-wedding.mp3";
    const templateMusic: Record<string, string> = {
      "soft-pink": "/music/romantic-piano.mp3",
      "golden-hour": "/music/warm-strings.mp3",
      "garden-party": "/music/nature-melody.mp3",
      "classic-elegant": "/music/classical-piano.mp3",
      "navy-elegance": "/music/orchestral.mp3",
      "burgundy-romance": "/music/romantic-violin.mp3",
      "blush-gold": "/music/love-song.mp3",
      "lavender-dream": "/music/dreamy-ambient.mp3",
    };

    return templateMusic[templateSlug] || colors.music || defaultMusic;
  };

  useEffect(() => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.play().catch((err) => {
        console.error("Failed to play audio:", err);
      });
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  const handleToggle = () => {
    onToggle();
  };

  return (
    <>
      <audio
        ref={audioRef}
        src={getMusicSrc()}
        loop
        preload="metadata"
        onEnded={() => {
          if (audioRef.current) {
            audioRef.current.currentTime = 0;
            audioRef.current.play();
          }
        }}
      />

      <Button
        variant="outline"
        size="icon"
        className="fixed bottom-6 right-6 z-40 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-110 group"
        style={{
          borderColor: colors.primary,
          background: "white",
          color: colors.primary,
        }}
        onClick={handleToggle}
      >
        {isPlaying ? (
          <>
            <Pause className="w-5 h-5" />
            <span className="sr-only">Tạm dừng nhạc</span>
          </>
        ) : (
          <>
            <Play className="w-5 h-5" />
            <span className="sr-only">Phát nhạc</span>
          </>
        )}

        {/* Music note animation when playing */}
        {isPlaying && (
          <div className="absolute -top-2 -right-2">
            <div className="relative">
              <div className="absolute w-2 h-2 bg-primary rounded-full animate-ping" />
              <div className="relative w-2 h-2 bg-primary rounded-full" />
            </div>
          </div>
        )}
      </Button>

      {/* Volume control */}
      {isPlaying && (
        <div className="fixed bottom-24 right-6 z-40">
          <div className="bg-white rounded-full p-2 shadow-lg">
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              defaultValue="0.5"
              className="w-24 h-1 bg-gray-200 rounded-full appearance-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary"
              style={{ "--thumb-color": colors.primary } as React.CSSProperties}
              onChange={(e) => {
                if (audioRef.current) {
                  audioRef.current.volume = parseFloat(e.target.value);
                }
              }}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default MusicPlayer;
