"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { PaperPlaneRight, User, Heart } from "@phosphor-icons/react";

interface GuestMessage {
  id: number;
  name: string;
  message: string;
  date: string;
}

const INITIAL_MESSAGES: GuestMessage[] = [
  {
    id: 1,
    name: "Ana e Roberto",
    message: "Queridos Isadora e Wander, que alegria ver esse amor se consolidando! Desejamos toda a felicidade do mundo nessa nova caminhada.",
    date: "10/06/2026",
  },
  {
    id: 2,
    name: "Thiago Souza",
    message: "Parabéns, casal! Que a cumplicidade e o respeito guiem sempre vocês. Grande abraço!",
    date: "09/06/2026",
  },
];

export default function Guestbook() {
  const [messages, setMessages] = useState<GuestMessage[]>(INITIAL_MESSAGES);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmitMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;

    setLoading(true);
    setTimeout(() => {
      const newMessage: GuestMessage = {
        id: Date.now(),
        name: name.trim(),
        message: message.trim(),
        date: new Date().toLocaleDateString("pt-BR"),
      };

      setMessages((prev) => [newMessage, ...prev]);
      setName("");
      setMessage("");
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Form Area */}
      <div className="lg:col-span-1 lg:order-2 bg-[#FAF6F3] border border-border/80 p-6 rounded-[3rem] h-fit shadow-sm">
        <h4 className="font-serif text-base font-light text-foreground mb-4 flex items-center gap-2">
          <Heart size={18} className="text-primary" weight="fill" />
          <span>Escreva seus votos</span>
        </h4>
        
        <form onSubmit={handleSubmitMessage} className="space-y-4">
          <div>
            <label htmlFor="guestbook-name" className="block text-[10px] uppercase tracking-wider text-primary mb-1 font-medium">
              Seu Nome
            </label>
            <input
              type="text"
              id="guestbook-name"
              required
              disabled={loading}
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ex: Tios Ricardo e Sandra"
              className="w-full bg-card/50 border border-border rounded-full px-4 py-3 text-xs text-foreground placeholder-accent/60 focus:outline-none focus:ring-1 focus:ring-primary/40 focus:border-primary transition"
            />
          </div>

          <div>
            <label htmlFor="guestbook-message" className="block text-[10px] uppercase tracking-wider text-primary mb-1 font-medium">
              Mensagem
            </label>
            <textarea
              id="guestbook-message"
              required
              rows={3}
              disabled={loading}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Escreva uma mensagem especial..."
              className="w-full bg-card/50 border border-border rounded-[2rem] px-4 py-3 text-xs text-foreground placeholder-accent/60 focus:outline-none focus:ring-1 focus:ring-primary/40 focus:border-primary transition resize-none"
            />
          </div>

          <motion.button
            whileHover={{ scale: 1.03, y: -1 }}
            whileTap={{ scale: 0.99 }}
            type="submit"
            disabled={loading}
            className="w-full bg-primary hover:bg-primary-hover text-white py-3 rounded-full text-xs uppercase tracking-wider font-semibold transition flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? (
              <span>Enviando...</span>
            ) : (
              <>
                <span>Enviar Recado</span>
                <PaperPlaneRight size={14} />
              </>
            )}
          </motion.button>
        </form>
      </div>

      {/* Messages List */}
      <div className="lg:col-span-2 lg:order-1 space-y-4 max-h-[360px] overflow-y-auto pr-2">
        <AnimatePresence initial={false}>
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-[#FAF6F3] border border-border/60 p-5 rounded-[3rem] space-y-3 relative shadow-sm"
            >
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-full bg-card border border-border flex items-center justify-center text-primary/70">
                    <User size={12} />
                  </div>
                  <span className="font-serif font-light text-sm text-foreground">
                    {msg.name}
                  </span>
                </div>
                <span className="text-[10px] text-primary/60 font-sans font-medium">{msg.date}</span>
              </div>
              <p className="text-foreground/90 text-xs leading-relaxed pl-9 font-sans font-light">
                {msg.message}
              </p>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
