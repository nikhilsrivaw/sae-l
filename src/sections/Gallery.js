import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Import street racing background
import background4 from '../assets/background (4).jpg'; // Street racing sunset

const Gallery = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const carouselRef = useRef(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Mock gallery data styled as GTA cutscenes/loading screens
  const cutscenes = [
    {
      id: 1,
      title: "DRAG STRIP LEGENDS",
      subtitle: "Last Friday Night",
      description: "Epic quarter-mile showdown where SAE members dominated the competition with their custom-built speed machines.",
      location: "Downtown Speedway",
      participants: 24,
      image: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 450'><defs><linearGradient id='night1' x1='0%' y1='0%' x2='0%' y2='100%'><stop offset='0%' style='stop-color:%23000;stop-opacity:1' /><stop offset='100%' style='stop-color:%23333;stop-opacity:1' /></linearGradient></defs><rect width='800' height='450' fill='url(%23night1)'/><rect x='100' y='350' width='600' height='50' fill='%23444'/><rect x='200' y='300' width='80' height='50' fill='%23e63946'/><rect x='520' y='300' width='80' height='50' fill='%23f9c74f'/><circle cx='150' cy='200' r='60' fill='%2339ff14' opacity='0.3'/><circle cx='650' cy='180' r='40' fill='%23ff10f0' opacity='0.4'/></svg>",
      stats: { speed: "180 MPH", time: "8.2s", winner: "ALEX 'TURBO'" },
      type: "racing"
    },
    {
      id: 2,
      title: "WORKSHOP MAYHEM",
      subtitle: "Engine Modification Session",
      description: "Intensive 8-hour workshop where members learned advanced turbocharging techniques and built their dream engines.",
      location: "SAE Garage Complex",
      participants: 18,
      image: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 450'><defs><linearGradient id='garage1' x1='0%' y1='0%' x2='100%' y2='0%'><stop offset='0%' style='stop-color:%23111;stop-opacity:1' /><stop offset='100%' style='stop-color:%232a2a2a;stop-opacity:1' /></linearGradient></defs><rect width='800' height='450' fill='url(%23garage1)'/><rect x='50' y='100' width='200' height='250' fill='%23333' stroke='%2339ff14' stroke-width='2'/><rect x='300' y='150' width='180' height='200' fill='%23444' stroke='%23f9c74f' stroke-width='2'/><rect x='550' y='120' width='200' height='230' fill='%23222' stroke='%23ff10f0' stroke-width='2'/><circle cx='400' cy='50' r='30' fill='%23fff' opacity='0.8'/></svg>",
      stats: { hp: "+150 HP", torque: "+200 Nm", efficiency: "+15%" },
      type: "workshop"
    },
    {
      id: 3,
      title: "CIRCUIT CONQUEST",
      subtitle: "Formula Challenge",
      description: "Professional racing circuit where SAE formula team showed their engineering prowess against university rivals.",
      location: "Grand Prix Circuit",
      participants: 32,
      image: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 450'><defs><radialGradient id='track1' cx='50%' cy='50%' r='50%'><stop offset='0%' style='stop-color:%23444;stop-opacity:1' /><stop offset='100%' style='stop-color:%23000;stop-opacity:1' /></radialGradient></defs><rect width='800' height='450' fill='url(%23track1)'/><ellipse cx='400' cy='225' rx='300' ry='150' fill='none' stroke='%23fff' stroke-width='4'/><ellipse cx='400' cy='225' rx='200' ry='100' fill='none' stroke='%23fff' stroke-width='2'/><rect x='350' y='100' width='20' height='40' fill='%23e63946'/><rect x='430' y='300' width='20' height='40' fill='%2339ff14'/><rect x='200' y='200' width='20' height='40' fill='%23f9c74f'/></svg>",
      stats: { laps: "50", fastest: "1:24.8", position: "1st Place" },
      type: "competition"
    },
    {
      id: 4,
      title: "OFF-ROAD RAMPAGE",
      subtitle: "Baja Desert Challenge",
      description: "Extreme off-road testing where custom-built vehicles conquered the harshest terrain and weather conditions.",
      location: "Mojave Testing Grounds",
      participants: 16,
      image: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 450'><defs><linearGradient id='desert1' x1='0%' y1='0%' x2='0%' y2='100%'><stop offset='0%' style='stop-color:%23f9c74f;stop-opacity:0.3' /><stop offset='100%' style='stop-color:%23d4a574;stop-opacity:1' /></linearGradient></defs><rect width='800' height='450' fill='url(%23desert1)'/><polygon points='100,350 200,300 300,320 400,280 500,300 600,250 700,280 800,260 800,450 0,450' fill='%23c19a6b'/><rect x='300' y='250' width='60' height='30' fill='%23e63946'/><rect x='500' y='220' width='60' height='30' fill='%2339ff14'/><circle cx='150' cy='150' r='40' fill='%23fff' opacity='0.6'/></svg>",
      stats: { distance: "250 KM", terrain: "Mixed", survival: "100%" },
      type: "offroad"
    },
    {
      id: 5,
      title: "ELECTRIC EVOLUTION",
      subtitle: "EV Technology Showcase",
      description: "Cutting-edge electric vehicle demonstration featuring autonomous driving, regenerative braking, and battery optimization.",
      location: "Innovation Center",
      participants: 40,
      image: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 450'><defs><linearGradient id='future1' x1='0%' y1='0%' x2='100%' y2='100%'><stop offset='0%' style='stop-color:%231b03a3;stop-opacity:0.8' /><stop offset='100%' style='stop-color:%23000;stop-opacity:1' /></linearGradient></defs><rect width='800' height='450' fill='url(%23future1)'/><rect x='200' y='200' width='400' height='100' fill='none' stroke='%2339ff14' stroke-width='3'/><rect x='250' y='220' width='80' height='60' fill='%23fff' opacity='0.1'/><rect x='470' y='220' width='80' height='60' fill='%23fff' opacity='0.1'/><path d='M350 240 L450 240' stroke='%23ff10f0' stroke-width='4'/><circle cx='300' cy='100' r='20' fill='%2339ff14' opacity='0.7'/><circle cx='500' cy='100' r='20' fill='%23ff10f0' opacity='0.7'/></svg>",
      stats: { range: "400 KM", charge: "15 min", efficiency: "95%" },
      type: "technology"
    },
    {
      id: 6,
      title: "MIDNIGHT TUNING",
      subtitle: "Underground Workshop",
      description: "Secret after-hours session where the crew perfected their builds with advanced ECU tuning and dyno testing.",
      location: "Underground Garage",
      participants: 12,
      image: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 450'><defs><radialGradient id='underground1' cx='50%' cy='50%' r='70%'><stop offset='0%' style='stop-color:%23ff10f0;stop-opacity:0.1' /><stop offset='100%' style='stop-color:%23000;stop-opacity:1' /></radialGradient></defs><rect width='800' height='450' fill='url(%23underground1)'/><rect x='100' y='300' width='150' height='80' fill='%23333' stroke='%23ff10f0' stroke-width='1'/><rect x='300' y='280' width='200' height='100' fill='%23444' stroke='%2339ff14' stroke-width='1'/><rect x='550' y='290' width='170' height='90' fill='%23222' stroke='%23f9c74f' stroke-width='1'/><circle cx='200' cy='200' r='50' fill='%23ff10f0' opacity='0.2'/><circle cx='600' cy='180' r='60' fill='%2339ff14' opacity='0.2'/></svg>",
      stats: { hp: "+200 HP", boost: "25 PSI", dyno: "520 WHP" },
      type: "tuning"
    }
  ];

  useEffect(() => {
    const section = sectionRef.current;
    const title = titleRef.current;
    const carousel = carouselRef.current;

    // Title animation
    gsap.fromTo(title, 
      { opacity: 0, y: 50, rotateZ: -2 },
      {
        opacity: 1,
        y: 0,
        rotateZ: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          end: "top 50%",
          toggleActions: "play none none reverse"
        }
      }
    );

    // Carousel animation
    gsap.fromTo(carousel, 
      { opacity: 0, scale: 0.9 },
      {
        opacity: 1,
        scale: 1,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: carousel,
          start: "top 85%",
          end: "top 60%",
          toggleActions: "play none none reverse"
        }
      }
    );

    // Auto-play functionality
    let autoPlayInterval;
    if (isAutoPlaying) {
      autoPlayInterval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % cutscenes.length);
      }, 4000);
    }

    return () => {
      if (autoPlayInterval) clearInterval(autoPlayInterval);
    };
  }, [isAutoPlaying, cutscenes.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % cutscenes.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + cutscenes.length) % cutscenes.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'racing': return 'text-red-400';
      case 'workshop': return 'text-yellow-400';
      case 'competition': return 'text-green-400';
      case 'offroad': return 'text-orange-400';
      case 'technology': return 'text-blue-400';
      case 'tuning': return 'text-purple-400';
      default: return 'text-gray-400';
    }
  };

  const currentCutscene = cutscenes[currentSlide];

  return (
    <section 
      id="gallery"
      ref={sectionRef}
      className="min-h-screen py-20 relative overflow-hidden"
    >
      {/* ACTUAL Background Image - Street Racing Sunset */}
      <div 
        className="absolute inset-0"
        style={{
          backgroundImage: `url(${background4})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center center',
          backgroundRepeat: 'no-repeat'
        }}
      />
      
      {/* Overlay for readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80" />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Clean Section Title */}
        <div ref={titleRef} className="text-center mb-12">
          <h2 className="text-6xl md:text-8xl font-black tracking-wider text-white mb-6"
              style={{
                fontFamily: 'Impact, Arial Black, sans-serif',
                textShadow: '3px 3px 0px #000000, -1px -1px 0px #000000, 1px -1px 0px #000000, -1px 1px 0px #000000'
              }}>
            GALLERY
          </h2>
          <p className="text-xl md:text-2xl text-white max-w-4xl mx-auto leading-relaxed font-medium"
             style={{
               textShadow: '1px 1px 2px rgba(0, 0, 0, 0.8)',
               fontFamily: 'Arial, sans-serif'
             }}>
            Relive the epic moments from our automotive adventures. Each mission tells a story of <span className="text-purple-400 font-bold">engineering excellence</span>.
          </p>
        </div>

        {/* Main carousel */}
        <div 
          ref={carouselRef}
          className="max-w-6xl mx-auto relative"
        >
          {/* Current cutscene display */}
          <div className="bg-black/60 backdrop-blur-md rounded-lg overflow-hidden border-2 border-white/20 relative">
            {/* Image container */}
            <div className="relative h-96 md:h-[500px] overflow-hidden">
              <img 
                src={currentCutscene.image}
                alt={currentCutscene.title}
                className="w-full h-full object-cover"
              />
              
              {/* Clean overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
              
              {/* Content overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                <div className="flex items-end justify-between">
                  <div>
                    <h3 className="text-2xl md:text-4xl font-black text-white mb-2 tracking-wider"
                        style={{ fontFamily: 'Impact, Arial Black, sans-serif' }}>
                      {currentCutscene.title}
                    </h3>
                    <p className="text-lg md:text-xl text-blue-400 mb-2 font-bold"
                       style={{ fontFamily: 'Arial, sans-serif' }}>
                      {currentCutscene.subtitle}
                    </p>
                    <p className="text-gray-300 text-sm md:text-base max-w-2xl leading-relaxed mb-4 font-medium"
                       style={{ fontFamily: 'Arial, sans-serif' }}>
                      {currentCutscene.description}
                    </p>
                  </div>
                  
                  <div className={`text-right ${getTypeColor(currentCutscene.type)}`}
                       style={{ fontFamily: 'Arial, sans-serif' }}>
                    <div className="text-xs uppercase tracking-wider font-bold">{currentCutscene.type}</div>
                    <div className="text-sm mt-1 text-white font-medium">{currentCutscene.participants} PARTICIPANTS</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Stats bar */}
            <div className="bg-black/80 backdrop-blur-sm p-4 border-t border-white/20">
              <div className="flex items-center justify-between">
                <div className="flex space-x-6">
                  <div>
                    <span className="text-gray-400 text-xs font-medium"
                          style={{ fontFamily: 'Arial, sans-serif' }}>LOCATION:</span>
                    <div className="text-white text-sm font-bold"
                         style={{ fontFamily: 'Arial, sans-serif' }}>{currentCutscene.location}</div>
                  </div>
                  {Object.entries(currentCutscene.stats).map(([key, value]) => (
                    <div key={key}>
                      <span className="text-gray-400 text-xs uppercase font-medium"
                            style={{ fontFamily: 'Arial, sans-serif' }}>{key}:</span>
                      <div className="text-green-400 text-sm font-bold"
                           style={{ fontFamily: 'Arial, sans-serif' }}>{value}</div>
                    </div>
                  ))}
                </div>
                
                <div className="flex items-center space-x-4">
                  <button 
                    onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                    className="text-xs text-gray-400 hover:text-green-400 transition-colors font-medium"
                    style={{ fontFamily: 'Arial, sans-serif' }}
                  >
                    {isAutoPlaying ? 'PAUSE AUTO' : 'PLAY AUTO'}
                  </button>
                  <div className="text-gray-400 text-xs font-medium"
                       style={{ fontFamily: 'Arial, sans-serif' }}>
                    {currentSlide + 1} / {cutscenes.length}
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation arrows */}
            <button 
              onClick={prevSlide}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/70 hover:bg-black/90 text-white border border-white/20 p-3 rounded-full transition-all duration-300 hover:scale-110 backdrop-blur-sm"
            >
              ←
            </button>
            <button 
              onClick={nextSlide}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/70 hover:bg-black/90 text-white border border-white/20 p-3 rounded-full transition-all duration-300 hover:scale-110 backdrop-blur-sm"
            >
              →
            </button>
          </div>

          {/* Thumbnail navigation */}
          <div className="flex justify-center space-x-3 mt-6 overflow-x-auto pb-2">
            {cutscenes.map((cutscene, index) => (
              <button
                key={cutscene.id}
                onClick={() => goToSlide(index)}
                className={`flex-shrink-0 w-24 h-16 rounded border-2 transition-all duration-300 ${
                  index === currentSlide 
                    ? 'border-white scale-110' 
                    : 'border-gray-600 opacity-60 hover:opacity-80 hover:border-blue-400'
                }`}
              >
                <img 
                  src={cutscene.image}
                  alt={cutscene.title}
                  className="w-full h-full object-cover rounded"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Call to action */}
        <div className="text-center mt-12">
          <p className="text-gray-300 text-xl mb-8 leading-relaxed font-medium"
             style={{ fontFamily: 'Arial, sans-serif' }}>
            Want to be featured in our next gallery? <span className="text-green-400 font-bold">Join an upcoming mission</span>.
          </p>
          <button className="px-12 py-4 text-xl font-bold text-white bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 border-2 border-white/20 transition-all duration-300 hover:scale-105"
                  style={{
                    fontFamily: 'Arial, sans-serif',
                    clipPath: 'polygon(10px 0%, 100% 0%, calc(100% - 10px) 100%, 0% 100%)'
                  }}>
            VIEW ALL MISSIONS
          </button>
        </div>
      </div>

      {/* Animated particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-20 w-2 h-2 bg-neon-green rounded-full animate-ping opacity-20"></div>
        <div className="absolute bottom-1/4 right-32 w-1.5 h-1.5 bg-gta-yellow rounded-full animate-bounce opacity-30"></div>
        <div className="absolute top-3/4 left-1/2 w-1 h-1 bg-neon-pink rounded-full animate-pulse opacity-40"></div>
      </div>
    </section>
  );
};

export default Gallery;