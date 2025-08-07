import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Import city skyline background
import background3 from '../assets/background (3).jpg'; // City skyline sunset

const Events = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const missionsRef = useRef(null);

  // Mock events data styled as GTA missions
  const missions = [
    {
      id: 1,
      name: "FORMULA CIRCUIT HEIST",
      type: "Racing Event",
      date: "March 15, 2024",
      time: "19:00",
      location: "Downtown Racing Circuit",
      difficulty: "HARD",
      reward: "$2,500 Prize Pool",
      description: "High-stakes formula racing event. Only the fastest cars and smartest engineers will survive this circuit.",
      status: "AVAILABLE",
      participants: 24,
      maxParticipants: 32,
      missionType: "race",
      icon: "🏎️"
    },
    {
      id: 2,
      name: "WORKSHOP INFILTRATION",
      type: "Workshop Session",
      date: "March 20, 2024",
      time: "14:00",
      location: "Engineering Lab B",
      difficulty: "MEDIUM",
      reward: "Certification Points",
      description: "Learn advanced engine modification techniques. Master the art of turbocharging and fuel injection systems.",
      status: "AVAILABLE",
      participants: 18,
      maxParticipants: 25,
      missionType: "workshop",
      icon: "🔧"
    },
    {
      id: 3,
      name: "DRAG STRIP DOMINATION",
      type: "Competition",
      date: "March 25, 2024",
      time: "16:00",
      location: "City Speedway",
      difficulty: "EXTREME",
      reward: "$5,000 Grand Prize",
      description: "Quarter-mile drag racing championship. Bring your fastest build and prepare for the ultimate speed test.",
      status: "LOCKED",
      participants: 0,
      maxParticipants: 16,
      missionType: "competition",
      icon: "⚡"
    },
    {
      id: 4,
      name: "TECH SPEC OPERATION",
      type: "Technical Seminar",
      date: "April 2, 2024",
      time: "10:00",
      location: "Conference Hall",
      difficulty: "EASY",
      reward: "Industry Connections",
      description: "Guest speakers from major automotive companies. Network with professionals and learn about cutting-edge technology.",
      status: "AVAILABLE",
      participants: 45,
      maxParticipants: 100,
      missionType: "seminar",
      icon: "🎤"
    },
    {
      id: 5,
      name: "BAJA DESERT RAID",
      type: "Off-Road Challenge",
      date: "April 10, 2024",
      time: "08:00",
      location: "Desert Testing Grounds",
      difficulty: "HARD",
      reward: "Championship Trophy",
      description: "Navigate treacherous terrain in custom-built off-road vehicles. Test your engineering skills against nature's challenges.",
      status: "AVAILABLE",
      participants: 12,
      maxParticipants: 20,
      missionType: "offroad",
      icon: "🏜️"
    },
    {
      id: 6,
      name: "ELECTRIC FUTURE HEIST",
      type: "EV Workshop",
      date: "April 15, 2024",
      time: "13:00",
      location: "Innovation Center",
      difficulty: "MEDIUM",
      reward: "EV Certification",
      description: "Dive into electric vehicle technology. Learn about battery systems, regenerative braking, and autonomous driving.",
      status: "AVAILABLE",
      participants: 28,
      maxParticipants: 35,
      missionType: "ev",
      icon: "🔋"
    }
  ];

  useEffect(() => {
    const section = sectionRef.current;
    const title = titleRef.current;
    const missions = missionsRef.current;

    // Title animation
    gsap.fromTo(title, 
      { opacity: 0, y: 100, rotateX: -15 },
      {
        opacity: 1,
        y: 0,
        rotateX: 0,
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

    // Mission cards animation
    gsap.fromTo(missions.children,
      { opacity: 0, scale: 0.8, rotateY: -25 },
      {
        opacity: 1,
        scale: 1,
        rotateY: 0,
        duration: 0.8,
        ease: "back.out(1.4)",
        stagger: {
          each: 0.15,
          from: "random"
        },
        scrollTrigger: {
          trigger: missions,
          start: "top 85%",
          end: "bottom 60%",
          toggleActions: "play none none reverse"
        }
      }
    );

  }, []);

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'EASY': return 'text-green-400';
      case 'MEDIUM': return 'text-yellow-400';
      case 'HARD': return 'text-orange-400';
      case 'EXTREME': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'AVAILABLE': return 'text-green-400';
      case 'LOCKED': return 'text-red-400';
      case 'COMPLETED': return 'text-gray-400';
      default: return 'text-gray-400';
    }
  };

  const MissionCard = ({ mission, index }) => {
    const cardRef = useRef(null);
    const [isHovered, setIsHovered] = React.useState(false);

    const handleHover = (hover) => {
      setIsHovered(hover);
      const card = cardRef.current;
      
      if (hover) {
        gsap.to(card, {
          scale: 1.02,
          y: -5,
          duration: 0.3,
          ease: "power2.out"
        });
      } else {
        gsap.to(card, {
          scale: 1,
          y: 0,
          duration: 0.3,
          ease: "power2.out"
        });
      }
    };

    const handleAcceptMission = () => {
      if (mission.status === 'LOCKED') return;
      
      // Add click animation
      gsap.to(cardRef.current, {
        scale: 0.98,
        duration: 0.1,
        yoyo: true,
        repeat: 1,
        ease: "power2.inOut"
      });
      
      // In a real app, this would handle mission acceptance
      console.log(`Accepting mission: ${mission.name}`);
    };

    return (
      <div 
        ref={cardRef}
        className={`bg-black/60 backdrop-blur-md rounded-lg border border-white/20 p-6 transform-gpu cursor-pointer transition-all duration-300 ${
          mission.status === 'LOCKED' ? 'opacity-60 cursor-not-allowed' : ''
        }`}
        onMouseEnter={() => handleHover(true)}
        onMouseLeave={() => handleHover(false)}
        onClick={handleAcceptMission}
      >
        {/* Mission header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="text-3xl animate-pulse">{mission.icon}</div>
            <div>
              <h3 className="text-lg text-white font-bold mb-1 tracking-wider"
                  style={{ fontFamily: 'Arial, sans-serif' }}>
                {mission.name}
              </h3>
              <p className="text-sm text-blue-400 uppercase tracking-wider font-medium"
                 style={{ fontFamily: 'Arial, sans-serif' }}>
                {mission.type}
              </p>
            </div>
          </div>
          <div className="text-right">
            <div className={`text-xs uppercase tracking-wide font-bold ${getStatusColor(mission.status)}`}
                 style={{ fontFamily: 'Arial, sans-serif' }}>
              {mission.status}
            </div>
            <div className={`text-xs mt-1 font-medium ${getDifficultyColor(mission.difficulty)}`}
                 style={{ fontFamily: 'Arial, sans-serif' }}>
              {mission.difficulty}
            </div>
          </div>
        </div>

        {/* Mission details */}
        <div className="space-y-3 mb-4">
          <div className="grid grid-cols-2 gap-4 text-sm"
               style={{ fontFamily: 'Arial, sans-serif' }}>
            <div>
              <span className="text-gray-400 font-medium">DATE:</span>
              <div className="text-white font-bold">{mission.date}</div>
            </div>
            <div>
              <span className="text-gray-400 font-medium">TIME:</span>
              <div className="text-white font-bold">{mission.time}</div>
            </div>
          </div>
          
          <div className="text-sm"
               style={{ fontFamily: 'Arial, sans-serif' }}>
            <span className="text-gray-400 font-medium">LOCATION:</span>
            <div className="text-white font-bold">{mission.location}</div>
          </div>

          <div className="text-sm"
               style={{ fontFamily: 'Arial, sans-serif' }}>
            <span className="text-gray-400 font-medium">REWARD:</span>
            <div className="text-yellow-400 font-bold">{mission.reward}</div>
          </div>
        </div>

        {/* Mission description */}
        <p className="text-gray-300 text-sm leading-relaxed mb-4 font-medium"
           style={{ fontFamily: 'Arial, sans-serif' }}>
          {mission.description}
        </p>

        {/* Participants bar */}
        <div className="mb-4">
          <div className="flex justify-between text-xs text-gray-400 mb-1 font-medium"
               style={{ fontFamily: 'Arial, sans-serif' }}>
            <span>PARTICIPANTS</span>
            <span className="text-white font-bold">{mission.participants}/{mission.maxParticipants}</span>
          </div>
          <div className="w-full bg-black/30 rounded-full h-3 border border-white/20">
            <div 
              className="h-full rounded-full bg-gradient-to-r from-green-500 to-yellow-500 transition-all duration-1000"
              style={{ width: `${(mission.participants / mission.maxParticipants) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Accept mission button */}
        <button 
          className={`w-full py-3 px-4 text-sm uppercase tracking-wider font-bold transition-all duration-300 ${
            mission.status === 'LOCKED' 
              ? 'bg-gray-600 text-gray-400 cursor-not-allowed' 
              : isHovered
                ? 'bg-gradient-to-r from-green-500 to-yellow-500 text-black shadow-lg transform scale-105'
                : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white border border-white/20'
          }`}
          style={{
            fontFamily: 'Arial, sans-serif',
            clipPath: 'polygon(5px 0%, 100% 0%, calc(100% - 5px) 100%, 0% 100%)'
          }}
          disabled={mission.status === 'LOCKED'}
        >
          {mission.status === 'LOCKED' ? 'MISSION LOCKED' : 'ACCEPT MISSION'}
        </button>

        {/* Glitch effect overlay */}
        {isHovered && mission.status !== 'LOCKED' && (
          <div className="absolute inset-0 pointer-events-none">
            <div className="glitch absolute inset-0 bg-gradient-to-r from-neon-green to-transparent opacity-10 rounded-lg"></div>
          </div>
        )}
      </div>
    );
  };

  return (
    <section 
      id="events"
      ref={sectionRef}
      className="min-h-screen py-20 relative overflow-hidden"
    >
      {/* ACTUAL Background Image - City Skyline Sunset */}
      <div 
        className="absolute inset-0"
        style={{
          backgroundImage: `url(${background3})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center center',
          backgroundRepeat: 'no-repeat'
        }}
      />
      
      {/* Overlay for readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80" />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Clean Section Title */}
        <div ref={titleRef} className="text-center mb-16">
          <h2 className="text-6xl md:text-8xl font-black tracking-wider text-white mb-6"
              style={{
                fontFamily: 'Impact, Arial Black, sans-serif',
                textShadow: '3px 3px 0px #000000, -1px -1px 0px #000000, 1px -1px 0px #000000, -1px 1px 0px #000000'
              }}>
            EVENTS
          </h2>
          <p className="text-xl md:text-2xl text-white max-w-4xl mx-auto leading-relaxed font-medium"
             style={{
               textShadow: '1px 1px 2px rgba(0, 0, 0, 0.8)',
               fontFamily: 'Arial, sans-serif'
             }}>
            Choose your next automotive adventure. Each mission offers unique challenges and rewards for the <span className="text-blue-400 font-bold">SAE crew</span>.
          </p>
          <div className="mt-6 text-gray-300"
               style={{ fontFamily: 'Arial, sans-serif' }}>
            <span className="text-green-400 mr-6 font-bold">● AVAILABLE</span>
            <span className="text-red-400 font-bold">● LOCKED</span>
          </div>
        </div>

        {/* Mission selection grid */}
        <div 
          ref={missionsRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto"
        >
          {missions.map((mission, index) => (
            <MissionCard key={mission.id} mission={mission} index={index} />
          ))}
        </div>

        {/* Call to action */}
        <div className="text-center mt-16">
          <p className="text-gray-300 text-xl mb-8 leading-relaxed font-medium"
             style={{ fontFamily: 'Arial, sans-serif' }}>
            Ready to lead your own mission? <span className="text-green-400 font-bold">Create custom events</span> and build your legacy.
          </p>
          <button className="px-12 py-4 text-xl font-bold text-white bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 border-2 border-white/20 transition-all duration-300 hover:scale-105"
                  style={{
                    fontFamily: 'Arial, sans-serif',
                    clipPath: 'polygon(10px 0%, 100% 0%, calc(100% - 10px) 100%, 0% 100%)'
                  }}>
            BECOME MISSION LEADER
          </button>
        </div>
      </div>

      {/* Animated elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-10 w-3 h-3 bg-neon-green rounded-full animate-ping opacity-30"></div>
        <div className="absolute bottom-1/3 right-20 w-2 h-2 bg-gta-yellow rounded-full animate-bounce opacity-40"></div>
        <div className="absolute top-2/3 left-1/3 w-1 h-1 bg-neon-pink rounded-full animate-pulse opacity-50"></div>
      </div>
    </section>
  );
};

export default Events;