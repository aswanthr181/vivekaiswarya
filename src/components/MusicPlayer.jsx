import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Music as MusicIcon, Disc } from 'lucide-react';
import { INVITATION_DATA } from '../data/invitationData';

export default function MusicPlayer({ isPlaying, onTogglePlay }) {
  const [hasInteracted, setHasInteracted] = useState(false);

  return (
    <aside aria-label="Audio controls" className="fixed bottom-6 right-6 z-40">
      <button
        onClick={() => {
          setHasInteracted(true);
          onTogglePlay();
        }}
        className={`group relative flex items-center gap-3 px-4 py-2.5 rounded-full backdrop-blur-md transition-all duration-300 border shadow-lg ${
          isPlaying
            ? 'bg-[#fffcf7]/95 border-[#d5a24f] text-[#4b3028] shadow-[#d5a24f]/20 ring-2 ring-[#d5a24f]/30'
            : 'bg-[#fffcf7]/80 border-[#d5a24f]/40 text-[#4b3028]/70 hover:border-[#d5a24f]'
        }`}
        title={isPlaying ? 'Pause Music' : 'Play Music'}
        aria-label={isPlaying ? 'Pause Background Music' : 'Play Background Music'}
      >
        {/* Animated Disc */}
        <div className="relative w-7 h-7 flex items-center justify-center">
          <div
            className={`w-7 h-7 rounded-full bg-gradient-to-tr from-[#3a221b] via-[#5c3a2f] to-[#3a221b] border border-[#d5a24f]/70 flex items-center justify-center shadow-sm ${
              isPlaying ? 'animate-[spin_4s_linear_infinite]' : ''
            }`}
          >
            <div className="w-2.5 h-2.5 rounded-full bg-[#f4b8aa] border border-[#fffcf7]" />
          </div>
          <MusicIcon
            className={`w-3.5 h-3.5 text-[#fffcf7] absolute pointer-events-none transition-transform duration-300 ${
              isPlaying ? 'opacity-0 scale-75' : 'opacity-100 scale-100'
            }`}
          />
        </div>

        {/* Music Sound Wave Visualizer */}
        <div className="flex items-center gap-1 h-4">
          <span
            className={`w-0.5 rounded-full bg-[#d5a24f] transition-all duration-300 ${
              isPlaying ? 'h-3 animate-[pulse_0.7s_ease-in-out_infinite]' : 'h-1'
            }`}
          />
          <span
            className={`w-0.5 rounded-full bg-[#d5a24f] transition-all duration-300 ${
              isPlaying ? 'h-4 animate-[pulse_0.9s_ease-in-out_infinite_0.15s]' : 'h-1'
            }`}
          />
          <span
            className={`w-0.5 rounded-full bg-[#d5a24f] transition-all duration-300 ${
              isPlaying ? 'h-2.5 animate-[pulse_0.6s_ease-in-out_infinite_0.3s]' : 'h-1'
            }`}
          />
        </div>

        <span className="text-xs font-serif tracking-wider font-semibold text-[#4b3028] hidden sm:inline">
          {isPlaying ? 'Wedding Melody' : 'Play Music'}
        </span>

        {isPlaying ? (
          <Volume2 className="w-4 h-4 text-[#d5a24f]" />
        ) : (
          <VolumeX className="w-4 h-4 text-[#8a685e]" />
        )}
      </button>
    </aside>
  );
}
