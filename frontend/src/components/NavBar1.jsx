import React, { useState, useRef, useEffect } from "react";
import { NavLink } from "react-router-dom";
import gsap from "gsap";
import { useWindowScroll } from "react-use";
import logo from "../assets/logo.png";

const Navbar = () => {
  const [isNavVisible, setIsNavVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const navRef = useRef(null);
  const { y: scrollY } = useWindowScroll();

  useEffect(() => {
    if (scrollY === 0) setIsNavVisible(true);
    else if (scrollY > lastScrollY) setIsNavVisible(false);
    else setIsNavVisible(true);
    setLastScrollY(scrollY);
  }, [scrollY]);

  useEffect(() => {
    gsap.to(navRef.current, {
      y: isNavVisible ? 0 : -100,
      opacity: isNavVisible ? 1 : 0,
      duration: 0.3,
    });
  }, [isNavVisible]);

  const linkClass = ({ isActive }) =>
    `transition ${
      isActive ? "text-yellow-400" : "text-white hover:text-yellow-300"
    }`;

  return (
    <header
      ref={navRef}
      className="fixed top-4 inset-x-4 z-50 h-16 rounded-xl
                 backdrop-blur-md bg-black/60 shadow-lg"
    >
      <nav className="flex items-center justify-between h-full px-6">
        <img src={logo} alt="Logo" className="h-10 w-10" />

        <div className="hidden md:flex gap-8 font-medium">
          <NavLink to="/" className={linkClass}>
            Home
          </NavLink>
          <NavLink to="/recommendations" className={linkClass}>
            Recommendations
          </NavLink>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;



// import React, { useState, useRef, useEffect } from "react";
// import gsap from "gsap";
// import { useWindowScroll } from "react-use";
// import logo from '../assets/logo.png'; 

// const navItems = [
//   { label: "Home", id: "hero-section" },
//   { label: "Recommendation", id: "recommendation" },
//   { label: "About Us", id: "about" },
//   { label: "Footer", id: "footer" },
// ];

// const Navbar = () => {
//   const [isAudioPlaying, setIsAudioPlaying] = useState(false);
//   const [isIndicatorActive, setIsIndicatorActive] = useState(false);
//   const [isNavVisible, setIsNavVisible] = useState(true);
//   const [lastScrollY, setLastScrollY] = useState(0);

//   const audioRef = useRef(null);
//   const navRef = useRef(null);
//   const { y: scrollY } = useWindowScroll();

//   const toggleAudio = () => {
//     setIsAudioPlaying((p) => !p);
//     setIsIndicatorActive((p) => !p);
//   };

//   useEffect(() => {
//     if (!audioRef.current) return;
//     isAudioPlaying ? audioRef.current.play() : audioRef.current.pause();
//   }, [isAudioPlaying]);

//   useEffect(() => {
//     if (scrollY === 0) setIsNavVisible(true);
//     else if (scrollY > lastScrollY) setIsNavVisible(false);
//     else setIsNavVisible(true);
//     setLastScrollY(scrollY);
//   }, [scrollY]);

//   useEffect(() => {
//     if (!navRef.current) return;
//     gsap.to(navRef.current, { y: isNavVisible ? 0 : -100, opacity: isNavVisible ? 1 : 0, duration: 0.25 });
//   }, [isNavVisible]);

//   const scrollToSection = (id) => {
//     const el = document.getElementById(id);
//     if (el) el.scrollIntoView({ behavior: "smooth" });
//   };

//   return (
//     <div ref={navRef} className="fixed inset-x-0 top-4 z-50 h-16 backdrop-blur-md bg-black/50 rounded-xl">
//       <nav className="flex items-center justify-between h-full px-6 text-white">
//         <img src={logo} alt="Logo" className="h-10 w-10 object-contain" />

//         <div className="hidden md:flex gap-6">
//           {navItems.map(({ label, id }) => (
//             <button key={id} onClick={() => scrollToSection(id)} className="hover:text-blue-400 transition">{label}</button>
//           ))}
//         </div>

//         <button onClick={toggleAudio} className="flex items-center space-x-1 ml-6">
//           <audio ref={audioRef} src="/audio/loop.mp3" loop className="hidden" />
//           {[1, 2, 3, 4].map((bar) => (
//             <div key={bar} className={`w-1 h-4 bg-white rounded-sm ${isIndicatorActive ? "animate-pulse" : ""}`} style={{ animationDelay: `${bar * 0.1}s` }} />
//           ))}
//         </button>
//       </nav>
//     </div>
//   );
// };

// export default Navbar;
