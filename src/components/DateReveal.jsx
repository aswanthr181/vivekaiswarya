import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import confetti from 'canvas-confetti';
import { Calendar, Clock, MapPin, Sparkles, Heart, Share2, Check, RotateCcw } from 'lucide-react';
import ShareModal from './ShareModal';
import { INVITATION_DATA } from '../data/invitationData';

gsap.registerPlugin(ScrollTrigger);

export default function DateReveal() {
  const [isUnsealed, setIsUnsealed] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const cardRef = useRef(null);
  const sealRef = useRef(null);
  const ribbonHRef = useRef(null);
  const ribbonVRef = useRef(null);
  const leftDoorRef = useRef(null);
  const rightDoorRef = useRef(null);
  const innerContentRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headerRef.current, {
        scrollTrigger: { trigger: headerRef.current, start: 'top 85%', toggleActions: 'play none none none' },
        y: -40,
        opacity: 0,
        duration: 1.2,
        ease: 'power3.out',
      });

      gsap.from(cardRef.current, {
        scrollTrigger: { trigger: cardRef.current, start: 'top 85%', toggleActions: 'play none none none' },
        y: 60,
        scale: 0.95,
        opacity: 0,
        duration: 1.2,
        ease: 'power3.out',
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleUnseal = () => {
    if (isUnsealed || isAnimating) return;
    setIsAnimating(true);

    // Celebratory golden & rose confetti burst
    confetti({
      particleCount: 85,
      spread: 75,
      origin: { y: 0.65 },
      colors: ['#d5a24f', '#f4b8aa', '#ffd88a', '#ffffff', '#e7a9bf', '#c4913b']
    });

    const tl = gsap.timeline({
      onComplete: () => {
        setIsUnsealed(true);
        setIsAnimating(false);
      }
    });

    // 1. Seal pops and spins slightly
    tl.to(sealRef.current, {
      scale: 1.3,
      rotate: 15,
      opacity: 0,
      duration: 0.45,
      ease: 'back.in(1.7)',
    })
    // 2. Ribbons slide away
    .to([ribbonHRef.current, ribbonVRef.current], {
      scaleX: 0,
      opacity: 0,
      duration: 0.4,
      ease: 'power2.inOut',
    }, '-=0.2')
    // 3. Dual royal doors swing open outward with 3D perspective
    .to(leftDoorRef.current, {
      rotateY: -105,
      opacity: 0,
      duration: 0.9,
      ease: 'power3.inOut',
    }, '-=0.1')
    .to(rightDoorRef.current, {
      rotateY: 105,
      opacity: 0,
      duration: 0.9,
      ease: 'power3.inOut',
    }, '<')
    // 4. Inner gold content blooms forward
    .fromTo(innerContentRef.current, 
      { scale: 0.9, opacity: 0, y: 15 },
      { scale: 1, opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' },
      '-=0.4'
    );
  };

  const handleReseal = () => {
    if (!isUnsealed || isAnimating) return;
    setIsAnimating(true);

    const tl = gsap.timeline({
      onComplete: () => {
        setIsUnsealed(false);
        setIsAnimating(false);
      }
    });

    tl.to(innerContentRef.current, {
      scale: 0.92,
      opacity: 0,
      duration: 0.35,
    })
    .to([leftDoorRef.current, rightDoorRef.current], {
      rotateY: 0,
      opacity: 1,
      duration: 0.65,
      ease: 'power3.out',
    })
    .to([ribbonHRef.current, ribbonVRef.current], {
      scaleX: 1,
      opacity: 1,
      duration: 0.35,
    }, '-=0.2')
    .to(sealRef.current, {
      scale: 1,
      rotate: 0,
      opacity: 1,
      duration: 0.4,
      ease: 'back.out(1.5)',
    }, '-=0.1');
  };

  const createGoogleCalendarLink = () => {
    const start = '20261220T062800Z'; // 11:58 AM IST
    const end = '20261220T064000Z';   // 12:10 PM IST
    const title = encodeURIComponent('Vivek & Aiswarya Wedding Ceremony (Muhoortham)');
    const details = encodeURIComponent(
      'The sacred wedding ceremony of Vivek & Aiswarya.\n\nMuhoortham: 11:58 AM to 12:10 PM at Anugraha Auditorium (https://share.google/ScjOTR6QxVD6RKi9o)\nReception: From 4:30 PM at SOWBHAGYA AC CONVENTION CENTER (https://share.google/s8mlSWNi1YlK6400U)'
    );
    const location = encodeURIComponent('Anugraha Auditorium');
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${start}/${end}&details=${details}&location=${location}`;
  };

  const handleShareDate = () => {
    const text = `Save the Date! Vivek & Aiswarya's Wedding on 20 December 2026! ✨💍\n\nMarriage: Anugraha Auditorium (Muhoortham 11:58 AM – 12:10 PM)\nMap: https://share.google/ScjOTR6QxVD6RKi9o\n\nReception: SOWBHAGYA AC CONVENTION CENTER (From 4:30 PM)\nMap: https://share.google/s8mlSWNi1YlK6400U\n\n${window.location.href}`;
    if (navigator.share) {
      navigator.share({
        title: 'Save The Date - Vivek & Aiswarya',
        text,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(text);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  return (
    <section id="date-reveal" ref={sectionRef} className="py-20 px-4 sm:px-6 max-w-4xl mx-auto text-center">
      <div ref={headerRef} className="mb-10">
        <span className="text-xs font-sans uppercase tracking-[0.25em] text-[#b38030] font-semibold block mb-2">
          Save The Date
        </span>
        <h2 className="font-serif text-3xl sm:text-5xl text-[#3d241c] font-bold">
          The Auspicious Muhoortham
        </h2>
        <p className="font-serif italic text-base sm:text-lg text-[#6a473b] mt-2 max-w-lg mx-auto">
          Unseal our sacred wedding announcement to discover the auspicious moment of our forever
        </p>
        <div className="w-20 h-0.5 bg-gradient-to-r from-transparent via-[#d5a24f] to-transparent mx-auto mt-4" />
      </div>

      {/* Main Interactive Royal Box */}
      <div
        ref={cardRef}
        className="relative mx-auto w-full max-w-[480px] min-h-[460px] rounded-3xl shadow-2xl border-2 border-[#d5a24f]/40 overflow-hidden bg-gradient-to-br from-[#fffdf8] via-[#fff7ef] to-[#fcefe2] [perspective:1200px]"
      >
        {/* ================= REVEALED INNER CONTENT ================= */}
        <div
          ref={innerContentRef}
          className={`p-6 sm:p-7 flex flex-col items-center justify-between min-h-[460px] ${
            !isUnsealed && !isAnimating ? 'opacity-0 pointer-events-none' : 'opacity-100'
          }`}
        >
          {/* Header Tag */}
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-[#d5a24f]/15 border border-[#d5a24f]/35 text-[#8a5d24] text-[11px] font-sans uppercase tracking-widest font-bold">
            <Sparkles className="w-3.5 h-3.5 text-[#d5a24f]" />
            <span>Sacred Muhoortham &amp; Reception</span>
            <Sparkles className="w-3.5 h-3.5 text-[#d5a24f]" />
          </div>

          {/* Large Date Display */}
          <div className="my-2.5 py-2.5 w-full border-y border-[#d5a24f]/25 bg-[#fffaf3]/70 rounded-2xl">
            <span className="text-xs uppercase tracking-[0.3em] font-sans text-[#8a685e] font-semibold block mb-0.5">
              Sunday
            </span>
            <div className="flex items-center justify-center gap-3">
              <span className="font-serif text-5xl sm:text-6xl font-extrabold text-[#3d241c] tracking-tight drop-shadow-sm">
                20
              </span>
            </div>
            <span className="font-serif italic text-xl sm:text-2xl font-bold text-[#b38030] block mt-0.5">
              December 2026
            </span>
          </div>

          {/* Venue & Timing Dual Cards */}
          <div className="space-y-2 w-full text-left my-2">
            {/* Marriage Card */}
            <a
              href="https://share.google/ScjOTR6QxVD6RKi9o"
              target="_blank"
              rel="noopener noreferrer"
              className="group block p-3 rounded-xl bg-[#fff5eb] border border-[#d5a24f]/35 hover:border-[#d5a24f] hover:bg-[#ffede0] transition-all shadow-sm"
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] uppercase tracking-wider font-sans font-bold text-[#b38030]">
                  Marriage Ceremony
                </span>
                <span className="text-[10px] font-sans text-[#8a5d24] font-semibold group-hover:underline">
                  Open Map ↗
                </span>
              </div>
              <h4 className="font-serif font-bold text-base text-[#3d241c]">
                Anugraha Auditorium
              </h4>
              <div className="flex items-center gap-1.5 text-xs text-[#5c3e34] mt-0.5">
                <Clock className="w-3.5 h-3.5 text-[#d5a24f]" />
                <span className="font-semibold text-[#8a5d24]">Muhoortham: 11:58 AM to 12:10 PM</span>
              </div>
            </a>

            {/* Reception Card */}
            
          </div>

          {/* Action Buttons */}
          <div className="w-full flex items-center gap-2 pt-2 border-t border-[#d5a24f]/20">
            <a
              href={createGoogleCalendarLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="gold-button flex-1 py-2.5 px-3 rounded-full text-xs font-semibold tracking-wide flex items-center justify-center gap-1.5"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Add to Calendar</span>
            </a>

            <button
              onClick={() => setIsShareModalOpen(true)}
              className="px-4 py-2.5 rounded-full bg-[#fffcf7] border border-[#d5a24f]/40 hover:border-[#d5a24f] hover:bg-[#fff9f0] text-xs font-sans text-[#5c3e34] flex items-center justify-center gap-1.5 shadow-sm transition-all cursor-pointer"
            >
              <Share2 className="w-3.5 h-3.5 text-[#d5a24f]" />
              <span>Share</span>
            </button>

            <button
              onClick={handleReseal}
              title="Re-seal to view animation again"
              className="p-2.5 rounded-full bg-[#fff5eb] border border-[#d5a24f]/40 hover:bg-[#ffece0] text-[#8a685e] hover:text-[#3d241c] transition-colors"
              aria-label="Re-seal card"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* ================= DUAL ROYAL DOORS (FRONT COVER) ================= */}
        <div
          ref={leftDoorRef}
          className={`absolute inset-y-0 left-0 w-1/2 z-20 origin-left bg-gradient-to-r from-[#fdf2df] via-[#fae8d8] to-[#f4d1c6] border-r border-[#d5a24f]/30 shadow-md ${
            isUnsealed ? 'hidden' : 'flex'
          } items-center justify-end overflow-hidden`}
        >
          {/* Ornate corner filigree */}
          <div className="absolute top-4 left-4 w-12 h-12 border-t-2 border-l-2 border-[#d5a24f]/40 rounded-tl-xl pointer-events-none" />
          <div className="absolute bottom-4 left-4 w-12 h-12 border-b-2 border-l-2 border-[#d5a24f]/40 rounded-bl-xl pointer-events-none" />
          <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#ab7d55_1px,transparent_1px)] [background-size:14px_14px]" />
        </div>

        <div
          ref={rightDoorRef}
          className={`absolute inset-y-0 right-0 w-1/2 z-20 origin-right bg-gradient-to-l from-[#fdf2df] via-[#fae8d8] to-[#f4d1c6] border-l border-[#d5a24f]/30 shadow-md ${
            isUnsealed ? 'hidden' : 'flex'
          } items-center justify-start overflow-hidden`}
        >
          {/* Ornate corner filigree */}
          <div className="absolute top-4 right-4 w-12 h-12 border-t-2 border-r-2 border-[#d5a24f]/40 rounded-tr-xl pointer-events-none" />
          <div className="absolute bottom-4 right-4 w-12 h-12 border-b-2 border-r-2 border-[#d5a24f]/40 rounded-br-xl pointer-events-none" />
          <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#ab7d55_1px,transparent_1px)] [background-size:14px_14px]" />
        </div>

        {/* ================= SATIN SILK RIBBONS ================= */}
        {/* Horizontal Ribbon */}
        <div
          ref={ribbonHRef}
          className={`absolute top-1/2 left-0 right-0 h-10 -translate-y-1/2 z-25 bg-gradient-to-r from-[#b93838] via-[#d64b4b] to-[#b93838] shadow-md border-y border-[#ffdb9b]/50 origin-center pointer-events-none ${
            isUnsealed ? 'hidden' : 'block'
          }`}
        >
          <div className="w-full h-full flex items-center justify-center">
            <div className="w-full h-px bg-[#ffdb9b]/60" />
          </div>
        </div>

        {/* Vertical Ribbon */}
        <div
          ref={ribbonVRef}
          className={`absolute top-0 bottom-0 left-1/2 w-10 -translate-x-1/2 z-25 bg-gradient-to-b from-[#b93838] via-[#d64b4b] to-[#b93838] shadow-md border-x border-[#ffdb9b]/50 origin-center pointer-events-none ${
            isUnsealed ? 'hidden' : 'block'
          }`}
        >
          <div className="w-full h-full flex items-center justify-center">
            <div className="h-full w-px bg-[#ffdb9b]/60" />
          </div>
        </div>

        {/* ================= ROYAL WAX SEAL EMBLEM ================= */}
        {!isUnsealed && (
          <div
            ref={sealRef}
            onClick={handleUnseal}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 cursor-pointer group flex flex-col items-center"
          >
            {/* Glowing gold back aura */}
            <div className="absolute -inset-4 rounded-full bg-gradient-to-tr from-[#d5a24f]/40 to-[#ffdb9b]/60 blur-md group-hover:scale-125 transition-transform duration-500 animate-pulse" />

            {/* 3D Wax Seal */}
            <div className="relative w-24 h-24 rounded-full bg-gradient-to-br from-[#e0b05b] via-[#c4913b] to-[#8c5e1c] p-1.5 shadow-2xl border-2 border-[#fff3d4] flex items-center justify-center group-hover:scale-110 active:scale-95 transition-all duration-300">
              {/* Outer decorative dashed ring */}
              <div className="w-full h-full rounded-full border border-dashed border-[#fff3d4]/70 flex flex-col items-center justify-center bg-gradient-to-tr from-[#a36f23] to-[#dca54c] text-white shadow-inner">
                <span className="text-[9px] uppercase tracking-widest font-sans font-bold text-[#fff3d4] leading-tight">
                  V &amp; A
                </span>
                <Heart className="w-4 h-4 text-[#fff3d4] fill-[#fff3d4] my-0.5 group-hover:scale-125 transition-transform" />
                <span className="text-[8px] tracking-wider font-mono text-[#fff3d4]/90">
                  20.12.2026
                </span>
              </div>
            </div>

            {/* Tap instruction badge */}
            <div className="mt-3 px-3.5 py-1 rounded-full bg-[#3d241c]/90 text-white text-[10px] font-sans font-medium tracking-wide shadow-md flex items-center gap-1.5 whitespace-nowrap backdrop-blur-sm group-hover:bg-[#3d241c] transition-colors">
              <Sparkles className="w-3 h-3 text-[#eed095]" />
              <span>Tap to Unseal Date</span>
            </div>
          </div>
        )}
      </div>

      {/* Auxiliary Help Note */}
      <div className="mt-6 flex justify-center">
        {!isUnsealed ? (
          <button
            onClick={handleUnseal}
            className="flex items-center gap-1.5 text-xs text-[#8a685e] hover:text-[#b38030] transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#d5a24f]" />
            <span>Click anywhere on the seal to break the ribbon &amp; unseal</span>
          </button>
        ) : (
          <span className="inline-flex items-center gap-1.5 text-xs text-[#b38030] font-semibold bg-[#fff6e6] px-4 py-1.5 rounded-full border border-[#d5a24f]/30 shadow-sm">
            <Heart className="w-3.5 h-3.5 text-[#d5a24f] fill-[#d5a24f]" />
            Auspicious Muhurtham Unsealed! We cannot wait to see you.
          </span>
        )}
      </div>

      {/* Share Modal Dialog */}
      <ShareModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
      />
    </section>
  );
}
