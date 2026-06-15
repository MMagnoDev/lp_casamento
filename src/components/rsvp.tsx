"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Check, Spinner } from "@phosphor-icons/react";
import confetti from "canvas-confetti";

export default function Rsvp() {
  const [name, setName] = useState("");
  const [guests, setGuests] = useState("1");
  const [status, setStatus] = useState<"confirmed" | "declined" | null>(null);
  const [note, setNote] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    if (!status) return;

    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      if (status === "confirmed") {
        confetti({
          particleCount: 80,
          spread: 60,
          origin: { y: 0.65 },
          colors: ["#8F6E56", "#B99E85", "#DCD0C0"],
        });
      }
    }, 1200);
  };

  return (
    <div className="w-full bg-[#F5EFEB] p-6 md:p-8 rounded-[3rem] border border-border/80 shadow-sm">
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
            <div>
              <label htmlFor="name" className="block text-[10px] uppercase tracking-[0.2em] text-primary mb-2 font-medium">
                Nome Completo
              </label>
              <input
                type="text"
                id="name"
                required
                disabled={loading}
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ex: Amanda Santos"
                className="w-full bg-card/50 border border-border rounded-full px-5 py-3.5 text-xs text-foreground placeholder-accent/60 focus:outline-none focus:ring-1 focus:ring-primary/40 focus:border-primary transition disabled:opacity-50"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-[10px] uppercase tracking-[0.2em] text-primary mb-2 font-medium">
                  Presença
                </label>
                <div className="flex gap-2">
                  <button
                    type="button"
                    disabled={loading}
                    onClick={() => setStatus("confirmed")}
                    className={`flex-1 py-3 rounded-full border text-[10px] uppercase tracking-wider font-semibold transition ${
                      status === "confirmed"
                        ? "bg-primary border-primary text-white"
                        : "bg-transparent border-border text-primary hover:border-primary/50"
                    }`}
                  >
                    Vou
                  </button>
                  <button
                    type="button"
                    disabled={loading}
                    onClick={() => setStatus("declined")}
                    className={`flex-1 py-3 rounded-full border text-[10px] uppercase tracking-wider font-semibold transition ${
                      status === "declined"
                        ? "bg-accent border-accent text-white"
                        : "bg-transparent border-border text-primary hover:border-accent/50"
                    }`}
                  >
                    Não vou
                  </button>
                </div>
              </div>

              <div>
                <label htmlFor="guests" className="block text-[10px] uppercase tracking-[0.2em] text-primary mb-2 font-medium">
                  Acompanhantes
                </label>
                <select
                  id="guests"
                  disabled={loading || status === "declined"}
                  value={guests}
                  onChange={(e) => setGuests(e.target.value)}
                  className="w-full bg-card/50 border border-border rounded-full px-5 py-3.5 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-primary/40 focus:border-primary transition disabled:opacity-50 appearance-none cursor-pointer"
                >
                  <option value="1">Apenas eu (1)</option>
                  <option value="2">Eu + 1 acompanhante (2)</option>
                  <option value="3">Eu + 2 acompanhantes (3)</option>
                  <option value="4">Eu + 3 acompanhantes (4)</option>
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="note" className="block text-[10px] uppercase tracking-[0.2em] text-primary mb-2 font-medium">
                Recado aos noivos
              </label>
              <textarea
                id="note"
                rows={3}
                disabled={loading}
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Deixe uma mensagem (opcional)"
                className="w-full bg-card/50 border border-border rounded-[2rem] px-5 py-3.5 text-xs text-foreground placeholder-accent/60 focus:outline-none focus:ring-1 focus:ring-primary/40 focus:border-primary transition disabled:opacity-50 resize-none"
              />
            </div>

            <motion.button
              whileHover={{ scale: 1.03, y: -1 }}
              whileTap={{ scale: 0.99 }}
              type="submit"
              disabled={loading || !status}
              className="w-full bg-primary hover:bg-primary-hover text-white py-3.5 rounded-full font-medium tracking-wider text-[10px] uppercase shadow-sm transition flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <Spinner className="animate-spin" size={14} />
                  <span>Confirmando...</span>
                </>
              ) : (
                <span>Confirmar Presença</span>
              )}
            </motion.button>
          </motion.form>
        ) : (
          <motion.div
            key="rsvp-success"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-8 space-y-4"
          >
            <div className="w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-4">
              <Check size={20} />
            </div>
            <h3 className="font-serif text-xl font-light text-primary">
              {status === "confirmed" ? "Presença Confirmada!" : "Agradecemos o Retorno!"}
            </h3>
            <p className="text-foreground/85 text-xs leading-relaxed max-w-xs mx-auto">
              {status === "confirmed"
                ? `Que alegria! Mal podemos esperar para celebrar com você no nosso grande dia.`
                : "Sentiremos sua falta, mas agradecemos por nos avisar com antecedência."}
            </p>
            <button
              onClick={() => {
                setSubmitted(false);
                setName("");
                setNote("");
                setStatus(null);
              }}
              className="text-primary hover:underline text-[10px] tracking-widest uppercase font-medium pt-4 block mx-auto"
            >
              Enviar outra resposta
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
