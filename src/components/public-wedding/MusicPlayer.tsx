import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Volume2, VolumeX, Music } from "lucide-react";

interface MusicPlayerProps {
  musicUrl?: string | null;
}

export function MusicPlayer({ musicUrl }: MusicPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [showPrompt, setShowPrompt] = useState(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (musicUrl) {
      audioRef.current = new Audio(musicUrl);
      audioRef.current.loop = true;
      audioRef.current.volume = 0.5;
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, [musicUrl]);

  const handleFirstInteraction = () => {
    if (!hasInteracted && audioRef.current) {
      setHasInteracted(true);
      setShowPrompt(false);
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(console.error);
    }
  };

  const toggleMusic = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(console.error);
    }
  };

  if (!musicUrl) return null;

  return (
    <>
      {/* Initial prompt overlay */}
      <AnimatePresence>
        {showPrompt && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm"
            onClick={handleFirstInteraction}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="text-center px-8 py-10 bg-card/95 backdrop-blur-md rounded-2xl border border-wedding-gold/30 shadow-2xl max-w-sm mx-4"
              onClick={(e) => e.stopPropagation()}
            >
              <motion.div
                animate={{ 
                  scale: [1, 1.1, 1],
                  rotate: [0, 5, -5, 0]
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-wedding-gold to-wedding-gold-dark flex items-center justify-center shadow-lg"
              >
                <Music className="w-10 h-10 text-primary-foreground" />
              </motion.div>
              
              <h3 className="font-display text-2xl text-foreground mb-3">
                Trải nghiệm tốt hơn với âm nhạc
              </h3>
              <p className="font-elegant text-muted-foreground mb-6">
                Nhấn để bật nhạc nền và tận hưởng thiệp mời cưới
              </p>
              
              <div className="flex gap-3 justify-center">
                <button
                  onClick={handleFirstInteraction}
                  className="px-6 py-3 gold-gradient text-primary-foreground rounded-full font-medium hover:opacity-90 transition-opacity flex items-center gap-2"
                >
                  <Volume2 className="w-5 h-5" />
                  Bật nhạc
                </button>
                <button
                  onClick={() => {
                    setShowPrompt(false);
                    setHasInteracted(true);
                  }}
                  className="px-6 py-3 bg-muted text-muted-foreground rounded-full font-medium hover:bg-muted/80 transition-colors"
                >
                  Bỏ qua
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating music toggle button */}
      {hasInteracted && (
        <motion.button
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={toggleMusic}
          className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-gradient-to-br from-wedding-gold to-wedding-gold-dark shadow-lg flex items-center justify-center group"
          aria-label={isPlaying ? "Tắt nhạc" : "Bật nhạc"}
        >
          <AnimatePresence mode="wait">
            {isPlaying ? (
              <motion.div
                key="playing"
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                exit={{ scale: 0, rotate: 180 }}
                className="relative"
              >
                <Volume2 className="w-6 h-6 text-primary-foreground" />
                {/* Sound wave animation */}
                <motion.div
                  className="absolute -right-1 -top-1 w-2 h-2 rounded-full bg-primary-foreground/80"
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.8, 0.4, 0.8],
                  }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              </motion.div>
            ) : (
              <motion.div
                key="muted"
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                exit={{ scale: 0, rotate: 180 }}
              >
                <VolumeX className="w-6 h-6 text-primary-foreground" />
              </motion.div>
            )}
          </AnimatePresence>
          
          {/* Tooltip */}
          <span className="absolute right-full mr-3 px-3 py-1.5 bg-card text-foreground text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-md border border-border">
            {isPlaying ? "Tắt nhạc" : "Bật nhạc"}
          </span>
        </motion.button>
      )}
    </>
  );
}
