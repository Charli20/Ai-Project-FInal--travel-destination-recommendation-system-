import React from "react";
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/NavBar1";
import Home from "./components/Home";
import Recommendation from "./components/Recommendation";
import About from "./components/About";
import Footer from "./components/Footer";
import Body from "./components/body";
import { Feature } from "framer-motion";

function App() {
  return (
    <div className="App">
      <Navbar />

      <Routes>
        {/* Main landing page */}
        <Route
          path="/"
          element={
            <>
              <Home />
              <Body />
              <About />
              <Footer />
            </>
          }
        />

        {/* Separate Recommendation page */}
        <Route path="/recommendations" element={<Recommendation />} />
      </Routes>
    </div>
  );
}

export default App;


// import React from "react";
// import MapTest from "./components/MapTest";
// import Navbar from "./components/NavBar1";
// import Home from "./components/Home";
// import Recommendation from "./components/Recommendation";
// import About from "./components/About";
// import Footer from "./components/Footer";

// function App() {
//   return (
//     <div className="App">
//       <Navbar />
//       <Home />
//       <Recommendation />
//       <About />
//       <Footer />
//     </div>
//   );
// }

// export default App;
