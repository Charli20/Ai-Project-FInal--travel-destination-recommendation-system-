import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useNavigate } from "react-router-dom";



import video2 from "../assets/video2.mp4";
import video3 from "../assets/video10.mp4";

gsap.registerPlugin(ScrollTrigger);

const videos = [ video3, video2];

const titles = [
  "Explore Sri Lanka",
  "Discover Hidden Gems",
  "Travel Beyond the Ordinary",
];

const quotes = [
  "From golden beaches to misty mountains",
  "Every journey tells a new story",
  "Discover places beyond the guidebooks",
  "Travel smarter. Travel deeper.",
  "Hidden gems, perfectly recommended",
];

const Home = () => {
  const navigate = useNavigate();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [titleIndex, setTitleIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  const videoRef = useRef(null);
  const quoteRef = useRef(null);
  const titleRef = useRef(null);

  const handleVideoLoad = () => setLoading(false);

  const handleNextVideo = () => {
    setLoading(true);
    setCurrentIndex((p) => (p + 1) % videos.length);
  };

  // Video fade animation
  useEffect(() => {
    if (!loading) {
      gsap.fromTo(videoRef.current, { opacity: 0 }, { opacity: 1, duration: 1.2 });
    }
  }, [currentIndex, loading]);

  // Title slideshow animation
  useEffect(() => {
    const interval = setInterval(() => {
      gsap.to(titleRef.current, {
        opacity: 0,
        y: -30,
        duration: 0.6,
        onComplete: () => {
          setTitleIndex((p) => (p + 1) % titles.length);
          gsap.fromTo(
            titleRef.current,
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 0.9 }
          );
        },
      });
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  // Quote rotation animation
  useEffect(() => {
    const interval = setInterval(() => {
      gsap.to(quoteRef.current, {
        opacity: 0,
        y: -10,
        duration: 0.4,
        onComplete: () => {
          setQuoteIndex((p) => (p + 1) % quotes.length);
          gsap.fromTo(
            quoteRef.current,
            { opacity: 0, y: 10 },
            { opacity: 1, y: 0, duration: 0.6 }
          );
        },
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Scroll-triggered clip-path animation
  // Scroll-triggered video clip animation (exactly like old version)
useEffect(() => {
  // initial clip-path and border radius
  gsap.set("#video-frame", {
    clipPath: "polygon(14% 0, 72% 0, 88% 90%, 0 95%)",
    borderRadius: "0% 0% 40% 10%",
  });

  // animate clip-path and border radius on scroll
  gsap.from("#video-frame", {
    clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
    borderRadius: "0% 0% 0% 0%",
    scrollTrigger: {
      trigger: "#video-frame",
      start: "center center",
      end: "bottom center",
      scrub: true,
    },
  });
}, []);


 // useEffect(() => {
//     gsap.set("#video-frame", {
//       clipPath: "polygon(14% 0, 72% 0, 88% 90%, 0 95%)",
//       borderRadius: "0% 0% 40% 10%",
//     });

//     gsap.from("#video-frame", {
//       clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
//       borderRadius: "0% 0% 0% 0%",
//       scrollTrigger: {
//         trigger: "#video-frame",
//         start: "center center",
//         end: "bottom center",
//         scrub: true,
//       },
//     });
//   }, []);

  return (
    <section className="relative h-screen w-full overflow-hidden bg-black" id="hero-section">
      {loading && (
        <div className="absolute inset-0 z-50 bg-black/70 flex items-center justify-center text-white">
          Loading experience…
        </div>
      )}

      <div id="video-frame" className="relative h-screen w-full overflow-hidden">
        <video
          ref={videoRef}
          src={videos[currentIndex]}
          autoPlay
          muted
          playsInline
          onLoadedData={handleVideoLoad}
          onEnded={handleNextVideo}
          onClick={handleNextVideo}
          className="absolute inset-0 w-full h-full object-cover cursor-pointer"
        />
      </div>

      {/* Overlay content */}
      <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-6">
        <h1
          ref={titleRef}
          className="text-4xl md:text-7xl font-extrabold text-white drop-shadow-xl mb-6"
        >
          {titles[titleIndex]}
          <br />
          <span className="text-3xl md:text-5xl bg-gradient-to-r from-yellow-400 to-orange-300 bg-clip-text text-transparent">
            With Smart Travel Recommendations
          </span>
        </h1>

        <p className="max-w-2xl text-gray-200 mb-4">
          AI-powered destination discovery based on your travel style, mood, and interests.
        </p>

        <p ref={quoteRef} className="text-lg text-gray-300 mb-8">
          {quotes[quoteIndex]}
        </p>

        {/* CTA BUTTON */}
        <button
          onClick={() => navigate("/recommendations")}
          className="px-8 py-4 rounded-full font-semibold text-black
                     bg-gradient-to-r from-yellow-400 to-orange-400
                     hover:scale-105 transition duration-300 shadow-xl"
        >
          🚀 Get Travel Recommendations
        </button>
      </div>

      {/* Video navigation dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-30">
        {videos.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`h-3 w-3 rounded-full transition-all duration-300 ${
              currentIndex === idx
                ? "bg-yellow-400 scale-125"
                : "bg-white/40 hover:bg-white"
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default Home;



// import React, { useState, useEffect, useRef } from "react";
// import gsap from "gsap";
// import { ScrollTrigger } from "gsap/all";
// import { useNavigate } from "react-router-dom";


// import beachVideo from "../assets/video1.mp4";
// import mountainVideo from "../assets/video2.mp4";
// import waterfallVideo from "../assets/video3.mp4";
// import cityVideo from "../assets/video4.mp4";
// import beachvideo1 from "../assets/beachvideo1.mp4";

// gsap.registerPlugin(ScrollTrigger);

// const videos = [
//   beachVideo,
//   mountainVideo,
//   waterfallVideo,
//   cityVideo,
//   beachvideo1,
// ];

// const titles = [
//   "Explore Sri Lanka",
//   "Discover Hidden Gems",
//   "Travel Beyond the Ordinary",
// ];

// const quotes = [
//   "From golden beaches to misty mountains",
//   "Every journey tells a new story",
//   "Discover places beyond the guidebooks",
//   "Travel smarter. Travel deeper.",
//   "Hidden gems, perfectly recommended",
// ];

// const Home = () => {
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [quoteIndex, setQuoteIndex] = useState(0);
//   const [titleIndex, setTitleIndex] = useState(0);
//   const [loading, setLoading] = useState(true);

//   const videoRef = useRef(null);
//   const quoteRef = useRef(null);
//   const titleRef = useRef(null);

//   const handleVideoLoad = () => setLoading(false);

//   const handleNextVideo = () => {
//     setLoading(true);
//     setCurrentIndex((prev) => (prev + 1) % videos.length);
//   };

//   // Video fade animation
//   useEffect(() => {
//     if (loading) return;
//     gsap.fromTo(
//       videoRef.current,
//       { opacity: 0 },
//       { opacity: 1, duration: 1.2, ease: "power2.out" }
//     );
//   }, [currentIndex, loading]);

//   // Main title slideshow animation
//   useEffect(() => {
//     const interval = setInterval(() => {
//       gsap.to(titleRef.current, {
//         opacity: 0,
//         y: -30,
//         duration: 0.6,
//         ease: "power2.in",
//         onComplete: () => {
//           setTitleIndex((prev) => (prev + 1) % titles.length);
//           gsap.fromTo(
//             titleRef.current,
//             { opacity: 0, y: 30 },
//             {
//               opacity: 1,
//               y: 0,
//               duration: 0.9,
//               ease: "power3.out",
//             }
//           );
//         },
//       });
//     }, 3500);

//     return () => clearInterval(interval);
//   }, []);

//   // Rotating quote animation
//   useEffect(() => {
//     const interval = setInterval(() => {
//       gsap.to(quoteRef.current, {
//         opacity: 0,
//         y: -10,
//         duration: 0.4,
//         ease: "power1.in",
//         onComplete: () => {
//           setQuoteIndex((prev) => (prev + 1) % quotes.length);
//           gsap.fromTo(
//             quoteRef.current,
//             { opacity: 0, y: 10 },
//             {
//               opacity: 1,
//               y: 0,
//               duration: 0.6,
//               ease: "power2.out",
//             }
//           );
//         },
//       });
//     }, 3000);

//     return () => clearInterval(interval);
//   }, []);

//   // Scroll-triggered video shape animation
//   useEffect(() => {
//     gsap.set("#video-frame", {
//       clipPath: "polygon(14% 0, 72% 0, 88% 90%, 0 95%)",
//       borderRadius: "0% 0% 40% 10%",
//     });

//     gsap.from("#video-frame", {
//       clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
//       borderRadius: "0% 0% 0% 0%",
//       scrollTrigger: {
//         trigger: "#video-frame",
//         start: "center center",
//         end: "bottom center",
//         scrub: true,
//       },
//     });
//   }, []);

//   return (
//     <section
//       id="hero-section"
//       className="relative h-screen w-full overflow-hidden bg-black"
//     >
//       {loading && (
//         <div className="absolute z-[100] h-screen w-full bg-black/60 flex items-center justify-center">
//           <div className="text-[#E5E7EB] text-xl font-semibold">
//             Loading experience…
//           </div>
//         </div>
//       )}

//       <div id="video-frame" className="relative h-screen w-full overflow-hidden">
//         <video
//           ref={videoRef}
//           src={videos[currentIndex]}
//           autoPlay
//           muted
//           playsInline
//           onLoadedData={handleVideoLoad}
//           onEnded={handleNextVideo}
//           onClick={handleNextVideo}
//           className="absolute inset-0 w-full h-full object-cover cursor-pointer"
//         />
//       </div>

//       {/* Overlay content */}
//       <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-6">
//         {/* Animated main title */}
//         <h1
//           ref={titleRef}
//           className="text-4xl md:text-7xl font-extrabold mb-6 leading-tight
//                      text-[#F8FAFC]
//                      drop-shadow-[0_4px_40px_rgba(0,0,0,0.65)]"
//         >
//           {titles[titleIndex]}
//           <br />
//           <span
//             className="bg-gradient-to-r from-[#FACC15] via-[#FDBA74] to-[#FDE68A]
//                        bg-clip-text text-transparent
//                        text-3xl md:text-5xl font-semibold"
//           >
//             With Smart Travel Recommendations
//           </span>
//         </h1>

//         {/* Subtitle */}
//         <p className="max-w-2xl text-base md:text-lg text-[#E5E7EB] mb-4 leading-relaxed">
//           AI-powered destination discovery tailored to your travel style —
//           beaches, mountains, waterfalls, culture, and unforgettable
//           experiences.
//         </p>

//         {/* Rotating quote */}
//         <p
//           ref={quoteRef}
//           className="text-lg md:text-xl font-medium tracking-wide
//                      text-[#CBD5E1] mt-2"
//         >
//           {quotes[quoteIndex]}
//         </p>
//       </div>

//       {/* Video navigation dots */}
//       <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-30">
//         {videos.map((_, idx) => (
//           <button
//             key={idx}
//             onClick={() => setCurrentIndex(idx)}
//             className={`h-3 w-3 rounded-full transition-all duration-300 ${
//               currentIndex === idx
//                 ? "bg-[#FACC15] scale-125"
//                 : "bg-white/40 hover:bg-white"
//             }`}
//           />
//         ))}
//       </div>
//     </section>
//   );
// };

// export default Home;
