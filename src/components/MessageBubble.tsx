import { motion } from "framer-motion";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { useMemo } from "react";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface MessageBubbleProps {
  body: string;
  author: string;
  timestamp: number;
}

export function MessageBubble({ body, author, timestamp }: MessageBubbleProps) {
  const isPirate = author === "pirate";

  // Generate random values for organic feel
  const rotation = useMemo(() => Math.random() * 4 - 2, []); // -2deg to 2deg
  const tornVariant = useMemo(() => Math.random() > 0.5 ? "clip-torn-1" : "clip-torn-2", []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, rotate: rotation + (Math.random() * 10 - 5) }}
      animate={{ opacity: 1, y: 0, rotate: rotation }}
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
      className={cn(
        "flex w-full mb-8 relative z-10",
        isPirate ? "justify-start" : "justify-end"
      )}
    >
      <div className="relative max-w-[85%] md:max-w-[70%] group">
        
        {/* Shadow Element (Separate because clip-path cuts off box-shadow) */}
        <div 
          className={cn(
            "absolute inset-0 translate-y-2 translate-x-1 bg-black/40 blur-sm",
            tornVariant
          )} 
        />

        {/* The "Paper" */}
        <div
          className={cn(
            "relative p-6 pr-8 min-w-[120px]",
            "bg-paper-texture",
            tornVariant,
            isPirate
              ? "bg-[#eaddcf] text-[#2a1a10]" // Lighter parchment for Pirate
              : "bg-[#d4c5a9] text-[#1a0f0a]"  // Slightly darker/aged for User
          )}
        >
          {/* Decorative Ink Splatter (CSS Radial Gradient) */}
          <div className="absolute top-0 right-0 w-full h-full pointer-events-none opacity-10 bg-[radial-gradient(circle_at_90%_10%,_var(--tw-gradient-stops))] from-black/20 via-transparent to-transparent" />

          {/* Author Name / Label */}
          <span className={cn(
            "block text-xs font-pirate uppercase tracking-widest mb-1 opacity-70",
            isPirate ? "text-pirate-blood" : "text-pirate-ocean"
          )}>
            {isPirate ? "Captain's Log" : "Shipmate"}
          </span>

          {/* Message Text */}
          <p className={cn(
            "text-lg md:text-2xl leading-relaxed drop-shadow-sm",
            isPirate ? "font-pirate" : "font-map"
          )}>
            {body}
          </p>

          {/* Timestamp as a "stamp" */}
          <span className="block text-[10px] font-mono mt-3 text-right opacity-50 uppercase tracking-widest">
            {new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </span>

          {/* Wax Seal for Pirate */}
          {isPirate && (
            <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-pirate-blood rounded-full flex items-center justify-center shadow-md border-2 border-red-900 opacity-90 group-hover:scale-110 transition-transform">
              <span className="text-xl opacity-80 mix-blend-multiply text-black">⚓</span>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}