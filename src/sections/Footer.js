import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const Footer = () => {
  const footerRef = useRef(null);
  const miniMapRef = useRef(null);

  const socialIcons = [
    { platform: 'Instagram', icon: '📸', color: 'hover:text-pink-400', position: { x: 20, y: 30 } },
    { platform: 'Discord', icon: '🎮', color: 'hover:text-purple-400', position: { x: 60, y: 20 } },
    { platform: 'YouTube', icon: '📺', color: 'hover:text-red-400', position: { x: 80, y: 50 } },
    { platform: 'TikTok', icon: '🎵', color: 'hover:text-cyan-400', position: { x: 40, y: 60 } },
    { platform: 'Twitter', icon: '🐦', color: 'hover:text-blue-400', position: { x: 70, y: 35 } },
    { platform: 'LinkedIn', icon: '💼', color: 'hover:text-blue-300', position: { x: 25, y: 55 } }
  ];

  const quickLinks = [
    { name: 'About SAE', href: '#about' },
    { name: 'Upcoming Events', href: '#events' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'Sponsors', href: '#sponsors' },
    { name: 'Contact', href: '#contact' }
  ];

  const legalLinks = [
    { name: 'Privacy Policy', href: '#' },
    { name: 'Terms of Service', href: '#' },
    { name: 'Code of Conduct', href: '#' },
    { name: 'Safety Guidelines', href: '#' }
  ];

  useEffect(() => {
    const footer = footerRef.current;
    const miniMap = miniMapRef.current;

    // Footer entrance animation
    gsap.fromTo(footer, 
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: footer,
          start: "top 90%",
          end: "top 70%",
          toggleActions: "play none none reverse"
        }
      }
    );

    // Mini-map social icons animation
    gsap.fromTo(miniMap.children,
      { opacity: 0, scale: 0 },
      {
        opacity: 1,
        scale: 1,
        duration: 0.6,
        ease: "back.out(1.7)",
        stagger: {
          each: 0.1,
          from: "random"
        },
        scrollTrigger: {
          trigger: miniMap,
          start: "top 85%",
          end: "top 70%",
          toggleActions: "play none none reverse"
        }
      }
    );

    // Continuous radar sweep animation
    gsap.to(".radar-sweep", {
      rotation: 360,
      duration: 4,
      ease: "none",
      repeat: -1
    });

    // Street lights flickering
    gsap.to(".street-light-footer", {
      opacity: 0.3,
      duration: 0.8,
      ease: "power2.inOut",
      yoyo: true,
      repeat: -1,
      stagger: {
        each: 0.2,
        from: "random"
      }
    });

  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer 
      ref={footerRef}
      className="bg-gradient-to-t from-black via-gta-black to-gray-900 relative overflow-hidden"
    >
      {/* Street background */}
      <div className="absolute inset-0 opacity-20">
        <div 
          style={{
            backgroundImage: `url("data:image/svg+xml,${encodeURIComponent(`
              <svg viewBox="0 0 1200 400" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient id="street" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" style="stop-color:#333;stop-opacity:0.5" />
                    <stop offset="100%" style="stop-color:#000;stop-opacity:1" />
                  </linearGradient>
                </defs>
                <rect width="1200" height="400" fill="url(#street)"/>
                <rect x="0" y="200" width="1200" height="200" fill="#1a1a1d"/>
                <rect x="0" y="180" width="1200" height="40" fill="#333"/>
                <path d="M0 200 L1200 200" stroke="#f9c74f" stroke-width="4" stroke-dasharray="40,20"/>
                <rect x="100" y="160" width="4" height="60" fill="#f9c74f"/>
                <rect x="300" y="160" width="4" height="60" fill="#f9c74f"/>
                <rect x="500" y="160" width="4" height="60" fill="#f9c74f"/>
                <rect x="700" y="160" width="4" height="60" fill="#f9c74f"/>
                <rect x="900" y="160" width="4" height="60" fill="#f9c74f"/>
                <rect x="1100" y="160" width="4" height="60" fill="#f9c74f"/>
              </svg>
            `)}")`,
            backgroundSize: 'cover',
            backgroundPosition: 'bottom',
            backgroundRepeat: 'no-repeat'
          }}
          className="w-full h-full"
        />
      </div>

      {/* Street lights */}
      <div className="absolute top-0 left-0 w-full h-20 pointer-events-none">
        <div className="street-light-footer absolute top-4 left-32 w-2 h-12 bg-gta-yellow opacity-60"></div>
        <div className="street-light-footer absolute top-4 left-96 w-2 h-12 bg-gta-yellow opacity-60"></div>
        <div className="street-light-footer absolute top-4 right-96 w-2 h-12 bg-gta-yellow opacity-60"></div>
        <div className="street-light-footer absolute top-4 right-32 w-2 h-12 bg-gta-yellow opacity-60"></div>
      </div>

      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          
          {/* SAE Info Column */}
          <div className="lg:col-span-1">
            <div className="mb-8">
              <h3 className="text-3xl font-black tracking-wider text-white mb-4"
                  style={{
                    fontFamily: 'Impact, Arial Black, sans-serif',
                    textShadow: '2px 2px 0px #000000, -1px -1px 0px #000000, 1px -1px 0px #000000, -1px 1px 0px #000000'
                  }}>SAE</h3>
              <p className="text-gray-300 leading-relaxed mb-6 font-medium"
                 style={{ fontFamily: 'Arial, sans-serif' }}>
                Society of Automotive Engineers - Building the future of automotive technology through innovation, education, and pure automotive passion.
              </p>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-sm text-green-400 font-medium"
                        style={{ fontFamily: 'Arial, sans-serif' }}>ONLINE</span>
                </div>
                <div className="text-sm text-gray-400 font-medium"
                     style={{ fontFamily: 'Arial, sans-serif' }}>
                  Est. 2024
                </div>
              </div>
            </div>

            {/* Back to top button */}
            <button 
              onClick={scrollToTop}
              className="text-sm font-bold text-white bg-gradient-to-r from-gray-600 to-gray-800 hover:from-gray-700 hover:to-gray-900 border-2 border-white/20 transition-all duration-300 hover:scale-105 mb-4 w-full px-4 py-3"
              style={{
                fontFamily: 'Arial, sans-serif',
                clipPath: 'polygon(10px 0%, 100% 0%, calc(100% - 10px) 100%, 0% 100%)'
              }}
            >
              BACK TO TOP
            </button>
          </div>

          {/* Quick Links Column */}
          <div className="lg:col-span-1">
            <h4 className="text-xl font-bold text-green-400 mb-6"
                style={{ fontFamily: 'Arial, sans-serif' }}>QUICK ACCESS</h4>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.href}
                    className="text-gray-300 hover:text-yellow-400 transition-colors duration-300 flex items-center group font-medium"
                    style={{ fontFamily: 'Arial, sans-serif' }}
                  >
                    <span className="mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">→</span>
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info Column */}
          <div className="lg:col-span-1">
            <h4 className="text-xl font-bold text-pink-400 mb-6"
                style={{ fontFamily: 'Arial, sans-serif' }}>CONTACT HQ</h4>
            <div className="space-y-4 text-gray-300"
                 style={{ fontFamily: 'Arial, sans-serif' }}>
              <div>
                <div className="text-yellow-400 text-sm uppercase font-bold">Location</div>
                <div className="font-medium">123 Speed Street<br />Auto City, AC 90210</div>
              </div>
              <div>
                <div className="text-yellow-400 text-sm uppercase font-bold">Hours</div>
                <div className="font-medium">Mon-Fri: 6PM-12AM<br />Weekends: 12PM-2AM</div>
              </div>
              <div>
                <div className="text-yellow-400 text-sm uppercase font-bold">Emergency</div>
                <div className="text-red-400 font-bold">+1 (555) SAE-HELP</div>
              </div>
            </div>
          </div>

          {/* Mini-Map Social Column */}
          <div className="lg:col-span-1">
            <h4 className="text-xl font-bold text-yellow-400 mb-6"
                style={{ fontFamily: 'Arial, sans-serif' }}>SOCIAL RADAR</h4>
            
            {/* Mini-map container */}
            <div className="relative bg-gradient-to-br from-black/60 to-black/90 backdrop-blur-sm rounded-lg p-4 border border-green-400/50 h-48 overflow-hidden">
              
              {/* Radar sweep */}
              <div className="radar-sweep absolute inset-0 pointer-events-none">
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-0.5 bg-gradient-to-r from-transparent via-green-400 to-transparent opacity-60"></div>
              </div>

              {/* Grid lines */}
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/2 left-0 w-full h-px bg-green-400 opacity-20"></div>
                <div className="absolute top-0 left-1/2 w-px h-full bg-green-400 opacity-20"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 border border-green-400 rounded-full opacity-30"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 border border-green-400 rounded-full opacity-20"></div>
              </div>

              {/* Social icons positioned on mini-map */}
              <div ref={miniMapRef} className="absolute inset-0">
                {socialIcons.map((social, index) => (
                  <button
                    key={index}
                    className={`absolute text-lg transition-all duration-300 ${social.color} hover:scale-125 cursor-pointer`}
                    style={{ 
                      left: `${social.position.x}%`, 
                      top: `${social.position.y}%`,
                      transform: 'translate(-50%, -50%)'
                    }}
                    title={social.platform}
                  >
                    <div className="relative">
                      {social.icon}
                      <div className="absolute -inset-1 bg-green-400 rounded-full opacity-20 animate-ping"></div>
                    </div>
                  </button>
                ))}
              </div>

              {/* Map legend */}
              <div className="absolute bottom-2 right-2 text-xs text-gray-400 font-medium"
                   style={{ fontFamily: 'Arial, sans-serif' }}>
                SOCIAL NETWORK
              </div>
            </div>

            <p className="text-gray-400 text-sm mt-3 text-center font-medium"
               style={{ fontFamily: 'Arial, sans-serif' }}>
              Click the radar blips to connect
            </p>
          </div>
        </div>

        {/* Bottom section */}
        <div className="border-t border-gray-700 mt-12 pt-8">
          <div className="flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0">
            
            {/* Legal links */}
            <div className="flex flex-wrap justify-center lg:justify-start space-x-6">
              {legalLinks.map((link, index) => (
                <a 
                  key={index}
                  href={link.href}
                  className="text-gray-500 hover:text-yellow-400 transition-colors duration-300 text-sm font-medium"
                  style={{ fontFamily: 'Arial, sans-serif' }}
                >
                  {link.name}
                </a>
              ))}
            </div>

            {/* Copyright */}
            <div className="text-center lg:text-right">
              <p className="text-gray-500 text-sm font-medium"
                 style={{ fontFamily: 'Arial, sans-serif' }}>
                © 2024 SAE Auto Empire. All rights reserved.
              </p>
              <p className="text-gray-600 text-xs mt-1 font-medium"
                 style={{ fontFamily: 'Arial, sans-serif' }}>
                Built with React • Powered by GSAP • Styled with TailwindCSS
              </p>
            </div>
          </div>

          {/* GTA-style legal disclaimer */}
          <div className="mt-8 text-center">
            <p className="text-gray-600 text-xs leading-relaxed max-w-4xl mx-auto font-medium"
               style={{ fontFamily: 'Arial, sans-serif' }}>
              SAE Auto Empire is a student organization focused on automotive engineering education and innovation. 
              All racing activities are conducted in controlled environments with proper safety measures. 
              We promote responsible automotive enthusiasm and engineering excellence. 
              Not affiliated with Rockstar Games or Grand Theft Auto franchise.
            </p>
          </div>
        </div>
      </div>

      {/* Ambient particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-20 w-1 h-1 bg-neon-green rounded-full animate-ping opacity-30"></div>
        <div className="absolute bottom-1/3 right-32 w-1.5 h-1.5 bg-gta-yellow rounded-full animate-bounce opacity-25"></div>
        <div className="absolute top-2/3 left-1/3 w-1 h-1 bg-neon-pink rounded-full animate-pulse opacity-35"></div>
        <div className="absolute bottom-1/4 right-1/4 w-2 h-2 bg-purple-400 rounded-full animate-ping opacity-20"></div>
      </div>

      {/* Bottom gradient */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black to-transparent"></div>
    </footer>
  );
};

export default Footer;