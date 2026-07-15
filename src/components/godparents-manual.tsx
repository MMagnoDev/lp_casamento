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
          <p className="text-espresso/80 text-xs leading-relaxed font-sans font-light">
            Sugerimos vestidos longos em tons pastel ou terrosos suaves (nude, champagne, rosé ou verde oliva). Evitar estampas muito chamativas.
          </p>
        </div>
        
        <div className="flex gap-3 pt-4 border-t border-border/30">
          <div className="w-6 h-6 rounded-full bg-[#E5C9C5] border border-border/40 shadow-sm transition-transform hover:scale-110" title="Rosé" />
          <div className="w-6 h-6 rounded-full bg-[#E8DCC4] border border-border/40 shadow-sm transition-transform hover:scale-110" title="Champagne" />
          <div className="w-6 h-6 rounded-full bg-[#D5D8C1] border border-border/40 shadow-sm transition-transform hover:scale-110" title="Verde Oliva" />
          <div className="w-6 h-6 rounded-full bg-[#DECAB3] border border-border/40 shadow-sm transition-transform hover:scale-110" title="Nude" />
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
          <p className="text-espresso/80 text-xs leading-relaxed font-sans font-light">
            Recomendamos costume completo em tom cinza escuro ou azul marinho. Camisa social branca e gravata na cor verde oliva (fornecida com carinho pelos noivos).
          </p>
        </div>
        
        <div className="flex gap-3 pt-4 border-t border-border/30">
          <div className="w-6 h-6 rounded-full bg-[#343F51] border border-border/40 shadow-sm transition-transform hover:scale-110" title="Azul Marinho" />
          <div className="w-6 h-6 rounded-full bg-[#52525B] border border-border/40 shadow-sm transition-transform hover:scale-110" title="Cinza Escuro" />
          <div className="w-6 h-6 rounded-full bg-[#FAF6F3] border border-border/40 shadow-sm transition-transform hover:scale-110" title="Camisa Branca" />
          <div className="w-6 h-6 rounded-full bg-[#838E75] border border-border/40 shadow-sm transition-transform hover:scale-110" title="Gravata Oliva" />
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
          <div className="space-y-3 text-espresso/80 text-xs font-sans font-light">
            <div className="flex justify-between border-b border-border/20 pb-1">
              <span>Chegada dos Padrinhos:</span>
              <strong className="font-medium text-espresso">16:15</strong>
            </div>
            <div className="flex justify-between border-b border-border/20 pb-1">
              <span>Início da Cerimônia:</span>
              <strong className="font-medium text-espresso">17:00</strong>
            </div>
            <div className="flex justify-between pb-1">
              <span>Fotos Oficiais:</span>
              <strong className="font-medium text-espresso">Após o sim</strong>
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
            <span className="text-[8px] uppercase tracking-widest text-accent font-semibold block">Contato Assessoria</span>
          </div>
          <p className="text-espresso/80 text-xs leading-relaxed font-sans font-light">
            Fique à vontade para entrar em contato direto com a nossa assessoria para qualquer dúvida sobre trajes, presentes ou o evento.
          </p>
        </div>
        
        <div className="pt-4 border-t border-border/30">
          <p className="text-[10px] text-espresso font-semibold font-sans">
            Assessoria: (11) 99999-9999
          </p>
        </div>
      </div>
    </div>
  );
}
