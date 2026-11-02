import React, { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import LetterGate from './components/LetterGate';

gsap.registerPlugin(ScrollTrigger);
import PetalsCanvas from './components/PetalsCanvas';
import MusicPlayer from './components/MusicPlayer';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Story from './components/Story';
import DateReveal from './components/DateReveal';
import Countdown from './components/Countdown';
import Timeline from './components/Timeline';
import Venue from './components/Venue';
import Gallery from './components/Gallery';
import Wishes from './components/Wishes';
import Footer from './components/Footer';
import { INVITATION_DATA } from './data/invitationData';

export default function App() {
  const [isOpened, setIsOpened] = useState(false);
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);
  const audioRef = useRef(null);

  const handleOpenInvitation = () => {
    setIsOpened(true);
    // Play audio upon opening invitation
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current
        .play()
        .then(() => {
          setIsPlayingMusic(true);
        })
        .catch((err) => {
          console.log('Audio autoplay prevented:', err);
        });
    }

    // Smooth scroll to top/hero and refresh GSAP ScrollTrigger calculation
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      ScrollTrigger.refresh();
    }, 400);

    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 1000);
  };

  const handleToggleMusic = () => {
    if (!audioRef.current) return;
    if (isPlayingMusic) {
      audioRef.current.pause();
      setIsPlayingMusic(false);
    } else {
      audioRef.current
        .play()
        .then(() => {
          setIsPlayingMusic(true);
        })
        .catch((err) => console.log('Audio playback error:', err));
    }
  };

  return (
    <div className="relative min-h-screen paper-texture overflow-x-hidden">
      {/* Background Music Element */}
      <audio ref={audioRef} loop preload="auto">
        <source src={INVITATION_DATA.music} type="audio/mpeg" />
      </audio>

      {/* Falling Flower Petals Canvas */}
      <PetalsCanvas />

      {/* Initial 3D Letter Gate / Envelope */}
      {!isOpened && <LetterGate onOpen={handleOpenInvitation} />}

      {/* Floating Music Toggle */}
      <MusicPlayer
        isPlaying={isPlayingMusic}
        onTogglePlay={handleToggleMusic}
      />

      {/* Main Wedding Invitation Content */}
      <main className={`transition-opacity duration-1000 ${isOpened ? 'opacity-100' : 'opacity-0 h-screen overflow-hidden'}`}>
        <Navbar />
        <Hero />
        <Story />
        <DateReveal />
        <Countdown />
        <Timeline />
        <Venue />
        <Gallery />
        <Wishes />
        <Footer />
      </main>
    </div>
  );
}
