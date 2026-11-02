import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Heart, Clock, Sparkles } from 'lucide-react';
import { INVITATION_DATA } from '../data/invitationData';

gsap.registerPlugin(ScrollTrigger);

export default function Countdown() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const targetDate = new Date(INVITATION_DATA.weddingDateISO).getTime();

    const calculateTime = () => {
      const now = Date.now();
      const difference = targetDate - now;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((difference / 1000 / 60) % 60);
        const seconds = Math.floor((difference / 1000) % 60);

        setTimeLeft({ days, hours, minutes, seconds });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const gridRef = useRef(null);
  const dateTagRef = useRef(null);

  const timeUnits = [
    { label: 'Days', value: timeLeft.days },
    { label: 'Hours', value: timeLeft.hours },
    { label: 'Minutes', value: timeLeft.minutes },
    { label: 'Seconds', value: timeLeft.seconds },
  ];

  useEffect(() => {
    ScrollTrigger.refresh();

    const ctx = gsap.context(() => {
      // Heading sweeps in from above
      if (headingRef.current) {
        gsap.fromTo(
          headingRef.current,
          { y: -30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: headingRef.current,
              start: 'top 88%',
              toggleActions: 'play none none none',
            },
          }
        );
      }

      // Cards burst up with stagger — romantic heart-beat reveal
      const cards = gridRef.current?.children ? Array.from(gridRef.current.children) : [];
      if (cards.length > 0) {
        gsap.fromTo(
          cards,
          { y: 40, opacity: 0, scale: 0.9 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.9,
            stagger: 0.12,
            ease: 'back.out(1.5)',
            scrollTrigger: {
              trigger: gridRef.current,
              start: 'top 88%',
              toggleActions: 'play none none none',
            },
          }
        );
      }

      // Date tag drifts up last
      if (dateTagRef.current) {
        gsap.fromTo(
          dateTagRef.current,
          { y: 20, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            ease: 'power3.out',
            delay: 0.3,
            scrollTrigger: {
              trigger: dateTagRef.current,
              start: 'top 95%',
              toggleActions: 'play none none none',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="countdown" ref={sectionRef} className="py-20 px-4 sm:px-6 max-w-4xl mx-auto text-center">
      <div ref={headingRef} className="mb-10">
        <span className="text-xs font-sans uppercase tracking-[0.25em] text-[#b38030] font-semibold block mb-2">
          Counting Down
        </span>
        <h2 className="font-serif text-3xl sm:text-5xl text-[#3d241c] font-bold">
          A little closer every day
        </h2>
        <p className="font-serif italic text-base sm:text-lg text-[#6a473b] mt-2">
          Until Vivek &amp; Iswarya tie the knot forever
        </p>
      </div>

      {/* Countdown Grid */}
      <div ref={gridRef} className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 max-w-2xl mx-auto">
        {timeUnits.map((unit, idx) => (
          <div
            key={unit.label}
            className="glass-card rounded-2xl p-5 sm:p-6 flex flex-col items-center justify-center border border-[#d5a24f]/35 shadow-lg group hover:border-[#d5a24f] hover:-translate-y-1 transition-all duration-300"
          >
            <div className="relative font-serif text-4xl sm:text-5xl font-bold text-[#3d241c] group-hover:text-[#b38030] transition-colors">
              <span>{String(unit.value).padStart(2, '0')}</span>
              <div className="absolute -top-1 -right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <Sparkles className="w-3.5 h-3.5 text-[#d5a24f]" />
              </div>
            </div>
            <span className="mt-2 text-xs uppercase tracking-widest font-sans font-semibold text-[#8a685e]">
              {unit.label}
            </span>
          </div>
        ))}
      </div>

      {/* Romantic Date Subtext */}
      <div ref={dateTagRef} className="mt-8 inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#fffcf7]/80 border border-[#d5a24f]/30 text-xs font-sans text-[#735146] shadow-sm">
        <Heart className="w-3.5 h-3.5 text-[#d5a24f] fill-[#d5a24f]" />
        <span>Sunday, 20 December 2026 • Muhoortham 11:58 AM at Anugraha Auditorium</span>
      </div>
    </section>
  );
}
