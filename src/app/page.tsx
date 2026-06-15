"use client";

import React from "react";
import { motion } from "motion/react";
import Countdown from "@/components/countdown";
import GiftRegistry from "@/components/gift-registry";
import GodparentsManual from "@/components/godparents-manual";
import Rsvp from "@/components/rsvp";
import { Calendar, MapPin, Sparkle, Bed, Car, Train, DeviceMobile } from "@phosphor-icons/react";

// Fade Animation Helper Component with 100vh height enforcement
function FadeInSection({ children, id, className = "", style = {} }: { children: React.ReactNode; id?: string; className?: string; style?: React.CSSProperties }) {
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 1.2, ease: [0.215, 0.61, 0.355, 1] }}
      style={style}
      className={`min-h-[100dvh] flex flex-col justify-center py-12 md:py-16 overflow-hidden ${className}`}
    >
      <div className="w-full max-w-7xl mx-auto px-6">
        {children}
      </div>
    </motion.section>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col font-sans selection:bg-primary/20 selection:text-primary bg-[#FAF6F3] overflow-x-hidden max-w-full w-full">
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
            <a href="#local" className="hover:opacity-70 transition pb-1">Local</a>
            <a href="#presentes" className="hover:opacity-70 transition pb-1">Presentes</a>
            <a href="#rsvp" className="hover:opacity-70 transition pb-1">Confirmação</a>
          </nav>

          <motion.a
            whileHover={{ scale: 1.05, y: -1 }}
            whileTap={{ scale: 0.98 }}
            href="#rsvp"
            className="bg-[#8F6E56] hover:bg-[#7A5C46] text-white px-5 py-2 rounded-full text-[10px] font-semibold uppercase tracking-[0.2em] transition shadow-sm inline-block"
          >
            Confirmar Presença
          </motion.a>
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

          <h1 className="font-sans text-5xl md:text-7xl lg:text-8xl font-extralight tracking-wide leading-tight text-[#3C2D24] lowercase first-letter:uppercase">
            Vamos celebrar <br />
            <span className="font-extralight">o amor</span>
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
            <motion.a
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
              href="#rsvp"
              className="bg-[#8F6E56] hover:bg-[#7A5C46] text-white px-8 py-3 rounded-full text-[10px] font-semibold uppercase tracking-[0.25em] transition inline-flex items-center gap-2 shadow-md"
            >
              <span>Confirmar Presença</span>
              <span className="text-[11px]">♡</span>
            </motion.a>
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
            <span className="text-[9px] text-[#8F6E56]/80 font-light leading-relaxed hidden sm:block font-sans">Como tudo começou.</span>
          </a>

          <a href="#detalhes" className="flex flex-col items-center space-y-1 group md:px-4 md:border-l border-border/40">
            <div className="w-9 h-9 rounded-full bg-transparent flex items-center justify-center text-[#8F6E56] border border-border group-hover:border-primary/50 transition">
              <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <span className="text-[9px] uppercase tracking-[0.2em] font-semibold text-[#3C2D24]">Detalhes</span>
            <span className="text-[9px] text-[#8F6E56]/80 font-light leading-relaxed hidden sm:block font-sans">Cerimônia, recepção e traje.</span>
          </a>

          <a href="#presentes" className="flex flex-col items-center space-y-1 group md:px-4 md:border-l border-border/40">
            <div className="w-9 h-9 rounded-full bg-transparent flex items-center justify-center text-[#8F6E56] border border-border group-hover:border-primary/50 transition">
              <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 11.25v8.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5v-8.25M12 4.875A2.625 2.625 0 109.375 7.5H12m0-2.625V7.5m0-2.625A2.625 2.625 0 1114.625 7.5H12m0 0v11.25m-8.25-6h16.5" />
              </svg>
            </div>
            <span className="text-[9px] uppercase tracking-[0.2em] font-semibold text-[#3C2D24]">Presentes</span>
            <span className="text-[9px] text-[#8F6E56]/80 font-light leading-relaxed hidden sm:block font-sans">Nossa lista de presentes.</span>
          </a>

          <a href="#rsvp" className="flex flex-col items-center space-y-1 group md:px-4 md:border-l border-border/40">
            <div className="w-9 h-9 rounded-full bg-transparent flex items-center justify-center text-[#8F6E56] border border-border group-hover:border-primary/50 transition">
              <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
              </svg>
            </div>
            <span className="text-[9px] uppercase tracking-[0.2em] font-semibold text-[#3C2D24]">Confirmação</span>
            <span className="text-[9px] text-[#8F6E56]/80 font-light leading-relaxed hidden sm:block font-sans">Confirme sua presença.</span>
          </a>
        </div>

        {/* Smooth Gradient Fade */}
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#FAF6F3] to-transparent pointer-events-none z-20" />
      </section>

      {/* 2. Sobre o casal + contagem regressiva (left content occupying 2/3, right image occupying 1/3) */}
      <FadeInSection id="sobre" className="bg-[#FAF6F3] py-24 min-h-[100dvh] flex flex-col justify-center">
        <div className="flex flex-col lg:flex-row gap-12 items-center lg:items-stretch px-4 md:px-12 lg:px-20">
          {/* Left side: 2/3 width for text content and countdown */}
          <div className="w-full lg:w-2/3 space-y-8 text-center lg:text-left flex flex-col justify-between">
            <div className="space-y-6">
              {/* Top Branch Wreath Ornament */}
              <div className="hidden md:flex justify-start">
                <svg className="w-16 h-6 text-[#8F6E56]/70" viewBox="0 0 100 30" fill="currentColor">
                  <path d="M50,20 C42,15 28,10 15,17 C28,8 42,12 50,20 Z" />
                  <path d="M50,20 C58,15 72,10 85,17 C72,8 58,12 50,20 Z" />
                  <path d="M50,7 C50,7 48.5,5 47,5 C45,5 44,6.5 44,8 C44,11 47.5,13 50,15 C52.5,13 56,11 56,8 C56,6.5 55,5 53,5 C51.5,5 50,7 50,7 Z" />
                </svg>
              </div>

              <div className="space-y-3 text-center lg:text-left">
                <h2 className="font-sans text-5xl md:text-7xl lg:text-8xl text-[#3C2D24] font-extralight tracking-wide leading-[0.95]">
                  O Nosso <br /> Casamento
                </h2>

                {/* Swirl Infinity Divider Line */}
                <div className="flex justify-center lg:justify-start items-center py-2 text-[#DCD0C0]">
                  <svg className="w-28 h-3" viewBox="0 0 120 10" fill="none" stroke="currentColor" strokeWidth="1">
                    <path d="M0,5 L50,5 C52,5 54,3 56,3 C58,3 59,5 60,5 C61,5 62,7 64,7 C66,7 68,5 70,5 L120,5" />
                    <circle cx="60" cy="5" r="1.5" fill="currentColor" />
                  </svg>
                </div>

                <p className="text-[#3C2D24]/90 text-xs md:text-sm leading-relaxed font-sans font-light tracking-wide w-full text-center lg:text-left">
                  Sejam bem-vindos! Criamos este espaço para compartilhar todos os detalhes do nosso grande dia e facilitar a sua confirmação de presença.
                </p>
              </div>
            </div>

            {/* Countdown Box (Left aligned, occupying full 2/3 width of the section container) */}
            <div className="bg-[#F5EFEB] border border-border/80 rounded-[3rem] p-4 sm:p-8 w-full shadow-sm space-y-4">
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

          {/* Right side: 1/3 width for the couple image, hidden on mobile */}
          <div className="hidden lg:flex w-full lg:w-1/3 items-center justify-center">
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
        className="relative overflow-hidden py-24 border-y border-border/60 bg-[#F5EFEB]"
      >
        <div className="relative z-10 px-4 md:px-12 lg:px-20">
          <div className="flex flex-col lg:flex-row-reverse gap-12 items-start">
            {/* Left/Right side: 1/3 width for the big title, now shifted to the right */}
            <div className="w-full lg:w-1/3 space-y-6 text-center lg:text-right flex flex-col items-center lg:items-end bg-transparent p-0 z-10">
              <div className="space-y-3 w-full text-center lg:text-right">
                <h2 className="font-sans text-5xl md:text-7xl lg:text-5xl xl:text-6xl text-foreground font-extralight tracking-wide leading-[0.95]">
                  Lista de <br /> Casamento
                </h2>
              </div>

              {/* Swirl Infinity Divider Line */}
              <div className="flex justify-center lg:justify-end items-center py-1 text-[#DCD0C0] w-full">
                <svg className="w-28 h-3" viewBox="0 0 120 10" fill="none" stroke="currentColor" strokeWidth="1">
                  <path d="M0,5 L50,5 C52,5 54,3 56,3 C58,3 59,5 60,5 C61,5 62,7 64,7 C66,7 68,5 70,5 L120,5" />
                  <circle cx="60" cy="5" r="1.5" fill="currentColor" />
                </svg>
              </div>

              <p className="text-[#8F6E56] text-xs leading-relaxed font-sans font-light max-w-[35ch] mx-auto lg:ml-auto lg:mr-0 text-center lg:text-right">
                Caso queira nos presentear, escolha uma opção simbólica abaixo. Os valores serão enviados diretamente para nossa conta via PIX.
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
      <FadeInSection id="detalhes" className="bg-[#FAF6F3]">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-stretch px-4 md:px-12 lg:px-20">
          <div className="lg:col-span-2 space-y-6">
            {/* Top Branch Wreath Ornament */}
            <div className="flex justify-center lg:justify-start">
              <svg className="w-16 h-6 text-[#8F6E56]/70" viewBox="0 0 100 30" fill="currentColor">
                <path d="M50,20 C42,15 28,10 15,17 C28,8 42,12 50,20 Z" />
                <path d="M50,20 C58,15 72,10 85,17 C72,8 58,12 50,20 Z" />
                <path d="M50,7 C50,7 48.5,5 47,5 C45,5 44,6.5 44,8 C44,11 47.5,13 50,15 C52.5,13 56,11 56,8 C56,6.5 55,5 53,5 C51.5,5 50,7 50,7 Z" />
              </svg>
            </div>

            <div className="space-y-3 text-center lg:text-left">
              <h2 className="font-sans text-5xl md:text-7xl lg:text-8xl text-foreground font-extralight tracking-wide leading-[0.95]">
                Informações <br /> Gerais
              </h2>

              {/* Swirl Infinity Divider Line */}
              <div className="flex justify-center lg:justify-start items-center py-2 text-[#DCD0C0]">
                <svg className="w-28 h-3" viewBox="0 0 120 10" fill="none" stroke="currentColor" strokeWidth="1">
                  <path d="M0,5 L50,5 C52,5 54,3 56,3 C58,3 59,5 60,5 C61,5 62,7 64,7 C66,7 68,5 70,5 L120,5" />
                  <circle cx="60" cy="5" r="1.5" fill="currentColor" />
                </svg>
              </div>
            </div>

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

            <div className="pt-4 flex justify-center">
              <motion.a
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
                href="https://maps.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-primary hover:bg-primary-hover text-white px-5 py-3 rounded-full text-[10px] font-medium tracking-wider uppercase transition shadow-sm"
              >
                <MapPin size={14} />
                <span>Abrir no Google Maps</span>
              </motion.a>
            </div>
          </div>

          <div className="lg:col-span-1 bg-[#F5EFEB] border border-border/80 p-8 md:p-10 rounded-[3rem] flex flex-col justify-center space-y-6">
            <h4 className="font-sans text-lg md:text-xl font-light tracking-wide text-foreground flex items-center gap-3">
              <Bed size={24} className="text-primary" />
              <span>Hospedagem & Deslocamento</span>
            </h4>
            <div className="space-y-4 text-[#8F6E56] text-sm md:text-base leading-relaxed font-sans font-light border-t border-border/40 pt-6">
              <p>
                Para os convidados que vêm de fora de São Paulo, sugerimos o <strong>Comfort Hotel Vila Mariana</strong>, localizado a apenas 5 minutos do evento.
              </p>
              <p>
                Recomendamos o deslocamento por táxi ou carros de aplicativo. Para quem prefere transporte público, a estação de metrô Vila Mariana fica a 400 metros do local.
              </p>
            </div>
          </div>
        </div>
      </FadeInSection>

      {/* 5. Como Chegar / Local do Evento */}
      <FadeInSection id="local" className="bg-[#F2ECE6] border-y border-border/60">
        <div className="flex flex-col lg:flex-row-reverse gap-12 items-stretch px-4 md:px-12 lg:px-20">
          {/* Right column (1/3 width) - Title and directions info */}
          <div className="w-full lg:w-1/3 flex flex-col justify-between space-y-8 text-center lg:text-right items-center lg:items-end">
            <div className="space-y-6 w-full">
              {/* Top Branch Wreath Ornament */}
              <div className="flex justify-center lg:justify-end">
                <svg className="w-16 h-6 text-[#8F6E56]/70" viewBox="0 0 100 30" fill="currentColor">
                  <path d="M50,20 C42,15 28,10 15,17 C28,8 42,12 50,20 Z" />
                  <path d="M50,20 C58,15 72,10 85,17 C72,8 58,12 50,20 Z" />
                  <path d="M50,7 C50,7 48.5,5 47,5 C45,5 44,6.5 44,8 C44,11 47.5,13 50,15 C52.5,13 56,11 56,8 C56,6.5 55,5 53,5 C51.5,5 50,7 50,7 Z" />
                </svg>
              </div>

              <div className="space-y-3 w-full text-center lg:text-right">
                <h2 className="font-sans text-5xl md:text-7xl lg:text-8xl text-foreground font-extralight tracking-wide leading-[0.95] lowercase first-letter:uppercase">
                  Como <br /> Chegar
                </h2>

                {/* Swirl Infinity Divider Line */}
                <div className="flex justify-center lg:justify-end items-center py-2 text-[#DCD0C0]">
                  <svg className="w-28 h-3" viewBox="0 0 120 10" fill="none" stroke="currentColor" strokeWidth="1">
                    <path d="M0,5 L50,5 C52,5 54,3 56,3 C58,3 59,5 60,5 C61,5 62,7 64,7 C66,7 68,5 70,5 L120,5" />
                    <circle cx="60" cy="5" r="1.5" fill="currentColor" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Directions details card */}
            <div className="w-full bg-[#F5EFEB] border border-border/80 p-8 rounded-[3rem] text-left space-y-6 flex-1 flex flex-col justify-center">
              <div className="space-y-4">
                <div className="flex gap-3 items-start">
                  <div className="w-8 h-8 rounded-full border border-border flex items-center justify-center text-primary shrink-0">
                    <Car size={16} />
                  </div>
                  <div>
                    <h4 className="font-serif text-sm font-medium text-foreground">De Carro</h4>
                    <p className="text-[#8F6E56] text-xs mt-0.5 font-sans font-light leading-relaxed">
                      O local possui serviço de valet na porta do evento e estacionamento conveniado próximo.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3 items-start">
                  <div className="w-8 h-8 rounded-full border border-border flex items-center justify-center text-primary shrink-0">
                    <Train size={16} />
                  </div>
                  <div>
                    <h4 className="font-serif text-sm font-medium text-foreground">De Metrô</h4>
                    <p className="text-[#8F6E56] text-xs mt-0.5 font-sans font-light leading-relaxed">
                      A estação <strong>Vila Mariana</strong> (Linha 1 - Azul) fica a 400 metros do local (5 minutos a pé).
                    </p>
                  </div>
                </div>

                <div className="flex gap-3 items-start">
                  <div className="w-8 h-8 rounded-full border border-border flex items-center justify-center text-primary shrink-0">
                    <DeviceMobile size={16} />
                  </div>
                  <div>
                    <h4 className="font-serif text-sm font-medium text-foreground">De Aplicativo</h4>
                    <p className="text-[#8F6E56] text-xs mt-0.5 font-sans font-light leading-relaxed">
                      Insira o endereço <strong>Rua Domingos de Morais, 2561</strong> no app de sua preferência. O embarque e desembarque são fáceis na frente.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Left column (2/3 width) - Google Map */}
          <div className="w-full lg:w-2/3 flex flex-col justify-between space-y-6">
            <div className="w-full h-full min-h-[400px] rounded-[3rem] overflow-hidden border border-border/80 shadow-sm relative bg-[#F5EFEB]">
              <iframe
                src="https://maps.google.com/maps?q=R.%20Domingos%20de%20Morais,%202561%20-%20Vila%20Mariana,%20S%C3%A3o%20Paulo%20-%20SP&t=&z=16&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: "450px" }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full opacity-90 hover:opacity-100 transition duration-300"
              />
            </div>
            <div className="flex justify-between items-center text-left px-6">
              <div>
                <h4 className="font-serif text-sm font-medium text-foreground">Espaço Vila Mariana</h4>
                <p className="text-[#8F6E56] text-xs mt-0.5 font-sans font-light">
                  Rua Domingos de Morais, 2561 - Vila Mariana, São Paulo - SP
                </p>
              </div>
              <motion.a
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
                href="https://maps.google.com/?q=Rua+Domingos+de+Morais,+2561+-+Vila+Mariana,+S%C3%A3o+Paulo+-+SP"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#8F6E56] hover:bg-[#7A5C46] text-[#FAF6F3] px-5 py-2.5 rounded-full text-[9px] font-semibold tracking-wider uppercase transition shadow-sm"
              >
                <MapPin size={12} />
                <span>Como Chegar</span>
              </motion.a>
            </div>
          </div>
        </div>
      </FadeInSection>

      <FadeInSection id="padrinhos" className="bg-[#FAF6F3] border-b border-border/60">
        <div className="px-4 md:px-12 lg:px-20">
          <div className="text-center lg:text-right w-full space-y-4 mb-12 flex flex-col items-center lg:items-end">
            {/* Top Branch Wreath Ornament */}
            <div className="flex justify-center lg:justify-end w-full">
              <svg className="w-16 h-6 text-[#8F6E56]/70" viewBox="0 0 100 30" fill="currentColor">
                <path d="M50,20 C42,15 28,10 15,17 C28,8 42,12 50,20 Z" />
                <path d="M50,20 C58,15 72,10 85,17 C72,8 58,12 50,20 Z" />
                <path d="M50,7 C50,7 48.5,5 47,5 C45,5 44,6.5 44,8 C44,11 47.5,13 50,15 C52.5,13 56,11 56,8 C56,6.5 55,5 53,5 C51.5,5 50,7 50,7 Z" />
              </svg>
            </div>

            <div className="space-y-3 w-full">
              <h2 className="font-sans text-5xl md:text-7xl lg:text-8xl text-foreground font-extralight tracking-wide leading-[0.95]">
                Manual dos <br /> Padrinhos
              </h2>

              {/* Swirl Infinity Divider Line */}
              <div className="flex justify-center lg:justify-end items-center py-2 text-[#DCD0C0] w-full">
                <svg className="w-28 h-3" viewBox="0 0 120 10" fill="none" stroke="currentColor" strokeWidth="1">
                  <path d="M0,5 L50,5 C52,5 54,3 56,3 C58,3 59,5 60,5 C61,5 62,7 64,7 C66,7 68,5 70,5 L120,5" />
                  <circle cx="60" cy="5" r="1.5" fill="currentColor" />
                </svg>
              </div>
            </div>

            <p className="text-[#8F6E56] text-xs leading-relaxed font-sans font-light text-center lg:text-right">
              Orientações importantes sobre trajes e horários para os nossos padrinhos e madrinhas.
            </p>
          </div>
          <GodparentsManual />
        </div>
      </FadeInSection>

      {/* RSVP Form Section */}
      <FadeInSection id="rsvp" className="bg-[#F5EFEB] border-b border-border/60">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center px-4 md:px-12 lg:px-20">
          <div className="lg:col-span-1 space-y-6 text-center lg:text-left">
            {/* Top Branch Wreath Ornament */}
            <div className="flex justify-center lg:justify-start">
              <svg className="w-16 h-6 text-[#8F6E56]/70" viewBox="0 0 100 30" fill="currentColor">
                <path d="M50,20 C42,15 28,10 15,17 C28,8 42,12 50,20 Z" />
                <path d="M50,20 C58,15 72,10 85,17 C72,8 58,12 50,20 Z" />
                <path d="M50,7 C50,7 48.5,5 47,5 C45,5 44,6.5 44,8 C44,11 47.5,13 50,15 C52.5,13 56,11 56,8 C56,6.5 55,5 53,5 C51.5,5 50,7 50,7 Z" />
              </svg>
            </div>

            <div className="space-y-3 text-center lg:text-left">
              <h2 className="font-sans text-5xl md:text-7xl lg:text-8xl text-foreground font-extralight tracking-wide leading-[0.95]">
                Confirmar <br /> Presença
              </h2>

              {/* Swirl Infinity Divider Line */}
              <div className="flex justify-center lg:justify-start items-center py-2 text-[#DCD0C0]">
                <svg className="w-28 h-3" viewBox="0 0 120 10" fill="none" stroke="currentColor" strokeWidth="1">
                  <path d="M0,5 L50,5 C52,5 54,3 56,3 C58,3 59,5 60,5 C61,5 62,7 64,7 C66,7 68,5 70,5 L120,5" />
                  <circle cx="60" cy="5" r="1.5" fill="currentColor" />
                </svg>
              </div>
            </div>

            <p className="text-[#8F6E56] text-xs leading-relaxed font-sans font-light text-center lg:text-left">
              Por favor, confirme sua presença até o dia 15/01/2027 para nos ajudar na organização.
            </p>
          </div>
          <div className="lg:col-span-1">
            <Rsvp />
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
        </div>
      </footer>

      {/* Floating WhatsApp Button */}
      <motion.a
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1.5, type: "spring", stiffness: 260, damping: 20 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        href={`https://wa.me/5511999999999?text=${encodeURIComponent(
          "Olá! Gostaria de tirar algumas dúvidas sobre o casamento de Isadora e Wander."
        )}`}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-[#25D366] hover:bg-[#20BA56] text-white p-4 rounded-full shadow-lg hover:shadow-xl transition duration-300 flex items-center justify-center cursor-pointer group"
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
