import { motion } from "framer-motion";
import { Feather } from "lucide-react";

export function TypingIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10, rotate: -1 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex justify-start w-full mb-8 relative z-10 pl-4"
    >
      <div className="relative group">
         {/* Shadow */}
         <div className="absolute inset-0 translate-y-2 translate-x-1 bg-black/30 blur-sm clip-torn-2" />
         
         {/* Paper Scrap */}
         <div className="relative p-4 px-6 bg-[#eaddcf] text-[#2a1a10] clip-torn-2 flex items-center space-x-3 min-w-[180px]">
            
            {/* Animated Quill Icon */}
            <motion.div
              animate={{ rotate: [0, 10, 0, -5, 0], x: [0, 2, 0] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            >
              <Feather className="w-5 h-5 text-pirate-ink opacity-70" />
            </motion.div>

            <span className="text-pirate-ink font-map italic text-lg md:text-2xl opacity-80 whitespace-nowrap">The Captain scribbles...</span>
            
            {/* Ink Dots */}
            <div className="flex space-x-1 pt-2">
              <motion.div
                animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                transition={{ repeat: Infinity, duration: 0.8, delay: 0 }}
                className="w-1.5 h-1.5 bg-pirate-ink rounded-full"
              />
              <motion.div
                animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                transition={{ repeat: Infinity, duration: 0.8, delay: 0.2 }}
                className="w-1.5 h-1.5 bg-pirate-ink rounded-full"
              />
              <motion.div
                animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                transition={{ repeat: Infinity, duration: 0.8, delay: 0.4 }}
                className="w-1.5 h-1.5 bg-pirate-ink rounded-full"
              />
            </div>
         </div>
      </div>
    </motion.div>
  );
}