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
