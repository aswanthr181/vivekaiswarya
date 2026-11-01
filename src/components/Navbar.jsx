import React, { useState, useEffect } from 'react';
import { Heart, Menu, X, Calendar, MapPin, Sparkles, Image, MessageCircleHeart } from 'lucide-react';
import { INVITATION_DATA } from '../data/invitationData';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 120);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Our Story', href: '#story' },
    { name: 'Save The Date', href: '#date-reveal' },
    { name: 'Countdown', href: '#countdown' },
    { name: 'Events', href: '#timeline' },
    { name: 'Venue', href: '#venue' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'Wishes', href: '#wishes' },
  ];

  return (
    <header className="sticky top-0 z-30 w-full transition-all duration-300">
      <div
        className={`w-full transition-all duration-300 ${
          isScrolled
            ? 'bg-[#fffaf3]/90 backdrop-blur-md border-b border-[#d5a24f]/25 shadow-sm py-2.5'
            : 'bg-transparent py-4'
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between">
          {/* Logo / Couple monogram */}
          <a
            href="#hero"
            className="group flex items-center gap-2 text-[#4b3028] hover:text-[#b38030] transition-colors"
          >
            <span className="font-serif text-xl sm:text-2xl font-bold tracking-tight">
              V <span className="font-script text-2xl sm:text-3xl text-[#d5a24f] font-normal">&</span> A
            </span>
            <span className="text-xs uppercase tracking-widest text-[#8a685e] hidden md:inline font-sans border-l border-[#d5a24f]/40 pl-2">
              20.12.2026
            </span>
          </a>

          {/* Desktop Nav Items */}
          <nav className="hidden lg:flex items-center gap-1 sm:gap-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="px-3 py-1.5 rounded-full text-xs sm:text-sm font-sans tracking-wide text-[#5c3e34] hover:text-[#b38030] hover:bg-[#d5a24f]/10 transition-all duration-200"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Quick CTA */}
          <div className="flex items-center gap-2">
            <a
              href="#wishes"
              className="gold-button hidden sm:flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase"
            >
              <Heart className="w-3.5 h-3.5 fill-white" />
              <span>Blessings</span>
            </a>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-full text-[#4b3028] hover:bg-[#d5a24f]/10 transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden px-4 pt-2 pb-4 bg-[#fffaf3]/98 backdrop-blur-xl border-b border-[#d5a24f]/30 shadow-lg">
            <div className="grid grid-cols-2 gap-2 pt-2">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3 py-2 rounded-lg text-sm font-sans text-[#5c3e34] hover:text-[#b38030] hover:bg-[#d5a24f]/15 transition-colors"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
