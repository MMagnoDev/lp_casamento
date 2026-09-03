"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { Gift, Copy, Check, X, ArrowRight, WhatsappLogo } from "@phosphor-icons/react";
import { GIFTS_DATABASE, GiftItem } from "@/data/gifts";

const WHATSAPP_PHONE = "553799113057";

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
        <Image
          src={gift.imageUrl}
          alt={gift.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          draggable={false}
          className="object-cover transition-editorial group-hover:scale-105 select-none"
        />
        <div className="absolute top-3 left-3 bg-[#FAF6F3]/90 backdrop-blur-sm border border-white/20 px-3 py-1 rounded-full shadow-sm z-10">
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
  const [gifts, setGifts] = useState<GiftItem[]>(GIFTS_DATABASE);
  const [selectedGift, setSelectedGift] = useState<GiftItem | null>(null);
  const [copied, setCopied] = useState(false);
  const [showPixDetails, setShowPixDetails] = useState(false);

  // Interaction refs for continuous scroll
  const containerRef = useRef<HTMLDivElement>(null);
  const group1Ref = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);
  const posRef = useRef(0);
  const isDraggingRef = useRef(false);
  const isInteractingRef = useRef(false);
  const dragStartXRef = useRef(0);
  const dragScrollRef = useRef(0);
  const draggedRef = useRef(false);
  const resumeTimerRef = useRef<NodeJS.Timeout | null>(null);
  const groupWidthRef = useRef(0);

  const SPEED = 40; // px/s

  useEffect(() => {
    const measure = () => {
      const g = group1Ref.current;
      if (g) {
        groupWidthRef.current = g.offsetWidth + 24;
      }
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [gifts.length]);

  useEffect(() => {
    if (selectedGift) {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      return;
    }

    const container = containerRef.current;
    if (!container) return;

    posRef.current = container.scrollLeft;
    let lastTime = performance.now();

    const loop = (now: number) => {
      const delta = (now - lastTime) / 1000;
      lastTime = now;

      if (!isInteractingRef.current) {
        const gw = groupWidthRef.current;
        if (gw > 0) {
          posRef.current += SPEED * delta;
          if (posRef.current >= gw) {
            posRef.current -= gw;
          }
          container.scrollLeft = Math.round(posRef.current);
        }
      } else {
        posRef.current = container.scrollLeft;
      }

      rafRef.current = requestAnimationFrame(loop);
    };

    rafRef.current = requestAnimationFrame(loop);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [selectedGift, gifts.length]);

  useEffect(() => {
    const onUp = () => {
      if (isDraggingRef.current) {
        isDraggingRef.current = false;
        endInteraction();
      }
    };
    window.addEventListener("mouseup", onUp);
    return () => window.removeEventListener("mouseup", onUp);
  }, []);

  const startInteraction = () => {
    isInteractingRef.current = true;
    if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
    posRef.current = containerRef.current?.scrollLeft ?? posRef.current;
  };

  const endInteraction = () => {
    if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
    resumeTimerRef.current = setTimeout(() => {
      isInteractingRef.current = false;
      posRef.current = containerRef.current?.scrollLeft ?? posRef.current;
    }, 300);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    const container = containerRef.current;
    if (!container) return;
    isDraggingRef.current = true;
    draggedRef.current = false;
    startInteraction();
    dragStartXRef.current = e.pageX - container.offsetLeft;
    dragScrollRef.current = container.scrollLeft;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDraggingRef.current) return;
    e.preventDefault();
    const container = containerRef.current;
    if (!container) return;
    const x = e.pageX - container.offsetLeft;
    const walk = (x - dragStartXRef.current) * 1.5;
    if (Math.abs(walk) > 5) draggedRef.current = true;
    container.scrollLeft = dragScrollRef.current - walk;
    posRef.current = container.scrollLeft;
  };

  const handleMouseUpOrLeave = () => {
    if (isDraggingRef.current) {
      isDraggingRef.current = false;
      endInteraction();
    }
  };

  const handleClickCapture = (e: React.MouseEvent) => {
    if (draggedRef.current) {
      e.preventDefault();
      e.stopPropagation();
    }
  };

  const handleScroll = () => {
    const container = containerRef.current;
    if (!container) return;
    const gw = groupWidthRef.current;
    if (gw <= 0) return;
    if (container.scrollLeft >= gw) {
      container.scrollLeft -= gw;
      posRef.current = container.scrollLeft;
    } else if (container.scrollLeft < 0) {
      container.scrollLeft += gw;
      posRef.current = container.scrollLeft;
    } else if (isInteractingRef.current) {
      posRef.current = container.scrollLeft;
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
    <div className="space-y-8 w-full overflow-hidden">
      {/* Infinite Scroll Carousel */}
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
          className="flex gap-6 overflow-x-auto scrollbar-none cursor-grab active:cursor-grabbing"
          style={{ WebkitOverflowScrolling: "touch" }}
        >
          {/* Group 1 — real items */}
          <div ref={group1Ref} className="flex gap-6 shrink-0">
            {gifts.slice(0, 30).map((gift) => (
              <GiftCard
                key={`g1-${gift.id}`}
                gift={gift}
                onSelect={setSelectedGift}
                className="w-[260px] md:w-[320px]"
              />
            ))}
          </div>
          {/* Group 2 — seamless clone */}
          <div className="flex gap-6 shrink-0" aria-hidden="true">
            {gifts.slice(0, 30).map((gift) => (
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

      {/* Action CTA & Subtitle */}
      <div className="flex flex-col sm:flex-row justify-between items-center max-w-2xl mx-auto gap-4 pt-2">
        <p className="text-[#8F6E56] text-[9px] uppercase tracking-wider font-semibold italic text-center sm:text-left">
          "Os presentes são simbólicos e os valores revertidos ao casal."
        </p>

        <Link
          href="/presentes"
          className="inline-flex items-center gap-2 bg-[#8F6E56] hover:bg-[#7A5C46] text-[#FAF6F3] px-6 py-3 rounded-full text-[10px] font-semibold uppercase tracking-wider transition-editorial shadow-sm hover:shadow-md active:scale-95 shrink-0"
        >
          <Gift size={14} />
          <span>Ver todos os presentes (90 opções)</span>
          <ArrowRight size={12} />
        </Link>
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
