"use client";

import React from 'react';
import { Loader2 } from 'lucide-react';

export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <div className="relative w-24 h-24 mx-auto mb-4">
          <div className="absolute inset-0 rounded-full border-4 border-t-cyan-400 border-r-pink-400 border-b-cyan-400 border-l-pink-400 animate-spin"/>
          <Loader2 className="w-full h-full text-cyan-500 animate-pulse" />
        </div>
        <h2 className="text-2xl font-semibold bg-gradient-to-r from-cyan-500 to-pink-500 bg-clip-text text-transparent">Cargando...</h2>
      </div>
    </div>
  );
}