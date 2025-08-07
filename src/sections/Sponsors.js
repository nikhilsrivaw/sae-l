import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const Sponsors = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const billboardsRef = useRef(null);

  // Mock sponsors data styled as city billboards
  const sponsors = [
    {
      id: 1,
      name: "TURBO DYNAMICS",
      type: "Engine Specialist",
      logo: "🏎️",
      tagline: "BOOST YOUR LIMITS",
      supportedEvent: "Drag Strip Domination",
      neonColor: "neon-green",
      bgGradient: "from-green-900 to-green-700",
      contribution: "Engine Tuning Equipment"
    },
    {
      id: 2,
      name: "NEON RACING",
      type: "Performance Parts",
      logo: "⚡",
      tagline: "SPEED OF LIGHT",
      supportedEvent: "Circuit Conquest",
      neonColor: "neon-pink",
      bgGradient: "from-pink-900 to-purple-700",
      contribution: "Racing Components"
    },
    {
      id: 3,
      name: "APEX AUTOMOTIVE",
      type: "Suspension Systems",
      logo: "🔧",
      tagline: "PERFECT HANDLING",
      supportedEvent: "Baja Desert Raid",
      neonColor: "text-gta-yellow",
      bgGradient: "from-yellow-900 to-orange-700",
      contribution: "Suspension Upgrades"
    },
    {
      id: 4,
      name: "VOLTAGE MOTORS",
      type: "Electric Vehicle Tech",
      logo: "🔋",
      tagline: "FUTURE IS ELECTRIC",
      supportedEvent: "Electric Future Heist",
      neonColor: "neon-blue",
      bgGradient: "from-blue-900 to-cyan-700",
      contribution: "EV Components"
    },
    {
      id: 5,
      name: "STEEL FABRICATION",
      type: "Custom Manufacturing",
      logo: "🔨",
      tagline: "BUILT TO LAST",
      supportedEvent: "Workshop Mayhem",
      neonColor: "text-gray-300",
      bgGradient: "from-gray-800 to-gray-600",
      contribution: "Fabrication Services"
    },
    {
      id: 6,
      name: "NITRO SYSTEMS",
      type: "Forced Induction",
      logo: "💨",
      tagline: "MAXIMUM POWER",
      supportedEvent: "Formula Circuit Heist",
      neonColor: "text-gta-red",
      bgGradient: "from-red-900 to-red-700",
      contribution: "Turbo & Nitrous Systems"
    },
    {
      id: 7,
      name: "CYBER AUTOMOTIVE",
      type: "Electronics & AI",
      logo: "🤖",
      tagline: "SMART PERFORMANCE",
      supportedEvent: "Tech Spec Operation",
      neonColor: "text-purple-400",
      bgGradient: "from-purple-900 to-indigo-700",
      contribution: "ECU & Electronics"
    },
    {
      id: 8,
      name: "STREET KINGS",
      type: "Tire & Wheel Specialist",
      logo: "🏁",
      tagline: "GRIP THE STREET",
      supportedEvent: "Midnight Tuning",
      neonColor: "neon-green",
      bgGradient: "from-teal-900 to-green-700",
      contribution: "Racing Tires & Wheels"
    }
  ];

  useEffect(() => {
    const section = sectionRef.current;
    const title = titleRef.current;
    const billboards = billboardsRef.current;

    // Title animation
    gsap.fromTo(title, 
      { opacity: 0, y: 100 },
      {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          end: "top 50%",
          toggleActions: "play none none reverse"
        }
      }
    );

    // Billboard animations
    gsap.fromTo(billboards.children,
      { opacity: 0, y: 50, rotateZ: -5 },
      {
        opacity: 1,
        y: 0,
        rotateZ: 0,
        duration: 0.8,
        ease: "back.out(1.4)",
        stagger: {
          each: 0.1,
          from: "random"
        },
        scrollTrigger: {
          trigger: billboards,
          start: "top 85%",
          end: "bottom 60%",
          toggleActions: "play none none reverse"
        }
      }
    );

    // Continuous neon flicker animation
    gsap.to(".neon-flicker", {
      opacity: 0.7,
      duration: 0.1,
      ease: "power2.inOut",
      yoyo: true,
      repeat: -1,
      stagger: {
        each: 0.05,
        from: "random"
      }
    });

    // Billboard rotation animation
    gsap.to(".billboard-rotate", {
      rotateY: 360,
      duration: 20,
      ease: "none",
      repeat: -1
    });

  }, []);

  const BillboardCard = ({ sponsor, index }) => {
    const cardRef = useRef(null);
    const [isRevealed, setIsRevealed] = React.useState(false);

    const handleHover = (hover) => {
      const card = cardRef.current;
      
      if (hover) {
        setIsRevealed(true);
        gsap.to(card, {
          scale: 1.05,
          rotateY: 5,
          z: 50,
          duration: 0.4,
          ease: "power2.out"
        });
      } else {
        setIsRevealed(false);
        gsap.to(card, {
          scale: 1,
          rotateY: 0,
          z: 0,
          duration: 0.4,
          ease: "power2.out"
        });
      }
    };

    return (
      <div 
        ref={cardRef}
        className="billboard-rotate relative cursor-pointer transform-gpu perspective-1000"
        onMouseEnter={() => handleHover(true)}
        onMouseLeave={() => handleHover(false)}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Main billboard */}
        <div className={`bg-gradient-to-br ${sponsor.bgGradient} rounded-lg border-4 border-gray-700 relative overflow-hidden`}>
          {/* Neon frame effect */}
          <div className={`absolute inset-0 rounded-lg border-2 ${sponsor.neonColor} opacity-60 neon-flicker`}></div>
          
          {/* Content */}
          <div className="p-6 relative z-10">
            {/* Logo and name */}
            <div className="text-center mb-4">
              <div className="text-5xl mb-3 animate-float">{sponsor.logo}</div>
              <h3 className={`font-gta text-xl ${sponsor.neonColor} mb-2 neon-flicker`}>
                {sponsor.name}
              </h3>
              <p className="font-street text-sm text-gray-300 uppercase tracking-wider">
                {sponsor.type}
              </p>
            </div>
            
            {/* Tagline */}
            <div className="text-center mb-4">
              <p className={`font-street text-lg font-bold ${sponsor.neonColor} neon-flicker`}>
                {sponsor.tagline}
              </p>
            </div>

            {/* Reveal on hover */}
            <div className={`transition-all duration-500 ${isRevealed ? 'opacity-100 max-h-40' : 'opacity-0 max-h-0'} overflow-hidden`}>
              <div className="border-t border-gray-600 pt-4 text-center">
                <div className="mb-2">
                  <span className="text-gray-400 text-xs font-street">SUPPORTED EVENT:</span>
                  <div className="text-gta-yellow font-street text-sm font-bold">
                    {sponsor.supportedEvent}
                  </div>
                </div>
                <div>
                  <span className="text-gray-400 text-xs font-street">CONTRIBUTION:</span>
                  <div className="text-white font-street text-sm">
                    {sponsor.contribution}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Animated scanlines */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="w-full h-0.5 bg-white opacity-20 animate-pulse absolute top-1/4"></div>
            <div className="w-full h-0.5 bg-white opacity-15 animate-pulse absolute top-2/4" style={{ animationDelay: '0.5s' }}></div>
            <div className="w-full h-0.5 bg-white opacity-10 animate-pulse absolute top-3/4" style={{ animationDelay: '1s' }}></div>
          </div>

          {/* Corner decorations */}
          <div className="absolute top-2 left-2 w-4 h-4 border-l-2 border-t-2 border-gray-400"></div>
          <div className="absolute top-2 right-2 w-4 h-4 border-r-2 border-t-2 border-gray-400"></div>
          <div className="absolute bottom-2 left-2 w-4 h-4 border-l-2 border-b-2 border-gray-400"></div>
          <div className="absolute bottom-2 right-2 w-4 h-4 border-r-2 border-b-2 border-gray-400"></div>
        </div>

        {/* Billboard pole */}
        <div className="w-3 h-12 bg-gray-600 mx-auto relative">
          <div className="absolute bottom-0 w-8 h-3 bg-gray-700 -left-2.5 rounded"></div>
        </div>
      </div>
    );
  };

  return (
    <section 
      id="sponsors"
      ref={sectionRef}
      className="min-h-screen py-20 bg-gradient-to-b from-gray-900 via-gta-black to-gray-900 relative overflow-hidden"
    >
      {/* City background */}
      <div className="absolute inset-0 opacity-20">
        <div 
          style={{
            backgroundImage: `url("data:image/svg+xml,${encodeURIComponent(`
              <svg viewBox="0 0 1200 800" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient id="cityGlow" x1="0%" y1="100%" x2="0%" y2="0%">
                    <stop offset="0%" style="stop-color:#000;stop-opacity:1" />
                    <stop offset="50%" style="stop-color:#1a1a1d;stop-opacity:0.8" />
                    <stop offset="100%" style="stop-color:#39ff14;stop-opacity:0.1" />
                  </linearGradient>
                </defs>
                <rect width="1200" height="800" fill="url(#cityGlow)"/>
                <rect x="50" y="500" width="80" height="300" fill="#2a2a2a"/>
                <rect x="150" y="400" width="100" height="400" fill="#333"/>
                <rect x="280" y="450" width="90" height="350" fill="#2a2a2a"/>
                <rect x="400" y="350" width="110" height="450" fill="#333"/>
                <rect x="540" y="380" width="85" height="420" fill="#2a2a2a"/>
                <rect x="650" y="300" width="95" height="500" fill="#333"/>
                <rect x="770" y="420" width="75" height="380" fill="#2a2a2a"/>
                <rect x="870" y="280" width="120" height="520" fill="#333"/>
                <rect x="1020" y="390" width="85" height="410" fill="#2a2a2a"/>
                <rect x="1130" y="480" width="70" height="320" fill="#333"/>
                <circle cx="100" cy="450" r="3" fill="#39ff14" opacity="0.8"/>
                <circle cx="300" cy="350" r="4" fill="#ff10f0" opacity="0.7"/>
                <circle cx="500" cy="280" r="3" fill="#f9c74f" opacity="0.8"/>
                <circle cx="700" cy="250" r="5" fill="#39ff14" opacity="0.6"/>
                <circle cx="900" cy="230" r="4" fill="#ff10f0" opacity="0.8"/>
              </svg>
            `)}")`,
            backgroundSize: 'cover',
            backgroundPosition: 'bottom',
            backgroundRepeat: 'no-repeat'
          }}
          className="w-full h-full"
        />
      </div>

      {/* Grid overlay */}
      <div className="absolute inset-0 bg-grid opacity-5"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section title */}
        <div ref={titleRef} className="text-center mb-16">
          <h2 className="gta-title text-4xl md:text-6xl lg:text-7xl mb-6 neon-text">
            THE CITY ADS
          </h2>
          <p className="font-street text-xl md:text-2xl text-gta-yellow max-w-4xl mx-auto leading-relaxed">
            Our corporate partners light up the city with their support. These <span className="neon-pink">legendary sponsors</span> fuel our automotive empire.
          </p>
        </div>

        {/* Billboard grid */}
        <div 
          ref={billboardsRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto"
        >
          {sponsors.map((sponsor, index) => (
            <BillboardCard key={sponsor.id} sponsor={sponsor} index={index} />
          ))}
        </div>

        {/* Partnership call to action */}
        <div className="text-center mt-16 p-8 bg-gradient-to-r from-gta-black via-gray-900 to-gta-black rounded-lg border border-neon-green">
          <h3 className="font-gta text-2xl neon-green mb-4">JOIN THE EMPIRE</h3>
          <p className="font-street text-gray-300 text-lg leading-relaxed mb-6">
            Want to see your brand lighting up our city? Partner with SAE and become part of the automotive revolution.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="gta-button font-street text-lg">
              BECOME A SPONSOR
            </button>
            <button className="bg-transparent border-2 border-neon-pink text-neon-pink hover:bg-neon-pink hover:text-gta-black px-8 py-4 rounded font-street text-lg transition-all duration-300">
              PARTNERSHIP INFO
            </button>
          </div>
        </div>
      </div>

      {/* Floating neon particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-16 w-3 h-3 bg-neon-green rounded-full animate-ping opacity-20"></div>
        <div className="absolute bottom-1/3 right-24 w-2 h-2 bg-neon-pink rounded-full animate-bounce opacity-30"></div>
        <div className="absolute top-2/3 left-1/3 w-1.5 h-1.5 bg-gta-yellow rounded-full animate-pulse opacity-40"></div>
        <div className="absolute top-1/2 right-1/4 w-2.5 h-2.5 bg-purple-400 rounded-full animate-ping opacity-15"></div>
        <div className="absolute bottom-1/4 left-2/3 w-1 h-1 bg-cyan-400 rounded-full animate-bounce opacity-25"></div>
      </div>
    </section>
  );
};

export default Sponsors;