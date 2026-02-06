import React from "react";
import { motion } from "framer-motion";

const FloatingCard = ({ children }) => {
  return (
    <motion.div
      className="bg-white rounded-3xl shadow-xl flex flex-col overflow-hidden max-w-[320px] w-full"
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 180, damping: 18 }}
    >
      {children}
    </motion.div>
  );
};

export default FloatingCard;

// import React from "react";
// import { motion } from "framer-motion";

// export default function FloatingCard({ children, isSelected, onClick }) {
//   return (
//     <motion.div
//       onClick={onClick}
//       className="
//         bg-white
//         rounded-3xl
//         shadow-lg
//         cursor-pointer
//         flex
//         flex-col
//         w-full
//         min-h-[560px]
//         transition-all
//       "
//       initial={{ y: 0 }}
//       whileHover={{
//         y: -10,
//         scale: 1.03,
//         boxShadow: "0px 18px 35px rgba(0,0,0,0.25)",
//       }}
//       animate={
//         isSelected
//           ? {
//               scale: 1.05,
//               y: -15,
//               boxShadow: "0px 25px 45px rgba(0,0,0,0.3)",
//             }
//           : { scale: 1, y: 0 }
//       }
//       transition={{ type: "spring", stiffness: 180, damping: 18 }}
//     >
//       {children}
//     </motion.div>
//   );
// }

