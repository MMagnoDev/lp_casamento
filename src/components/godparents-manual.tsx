"use client";

import React from "react";
import { TShirt, Clock, Question } from "@phosphor-icons/react";

export default function GodparentsManual() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
      {/* 1. Trajes Madrinhas */}
      <div className="bg-[#FAF6F3] border border-border p-6 flex flex-col justify-between space-y-4 transition-editorial hover:shadow-md hover:-translate-y-1">
        <div className="space-y-4">
          <div className="w-10 h-10 rounded-full border border-border/60 flex items-center justify-center text-primary bg-[#F5EFEB]/50">
            <TShirt size={18} />
          </div>
          <div className="space-y-1">
            <h4 className="font-serif text-lg font-light text-espresso">Madrinhas</h4>
            <span className="text-[8px] uppercase tracking-widest text-accent font-semibold block">Traje Sugerido</span>
          </div>
          <p className="text-espresso/90 text-xs leading-relaxed font-sans font-light">
            Para esse dia tão especial, pedimos que as madrinhas usem:
          </p>
          <ul className="list-disc list-inside text-espresso/80 text-xs font-sans font-light space-y-0.5 pl-1">
            <li>Vestido longo</li>
            <li>Liso</li>
            <li>Em tons vibrantes</li>
          </ul>
          <p className="text-espresso/60 text-[10px] leading-relaxed font-sans font-light pt-1 border-t border-border/10">
            A ideia é que todas estejam elegantes, harmoniosas e com cores marcantes, trazendo ainda mais vida e beleza para esse momento.
          </p>
        </div>
        
        <div className="flex gap-2 pt-4 border-t border-border/30 flex-wrap">
          <div className="w-6 h-6 rounded-full bg-[#E15C5C] border border-border/40 shadow-sm transition-transform hover:scale-110" title="Vermelho" />
          <div className="w-6 h-6 rounded-full bg-[#2D7A4D] border border-border/40 shadow-sm transition-transform hover:scale-110" title="Verde" />
          <div className="w-6 h-6 rounded-full bg-[#F2C94C] border border-border/40 shadow-sm transition-transform hover:scale-110" title="Amarelo" />
          <div className="w-6 h-6 rounded-full bg-[#D04D8A] border border-border/40 shadow-sm transition-transform hover:scale-110" title="Pink/Magenta" />
          <div className="w-6 h-6 rounded-full bg-[#2F80ED] border border-border/40 shadow-sm transition-transform hover:scale-110" title="Azul Royal" />
        </div>
      </div>

      {/* 2. Trajes Padrinhos */}
      <div className="bg-[#FAF6F3] border border-border p-6 flex flex-col justify-between space-y-4 transition-editorial hover:shadow-md hover:-translate-y-1">
        <div className="space-y-4">
          <div className="w-10 h-10 rounded-full border border-border/60 flex items-center justify-center text-primary bg-[#F5EFEB]/50">
            <TShirt size={18} />
          </div>
          <div className="space-y-1">
            <h4 className="font-serif text-lg font-light text-espresso">Padrinhos</h4>
            <span className="text-[8px] uppercase tracking-widest text-accent font-semibold block">Traje Sugerido</span>
          </div>
          <p className="text-espresso/90 text-xs leading-relaxed font-sans font-light">
            Para os padrinhos, o traje será:
          </p>
          <ul className="list-disc list-inside text-espresso/80 text-xs font-sans font-light space-y-0.5 pl-1">
            <li>Terno preto</li>
            <li>Camisa preta</li>
            <li>Gravata preta</li>
          </ul>
          <p className="text-espresso/60 text-[10px] leading-relaxed font-sans font-light pt-1 border-t border-border/10">
            Pedimos que todos sigam essa proposta para mantermos uma composição elegante, alinhada e harmoniosa no altar.
          </p>
        </div>
        
        <div className="flex gap-2 pt-4 border-t border-border/30">
          <div className="w-6 h-6 rounded-full bg-[#1A1A1A] border border-border/40 shadow-sm transition-transform hover:scale-110" title="Terno Preto" />
          <div className="w-6 h-6 rounded-full bg-[#2D2D2D] border border-border/40 shadow-sm transition-transform hover:scale-110" title="Camisa Preta" />
          <div className="w-6 h-6 rounded-full bg-[#111111] border border-border/40 shadow-sm transition-transform hover:scale-110" title="Gravata Preta" />
        </div>
      </div>

      {/* 3. Horários Importantes */}
      <div className="bg-[#FAF6F3] border border-border p-6 flex flex-col justify-between space-y-4 transition-editorial hover:shadow-md hover:-translate-y-1">
        <div className="space-y-4">
          <div className="w-10 h-10 rounded-full border border-border/60 flex items-center justify-center text-primary bg-[#F5EFEB]/50">
            <Clock size={18} />
          </div>
          <div className="space-y-1">
            <h4 className="font-serif text-lg font-light text-espresso">Horários</h4>
            <span className="text-[8px] uppercase tracking-widest text-accent font-semibold block">Cronograma</span>
          </div>
          <p className="text-espresso/80 text-xs leading-relaxed font-sans font-light">
            Pedimos, com muito carinho, que cheguem com 30 minutos de antecedência, para que tudo aconteça com tranquilidade.
          </p>
          <div className="space-y-3 text-espresso/80 text-xs font-sans font-light border-t border-border/10 pt-3">
            <div className="flex justify-between border-b border-border/20 pb-1">
              <span>Data:</span>
              <strong className="font-medium text-espresso">16 de Outubro de 2026</strong>
            </div>
            <div className="flex justify-between border-b border-border/20 pb-1">
              <span>Chegada dos Padrinhos:</span>
              <strong className="font-medium text-espresso">20:00</strong>
            </div>
            <div className="flex justify-between pb-1">
              <span>Início da Cerimônia:</span>
              <strong className="font-medium text-espresso">20:30</strong>
            </div>
          </div>
        </div>
        
        <div className="pt-2 border-t border-border/30 text-[9px] text-[#8F6E56] font-medium tracking-wide uppercase italic">
          * Pedimos pontualidade
        </div>
      </div>

      {/* 4. Contato & Dúvidas */}
      <div className="bg-[#FAF6F3] border border-border p-6 flex flex-col justify-between space-y-4 transition-editorial hover:shadow-md hover:-translate-y-1">
        <div className="space-y-4">
          <div className="w-10 h-10 rounded-full border border-border/60 flex items-center justify-center text-primary bg-[#F5EFEB]/50">
            <Question size={18} />
          </div>
          <div className="space-y-1">
            <h4 className="font-serif text-lg font-light text-espresso">Dúvidas?</h4>
            <span className="text-[8px] uppercase tracking-widest text-accent font-semibold block">Contato Noivos</span>
          </div>
          <p className="text-espresso/80 text-xs leading-relaxed font-sans font-light">
            Fique à vontade para entrar em contato direto conosco para qualquer dúvida sobre trajes, presentes ou o evento.
          </p>
        </div>
        
        <div className="pt-4 border-t border-border/30">
          <p className="text-[10px] text-espresso font-semibold font-sans">
            Noivos: (37) 99935-1911
          </p>
        </div>
      </div>
    </div>
  );
}
