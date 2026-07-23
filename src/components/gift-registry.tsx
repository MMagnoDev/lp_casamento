"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Gift, Copy, Check, X, CaretLeft, CaretRight, WhatsappLogo } from "@phosphor-icons/react";

const WHATSAPP_PHONE = "553799113057"; // Substitua pelo número de telefone do casal (com DDI + DDD, apenas números)


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
    imageUrl: "/img/gifts/drink.png",
    category: "Lua de Mel",
    reserved: false,
  },
  {
    id: 2,
    name: "Kit de toalhas macias",
    price: 160,
    imageUrl: "/img/gifts/toalhas.png",
    category: "Cama e Banho",
    reserved: false,
  },
  {
    id: 3,
    name: "Kit excesso de bagagem",
    price: 180,
    imageUrl: "/img/gifts/bagagem.png",
    category: "Viagem",
    reserved: false,
  },
  {
    id: 4,
    name: "Jogo de lençóis 100% algodão",
    price: 220,
    imageUrl: "/img/gifts/lencois.png",
    category: "Cama e Banho",
    reserved: false,
  },
  {
    id: 5,
    name: "Jantar especial dos noivos",
    price: 280,
    imageUrl: "/img/gifts/jantar.png",
    category: "Lua de Mel",
    reserved: false,
  },
  {
    id: 6,
    name: "Bebedouro elétrico refrigerado",
    price: 380,
    imageUrl: "/img/gifts/bebedouro.png",
    category: "Eletros",
    reserved: false,
  },
  {
    id: 7,
    name: "Air Fryer digital",
    price: 450,
    imageUrl: "/img/gifts/airfryer.png",
    category: "Eletros",
    reserved: false,
  },
  {
    id: 8,
    name: "Passeio inesquecível de barco",
    price: 520,
    imageUrl: "/img/gifts/passeio.png",
    category: "Lua de Mel",
    reserved: false,
  },
  {
    id: 9,
    name: "Forno elétrico de bancada",
    price: 580,
    imageUrl: "/img/gifts/forno.png",
    category: "Eletros",
    reserved: false,
  },
  {
    id: 10,
    name: "Mala de viagem grande premium",
    price: 650,
    imageUrl: "/img/gifts/mala.png",
    category: "Viagem",
    reserved: false,
  },
  {
    id: 11,
    name: "Cota de hospedagem dos noivos",
    price: 780,
    imageUrl: "/img/gifts/hospedagem.png",
    category: "Lua de Mel",
    reserved: false,
  },
  {
    id: 12,
    name: "Fogão com forno de alta performance",
    price: 890,
    imageUrl: "/img/gifts/fogao.png",
    category: "Eletros",
    reserved: false,
  },
];

function GiftCard({ 
  gift, 
  onSelect, 
  className = "" 
}: { 
  gift: GiftItem; 
  onSelect: (gift: GiftItem) => void; 
  className?: string;
}) {
  return (
    <div
      className={`shrink-0 bg-[#FAF6F3] border border-border p-4 flex flex-col justify-between space-y-4 transition-editorial hover:shadow-md group ${className}`}
    >
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#F5EFEB] border border-border/10 select-none">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={gift.imageUrl}
          alt={gift.name}
          draggable={false}
          className="w-full h-full object-cover transition-editorial group-hover:scale-105 select-none"
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
        onClick={() => onSelect(gift)}
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
  );
}

export default function GiftRegistry() {
  const [gifts, setGifts] = useState<GiftItem[]>(INITIAL_GIFTS);
  const [selectedGift, setSelectedGift] = useState<GiftItem | null>(null);
  const [copied, setCopied] = useState(false);
  const [showPixDetails, setShowPixDetails] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  
  // Unified ref & interaction state
  const containerRef = useRef<HTMLDivElement>(null);
  const [isInteracting, setIsInteracting] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [dragged, setDragged] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeftState, setScrollLeftState] = useState(0);
  const interactionTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Floating point scroll accumulator to prevent browser integer truncation
  const scrollAccumulatorRef = useRef(0);

  // continuous scroll loop (pauses on touch/drag/modal open)
  useEffect(() => {
    const container = containerRef.current;
    if (!container || selectedGift) return;

    // Initialize accumulator to the current scroll value on start
    scrollAccumulatorRef.current = container.scrollLeft;

    let animationFrameId: number;
    let lastTime = performance.now();
    const speed = 35; // Pixels per second

    const scrollLoop = (time: number) => {
      if (!isInteracting) {
        const delta = (time - lastTime) / 1000;
        const scrollAmount = speed * delta;
        
        // Accumulate float
        scrollAccumulatorRef.current += scrollAmount;

        const firstGroup = container.firstElementChild as HTMLElement;
        if (firstGroup) {
          const firstGroupWidth = firstGroup.clientWidth + 24; // width + gap
          if (scrollAccumulatorRef.current >= firstGroupWidth) {
            scrollAccumulatorRef.current -= firstGroupWidth;
          }
        }

        // Set rounded integer to native element to bypass subpixel truncation
        container.scrollLeft = Math.round(scrollAccumulatorRef.current);
      } else {
        // Sync accumulator with user interaction
        scrollAccumulatorRef.current = container.scrollLeft;
      }
      lastTime = time;
      animationFrameId = requestAnimationFrame(scrollLoop);
    };

    animationFrameId = requestAnimationFrame(scrollLoop);

    return () => {
      cancelAnimationFrame(animationFrameId);
      if (interactionTimeoutRef.current) {
        clearTimeout(interactionTimeoutRef.current);
      }
    };
  }, [isInteracting, selectedGift, gifts.length]);

  // Global window listener to release drag state anywhere on mouseup
  useEffect(() => {
    if (!isDragging) return;

    const handleGlobalMouseUp = () => {
      setIsDragging(false);
      endInteraction();
    };

    window.addEventListener("mouseup", handleGlobalMouseUp);
    return () => {
      window.removeEventListener("mouseup", handleGlobalMouseUp);
    };
  }, [isDragging]);

  // Handles manual scroll wrapping in both directions
  const handleScroll = () => {
    const container = containerRef.current;
    if (!container) return;

    const firstGroup = container.firstElementChild as HTMLElement;
    if (!firstGroup) return;

    const firstGroupWidth = firstGroup.clientWidth + 24;

    if (container.scrollLeft >= firstGroupWidth * 2 - container.clientWidth) {
      container.scrollLeft -= firstGroupWidth;
      scrollAccumulatorRef.current = container.scrollLeft;
    } else if (container.scrollLeft <= 0) {
      container.scrollLeft += firstGroupWidth;
      scrollAccumulatorRef.current = container.scrollLeft;
    } else if (isInteracting) {
      // Sync accumulator while user is scrolling/dragging
      scrollAccumulatorRef.current = container.scrollLeft;
    }
  };

  const startInteraction = () => {
    setIsInteracting(true);
    if (interactionTimeoutRef.current) {
      clearTimeout(interactionTimeoutRef.current);
    }
    if (containerRef.current) {
      scrollAccumulatorRef.current = containerRef.current.scrollLeft;
    }
  };

  const endInteraction = () => {
    if (interactionTimeoutRef.current) {
      clearTimeout(interactionTimeoutRef.current);
    }
    interactionTimeoutRef.current = setTimeout(() => {
      setIsInteracting(false);
      if (containerRef.current) {
        scrollAccumulatorRef.current = containerRef.current.scrollLeft;
      }
    }, 300); // Resumes auto-scroll 300ms after user interaction ends
  };

  // Desktop Mouse Drag Scroll Handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    const container = containerRef.current;
    if (!container) return;

    setIsDragging(true);
    setDragged(false); // Reset drag state on click
    startInteraction();
    setStartX(e.pageX - container.offsetLeft);
    setScrollLeftState(container.scrollLeft);
    scrollAccumulatorRef.current = container.scrollLeft;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    e.preventDefault();

    const container = containerRef.current;
    if (!container) return;

    const x = e.pageX - container.offsetLeft;
    const walk = (x - startX) * 1.5; // multiplier for drag sensitivity

    if (Math.abs(walk) > 5) {
      setDragged(true); // Drag occurred
    }

    container.scrollLeft = scrollLeftState - walk;
    scrollAccumulatorRef.current = container.scrollLeft;
  };

  const handleMouseUpOrLeave = () => {
    if (isDragging) {
      setIsDragging(false);
      endInteraction();
    }
  };

  // Prevent clicking on cards when dragging
  const handleClickCapture = (e: React.MouseEvent) => {
    if (dragged) {
      e.preventDefault();
      e.stopPropagation();
    }
  };

  const handleCopyPix = () => {
    navigator.clipboard.writeText("37999351911");
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
      {/* Unified Infinite Scroll Carousel (Mobile & Desktop) */}
      <div className="relative w-full overflow-hidden py-2 select-none">
        <div 
          ref={containerRef}
          onScroll={handleScroll}
          onTouchStart={startInteraction}
          onTouchEnd={endInteraction}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUpOrLeave}
          onMouseLeave={handleMouseUpOrLeave}
          onClickCapture={handleClickCapture}
          className="flex gap-6 overflow-x-auto scrollbar-none snap-none cursor-grab active:cursor-grabbing"
          style={{ WebkitOverflowScrolling: "touch" }}
        >
          {/* Group 1 */}
          <div className="flex gap-6 shrink-0">
            {gifts.map((gift) => (
              <GiftCard 
                key={`g1-${gift.id}`} 
                gift={gift} 
                onSelect={setSelectedGift} 
                className="w-[260px] md:w-[320px]"
              />
            ))}
          </div>
          {/* Group 2 */}
          <div className="flex gap-6 shrink-0" aria-hidden="true">
            {gifts.map((gift) => (
              <GiftCard 
                key={`g2-${gift.id}`} 
                gift={gift} 
                onSelect={setSelectedGift} 
                className="w-[260px] md:w-[320px]"
              />
            ))}
          </div>
        </div>
      </div>

      <div className="flex justify-center items-center max-w-lg mx-auto gap-4">
        <div className="text-center pl-4 w-full">
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
                      <span className="text-espresso/70 font-semibold text-[10px] uppercase tracking-wider">Chave PIX Celular (PicPay):</span>
                      <button
                        onClick={handleCopyPix}
                        className="text-primary hover:text-primary-hover flex items-center gap-1.5 font-semibold transition-editorial cursor-pointer"
                      >
                        {copied ? <Check size={12} className="text-[#5C6B5E]" /> : <Copy size={12} />}
                        <span className="text-[9px] uppercase tracking-widest">{copied ? "Copiado!" : "Copiar"}</span>
                      </button>
                    </div>
                    <p className="font-mono text-sm text-espresso select-all break-all bg-[#FAF6F3] p-3 rounded-xl border border-border/50 text-center font-semibold tracking-wider">
                      3799935-1911
                    </p>
                    <p className="text-[9px] text-espresso/60 text-center mt-1">
                      Beneficiário: <strong className="font-medium text-espresso">Wander Ricardo Santos</strong>
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
