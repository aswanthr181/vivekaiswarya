import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Heart, Send, MessageCircle, Sparkles, User } from 'lucide-react';
import { INVITATION_DATA } from '../data/invitationData';

gsap.registerPlugin(ScrollTrigger);

export default function Wishes() {
  const [wishes, setWishes] = useState([]);
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const formCardRef = useRef(null);
  const wishesGridRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading reveal
      gsap.from(headingRef.current, {
        scrollTrigger: { trigger: headingRef.current, start: 'top 85%', toggleActions: 'play none none none' },
        y: -40,
        opacity: 0,
        duration: 1.2,
        ease: 'power3.out',
      });

      // Form card soft lift
      gsap.from(formCardRef.current, {
        scrollTrigger: { trigger: formCardRef.current, start: 'top 85%', toggleActions: 'play none none none' },
        y: 50,
        scale: 0.96,
        opacity: 0,
        duration: 1.1,
        ease: 'power3.out',
      });

      // Existing wish bubbles staggered pop
      const bubbles = wishesGridRef.current?.children ? Array.from(wishesGridRef.current.children) : [];
      if (bubbles.length > 0) {
        gsap.from(bubbles, {
          scrollTrigger: { trigger: wishesGridRef.current, start: 'top 85%', toggleActions: 'play none none none' },
          y: 40,
          scale: 0.9,
          opacity: 0,
          duration: 0.9,
          stagger: 0.12,
          ease: 'back.out(1.5)',
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [wishes.length]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('vvk_aya_wishes');
      if (stored) {
        setWishes(JSON.parse(stored));
      } else {
        setWishes(INVITATION_DATA.initialWishes);
      }
    } catch {
      setWishes(INVITATION_DATA.initialWishes);
    }
  }, []);

  const handleAddWish = (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    setIsSubmitting(true);
    const colorOptions = ['rose', 'champagne', 'sage', 'peach'];
    const randomColor = colorOptions[Math.floor(Math.random() * colorOptions.length)];

    const newWish = {
      id: Date.now().toString(),
      name: name.trim() || 'A Warm Well-Wisher',
      message: message.trim(),
      time: 'Just now',
      color: randomColor,
    };

    const updated = [newWish, ...wishes];
    setWishes(updated);
    try {
      localStorage.setItem('vvk_aya_wishes', JSON.stringify(updated));
    } catch (err) {
      console.warn('Failed to save to local storage', err);
    }

    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.8 },
      colors: ['#d5a24f', '#f4b8aa', '#ffd88a'],
    });

    setMessage('');
    setName('');
    setIsSubmitting(false);
  };

  const getWhatsAppLink = () => {
    const text = encodeURIComponent(
      `Hearty congratulations Vivek & Iswarya on your wedding! 💍✨\n\n"${
        message.trim() || 'Wishing you both a lifetime of love and happiness!'
      }"\n— ${name.trim() || 'Well wisher'}`
    );
    return `https://wa.me/${INVITATION_DATA.coupleWhatsApp}?text=${text}`;
  };

  const getBubbleStyle = (color) => {
    switch (color) {
      case 'rose':
        return 'bg-gradient-to-br from-[#fff2f0] to-[#ffe5e1] border-[#f4b8aa]/60 text-[#542d25]';
      case 'champagne':
        return 'bg-gradient-to-br from-[#fffcf2] to-[#fff3d4] border-[#d5a24f]/40 text-[#4c341b]';
      case 'sage':
        return 'bg-gradient-to-br from-[#f5f9f2] to-[#e4eed9] border-[#879b76]/50 text-[#304423]';
      case 'peach':
      default:
        return 'bg-gradient-to-br from-[#fff8f2] to-[#fcebe0] border-[#e7a9bf]/40 text-[#52332a]';
    }
  };

  return (
    <section id="wishes" ref={sectionRef} className="py-20 px-4 sm:px-6 max-w-5xl mx-auto">
      <div ref={headingRef} className="text-center mb-16">
        <span className="text-xs font-sans uppercase tracking-[0.25em] text-[#b38030] font-semibold block mb-2">
          Blessings &amp; Wishes
        </span>
        <h2 className="font-serif text-3xl sm:text-5xl text-[#3d241c] font-bold">
          Drop a little love note
        </h2>
        <p className="font-serif italic text-base sm:text-lg text-[#6a473b] mt-2">
          Your warm wishes make our special day even more radiant
        </p>
        <div className="w-20 h-0.5 bg-gradient-to-r from-transparent via-[#d5a24f] to-transparent mx-auto mt-4" />
      </div>

      {/* Wish Form Card */}
      <div ref={formCardRef} className="glass-card rounded-3xl p-6 sm:p-10 shadow-xl border border-[#d5a24f]/30 max-w-2xl mx-auto mb-16">
        <form onSubmit={handleAddWish} className="space-y-4">
          <div>
            <label className="block text-xs uppercase tracking-wider font-sans font-semibold text-[#614339] mb-1.5">
              Your Name
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-[#d5a24f] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Rahul &amp; Priya"
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#fffcf7] border border-[#d5a24f]/30 focus:border-[#d5a24f] focus:outline-none focus:ring-2 focus:ring-[#d5a24f]/20 text-sm text-[#3d241c] placeholder:text-[#8a685e]/60 transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider font-sans font-semibold text-[#614339] mb-1.5">
              Your Blessing or Warm Wish
            </label>
            <textarea
              required
              rows={3}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Write a sweet blessing for Vivek &amp; Iswarya..."
              className="w-full p-4 rounded-xl bg-[#fffcf7] border border-[#d5a24f]/30 focus:border-[#d5a24f] focus:outline-none focus:ring-2 focus:ring-[#d5a24f]/20 text-sm text-[#3d241c] placeholder:text-[#8a685e]/60 transition-all resize-none"
            />
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
            <button
              type="submit"
              disabled={isSubmitting || !message.trim()}
              className="gold-button w-full sm:flex-1 py-3 px-6 rounded-full font-serif text-base font-semibold tracking-wide flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              <Send className="w-4 h-4" />
              <span>Leave Blessing</span>
            </button>

            <a
              href={getWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-full text-xs sm:text-sm font-semibold tracking-wide bg-[#25D366] text-white hover:bg-[#1fb355] transition-colors shadow-sm"
            >
              <MessageCircle className="w-4 h-4 fill-white text-[#25D366]" />
              <span>Send via WhatsApp</span>
            </a>
          </div>
        </form>
      </div>

      {/* Wishes Wall Bubble Grid */}
      <div ref={wishesGridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {wishes.map((item) => (
          <div
            key={item.id}
            className={`rounded-2xl p-6 shadow-md border flex flex-col justify-between transition-transform duration-300 hover:-translate-y-1 ${getBubbleStyle(
              item.color
            )}`}
          >
            <div className="mb-4">
              <div className="flex items-center justify-between mb-3">
                <span className="font-serif font-bold text-base text-[#3d241c]">
                  {item.name}
                </span>
                <Heart className="w-4 h-4 text-[#d5a24f] fill-[#d5a24f]/30" />
              </div>
              <p className="font-serif italic text-sm leading-relaxed text-[#4b3028]">
                "{item.message}"
              </p>
            </div>
            <div className="flex items-center justify-between pt-3 border-t border-black/5 text-[11px] font-sans opacity-70">
              <span>{item.time}</span>
              <span className="flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-[#d5a24f]" />
                Blessing
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
