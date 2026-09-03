"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { 
  Gift, 
  Copy, 
  Check, 
  X, 
  MagnifyingGlass, 
  ArrowLeft, 
  WhatsappLogo, 
  Funnel,
  Sparkle
} from "@phosphor-icons/react";
import { GIFTS_DATABASE, GiftItem } from "@/data/gifts";

const WHATSAPP_PHONE = "553799113057";

const CATEGORIES = [
  "Todos",
  "Lua de Mel",
  "Cozinha",
  "Cama e Banho",
  "Eletros",
  "Bar & Bebidas",
  "Viagem & Casa",
];

export default function PresentesPage() {
  const [gifts, setGifts] = useState<GiftItem[]>(GIFTS_DATABASE);
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"default" | "price-asc" | "price-desc">("default");
  const [selectedGift, setSelectedGift] = useState<GiftItem | null>(null);
  const [copied, setCopied] = useState(false);
  const [showPixDetails, setShowPixDetails] = useState(false);

  // Filter and Sort Logic
  const filteredGifts = useMemo(() => {
    return gifts
      .filter((gift) => {
        const matchesCategory =
          selectedCategory === "Todos" || gift.category === selectedCategory;
        const matchesSearch = gift.name
          .toLowerCase()
          .includes(searchQuery.toLowerCase().trim());
        return matchesCategory && matchesSearch;
      })
      .sort((a, b) => {
        if (sortBy === "price-asc") return a.price - b.price;
        if (sortBy === "price-desc") return b.price - a.price;
        return a.id - b.id;
      });
  }, [gifts, selectedCategory, searchQuery, sortBy]);

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
    <div className="min-h-screen flex flex-col font-sans bg-[#FAF6F3] text-espresso selection:bg-primary/20 selection:text-primary">
      {/* Top Header Bar */}
      <header className="sticky top-0 z-40 bg-[#FAF6F3]/90 backdrop-blur-md border-b border-border/50 py-4 px-6 md:px-12 transition-editorial">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-espresso/80 hover:text-primary transition-editorial text-[10px] uppercase font-semibold tracking-widest group"
          >
            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
            <span>Voltar ao Início</span>
          </Link>

          <Link href="/" className="flex items-center">
            <img
              src="/img/logo2.webp"
              alt="Isadora & Wander"
              className="h-8 md:h-9 w-auto object-contain"
            />
          </Link>

          <Link
            href="/#rsvp"
            className="hidden sm:inline-flex items-center gap-1.5 bg-primary hover:bg-[#7A5C46] text-[#FAF6F3] px-4 py-2 rounded-subtle-btn text-[9px] font-semibold uppercase tracking-wider transition shadow-sm active:scale-95"
          >
            <span>Confirmar Presença</span>
          </Link>
        </div>
      </header>

      {/* Hero / Header Section */}
      <section className="relative py-16 md:py-24 px-6 md:px-12 bg-gradient-to-b from-[#FAF6F3] to-[#F5EFEB]/60 border-b border-border/60">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <div className="flex justify-center">
            <svg className="w-16 h-6 text-[#8F6E56]/60" viewBox="0 0 100 30" fill="currentColor">
              <path d="M50,20 C42,15 28,10 15,17 C28,8 42,12 50,20 Z" />
              <path d="M50,20 C58,15 72,10 85,17 C72,8 58,12 50,20 Z" />
              <path d="M50,7 C50,7 48.5,5 47,5 C45,5 44,6.5 44,8 C44,11 47.5,13 50,15 C52.5,13 56,11 56,8 C56,6.5 55,5 53,5 C51.5,5 50,7 50,7 Z" />
            </svg>
          </div>

          <div className="space-y-3">
            <span className="text-[9px] uppercase tracking-[0.25em] text-[#8F6E56] font-semibold block">
              Lista de Casamento Completa
            </span>
            <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl font-light tracking-wide text-espresso">
              Todos os <span className="italic text-primary">Presentes</span>
            </h1>
          </div>

          <div className="flex justify-center items-center py-1 text-border">
            <svg className="w-28 h-3" viewBox="0 0 120 10" fill="none" stroke="currentColor" strokeWidth="1">
              <path d="M0,5 L50,5 C52,5 54,3 56,3 C58,3 59,5 60,5 C61,5 62,7 64,7 C66,7 68,5 70,5 L120,5" />
              <circle cx="60" cy="5" r="1.5" fill="currentColor" />
            </svg>
          </div>

          <p className="text-espresso/80 text-xs md:text-sm font-light max-w-xl mx-auto leading-relaxed">
            Preparamos com muito carinho uma lista de <strong>90 presentes simbólicos</strong> e cotas especiais para o início da nossa vida a dois. Escolha a opção que mais toca seu coração!
          </p>

          <p className="text-[#8F6E56] text-[9px] uppercase tracking-wider font-semibold italic">
            "Os presentes são simbólicos e os valores revertidos ao casal via PIX."
          </p>
        </div>
      </section>

      {/* Main Content: Search, Filter & Grid */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-6 md:px-12 py-12 space-y-8">
        {/* Controls Bar (Search & Sort) */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-[#FAF6F3] p-4 rounded-2xl border border-border">
          {/* Search Input */}
          <div className="relative w-full md:max-w-md">
            <MagnifyingGlass
              size={18}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-espresso/40"
            />
            <input
              type="text"
              placeholder="Buscar presentes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-[#FAF6F3] border border-border/80 rounded-full text-xs text-espresso focus:outline-none focus:border-primary transition"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-espresso/40 hover:text-espresso text-xs"
              >
                ✕
              </button>
            )}
          </div>

          {/* Sort & Count */}
          <div className="flex items-center justify-between md:justify-end w-full md:w-auto gap-4">
            <span className="text-[10px] uppercase font-semibold text-espresso/60 tracking-wider">
              {filteredGifts.length} {filteredGifts.length === 1 ? "item" : "presentes"}
            </span>

            <div className="flex items-center gap-2">
              <label htmlFor="sort" className="text-[10px] uppercase font-semibold text-espresso/60 tracking-wider hidden sm:inline">
                Ordenar por:
              </label>
              <select
                id="sort"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-[#FAF6F3] border border-border/80 text-espresso text-xs rounded-full px-3 py-2 focus:outline-none focus:border-primary cursor-pointer"
              >
                <option value="default">Padrão</option>
                <option value="price-asc">Menor Preço</option>
                <option value="price-desc">Maior Preço</option>
              </select>
            </div>
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`shrink-0 px-4 py-2 rounded-full text-[10px] font-semibold uppercase tracking-wider transition-editorial active:scale-95 cursor-pointer border ${
                  isSelected
                    ? "bg-[#8F6E56] text-[#FAF6F3] border-[#8F6E56] shadow-sm"
                    : "bg-[#FAF6F3] hover:bg-[#F5EFEB] text-espresso/80 border-border"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Gifts Grid (Responsive 4 columns) */}
        {filteredGifts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredGifts.map((gift) => (
              <motion.div
                key={gift.id}
                layout
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-[#FAF6F3] border border-border p-4 flex flex-col justify-between space-y-4 transition-editorial hover:shadow-md group rounded-xl"
              >
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#F5EFEB] border border-border/10 rounded-lg select-none">
                  <Image
                    src={gift.imageUrl}
                    alt={gift.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover transition-editorial group-hover:scale-105"
                  />
                  <div className="absolute top-2.5 left-2.5 bg-[#FAF6F3]/90 backdrop-blur-sm border border-white/20 px-2.5 py-0.5 rounded-full shadow-sm z-10">
                    <span className="text-[7.5px] uppercase tracking-widest text-[#8F6E56] font-semibold block">
                      {gift.category}
                    </span>
                  </div>
                </div>

                <div className="space-y-1.5 px-0.5 flex-1 flex flex-col justify-between">
                  <h3 className="font-serif text-sm font-normal text-espresso tracking-wide line-clamp-2 min-h-[2.5rem]">
                    {gift.name}
                  </h3>
                  <p className="text-[#8F6E56] text-sm font-semibold font-sans">
                    R$ {gift.price.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                  </p>
                </div>

                <button
                  disabled={gift.reserved}
                  onClick={() => setSelectedGift(gift)}
                  className={`w-full py-2.5 text-[9px] uppercase tracking-[0.2em] font-semibold transition-editorial flex items-center justify-center gap-2 rounded-full border cursor-pointer ${
                    gift.reserved
                      ? "bg-transparent border-border text-primary/45 cursor-not-allowed"
                      : "bg-[#8F6E56] hover:bg-[#7A5C46] text-[#FAF6F3] border-transparent shadow-sm hover:shadow-md active:scale-95"
                  }`}
                >
                  <Gift size={13} />
                  <span>{gift.reserved ? "Presenteado" : "Presentear"}</span>
                </button>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 space-y-4 bg-[#F5EFEB]/40 rounded-3xl border border-dashed border-border">
            <Gift size={36} className="text-espresso/40 mx-auto" />
            <h3 className="font-serif text-lg font-light text-espresso">Nenhum presente encontrado</h3>
            <p className="text-xs text-espresso/60 max-w-xs mx-auto">
              Tente buscar por outro termo ou selecione uma categoria diferente.
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("Todos");
              }}
              className="mt-2 text-[10px] uppercase tracking-wider font-semibold text-primary underline"
            >
              Limpar Filtros
            </button>
          </div>
        )}
      </main>

      {/* Gift Details / PIX Modal */}
      <AnimatePresence>
        {selectedGift && (
          <div className="fixed inset-0 bg-[#2A1E17]/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.98, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98, y: 10 }}
              transition={{ duration: 0.35, ease: [0.32, 0.72, 0, 1] }}
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

      {/* Footer */}
      <footer className="bg-card text-foreground py-12 border-t border-border/60 mt-16">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left">
          <div className="space-y-2">
            <img
              src="/img/logo1.webp"
              alt="Isadora & Wander"
              className="h-8 md:h-10 w-auto object-contain mx-auto md:mx-0 opacity-90"
            />
            <p className="text-[#8F6E56] text-[9px] tracking-[0.25em] uppercase font-sans font-semibold">
              16 de Outubro de 2026
            </p>
          </div>
          <p className="text-espresso/70 text-[10px] uppercase tracking-widest font-medium">
            © 2026 Isadora & Wander. Todos os direitos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
}
