import React from "react"; 
import beachImage from "../assets/image10.jpg";
import mountainImage from "../assets/image11.jpg";

const Body = () => {
  return (
    <section className="relative w-full min-h-screen bg-white py-20"> {/* White background and spacing */}
      {/* Main Content */}
      <div className="relative z-20 flex flex-col md:flex-row items-center justify-center max-w-7xl mx-auto px-6 md:px-20 gap-12">
        
        {/* Left Column - Images */}
        <div className="flex flex-col gap-6 w-full md:w-1/2">
          <img
            src={beachImage}
            alt="Sri Lanka Beach"
            className="w-full h-64 md:h-80 object-cover shadow-lg hover:scale-105 transition-transform duration-500"
          />
          <img
            src={mountainImage}
            alt="Sri Lanka Mountain"
            className="w-full h-64 md:h-80 object-cover shadow-lg hover:scale-105 transition-transform duration-500"
          />
        </div>

        {/* Right Column - Text */}
        <div className="flex flex-col gap-6 w-full md:w-1/2 text-gray-900">
          <h2 className="text-4xl md:text-5xl font-bold drop-shadow-lg">
            Welcome to Sri Lanka
          </h2>
          <p className="text-lg md:text-xl leading-relaxed drop-shadow-md">
            Nestled in the heart of the Indian Ocean, Sri Lanka is a captivating island nation known for its breathtaking landscapes, rich heritage, and vibrant culture. From golden sun-kissed beaches and lush tropical forests to mist-covered mountains and cascading waterfalls, every corner of the island offers a new adventure. Explore ancient Buddhist temples, colonial forts, and colorful markets that showcase the nation’s diverse history and traditions. Wildlife enthusiasts can marvel at leopards, elephants, and exotic birds in national parks, while food lovers can savor a variety of unique culinary delights. Whether you seek tranquility, adventure, or cultural immersion, Sri Lanka promises an unforgettable journey for every traveler.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Body;
