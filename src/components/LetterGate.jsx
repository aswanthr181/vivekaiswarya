import React, { useRef, useState } from 'react';
import gsap from 'gsap';
import confetti from 'canvas-confetti';
import { Heart, Sparkles, MailOpen } from 'lucide-react';
import { INVITATION_DATA } from '../data/invitationData';

export default function LetterGate({ onOpen }) {
  const [isOpening, setIsOpening] = useState(false);
  const containerRef = useRef(null);
  const envelopeRef = useRef(null);
  const flapRef = useRef(null);
  const cardRef = useRef(null);
  const waxSealRef = useRef(null);

  const handleOpenInvitation = () => {
    if (isOpening) return;
    setIsOpening(true);

    // Trigger celebratory confetti burst
    const count = 120;
    const defaults = {
      origin: { y: 0.65 },
      zIndex: 9999,
      colors: ['#d5a24f', '#f4b8aa', '#fff0c8', '#879b76', '#e7a9bf', '#ffffff']
    };

    confetti({
      ...defaults,
      particleCount: Math.floor(count * 0.7),
      spread: 70,
      startVelocity: 45,
    });
    setTimeout(() => {
      confetti({
        ...defaults,
        particleCount: Math.floor(count * 0.5),
        spread: 100,
        startVelocity: 55,
      });
    }, 200);

    const tl = gsap.timeline({
      onComplete: () => {
        if (onOpen) onOpen();
      }
    });

    // 1. Wax seal breaks & fades
    tl.to(waxSealRef.current, {
      scale: 1.4,
      opacity: 0,
      duration: 0.4,
      ease: 'power2.out',
    })
    // 2. Flap opens upward
    .to(flapRef.current, {
      rotateX: -180,
      duration: 0.7,
      ease: 'power2.inOut',
    }, '-=0.2')
    // 3. Letter card lifts up out of envelope
    .to(cardRef.current, {
      y: -140,
      scale: 1.05,
      duration: 0.9,
      ease: 'power3.out',
    }, '-=0.3')
    // 4. Whole gate dissolves smoothly
    .to(containerRef.current, {
      opacity: 0,
      scale: 1.04,
      filter: 'blur(8px)',
      duration: 0.7,
      delay: 0.2,
      ease: 'power2.inOut',
    });
  };

  return (
    <section aria-label="Wedding letter gate"
      ref={containerRef}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#fcf8f2] overflow-hidden"
      style={{
        backgroundImage: `
          radial-gradient(circle at 50% 20%, rgba(244, 184, 170, 0.4), transparent 50%),
          radial-gradient(circle at 80% 80%, rgba(213, 162, 79, 0.25), transparent 45%),
          linear-gradient(180deg, #fffaf5, #f8efe4)
        `
      }}
    >
      {/* Decorative ambient gold ring glow */}
      <div className="absolute w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-[#f4b8aa]/20 via-[#ffd88a]/30 to-transparent blur-3xl pointer-events-none animate-pulse-glow" />

      {/* Main Envelope Structure */}
      <div
        ref={envelopeRef}
        className="envelope-wrap relative w-full max-w-[420px] min-h-[520px] flex items-center justify-center"
      >
        {/* Envelope Back Base */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#f8d7ce] via-[#fdf2df] to-[#eed095] border border-[#d5a24f]/30 shadow-2xl shadow-[#8b5a3e]/15 overflow-hidden">
          {/* Subtle paper grain texture */}
          <div className="absolute inset-0 opacity-40 bg-[radial-gradient(#ab7d55_1px,transparent_1px)] [background-size:16px_16px]" />
        </div>

        {/* The Letter Card (slides up) */}
        <div
          ref={cardRef}
          className="relative z-10 w-[88%] min-h-[440px] rounded-xl glass-card p-6 sm:p-8 text-center flex flex-col justify-between items-center shadow-xl border border-[#d5a24f]/40 overflow-hidden transform-gpu"
          style={{
            backgroundImage: `linear-gradient(rgba(255, 253, 248, 0.88), rgba(255, 250, 242, 0.94)), url('/assets/couple-portrait.jpg')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          {/* Card Floral Ornament Header */}
          <div className="w-full flex flex-col items-center">
            <span className="text-[11px] font-sans uppercase tracking-[0.25em] text-[#b38030] font-bold flex items-center gap-1.5 mb-2">
              <Sparkles className="w-3.5 h-3.5 text-[#d5a24f]" />
              A little letter for you
              <Sparkles className="w-3.5 h-3.5 text-[#d5a24f]" />
            </span>
            <div className="w-16 h-px bg-gradient-to-r from-transparent via-[#d5a24f]/60 to-transparent mb-4" />
          </div>

          {/* Invitation Copy */}
          <div className="my-auto py-2">
            <h1 className="font-serif text-3xl sm:text-4xl text-[#3d241c] font-semibold tracking-tight mb-2">
              You are invited
            </h1>
            <p className="font-sans text-xs sm:text-sm text-[#735146] font-light leading-relaxed max-w-[260px] mx-auto mb-4">
              to celebrate the beginning of forever with
            </p>

            <div className="py-2 px-4 rounded-lg bg-[#fff8ef]/80 border border-[#d5a24f]/30 shadow-inner">
              <h2 className="font-serif text-2xl sm:text-3xl text-[#b38030] font-bold tracking-normal">
                {INVITATION_DATA.groom} <span className="font-script text-3xl sm:text-4xl text-[#d5a24f] font-normal mx-1">&</span> {INVITATION_DATA.bride}
              </h2>
            </div>

            <p className="mt-3 font-sans text-xs tracking-wider uppercase text-[#8a685e] font-medium">
              {INVITATION_DATA.weddingDate}
            </p>
          </div>

          {/* Open Invitation Button */}
          <div className="w-full pt-2">
            <button
              onClick={handleOpenInvitation}
              disabled={isOpening}
              className="gold-button w-full py-3.5 px-6 rounded-full font-serif text-base sm:text-lg font-semibold tracking-wide flex items-center justify-center gap-2 cursor-pointer transition-all duration-300"
            >
              <MailOpen className="w-5 h-5 text-white/90" />
              <span>{isOpening ? 'Opening Invitation...' : 'Open Invitation'}</span>
            </button>
            <p className="text-[10px] text-[#8a685e] mt-2 font-sans tracking-wide">
              Tap to unveil our wedding card & melody
            </p>
          </div>
        </div>

        {/* Envelope Pocket (Front fold triangle) */}
        <div className="absolute inset-x-0 bottom-0 h-[52%] z-20 pointer-events-none rounded-b-2xl envelope-pocket" />

        {/* Envelope Top Flap (3D fold) */}
        <div
          ref={flapRef}
          className="absolute inset-x-0 top-0 h-[48%] z-30 pointer-events-none rounded-t-2xl envelope-flap animate-flap-hello"
          style={{ transformOrigin: 'top center' }}
        />

        {/* Wax Seal / Heart Emblem */}
        <div
          ref={waxSealRef}
          onClick={handleOpenInvitation}
          className="absolute z-40 top-[42%] w-14 h-14 rounded-full bg-gradient-to-tr from-[#9b2c2c] via-[#c53030] to-[#e53e3e] border-2 border-[#ffdb9b] shadow-xl flex items-center justify-center cursor-pointer transition-transform duration-300 hover:scale-110 active:scale-95 group"
          title="Click to break seal and open"
        >
          <div className="w-11 h-11 rounded-full border border-dashed border-[#ffdb9b]/60 flex items-center justify-center">
            <Heart className="w-6 h-6 text-[#ffdb9b] fill-[#ffdb9b] group-hover:scale-110 transition-transform" />
          </div>
        </div>
      </div>
    </section>
  );
}
