import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Import beach reflection background
import background5 from '../assets/background (5).jpg'; // Beach reflection sunset

const Contact = () => {
  const sectionRef = useRef(null);
  const phoneRef = useRef(null);
  const [activeApp, setActiveApp] = useState('contacts');
  const [currentTime, setCurrentTime] = useState(new Date());
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    interest: 'general'
  });

  // Phone apps data
  const apps = [
    { id: 'contacts', name: 'CONTACTS', icon: '📞', color: 'neon-green' },
    { id: 'messages', name: 'MESSAGES', icon: '💬', color: 'neon-blue' },
    { id: 'location', name: 'LOCATION', icon: '📍', color: 'gta-red' },
    { id: 'social', name: 'SOCIAL', icon: '📱', color: 'neon-pink' }
  ];

  const contactMethods = [
    { type: 'Call HQ', number: '+1 (555) SAE-AUTO', icon: '📞', action: 'call' },
    { type: 'Text Crew', number: '+1 (555) SAE-TEXT', icon: '💬', action: 'text' },
    { type: 'Emergency Line', number: '+1 (555) SAE-HELP', icon: '🚨', action: 'emergency' }
  ];

  const socialLinks = [
    { platform: 'Instagram', handle: '@sae_auto_empire', icon: '📸', color: 'text-pink-400' },
    { platform: 'Discord', handle: 'SAE Gaming Lobby', icon: '🎮', color: 'text-purple-400' },
    { platform: 'YouTube', handle: 'SAE Garage Builds', icon: '📺', color: 'text-red-400' },
    { platform: 'TikTok', handle: '@sae_street_builds', icon: '🎵', color: 'text-cyan-400' }
  ];

  useEffect(() => {
    const section = sectionRef.current;
    const phone = phoneRef.current;

    // Time updater
    const timeInterval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    // Phone entrance animation
    gsap.fromTo(phone, 
      { opacity: 0, y: 100, rotateX: -30 },
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

    return () => {
      clearInterval(timeInterval);
    };
  }, []);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add submission animation
    gsap.to(phoneRef.current, {
      scale: 0.98,
      duration: 0.1,
      yoyo: true,
      repeat: 1,
      ease: "power2.inOut"
    });
    
    console.log('Form submitted:', formData);
    // In a real app, this would send the message
  };

  const ContactsApp = () => (
    <div className="space-y-4">
      <h3 className="text-lg font-bold text-green-400 mb-4 text-center"
          style={{ fontFamily: 'Arial, sans-serif' }}>SAE HEADQUARTERS</h3>
      
      {contactMethods.map((contact, index) => (
        <div key={index} className="bg-white/5 backdrop-blur-sm rounded-lg p-4 hover:bg-white/10 transition-colors cursor-pointer border border-white/10">
          <div className="flex items-center space-x-4">
            <div className="text-2xl">{contact.icon}</div>
            <div>
              <div className="text-white font-bold"
                   style={{ fontFamily: 'Arial, sans-serif' }}>{contact.type}</div>
              <div className="text-blue-400 text-sm font-medium"
                   style={{ fontFamily: 'Arial, sans-serif' }}>{contact.number}</div>
            </div>
          </div>
        </div>
      ))}

      <div className="bg-black/30 backdrop-blur-sm rounded-lg p-4 border border-green-400/50">
        <h4 className="text-green-400 text-sm uppercase mb-2 font-bold"
            style={{ fontFamily: 'Arial, sans-serif' }}>Location</h4>
        <p className="text-white text-sm font-medium"
           style={{ fontFamily: 'Arial, sans-serif' }}>
          SAE Garage Complex<br />
          123 Speed Street<br />
          Auto City, AC 90210
        </p>
      </div>
    </div>
  );

  const MessagesApp = () => (
    <div className="space-y-4">
      <h3 className="text-lg font-bold text-blue-400 mb-4 text-center"
          style={{ fontFamily: 'Arial, sans-serif' }}>SEND MESSAGE</h3>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleInputChange}
            className="w-full bg-white/5 backdrop-blur-sm border border-white/20 rounded px-4 py-3 text-white focus:border-blue-400 focus:outline-none font-medium"
            style={{ fontFamily: 'Arial, sans-serif' }}
            required
          />
        </div>
        
        <div>
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleInputChange}
            className="w-full bg-white/5 backdrop-blur-sm border border-white/20 rounded px-4 py-3 text-white focus:border-blue-400 focus:outline-none font-medium"
            style={{ fontFamily: 'Arial, sans-serif' }}
            required
          />
        </div>

        <div>
          <select
            name="interest"
            value={formData.interest}
            onChange={handleInputChange}
            className="w-full bg-white/5 backdrop-blur-sm border border-white/20 rounded px-4 py-3 text-white focus:border-blue-400 focus:outline-none font-medium"
            style={{ fontFamily: 'Arial, sans-serif' }}
          >
            <option value="general" className="bg-black text-white">General Inquiry</option>
            <option value="membership" className="bg-black text-white">Join the Crew</option>
            <option value="events" className="bg-black text-white">Event Information</option>
            <option value="sponsorship" className="bg-black text-white">Sponsorship</option>
            <option value="technical" className="bg-black text-white">Technical Support</option>
          </select>
        </div>
        
        <div>
          <textarea
            name="message"
            placeholder="Your message to the crew..."
            value={formData.message}
            onChange={handleInputChange}
            rows="4"
            className="w-full bg-white/5 backdrop-blur-sm border border-white/20 rounded px-4 py-3 text-white focus:border-blue-400 focus:outline-none resize-none font-medium"
            style={{ fontFamily: 'Arial, sans-serif' }}
            required
          />
        </div>
        
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded hover:from-blue-700 hover:to-purple-700 transition-all duration-300 font-bold border border-white/20"
          style={{
            fontFamily: 'Arial, sans-serif',
            clipPath: 'polygon(5px 0%, 100% 0%, calc(100% - 5px) 100%, 0% 100%)'
          }}
        >
          SEND MESSAGE
        </button>
      </form>
    </div>
  );

  const LocationApp = () => (
    <div className="space-y-4">
      <h3 className="text-lg font-bold text-red-400 mb-4 text-center"
          style={{ fontFamily: 'Arial, sans-serif' }}>FIND US</h3>
      
      {/* Mock mini-map */}
      <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 h-40 relative overflow-hidden border border-white/20">
        <div className="absolute inset-0 bg-gradient-to-br from-black/30 to-black/60"></div>
        <div className="absolute top-4 left-4 w-16 h-12 bg-white/20 rounded"></div>
        <div className="absolute top-8 right-6 w-20 h-8 bg-white/20 rounded"></div>
        <div className="absolute bottom-6 left-8 w-12 h-16 bg-white/20 rounded"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="w-4 h-4 bg-red-400 rounded-full animate-ping"></div>
          <div className="w-2 h-2 bg-white rounded-full absolute top-1 left-1"></div>
        </div>
        <div className="absolute bottom-2 right-2 text-xs text-gray-300 font-medium"
             style={{ fontFamily: 'Arial, sans-serif' }}>SAE HQ</div>
      </div>

      <div className="space-y-3">
        <div className="bg-white/5 backdrop-blur-sm rounded p-3 border border-white/10">
          <div className="text-yellow-400 text-sm font-bold"
               style={{ fontFamily: 'Arial, sans-serif' }}>Address</div>
          <div className="text-white text-sm font-medium"
               style={{ fontFamily: 'Arial, sans-serif' }}>123 Speed Street, Auto City</div>
        </div>
        <div className="bg-white/5 backdrop-blur-sm rounded p-3 border border-white/10">
          <div className="text-yellow-400 text-sm font-bold"
               style={{ fontFamily: 'Arial, sans-serif' }}>Hours</div>
          <div className="text-white text-sm font-medium"
               style={{ fontFamily: 'Arial, sans-serif' }}>Mon-Fri: 6PM-12AM | Weekends: 12PM-2AM</div>
        </div>
        <div className="bg-white/5 backdrop-blur-sm rounded p-3 border border-white/10">
          <div className="text-yellow-400 text-sm font-bold"
               style={{ fontFamily: 'Arial, sans-serif' }}>Parking</div>
          <div className="text-white text-sm font-medium"
               style={{ fontFamily: 'Arial, sans-serif' }}>Free garage parking available</div>
        </div>
      </div>
    </div>
  );

  const SocialApp = () => (
    <div className="space-y-4">
      <h3 className="text-lg font-bold text-pink-400 mb-4 text-center"
          style={{ fontFamily: 'Arial, sans-serif' }}>SOCIAL NETWORK</h3>
      
      {socialLinks.map((social, index) => (
        <div key={index} className="bg-white/5 backdrop-blur-sm rounded-lg p-4 hover:bg-white/10 transition-colors cursor-pointer border border-white/10">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="text-2xl">{social.icon}</div>
              <div>
                <div className={`font-bold ${social.color}`}
                     style={{ fontFamily: 'Arial, sans-serif' }}>{social.platform}</div>
                <div className="text-gray-300 text-sm font-medium"
                     style={{ fontFamily: 'Arial, sans-serif' }}>{social.handle}</div>
              </div>
            </div>
            <div className="text-green-400">→</div>
          </div>
        </div>
      ))}

      <div className="bg-black/30 backdrop-blur-sm rounded-lg p-4 border border-pink-400/50">
        <h4 className="text-pink-400 text-sm uppercase mb-2 font-bold"
            style={{ fontFamily: 'Arial, sans-serif' }}>Join Our Community</h4>
        <p className="text-white text-sm leading-relaxed font-medium"
           style={{ fontFamily: 'Arial, sans-serif' }}>
          Connect with fellow automotive enthusiasts, share your builds, and stay updated on the latest SAE events and tech.
        </p>
      </div>
    </div>
  );

  const renderApp = () => {
    switch (activeApp) {
      case 'contacts': return <ContactsApp />;
      case 'messages': return <MessagesApp />;
      case 'location': return <LocationApp />;
      case 'social': return <SocialApp />;
      default: return <ContactsApp />;
    }
  };

  return (
    <section 
      id="contact"
      ref={sectionRef}
      className="min-h-screen py-20 relative overflow-hidden flex items-center justify-center"
    >
      {/* ACTUAL Background Image - Beach Reflection Sunset */}
      <div 
        className="absolute inset-0"
        style={{
          backgroundImage: `url(${background5})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center center',
          backgroundRepeat: 'no-repeat'
        }}
      />
      
      {/* Overlay for readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80" />
      
      {/* Phone UI */}
      <div 
        ref={phoneRef}
        className="relative max-w-sm mx-auto"
      >
        {/* Phone frame */}
        <div className="bg-black/80 backdrop-blur-md rounded-3xl p-2 shadow-2xl border-4 border-white/20">
          {/* Phone screen */}
          <div className="bg-black/90 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/10">
            {/* Status bar */}
            <div className="bg-black/70 px-4 py-2 flex justify-between items-center border-b border-white/10">
              <div className="flex items-center space-x-1">
                <div className="w-1 h-1 bg-green-400 rounded-full animate-pulse"></div>
                <div className="w-1 h-1 bg-green-400 rounded-full animate-pulse"></div>
                <div className="w-1 h-1 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-xs text-green-400 ml-2 font-medium"
                      style={{ fontFamily: 'Arial, sans-serif' }}>SAE Network</span>
              </div>
              <div className="text-xs text-white font-medium"
                   style={{ fontFamily: 'Arial, sans-serif' }}>
                {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </div>
              <div className="flex items-center space-x-1">
                <div className="w-4 h-2 border border-white/40 rounded-sm">
                  <div className="w-full h-full bg-green-400 rounded-sm"></div>
                </div>
              </div>
            </div>

            {/* App header */}
            <div className="bg-gradient-to-r from-black/80 to-black/60 px-4 py-3 border-b border-white/20">
              <h2 className="text-xl font-black text-white text-center tracking-wider"
                  style={{ fontFamily: 'Impact, Arial Black, sans-serif' }}>SAE AUTO EMPIRE</h2>
              <p className="text-blue-400 text-center text-sm font-medium"
                 style={{ fontFamily: 'Arial, sans-serif' }}>Communication Hub</p>
            </div>

            {/* App navigation */}
            <div className="bg-black/60 px-2 py-2 border-b border-white/10">
              <div className="grid grid-cols-4 gap-1">
                {apps.map((app) => (
                  <button
                    key={app.id}
                    onClick={() => setActiveApp(app.id)}
                    className={`p-3 rounded-lg transition-all duration-300 border ${
                      activeApp === app.id 
                        ? 'bg-white/10 border-white/30 scale-95' 
                        : 'bg-black/30 border-white/10 hover:bg-white/5'
                    }`}
                  >
                    <div className="text-center">
                      <div className="text-xl mb-1">{app.icon}</div>
                      <div className={`text-xs font-medium ${
                        activeApp === app.id ? 'text-white' : 'text-gray-400'
                      }`}
                           style={{ fontFamily: 'Arial, sans-serif' }}>
                        {app.name}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* App content */}
            <div className="bg-black/40 backdrop-blur-sm min-h-96 p-4">
              {renderApp()}
            </div>

            {/* Home indicator */}
            <div className="bg-black/70 py-2 flex justify-center border-t border-white/10">
              <div className="w-12 h-1 bg-white/40 rounded-full"></div>
            </div>
          </div>
        </div>

        {/* Phone reflection */}
        <div className="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-white opacity-10 rounded-3xl pointer-events-none"></div>
      </div>

      {/* Clean Section Title */}
      <div className="absolute top-20 left-1/2 transform -translate-x-1/2 text-center">
        <h2 className="text-4xl md:text-6xl font-black tracking-wider text-white mb-4"
            style={{
              fontFamily: 'Impact, Arial Black, sans-serif',
              textShadow: '3px 3px 0px #000000, -1px -1px 0px #000000, 1px -1px 0px #000000, -1px 1px 0px #000000'
            }}>
          CONTACT HQ
        </h2>
        <p className="text-white text-lg max-w-md font-medium"
           style={{
             textShadow: '1px 1px 2px rgba(0, 0, 0, 0.8)',
             fontFamily: 'Arial, sans-serif'
           }}>
          Use the SAE communication device to reach our crew
        </p>
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-16 w-2 h-2 bg-neon-green rounded-full animate-ping opacity-30"></div>
        <div className="absolute bottom-1/3 right-24 w-1.5 h-1.5 bg-neon-pink rounded-full animate-bounce opacity-40"></div>
        <div className="absolute top-2/3 left-1/4 w-1 h-1 bg-gta-yellow rounded-full animate-pulse opacity-50"></div>
      </div>
    </section>
  );
};

export default Contact;