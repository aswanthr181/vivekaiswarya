import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Sparkles, X, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';
import { INVITATION_DATA } from '../data/invitationData';

gsap.registerPlugin(ScrollTrigger);

export default function Gallery() {
  const [activePhotoIndex, setActivePhotoIndex] = useState(null);
  const photos = INVITATION_DATA.photos.gallery;
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const gridRef = useRef(null);

  useEffect(() => {
    ScrollTrigger.refresh();

    const ctx = gsap.context(() => {
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

      const photoCards = gridRef.current?.children ? Array.from(gridRef.current.children) : [];
      if (photoCards.length > 0) {
        gsap.fromTo(
          photoCards,
          {
            y: 45,
            scale: 0.92,
            opacity: 0,
          },
          {
            y: 0,
            scale: 1,
            opacity: 1,
            duration: 1,
            stagger: 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: gridRef.current,
              start: 'top 90%',
              toggleActions: 'play none none none',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const openLightbox = (index) => setActivePhotoIndex(index);
  const closeLightbox = () => setActivePhotoIndex(null);

  const nextPhoto = (e) => {
    e.stopPropagation();
    setActivePhotoIndex((prev) => (prev + 1) % photos.length);
  };

  const prevPhoto = (e) => {
    e.stopPropagation();
    setActivePhotoIndex((prev) => (prev - 1 + photos.length) % photos.length);
  };

  return (
    <section id="gallery" ref={sectionRef} className="py-20 px-4 sm:px-6 max-w-6xl mx-auto">
      <div ref={headingRef} className="text-center mb-16">
        <span className="text-xs font-sans uppercase tracking-[0.25em] text-[#b38030] font-semibold block mb-2">
          Gallery
        </span>
        <h2 className="font-serif text-3xl sm:text-5xl text-[#3d241c] font-bold">
          Frames from our little world
        </h2>
        <div className="w-20 h-0.5 bg-gradient-to-r from-transparent via-[#d5a24f] to-transparent mx-auto mt-4" />
      </div>

      {/* Gallery Grid */}
      <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {photos.map((item, index) => (
          <div
            key={item.src}
            onClick={() => openLightbox(index)}
            className="group relative rounded-2xl overflow-hidden glass-card shadow-lg border border-[#d5a24f]/30 aspect-[3/4] cursor-pointer transform-gpu transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:border-[#d5a24f]"
          >
            <img
              src={item.src}
              alt={item.caption}
              className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-700 ease-out"
              loading="lazy"
            />
            {/* Soft dark wash gradient on hover */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#2c1711]/85 via-[#2c1711]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5 text-white" />

            {/* Hover Caption */}
            <div className="absolute bottom-0 inset-x-0 p-5 transform translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
              <span className="text-[10px] uppercase tracking-widest font-sans font-semibold text-[#f8d1c7] block mb-1">
                Moment 0{index + 1}
              </span>
              <h3 className="font-serif text-xl font-bold text-white leading-tight">
                {item.caption}
              </h3>
              <p className="font-sans text-xs text-white/80 mt-1 line-clamp-2">
                {item.subtitle}
              </p>
            </div>

            {/* Hover Zoom Icon */}
            <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/25 backdrop-blur-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white">
              <Maximize2 className="w-4 h-4" />
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {activePhotoIndex !== null && (
        <div
          onClick={closeLightbox}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-lg flex items-center justify-center p-4 transition-all duration-300"
        >
          {/* Close button */}
          <button
            onClick={closeLightbox}
            className="absolute top-6 right-6 p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors z-50 cursor-pointer"
            aria-label="Close photo preview"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Prev button */}
          <button
            onClick={prevPhoto}
            className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors z-50 cursor-pointer"
            aria-label="Previous photo"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Next button */}
          <button
            onClick={nextPhoto}
            className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors z-50 cursor-pointer"
            aria-label="Next photo"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Active Image Container */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="max-w-3xl max-h-[85vh] flex flex-col items-center"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/20">
              <img
                src={photos[activePhotoIndex].src}
                alt={photos[activePhotoIndex].caption}
                className="max-h-[70vh] w-auto object-contain rounded-2xl"
              />
            </div>
            <div className="text-center mt-4 text-white">
              <h3 className="font-serif text-2xl font-bold">
                {photos[activePhotoIndex].caption}
              </h3>
              <p className="font-sans text-xs sm:text-sm text-white/70 mt-1">
                {photos[activePhotoIndex].subtitle}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
