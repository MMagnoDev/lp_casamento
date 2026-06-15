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
            className="w-full sm:w-[calc(50%-12px)] shrink-0 snap-start group bg-[#F5EFEB]/95 border border-border/40 rounded-none hover:shadow-md transition duration-300 flex flex-col"
          >
            <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#F5EFEB]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={gift.imageUrl}
                alt={gift.name}
                className="w-full h-full object-cover group-hover:scale-103 transition duration-700 rounded-none"
              />
            </div>
            
            <div className="p-6 flex-1 flex flex-col justify-between space-y-4 rounded-none">
              <div className="space-y-1">
                <span className="text-[8px] uppercase tracking-[0.2em] text-[#8F6E56]/85 font-semibold block mb-0.5">
                  {gift.category}
                </span>
                <h4 className="font-serif text-base font-medium text-foreground tracking-wide line-clamp-1">
                  {gift.name}
                </h4>
                <p className="text-[#8F6E56] text-xs font-semibold mt-1 font-sans">
                  R$ {gift.price.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                </p>
              </div>

              <button
                disabled={gift.reserved}
                onClick={() => setSelectedGift(gift)}
                className={`w-full py-3 text-[9px] uppercase tracking-wider font-semibold transition flex items-center justify-center gap-2 rounded-none border border-transparent ${
                  gift.reserved
                    ? "bg-transparent border border-border text-primary/45 cursor-not-allowed"
                    : "bg-[#8F6E56] hover:bg-[#7A5C46] text-[#FAF6F3] shadow-sm cursor-pointer"
                }`}
              >
                <Gift size={12} />
                <span>{gift.reserved ? "Presenteado" : "Presentear"}</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-between items-center max-w-lg mx-auto gap-4">
        {/* Navigation buttons */}
        <div className="flex gap-2">
          <button 
            onClick={() => scroll("left")}
            className="w-9 h-9 border border-border/80 flex items-center justify-center text-primary hover:bg-card/40 transition cursor-pointer"
            aria-label="Anterior"
          >
            <CaretLeft size={16} />
          </button>
          <button 
            onClick={() => scroll("right")}
            className="w-9 h-9 border border-border/80 flex items-center justify-center text-primary hover:bg-card/40 transition cursor-pointer"
            aria-label="Próximo"
          >
            <CaretRight size={16} />
          </button>
        </div>

        <div className="text-right border-l border-border/40 pl-4">
          <p className="text-[#8F6E56] text-[9px] uppercase tracking-wider font-medium italic">
            “Os presentes são simbólicos e os valores revertidos ao casal.”
          </p>
        </div>
      </div>

      {/* Gift Modal */}
      <AnimatePresence>
        {selectedGift && (
          <div className="fixed inset-0 bg-[#3C2D24]/20 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              className="bg-[#FAF6F3] border border-border max-w-md w-full rounded-[3rem] p-6 shadow-xl relative"
            >
              <button
                onClick={() => {
                  setSelectedGift(null);
                  setShowPixDetails(false);
                }}
                className="absolute top-4 right-4 text-primary/60 hover:text-primary transition"
              >
                <X size={18} />
              </button>

              {!showPixDetails ? (
                <div className="space-y-4 text-center">
                  <div className="w-10 h-10 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-2">
                    <Gift size={20} />
                  </div>
                  <h3 className="font-serif text-lg font-light text-foreground">
                    Confirmar Presente
                  </h3>
                  <p className="text-xs text-primary leading-relaxed font-light">
                    Você escolheu presentear com o item: <br />
                    <strong className="text-foreground font-semibold">{selectedGift.name}</strong>.
                  </p>
                  <div className="bg-card p-3 rounded-full border border-border flex justify-between items-center max-w-xs mx-auto px-4">
                    <span className="text-primary text-[9px] uppercase tracking-wider font-semibold">Valor:</span>
                    <span className="font-semibold text-primary text-sm">
                      R$ {selectedGift.price.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                    </span>
                  </div>
                  <div className="flex gap-3 pt-2">
                    <button
                      onClick={() => setSelectedGift(null)}
                      className="flex-1 border border-border hover:bg-card/40 text-primary py-2.5 rounded-full text-[10px] uppercase tracking-wider transition font-semibold"
                    >
                      Cancelar
                    </button>
                    <button
                      onClick={() => handleConfirmGift(selectedGift.id)}
                      className="flex-1 bg-primary hover:bg-primary-hover text-white py-2.5 rounded-full text-[10px] uppercase tracking-wider transition shadow-sm font-semibold"
                    >
                      Confirmar
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-4 text-center">
                  <div className="w-10 h-10 bg-accent/10 text-accent rounded-full flex items-center justify-center mx-auto mb-2">
                    <Check size={20} />
                  </div>
                  <h3 className="font-serif text-lg font-light text-foreground">
                    Reserva Confirmada!
                  </h3>
                  <p className="text-xs text-primary leading-relaxed font-light">
                    Para concluir a compra do presente, realize o PIX com o valor sugerido.
                  </p>

                  <div className="bg-card p-4 rounded-[2rem] border border-border space-y-3 text-left">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-primary/70 font-medium">Chave PIX:</span>
                      <button
                        onClick={handleCopyPix}
                        className="text-primary hover:underline flex items-center gap-1 font-semibold"
                      >
                        {copied ? <Check size={12} /> : <Copy size={12} />}
                        <span className="text-[9px] uppercase tracking-wider">{copied ? "Copiado" : "Copiar"}</span>
                      </button>
                    </div>
                    <p className="font-mono text-xs text-foreground select-all break-all bg-background p-2.5 rounded-xl border border-border">
                      isadoraewander@pix.com
                    </p>
                    <div className="flex justify-between items-center text-xs pt-2.5 border-t border-border">
                      <span className="text-primary/70 font-medium">Valor sugerido:</span>
                      <span className="font-semibold text-primary">
                        R$ {selectedGift.price.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2 pt-2">
                    <a
                      href={`https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(
                        `Olá! Realizei o PIX para o presente "${selectedGift.name}" no valor de R$ ${selectedGift.price.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}. Segue o comprovante em anexo!`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full bg-[#25D366] hover:bg-[#20BA56] text-white py-2.5 rounded-full text-[10px] uppercase tracking-wider transition font-semibold flex items-center justify-center gap-2 shadow-sm"
                    >
                      <WhatsappLogo size={14} weight="fill" />
                      <span>Enviar Comprovante</span>
                    </a>
                    <button
                      onClick={() => {
                        setSelectedGift(null);
                        setShowPixDetails(false);
                      }}
                      className="w-full border border-border hover:bg-card/40 text-primary py-2.5 rounded-full text-[10px] uppercase tracking-wider transition font-semibold"
                    >
                      Fechar
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
