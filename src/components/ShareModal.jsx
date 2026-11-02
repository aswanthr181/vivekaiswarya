import React, { useState, useEffect } from 'react';
import { X, Copy, Check, Sparkles, MessageCircle, Send, Mail, Share2, ExternalLink } from 'lucide-react';
import { INVITATION_DATA } from '../data/invitationData';

export default function ShareModal({ isOpen, onClose }) {
  const [copied, setCopied] = useState(false);
  const [currentUrl, setCurrentUrl] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setCurrentUrl(window.location.href);
    }
  }, []);

  if (!isOpen) return null;

  const shareTitle = `${INVITATION_DATA.couple} | Wedding Invitation`;
  const shareText = `You're warmly invited to celebrate the wedding of ${INVITATION_DATA.couple} on 20 December 2026! 💍✨\n\nMarriage: Anugraha Auditorium (Muhoortham 11:58 AM – 12:10 PM)\nReception: SOWBHAGYA AC CONVENTION CENTER (From 4:30 PM)\n\nView the wedding invitation card: ${currentUrl}`;
  const shareSubject = `Wedding Invitation - ${INVITATION_DATA.couple}`;
  const shareEmailBody = `Dear Family & Friends,\n\nYou are warmly invited to celebrate the beginning of forever with ${INVITATION_DATA.couple}!\n\nDate: Sunday, 20 December 2026\nMarriage (Muhoortham): 11:58 AM to 12:10 PM at Anugraha Auditorium\nWedding Reception: From 4:30 PM onwards at SOWBHAGYA AC CONVENTION CENTER\n\nPlease explore our online wedding invitation:\n${currentUrl}\n\nWith love,\nVivek & Iswarya`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(currentUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: shareTitle,
          text: `You're invited to Vivek & Iswarya's Wedding on 20 December 2026! 💍✨`,
          url: currentUrl,
        });
      } catch (err) {
        // User cancelled or share dismissed
      }
    } else {
      handleCopyLink();
    }
  };

  const shareChannels = [
    {
      name: 'WhatsApp',
      icon: MessageCircle,
      color: 'bg-[#25D366] hover:bg-[#20ba5a] text-white',
      badge: 'Most Popular',
      url: `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText)}`,
    },
    {
      name: 'Telegram',
      icon: Send,
      color: 'bg-[#229ED9] hover:bg-[#1d8bc0] text-white',
      url: `https://t.me/share/url?url=${encodeURIComponent(currentUrl)}&text=${encodeURIComponent(`Wedding Invitation - ${INVITATION_DATA.couple} (20 Dec 2026)`)}`,
    },
    {
      name: 'Facebook',
      icon: ExternalLink,
      color: 'bg-[#1877F2] hover:bg-[#1465cf] text-white',
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`,
    },
    {
      name: 'X (Twitter)',
      icon: Share2,
      color: 'bg-[#0f1419] hover:bg-black text-white',
      url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(`Celebrating the wedding of ${INVITATION_DATA.couple}! 💍✨`)}&url=${encodeURIComponent(currentUrl)}`,
    },
    {
      name: 'Email',
      icon: Mail,
      color: 'bg-[#c27845] hover:bg-[#a96333] text-white',
      url: `mailto:?subject=${encodeURIComponent(shareSubject)}&body=${encodeURIComponent(shareEmailBody)}`,
    },
  ];

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-md animate-[fadeIn_0.25s_ease-out]"
      role="dialog"
      aria-modal="true"
      aria-labelledby="share-modal-title"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-md rounded-3xl glass-card p-6 sm:p-8 border-2 border-[#d5a24f]/40 shadow-2xl bg-gradient-to-br from-[#fffdfa] via-[#fff8ef] to-[#fcefe2] text-center"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full text-[#8a685e] hover:text-[#3d241c] hover:bg-[#d5a24f]/15 transition-colors cursor-pointer"
          aria-label="Close share dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex flex-col items-center mb-6">
          <div className="w-12 h-12 rounded-full bg-[#d5a24f]/15 border border-[#d5a24f]/35 flex items-center justify-center text-[#d5a24f] mb-3 shadow-inner">
            <Share2 className="w-6 h-6" />
          </div>
          <span className="text-[10px] uppercase tracking-[0.25em] font-sans font-bold text-[#b38030] mb-1">
            Spread The Love
          </span>
          <h3 id="share-modal-title" className="font-serif text-2xl sm:text-3xl font-bold text-[#3d241c]">
            Share Invitation
          </h3>
          <p className="font-sans text-xs text-[#735146] mt-1 max-w-xs">
            Choose an app or copy the link to share Vivek &amp; Iswarya's wedding celebration
          </p>
        </div>

        {/* Invitation Preview Card */}
        <div className="flex items-center gap-3 p-3 rounded-2xl bg-[#fffcf7] border border-[#d5a24f]/30 mb-6 text-left shadow-sm">
          <img
            src={INVITATION_DATA.photos.hero}
            alt="Vivek and Iswarya"
            className="w-12 h-12 rounded-xl object-cover shrink-0 border border-[#d5a24f]/40"
          />
          <div className="min-w-0 flex-1">
            <h4 className="font-serif font-bold text-sm text-[#3d241c] truncate">
              {INVITATION_DATA.couple}
            </h4>
            <p className="text-[11px] font-sans text-[#8a5d24] font-medium truncate">
              Sunday, 20 Dec 2026
            </p>
            <p className="text-[10px] font-sans text-[#8a685e] truncate">
              Anugraha Auditorium &amp; SOWBHAGYA AC CONVENTION CENTER
            </p>
          </div>
        </div>

        {/* App Sharing Options Grid */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          {shareChannels.map((channel) => {
            const Icon = channel.icon;
            return (
              <a
                key={channel.name}
                href={channel.url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={onClose}
                className="group relative flex flex-col items-center justify-center p-3 rounded-2xl bg-[#fffcf7] border border-[#d5a24f]/25 hover:border-[#d5a24f] hover:bg-[#fff9f0] hover:-translate-y-0.5 transition-all shadow-sm cursor-pointer"
              >
                {channel.badge && (
                  <span className="absolute -top-2 px-1.5 py-0.5 rounded-full bg-[#d5a24f] text-[8px] font-sans font-bold text-white uppercase tracking-wider shadow">
                    {channel.badge}
                  </span>
                )}
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-1.5 shadow-sm transition-transform group-hover:scale-110 ${channel.color}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <span className="font-sans text-[11px] font-semibold text-[#5c3e34] group-hover:text-[#b38030]">
                  {channel.name}
                </span>
              </a>
            );
          })}

          {/* Native System Share (for phones/tablets supporting it) */}
          <button
            onClick={() => {
              handleNativeShare();
              onClose();
            }}
            className="group flex flex-col items-center justify-center p-3 rounded-2xl bg-[#fffcf7] border border-[#d5a24f]/25 hover:border-[#d5a24f] hover:bg-[#fff9f0] hover:-translate-y-0.5 transition-all shadow-sm cursor-pointer"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#d5a24f] to-[#e8be78] text-white flex items-center justify-center mb-1.5 shadow-sm transition-transform group-hover:scale-110">
              <Sparkles className="w-5 h-5" />
            </div>
            <span className="font-sans text-[11px] font-semibold text-[#5c3e34] group-hover:text-[#b38030]">
              More Apps...
            </span>
          </button>
        </div>

        {/* Copy Link Section */}
        <div className="pt-4 border-t border-[#d5a24f]/20">
          <label className="block text-left text-[11px] font-sans font-semibold text-[#735146] mb-1.5 uppercase tracking-wider">
            Or copy invitation link
          </label>
          <div className="flex items-center gap-2 p-1.5 pl-3 rounded-xl bg-[#fffcf7] border border-[#d5a24f]/35 focus-within:border-[#d5a24f] shadow-inner">
            <input
              type="text"
              readOnly
              value={currentUrl}
              className="w-full bg-transparent text-xs text-[#5c3e34] font-mono outline-none truncate"
            />
            <button
              onClick={handleCopyLink}
              className="gold-button px-4 py-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 shrink-0 cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-white" />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
