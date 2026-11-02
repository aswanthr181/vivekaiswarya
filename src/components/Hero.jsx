import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Calendar, MapPin, ChevronDown, Sparkles, Heart } from 'lucide-react';
import { INVITATION_DATA } from '../data/invitationData';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const heroRef = useRef(null);
  const bgImageRef = useRef(null);
  const overlayRef = useRef(null);
  const eyebrowRef = useRef(null);
  const groomRef = useRef(null);
  const ampersandRef = useRef(null);
  const brideRef = useRef(null);
  const subtitleRef = useRef(null);
  const badgesRef = useRef(null);
  const scrollRef = useRef(null);
  const titleBlockRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // ─── Master Timeline ───
      const master = gsap.timeline({ defaults: { ease: 'power3.out' } });

      // ─── 1. Background Image: Ken Burns zoom + fade-in ───
      master.fromTo(
        bgImageRef.current,
        { scale: 1.25, opacity: 0, filter: 'brightness(0.5) blur(6px)' },
        {
          scale: 1.05,
          opacity: 1,
          filter: 'brightness(0.92) blur(0px)',
          duration: 2.2,
          ease: 'power2.out',
        },
        0
      );

      // ─── 2. Overlay wash fades in ───
      master.fromTo(
        overlayRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 1.8 },
        0.3
      );

      // ─── 3. Eyebrow pill ───
      master.fromTo(
        eyebrowRef.current,
        { y: -20, opacity: 0, scale: 0.9 },
        { y: 0, opacity: 1, scale: 1, duration: 0.8 },
        0.8
      );

      // ─── 4. Groom name — split text letter animation ───
      const groomChars = groomRef.current?.querySelectorAll('.hero-char');
      if (groomChars?.length) {
        master.fromTo(
          groomChars,
          { y: 80, opacity: 0, rotateX: -90 },
          {
            y: 0,
            opacity: 1,
            rotateX: 0,
            duration: 1,
            stagger: 0.06,
            ease: 'back.out(1.7)',
          },
          1.0
        );
      }

      // ─── 5. Ampersand — scale pop ───
      master.fromTo(
        ampersandRef.current,
        { scale: 0, opacity: 0, rotate: -180 },
        {
          scale: 1,
          opacity: 1,
          rotate: 0,
          duration: 0.9,
          ease: 'elastic.out(1, 0.5)',
        },
        1.5
      );

      // ─── 6. Bride name — split text letter animation ───
      const brideChars = brideRef.current?.querySelectorAll('.hero-char');
      if (brideChars?.length) {
        master.fromTo(
          brideChars,
          { y: 80, opacity: 0, rotateX: -90 },
          {
            y: 0,
            opacity: 1,
            rotateX: 0,
            duration: 1,
            stagger: 0.06,
            ease: 'back.out(1.7)',
          },
          1.7
        );
      }

      // ─── 7. Tagline — soft glide ───
      master.fromTo(
        subtitleRef.current,
        { y: 40, opacity: 0, filter: 'blur(4px)' },
        { y: 0, opacity: 1, filter: 'blur(0px)', duration: 1.1 },
        2.3
      );

      // ─── 8. Badges — stagger from below ───
      const badges = badgesRef.current?.children;
      if (badges?.length) {
        master.fromTo(
          badges,
          { y: 30, opacity: 0, scale: 0.95 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.8,
            stagger: 0.15,
          },
          2.7
        );
      }

      // ─── 9. Scroll indicator ───
      master.fromTo(
        scrollRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 },
        3.1
      );

      // ─── Continuous: Slow Ken Burns drift on background ───
      gsap.to(bgImageRef.current, {
        scale: 1.12,
        duration: 20,
        ease: 'none',
        repeat: -1,
        yoyo: true,
      });

      // ─── Parallax on scroll ───
      gsap.to(bgImageRef.current, {
        yPercent: 20,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });

      // Fade content as user scrolls past hero
      gsap.to(titleBlockRef.current, {
        opacity: 0,
        y: -60,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: '60% top',
          end: 'bottom top',
          scrub: true,
        },
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  // Split text into individual characters for animation
  const splitText = (text) =>
    text.split('').map((char, i) => (
      <span
        key={i}
        className="hero-char inline-block"
        style={{ perspective: '600px' }}
      >
        {char === ' ' ? '\u00A0' : char}
      </span>
    ));

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative min-h-[92vh] flex items-center justify-center px-4 sm:px-6 pt-12 pb-20 overflow-hidden text-center"
    >
      {/* Background Couple Photo with Cinematic Wash */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img
          ref={bgImageRef}
          src={INVITATION_DATA.photos.hero}
          alt="Vivek and Iswarya"
          className="w-full h-full object-cover object-center will-change-transform"
          style={{ opacity: 0 }}
        />
        {/* Multi-layered soft romantic wash overlays */}
        <div
          ref={overlayRef}
          className="absolute inset-0"
          style={{ opacity: 0 }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-[#fff8ef] via-[#fff8ef]/80 to-[#fff8ef]/40" />
          <div className="absolute inset-0 bg-radial from-transparent via-[#fff8ef]/40 to-[#fff8ef]/90" />
        </div>
      </div>

      {/* Hero Content */}
      <div
        ref={titleBlockRef}
        className="relative z-10 max-w-4xl mx-auto flex flex-col items-center"
      >
        {/* Eyebrow Pill */}
        <div
          ref={eyebrowRef}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#fffcf7]/90 border border-[#d5a24f]/40 shadow-sm mb-6 backdrop-blur-sm"
          style={{ opacity: 0 }}
        >
          <Sparkles className="w-3.5 h-3.5 text-[#d5a24f]" />
          <span className="text-xs uppercase tracking-[0.25em] font-sans font-semibold text-[#8a5d24]">
            Wedding Invitation
          </span>
          <Sparkles className="w-3.5 h-3.5 text-[#d5a24f]" />
        </div>

        {/* Couple Names */}
        <div className="mb-4">
          <h1 className="font-serif text-5xl sm:text-7xl md:text-8xl lg:text-9xl text-[#3d241c] font-bold tracking-tight leading-[0.95]">
            <span
              ref={groomRef}
              className="inline-block overflow-hidden"
              style={{ perspective: '800px' }}
            >
              {splitText(INVITATION_DATA.groom)}
            </span>
            <span
              ref={ampersandRef}
              className="block my-1 font-script text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-[#d5a24f] font-normal"
              style={{ opacity: 0 }}
            >
              &amp;
            </span>
            <span
              ref={brideRef}
              className="inline-block overflow-hidden"
              style={{ perspective: '800px' }}
            >
              {splitText(INVITATION_DATA.bride)}
            </span>
          </h1>
        </div>

        {/* Tagline */}
        <p
          ref={subtitleRef}
          className="font-serif italic text-lg sm:text-2xl md:text-3xl text-[#6a473b] font-normal max-w-xl mx-auto mb-8 leading-relaxed"
          style={{ opacity: 0 }}
        >
          "{INVITATION_DATA.tagline}"
        </p>

        {/* Date and Location Badges */}
        <div
          ref={badgesRef}
          className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 max-w-xl mx-auto mb-10"
        >
          <div
            className="glass-card flex items-center gap-2.5 px-5 py-2.5 rounded-full shadow-sm"
            style={{ opacity: 0 }}
          >
            <Calendar className="w-4 h-4 text-[#d5a24f]" />
            <span className="text-xs sm:text-sm font-sans font-medium text-[#4b3028]">
              19 &amp; 20 December 2026
            </span>
          </div>

          <a
            href="#venue"
            className="glass-card flex items-center gap-2.5 px-5 py-2.5 rounded-full shadow-sm hover:border-[#d5a24f] transition-colors"
            style={{ opacity: 0 }}
          >
            <MapPin className="w-4 h-4 text-[#d5a24f]" />
            <span className="text-xs sm:text-sm font-sans font-medium text-[#4b3028]">
              Anugraha Auditorium
            </span>
          </a>
        </div>

        {/* Scroll Indicator */}
        <div ref={scrollRef} className="pt-4 flex flex-col items-center" style={{ opacity: 0 }}>
          <a
            href="#story"
            className="group flex flex-col items-center gap-1.5 text-xs uppercase tracking-widest text-[#8a685e] hover:text-[#b38030] transition-colors"
          >
            <span>Scroll with love</span>
            <div className="w-8 h-8 rounded-full border border-[#d5a24f]/40 flex items-center justify-center group-hover:border-[#d5a24f] group-hover:translate-y-1 transition-all">
              <ChevronDown className="w-4 h-4 text-[#d5a24f] animate-bounce" />
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}
