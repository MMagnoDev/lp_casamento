"use client";

import React from "react";
import { motion } from "motion/react";
import Countdown from "@/components/countdown";
import GiftRegistry from "@/components/gift-registry";
import GodparentsManual from "@/components/godparents-manual";
import Rsvp from "@/components/rsvp";
import Guestbook from "@/components/guestbook";
import { Calendar, MapPin, Sparkle, Bed, QrCode } from "@phosphor-icons/react";

// Fade Animation Helper Component with 100vh height enforcement
function FadeInSection({ children, id, className = "", style = {} }: { children: React.ReactNode; id?: string; className?: string; style?: React.CSSProperties }) {
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      style={style}
      className={`min-h-[100dvh] flex flex-col justify-center py-12 md:py-16 ${className}`}
    >
      <div className="w-full max-w-7xl mx-auto px-6">
        {children}
      </div>
    </motion.section>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col font-sans selection:bg-primary/20 selection:text-primary bg-[#FAF6F3]">
      {/* 0. Header / Navigation exactly like the image */}
      <header className="absolute top-0 left-0 w-full z-40 bg-transparent">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          {/* Logo Monogram I | W with Leaf wreath underneath */}
          <div className="flex flex-col items-center">
            <span className="font-serif text-2xl md:text-3xl tracking-widest font-light text-[#3C2D24]">
              I &nbsp;|&nbsp; W
            </span>
            {/* Elegant tiny leaf wreath ornament */}
            <svg className="w-12 h-4 text-[#8F6E56]/70 mt-1" viewBox="0 0 100 20" fill="currentColor">
              <path d="M50,15 C45,11 32,8 20,13 C32,6 45,9 50,15 Z" />
              <path d="M50,15 C55,11 68,8 80,13 C68,6 55,9 50,15 Z" />
              <circle cx="50" cy="8" r="1.5" />
            </svg>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-[10px] uppercase tracking-[0.25em] font-semibold text-[#3C2D24]">
            <a href="#sobre" className="hover:opacity-70 transition border-b-2 border-primary pb-1">Início</a>
            <a href="#sobre" className="hover:opacity-70 transition pb-1">Nossa História</a>
            <a href="#detalhes" className="hover:opacity-70 transition pb-1">Detalhes</a>
            <a href="#presentes" className="hover:opacity-70 transition pb-1">Presentes</a>
            <a href="#rsvp" className="hover:opacity-70 transition pb-1">Confirmação</a>
          </nav>

          <a
            href="#rsvp"
            className="bg-[#8F6E56] hover:bg-[#7A5C46] text-white px-5 py-2 rounded-full text-[10px] font-semibold uppercase tracking-[0.2em] transition shadow-sm"
          >
            Confirmar RSVP
          </a>
        </div>
      </header>

      {/* 1. Capa inicial (Hero Section matching the image exactly, with cutoff fix) */}
      <section className="relative h-[100dvh] min-h-[600px] flex flex-col justify-between overflow-hidden bg-cover bg-center pt-24 pb-6" style={{ backgroundImage: "url('/img/hero-bg.png')" }}>
        <div className="absolute inset-0 bg-[#FAF6F3]/10 z-0" />
        
        {/* Spacer */}
        <div className="h-6" />

        {/* Center content */}
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center space-y-4 my-auto">
          {/* Top Heart Leaf ornament */}
          <div className="flex flex-col items-center justify-center space-y-1">
            <svg className="w-12 h-6 text-[#8F6E56]/70" viewBox="0 0 100 30" fill="currentColor">
              <path d="M50,20 C42,15 28,10 15,17 C28,8 42,12 50,20 Z" />
              <path d="M50,20 C58,15 72,10 85,17 C72,8 58,12 50,20 Z" />
              <path d="M50,7 C50,7 48.5,5 47,5 C45,5 44,6.5 44,8 C44,11 47.5,13 50,15 C52.5,13 56,11 56,8 C56,6.5 55,5 53,5 C51.5,5 50,7 50,7 Z" />
            </svg>
          </div>

          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-light tracking-wide leading-tight text-[#3C2D24] lowercase first-letter:uppercase">
            Vamos celebrar <br />
            <span className="font-light">o amor</span>
          </h1>

          {/* Centered heart line separator */}
          <div className="flex items-center justify-center gap-4 max-w-xs mx-auto">
            <div className="h-[1px] bg-[#DCD0C0] flex-1" />
            <span className="text-primary text-[10px]">•</span>
            <div className="h-[1px] bg-[#DCD0C0] flex-1" />
          </div>

          <p className="text-[9px] md:text-xs text-[#8F6E56] tracking-[0.25em] uppercase font-semibold">
            14 de Fevereiro de 2027 &nbsp;•&nbsp; São Paulo/SP
          </p>

          <div className="pt-1">
            <a
              href="#rsvp"
              className="bg-[#8F6E56] hover:bg-[#7A5C46] text-white px-8 py-3 rounded-full text-[10px] font-semibold uppercase tracking-[0.25em] transition inline-flex items-center gap-2 shadow-md"
            >
              <span>Confirmar Presença</span>
              <span className="text-[11px]">♡</span>
            </a>
          </div>
        </div>

        {/* Bottom Menu / Quick Access cards */}
        <div className="relative z-10 max-w-5xl mx-auto w-full px-6 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-0 border-t border-border/40 pt-6 text-center">
          <a href="#sobre" className="flex flex-col items-center space-y-1 group md:px-4">
            <div className="w-9 h-9 rounded-full bg-transparent flex items-center justify-center text-[#8F6E56] border border-border group-hover:border-primary/50 transition">
              <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
              </svg>
            </div>
            <span className="text-[9px] uppercase tracking-[0.2em] font-semibold text-[#3C2D24]">Nossa História</span>
            <span className="text-[9px] text-[#8F6E56]/80 font-light leading-relaxed hidden sm:block font-sans">Como tudo começou e o que nos trouxe até aqui.</span>
          </a>

          <a href="#detalhes" className="flex flex-col items-center space-y-1 group md:px-4 md:border-l border-border/40">
            <div className="w-9 h-9 rounded-full bg-transparent flex items-center justify-center text-[#8F6E56] border border-border group-hover:border-primary/50 transition">
              <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <span className="text-[9px] uppercase tracking-[0.2em] font-semibold text-[#3C2D24]">Detalhes</span>
            <span className="text-[9px] text-[#8F6E56]/80 font-light leading-relaxed hidden sm:block font-sans">Informações sobre a cerimônia, recepção e traje.</span>
          </a>

          <a href="#presentes" className="flex flex-col items-center space-y-1 group md:px-4 md:border-l border-border/40">
            <div className="w-9 h-9 rounded-full bg-transparent flex items-center justify-center text-[#8F6E56] border border-border group-hover:border-primary/50 transition">
              <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 11.25v8.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5v-8.25M12 4.875A2.625 2.625 0 109.375 7.5H12m0-2.625V7.5m0-2.625A2.625 2.625 0 1114.625 7.5H12m0 0v11.25m-8.25-6h16.5" />
              </svg>
            </div>
            <span className="text-[9px] uppercase tracking-[0.2em] font-semibold text-[#3C2D24]">Presentes</span>
            <span className="text-[9px] text-[#8F6E56]/80 font-light leading-relaxed hidden sm:block font-sans">Se desejar nos presentear, escolha algo que tenha a ver com você.</span>
          </a>

          <a href="#rsvp" className="flex flex-col items-center space-y-1 group md:px-4 md:border-l border-border/40">
            <div className="w-9 h-9 rounded-full bg-transparent flex items-center justify-center text-[#8F6E56] border border-border group-hover:border-primary/50 transition">
              <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
              </svg>
            </div>
            <span className="text-[9px] uppercase tracking-[0.2em] font-semibold text-[#3C2D24]">Confirmação</span>
            <span className="text-[9px] text-[#8F6E56]/80 font-light leading-relaxed hidden sm:block font-sans">Confirme sua presença e faça parte desse momento.</span>
          </a>
        </div>

        {/* Smooth Gradient Fade */}
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#FAF6F3] to-transparent pointer-events-none z-20" />
      </section>

      {/* 2. Sobre o casal + contagem regressiva (left content occupying 2/3, right image occupying 1/3) */}
      <FadeInSection id="sobre" className="bg-transparent py-24 min-h-[100dvh] flex flex-col justify-center">
        <div className="flex flex-col lg:flex-row gap-12 items-center lg:items-stretch w-full">
          {/* Left side: 2/3 width for text content and countdown */}
          <div className="w-full lg:w-2/3 space-y-8 text-left flex flex-col justify-between">
            <div className="space-y-6">
              {/* Top Branch Wreath Ornament */}
              <div className="flex justify-start">
                <svg className="w-16 h-6 text-[#8F6E56]/70" viewBox="0 0 100 30" fill="currentColor">
                  <path d="M50,20 C42,15 28,10 15,17 C28,8 42,12 50,20 Z" />
                  <path d="M50,20 C58,15 72,10 85,17 C72,8 58,12 50,20 Z" />
                  <path d="M50,7 C50,7 48.5,5 47,5 C45,5 44,6.5 44,8 C44,11 47.5,13 50,15 C52.5,13 56,11 56,8 C56,6.5 55,5 53,5 C51.5,5 50,7 50,7 Z" />
                </svg>
              </div>

              <div className="space-y-3">
                <span className="text-[10px] uppercase tracking-[0.25em] text-[#8F6E56] font-semibold block">
                  Nossa União
                </span>
                <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-[#3C2D24] font-light tracking-wide">
                  O Nosso Casamento
                </h2>
                
                {/* Swirl Infinity Divider Line */}
                <div className="flex justify-start items-center py-2 text-[#DCD0C0]">
                  <svg className="w-28 h-3" viewBox="0 0 120 10" fill="none" stroke="currentColor" strokeWidth="1">
                    <path d="M0,5 L50,5 C52,5 54,3 56,3 C58,3 59,5 60,5 C61,5 62,7 64,7 C66,7 68,5 70,5 L120,5" />
                    <circle cx="60" cy="5" r="1.5" fill="currentColor" />
                  </svg>
                </div>

                <p className="text-[#3C2D24]/90 text-xs md:text-sm leading-relaxed font-sans font-light tracking-wide w-full">
                  Estamos vivendo a preparação de um dos dias mais especiais das nossas vidas e será uma alegria ter você conosco nessa celebração. Criamos este espaço para reunir todas as informações importantes sobre o nosso casamento de forma simples e prática.
                </p>
              </div>
            </div>

            {/* Countdown Box (Left aligned, occupying full 2/3 width of the section container) */}
            <div className="bg-[#FAF6F3] border border-border/80 rounded-[3rem] p-4 sm:p-8 w-full shadow-sm space-y-4">
              <div className="space-y-1">
                <h3 className="text-[9px] uppercase tracking-[0.25em] text-[#8F6E56] font-semibold">Contagem Regressiva</h3>
                <div className="flex items-center justify-start gap-2 max-w-[80px] text-[#DCD0C0]">
                  <div className="h-[1px] bg-current flex-1" />
                  <span className="text-[8px]">♥</span>
                  <div className="h-[1px] bg-current flex-1" />
                </div>
              </div>
              <div className="w-full">
                <Countdown />
              </div>
            </div>
          </div>
          
          {/* Right side: 1/3 width for the couple image */}
          <div className="w-full lg:w-1/3 flex items-center justify-center">
            <div className="w-full h-full min-h-[350px] lg:min-h-[500px]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/img/nossocasamento.png"
                alt="Nosso Casamento"
                className="w-full h-full object-contain"
              />
            </div>
          </div>
        </div>
      </FadeInSection>

      {/* 3. Lista de presentes simbólicos */}
      <FadeInSection
        id="presentes"
        className="relative overflow-hidden bg-cover bg-center py-24 border-y border-border/60"
        style={{ backgroundImage: "url('/img/listadecasamento.png')" }}
      >
        <div className="absolute inset-0 bg-[#FAF6F3]/5 pointer-events-none z-0" />
        <div className="relative z-10 w-full">
          <div className="flex flex-col lg:flex-row gap-12 items-start">
            {/* Left side: 1/3 width for the big title */}
            <div className="w-full lg:w-1/3 space-y-6 text-left flex flex-col items-start bg-[#FAF6F3]/80 backdrop-blur-md p-8 border border-border/30 rounded-none shadow-sm z-10">
              <div className="space-y-3">
                <span className="text-[10px] uppercase tracking-[0.25em] text-primary font-semibold block">
                  Presentes Simbólicos
                </span>
                <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-foreground font-light leading-tight">
                  Lista de <br className="hidden lg:block" /> Casamento
                </h2>
              </div>
              
              {/* Swirl Infinity Divider Line */}
              <div className="flex justify-start items-center py-1 text-[#DCD0C0] w-full">
                <svg className="w-28 h-3" viewBox="0 0 120 10" fill="none" stroke="currentColor" strokeWidth="1">
                  <path d="M0,5 L50,5 C52,5 54,3 56,3 C58,3 59,5 60,5 C61,5 62,7 64,7 C66,7 68,5 70,5 L120,5" />
                  <circle cx="60" cy="5" r="1.5" fill="currentColor" />
                </svg>
              </div>

              <p className="text-[#8F6E56] text-xs leading-relaxed font-sans font-light max-w-[35ch]">
                Selecionamos alguns presentes fictícios para que você possa participar do nosso planejamento. <br />
                Todos os valores serão revertidos diretamente em depósitos no PIX dos noivos.
              </p>
            </div>

            {/* Right side: 2/3 width for the items */}
            <div className="w-full lg:w-2/3">
              <GiftRegistry />
            </div>
          </div>
        </div>
      </FadeInSection>

      {/* 4. Informações úteis para convidados */}
      <FadeInSection id="detalhes">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <span className="text-[10px] uppercase tracking-[0.25em] text-primary font-semibold block">
              Localização & Horário
            </span>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground font-light leading-tight">
              Informações Gerais
            </h2>
            
            <div className="space-y-5 pt-4">
              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-primary shrink-0">
                  <Calendar size={18} />
                </div>
                <div>
                  <h4 className="font-serif text-sm font-medium text-foreground">Cerimônia e Recepção</h4>
                  <p className="text-[#8F6E56] text-xs mt-1 font-sans font-light">Domingo, 14 de Fevereiro de 2027, às 17:00</p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-primary shrink-0">
                  <MapPin size={18} />
                </div>
                <div>
                  <h4 className="font-serif text-sm font-medium text-foreground">Espaço Vila Mariana</h4>
                  <p className="text-[#8F6E56] text-xs mt-1 font-sans font-light">R. Domingos de Morais, 2561 - Vila Mariana, São Paulo - SP</p>
                </div>
              </div>
            </div>

            <div className="pt-4">
              <a
                href="https://maps.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-primary hover:bg-primary-hover text-white px-5 py-3 rounded-full text-[10px] font-medium tracking-wider uppercase transition shadow-sm"
              >
                <MapPin size={14} />
                <span>Abrir no Google Maps</span>
              </a>
            </div>
          </div>

          <div className="bg-transparent border border-border/80 p-6 rounded-[3rem]">
            <h4 className="font-serif text-base font-light text-foreground flex items-center gap-2">
              <Bed size={18} className="text-primary" />
              <span>Hospedagem & Deslocamento</span>
            </h4>
            <p className="text-[#8F6E56] text-xs leading-relaxed font-sans font-light">
              Para os familiares e amigos que vêm de fora da cidade de São Paulo, sugerimos hospedagem nas imediações do bairro Vila Mariana. O <strong>Comfort Hotel Vila Mariana</strong> fica a apenas 5 minutos de distância do espaço do evento.
            </p>
            <p className="text-[#8F6E56] text-xs leading-relaxed font-sans font-light border-t border-border/40 pt-3">
              Recomendamos o deslocamento por táxis ou carros de aplicativo. A estação de metrô Vila Mariana fica a 400 metros do local.
            </p>
          </div>
        </div>
      </FadeInSection>

      {/* 5. Manual dos padrinhos */}
      <FadeInSection id="padrinhos" className="bg-card/20 border-y border-border/20">
        <div className="text-center max-w-xl mx-auto space-y-4 mb-12">
          <span className="text-[10px] uppercase tracking-[0.25em] text-primary font-semibold block">
            Dedicado a vocês
          </span>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground font-light tracking-wide">
            Manual dos Padrinhos
          </h2>
          <p className="text-[#8F6E56] text-xs leading-relaxed font-sans font-light">
            Separamos algumas orientações importantes sobre trajes, horários e cores para os nossos queridos padrinhos e madrinhas.
          </p>
        </div>
        <GodparentsManual />
      </FadeInSection>

      {/* RSVP Form Section */}
      <FadeInSection id="rsvp">
        <div className="text-center max-w-xl mx-auto space-y-4 mb-10">
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground font-light tracking-wide">
            Confirmar Presença
          </h2>
          <p className="text-[#8F6E56] text-xs leading-relaxed font-sans font-light">
            Responda o formulário para garantir sua vaga e nos ajudar a organizar o buffet.
          </p>
        </div>
        <Rsvp />
      </FadeInSection>

      {/* Guestbook Section */}
      <FadeInSection id="recados" className="bg-card/15 border-t border-border/20">
        <div className="text-center max-w-xl mx-auto space-y-4 mb-10">
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground font-light tracking-wide">
            Mural de Mensagens
          </h2>
          <p className="text-[#8F6E56] text-xs leading-relaxed font-sans font-light">
            Deixe seus votos carinhosos e desejos aos noivos.
          </p>
        </div>
        <Guestbook />
      </FadeInSection>

      {/* 6. Link e QR Code */}
      <FadeInSection>
        <div className="bg-transparent border border-border/80 p-8 rounded-[3rem] max-w-xs mx-auto text-center space-y-6">
          <div className="w-10 h-10 border border-border rounded-full flex items-center justify-center mx-auto text-primary">
            <QrCode size={18} />
          </div>
          <div className="space-y-2">
            <h3 className="font-serif text-lg font-light text-foreground">Convite Digital</h3>
            <p className="text-[#8F6E56] text-[10px] tracking-wide font-sans font-light">
              “Acesse todas as informações do nosso casamento pelo QR Code.”
            </p>
          </div>
          
          <div className="w-36 h-36 bg-white border border-border rounded-[2rem] flex items-center justify-center mx-auto p-4 shadow-sm">
            <div className="w-full h-full bg-stone-50 flex flex-col justify-between p-2 rounded-[1.2rem] relative">
              <div className="flex justify-between">
                <div className="w-5 h-5 border-2 border-stone-850 bg-stone-850 rounded-md" />
                <div className="w-5 h-5 border-2 border-stone-850 bg-stone-850 rounded-md" />
              </div>
              <div className="flex justify-between">
                <div className="w-5 h-5 border-2 border-stone-850 bg-stone-850 rounded-md" />
                <div className="w-5 h-5 border-t-2 border-l-2 border-stone-850 bg-stone-850 rounded-md" />
              </div>
            </div>
          </div>
          
          <div className="space-y-1">
            <span className="text-[10px] text-[#8F6E56]/60 uppercase tracking-widest font-semibold block">Endereço do Site</span>
            <p className="font-mono text-xs text-primary font-semibold select-all">
              isadoraewander.com
            </p>
          </div>
        </div>
      </FadeInSection>

      {/* 7. Domínio personalizado (Footer) */}
      <footer className="bg-card text-foreground py-12 border-t border-border/80">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left">
          <div className="space-y-2">
            <h3 className="font-serif text-lg tracking-wider font-light uppercase text-[#3C2D24]">Isadora & Wander</h3>
            <p className="text-[#8F6E56] text-[10px] tracking-[0.2em] uppercase font-sans font-semibold">14 de Fevereiro de 2027</p>
          </div>
          <div className="space-y-1 text-center md:text-right">
            <p className="text-[#8F6E56] text-xs font-sans font-light">
              Domínio Principal: <span className="text-[#3C2D24] font-mono text-xs font-semibold">isadoraewander.com</span>
            </p>
            <p className="text-primary/70 text-[9px] font-sans font-medium">
              Todos os direitos reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
