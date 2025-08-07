import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Import the Trevor background
import background2 from '../assets/background (2).jpg'; // Trevor with palm trees

const About = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const cardsRef = useRef(null);
  const backgroundRef = useRef(null);
  const [hoveredCard, setHoveredCard] = useState(null);

  // Clean crew data with authentic names
  const crewMembers = [
    {
      id: 1,
      name: "ALEX RODRIGUEZ",
      nickname: "TURBO",
      role: "Crew Leader",
      specialty: "Engine Architecture",
      stats: { respect: 98, skill: 95, experience: 92 },
      bio: "Former street racer turned engineering mastermind. Built his first turbocharged engine at 16 in the backstreets of Los Santos. Known for creating the fastest quarter-mile beasts in the city.",
      backstory: "Grew up in the underground racing scene of East Los Santos. After a close call with the law during a midnight run, he channeled his need for speed into engineering excellence, founding SAE Auto Empire.",
      achievements: ["Los Santos Speed King 2023", "Built the 'Phoenix' - 1500HP Beast", "SAE Empire Founder"],
      expertise: ["Twin-Turbo Systems", "ECU Programming", "Street Racing Builds"]
    },
    {
      id: 2,
      name: "MAYA CHEN", 
      nickname: "CIRCUIT",
      role: "Tech Specialist",
      specialty: "Electronics & AI",
      stats: { respect: 94, skill: 98, experience: 88 },
      bio: "PhD in Electrical Engineering from Los Santos University. Pioneered the first AI-assisted tuning system that revolutionized ECU programming in the underground scene.",
      backstory: "Former tech prodigy who built supercomputers in her basement at age 12. Joined SAE to bring cutting-edge AI and neural networks to street racing culture.",
      achievements: ["Created 'Neural Tune' AI System", "LS Tech Innovation Award", "Published 20+ Research Papers"],
      expertise: ["AI Neural Networks", "ECU Programming", "Quantum Computing"]
    },
    {
      id: 3,
      name: "JAKE MARTINEZ",
      nickname: "DRIFT", 
      role: "Handling Expert",
      specialty: "Suspension & Dynamics",
      stats: { respect: 91, skill: 96, experience: 94 },
      bio: "Professional drift champion with over 100 competition wins across Los Santos. Master of vehicle dynamics who can make any car dance through corners with precision.",
      backstory: "Started drifting in abandoned parking lots at 15. Rose through underground racing ranks to become the undisputed Drift King before joining SAE.",
      achievements: ["Los Santos Drift Champion 5x", "Built 'Samurai' - Perfect Drift Machine", "World Record: 360° Drift Chain"],
      expertise: ["Drift Engineering", "Suspension Design", "Aerodynamic Balance"]
    },
    {
      id: 4,
      name: "SARAH WILLIAMS",
      nickname: "NITRO",
      role: "Power Systems",
      specialty: "Forced Induction",
      stats: { respect: 89, skill: 94, experience: 90 },
      bio: "Former NASA rocket scientist turned nitrous oxide specialist. Her chemical engineering background allows her to create the most potent and reliable power adders in the industry.",
      backstory: "Ex-NASA engineer who got bored launching rockets and decided to make cars fly instead. Her nitrous systems are legendary for their precision and power.",
      achievements: ["NASA Engineer (Retired)", "Built 'Nebula' - 2500HP Monster", "Zero System Failures in 10 Years"],
      expertise: ["Nitrous Chemistry", "Rocket Fuel Systems", "Chemical Engineering"]
    },
    {
      id: 5,
      name: "CARLOS GARCIA",
      nickname: "METAL",
      role: "Fabrication Master", 
      specialty: "Custom Manufacturing",
      stats: { respect: 96, skill: 92, experience: 98 },
      bio: "Master fabricator whose welding skills are considered high art in Los Santos' underground scene. Can create anything from roll cages to exhaust systems with precision.",
      backstory: "Fourth-generation metalworker who learned the sacred art from his great-grandfather. Joined SAE to push the boundaries of automotive sculpture.",
      achievements: ["Master Welder Certification", "Built 'Symphony' - Art Car", "30+ Years Zero Failures"],
      expertise: ["TIG Welding", "CNC Machining", "Metal Sculpture"]
    },
    {
      id: 6,
      name: "ZARA JOHNSON",
      nickname: "DATA",
      role: "Research Director",
      specialty: "Aerodynamics & Analytics", 
      stats: { respect: 87, skill: 97, experience: 85 },
      bio: "MIT PhD in Aerodynamics with specialization in computational fluid dynamics. Her simulations have revolutionized how SAE approaches vehicle design.",
      backstory: "Former Formula 1 aerodynamicist who left the corporate world to democratize advanced automotive technology for street racing culture.",
      achievements: ["MIT PhD in Aerodynamics", "Ex-Formula 1 Engineer", "Published 100+ Research Papers"],
      expertise: ["CFD Analysis", "Wind Tunnel Testing", "Performance Analytics"]
    }
  ];

  useEffect(() => {
    const section = sectionRef.current;
    const title = titleRef.current;
    const cards = cardsRef.current;
    const background = backgroundRef.current;

    // Background fade in
    gsap.fromTo(background,
      { opacity: 0, scale: 1.1 },
      {
        opacity: 1,
        scale: 1,
        duration: 2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      }
    );

    // Clean title entrance
    gsap.fromTo(title, 
      { opacity: 0, y: 60 },
      {
        opacity: 1,
        y: 0,
        duration: 1.5,
        ease: "power3.out",
        scrollTrigger: {
          trigger: section,
          start: "top 70%",
          toggleActions: "play none none reverse"
        }
      }
    );

    // Cards stagger animation
    const cardElements = cards.children;
    
    gsap.fromTo(cardElements,
      { opacity: 0, y: 80, scale: 0.9 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1.2,
        ease: "power3.out",
        stagger: {
          each: 0.2,
          from: "start"
        },
        scrollTrigger: {
          trigger: cards,
          start: "top 85%",
          toggleActions: "play none none reverse"
        }
      }
    );

    // Parallax effect
    gsap.to(background, {
      y: -50,
      scale: 1.05,
      ease: "none",
      scrollTrigger: {
        trigger: section,
        start: "top bottom",
        end: "bottom top",
        scrub: 1
      }
    });

  }, []);

  const StatBar = ({ label, value, color, delay = 0 }) => {
    const barRef = useRef(null);

    useEffect(() => {
      if (hoveredCard !== null) {
        gsap.fromTo(barRef.current,
          { width: "0%" },
          { 
            width: `${value}%`, 
            duration: 1.5, 
            delay: delay,
            ease: "power2.out" 
          }
        );
      }
    }, [hoveredCard, value, delay]);

    return (
      <div className="mb-3">
        <div className="flex justify-between text-sm text-gray-300 mb-1 font-medium">
          <span className="tracking-wider uppercase">{label}</span>
          <span className="text-white font-bold">{value}%</span>
        </div>
        <div className="w-full bg-black/30 rounded-full h-3 border border-white/20 overflow-hidden backdrop-blur-sm">
          <div 
            ref={barRef}
            className={`h-full rounded-full ${color} relative overflow-hidden`}
            style={{ width: "0%" }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse"></div>
          </div>
        </div>
      </div>
    );
  };

  const CrewCard = ({ member, index }) => {
    const cardRef = useRef(null);
    const [flipped, setFlipped] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseEnter = () => {
      setIsHovered(true);
      setHoveredCard(member.id);
      
      gsap.to(cardRef.current, {
        y: -10,
        scale: 1.02,
        duration: 0.3,
        ease: "power2.out"
      });
    };

    const handleMouseLeave = () => {
      setIsHovered(false);
      setHoveredCard(null);
      
      gsap.to(cardRef.current, {
        y: 0,
        scale: 1,
        duration: 0.3,
        ease: "power2.out"
      });
    };

    const flipCard = () => {
      setFlipped(!flipped);
      gsap.to(cardRef.current, {
        rotationY: !flipped ? 180 : 0,
        duration: 0.6,
        ease: "power2.inOut"
      });
    };

    return (
      <div 
        ref={cardRef}
        className="relative cursor-pointer transform-gpu"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={flipCard}
        style={{ 
          transformStyle: 'preserve-3d',
          perspective: '1000px'
        }}
      >
        {/* Card Container */}
        <div className="bg-black/60 backdrop-blur-md rounded-lg border border-white/20 overflow-hidden">
          
          {/* Front Side */}
          <div className={`p-6 transition-all duration-500 ${
            flipped ? 'opacity-0 pointer-events-none' : 'opacity-100'
          }`}>
            
            {/* Header */}
            <div className="text-center mb-6">
              <h3 className="text-2xl font-black tracking-wider text-white mb-1"
                  style={{ fontFamily: 'Impact, Arial Black, sans-serif' }}>
                {member.name}
              </h3>
              <p className="text-blue-400 font-bold text-sm tracking-widest uppercase mb-1">
                "{member.nickname}"
              </p>
              <p className="text-gray-300 text-sm font-medium">
                {member.role}
              </p>
              <p className="text-gray-400 text-xs italic">
                {member.specialty}
              </p>
            </div>
            
            {/* Stats */}
            <div className="space-y-3 mb-6">
              <StatBar 
                label="RESPECT" 
                value={member.stats.respect} 
                color="bg-gradient-to-r from-red-500 to-red-600"
                delay={0.2}
              />
              <StatBar 
                label="SKILL" 
                value={member.stats.skill} 
                color="bg-gradient-to-r from-blue-500 to-blue-600"
                delay={0.4}
              />
              <StatBar 
                label="EXPERIENCE" 
                value={member.stats.experience} 
                color="bg-gradient-to-r from-green-500 to-green-600"
                delay={0.6}
              />
            </div>
            
            {/* Bio (shows on hover) */}
            <div className={`transition-all duration-500 overflow-hidden ${
              isHovered ? 'max-h-32 opacity-100' : 'max-h-0 opacity-0'
            }`}>
              <div className="border-t border-white/20 pt-4">
                <p className="text-gray-300 text-sm leading-relaxed">
                  {member.bio}
                </p>
              </div>
            </div>
            
            <div className="text-center mt-4">
              <span className="text-xs text-gray-500 font-medium">
                Click to view full profile →
              </span>
            </div>
          </div>

          {/* Back Side */}
          <div className={`absolute inset-0 p-6 transition-all duration-500 ${
            flipped ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
          style={{ transform: 'rotateY(180deg)' }}>
            
            <h3 className="text-xl font-black text-white mb-4 text-center"
                style={{ fontFamily: 'Impact, Arial Black, sans-serif' }}>
              {member.name}
            </h3>
            
            {/* Backstory */}
            <div className="mb-4">
              <h4 className="text-blue-400 font-bold text-sm uppercase mb-2 tracking-wider">Origin Story</h4>
              <p className="text-gray-300 text-sm leading-relaxed">
                {member.backstory}
              </p>
            </div>

            {/* Achievements */}
            <div className="mb-4">
              <h4 className="text-green-400 font-bold text-sm uppercase mb-2 tracking-wider">Major Wins</h4>
              <ul className="space-y-1">
                {member.achievements.map((achievement, i) => (
                  <li key={i} className="text-gray-300 text-xs flex items-center">
                    <span className="text-yellow-400 mr-2">★</span>
                    {achievement}
                  </li>
                ))}
              </ul>
            </div>

            {/* Expertise */}
            <div>
              <h4 className="text-purple-400 font-bold text-sm uppercase mb-2 tracking-wider">Specialties</h4>
              <div className="flex flex-wrap gap-1">
                {member.expertise.map((skill, i) => (
                  <span key={i} 
                        className="text-xs px-2 py-1 bg-white/10 border border-white/20 rounded text-gray-300">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="text-center mt-4">
              <span className="text-xs text-gray-500 font-medium">
                ← Click to return
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <section 
      id="about"
      ref={sectionRef}
      className="relative min-h-screen py-20 overflow-hidden"
    >
      {/* ACTUAL Background Image - Trevor with Palm Trees */}
      <div 
        ref={backgroundRef}
        className="absolute inset-0 opacity-0"
        style={{
          backgroundImage: `url(${background2})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center center',
          backgroundRepeat: 'no-repeat'
        }}
      />

      {/* Overlay for readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
      
      <div className="container mx-auto px-4 relative z-10">
        
        {/* Clean Section Title */}
        <div ref={titleRef} className="text-center mb-16 opacity-0">
          <h2 className="text-6xl md:text-8xl font-black tracking-wider text-white mb-6"
              style={{
                fontFamily: 'Impact, Arial Black, sans-serif',
                textShadow: '3px 3px 0px #000000, -1px -1px 0px #000000, 1px -1px 0px #000000, -1px 1px 0px #000000'
              }}>
            THE CREW
          </h2>
          <p className="text-xl md:text-2xl text-white max-w-4xl mx-auto leading-relaxed font-medium"
             style={{ 
               textShadow: '1px 1px 2px rgba(0, 0, 0, 0.8)',
               fontFamily: 'Arial, sans-serif'
             }}>
            Meet the elite engineers who built Los Santos' most respected automotive empire. 
            Each member brings unique expertise and unmatched dedication to automotive excellence.
          </p>
          
          {/* Stats */}
          <div className="flex justify-center space-x-8 mt-8">
            <div className="text-center">
              <div className="text-3xl font-mono text-green-400 font-bold">2,547</div>
              <div className="text-gray-400 text-sm font-medium">TOTAL BUILDS</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-mono text-blue-400 font-bold">100%</div>
              <div className="text-gray-400 text-sm font-medium">SUCCESS RATE</div>
            </div>
            <div className="text-center">
              <div className="text-3xl">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-yellow-400">★</span>
                ))}
              </div>
              <div className="text-gray-400 text-sm font-medium">REPUTATION</div>
            </div>
          </div>
        </div>

        {/* Crew Cards Grid */}
        <div 
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto"
        >
          {crewMembers.map((member, index) => (
            <CrewCard key={member.id} member={member} index={index} />
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <p className="text-gray-300 text-xl mb-8 leading-relaxed font-medium"
             style={{ fontFamily: 'Arial, sans-serif' }}>
            Ready to join the most elite automotive crew in Los Santos? <br />
            <span className="text-blue-400 font-bold">Prove your skills</span> and earn your place in SAE history.
          </p>
          <button className="px-12 py-4 text-xl font-bold text-white bg-gradient-to-r from-blue-600 to-purple-700 hover:from-blue-700 hover:to-purple-800 border-2 border-white/20 transition-all duration-300 hover:scale-105"
                  style={{
                    fontFamily: 'Arial, sans-serif',
                    clipPath: 'polygon(10px 0%, 100% 0%, calc(100% - 10px) 100%, 0% 100%)'
                  }}>
            JOIN THE CREW
          </button>
        </div>
      </div>
      
      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black to-transparent" />
    </section>
  );
};

export default About;