import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Heart, Sparkles } from 'lucide-react';
import { INVITATION_DATA } from '../data/invitationData';

gsap.registerPlugin(ScrollTrigger);

export default function Story() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const photoRef = useRef(null);
  const textBlockRef = useRef(null);
  const sigRef = useRef(null);

  useEffect(() => {
    ScrollTrigger.refresh();

    const ctx = gsap.context(() => {
      // Section heading — drift in from top
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

      // Photo — slide in from left
      if (photoRef.current) {
        gsap.fromTo(
          photoRef.current,
          { x: -50, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 1.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: photoRef.current,
              start: 'top 88%',
              toggleActions: 'play none none none',
            },
          }
        );
      }

      // Text block children — stagger cascade from right
      if (textBlockRef.current?.children?.length) {
        gsap.fromTo(
          textBlockRef.current.children,
          { x: 40, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.9,
            stagger: 0.12,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: textBlockRef.current,
              start: 'top 88%',
              toggleActions: 'play none none none',
            },
          }
        );
      }

      // Signature — scale up from below
      if (sigRef.current) {
        gsap.fromTo(
          sigRef.current,
          { y: 25, opacity: 0, scale: 0.94 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 1,
            ease: 'back.out(1.5)',
            delay: 0.2,
            scrollTrigger: {
              trigger: sigRef.current,
              start: 'top 92%',
              toggleActions: 'play none none none',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="story" ref={sectionRef} className="py-20 px-4 sm:px-6 max-w-5xl mx-auto">
      {/* Intro Heading */}
      <div ref={headingRef} className="text-center mb-16">
        <span className="text-xs font-sans uppercase tracking-[0.25em] text-[#b38030] font-semibold block mb-2">
          From Our Hearts
        </span>
        <h2 className="font-serif text-3xl sm:text-5xl text-[#3d241c] font-bold max-w-2xl mx-auto leading-tight">
          A quiet forever, beautifully begun.
        </h2>
        <div className="w-20 h-0.5 bg-gradient-to-r from-transparent via-[#d5a24f] to-transparent mx-auto mt-4" />
      </div>

      {/* Couple Card Feature Layout */}
      <div className="glass-card rounded-3xl p-6 sm:p-10 lg:p-12 shadow-xl border border-[#d5a24f]/30 grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* Photo with double gold frame & corner accents */}
        <div ref={photoRef} className="md:col-span-5 relative group">
          <div className="absolute -inset-2 rounded-2xl bg-gradient-to-tr from-[#eed095] via-[#f7d1c7] to-[#d5a24f] opacity-50 blur-sm group-hover:opacity-80 transition-opacity" />
          <div className="relative rounded-2xl overflow-hidden border-2 border-[#fffcf7] shadow-lg aspect-[3/4]">
            <img
              src={INVITATION_DATA.photos.story}
              alt="Vivek and Iswarya"
              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#3d241c]/50 via-transparent to-transparent opacity-60" />
            <div className="absolute bottom-4 left-4 right-4 text-center">
              <span className="inline-block px-3 py-1 rounded-full bg-[#fffcf7]/90 text-[11px] font-sans font-semibold text-[#8a5d24] shadow-sm">
                Forever In Love
              </span>
            </div>
          </div>
        </div>

        {/* Story Text */}
        <div ref={textBlockRef} className="md:col-span-7 flex flex-col justify-center text-left">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="text-xs uppercase tracking-widest font-sans font-bold text-[#b38030]">
              Vivek &amp; Iswarya
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#d5a24f]" />
            <span className="text-xs text-[#8a685e] font-sans">Our Journey</span>
          </div>

          <h3 className="font-serif text-2xl sm:text-4xl text-[#3d241c] font-bold mb-5 leading-snug">
            A little love, a lot of forever.
          </h3>

          <p className="font-serif italic text-base sm:text-lg text-[#614339] leading-relaxed mb-4">
            "A thousand little moments, shared smiles, quiet coffee conversations, and walking together through life's sweetest paths have brought us to this joyous threshold."
          </p>

          <p className="font-sans text-xs sm:text-sm text-[#735146] font-light leading-relaxed mb-6">
            We are stepping into this sacred union hand in hand, surrounded by the blessings of our parents and loved ones. Having your presence and warm wishes on our wedding day will make our celebration truly complete and unforgettable.
          </p>

          {/* Couple Signatures / Seal */}
          <div ref={sigRef} className="pt-4 border-t border-[#d5a24f]/25 flex items-center justify-between">
            <div className="flex flex-col">
              <span className="font-script text-3xl sm:text-4xl text-[#b38030]">
                Vivek &amp; Iswarya
              </span>
              <span className="text-[11px] font-sans uppercase tracking-widest text-[#8a685e]">
                December 20, 2026
              </span>
            </div>

            <div className="w-12 h-12 rounded-full bg-[#fff5eb] border border-[#d5a24f]/50 flex items-center justify-center shadow-sm">
              <Heart className="w-6 h-6 text-[#d5a24f] fill-[#d5a24f]/30" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
