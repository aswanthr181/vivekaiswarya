import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MapPin, Navigation, Copy, Check, ExternalLink, Heart, Clock, Sparkles, Calendar } from 'lucide-react';
import { INVITATION_DATA } from '../data/invitationData';

gsap.registerPlugin(ScrollTrigger);

export default function Venue() {
  const [copiedId, setCopiedId] = useState(null);
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const cardsRef = useRef(null);

  useEffect(() => {
    ScrollTrigger.refresh();

    const ctx = gsap.context(() => {
      // Header animation
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

      // Cards staggered entry from left and right
      const venueCards = cardsRef.current?.children ? Array.from(cardsRef.current.children) : [];
      venueCards.forEach((card, idx) => {
        gsap.fromTo(
          card,
          {
            x: idx % 2 === 0 ? -40 : 40,
            y: 30,
            opacity: 0,
          },
          {
            x: 0,
            y: 0,
            opacity: 1,
            duration: 1.1,
            ease: 'power3.out',
            delay: idx * 0.15,
            scrollTrigger: {
              trigger: card,
              start: 'top 88%',
              toggleActions: 'play none none none',
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleCopy = (id, text) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  return (
    <section id="venue" ref={sectionRef} className="py-20 px-4 sm:px-6 max-w-6xl mx-auto">
      <div ref={headingRef} className="text-center mb-16">
        <span className="text-xs font-sans uppercase tracking-[0.25em] text-[#b38030] font-semibold block mb-2">
          Venues &amp; Directions
        </span>
        <h2 className="font-serif text-3xl sm:text-5xl text-[#3d241c] font-bold">
          Meet us at Our Celebrations
        </h2>
        <p className="font-serif italic text-base sm:text-lg text-[#6a473b] mt-2 max-w-lg mx-auto">
          We eagerly look forward to welcoming you at both auspicious destinations
        </p>
        <div className="w-20 h-0.5 bg-gradient-to-r from-transparent via-[#d5a24f] to-transparent mx-auto mt-4" />
      </div>

      {/* Dual Venues Grid */}
      <div ref={cardsRef} className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {INVITATION_DATA.venues.map((v) => (
          <div
            key={v.id}
            className={`glass-card rounded-3xl p-6 sm:p-8 shadow-xl border flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 ${
              v.id === 'anugraha' || v.id === 'marriage'
                ? 'border-[#d5a24f] bg-gradient-to-br from-[#fffdfa] via-[#fff8ef] to-[#fcefe3] ring-2 ring-[#d5a24f]/20'
                : 'border-[#d5a24f]/35 bg-gradient-to-br from-[#fffdf8] via-[#fffaf4] to-[#faeee3]'
            }`}
          >
            <div>
              {/* Badge & Occasions Count */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-3">
                <span
                  className={`inline-flex items-center justify-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-sans font-bold tracking-wider uppercase shadow-sm ${
                    v.id === 'anugraha' || v.id === 'marriage'
                      ? 'bg-[#d5a24f] text-white'
                      : 'bg-[#5c3e34] text-[#ffeed8]'
                  }`}
                >
                  <Sparkles className="w-3 h-3" />
                  <span>{v.tag || v.badge}</span>
                </span>

                <span className="text-[11px] font-sans font-semibold text-[#8a5d24] bg-[#fffaf3] px-3 py-1 rounded-full border border-[#d5a24f]/25 self-start sm:self-auto">
                  {v.occasions?.length > 1 ? `${v.occasions.length} Occasions` : '1 Occasion'}
                </span>
              </div>

              {/* Venue Name */}
              <h3 className="font-serif text-2xl sm:text-3xl text-[#3d241c] font-bold mb-2">
                {v.name}
              </h3>

              <p className="font-sans text-xs sm:text-sm text-[#735146] mb-4 leading-relaxed">
                {v.description}
              </p>

              {/* Occasions with Timestamps list on the SAME venue card */}
              <div className="space-y-2.5 mb-6">
                <span className="text-[11px] uppercase tracking-wider font-sans font-bold text-[#b38030] block">
                  {v.occasions?.length > 1 ? 'Occasions at this venue:' : 'Occasion at this venue:'}
                </span>
                {v.occasions?.map((occ) => (
                  <div
                    key={occ.id}
                    className={`p-3.5 rounded-2xl border transition-all ${
                      occ.id === 'marriage'
                        ? 'bg-[#fffaf2] border-[#d5a24f]/40 shadow-xs'
                        : occ.id === 'bride-reception'
                        ? 'bg-[#fff7f4] border-[#f4b8aa]/60 shadow-xs'
                        : 'bg-[#fffaf4] border-[#d5a24f]/30 shadow-xs'
                    }`}
                  >
                    <div className="flex flex-wrap items-center justify-between gap-1.5 mb-1.5">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-sans font-bold tracking-wider uppercase shadow-xs ${
                          occ.id === 'marriage'
                            ? 'bg-[#d5a24f] text-white'
                            : occ.id === 'bride-reception'
                            ? 'bg-[#b34055] text-white'
                            : 'bg-[#5c3e34] text-[#ffeed8]'
                        }`}
                      >
                        <Sparkles className="w-2.5 h-2.5" />
                        <span>{occ.badge}</span>
                      </span>

                      <div className="flex items-center gap-1.5 text-xs font-semibold text-[#8a5d24] bg-[#fffdf8] px-2.5 py-0.5 rounded-full border border-[#d5a24f]/25">
                        <Clock className="w-3.5 h-3.5 text-[#d5a24f]" />
                        <span>{occ.time}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-xs text-[#5c3e34] font-medium pt-0.5">
                      <div className="flex items-center gap-1.5 text-xs text-[#6a473b]">
                        <Calendar className="w-3.5 h-3.5 text-[#d5a24f] shrink-0" />
                        <span className="font-semibold text-[#3d241c]">{occ.date}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Beautiful Romantic Map Card Blended with UI */}
              <div className="w-full h-[220px] rounded-2xl overflow-hidden border-2 border-[#d5a24f]/35 shadow-md mb-6 relative group bg-[#fbf6ee]">
                {/* Paper Texture & Sepia-Toned Warm Map Background */}
                <div className="absolute inset-0 overflow-hidden">
                  <iframe
                    title={`${v.name} Map`}
                    width="100%"
                    height="100%"
                    className="w-full h-full scale-105 pointer-events-none transition-transform duration-700 group-hover:scale-110"
                    style={{
                      border: 0,
                      filter: 'sepia(45%) hue-rotate(345deg) saturate(120%) contrast(92%) brightness(98%)',
                      opacity: 0.88,
                    }}
                    loading="lazy"
                    tabIndex="-1"
                    src={`https://maps.google.com/maps?q=${encodeURIComponent(
                      v.embedQuery
                    )}&t=&z=14&ie=UTF8&iwloc=&output=embed`}
                  />
                  {/* Elegant warm golden parchment tint & soft vignette */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#fcf7f0]/90 via-[#fcf7f0]/30 to-[#fdfaf5]/70 pointer-events-none" />
                  <div className="absolute inset-0 ring-1 ring-inset ring-[#d5a24f]/30 rounded-2xl pointer-events-none" />
                </div>

                {/* Blended Destination Overlay Badge */}
                <div className="absolute top-3 left-3 z-10 flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#fffdf9]/90 backdrop-blur-md border border-[#d5a24f]/40 shadow-sm pointer-events-none">
                  <span className="w-2 h-2 rounded-full bg-[#d5a24f] animate-ping" />
                  <span className="text-[11px] font-sans font-semibold text-[#6a473b]">
                    {v.id === 'anugraha' || v.id === 'marriage'
                      ? "Ceremony & Bride's Reception Destination"
                      : 'Reception Destination'}
                  </span>
                </div>

                {/* Floating Romantic Center Location Pin */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
                  <div className="flex flex-col items-center transform -translate-y-2 group-hover:-translate-y-4 transition-transform duration-300">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-[#8a5d24] via-[#d5a24f] to-[#f4b8aa] p-0.5 shadow-xl flex items-center justify-center">
                      <div className="w-full h-full rounded-full bg-[#fffaf3] flex items-center justify-center">
                        <MapPin className="w-5 h-5 text-[#8a5d24] fill-[#d5a24f]/30" />
                      </div>
                    </div>
                    <div className="w-3 h-1.5 rounded-full bg-[#8a5d24]/30 blur-[1px] mt-1" />
                  </div>
                </div>

                {/* Clickable Action Banner */}
                <a
                  href={v.mapLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute inset-0 z-20 flex items-end justify-between p-3.5 bg-gradient-to-t from-[#2c1711]/60 via-transparent to-transparent opacity-90 group-hover:opacity-100 transition-opacity"
                >
                  <div className="text-left text-white drop-shadow-sm">
                    <span className="text-[11px] font-sans font-medium text-[#ffd88a] block">
                      Tap to open in Google Maps
                    </span>
                    <span className="font-serif text-sm font-bold line-clamp-1">
                      {v.name}
                    </span>
                  </div>

                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#fffdf9]/95 text-[#6a473b] hover:bg-[#d5a24f] hover:text-white transition-all text-xs font-sans font-semibold shadow-md">
                    <span>Directions</span>
                    <ExternalLink className="w-3 h-3" />
                  </span>
                </a>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-3 border-t border-[#d5a24f]/20">
              <a
                href={v.mapLink}
                target="_blank"
                rel="noopener noreferrer"
                className="gold-button flex-1 py-3 px-4 rounded-full text-xs sm:text-sm font-semibold tracking-wide flex items-center justify-center gap-2"
              >
                <Navigation className="w-4 h-4" />
                <span>Get Directions</span>
              </a>

              <button
                onClick={() => handleCopy(v.id, v.name)}
                className="px-4 py-3 rounded-full text-xs font-sans font-medium text-[#5c3e34] bg-[#fffaf3] border border-[#d5a24f]/40 hover:border-[#d5a24f] shadow-sm transition-all flex items-center gap-1.5 cursor-pointer"
              >
                {copiedId === v.id ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="text-emerald-700 font-semibold">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-[#d5a24f]" />
                    <span>Copy Name</span>
                  </>
                )}
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
