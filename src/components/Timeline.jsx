import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Calendar, Clock, MapPin, Sparkles, PlusCircle } from 'lucide-react';
import { INVITATION_DATA } from '../data/invitationData';

gsap.registerPlugin(ScrollTrigger);

export default function Timeline() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const eventsListRef = useRef(null);

  useEffect(() => {
    // Refresh ScrollTrigger after DOM has mounted
    ScrollTrigger.refresh();

    const ctx = gsap.context(() => {
      // Header romantic fade & drift
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

      // Timeline items alternating slide-in
      const rows = eventsListRef.current?.querySelectorAll('.timeline-event-row') || [];
      rows.forEach((row, index) => {
        const card = row.querySelector('.timeline-card');
        const badge = row.querySelector('.timeline-center-badge');
        const isEven = index % 2 === 0;

        if (card) {
          gsap.fromTo(
            card,
            {
              x: isEven ? 50 : -50,
              y: 25,
              opacity: 0,
              scale: 0.96,
            },
            {
              x: 0,
              y: 0,
              opacity: 1,
              scale: 1,
              duration: 1,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: row,
                start: 'top 88%',
                toggleActions: 'play none none none',
              },
            }
          );
        }

        if (badge) {
          gsap.fromTo(
            badge,
            { scale: 0, opacity: 0, rotate: -90 },
            {
              scale: 1,
              opacity: 1,
              rotate: 0,
              duration: 0.8,
              ease: 'back.out(2)',
              scrollTrigger: {
                trigger: row,
                start: 'top 88%',
                toggleActions: 'play none none none',
              },
            }
          );
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);
  const createGoogleCalendarLink = (event) => {
    const toISOStringWithoutDashes = (iso) =>
      new Date(iso).toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');

    const start = toISOStringWithoutDashes(event.startISO);
    const end = toISOStringWithoutDashes(event.endISO);
    const title = encodeURIComponent(`${event.title} - Vivek & Iswarya`);
    const details = encodeURIComponent(
      `${event.subtitle}\n\nVenue: ${event.location}\nCouple: Vivek & Iswarya Wedding\nDress Code: ${event.dressCode}`
    );
    const location = encodeURIComponent(event.location);

    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${start}/${end}&details=${details}&location=${location}`;
  };

  return (
    <section id="timeline" ref={sectionRef} className="py-20 px-4 sm:px-6 max-w-5xl mx-auto">
      <div ref={headingRef} className="text-center mb-16">
        <span className="text-xs font-sans uppercase tracking-[0.25em] text-[#b38030] font-semibold block mb-2">
          Celebration Route
        </span>
        <h2 className="font-serif text-3xl sm:text-5xl text-[#3d241c] font-bold">
          The Moments Ahead
        </h2>
        <div className="w-20 h-0.5 bg-gradient-to-r from-transparent via-[#d5a24f] to-transparent mx-auto mt-4" />
      </div>

      <div ref={eventsListRef} className="space-y-8 relative">
        {/* Subtle center line for desktop */}
        <div className="hidden md:block absolute left-1/2 top-4 bottom-4 w-px bg-gradient-to-b from-[#d5a24f]/10 via-[#d5a24f]/40 to-[#d5a24f]/10 -translate-x-1/2" />

        {INVITATION_DATA.timeline.map((event, index) => {
          const isEven = index % 2 === 0;
          return (
            <div
              key={event.id}
              className={`timeline-event-row relative flex flex-col md:flex-row items-center gap-6 ${
                isEven ? 'md:flex-row-reverse' : ''
              }`}
            >
              {/* Timeline Center Badge on Desktop */}
              <div className="timeline-center-badge hidden md:flex absolute left-1/2 -translate-x-1/2 w-9 h-9 rounded-full bg-[#fffaf3] border-2 border-[#d5a24f] shadow-md items-center justify-center z-10">
                <Sparkles className="w-4 h-4 text-[#d5a24f]" />
              </div>

              {/* Event Card */}
              <div
                className={`timeline-card w-full md:w-[calc(50%-2rem)] glass-card rounded-3xl p-6 sm:p-8 shadow-xl transition-all duration-300 hover:-translate-y-1 ${
                  event.featured
                    ? 'border-2 border-[#d5a24f] bg-gradient-to-br from-[#fffdfa] via-[#fff8ef] to-[#fcefe3] ring-4 ring-[#d5a24f]/15'
                    : 'border border-[#d5a24f]/30'
                }`}
              >
                {/* Featured Badge */}
                {event.featured && (
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#d5a24f] text-white text-[11px] font-sans font-semibold tracking-wider uppercase mb-3 shadow-sm">
                    <Sparkles className="w-3 h-3" />
                    <span>The Sacred Muhurtham</span>
                  </div>
                )}

                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-xs uppercase tracking-widest font-sans font-bold text-[#b38030]">
                    {event.date}
                  </span>
                  <div className="flex items-center gap-1.5 text-xs text-[#735146] font-medium">
                    <Clock className="w-3.5 h-3.5 text-[#d5a24f]" />
                    <span>{event.time}</span>
                  </div>
                </div>

                <h3 className="font-serif text-2xl sm:text-3xl text-[#3d241c] font-bold mb-2">
                  {event.title}
                </h3>

                <p className="font-serif italic text-sm text-[#735146] mb-4">
                  {event.subtitle}
                </p>

                <div className="space-y-2 mb-6 text-xs text-[#5c3e34] border-t border-[#d5a24f]/20 pt-3">
                  <div className="flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-[#d5a24f] shrink-0 mt-0.5" />
                    <span>{event.location}</span>
                  </div>
                  
                </div>

                {/* Actions: Map & Calendar */}
                <div className="flex flex-col sm:flex-row items-center gap-2">
                  {event.mapLink && (
                    <a
                      href={event.mapLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-1.5 w-full sm:flex-1 py-2.5 px-3 rounded-xl text-xs font-semibold tracking-wide border border-[#d5a24f]/40 bg-[#fffdf8] text-[#5c3e34] hover:border-[#d5a24f] hover:bg-[#fff7ec] transition-all shadow-sm"
                    >
                      <MapPin className="w-3.5 h-3.5 text-[#d5a24f]" />
                      <span>Open Map</span>
                    </a>
                  )}

                  <a
                    href={createGoogleCalendarLink(event)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-1.5 w-full sm:flex-1 py-2.5 px-3 rounded-xl text-xs font-semibold tracking-wide bg-[#d5a24f] text-white hover:bg-[#b88534] transition-all shadow-sm"
                  >
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Add to Calendar</span>
                  </a>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
