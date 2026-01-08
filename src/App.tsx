import { useState, useEffect, useRef } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "../convex/_generated/api";
import { MessageBubble } from "./components/MessageBubble";
import { TypingIndicator } from "./components/TypingIndicator";
import { Compass, Send, Map as MapIcon } from "lucide-react";

function App() {
  const messages = useQuery(api.messages.list);
  const sendMessage = useMutation(api.messages.send);
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const body = newMessage;
    setNewMessage("");
    await sendMessage({ body, author: "user" });
  };

  const isPirateTyping = messages && messages.length > 0 && messages[messages.length - 1].author === "user";

  return (
    <div className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden">
      
      {/* --- Atmospheric Layers --- */}
      
      {/* 1. Vignette Overlay (Darkens edges of the screen) */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.6)_100%)] z-20" />
      
      {/* 2. Floating Dust Particles (Simple CSS animation could be added here) */}

      {/* --- Main Content Area: The Map Table --- */}
      <div className="relative w-full max-w-5xl h-full md:h-[90vh] flex flex-col bg-[#e4d5b7] md:rounded-[40px] shadow-2xl overflow-hidden border-[12px] border-[#3e2723] z-10">
        
        {/* Map Background (The actual map texture) */}
        <div className="absolute inset-0 bg-[url('/old-map.svg')] bg-cover opacity-80 mix-blend-multiply pointer-events-none" />
        
        {/* Header: The Ship's Log Title */}
        <header className="relative z-30 p-6 flex items-center justify-between bg-gradient-to-b from-[#2c1810]/10 to-transparent">
          <div className="flex items-center space-x-4 bg-parchment-light/90 px-6 py-3 rounded-full border-2 border-pirate-ink/20 shadow-lg backdrop-blur-sm transform rotate-1">
            <div className="w-10 h-10 bg-pirate-ink rounded-full flex items-center justify-center border-2 border-pirate-gold text-pirate-gold">
              <MapIcon size={20} />
            </div>
            <div>
              <h1 className="text-3xl font-pirate text-pirate-ink leading-none">Pirate Chat</h1>
              <p className="text-xs font-map uppercase tracking-widest text-pirate-blood">Captain's Log: Day 42</p>
            </div>
          </div>
          
          {/* Decorative Compass (Rotates slowly) */}
          <div className="hidden md:block opacity-80">
             <Compass size={64} className="text-pirate-ink animate-[spin_10s_linear_infinite]" strokeWidth={1} />
          </div>
        </header>

        {/* Messages: The Scattered Notes */}
        <main className="flex-1 relative overflow-y-auto p-4 md:p-8 space-y-8 scroll-smooth z-20">
          {!messages ? (
            <div className="flex justify-center items-center h-full">
              <div className="animate-spin text-4xl">⚓</div>
            </div>
          ) : (
            <>
              {messages.length === 0 && (
                <div className="flex flex-col items-center justify-center h-[50vh] opacity-60">
                  <span className="text-6xl mb-4">🏴‍☠️</span>
                  <p className="text-2xl font-pirate text-pirate-ink">The seas be quiet today...</p>
                  <p className="font-map italic">Cast a line to wake the Captain!</p>
                </div>
              )}
              
              {messages.map((msg) => (
                <MessageBubble
                  key={msg._id}
                  body={msg.body}
                  author={msg.author}
                  timestamp={msg.timestamp}
                />
              ))}
              
              {isPirateTyping && <TypingIndicator />}
              <div ref={messagesEndRef} className="h-4" />
            </>
          )}
        </main>

        {/* Footer: The Writing Desk */}
        <footer className="relative z-30 p-6 bg-[#2c1810] border-t-4 border-[#1a0f0a] shadow-[0_-10px_40px_rgba(0,0,0,0.5)]">
          <form onSubmit={handleSubmit} className="flex items-end gap-4 max-w-3xl mx-auto">
            
            {/* Inkwell Decoration */}
            <div className="hidden md:flex flex-col items-center mb-2">
               <div className="w-10 h-12 bg-black rounded-b-xl border border-white/10 relative overflow-hidden">
                 <div className="absolute top-2 w-full h-full bg-blue-900/50 blur-sm"></div>
               </div>
            </div>

            <div className="flex-1 relative group">
              {/* Input Field styling to look like paper strip */}
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Scribble yer message here..."
                className="w-full p-4 pl-6 pr-14 bg-[#f4e4bc] text-[#2c1810] font-map text-lg md:text-2xl rounded-sm border-none focus:ring-0 shadow-[inset_0_2px_10px_rgba(0,0,0,0.2)] placeholder:text-[#2c1810]/40 clip-torn-2 transform transition-transform focus:scale-[1.01]"
              />
              <div className="absolute right-0 bottom-0 top-0 w-16 bg-gradient-to-l from-[#e4d5b7] to-transparent pointer-events-none" />
            </div>

            <button
              type="submit"
              disabled={!newMessage.trim()}
              className="h-14 w-14 md:h-16 md:w-16 bg-pirate-blood hover:bg-[#6a0000] text-[#f4e4bc] rounded-full flex items-center justify-center transition-all duration-200 shadow-lg hover:shadow-red-900/50 border-4 border-[#2c1810] hover:rotate-12 hover:scale-110 disabled:opacity-50 disabled:hover:scale-100 disabled:hover:rotate-0"
            >
              <Send className="w-6 h-6 md:w-8 md:h-8 ml-1" />
            </button>
          </form>
        </footer>

      </div>
    </div>
  );
}

export default App;
