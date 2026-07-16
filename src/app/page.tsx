"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import Countdown from "@/components/countdown";
import GiftRegistry from "@/components/gift-registry";
import GodparentsManual from "@/components/godparents-manual";
import Rsvp from "@/components/rsvp";
import { Calendar, MapPin, Sparkle, Bed, Car, Train, DeviceMobile, List, X } from "@phosphor-icons/react";

// Fade Animation Helper Component
function FadeInSection({ children, id, className = "", style = {} }: { children: React.ReactNode; id?: string; className?: string; style?: React.CSSProperties }) {
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.8, ease: [0.32, 0.72, 0, 1] }}
      style={style}
      className={`min-h-[100dvh] flex flex-col justify-center py-24 md:py-32 overflow-hidden ${className}`}
    >
      <div className="w-full max-w-7xl mx-auto px-6">
        {children}
      </div>
    </motion.section>
  );
}

export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [currentHeroImage, setCurrentHeroImage] = useState(0);

  const localPhotos = [
    "/img/ensaio/0bf01d89-e2f1-4d3f-8013-c1c0e72c106e.jpg",
    "/img/ensaio/1b7525d0-0ab8-46ec-9ae9-5ddc0c5658dd.jpg",
    "/img/ensaio/4b6d6f91-80fd-4c05-b145-b5ab6679271b.jpg",
    "/img/ensaio/686a0a89-d214-47a4-9606-279ab673f558.jpg",
    "/img/ensaio/7575732f-e406-41f1-b3d2-317517ce6c2b.jpg",
    "/img/ensaio/8f45eda8-755c-4805-b680-aff5cc7efdfa.jpg",
    "/img/ensaio/c86482ec-c16f-41aa-935a-aa3dab6f5ae6.jpg",
  ];

  const [storyImage, setStoryImage] = useState("/img/ensaio/022878dc-0675-43e1-b3a2-11641fcff23e.jpg");
  const [heroImages, setHeroImages] = useState<string[]>(localPhotos);

  useEffect(() => {
    // Mantido apenas para inicialização simples sem loops desnecessários
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentHeroImage((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [heroImages.length]);

  return (
    <div className="min-h-screen flex flex-col font-sans selection:bg-primary/20 selection:text-primary bg-[#FAF6F3] overflow-x-hidden max-w-full w-full">
      {/* 0. Header / Navigation - Floating Glass Pill Menu */}
      <header className={`fixed top-0 left-0 w-full z-50 transition-editorial ${scrolled ? "py-3 px-4 md:px-12" : "py-6 px-6 md:px-16"
        }`}>
        <div className={`max-w-5xl mx-auto flex justify-between items-center transition-editorial ${scrolled
            ? "bg-[#FAF6F3]/80 backdrop-blur-md px-6 py-3 rounded-subtle-nav shadow-[0_4px_30px_rgba(60,45,36,0.04)]"
            : "bg-transparent px-0 py-0"
          }`}>
          {/* Logo Monogram */}
          <div className="flex flex-col items-center select-none py-1">
            <img
              src="/img/logo2.png"
              alt="Isadora & Wander Monograma"
              className="h-8 md:h-10 w-auto object-contain"
            />
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8 text-[9px] uppercase tracking-[0.25em] font-semibold text-espresso">
            <a href="#" className="hover:opacity-60 transition-editorial">Início</a>
            <a href="#sobre" className="hover:opacity-60 transition-editorial">História</a>
            <a href="#detalhes" className="hover:opacity-60 transition-editorial">Detalhes</a>
            <a href="#local" className="hover:opacity-60 transition-editorial">Local</a>
            <a href="#presentes" className="hover:opacity-60 transition-editorial">Presentes</a>
            <a href="#padrinhos" className="hover:opacity-60 transition-editorial">Padrinhos</a>
          </nav>

          {/* Desktop CTA Button */}
          <div className="hidden md:block">
            <motion.a
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              href="#rsvp"
              className="bg-primary hover:bg-[#7A5C46] text-[#FAF6F3] px-5 py-2.5 rounded-subtle-btn text-[9px] font-semibold uppercase tracking-wider transition-editorial shadow-sm inline-flex items-center gap-1.5 active:scale-95"
            >
              <span>Confirmar Presença</span>
              <span className="text-[10px]">↗</span>
            </motion.a>
          </div>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden w-9 h-9 rounded-subtle-btn border border-border/60 flex items-center justify-center text-espresso bg-[#FAF6F3]/50 hover:bg-[#FAF6F3] transition-editorial cursor-pointer"
            aria-label="Menu"
          >
            {menuOpen ? <X size={16} /> : <List size={16} />}
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-[#FAF6F3]/95 backdrop-blur-md flex flex-col justify-center items-center md:hidden"
          >
            <nav className="flex flex-col items-center gap-8 text-center">
              {[
                { name: "Início", href: "#" },
                { name: "Nossa História", href: "#sobre" },
                { name: "Detalhes", href: "#detalhes" },
                { name: "Como Chegar", href: "#local" },
                { name: "Lista de Presentes", href: "#presentes" },
                { name: "Manual dos Padrinhos", href: "#padrinhos" },
              ].map((item, index) => (
                <motion.a
                  key={item.name}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: index * 0.08, ease: [0.32, 0.72, 0, 1] }}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className="font-serif text-2xl font-light text-espresso tracking-wide hover:text-primary transition-colors"
                >
                  {item.name}
                </motion.a>
              ))}
              <motion.a
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6, ease: [0.32, 0.72, 0, 1] }}
                href="#rsvp"
                onClick={() => setMenuOpen(false)}
                className="bg-primary hover:bg-[#7A5C46] text-[#FAF6F3] px-8 py-3.5 rounded-subtle-btn text-[10px] font-semibold uppercase tracking-[0.2em] transition shadow-md inline-block mt-4"
              >
                Confirmar Presença
              </motion.a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 1. Capa inicial (Hero Section) */}
      <section className="relative h-[100dvh] min-h-[600px] flex flex-col justify-between overflow-hidden pt-24 pb-12">
        {/* Carousel Background */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <AnimatePresence mode="popLayout">
            <motion.div
              key={currentHeroImage}
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 0.88, scale: 1.05 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 2.0, ease: "easeInOut" }}
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url('${heroImages[currentHeroImage]}')` }}
            />
          </AnimatePresence>
          {/* Scrim horizontal wash overlay for left-aligned text readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#FAF6F3]/95 via-[#FAF6F3]/60 to-transparent z-10" />
        </div>

        {/* Spacer */}
        <div className="h-6" />

        {/* Left content */}
        <div className="relative z-10 max-w-5xl mx-auto px-6 text-left space-y-6 my-auto w-full">

          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-light tracking-wide leading-[1.1] text-espresso max-w-4xl">
            Vamos<br className="block md:hidden" /> celebrar <br />
            <span className="font-extralight italic text-primary">o amor</span>
          </h1>

          {/* Left-aligned separator */}
          <div className="flex items-center justify-start gap-4 max-w-xs">
            <div className="h-[1px] bg-border flex-1" />
            <span className="text-[#8F6E56] text-[8px]">♥</span>
            <div className="h-[1px] bg-border flex-1" />
          </div>

          <p className="text-[10px] md:text-xs text-espresso/80 tracking-[0.25em] uppercase font-semibold">
            16 de Outubro de 2026 &nbsp;•&nbsp; Santo Antônio do Monte/MG
          </p>

          <div className="pt-2 flex justify-start gap-4">
            <motion.a
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              href="#rsvp"
              className="bg-primary hover:bg-[#7A5C46] text-[#FAF6F3] px-8 py-3.5 rounded-subtle-btn text-[10px] font-semibold uppercase tracking-widest transition-editorial inline-flex items-center gap-2 shadow-md hover:shadow-lg active:scale-95 cursor-pointer"
            >
              <span>Confirmar Presença</span>
              <span className="text-[10px]">↗</span>
            </motion.a>
          </div>
        </div>

      </section>

      {/* 2. Sobre o casal + contagem regressiva (Bento Grid Asimétrico) */}
      <FadeInSection id="sobre" className="bg-[#FAF6F3] py-32 flex flex-col justify-center">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4 md:px-12 lg:px-20 items-stretch">
          {/* Card 1: Text Area (2/3 width) - Single Bezel Card */}
          <div className="md:col-span-2 bg-[#FAF6F3] border border-border p-8 md:p-10 flex flex-col justify-between space-y-6 transition-editorial hover:shadow-md">
            <div className="space-y-6">
              <div className="flex justify-start">
                <svg className="w-16 h-6 text-[#8F6E56]/60" viewBox="0 0 100 30" fill="currentColor">
                  <path d="M50,20 C42,15 28,10 15,17 C28,8 42,12 50,20 Z" />
                  <path d="M50,20 C58,15 72,10 85,17 C72,8 58,12 50,20 Z" />
                  <path d="M50,7 C50,7 48.5,5 47,5 C45,5 44,6.5 44,8 C44,11 47.5,13 50,15 C52.5,13 56,11 56,8 C56,6.5 55,5 53,5 C51.5,5 50,7 50,7 Z" />
                </svg>
              </div>

              <div className="space-y-4">
                <h2 className="font-serif text-4xl md:text-6xl text-espresso font-light tracking-wide leading-[1.1]">
                  O Nosso <br /> <span className="italic text-primary">Casamento</span>
                </h2>

                <div className="flex justify-start items-center py-1 text-border">
                  <svg className="w-28 h-3" viewBox="0 0 120 10" fill="none" stroke="currentColor" strokeWidth="1">
                    <path d="M0,5 L50,5 C52,5 54,3 56,3 C58,3 59,5 60,5 C61,5 62,7 64,7 C66,7 68,5 70,5 L120,5" />
                    <circle cx="60" cy="5" r="1.5" fill="currentColor" />
                  </svg>
                </div>

                <p className="text-espresso/90 text-sm leading-relaxed font-sans font-light tracking-wide max-w-[60ch]">
                  Sejam muito bem-vindos ao nosso space! Criamos este site para compartilhar com vocês cada detalhe planejado com muito carinho para o nosso grande dia. Aqui vocês encontrarão as dicas de hospedagem, local do evento, manual dos padrinhos e nossa lista de presentes simbólicos.
                </p>

                <p className="text-espresso/90 text-sm leading-relaxed font-sans font-light tracking-wide max-w-[60ch]">
                  Não se esqueçam de confirmar sua presença na aba de confirmação para nos ajudar na organização perfeita deste momento único.
                </p>
              </div>
            </div>

            <div className="pt-4 border-t border-border/30">
              <span className="font-serif text-sm italic text-[#8F6E56]">Com amor, Isadora & Wander.</span>
            </div>
          </div>

          {/* Card 2: Photo Area (1/3 width) - Single Bezel Card */}
          <div className="md:col-span-1 bg-[#FAF6F3] border border-border p-4 flex flex-col justify-between space-y-4 transition-editorial hover:shadow-md group">
            <div className="relative w-full flex-1 min-h-[300px] overflow-hidden bg-[#F5EFEB] border border-border/10">
              <motion.img
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.8, ease: [0.32, 0.72, 0, 1] }}
                src={storyImage}
                alt="Nosso Ensaio"
                onError={() => setStoryImage("/img/nossocasamento.png")}
                className="w-full h-full object-cover cursor-zoom-in"
              />
            </div>
            <div className="px-1 text-center">
              <span className="text-[8px] uppercase tracking-widest text-accent font-semibold">16.10.2026</span>
            </div>
          </div>

          {/* Card 3: Countdown Area (Full Width 3/3) - Single Bezel Card */}
          <div className="md:col-span-3 bg-[#FAF6F3] border border-border p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 transition-editorial hover:shadow-md">
            <div className="space-y-1 text-center md:text-left shrink-0">
              <span className="text-[8px] uppercase tracking-[0.25em] text-[#8F6E56] font-semibold block">Contagem Regressiva</span>
              <h3 className="font-serif text-xl font-light text-espresso italic">Para o grande sim...</h3>
            </div>
            <div className="w-full max-w-3xl">
              <Countdown />
            </div>
          </div>
        </div>
      </FadeInSection>

      {/* 3. Lista de presentes simbólicos */}
      <FadeInSection
        id="presentes"
        className="relative overflow-hidden py-32 border-y border-border/60 bg-[#F5EFEB]/50"
      >
        <div className="relative z-10 px-4 md:px-12 lg:px-20">
          <div className="flex flex-col lg:flex-row gap-16 items-start">
            {/* Left/Right side: 1/3 width for the big title */}
            <div className="w-full lg:w-1/3 space-y-6 text-center lg:text-left flex flex-col items-center lg:items-start bg-transparent p-0 z-10">
              <div className="space-y-3 w-full text-center lg:text-left">
                <span className="text-[8px] uppercase tracking-widest text-[#8F6E56] font-semibold block">Lista de Presentes</span>
                <h2 className="font-serif text-4xl md:text-6xl text-espresso font-light tracking-wide leading-[1.1]">
                  Lista de <br /> <span className="italic text-primary">Casamento</span>
                </h2>
              </div>

              {/* Separator */}
              <div className="flex justify-center lg:justify-start items-center py-1 text-border w-full">
                <svg className="w-28 h-3" viewBox="0 0 120 10" fill="none" stroke="currentColor" strokeWidth="1">
                  <path d="M0,5 L50,5 C52,5 54,3 56,3 C58,3 59,5 60,5 C61,5 62,7 64,7 C66,7 68,5 70,5 L120,5" />
                  <circle cx="60" cy="5" r="1.5" fill="currentColor" />
                </svg>
              </div>

              <p className="text-espresso/80 text-xs leading-relaxed font-sans font-light max-w-[35ch] mx-auto lg:mr-auto lg:ml-0 text-center lg:text-left">
                Caso queira nos presentear de forma simbólica, escolha uma das cotas ou presentes especiais abaixo. Os valores correspondentes serão transferidos diretamente para nós.
              </p>
            </div>

            {/* Right side: 2/3 width for the items */}
            <div className="w-full lg:w-2/3">
              <GiftRegistry />
            </div>
          </div>
        </div>
      </FadeInSection>

      {/* 4. Informações úteis para convidados (Editorial Split Layout) */}
      <FadeInSection id="detalhes" className="bg-[#FAF6F3]">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-stretch px-4 md:px-12 lg:px-20">
          <div className="lg:col-span-2 space-y-8 flex flex-col justify-between py-4">
            <div className="space-y-6">
              <div className="flex justify-start">
                <svg className="w-16 h-6 text-[#8F6E56]/60" viewBox="0 0 100 30" fill="currentColor">
                  <path d="M50,20 C42,15 28,10 15,17 C28,8 42,12 50,20 Z" />
                  <path d="M50,20 C58,15 72,10 85,17 C72,8 58,12 50,20 Z" />
                  <path d="M50,7 C50,7 48.5,5 47,5 C45,5 44,6.5 44,8 C44,11 47.5,13 50,15 C52.5,13 56,11 56,8 C56,6.5 55,5 53,5 C51.5,5 50,7 50,7 Z" />
                </svg>
              </div>

              <div className="space-y-4">
                <span className="text-[8px] uppercase tracking-widest text-[#8F6E56] font-semibold block">Informações Úteis</span>
                <h2 className="font-serif text-4xl md:text-6xl text-espresso font-light tracking-wide leading-[1.1]">
                  Detalhes do <br /> <span className="italic text-primary">Grande Dia</span>
                </h2>

                <div className="flex justify-start items-center py-1 text-border">
                  <svg className="w-28 h-3" viewBox="0 0 120 10" fill="none" stroke="currentColor" strokeWidth="1">
                    <path d="M0,5 L50,5 C52,5 54,3 56,3 C58,3 59,5 60,5 C61,5 62,7 64,7 C66,7 68,5 70,5 L120,5" />
                    <circle cx="60" cy="5" r="1.5" fill="currentColor" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="space-y-8 pt-4">
              <div className="flex gap-5 items-start">
                <div className="w-12 h-12 rounded-full border border-border/60 flex items-center justify-center text-primary bg-[#F5EFEB]/50 shrink-0">
                  <Calendar size={20} />
                </div>
                <div className="space-y-1">
                  <h4 className="font-serif text-base font-light text-espresso">Cerimônia e Festa</h4>
                  <p className="text-espresso/70 text-xs font-sans font-light leading-relaxed">
                    Sexta-feira, 16 de Outubro de 2026.<br />
                    • Recepção dos Padrinhos: 20:00<br />
                    • Início da Cerimônia: 20:30
                  </p>
                </div>
              </div>

              <div className="flex gap-5 items-start">
                <div className="w-12 h-12 rounded-full border border-border/60 flex items-center justify-center text-primary bg-[#F5EFEB]/50 shrink-0">
                  <MapPin size={20} />
                </div>
                <div className="space-y-1">
                  <h4 className="font-serif text-base font-light text-espresso">Cerimônia</h4>
                  <p className="text-espresso/70 text-xs font-sans font-light leading-relaxed">
                    Av. Francisco Teotônio de Castro, 1059 - Santo Antônio do Monte - MG.
                  </p>
                </div>
              </div>

              <div className="flex gap-5 items-start">
                <div className="w-12 h-12 rounded-full border border-border/60 flex items-center justify-center text-primary bg-[#F5EFEB]/50 shrink-0">
                  <MapPin size={20} />
                </div>
                <div className="space-y-1">
                  <h4 className="font-serif text-base font-light text-espresso">Festa</h4>
                  <p className="text-espresso/70 text-xs font-sans font-light leading-relaxed">
                    Avenida Senador Eduardo Azevedo, 921 - Mãe Chiquinha, Santo Antônio do Monte - MG.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-6 flex flex-wrap gap-4">
              <motion.a
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                href="https://maps.google.com/?q=Av.+Francisco+Teotonio+de+Castro,+1059+-+Santo+Antonio+do+Monte,+MG"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-primary hover:bg-[#7A5C46] text-[#FAF6F3] px-5 py-3.5 rounded-full text-[10px] font-semibold uppercase tracking-wider transition-editorial shadow-sm active:scale-95 cursor-pointer"
              >
                <MapPin size={14} />
                <span>Como ir para a Cerimônia</span>
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                href="https://maps.google.com/?q=Avenida+senador+Eduardo+Azevedo,+921+-+Santo+Antonio+do+Monte,+MG"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border border-primary text-primary hover:bg-primary/5 px-5 py-3.5 rounded-full text-[10px] font-semibold uppercase tracking-wider transition-editorial active:scale-95 cursor-pointer"
              >
                <MapPin size={14} />
                <span>Como ir para a Festa</span>
              </motion.a>
            </div>
          </div>

          {/* Right side: Hospedagem details - Single Bezel Card */}
          <div className="lg:col-span-1 bg-[#FAF6F3] border border-border p-8 md:p-10 flex flex-col justify-center transition-editorial hover:shadow-md space-y-6">
            <div className="w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center">
              <Bed size={22} />
            </div>
            <h4 className="font-serif text-xl font-light text-espresso">
              Hospedagem & <br /> <span className="italic text-primary">Deslocamento</span>
            </h4>
            <div className="space-y-4 text-espresso/80 text-xs leading-relaxed font-sans font-light border-t border-border/20 pt-6">
              <p>
                Para os convidados que vêm de fora ou desejam se hospedar na cidade, sugerimos as seguintes opções de hotéis em Santo Antônio do Monte:
              </p>
              <ul className="space-y-2 list-disc list-inside">
                <li><strong className="font-medium text-espresso">Hotel JR:</strong> (37) 3281-1066</li>
                <li><strong className="font-medium text-espresso">Hotel Planalto:</strong> (37) 3281-1632</li>
              </ul>
              <p className="pt-2">
                Recomendamos o deslocamento de carro, táxi ou carros de aplicativo para maior comodidade.
              </p>
            </div>
          </div>
        </div>
      </FadeInSection>

      {/* 5. Como Chegar / Local do Evento */}
      <FadeInSection id="local" className="bg-[#F2ECE6]/50 border-y border-border/60">
        <div className="flex flex-col lg:flex-row-reverse gap-12 items-stretch px-4 md:px-12 lg:px-20">
          {/* Right column (1/3 width) - Title and directions info */}
          <div className="w-full lg:w-1/3 flex flex-col justify-between space-y-8 text-center lg:text-right items-center lg:items-end py-4">
            <div className="space-y-6 w-full">
              <div className="flex justify-center lg:justify-end">
                <svg className="w-16 h-6 text-[#8F6E56]/60" viewBox="0 0 100 30" fill="currentColor">
                  <path d="M50,20 C42,15 28,10 15,17 C28,8 42,12 50,20 Z" />
                  <path d="M50,20 C58,15 72,10 85,17 C72,8 58,12 50,20 Z" />
                  <path d="M50,7 C50,7 48.5,5 47,5 C45,5 44,6.5 44,8 C44,11 47.5,13 50,15 C52.5,13 56,11 56,8 C56,6.5 55,5 53,5 C51.5,5 50,7 50,7 Z" />
                </svg>
              </div>

              <div className="space-y-4 w-full">
                <span className="text-[8px] uppercase tracking-widest text-[#8F6E56] font-semibold block">Local do Casamento</span>
                <h2 className="font-serif text-4xl md:text-6xl text-espresso font-light tracking-wide leading-[1.1]">
                  Como <br /> <span className="italic text-primary">Chegar</span>
                </h2>

                <div className="flex justify-center lg:justify-end items-center py-1 text-border">
                  <svg className="w-28 h-3" viewBox="0 0 120 10" fill="none" stroke="currentColor" strokeWidth="1">
                    <path d="M0,5 L50,5 C52,5 54,3 56,3 C58,3 59,5 60,5 C61,5 62,7 64,7 C66,7 68,5 70,5 L120,5" />
                    <circle cx="60" cy="5" r="1.5" fill="currentColor" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Directions details card - Single Bezel */}
            <div className="w-full bg-[#FAF6F3] border border-border p-6 space-y-5 text-left transition-editorial hover:shadow-md">
              <div className="flex gap-4 items-start">
                <div className="w-9 h-9 rounded-full border border-border/60 flex items-center justify-center text-primary bg-[#F5EFEB]/50 shrink-0">
                  <Car size={16} />
                </div>
                <div className="space-y-0.5">
                  <h4 className="font-serif text-sm font-medium text-espresso">De Carro</h4>
                  <p className="text-espresso/70 text-xs font-sans font-light leading-relaxed">
                    O local possui serviço de valet na porta e estacionamento conveniado próximo.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="w-9 h-9 rounded-full border border-border/60 flex items-center justify-center text-primary bg-[#F5EFEB]/50 shrink-0">
                  <Train size={16} />
                </div>
                <div className="space-y-0.5">
                  <h4 className="font-serif text-sm font-medium text-espresso">De Metrô</h4>
                  <p className="text-espresso/70 text-xs font-sans font-light leading-relaxed">
                    A estação <strong className="font-medium text-espresso">Vila Mariana</strong> (Linha 1 - Azul) fica a apenas 400m.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="w-9 h-9 rounded-full border border-border/60 flex items-center justify-center text-primary bg-[#F5EFEB]/50 shrink-0">
                  <DeviceMobile size={16} />
                </div>
                <div className="space-y-0.5">
                  <h4 className="font-serif text-sm font-medium text-espresso">De Aplicativo</h4>
                  <p className="text-espresso/70 text-xs font-sans font-light leading-relaxed">
                    Insira o endereço <strong className="font-medium text-espresso">Rua Domingos de Morais, 2561</strong> no app de preferência.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Left column (2/3 width) - Google Map - Inside Single Bezel */}
          <div className="w-full lg:w-2/3 flex flex-col justify-between space-y-6 py-4">
            <div className="w-full h-full min-h-[400px] bg-[#FAF6F3] border border-border shadow-sm relative overflow-hidden">
              <iframe
                src="https://maps.google.com/maps?q=Av.%20Francisco%20Teot%C3%B4nio%20de%20Castro,%201059%20-%20Santo%20Ant%C3%B4nio%20do%20Monte,%20MG,%2035560-000&t=&z=16&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: "450px" }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full opacity-90 hover:opacity-100 transition duration-300"
              />
            </div>
            <div className="flex flex-col sm:flex-row justify-between items-center text-center sm:text-left px-6 gap-4">
              <div className="space-y-1">
                <h4 className="font-serif text-sm font-semibold text-espresso">Localização da Cerimônia</h4>
                <p className="text-espresso/70 text-xs font-sans font-light">
                  Av. Francisco Teotônio de Castro, 1059 - Santo Antônio do Monte - MG
                </p>
              </div>
              <motion.a
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                href="https://maps.google.com/?q=Av.+Francisco+Teotonio+de+Castro,+1059+-+Santo+Antonio+do+Monte,+MG"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#8F6E56] hover:bg-[#7A5C46] text-[#FAF6F3] px-6 py-3 rounded-full text-[10px] font-semibold tracking-wider uppercase transition-editorial shadow-sm active:scale-95 cursor-pointer"
              >
                <MapPin size={12} />
                <span>Como Chegar</span>
              </motion.a>
            </div>
          </div>
        </div>
      </FadeInSection>

      {/* Manual dos Padrinhos */}
      <FadeInSection id="padrinhos" className="bg-[#FAF6F3] border-b border-border/60">
        <div className="px-4 md:px-12 lg:px-20">
          <div className="text-center lg:text-left w-full space-y-4 mb-16 flex flex-col items-center lg:items-start">
            <div className="flex justify-center lg:justify-start w-full">
              <svg className="w-16 h-6 text-[#8F6E56]/60" viewBox="0 0 100 30" fill="currentColor">
                <path d="M50,20 C42,15 28,10 15,17 C28,8 42,12 50,20 Z" />
                <path d="M50,20 C58,15 72,10 85,17 C72,8 58,12 50,20 Z" />
                <path d="M50,7 C50,7 48.5,5 47,5 C45,5 44,6.5 44,8 C44,11 47.5,13 50,15 C52.5,13 56,11 56,8 C56,6.5 55,5 53,5 C51.5,5 50,7 50,7 Z" />
              </svg>
            </div>

            <div className="space-y-4 w-full">
              <span className="text-[8px] uppercase tracking-widest text-[#8F6E56] font-semibold block">Orientações aos Padrinhos</span>
              <h2 className="font-serif text-4xl md:text-6xl text-espresso font-light tracking-wide leading-[1.1]">
                Manual dos <br /> <span className="italic text-primary">Padrinhos</span>
              </h2>

              <div className="flex justify-center lg:justify-start items-center py-1 text-border w-full">
                <svg className="w-28 h-3" viewBox="0 0 120 10" fill="none" stroke="currentColor" strokeWidth="1">
                  <path d="M0,5 L50,5 C52,5 54,3 56,3 C58,3 59,5 60,5 C61,5 62,7 64,7 C66,7 68,5 70,5 L120,5" />
                  <circle cx="60" cy="5" r="1.5" fill="currentColor" />
                </svg>
              </div>
            </div>

            <p className="text-espresso/80 text-xs leading-relaxed font-sans font-light text-center lg:text-left max-w-2xl">
              Queridos padrinhos e madrinhas, vocês fazem parte da nossa história e não poderíamos viver esse momento tão especial sem a presença de vocês ao nosso lado.
            </p>
          </div>
          <GodparentsManual />
        </div>
      </FadeInSection>

      {/* RSVP Form Section */}
      <FadeInSection id="rsvp" className="bg-[#F5EFEB]/50 border-b border-border/60">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center px-4 md:px-12 lg:px-20">
          <div className="lg:col-span-1 space-y-6 text-center lg:text-left">
            <div className="flex justify-center lg:justify-start">
              <svg className="w-16 h-6 text-[#8F6E56]/60" viewBox="0 0 100 30" fill="currentColor">
                <path d="M50,20 C42,15 28,10 15,17 C28,8 42,12 50,20 Z" />
                <path d="M50,20 C58,15 72,10 85,17 C72,8 58,12 50,20 Z" />
                <path d="M50,7 C50,7 48.5,5 47,5 C45,5 44,6.5 44,8 C44,11 47.5,13 50,15 C52.5,13 56,11 56,8 C56,6.5 55,5 53,5 C51.5,5 50,7 50,7 Z" />
              </svg>
            </div>

            <div className="space-y-4 text-center lg:text-left">
              <span className="text-[8px] uppercase tracking-widest text-[#8F6E56] font-semibold block">Confirmação de Presença</span>
              <h2 className="font-serif text-4xl md:text-6xl text-espresso font-light tracking-wide leading-[1.1]">
                Confirmar <br /> <span className="italic text-primary">Presença</span>
              </h2>

              <div className="flex justify-center lg:justify-start items-center py-1 text-border">
                <svg className="w-28 h-3" viewBox="0 0 120 10" fill="none" stroke="currentColor" strokeWidth="1">
                  <path d="M0,5 L50,5 C52,5 54,3 56,3 C58,3 59,5 60,5 C61,5 62,7 64,7 C66,7 68,5 70,5 L120,5" />
                  <circle cx="60" cy="5" r="1.5" fill="currentColor" />
                </svg>
              </div>
            </div>

            <p className="text-espresso/80 text-xs leading-relaxed font-sans font-light text-center lg:text-left max-w-sm mx-auto lg:mx-0">
              Por favor, confirme sua presença até o dia <strong className="font-medium text-espresso">16 de Setembro de 2026</strong>. É muito importante para nós podermos planejar tudo perfeitamente.
            </p>
          </div>
          <div className="lg:col-span-1">
            <Rsvp />
          </div>
        </div>
      </FadeInSection>

      {/* Footer */}
      <footer className="bg-card text-foreground py-16 border-t border-border/60">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8 text-center md:text-left">
          <div className="space-y-3">
            <img
              src="/img/logo1.png"
              alt="Isadora & Wander Logo"
              className="h-10 md:h-12 w-auto object-contain mx-auto md:mx-0 opacity-90 hover:opacity-100 transition-editorial"
            />
            <p className="text-[#8F6E56] text-[9px] tracking-[0.25em] uppercase font-sans font-semibold">16 de Outubro de 2026</p>
          </div>
          <div className="text-espresso/60 text-[9px] uppercase tracking-widest font-semibold">
            © 2026 Isadora & Wander. Todos os direitos reservados.
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp Button */}
      <motion.a
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1.5, type: "spring", stiffness: 260, damping: 20 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        href={`https://wa.me/5537999351911?text=${encodeURIComponent(
          "Olá! Gostaria de tirar algumas dúvidas sobre o casamento de Isadora e Wander."
        )}`}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-[#25D366] hover:bg-[#20BA56] text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-editorial flex items-center justify-center cursor-pointer group"
        aria-label="Tirar dúvidas via WhatsApp"
      >
        <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 ease-in-out whitespace-nowrap text-[10px] font-semibold uppercase tracking-wider pl-0 group-hover:pl-2 group-hover:pr-2">
          Dúvidas? Fale Conosco
        </span>
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.713-1.457L0 24zm6.59-4.846c1.6.95 3.488 1.452 5.421 1.453 5.9 0 10.7-4.8 10.702-10.7.002-2.857-1.107-5.54-3.125-7.56C17.58 2.327 14.9 1.216 12.01 1.216 6.11 1.216 1.314 6.015 1.31 11.917c-.001 1.998.523 3.951 1.517 5.674l-.99 3.613 3.702-.97.108.064zM18.06 14.85c-.332-.165-1.962-.97-2.267-1.08-.305-.11-.527-.165-.75.165-.22.33-.853 1.08-1.043 1.297-.19.215-.383.242-.715.077-.33-.165-1.393-.513-2.656-1.64-1-.89-1.674-1.99-1.872-2.33-.197-.33-.02-.508.145-.67.15-.148.33-.387.496-.58.165-.195.22-.33.33-.55.11-.22.05-.413-.025-.58-.077-.164-.75-1.807-1.026-2.478-.27-.647-.54-.56-.75-.57-.193-.01-.413-.012-.633-.012-.22 0-.58.08-.88.41-.3.33-1.16 1.13-1.16 2.76 0 1.63 1.19 3.2 1.35 3.42.16.22 2.337 3.57 5.66 5.01.79.34 1.41.54 1.89.7.794.25 1.52.21 2.09.13.64-.1 1.96-.8 2.24-1.57.28-.77.28-1.43.2-1.57-.08-.14-.3-.22-.63-.385z" />
        </svg>
      </motion.a>
    </div>
  );
}
