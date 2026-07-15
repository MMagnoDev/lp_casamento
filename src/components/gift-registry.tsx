"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Gift, Copy, Check, X, CaretLeft, CaretRight, WhatsappLogo } from "@phosphor-icons/react";

const WHATSAPP_PHONE = "5511999999999"; // Substitua pelo número de telefone do casal (com DDI + DDD, apenas números)


interface GiftItem {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  category: string;
  reserved: boolean;
}

const INITIAL_GIFTS: GiftItem[] = [
  {
    id: 1,
    name: "Drink para lua de mel",
    price: 120,
    imageUrl: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?q=80&w=600&auto=format&fit=crop",
    category: "Lua de Mel",
    reserved: false,
  },
  {
    id: 2,
    name: "Kit excesso de bagagem",
    price: 150,
    imageUrl: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=600&auto=format&fit=crop",
    category: "Viagem",
    reserved: false,
  },
  {
    id: 3,
    name: "Quadro para sala de estar",
    price: 200,
    imageUrl: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?q=80&w=600&auto=format&fit=crop",
    category: "Nova Casa",
    reserved: false,
  },
  {
    id: 4,
    name: "Jantar especial dos noivos",
    price: 250,
    imageUrl: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=600&auto=format&fit=crop",
    category: "Lua de Mel",
    reserved: false,
  },
  {
    id: 5,
    name: "Passeio na lua de mel",
    price: 300,
    imageUrl: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=600&auto=format&fit=crop",
    category: "Viagem",
    reserved: false,
  },
  {
    id: 6,
    name: "Cota para nova casa",
    price: 500,
    imageUrl: "https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=600&auto=format&fit=crop",
    category: "Nova Casa",
    reserved: false,
  },
];

export default function GiftRegistry() {
  const [gifts, setGifts] = useState<GiftItem[]>(INITIAL_GIFTS);
  const [selectedGift, setSelectedGift] = useState<GiftItem | null>(null);
  const [copied, setCopied] = useState(false);
  const [showPixDetails, setShowPixDetails] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isHovered || selectedGift) return;

    const timer = setInterval(() => {
      if (containerRef.current) {
        const cardWidth = containerRef.current.firstElementChild?.clientWidth || 0;
        const gap = 24; // gap-6
        const maxScrollLeft = containerRef.current.scrollWidth - containerRef.current.clientWidth;

        if (containerRef.current.scrollLeft >= maxScrollLeft - 10) {
          containerRef.current.scrollTo({ left: 0, behavior: "smooth" });
        } else {
          containerRef.current.scrollBy({ left: cardWidth + gap, behavior: "smooth" });
        }
      }
    }, 4000); // Transitions automatically every 4 seconds

    return () => clearInterval(timer);
  }, [isHovered, selectedGift, gifts.length]);

  const scroll = (direction: "left" | "right") => {
    if (containerRef.current) {
      const cardWidth = containerRef.current.firstElementChild?.clientWidth || 0;
      const gap = 24; // gap-6
      const scrollAmount = direction === "left" ? -(cardWidth + gap) : (cardWidth + gap);
      containerRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  const handleCopyPix = () => {
    navigator.clipboard.writeText("isadoraewander@pix.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleConfirmGift = (giftId: number) => {
    setGifts((prev) =>
      prev.map((gift) => (gift.id === giftId ? { ...gift, reserved: true } : gift))
    );
    setShowPixDetails(true);
  };

  return (
    <div 
      className="space-y-8 w-full overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div 
        ref={containerRef}
        className="flex gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-none pb-4"
      >
        {gifts.map((gift) => (
          <div
            key={gift.id}
            className="w-full sm:w-[calc(50%-12px)] shrink-0 snap-start bg-[#FAF6F3] border border-border p-4 flex flex-col justify-between space-y-4 transition-editorial hover:shadow-md group"
          >
            <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#F5EFEB] border border-border/10">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={gift.imageUrl}
                alt={gift.name}
                className="w-full h-full object-cover transition-editorial group-hover:scale-105"
              />
              <div className="absolute top-3 left-3 bg-[#FAF6F3]/90 backdrop-blur-sm border border-white/20 px-3 py-1 rounded-full shadow-sm">
                <span className="text-[8px] uppercase tracking-widest text-[#8F6E56] font-semibold block">
                  {gift.category}
                </span>
              </div>
            </div>
            
            <div className="space-y-1 px-1">
              <h4 className="font-serif text-base font-light text-espresso tracking-wide line-clamp-1">
                {gift.name}
              </h4>
              <p className="text-[#8F6E56] text-xs font-semibold mt-1 font-sans">
                R$ {gift.price.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
              </p>
            </div>

            <button
              disabled={gift.reserved}
              onClick={() => setSelectedGift(gift)}
              className={`w-full py-3 text-[9px] uppercase tracking-[0.2em] font-semibold transition-editorial flex items-center justify-center gap-2 rounded-full border ${
                gift.reserved
                  ? "bg-transparent border border-border text-primary/45 cursor-not-allowed"
                  : "bg-[#8F6E56] hover:bg-[#7A5C46] text-[#FAF6F3] border-transparent shadow-sm cursor-pointer hover:shadow-md active:scale-[0.98]"
              }`}
            >
              <Gift size={12} />
              <span>{gift.reserved ? "Presenteado" : "Presentear"}</span>
            </button>
          </div>
        ))}
      </div>

      <div className="flex justify-between items-center max-w-lg mx-auto gap-4">
        {/* Navigation buttons */}
        <div className="flex gap-2">
          <button 
            onClick={() => scroll("left")}
            className="w-10 h-10 border border-border/60 rounded-full flex items-center justify-center text-primary bg-[#FAF6F3]/50 hover:bg-[#FAF6F3] hover:border-primary/50 transition-editorial cursor-pointer active:scale-95 shadow-sm"
            aria-label="Anterior"
          >
            <CaretLeft size={16} />
          </button>
          <button 
            onClick={() => scroll("right")}
            className="w-10 h-10 border border-border/60 rounded-full flex items-center justify-center text-primary bg-[#FAF6F3]/50 hover:bg-[#FAF6F3] hover:border-primary/50 transition-editorial cursor-pointer active:scale-95 shadow-sm"
            aria-label="Próximo"
          >
            <CaretRight size={16} />
          </button>
        </div>

        <div className="text-right border-l border-border/40 pl-4">
          <p className="text-[#8F6E56] text-[9px] uppercase tracking-wider font-semibold italic">
            “Os presentes são simbólicos e os valores revertidos ao casal.”
          </p>
        </div>
      </div>

      {/* Gift Modal */}
      <AnimatePresence>
        {selectedGift && (
          <div className="fixed inset-0 bg-[#2A1E17]/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.98, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98, y: 10 }}
              transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
              className="bg-[#FAF6F3] border border-border/60 max-w-md w-full rounded-[2.5rem] p-8 shadow-2xl relative"
            >
              <button
                onClick={() => {
                  setSelectedGift(null);
                  setShowPixDetails(false);
                }}
                className="absolute top-5 right-5 text-primary/60 hover:text-primary transition-editorial w-8 h-8 rounded-full border border-border/45 flex items-center justify-center bg-[#F5EFEB]/50 hover:bg-[#F5EFEB]"
              >
                <X size={16} />
              </button>

              {!showPixDetails ? (
                <div className="space-y-6 text-center">
                  <div className="w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-2">
                    <Gift size={22} />
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-serif text-xl font-light text-espresso">
                      Confirmar Presente
                    </h3>
                    <p className="text-xs text-espresso/70 leading-relaxed font-light">
                      Você escolheu presentear os noivos com o item simbólico: <br />
                      <strong className="text-espresso font-semibold">{selectedGift.name}</strong>.
                    </p>
                  </div>
                  <div className="bg-[#F5EFEB]/60 p-4 rounded-2xl border border-border flex justify-between items-center max-w-xs mx-auto px-5 shadow-[inset_0_1px_2px_rgba(60,45,36,0.02)]">
                    <span className="text-espresso/70 text-[9px] uppercase tracking-widest font-semibold">Valor Sugerido:</span>
                    <span className="font-semibold text-primary text-base">
                      R$ {selectedGift.price.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                    </span>
                  </div>
                  <div className="flex gap-4 pt-2">
                    <button
                      onClick={() => setSelectedGift(null)}
                      className="flex-1 border border-border hover:bg-[#F5EFEB]/50 text-espresso py-3 rounded-full text-[10px] uppercase tracking-wider transition-editorial font-semibold active:scale-95 cursor-pointer"
                    >
                      Cancelar
                    </button>
                    <button
                      onClick={() => handleConfirmGift(selectedGift.id)}
                      className="flex-1 bg-primary hover:bg-[#7A5C46] text-[#FAF6F3] py-3 rounded-full text-[10px] uppercase tracking-wider transition-editorial shadow-sm font-semibold active:scale-95 cursor-pointer"
                    >
                      Confirmar
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-6 text-center">
                  <div className="w-12 h-12 bg-[#5C6B5E]/10 text-[#5C6B5E] rounded-full flex items-center justify-center mx-auto mb-2">
                    <Check size={22} />
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-serif text-xl font-light text-espresso">
                      Reserva Confirmada!
                    </h3>
                    <p className="text-xs text-espresso/70 leading-relaxed font-light">
                      Para concluir a compra do presente, realize o PIX com o valor correspondente e nos envie o comprovante.
                    </p>
                  </div>

                  <div className="bg-[#F5EFEB]/80 p-5 rounded-[1.5rem] border border-border/80 space-y-4 text-left shadow-[inset_0_1px_2px_rgba(60,45,36,0.02)]">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-espresso/70 font-semibold text-[10px] uppercase tracking-wider">Chave PIX (E-mail):</span>
                      <button
                        onClick={handleCopyPix}
                        className="text-primary hover:text-primary-hover flex items-center gap-1.5 font-semibold transition-editorial cursor-pointer"
                      >
                        {copied ? <Check size={12} className="text-[#5C6B5E]" /> : <Copy size={12} />}
                        <span className="text-[9px] uppercase tracking-widest">{copied ? "Copiado!" : "Copiar"}</span>
                      </button>
                    </div>
                    <p className="font-mono text-xs text-espresso select-all break-all bg-[#FAF6F3] p-3 rounded-xl border border-border/50 text-center font-semibold">
                      isadoraewander@pix.com
                    </p>
                    <div className="flex justify-between items-center text-xs pt-3.5 border-t border-border/30">
                      <span className="text-espresso/70 font-semibold text-[10px] uppercase tracking-wider">Valor total sugerido:</span>
                      <span className="font-semibold text-primary text-sm">
                        R$ {selectedGift.price.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col gap-3 pt-2">
                    <a
                      href={`https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(
                        `Olá! Reservei o presente simbólico "${selectedGift.name}" no valor de R$ ${selectedGift.price.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}. Segue em anexo o comprovante do PIX!`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full bg-[#25D366] hover:bg-[#20BA56] text-white py-3 rounded-full text-[10px] uppercase tracking-wider transition-editorial font-semibold flex items-center justify-center gap-2 shadow-md active:scale-98 cursor-pointer"
                    >
                      <WhatsappLogo size={16} weight="fill" />
                      <span>Enviar Comprovante</span>
                    </a>
                    <button
                      onClick={() => {
                        setSelectedGift(null);
                        setShowPixDetails(false);
                      }}
                      className="w-full border border-border hover:bg-[#F5EFEB]/50 text-espresso py-3 rounded-full text-[10px] uppercase tracking-wider transition-editorial font-semibold active:scale-95 cursor-pointer"
                    >
                      Fechar Janela
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
