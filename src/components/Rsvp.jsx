import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Heart, CheckCircle2, Users, Sparkles, Send } from 'lucide-react';
import { INVITATION_DATA } from '../data/invitationData';

gsap.registerPlugin(ScrollTrigger);

export default function Rsvp() {
  const [attended, setAttended] = useState(false);
  const [guestCount, setGuestCount] = useState('2');
  const [eventsAttending, setEventsAttending] = useState('all');
  const [guestName, setGuestName] = useState('');
  const [floatingHearts, setFloatingHearts] = useState([]);
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const cardRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headingRef.current, {
        scrollTrigger: { trigger: headingRef.current, start: 'top 85%', toggleActions: 'play none none none' },
        y: -40,
        opacity: 0,
        duration: 1.2,
        ease: 'power3.out',
      });

      gsap.from(cardRef.current, {
        scrollTrigger: { trigger: cardRef.current, start: 'top 85%', toggleActions: 'play none none none' },
        y: 60,
        scale: 0.94,
        opacity: 0,
        duration: 1.2,
        ease: 'power3.out',
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleConfirmRsvp = (e) => {
    e.preventDefault();
    setAttended(true);

    confetti({
      particleCount: 100,
      spread: 75,
      origin: { y: 0.7 },
      colors: ['#d5a24f', '#f4b8aa', '#ffd88a', '#ffffff', '#e7a9bf'],
    });
  };

  const spawnFloatingHeart = () => {
    const id = Date.now() + Math.random();
    const newHeart = {
      id,
      left: 15 + Math.random() * 70, // percentage across screen
      size: 18 + Math.random() * 24,
      color: ['#f4b8aa', '#d5a24f', '#e7a9bf', '#ffb6c1'][Math.floor(Math.random() * 4)],
    };

    setFloatingHearts((prev) => [...prev, newHeart]);
    setTimeout(() => {
      setFloatingHearts((prev) => prev.filter((h) => h.id !== id));
    }, 2800);
  };

  return (
    <section id="rsvp" ref={sectionRef} className="py-20 px-4 sm:px-6 max-w-4xl mx-auto text-center relative">
      {/* Floating Hearts Container */}
      <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
        {floatingHearts.map((h) => (
          <div
            key={h.id}
            style={{
              left: `${h.left}%`,
              bottom: '-20px',
              fontSize: `${h.size}px`,
              color: h.color,
            }}
            className="absolute animate-[heartFloat_2.6s_ease-out_forwards]"
          >
            ❤️
          </div>
        ))}
      </div>

      <div ref={headingRef} className="mb-12">
        <span className="text-xs font-sans uppercase tracking-[0.25em] text-[#b38030] font-semibold block mb-2">
          Will You Join Us?
        </span>
        <h2 className="font-serif text-3xl sm:text-5xl text-[#3d241c] font-bold">
          Celebrate With Us
        </h2>
        <p className="font-serif italic text-base sm:text-lg text-[#6a473b] mt-2">
          Kindly confirm your presence by 10 December 2026
        </p>
        <div className="w-20 h-0.5 bg-gradient-to-r from-transparent via-[#d5a24f] to-transparent mx-auto mt-4" />
      </div>

      <div ref={cardRef} className="glass-card rounded-3xl p-6 sm:p-10 shadow-xl border border-[#d5a24f]/30 max-w-xl mx-auto">
        {!attended ? (
          <form onSubmit={handleConfirmRsvp} className="space-y-4">
            <div>
              <label className="block text-xs uppercase tracking-wider font-sans font-semibold text-[#614339] mb-1.5 text-left">
                Your Full Name / Family
              </label>
              <input
                type="text"
                required
                value={guestName}
                onChange={(e) => setGuestName(e.target.value)}
                placeholder="e.g. Dr. Anand &amp; Family"
                className="w-full px-4 py-3 rounded-xl bg-[#fffcf7] border border-[#d5a24f]/30 focus:border-[#d5a24f] focus:outline-none focus:ring-2 focus:ring-[#d5a24f]/20 text-sm text-[#3d241c] transition-all"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider font-sans font-semibold text-[#614339] mb-1.5 text-left">
                Events Attending
              </label>
              <select
                value={eventsAttending}
                onChange={(e) => setEventsAttending(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-[#fffcf7] border border-[#d5a24f]/30 focus:border-[#d5a24f] focus:outline-none focus:ring-2 focus:ring-[#d5a24f]/20 text-sm text-[#3d241c] transition-all"
              >
                <option value="all">All Celebrations (19 &amp; 20 Dec)</option>
                <option value="bride">Bride's Reception (19 Dec)</option>
                <option value="wedding">Holy Wedding &amp; Reception (20 Dec)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider font-sans font-semibold text-[#614339] mb-1.5 text-left">
                Number of Guests Attending
              </label>
              <select
                value={guestCount}
                onChange={(e) => setGuestCount(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-[#fffcf7] border border-[#d5a24f]/30 focus:border-[#d5a24f] focus:outline-none focus:ring-2 focus:ring-[#d5a24f]/20 text-sm text-[#3d241c] transition-all"
              >
                <option value="1">1 Person</option>
                <option value="2">2 People</option>
                <option value="3">3 People</option>
                <option value="4">4 People</option>
                <option value="5+">5+ People (Family)</option>
              </select>
            </div>

            <button
              type="submit"
              className="gold-button w-full py-3.5 px-6 rounded-full font-serif text-lg font-semibold tracking-wide flex items-center justify-center gap-2 cursor-pointer shadow-lg mt-4"
            >
              <Heart className="w-5 h-5 fill-white" />
              <span>We're Attending! (Confirm RSVP)</span>
            </button>
          </form>
        ) : (
          <div className="py-6 flex flex-col items-center animate-[fadeIn_0.5s_ease-out]">
            <div className="w-16 h-16 rounded-full bg-emerald-100 border border-emerald-400 flex items-center justify-center text-emerald-600 mb-4 shadow-inner">
              <CheckCircle2 className="w-9 h-9" />
            </div>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#3d241c] mb-2">
              RSVP Confirmed!
            </h3>
            <p className="font-serif italic text-base text-[#6a473b] max-w-sm mb-4">
              Thank you {guestName ? `, ${guestName}` : ''}! We cannot wait to embrace you with open arms on 19 &amp; 20 December 2026.
            </p>
            <span className="text-xs font-sans text-[#b38030] font-semibold bg-[#fff6e6] px-4 py-1.5 rounded-full border border-[#d5a24f]/30">
              Reserved for {guestCount} guest(s) • {eventsAttending === 'bride' ? "Bride's Reception (19 Dec)" : eventsAttending === 'wedding' ? "Wedding & Reception (20 Dec)" : "All Celebrations"}
            </span>
          </div>
        )}

        {/* Interactive "Send Love" heart button */}
        <div className="mt-8 pt-6 border-t border-[#d5a24f]/20 flex flex-col items-center">
          <p className="text-xs font-sans text-[#735146] mb-3">
            Want to send extra love to Vivek &amp; Iswarya?
          </p>
          <button
            type="button"
            onClick={spawnFloatingHeart}
            className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#fff5eb] border border-[#f4b8aa] text-[#b34055] hover:bg-[#ffece8] hover:scale-105 active:scale-95 transition-all shadow-sm font-sans text-xs font-semibold"
          >
            <Heart className="w-4 h-4 fill-[#b34055]" />
            <span>Tap to Send Floating Hearts ❤️</span>
          </button>
        </div>
      </div>
    </section>
  );
}
