import React from "react";
import logo from "../assets/logo.png";

const About = () => {
  return (
    <section
      id="about"
      className="relative w-full min-h-screen bg-gray-100 py-20"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-20 flex flex-col md:flex-row items-center gap-12">
        
        {/* Left Column - Logo/Image */}
        <div className="w-full md:w-1/2 flex justify-center">
          <img
            src={logo}
            alt="Our Team Logo"
            className="w-80 h-80 object-cover shadow-lg"
          />
        </div>

        {/* Right Column - Text */}
        <div className="w-full md:w-1/2 flex flex-col gap-6 text-gray-900">
          <h2 className="text-4xl md:text-5xl font-bold">About Us</h2>
          
          <p className="text-lg md:text-xl leading-relaxed">
            We are a passionate group of undergraduate students dedicated to creating innovative solutions through collaborative projects. This travel recommendation system is our first step in exploring the potential of smart, technology-driven travel tools. Developed as part of our group assignment, it reflects our collective effort, creativity, and technical skills. Our team members, Chalidu Wijekoon, Sumudu Aberathne, Manjitha Kaluarachchi, and Chanuka Wanigasekara, worked together to build a system that helps users discover the beauty of Sri Lanka and receive intelligent travel suggestions. While this represents the initial version of our project, we envision expanding it further in the future, adding more features, data, and personalized experiences to make travel planning even smarter and more enjoyable.
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;


