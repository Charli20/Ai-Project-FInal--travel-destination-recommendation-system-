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

