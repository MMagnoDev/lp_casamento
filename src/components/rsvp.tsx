"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Check } from "@phosphor-icons/react";
import confetti from "canvas-confetti";

export default function Rsvp() {
  const [name, setName] = useState("");
  const [attending, setAttending] = useState<boolean | null>(null);
  const [companions, setCompanions] = useState(0);
  const [note, setNote] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [status, setStatus] = useState<"success" | "error" | null>(null);
  const [whatsappLink, setWhatsappLink] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    if (attending === null) return;

    setLoading(true);

    const attendanceText = attending ? "Sim, com certeza" : "Não poderei ir";
    const companionsText = attending ? (companions === 0 ? "Nenhum acompanhante (Apenas eu)" : `${companions} acompanhante(s)`) : "N/A";
    const noteText = note.trim() ? note.trim() : "Sem mensagem";

    const message = `Olá! Confirmação de Presença - Casamento de Isadora e Wander:\n\n` +
      `👤 Nome: ${name.trim()}\n` +
      `💍 Confirmado? ${attendanceText}\n` +
      (attending ? `👥 Acompanhantes: ${companionsText}\n` : "") +
      `✉️ Mensagem: ${noteText}`;

    const whatsappUrl = `https://wa.me/553799113057?text=${encodeURIComponent(message)}`;
    setWhatsappLink(whatsappUrl);
    
    // Abrir o WhatsApp
    window.open(whatsappUrl, "_blank");

    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      setStatus("success");
      if (attending) {
        confetti({
          particleCount: 80,
          spread: 60,
          origin: { y: 0.65 },
          colors: ["#8F6E56", "#5C6B5E", "#DCD0C0"],
        });
      }
    }, 1000);
  };

  return (
    <div className="w-full bg-[#FAF6F3] border border-border p-6 md:p-8 shadow-sm">
      <AnimatePresence mode="wait">
        {!submitted ? (
          <motion.form
            key="rsvp-form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            <div className="space-y-2">
              <label htmlFor="name" className="block text-[9px] uppercase tracking-widest text-espresso font-semibold">
                Nome Completo
              </label>
              <input
                type="text"
                id="name"
                required
                disabled={loading}
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-transparent border border-border/60 p-3 text-xs text-espresso rounded-none focus:outline-none focus:border-primary transition-editorial placeholder-espresso/30"
                placeholder="Ex: João da Silva"
              />
            </div>

            <div className="space-y-2">
              <span className="block text-[9px] uppercase tracking-widest text-espresso font-semibold">
                Você irá ao casamento?
              </span>
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  disabled={loading}
                  onClick={() => setAttending(true)}
                  className={`py-3 text-[9px] uppercase tracking-wider font-semibold transition-editorial cursor-pointer border ${
                    attending === true
                      ? "bg-primary text-[#FAF6F3] border-primary"
                      : "bg-[#FAF6F3] text-espresso/70 hover:bg-[#F5EFEB]/50 border-border/60"
                  }`}
                >
                  Sim, com certeza
                </button>
                <button
                  type="button"
                  disabled={loading}
                  onClick={() => setAttending(false)}
                  className={`py-3 text-[9px] uppercase tracking-wider font-semibold transition-editorial cursor-pointer border ${
                    attending === false
                      ? "bg-[#5C6B5E] text-[#FAF6F3] border-[#5C6B5E]"
                      : "bg-[#FAF6F3] text-espresso/70 hover:bg-[#F5EFEB]/50 border-border/60"
                  }`}
                >
                  Não poderei ir
                </button>
              </div>
            </div>

            <AnimatePresence>
              {attending === true && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-4 overflow-hidden"
                >
                  <div className="space-y-2">
                    <label htmlFor="companions" className="block text-[9px] uppercase tracking-widest text-espresso font-semibold">
                      Número de acompanhantes
                    </label>
                    <select
                      id="companions"
                      value={companions}
                      disabled={loading}
                      onChange={(e) => setCompanions(Number(e.target.value))}
                      className="w-full bg-transparent border border-border/60 p-3 text-xs text-espresso rounded-none focus:outline-none focus:border-primary transition-editorial"
                    >
                      <option value={0} className="bg-[#FAF6F3] text-espresso">Nenhum acompanhante (Apenas eu)</option>
                      <option value={1} className="bg-[#FAF6F3] text-espresso">1 acompanhante</option>
                      <option value={2} className="bg-[#FAF6F3] text-espresso">2 acompanhantes</option>
                      <option value={3} className="bg-[#FAF6F3] text-espresso">3 acompanhantes</option>
                    </select>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="space-y-2">
              <label htmlFor="note" className="block text-[9px] uppercase tracking-widest text-espresso font-semibold">
                Mensagem para os noivos (Opcional)
              </label>
              <textarea
                id="note"
                rows={4}
                disabled={loading}
                value={note}
                onChange={(e) => setNote(e.target.value)}
                className="w-full bg-transparent border border-border/60 p-3 text-xs text-espresso rounded-none focus:outline-none focus:border-primary transition-editorial placeholder-espresso/30 resize-none"
                placeholder="Deixe uma mensagem carinhosa..."
              />
            </div>

            {status === "error" && (
              <p className="text-red-600 text-[10px] uppercase tracking-wider font-semibold text-center">
                Ocorreu um erro ao enviar. Tente novamente ou nos avise.
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary hover:bg-[#7A5C46] text-[#FAF6F3] py-4 text-[9px] uppercase tracking-[0.25em] font-semibold transition-editorial flex items-center justify-center gap-2 shadow-sm hover:shadow-md active:scale-[0.98] cursor-pointer"
            >
              {loading ? (
                <span>Enviando...</span>
              ) : (
                <>
                  <Check size={12} />
                  <span>Confirmar Presença</span>
                </>
              )}
            </button>
          </motion.form>
        ) : (
          <motion.div
            key="rsvp-success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-12 space-y-6"
          >
            <div className="w-16 h-16 bg-[#5C6B5E]/10 text-[#5C6B5E] rounded-full flex items-center justify-center mx-auto">
              <Check size={28} />
            </div>
            <div className="space-y-2">
              <h3 className="font-serif text-xl font-light text-espresso">Presença Confirmada!</h3>
              <p className="text-espresso/70 text-xs font-sans font-light leading-relaxed max-w-xs mx-auto">
                Agradecemos por confirmar sua resposta. Caso a conversa do WhatsApp não tenha aberto, clique no botão abaixo para enviar os dados.
              </p>
            </div>
            <div className="pt-2">
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#25D366] hover:bg-[#20BA56] text-white px-6 py-3.5 rounded-full text-[10px] font-semibold uppercase tracking-widest transition shadow-md active:scale-95 inline-flex items-center gap-2"
              >
                <span>Enviar pelo WhatsApp</span>
              </a>
            </div>
            <button
              onClick={() => {
                setSubmitted(false);
                setName("");
                setNote("");
                setAttending(null);
                setStatus(null);
                setWhatsappLink("");
              }}
              className="text-primary hover:text-[#7A5C46] text-[9px] tracking-widest uppercase font-semibold pt-4 block mx-auto transition-editorial cursor-pointer"
            >
              Enviar outra resposta
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
