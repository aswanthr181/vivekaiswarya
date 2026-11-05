export const INVITATION_DATA = {
  couple: "Vivek & Iswarya",
  groom: "Vivek",
  bride: "Iswarya",
  tagline: "A quiet forever, beautifully begun.",
  weddingDate: "20 December 2026",
  weddingDateISO: "2026-12-20T11:58:00+05:30",
  weddingEndISO: "2026-12-20T12:10:00+05:30",
  weddingTime: "11:58 AM to 12:10 PM",
  music: "/assets/Rangrez-weddingbgm.mp3",
  audioTitle: "Rangrez - Wedding BGM",
  coupleWhatsApp: "919061209721",
  
  brideReceptionVenue: {
    name: "Anugraha Auditorium",
    event: "Bride's Reception",
    time: "From 4:30 PM onwards",
    date: "Saturday, 19 Dec 2026",
    mapLink: "https://share.google/ScjOTR6QxVD6RKi9o",
    embedMapQuery: "Anugraha Auditorium",
    description: "An auspicious evening celebrating the bride with joyful blessings, feast & warm celebration."
  },

  marriageVenue: {
    name: "Anugraha Auditorium",
    event: "Marriage Ceremony (Muhoortham)",
    time: "11:58 AM to 12:10 PM",
    date: "Sunday, 20 Dec 2026",
    mapLink: "https://share.google/ScjOTR6QxVD6RKi9o",
    embedMapQuery: "Anugraha Auditorium",
    description: "The sacred marriage ceremony, thali kettu & forever begins."
  },
  
  receptionVenue: {
    name: "Sowbhagya Convention Center",
    event: "Wedding Reception",
    time: "From 4:30 PM onwards",
    date: "Sunday, 20 Dec 2026",
    mapLink: "https://share.google/s8mlSWNi1YlK6400U",
    embedMapQuery: "SOWBHAGYA AC CONVENTION CENTER Nedungolam Paravur Kollam",
    description: "An evening of celebration, feast, photographs & heartfelt blessings."
  },

  venues: [
    {
      id: "anugraha",
      name: "Anugraha Auditorium",
      tag: "Ceremony & Bride's Reception",
      mapLink: "https://share.google/ScjOTR6QxVD6RKi9o",
      embedQuery: "Anugraha Auditorium",
      accent: "wedding",
      description: "Hosting both the auspicious Bride's Reception and the sacred Holy Marriage Ceremony (Muhoortham).",
      occasions: [
        {
          id: "bride-reception",
          badge: "Bride's Reception",
          date: "Saturday, 19 December 2026",
          time: "From 4:30 PM onwards",
          description: "An auspicious evening celebrating the bride with joyful blessings, feast & music.",
          accent: "rose"
        },
        {
          id: "marriage",
          badge: "The Holy Wedding (Muhoortham)",
          date: "Sunday, 20 December 2026",
          time: "11:58 AM to 12:10 PM",
          description: "The sacred vows, thali kettu ceremony & traditional rituals in the warmth of loved ones.",
          accent: "wedding"
        }
      ]
    },
    {
      id: "sowbhagya",
      name: "Sowbhagya AC Convention Center",
      tag: "Evening Wedding Reception",
      mapLink: "https://share.google/s8mlSWNi1YlK6400U",
      embedQuery: "SOWBHAGYA AC CONVENTION CENTER Nedungolam Paravur Kollam",
      accent: "champagne",
      description: "Hosting the grand celebratory wedding reception filled with dinner, music, and eternal memories.",
      occasions: [
        {
          id: "reception",
          badge: "Wedding Reception",
          date: "Sunday, 20 December 2026",
          time: "From 4:30 PM onwards",
          description: "A celebration of love filled with laughter, dinner, music, and heartfelt blessings.",
          accent: "champagne"
        }
      ]
    }
  ],

  photos: {
    hero: "/assets/couple-portrait.jpg",
    story: "/assets/couple-nature.jpg",
    envelope: "/assets/couple-portrait.jpg",
    gallery: [
      {
        src: "/assets/couple-portrait.jpg",
        caption: "Cherished Smiles",
        subtitle: "The laughter that started our forever story"
      },
      {
        src: "/assets/couple-nature.jpg",
        caption: "Where Nature Whispers",
        subtitle: "Strolls along scenic waters and coconut groves"
      },
      {
        src: "/assets/couple-cafe.jpg",
        caption: "Warm Coffee & Little Talks",
        subtitle: "A thousand shared stories across cozy tables"
      },
      {
        src: "/assets/couple-field.jpg",
        caption: "Golden Sunshine & Dreams",
        subtitle: "Walking hand in hand through the lush fields of hope"
      }
    ]
  },

  timeline: [
    {
      id: "bride-reception",
      title: "Bride's Reception",
      subtitle: "An evening of joy, love, feast & blessings honoring the bride",
      badgeText: "Bride's Reception",
      date: "Saturday, 19 Dec 2026",
      time: "From 4:30 PM onwards",
      startISO: "2026-12-19T16:30:00+05:30",
      endISO: "2026-12-19T21:30:00+05:30",
      accent: "rose",
      featured: false,
      location: "Anugraha Auditorium",
      mapLink: "https://share.google/ScjOTR6QxVD6RKi9o",
      dressCode: "Traditional / Festive Elegance"
    },
    {
      id: "marriage",
      title: "The Sacred Marriage Ceremony",
      subtitle: "The sacred vows, thali kettu & forever begins",
      badgeText: "The Sacred Muhurtham",
      date: "Sunday, 20 Dec 2026",
      time: "11:58 AM to 12:10 PM (Muhoortham)",
      startISO: "2026-12-20T11:58:00+05:30",
      endISO: "2026-12-20T12:10:00+05:30",
      accent: "wedding",
      featured: true,
      location: "Anugraha Auditorium",
      mapLink: "https://share.google/ScjOTR6QxVD6RKi9o",
      dressCode: "Traditional Kerala Kasavu & Silks"
    },
    {
      id: "reception",
      title: "Wedding Reception",
      subtitle: "An evening of celebration, delicious feast, music & blessings",
      badgeText: "Wedding Reception",
      date: "Sunday, 20 Dec 2026",
      time: "From 4:30 PM onwards",
      startISO: "2026-12-20T16:30:00+05:30",
      endISO: "2026-12-20T21:30:00+05:30",
      accent: "champagne",
      featured: false,
      location: "SOWBHAGYA AC CONVENTION CENTER",
      mapLink: "https://share.google/s8mlSWNi1YlK6400U",
      dressCode: "Celebratory Festive Attire"
    }
  ],
  
  contacts: [
    {
      role: "Groom's",
      name: "Vivek",
      phone: "+91 9061209721",
      whatsapp: "919061209721"
    },
    {
      role: "Groom's Family",
      name: "Father",
      phone: "+91 9645743076",
      whatsapp: "919645743076"
    },
    {
      role: "Bride's Family",
      name: "Brother",
      phone: "+91 9072011581",
      whatsapp: "9072011581"
    },
    {
      role: "Bride's Family",
      name: "Father",
      phone: "+91 9744532018",
      whatsapp: "9744532018"
    }
  ],

  initialWishes: [
    
  ],

  closingNote: "Come with your smiles, your stories, and all the warmth you bring into our lives. We cannot wait to celebrate the beginning of our forever with you."
};
