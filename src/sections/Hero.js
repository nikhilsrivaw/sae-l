import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Import the actual GTA V backgrounds
import background1 from '../assets/background (2).jpg'; // Trevor with palm trees - NEW MAIN HERO
import background2 from '../assets/background (5).jpg'; // Beach reflection sunset
import background3 from '../assets/background (3).jpg'; // City skyline sunset
import background4 from '../assets/background (4).jpg'; // Street racing sunset
import background5 from '../assets/background (1).jpg'; // Neon diner sunset

const Hero = () => {
  const heroRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const backgroundRef = useRef(null);
  const loadingRef = useRef(null);
  const hudRef = useRef(null);
  const mapRef = useRef(null);
  const pointerRef = useRef(null);
  const tooltipRef = useRef(null);
  const saeLetterS = useRef(null);
  const saeLetterA = useRef(null);
  const saeLetterE = useRef(null);
  const saeDefinitions = useRef(null);
  const starLineRef = useRef(null);
  const fullTextRef = useRef(null);
  
  // Navbar refs and state
  const navRef = useRef(null);
  const logoRef = useRef(null);
  const [activeSection, setActiveSection] = useState('hero');
  const [isScrolled, setIsScrolled] = useState(false);
  const [hoveredButton, setHoveredButton] = useState(null);
  
  const [isLoading, setIsLoading] = useState(true);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [showMainContent, setShowMainContent] = useState(false);
  const saeMaskRef = useRef(null);
  const audioRef = useRef(null);
  const [isAudioPlaying, setIsAudioPlaying] = useState(true); // Audio should play by default
  const [isAudioLoaded, setIsAudioLoaded] = useState(false);
  const [audioControlEnabled, setAudioControlEnabled] = useState(false);

  // Navigation items
  const navItems = [
    { name: 'EVENTS', href: '#events', id: 'events' },
    { name: 'TEAM', href: '#about', id: 'about' },
    { name: 'CREATORS', href: '#gallery', id: 'gallery' },
    { name: 'SPONSORS', href: '#sponsors', id: 'sponsors' }
  ];

  // Debug: Log background imports on component mount
  console.log('All background imports:');
  console.log('background1:', background1);
  console.log('background2:', background2);
  console.log('background3:', background3);
  console.log('background4:', background4);
  console.log('background5:', background5);
  console.log('Background1 type:', typeof background1);
  console.log('Background1 exists:', !!background1);

  // Navigation functions
  const scrollToSection = (href, id) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
      setActiveSection(id);
    }
  };

  // Ensure audio plays + add click-to-play fallback
  useEffect(() => {
    console.log("Component mounted - setting up audio");
    
    // Try multiple times to start audio
    const tryPlay = () => {
      if (audioRef.current && audioRef.current.paused) {
        console.log("Attempting to play audio...");
        audioRef.current.play()
          .then(() => {
            console.log("✓ Audio playing successfully!");
            setIsAudioPlaying(true);
          })
          .catch(e => {
            console.log("✗ Audio blocked:", e.message);
            setIsAudioPlaying(false);
          });
      }
    };
    
    // Try immediately and with delays
    tryPlay();
    const timer1 = setTimeout(tryPlay, 500);
    const timer2 = setTimeout(tryPlay, 2000);
    
    // Add click anywhere to start audio (fallback)
    const handleClick = () => {
      console.log("User clicked - trying to start audio");
      if (audioRef.current && audioRef.current.paused) {
        audioRef.current.play()
          .then(() => {
            console.log("✓ Audio started on user click!");
            setIsAudioPlaying(true);
          })
          .catch(e => console.log("✗ Audio failed on click:", e.message));
      }
      document.removeEventListener('click', handleClick);
    };
    
    document.addEventListener('click', handleClick);
    
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      document.removeEventListener('click', handleClick);
    };
  }, []);

  useEffect(() => {
    const hero = heroRef.current;
    const title = titleRef.current;
    const subtitle = subtitleRef.current;
    const background = backgroundRef.current;
    const loading = loadingRef.current;
    const hud = hudRef.current;
    const nav = navRef.current;
    const logo = logoRef.current;

    // Debug: Log the background image path
    console.log('Background1 import:', background1);
    console.log('Typeof background1:', typeof background1);

    // Preload the main background image
    const img = new Image();
    img.onload = () => {
      console.log('Image preload successful!');
      setImageLoaded(true);
    };
    img.onerror = () => {
      console.error('Image preload failed for:', background1);
      setImageLoaded(false);
    };
    img.src = background1;

    // Navbar animations and setup
    if (nav) {
      // Initial navbar animation - Much faster
      gsap.fromTo(nav, 
        { y: -100, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          duration: 0.4,
          ease: "power2.out",
          delay: 0.1
        }
      );

      // Logo hover animation setup
      const handleLogoHover = () => {
        gsap.to(logo, {
          scale: 1.1,
          duration: 0.3,
          ease: "power2.out"
        });
      };

      const handleLogoLeave = () => {
        gsap.to(logo, {
          scale: 1,
          duration: 0.3,
          ease: "power2.out"
        });
      };

      if (logo) {
        logo.addEventListener('mouseenter', handleLogoHover);
        logo.addEventListener('mouseleave', handleLogoLeave);
      }

      // Scroll detection
      const handleScroll = () => {
        const scrollY = window.scrollY;
        setIsScrolled(scrollY > 50);

        // Update active section based on scroll position
        const sections = ['hero', 'events', 'about', 'gallery', 'sponsors'];
        const currentSection = sections.find(section => {
          const element = document.querySelector(`#${section}`);
          if (element) {
            const rect = element.getBoundingClientRect();
            return rect.top <= 100 && rect.bottom >= 100;
          }
          return false;
        });
        
        if (currentSection) {
          setActiveSection(currentSection);
        }
      };

      window.addEventListener('scroll', handleScroll);

      // Cleanup function for navbar
      const cleanupNavbar = () => {
        if (logo) {
          logo.removeEventListener('mouseenter', handleLogoHover);
          logo.removeEventListener('mouseleave', handleLogoLeave);
        }
        window.removeEventListener('scroll', handleScroll);
      };

      // Store cleanup function
      window.navbarCleanup = cleanupNavbar;
    }

    // GTA V Style Loading Screen - Much faster
    const loadingTl = gsap.timeline({
      onComplete: () => {
        setTimeout(() => setIsLoading(false), 200);
      }
    });

    // Show content immediately
    if (imageLoaded) {
      loadingTl
        .to(".loading-bar-fill", { 
          width: "100%", 
          duration: 1.5,
          ease: "power2.inOut"
        })
        .to(".loading-text", {
          opacity: 0.6,
          duration: 0.2,
          repeat: 2,
          yoyo: true
        }, "-=1")
        .to(loading, {
          opacity: 0,
          duration: 0.8,
          ease: "power2.inOut"
        });
    } else {
      // Skip loading if image fails to load
      setTimeout(() => setIsLoading(false), 100);
    }

    // SAE TEXT MASK REVEAL ANIMATION - EXACTLY LIKE GTA VI
    if (saeMaskRef.current && !showMainContent) {
      const saeMaskTl = gsap.timeline({
        onComplete: () => {
          setShowMainContent(true);
        }
      });

      // Start SLOW then ACCELERATE - no waiting, smooth transition
      saeMaskTl
        .set(".sae-mask-group", { 
          rotation: 0,
          scale: 1,
          opacity: 1,
          transformOrigin: "center center"
        })
        // Animation starts - no audio logic here
        .call(() => {
          console.log("SAE animation starting");
        })
        .to(".sae-mask-group", {
          rotation: 5,
          duration: 2.5, // Start slow
          ease: "Power1.easeIn", // Slow start
          onComplete: function() {
            setShowMainContent(true);
            // Enable audio control after animation completes
            setTimeout(() => {
              setAudioControlEnabled(true);
              console.log("Audio control enabled");
            }, 500);
          }
        })
        .to(".sae-mask-group", {
          scale: 25,
          duration: 1.5, // Then accelerate fast
          ease: "Power3.easeOut", // Fast finish
          transformOrigin: "center center",
          onUpdate: function() {
            if (this.progress() >= 0.3) {
              setShowMainContent(true);
            }
          }
        }, "-=0.5") // Minimal overlap for seamless transition
        .to(".sae-mask-group", {
          opacity: 0,
          duration: 0.5,
          ease: "Power2.easeOut"
        }, "-=0.5");

      return () => {
        saeMaskTl.kill();
      };
    }

    // Don't run main animations until SAE mask reveal is complete
    if (!showMainContent) return;

    // COMPLEX HERO ANIMATION SEQUENCE AS REQUESTED
    // Initial setup - EVERYTHING COMPLETELY HIDDEN except what we want to animate
    
    // HIDE ALL BACKGROUND IMAGES FIRST
    gsap.set(backgroundRef.current, { opacity: 0 });
    gsap.set('img[src*="background"]', { opacity: 0 });
    gsap.set('[style*="backgroundImage"]', { opacity: 0 });
    
    // HIDE ALL ELEMENTS - use proper refs instead of CSS selectors
    gsap.set([title, subtitle, hud, mapRef.current, saeDefinitions.current, starLineRef.current, fullTextRef.current], { opacity: 0 });
    // Set initial positions correctly for hero elements
    if (hud) gsap.set(hud, { opacity: 0, x: -100 });
    if (mapRef.current) gsap.set(mapRef.current, { opacity: 0, scale: 0.8, y: 100 });
    // Hide welcome card and bottom fade with more specific targeting
    gsap.set('.absolute.top-6.right-6.z-30', { opacity: 0 }); // Welcome card
    gsap.set('.absolute.bottom-0.left-0.w-full.h-32', { opacity: 0 }); // Bottom fade
    
    // Position SAE letters IN CENTER with SAME ENLARGED scale for compression
    gsap.set(saeLetterS.current, { opacity: 0, x: 0, y: 0, scale: 6.0 });
    gsap.set(saeLetterA.current, { opacity: 0, x: 0, y: 0, scale: 6.0 });
    gsap.set(saeLetterE.current, { opacity: 0, x: 0, y: 0, scale: 6.0 });

    // Create the master timeline - IMMEDIATE START
    const masterTl = gsap.timeline({ 
      delay: 0,
      onComplete: () => console.log("Hero animation sequence complete!"),
      onInterrupt: () => console.log("Animation interrupted"),
      onReverseComplete: () => console.log("Animation reversed")
    });

    // ===========================================
    // STEP 1: MINIMAL BLACK SCREEN - NO WAITING
    // ===========================================
    masterTl.set(heroRef.current, { 
      backgroundColor: '#000000',
      opacity: 1 
    })
    .addLabel("blackScreen")

    // ===========================================
    // STEP 2: SAE LETTERS COMPRESS FROM HIGHLY ENLARGED TO CENTER
    // ===========================================
    
    // GTA VI Style: Each letter compresses with individual timing and effects
    .to(saeLetterS.current, {
      duration: 0.8,
      opacity: 1,
      scale: 1,
      rotation: 360,
      ease: "back.out(1.7)"
    }, "+=0.3")
    .to(saeLetterA.current, {
      duration: 0.8,
      opacity: 1,
      scale: 1,
      rotation: -360,
      ease: "back.out(1.7)"
    }, "-=0.6")
    .to(saeLetterE.current, {
      duration: 0.8,
      opacity: 1,
      scale: 1,
      rotation: 360,
      ease: "back.out(1.7)"
    }, "-=0.6")
    .addLabel("compression")

    // Add dynamic pulsing effect like GTA VI
    .to([saeLetterS.current, saeLetterA.current, saeLetterE.current], {
      duration: 0.3,
      scale: 1.1,
      ease: "power2.inOut",
      yoyo: true,
      repeat: 1
    }, "-=0.2")
    
    // Force final scale to be exactly 1 for all letters to ensure consistency
    .set([saeLetterS.current, saeLetterA.current, saeLetterE.current], {
      scale: 1
    })

    // ===========================================
    // STEP 3: IMMEDIATE TEXT AND BACKGROUND - NO WAITING
    // ===========================================
    
    // Show location text IMMEDIATELY after compression
    .to(fullTextRef.current, {
      duration: 0.6,
      opacity: 1,
      y: 0,
      ease: "power2.out"
    }, "-=0.3")
    
    // Add wanted-style stars IMMEDIATELY
    .to(starLineRef.current, {
      duration: 0.4,
      opacity: 1,
      scaleX: 1,
      ease: "back.out(1.7)"
    }, "-=0.4")
    
    // Quick star effect
    .to(starLineRef.current.querySelectorAll('span'), {
      duration: 0.4,
      scale: [1, 1.3, 1],
      rotation: 360,
      ease: "power2.inOut",
      stagger: 0.08
    }, "-=0.3")
    
    // Background fades in IMMEDIATELY - MUCH FASTER
    .to('img[src*="background"]', {
      duration: 0.8,
      opacity: 1,
      ease: "power2.out"
    }, "-=0.8")
    .to('[style*="backgroundImage"]', {
      duration: 0.8,
      opacity: 1,
      ease: "power2.out"
    }, "-=0.8")
    .to(backgroundRef.current, {
      duration: 0.8,
      opacity: 1,
      scale: 1,
      ease: "power2.out"
    }, "-=0.8")
    .addLabel("missionArea")

    // ===========================================
    // STEP 4: HUD ACTIVATION - MUCH FASTER, NO WAITING
    // ===========================================
    
    // Subtitle appears IMMEDIATELY with background
    .to(subtitle, {
      duration: 0.6,
      opacity: 1,
      y: 0,
      scale: 1,
      ease: "power2.out"
    }, "-=0.5")
    .addLabel("objective")

    // HUD elements boot up FAST
    .to(hud, {
      duration: 0.5,
      opacity: 1,
      x: 0,
      ease: "power2.out"
    }, "-=0.3") // HUD
    
    // Minimap appears FAST
    .to(mapRef.current, {
      duration: 0.5,
      opacity: 1,
      scale: 1,
      y: 0,
      ease: "power2.out"
    }, "-=0.4") // Minimap
    
    // Welcome card FAST
    .to('.absolute.top-6.right-6.z-30', {
      duration: 0.4,
      opacity: 1,
      ease: "power2.out"
    }, "-=0.4") // Welcome card
    
    // Bottom fade FAST
    .to('.absolute.bottom-0.left-0.w-full.h-32', {
      duration: 0.4,
      opacity: 1,
      ease: "power2.out"
    }, "-=0.3") // Bottom fade

    // Quick final star glow
    .to(starLineRef.current.querySelectorAll('span'), {
      duration: 0.5,
      scale: 1.15,
      textShadow: "0px 0px 8px #ffff00, 0px 0px 15px #ffff00",
      ease: "power2.inOut",
      stagger: 0.05
    }, "-=0.3")

    .addLabel("missionReady");


    // Pointer hover animation
    gsap.to(pointerRef.current, {
      y: -5,
      duration: 1.2,
      ease: "power2.inOut",
      yoyo: true,
      repeat: -1
    });

    // Radar sweep rotation DISABLED (static minimap)

    // Tooltip hover animations with GSAP
    const handleTooltipShow = () => {
      if (tooltipRef.current) {
        gsap.killTweensOf(tooltipRef.current);
        gsap.to(tooltipRef.current, {
          opacity: 1,
          scale: 1,
          y: -5,
          duration: 0.4,
          ease: "back.out(1.7)"
        });
        // Text typing effect
        const textElement = tooltipRef.current.querySelector('.typewriter-text');
        if (textElement) {
          gsap.set(textElement, { width: 0, overflow: 'hidden', display: 'inline-block' });
          gsap.to(textElement, { 
            width: 'auto', 
            duration: 1.2, 
            ease: "none", 
            delay: 0.3 
          });
        }
      }
    };

    const handleTooltipHide = () => {
      if (tooltipRef.current) {
        gsap.killTweensOf(tooltipRef.current);
        gsap.to(tooltipRef.current, {
          opacity: 0,
          scale: 0.8,
          y: 0,
          duration: 0.2,
          ease: "power2.inOut"
        });
      }
    };

    // Store functions for cleanup
    window.handleTooltipShow = handleTooltipShow;
    window.handleTooltipHide = handleTooltipHide;

    // Parallax scroll effect
    const parallaxTl = gsap.timeline({
      scrollTrigger: {
        trigger: hero,
        start: "top top",
        end: "bottom top",
        scrub: 1,
      }
    });

    parallaxTl.to(background, {
      y: -100,
      scale: 1.1,
      ease: "none"
    });

    // REMOVED: No more jiggling mouse movement for SAE text - keep it simple and stable

    // REMOVED: No more mouse movement listener - keep SAE text stable

    // Removed complex interaction handlers - keep it simple

    return () => {
      // Proper cleanup to prevent crashes
      try {
        if (loadingTl) loadingTl.kill();
        if (masterTl) masterTl.kill(); 
        if (parallaxTl) parallaxTl.kill();
        
        // Kill any remaining star animations
        if (starLineRef.current) {
          gsap.killTweensOf(starLineRef.current.querySelectorAll('span'));
        }
        
        // Cleanup navbar
        if (window.navbarCleanup) {
          window.navbarCleanup();
        }
        
        // No cleanup needed for simplified audio
      } catch (error) {
        console.log("Cleanup error:", error);
      }
    };
  }, [imageLoaded, showMainContent]);


  return (
    <>
      {/* GTA V Audio - AUTO PLAY BY DEFAULT */}
      <audio 
        ref={audioRef} 
        autoPlay
        loop
        preload="auto"
        style={{ display: 'none' }}
        onLoadedData={() => {
          console.log("Audio loaded - attempting to play");
          if (audioRef.current) {
            audioRef.current.play()
              .then(() => {
                console.log("Audio started successfully!");
                setIsAudioPlaying(true);
              })
              .catch(e => {
                console.log("Autoplay blocked by browser:", e.message);
                setIsAudioPlaying(false);
              });
          }
        }}
        onPlay={() => {
          console.log("Audio is playing");
          setIsAudioPlaying(true);
        }}
        onPause={() => {
          console.log("Audio is paused");
          setIsAudioPlaying(false);
        }}
        onError={(e) => console.log("Audio error:", e)}
      >
        <source src="/GTA-V-Welcome-to-Los-Santosx.mp3" type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
      
      {/* Integrated Navbar */}
      <nav 
        ref={navRef}
        className={`fixed top-0 left-0 right-0 z-[9999] transition-all duration-500 border-b border-white/10 overflow-hidden`}
        style={{
          backgroundImage: `url(${background1})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        {/* Background overlay */}
        <div 
          className="absolute inset-0 transition-all duration-500"
          style={{
            background: isScrolled 
              ? 'linear-gradient(135deg, rgba(0,0,0,0.85) 0%, rgba(26,26,26,0.8) 100%)'
              : 'linear-gradient(135deg, rgba(0,0,0,0.7) 0%, rgba(26,26,26,0.6) 100%)',
            backdropFilter: 'blur(8px)'
          }}
        ></div>
        
        <div className="container mx-auto px-6 py-4 relative z-10">
          <div className="flex items-center justify-between">
            
            {/* Left Side - SAE Logo */}
            <div 
              ref={logoRef}
              className="cursor-pointer"
              onClick={() => scrollToSection('#hero', 'hero')}
            >
              <div className="flex items-center space-x-3">
                {/* SAE Badge */}
                <div className="relative">
                  <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded border-2 border-white/30 flex items-center justify-center relative overflow-hidden">
                    <span className="text-black font-black text-lg z-10"
                          style={{ fontFamily: 'Impact, Arial Black, sans-serif' }}>
                      SAE
                    </span>
                    {/* Animated background */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse"></div>
                  </div>
                  {/* Glow effect */}
                  <div className="absolute inset-0 w-12 h-12 bg-yellow-400/30 rounded blur-md animate-pulse"></div>
                </div>
                
                {/* SAE Text */}
                <div>
                  <h1 className="text-2xl font-black tracking-wider text-white"
                      style={{ 
                        fontFamily: 'Impact, Arial Black, sans-serif',
                        textShadow: '2px 2px 0px #000000, -1px -1px 0px #333333'
                      }}>
                    SAE
                  </h1>
                  <p className="text-xs text-gray-300 uppercase tracking-wider font-medium -mt-1"
                     style={{ fontFamily: 'Arial, sans-serif' }}>
                    AUTO EMPIRE
                  </p>
                </div>
              </div>
            </div>

            {/* Right Side - Navigation Buttons */}
            <div className="flex items-center space-x-3">
              {navItems.map((item, index) => {
                const levels = ['Level 2 ★★☆☆☆', 'Level 4 ★★★★☆', 'Level 3 ★★★☆☆', 'Level 5 ★★★★★'];
                const isHovered = hoveredButton === item.id;
                
                return (
                  <div key={item.id} className="relative">
                    <button
                      onClick={() => scrollToSection(item.href, item.id)}
                      onMouseEnter={() => {
                        console.log('Mouse enter:', item.name);
                        setHoveredButton(item.id);
                      }}
                      onMouseLeave={() => {
                        console.log('Mouse leave:', item.name);
                        setHoveredButton(null);
                      }}
                      className={`px-5 py-2.5 font-bold text-xs uppercase tracking-wider transition-all duration-300 border-2 relative overflow-hidden rounded-full ${
                        activeSection === item.id
                          ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white border-blue-400/50 shadow-lg shadow-blue-500/25'
                          : 'bg-black/70 text-gray-300 border-white/20 hover:bg-gradient-to-r hover:from-gray-700 hover:to-gray-600 hover:text-white hover:border-white/40 hover:shadow-lg hover:shadow-white/10'
                      }`}
                      style={{
                        fontFamily: 'Arial, sans-serif',
                        textShadow: '1px 1px 2px rgba(0, 0, 0, 0.8)',
                        backdropFilter: 'blur(10px)'
                      }}
                    >
                      {/* Button shine effect */}
                      <div className={`absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform transition-transform duration-500 rounded-full ${
                        isHovered ? 'translate-x-full' : '-translate-x-full'
                      }`}></div>
                      
                      {/* Button text */}
                      <span className="relative z-10">{item.name}</span>
                      
                      {/* Active indicator */}
                      {activeSection === item.id && (
                        <div className="absolute inset-0 rounded-full border-2 border-white/30 animate-pulse"></div>
                      )}
                    </button>

                    {/* Level Tooltip - Fixed Position */}
                    {isHovered && (
                      <div 
                        className="fixed bg-yellow-400 text-black px-4 py-3 rounded-lg border-2 border-black text-sm font-bold shadow-xl pointer-events-none whitespace-nowrap"
                        style={{ 
                          zIndex: 10001,
                          top: '80px',
                          left: '50%',
                          transform: 'translateX(-50%)'
                        }}
                      >
                        <div className="flex items-center space-x-2">
                          <span className="text-black font-bold">{levels[index]}</span>
                        </div>
                        {/* Tooltip arrow */}
                        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-b-8 border-transparent border-b-yellow-400"></div>
                      </div>
                    )}
                  </div>
                );
              })}

              {/* Contact CTA Button */}
              <div className="relative ml-2">
                <button
                  onClick={() => scrollToSection('#contact', 'contact')}
                  onMouseEnter={() => {
                    console.log('Mouse enter: CONTACT HQ');
                    setHoveredButton('contact');
                  }}
                  onMouseLeave={() => {
                    console.log('Mouse leave: CONTACT HQ');
                    setHoveredButton(null);
                  }}
                  className="px-5 py-2.5 font-bold text-xs uppercase tracking-wider bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white border-2 border-red-400/50 hover:border-red-300/70 transition-all duration-300 relative overflow-hidden rounded-full shadow-lg shadow-red-500/25 hover:shadow-red-500/40"
                  style={{
                    fontFamily: 'Arial, sans-serif',
                    textShadow: '1px 1px 2px rgba(0, 0, 0, 0.8)',
                    backdropFilter: 'blur(10px)'
                  }}
                >
                  {/* Button shine effect */}
                  <div className={`absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform transition-transform duration-500 rounded-full ${
                    hoveredButton === 'contact' ? 'translate-x-full' : '-translate-x-full'
                  }`}></div>
                  <span className="relative z-10">CONTACT HQ</span>
                </button>

                {/* Level Tooltip for Contact - Fixed Position */}
                {hoveredButton === 'contact' && (
                  <div 
                    className="fixed bg-red-400 text-white px-4 py-3 rounded-lg border-2 border-black text-sm font-bold shadow-xl pointer-events-none whitespace-nowrap"
                    style={{ 
                      zIndex: 10001,
                      top: '80px',
                      left: '50%',
                      transform: 'translateX(-50%)'
                    }}
                  >
                    <div className="flex items-center space-x-2">
                      <span className="text-white font-bold">Level 1 ★☆☆☆☆</span>
                    </div>
                    {/* Tooltip arrow */}
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-b-8 border-transparent border-b-red-400"></div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom border with animated gradient */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
        
        {/* Animated scanline effect */}
        <div className="absolute bottom-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-blue-400/60 to-transparent animate-pulse" 
             style={{ animationDuration: '3s' }}></div>
      </nav>

      {/* Authentic GTA V Loading Screen */}
      {isLoading && (
        <div 
          ref={loadingRef}
          className="fixed inset-0 z-50 flex items-center justify-center"
          style={{
            background: 'linear-gradient(135deg, #000000 0%, #1a1a1a 50%, #000000 100%)'
          }}
        >
          <div className="text-center max-w-2xl px-8">
            {/* GTA V Style Logo */}
            <div className="mb-12">
              <h1 className="text-8xl font-black tracking-wider mb-4"
                  style={{
                    fontFamily: 'Impact, Arial Black, sans-serif',
                    color: '#ffffff',
                    textShadow: '3px 3px 0px #000000, -1px -1px 0px #000000, 1px -1px 0px #000000, -1px 1px 0px #000000'
                  }}>
                SAE
              </h1>
              <p className="text-2xl font-bold text-gray-300 tracking-widest"
                 style={{ fontFamily: 'Arial, sans-serif' }}>
                AUTO EMPIRE
              </p>
            </div>

            {/* Loading Bar */}
            <div className="mb-8">
              <div className="w-full h-2 bg-gray-800 rounded-full border border-gray-600">
                <div 
                  className="loading-bar-fill h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"
                  style={{ width: '0%' }}
                ></div>
              </div>
            </div>

            {/* Loading Text */}
            <p className="loading-text text-gray-400 text-lg font-medium"
               style={{ fontFamily: 'Arial, sans-serif' }}>
              Loading Los Santos Auto Empire...
            </p>

            {/* Copyright */}
            <p className="text-gray-600 text-sm mt-8"
               style={{ fontFamily: 'Arial, sans-serif' }}>
              Society of Automotive Engineers © 2024
            </p>
          </div>
        </div>
      )}

      {/* Navbar Spacer */}
      <div className="h-20"></div>
      
      {/* SAE Text Mask Reveal Animation - Like GTA VI */}
      {!showMainContent && (
        <div className="fixed inset-0 z-[100] bg-black flex items-center justify-center">
          <svg 
            ref={saeMaskRef}
            viewBox="0 0 1200 800" 
            className="w-full h-full"
            preserveAspectRatio="xMidYMid slice"
            style={{
              imageRendering: 'auto',
              shapeRendering: 'geometricPrecision',
              textRendering: 'geometricPrecision'
            }}
          >
            <defs>
              <mask id="saeMask">
                <rect width="100%" height="100%" fill="black" />
                <g className="sae-mask-group" style={{ transformOrigin: '50% 50%' }}>
                  <text
                    x="600"
                    y="400"
                    fontSize="300"
                    fontFamily="Impact, Arial Black, sans-serif"
                    textAnchor="middle"
                    dominantBaseline="central"
                    fill="white"
                    fontWeight="900"
                    letterSpacing="0.1em"
                    style={{
                      filter: 'none',
                      textShadow: 'none',
                      fontSmooth: 'always',
                      WebkitFontSmoothing: 'antialiased'
                    }}
                  >
                    SAE
                  </text>
                </g>
              </mask>
            </defs>
            <image
              href={background1}
              width="100%"
              height="100%"
              mask="url(#saeMask)"
            />
          </svg>
        </div>
      )}

      {/* Main Hero Section */}
      <section 
        id="hero"
        ref={heroRef}
        className="relative h-screen overflow-hidden"
        style={{ 
          opacity: showMainContent ? 1 : 0,
          transition: 'opacity 0.1s ease-out'
        }}
      >
        {/* Background Image with Blur */}
        <img 
          src={background1} 
          alt="Background" 
          className="absolute inset-0 w-full h-full object-cover"
          style={{
            filter: 'blur(2px)',
            transform: 'scale(1.05)',
            zIndex: 1
          }}
          onLoad={() => console.log('Hero background image loaded successfully!')}
          onError={(e) => {
            console.error('Hero background image failed to load:', background1);
            console.error('Error event:', e);
          }}
        />
        
        {/* Fallback background if image fails */}
        <div 
          className="absolute inset-0 w-full h-full"
          style={{
            backgroundImage: `url(${background1})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center center',
            backgroundRepeat: 'no-repeat',
            backgroundColor: '#2a2a2a',
            zIndex: 0
          }}
        ></div>
        {/* Animated Background Layer for Effects */}
        <div 
          ref={backgroundRef}
          className="absolute inset-0 w-full h-full"
          style={{
            opacity: 0,
            transform: 'scale(1.1)',
            zIndex: 2
          }}
        />

        {/* Subtle overlay to enhance readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-black/20" style={{ zIndex: 5 }} />

        {/* Black Rounded MUTE Button - Always Visible */}
        <div className="absolute top-6 left-1/2 transform -translate-x-1/2 z-30">
          <button
            onClick={() => {
              if (audioRef.current) {
                console.log("Button clicked, current state:", {
                  isAudioPlaying: isAudioPlaying,
                  paused: audioRef.current.paused,
                  currentTime: audioRef.current.currentTime
                });
                
                // Simple toggle: if playing, pause. If paused, play.
                if (isAudioPlaying) {
                  // User wants to mute
                  audioRef.current.pause();
                  setIsAudioPlaying(false);
                  console.log("Audio muted");
                } else {
                  // User wants to unmute
                  audioRef.current.play()
                    .then(() => {
                      setIsAudioPlaying(true);
                      console.log("Audio unmuted");
                    })
                    .catch(e => console.log("Audio play failed:", e));
                }
              }
            }}
            className="bg-black text-white px-6 py-3 rounded-full border-2 border-white/20 hover:border-white/40 transition-all duration-300 flex items-center space-x-2 shadow-xl hover:shadow-white/10 hover:scale-105"
            style={{
              fontFamily: 'Impact, Arial Black, sans-serif',
              textShadow: '1px 1px 2px rgba(0, 0, 0, 0.8)'
            }}
          >
            <span className="text-white font-bold text-sm uppercase tracking-wider">
              {isAudioPlaying ? 'MUTE' : 'UNMUTE'}
            </span>
            <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
              <span className="text-white font-black text-xs">
                {isAudioPlaying ? '🔊' : '🔇'}
              </span>
            </div>
          </button>
        </div>

        {/* Clean HUD - Top Left with Transparency */}
        <div 
          ref={hudRef}
          className="absolute top-6 left-6 z-20 opacity-0"
          style={{ transform: 'translateX(-100px)' }}
        >
          <div className="bg-black/40 backdrop-blur-md rounded-xl p-5 border border-white/20 shadow-2xl">
            <div className="flex items-center space-x-4 text-white">
              <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center border-2 border-white/30 shadow-lg">
                <span className="text-black font-bold text-sm">SAE</span>
              </div>
              <div>
                <div className="text-white font-semibold text-sm tracking-wide">Madan Mohan</div>
                <div className="text-gray-200 text-sm">Malviya University</div>
                <div className="text-yellow-400 text-xs font-medium tracking-wide">Auto Empire</div>
              </div>
            </div>
            
            <div className="mt-4 pt-3 border-t border-white/20 flex items-center justify-between">
              <div>
                <div className="text-green-400 font-mono text-xl font-bold bg-green-400/10 px-3 py-1 rounded border border-green-400/30">₹2,54,78,910</div>
                <div className="text-gray-300 text-xs font-medium uppercase tracking-wider mt-1">Total Funding</div>
              </div>
              <div className="flex flex-col items-center">
                <div className="flex space-x-1 mb-1">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-yellow-400 text-lg drop-shadow-lg animate-pulse" style={{ animationDelay: `${i * 0.2}s` }}>★</span>
                  ))}
                </div>
                <div className="text-yellow-400 text-xs font-bold tracking-wider">ELITE STATUS</div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="relative flex flex-col items-center justify-center h-full text-center px-4" style={{ zIndex: 20 }}>
          
          {/* Animated SAE Title */}
          <div className="relative mb-8">
            {/* LARGE SAE Letters - FIXED SIZE */}
            <div className="flex justify-center items-center space-x-4 mb-6">
              <span 
                ref={saeLetterS}
                className="font-black opacity-0"
                style={{
                  fontFamily: 'Impact, Arial Black, sans-serif',
                  color: '#ffffff',
                  textShadow: '4px 4px 0px #000000, -2px -2px 0px #333333, 2px -2px 0px #333333, -2px 2px 0px #333333',
                  letterSpacing: '0.05em',
                  transform: 'skewX(-5deg)',
                  fontSize: '12rem',
                  lineHeight: '1'
                }}
              >
                S
              </span>
              <span 
                ref={saeLetterA}
                className="font-black opacity-0"
                style={{
                  fontFamily: 'Impact, Arial Black, sans-serif',
                  color: '#ffffff',
                  textShadow: '4px 4px 0px #000000, -2px -2px 0px #333333, 2px -2px 0px #333333, -2px 2px 0px #333333',
                  letterSpacing: '0.05em',
                  transform: 'skewX(-5deg)',
                  fontSize: '12rem',
                  lineHeight: '1'
                }}
              >
                A
              </span>
              <span 
                ref={saeLetterE}
                className="font-black opacity-0"
                style={{
                  fontFamily: 'Impact, Arial Black, sans-serif',
                  color: '#ffffff',
                  textShadow: '4px 4px 0px #000000, -2px -2px 0px #333333, 2px -2px 0px #333333, -2px 2px 0px #333333',
                  letterSpacing: '0.05em',
                  transform: 'skewX(-5deg)',
                  fontSize: '12.5rem',
                  lineHeight: '1'
                }}
              >
                E
              </span>
            </div>

            {/* Expanding Definitions */}
            <div 
              ref={saeDefinitions}
              className="absolute top-full left-1/2 transform -translate-x-1/2 text-center opacity-0 w-full"
            >
              <div className="definition-s opacity-0 transform translate-y-10 mb-2">
                <span className="text-2xl md:text-3xl font-bold"
                      style={{ 
                        fontFamily: 'Impact, Arial Black, sans-serif', 
                        letterSpacing: '0.1em',
                        color: '#ffffff',
                        textShadow: '2px 2px 0px #000000, -1px -1px 0px #333333, 0px 0px 8px rgba(255,255,255,0.5)',
                        transform: 'skewX(-3deg)'
                      }}>
                  SOCIETY
                </span>
              </div>
              <div className="definition-a opacity-0 transform translate-y-10 mb-2">
                <span className="text-2xl md:text-3xl font-bold"
                      style={{ 
                        fontFamily: 'Impact, Arial Black, sans-serif', 
                        letterSpacing: '0.1em',
                        color: '#ffffff',
                        textShadow: '2px 2px 0px #000000, -1px -1px 0px #333333, 0px 0px 8px rgba(255,255,255,0.5)',
                        transform: 'skewX(-3deg)'
                      }}>
                  AUTOMOTIVE
                </span>
              </div>
              <div className="definition-e opacity-0 transform translate-y-10">
                <span className="text-2xl md:text-3xl font-bold"
                      style={{ 
                        fontFamily: 'Impact, Arial Black, sans-serif', 
                        letterSpacing: '0.1em',
                        color: '#ffffff',
                        textShadow: '2px 2px 0px #000000, -1px -1px 0px #333333, 0px 0px 8px rgba(255,255,255,0.5)',
                        transform: 'skewX(-3deg)'
                      }}>
                  ENGINEERS
                </span>
              </div>
            </div>

            {/* Full Text Below SAE */}
            <div 
              ref={fullTextRef}
              className="mb-6 opacity-0"
            >
              <h3 className="text-xl md:text-2xl font-bold tracking-wider"
                  style={{
                    fontFamily: 'Impact, Arial Black, sans-serif',
                    color: '#ffffff',
                    textShadow: '2px 2px 0px #000000, -1px -1px 0px #333333, 0px 0px 8px rgba(255,255,255,0.4)',
                    letterSpacing: '0.1em',
                    transform: 'skewX(-2deg)'
                  }}>
                SOCIETY OF AUTOMOTIVE ENGINEERS
              </h3>
            </div>

            {/* Star Line Decoration */}
            <div 
              ref={starLineRef}
              className="flex justify-center items-center mt-4 opacity-0 transform scale-x-0"
            >
              <div className="flex items-center space-x-3">
                <span className="text-2xl animate-pulse" style={{ 
                  color: '#ffffff',
                  textShadow: '2px 2px 0px #000000, 0px 0px 6px rgba(255,255,255,0.6)'
                }}>★</span>
                <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-white to-transparent opacity-60"></div>
                <span className="text-3xl animate-pulse" style={{ 
                  animationDelay: '0.3s',
                  color: '#ffffff',
                  textShadow: '2px 2px 0px #000000, 0px 0px 6px rgba(255,255,255,0.6)'
                }}>★</span>
                <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-white to-transparent opacity-60"></div>
                <span className="text-2xl animate-pulse" style={{ 
                  animationDelay: '0.6s',
                  color: '#ffffff',
                  textShadow: '2px 2px 0px #000000, 0px 0px 6px rgba(255,255,255,0.6)'
                }}>★</span>
              </div>
            </div>

            {/* Hidden title for GSAP reference */}
            <h1 ref={titleRef} className="opacity-0 absolute">SAE</h1>
          </div>
          
          {/* Clean Subtitle */}
          <h2 
            ref={subtitleRef}
            className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-widest mb-8 opacity-0"
            style={{
              fontFamily: 'Arial, sans-serif',
              color: '#ffffff',
              textShadow: '2px 2px 4px rgba(0, 0, 0, 0.8)',
              transform: 'translateY(30px)'
            }}
          >
            AUTO EMPIRE
          </h2>
          
          {/* Description */}
          <p className="text-xl md:text-2xl text-white mb-12 max-w-4xl leading-relaxed font-medium"
             style={{ 
               textShadow: '1px 1px 2px rgba(0, 0, 0, 0.8)',
               fontFamily: 'Arial, sans-serif'
             }}>
            Welcome to Los Santos' most elite automotive engineering crew. 
            Where cutting-edge technology meets street racing culture in the neon-soaked nights of Vice City.
          </p>
          
        </div>


        {/* REAL GTA 5 MINIMAP - SATELLITE VIEW (NOT RADAR!) */}
        <div 
          ref={mapRef}
          className="absolute bottom-6 left-6 z-20 opacity-0"
          style={{ 
            transform: 'translateY(100px) scale(0.8)'
          }}
        >
          {/* TRANSPARENT RECTANGULAR MINIMAP CONTAINER */}
          <div className="w-64 h-48 relative overflow-hidden"
               style={{
                 borderRadius: '12px',
                 border: '2px solid rgba(255, 255, 255, 0.2)',
                 boxShadow: `
                   0 0 30px rgba(0, 0, 0, 0.7),
                   inset 0 0 12px rgba(0, 0, 0, 0.4)
                 `,
                 backgroundColor: 'rgba(0, 0, 0, 0.3)',
                 backdropFilter: 'blur(8px)'
               }}>
            
            {/* REAL GTA 5 MINIMAP - EXACT REPLICA */}
            <div 
              className="absolute inset-0 w-full h-full"
              style={{
                backgroundImage: `url("data:image/svg+xml,${encodeURIComponent(`
                  <svg viewBox="0 0 256 192" xmlns="http://www.w3.org/2000/svg">
                    <!-- DARK SATELLITE BASE -->
                    <rect width="256" height="192" fill="#1a1a1a"/>
                    
                    <!-- WATER AREAS - VERY DARK -->
                    <rect x="0" y="0" width="256" height="85" fill="#0f0f0f"/>
                    <path d="M0,85 Q60,75 120,80 Q180,85 256,75 L256,0 L0,0 Z" fill="#0f0f0f"/>
                    
                    <!-- LAND MASS - DARK GRAY -->
                    <path d="M0,85 Q60,75 120,80 Q180,85 256,75 L256,192 L0,192 Z" fill="#2a2a2a"/>
                    
                    <!-- URBAN AREAS - DARKER CONCRETE -->
                    <rect x="100" y="110" width="50" height="40" fill="#333333" opacity="0.8"/>
                    <rect x="75" y="135" width="35" height="30" fill="#333333" opacity="0.7"/>
                    
                    <!-- HIGHWAYS - GRAY WITH WHITE LINES -->
                    <g>
                      <!-- Main intersection roads -->
                      <rect x="70" y="117" width="120" height="6" fill="#444444"/>
                      <rect x="125" y="60" width="6" height="110" fill="#444444"/>
                      
                      <!-- White road markings -->
                      <line x1="75" y1="120" x2="185" y2="120" stroke="white" stroke-width="1"/>
                      <line x1="128" y1="65" x2="128" y2="165" stroke="white" stroke-width="1"/>
                      
                      <!-- Additional roads -->
                      <rect x="40" y="147" width="160" height="4" fill="#444444"/>
                      <line x1="45" y1="149" x2="195" y2="149" stroke="white" stroke-width="0.5"/>
                      
                      <rect x="95" y="85" width="4" height="60" fill="#444444"/>
                      <line x1="97" y1="90" x2="97" y2="140" stroke="white" stroke-width="0.5"/>
                    </g>
                    
                    <!-- HIGHWAY OVERPASS -->
                    <rect x="122" y="115" width="12" height="10" fill="#555555" rx="1"/>
                    
                    <!-- AIRPORT AREA -->
                    <rect x="35" y="160" width="55" height="25" fill="#2a2a2a"/>
                    <rect x="45" y="170" width="35" height="3" fill="#444444"/>
                    <line x1="50" y1="171.5" x2="75" y2="171.5" stroke="white" stroke-width="1"/>
                    
                    <!-- VEGETATION/HILLS - SUBTLE -->
                    <ellipse cx="110" cy="85" rx="25" ry="15" fill="#252525" opacity="0.6"/>
                    <ellipse cx="180" cy="95" rx="30" ry="20" fill="#252525" opacity="0.5"/>
                    
                  </svg>
                `)}")`,
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                filter: 'brightness(0.6) contrast(1.2) saturate(0.7)'
              }}
            ></div>
            
            {/* GTA 5 AUTHENTIC UI ELEMENTS */}
            <div className="absolute inset-0 pointer-events-none">
              {/* Simple Compass - Just like reference */}
              <div className="absolute bottom-4 left-4 w-6 h-6 bg-green-600 flex items-center justify-center text-white text-xs font-bold border border-black"
                   style={{ boxShadow: '0 0 0 1px rgba(255,255,255,0.8)' }}>
                N
              </div>
              
              {/* Map icons in bottom right - like reference */}
              <div className="absolute bottom-4 right-4 w-6 h-6 bg-blue-600 flex items-center justify-center text-white text-xs font-bold border border-black"
                   style={{ boxShadow: '0 0 0 1px rgba(255,255,255,0.8)' }}>
                📱
              </div>
              
              {/* NO GRID LINES - Clean like real GTA 5 */}
            </div>
            
            {/* PLAYER POSITION - WHITE TRIANGLE */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none z-30">
              <div style={{
                width: '0',
                height: '0',
                borderLeft: '8px solid transparent',
                borderRight: '8px solid transparent', 
                borderBottom: '16px solid #ffffff',
                filter: 'drop-shadow(0 0 8px rgba(255, 255, 255, 1)) drop-shadow(0 2px 6px rgba(0, 0, 0, 0.9))',
                transform: 'rotate(0deg)'
              }}></div>
            </div>
            
            {/* AUTHENTIC GTA 5 BLIPS - EXACT STYLE */}
            
            {/* SAE HQ - YELLOW BLIP (Mission/Important) */}
            <div 
              ref={pointerRef}
              className="absolute cursor-pointer z-20"
              style={{ top: '62%', left: '50%', transform: 'translate(-50%, -50%)' }}
              onMouseEnter={() => {
                setShowTooltip(true);
                if (window.handleTooltipShow) window.handleTooltipShow();
              }}
              onMouseLeave={() => {
                setShowTooltip(false);
                if (window.handleTooltipHide) window.handleTooltipHide();
              }}
            >
              <div className="w-3 h-3 bg-yellow-400 rounded-full border border-black"
                   style={{ boxShadow: '0 0 0 1px rgba(255,255,255,0.8)' }}>
                <div className="absolute inset-0 flex items-center justify-center text-xs font-black text-black">S</div>
              </div>
            </div>
            
            {/* RED BLIP - Race/Challenge */}
            <div className="absolute top-[45%] left-[58%] w-2.5 h-2.5 bg-red-500 rounded-full border border-black"
                 style={{ boxShadow: '0 0 0 1px rgba(255,255,255,0.8)' }}
                 title="Street Race"></div>
            
            {/* GREEN BLIP - Shop/Service */}
            <div className="absolute top-[70%] left-[55%] w-2.5 h-2.5 bg-green-500 rounded-full border border-black"
                 style={{ boxShadow: '0 0 0 1px rgba(255,255,255,0.8)' }}
                 title="Mod Shop"></div>
            
            {/* BLUE BLIP - Special Location */}
            <div className="absolute top-[55%] left-[45%] w-2.5 h-2.5 bg-blue-500 rounded-full border border-black"
                 style={{ boxShadow: '0 0 0 1px rgba(255,255,255,0.8)' }}
                 title="Garage"></div>
                 
            {/* PINK BLIP - Custom/Unique */}
            <div className="absolute top-[65%] left-[42%] w-2.5 h-2.5 bg-pink-500 rounded-full border border-black"
                 style={{ boxShadow: '0 0 0 1px rgba(255,255,255,0.8)' }}
                 title="Benny's"></div>
                 
            {/* WHITE BLIP - Misc Location */}
            <div className="absolute top-[40%] left-[75%] w-2 h-2 bg-white rounded-full border border-black"
                 style={{ boxShadow: '0 0 0 1px rgba(0,0,0,0.5)' }}
                 title="Airfield"></div>
            
          </div>
          
          {/* REMOVED - No hover text on minimap */}
          
          {/* SAE HQ TOOLTIP - ONLY SHOWS ON SAE HQ HOVER */}
          <div 
            ref={tooltipRef}
            className="fixed top-20 left-1/2 transform -translate-x-1/2 bg-black/90 backdrop-blur-sm text-white px-6 py-3 rounded-lg border border-white/30 whitespace-nowrap text-sm font-medium opacity-0 scale-0 transition-all duration-300 pointer-events-none z-50"
            style={{ fontFamily: 'Arial, sans-serif' }}
          >
            <div className="flex items-center space-x-3">
              <span className="text-yellow-400 text-lg">🏛️</span>
              <span className="font-bold tracking-wide">MADAN MOHAN MALVIYA UNIVERSITY OF TECHNOLOGY</span>
            </div>
          </div>
        </div>

        {/* Welcome Character Card - Top Right */}
        <div className="absolute top-6 right-6 z-30">
          <div className="bg-black/80 backdrop-blur-md rounded-lg p-4 border-2 border-black/60 w-80 transform hover:scale-105 transition-all duration-300 shadow-2xl">
            {/* Header */}
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-12 h-12 bg-gradient-to-br from-gray-700 to-black rounded-full flex items-center justify-center border border-white/20">
                <span className="text-white font-black text-lg">👥</span>
              </div>
              <div>
                <h3 className="text-white font-bold text-sm tracking-wider"
                    style={{ fontFamily: 'Bebas Neue, Impact, Arial Black, sans-serif', letterSpacing: '0.1em' }}>
                  WELCOME EVERYONE!
                </h3>
                <p className="text-gray-300 text-xs font-medium"
                   style={{ fontFamily: 'Arial, sans-serif' }}>
                  Society of Automotive Engineers
                </p>
              </div>
            </div>
            
            {/* Welcome Message */}
            <div className="mb-4">
              <p className="text-white text-sm leading-relaxed font-medium"
                 style={{ fontFamily: 'Arial, sans-serif' }}>
                Welcome to our elite automotive empire! Your reputation precedes you in Los Santos.
              </p>
            </div>
            
            {/* Client Level */}
            <div className="border-t border-black/30 pt-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-xs uppercase tracking-wider font-bold"
                     style={{ fontFamily: 'Arial, sans-serif' }}>Your Level</p>
                  <p className="text-white font-bold text-lg"
                     style={{ fontFamily: 'Orbitron, Exo 2, Arial Black, sans-serif', letterSpacing: '0.05em' }}>STREET LEGEND</p>
                </div>
                <div className="text-right">
                  <div className="flex space-x-1 mb-1">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className={`text-lg ${
                        i < 4 ? 'text-yellow-400' : 'text-gray-600'
                      }`}>★</span>
                    ))}
                  </div>
                  <p className="text-yellow-400 text-xs font-bold"
                     style={{ fontFamily: 'Arial, sans-serif' }}>4/5 STARS</p>
                </div>
              </div>
            </div>
            
            {/* Pulsing Border Effect */}
            <div className="absolute inset-0 border-2 border-black/20 rounded-lg animate-pulse pointer-events-none"></div>
          </div>
        </div>

        {/* Bottom fade to black for smooth transition */}
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black to-transparent" />


      </section>
    </>
  );
};

export default Hero;