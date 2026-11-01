import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Heart, Phone, Share2, ArrowUp, Sparkles, Check, MessageCircle } from 'lucide-react';
import ShareModal from './ShareModal';
import { INVITATION_DATA } from '../data/invitationData';

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const footerRef = useRef(null);
  const noteRef = useRef(null);
  const contactsRef = useRef(null);
  const actionsRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Closing note romantic drift
      gsap.fromTo(
        noteRef.current,
        { y: -20, opacity: 0 },
        {
          scrollTrigger: { trigger: noteRef.current, start: 'top 95%', toggleActions: 'play none none none' },
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
        }
      );

      // Contact cards staggered reveal
      const contactCards = contactsRef.current?.children ? Array.from(contactsRef.current.children) : [];
      if (contactCards.length) {
        gsap.fromTo(
          contactCards,
          { y: 30, opacity: 0, scale: 0.95 },
          {
            scrollTrigger: { trigger: contactsRef.current, start: 'top 95%', toggleActions: 'play none none none' },
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.8,
            stagger: 0.15,
            ease: 'power2.out',
          }
        );
      }

      // Actions buttons fade in
      gsap.fromTo(
        actionsRef.current,
        { y: 20, opacity: 0 },
        {
          scrollTrigger: { trigger: actionsRef.current, start: 'top 98%', toggleActions: 'play none none none' },
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
        }
      );
    }, footerRef);

    return () => ctx.revert();
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer ref={footerRef} className="pt-20 pb-16 px-4 sm:px-6 bg-gradient-to-b from-transparent via-[#fff5eb]/80 to-[#f9ede0] border-t border-[#d5a24f]/20">
      <div className="max-w-4xl mx-auto text-center">
        {/* Closing Note */}
        <div ref={noteRef} className="mb-14">
          <span className="text-xs font-sans uppercase tracking-[0.25em] text-[#b38030] font-semibold block mb-2">
            With Love
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl text-[#3d241c] font-bold mb-4">
            See You There
          </h2>
          <p className="font-serif italic text-base sm:text-xl text-[#6a473b] max-w-xl mx-auto leading-relaxed">
            "{INVITATION_DATA.closingNote}"
          </p>
          <div className="font-script text-4xl sm:text-5xl text-[#d5a24f] mt-4">
            Vivek &amp; Aiswarya
          </div>
        </div>

        {/* Contact Support Cards */}
        <div className="mb-14">
          <h3 className="text-xs uppercase tracking-widest font-sans font-bold text-[#8a685e] mb-6">
            Need assistance or travel directions?
          </h3>
          <div ref={contactsRef} className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-xl mx-auto">
            {INVITATION_DATA.contacts
              .filter((c) => c.phone && c.phone.trim())
              .map((c) => {
                const cleanPhone = c.phone.replace(/\s+/g, '');
                const cleanWhatsApp = (c.whatsapp || cleanPhone).replace(/[^0-9]/g, '');

                return (
                  <div
                    key={c.role}
                    className="glass-card rounded-2xl p-5 border border-[#d5a24f]/30 flex flex-col items-center justify-between shadow-sm hover:border-[#d5a24f] transition-all"
                  >
                    <span className="text-[11px] font-sans uppercase tracking-wider text-[#b38030] font-semibold mb-1">
                      {c.role}
                    </span>
                    <span className="font-serif font-bold text-base text-[#3d241c] mb-1">
                      {c.name || 'Family Contact'}
                    </span>
                    <span className="text-xs font-sans text-[#6a473b] mb-3">
                      {c.phone}
                    </span>

                    {/* Both Call & WhatsApp Redirects */}
                    <div className="flex items-center gap-2 w-full justify-center">
                      <a
                        href={`tel:${cleanPhone}`}
                        className="inline-flex items-center justify-center gap-1.5 flex-1 px-3 py-2 rounded-full bg-[#d5a24f]/15 hover:bg-[#d5a24f] text-[#5c3e34] hover:text-white transition-all text-xs font-sans font-medium"
                        title={`Call ${c.name || c.role}`}
                      >
                        <Phone className="w-3.5 h-3.5" />
                        <span>Call</span>
                      </a>

                      <a
                        href={`https://wa.me/${cleanWhatsApp}?text=${encodeURIComponent(
                          `Hi ${c.name || ''}, I have a query regarding Vivek & Aiswarya's wedding.`
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-1.5 flex-1 px-3 py-2 rounded-full bg-[#25D366]/15 hover:bg-[#25D366] text-[#1b7e3e] hover:text-white transition-all text-xs font-sans font-medium border border-[#25D366]/30 hover:border-[#25D366]"
                        title={`Chat on WhatsApp with ${c.name || c.role}`}
                      >
                        <MessageCircle className="w-3.5 h-3.5" />
                        <span>WhatsApp</span>
                      </a>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>

        {/* Share & Back To Top Actions */}
        <div ref={actionsRef} className="flex flex-wrap items-center justify-center gap-4 pt-6 border-t border-[#d5a24f]/25 max-w-md mx-auto">
          {/* Share Invitation Button -> Opens ShareModal */}
          <button
            type="button"
            onClick={() => setIsShareModalOpen(true)}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#fffaf3] border border-[#d5a24f]/40 hover:border-[#d5a24f] hover:bg-[#fff6e6] text-xs font-sans font-semibold text-[#5c3e34] shadow-sm transition-all cursor-pointer"
          >
            <Share2 className="w-3.5 h-3.5 text-[#d5a24f]" />
            <span>Share Invitation</span>
          </button>

          {/* Back to Top */}
          <button
            type="button"
            onClick={scrollToTop}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#fffaf3] border border-[#d5a24f]/40 hover:border-[#d5a24f] hover:bg-[#fff6e6] text-xs font-sans font-semibold text-[#5c3e34] shadow-sm transition-all cursor-pointer"
          >
            <ArrowUp className="w-3.5 h-3.5 text-[#d5a24f]" />
            <span>Back to Top</span>
          </button>
        </div>

        <p className="text-[11px] font-sans text-[#8a685e]/80 mt-10">
          Created with endless love for Vivek &amp; Aiswarya's Wedding • 20 December 2026
        </p>
      </div>

      {/* Share Modal Dialog */}
      <ShareModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
      />
    </footer>
  );
}
