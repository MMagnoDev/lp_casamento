"use client";

import React from "react";
import { TShirt, Clock, Question } from "@phosphor-icons/react";

export default function GodparentsManual() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {/* 1. Trajes Madrinhas */}
      <div className="bg-transparent border border-border/80 p-6 rounded-[3rem] space-y-4 flex flex-col justify-between">
        <div className="space-y-3">
          <div className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-primary">
            <TShirt size={18} />
          </div>
          <h4 className="font-serif text-base font-light text-foreground">Traje Madrinhas</h4>
          <p className="text-primary/80 text-xs leading-relaxed font-sans font-light">
            Sugerimos vestidos longos em tons pastel ou terrosos suaves (nude, champagne, rosé ou verde oliva). Evitar estampas chamativas.
          </p>
        </div>
        
        <div className="flex gap-2.5 pt-2">
          <div className="w-5 h-5 rounded-full bg-[#E5C9C5] border border-border/40" title="Rosé" />
          <div className="w-5 h-5 rounded-full bg-[#E8DCC4] border border-border/40" title="Champagne" />
          <div className="w-5 h-5 rounded-full bg-[#D5D8C1] border border-border/40" title="Verde Oliva" />
          <div className="w-5 h-5 rounded-full bg-[#DECAB3] border border-border/40" title="Nude" />
        </div>
      </div>

      {/* 2. Trajes Padrinhos */}
      <div className="bg-transparent border border-border/80 p-6 rounded-[3rem] space-y-4 flex flex-col justify-between">
        <div className="space-y-3">
          <div className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-primary">
            <TShirt size={18} />
          </div>
          <h4 className="font-serif text-base font-light text-foreground">Traje Padrinhos</h4>
          <p className="text-primary/80 text-xs leading-relaxed font-sans font-light">
            Recomendamos costume completo em tom cinza escuro ou azul marinho. Camisa social branca e gravata na cor verde oliva (fornecida pelos noivos).
          </p>
        </div>
        <div className="flex gap-2.5 pt-2">
          <div className="w-5 h-5 rounded-full bg-[#343F51] border border-border/40" title="Azul Marinho" />
          <div className="w-5 h-5 rounded-full bg-[#52525B] border border-border/40" title="Cinza Escuro" />
          <div className="w-5 h-5 rounded-full bg-[#FAF6F3] border border-border/40" title="Camisa Branca" />
          <div className="w-5 h-5 rounded-full bg-[#838E75] border border-border/40" title="Gravata Oliva" />
        </div>
      </div>

      {/* 3. Horários Importantes */}
      <div className="bg-transparent border border-border/80 p-6 rounded-[3rem] space-y-3">
        <div className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-primary">
          <Clock size={18} />
        </div>
        <h4 className="font-serif text-base font-light text-foreground">Horários</h4>
        <div className="space-y-2.5 text-primary/80 text-xs font-sans font-light">
          <p><strong>Chegada:</strong> 16:15</p>
          <p><strong>Cerimônia:</strong> 17:00</p>
          <p><strong>Fotos Oficiais:</strong> Após o sim</p>
        </div>
      </div>

      {/* 4. Contato & Dúvidas */}
      <div className="bg-transparent border border-border/80 p-6 rounded-[3rem] space-y-3">
        <div className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-primary">
          <Question size={18} />
        </div>
        <h4 className="font-serif text-base font-light text-foreground">Dúvidas?</h4>
        <p className="text-primary/80 text-xs leading-relaxed font-sans font-light">
          Entre em contato direto com a nossa assessoria para qualquer esclarecimento.
        </p>
        <p className="text-primary text-xs font-semibold pt-1 font-sans">
          Assessoria: (11) 99999-9999
        </p>
      </div>
    </div>
  );
}
