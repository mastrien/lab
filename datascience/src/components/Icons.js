// Ícones SVG limpos e vetoriais (substituem todos os emojis)

export const Icons = {
  database: (cls = "w-4 h-4") => `
    <svg class="${cls}" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
      <ellipse cx="12" cy="5" rx="9" ry="3"/>
      <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/>
      <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/>
    </svg>
  `,

  chart: (cls = "w-4 h-4") => `
    <svg class="${cls}" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" d="M3 3v18h18"/>
      <path stroke-linecap="round" stroke-linejoin="round" d="M18 17V9"/>
      <path stroke-linecap="round" stroke-linejoin="round" d="M13 17V5"/>
      <path stroke-linecap="round" stroke-linejoin="round" d="M8 17v-3"/>
    </svg>
  `,

  sliders: (cls = "w-4 h-4") => `
    <svg class="${cls}" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
      <line x1="4" y1="21" x2="4" y2="14"/>
      <line x1="4" y1="10" x2="4" y2="3"/>
      <line x1="12" y1="21" x2="12" y2="12"/>
      <line x1="12" y1="8" x2="12" y2="3"/>
      <line x1="20" y1="21" x2="20" y2="16"/>
      <line x1="20" y1="12" x2="20" y2="3"/>
      <line x1="1" y1="14" x2="7" y2="14"/>
      <line x1="9" y1="8" x2="15" y2="8"/>
      <line x1="17" y1="16" x2="23" y2="16"/>
    </svg>
  `,

  brain: (cls = "w-4 h-4") => `
    <svg class="${cls}" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24A2.5 2.5 0 0 1 9.5 2Z"/>
      <path stroke-linecap="round" stroke-linejoin="round" d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24A2.5 2.5 0 0 0 14.5 2Z"/>
    </svg>
  `,

  scatter: (cls = "w-4 h-4") => `
    <svg class="${cls}" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" d="M3 3v18h18"/>
      <circle cx="7.5" cy="14.5" r="1.5" fill="currentColor"/>
      <circle cx="11.5" cy="9.5" r="1.5" fill="currentColor"/>
      <circle cx="15.5" cy="13.5" r="1.5" fill="currentColor"/>
      <circle cx="18.5" cy="6.5" r="1.5" fill="currentColor"/>
    </svg>
  `,

  target: (cls = "w-4 h-4") => `
    <svg class="${cls}" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="10"/>
      <circle cx="12" cy="12" r="6"/>
      <circle cx="12" cy="12" r="2"/>
    </svg>
  `,

  table: (cls = "w-4 h-4") => `
    <svg class="${cls}" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
      <rect x="3" y="3" width="18" height="18" rx="2"/>
      <path d="M3 9h18"/>
      <path d="M3 15h18"/>
      <path d="M9 3v18"/>
    </svg>
  `,

  layers: (cls = "w-4 h-4") => `
    <svg class="${cls}" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" d="m12 2 10 5-10 5L2 7l10-5Z"/>
      <path stroke-linecap="round" stroke-linejoin="round" d="m2 17 10 5 10-5"/>
      <path stroke-linecap="round" stroke-linejoin="round" d="m2 12 10 5 10-5"/>
    </svg>
  `,

  gitBranch: (cls = "w-4 h-4") => `
    <svg class="${cls}" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
      <line x1="6" y1="3" x2="6" y2="15"/>
      <circle cx="18" cy="6" r="3"/>
      <circle cx="6" cy="18" r="3"/>
      <path d="M18 9a9 9 0 0 1-9 9"/>
    </svg>
  `,

  bookOpen: (cls = "w-4 h-4") => `
    <svg class="${cls}" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
      <path stroke-linecap="round" stroke-linejoin="round" d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
    </svg>
  `,

  upload: (cls = "w-4 h-4") => `
    <svg class="${cls}" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
      <polyline points="17 8 12 3 7 8"/>
      <line x1="12" y1="3" x2="12" y2="15"/>
    </svg>
  `,

  fileText: (cls = "w-4 h-4") => `
    <svg class="${cls}" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
      <polyline points="14 2 14 8 20 8"/>
      <line x1="16" y1="13" x2="8" y2="13"/>
      <line x1="16" y1="17" x2="8" y2="17"/>
      <polyline points="10 9 9 9 8 9"/>
    </svg>
  `,

  check: (cls = "w-4 h-4") => `
    <svg class="${cls}" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
      <polyline points="20 6 9 17 4 12"/>
    </svg>
  `,

  x: (cls = "w-4 h-4") => `
    <svg class="${cls}" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
      <line x1="18" y1="6" x2="6" y2="18"/>
      <line x1="6" y1="6" x2="18" y2="18"/>
    </svg>
  `,

  info: (cls = "w-4 h-4") => `
    <svg class="${cls}" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="10"/>
      <line x1="12" y1="16" x2="12" y2="12"/>
      <line x1="12" y1="8" x2="12.01" y2="8"/>
    </svg>
  `,

  arrowRight: (cls = "w-4 h-4") => `
    <svg class="${cls}" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
      <line x1="5" y1="12" x2="19" y2="12"/>
      <polyline points="12 5 19 12 12 19"/>
    </svg>
  `,

  arrowLeft: (cls = "w-4 h-4") => `
    <svg class="${cls}" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
      <line x1="19" y1="12" x2="5" y2="12"/>
      <polyline points="12 19 5 12 12 5"/>
    </svg>
  `,

  refresh: (cls = "w-4 h-4") => `
    <svg class="${cls}" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" d="M23 4v6h-6"/>
      <path stroke-linecap="round" stroke-linejoin="round" d="M1 20v-6h6"/>
      <path stroke-linecap="round" stroke-linejoin="round" d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/>
    </svg>
  `,

  trash: (cls = "w-4 h-4") => `
    <svg class="${cls}" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
      <polyline points="3 6 5 6 21 6"/>
      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
    </svg>
  `,

  sun: (cls = "w-4 h-4") => `
    <svg class="${cls}" fill="currentColor" viewBox="0 0 20 20">
      <path fill-rule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clip-rule="evenodd"/>
    </svg>
  `,

  moon: (cls = "w-4 h-4") => `
    <svg class="${cls}" fill="currentColor" viewBox="0 0 20 20">
      <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"/>
    </svg>
  `,

  cpu: (cls = "w-4 h-4") => `
    <svg class="${cls}" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
      <rect x="4" y="4" width="16" height="16" rx="2"/>
      <rect x="9" y="9" width="6" height="6"/>
      <line x1="9" y1="1" x2="9" y2="4"/>
      <line x1="15" y1="1" x2="15" y2="4"/>
      <line x1="9" y1="20" x2="9" y2="23"/>
      <line x1="15" y1="20" x2="15" y2="23"/>
      <line x1="20" y1="9" x2="23" y2="9"/>
      <line x1="20" y1="14" x2="23" y2="14"/>
      <line x1="1" y1="9" x2="4" y2="9"/>
      <line x1="1" y1="14" x2="4" y2="14"/>
    </svg>
  `,

  messageSquare: (cls = "w-4 h-4") => `
    <svg class="${cls}" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
    </svg>
  `,

  eye: (cls = "w-4 h-4") => `
    <svg class="${cls}" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
      <circle cx="12" cy="12" r="3"/>
    </svg>
  `,

  trendingUp: (cls = "w-4 h-4") => `
    <svg class="${cls}" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/>
      <polyline points="17 6 23 6 23 12"/>
    </svg>
  `,

  network: (cls = "w-4 h-4") => `
    <svg class="${cls}" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
      <rect x="9" y="2" width="6" height="6" rx="1"/>
      <rect x="2" y="16" width="6" height="6" rx="1"/>
      <rect x="16" y="16" width="6" height="6" rx="1"/>
      <path d="M5 16v-4h14v4"/>
      <line x1="12" y1="8" x2="12" y2="12"/>
    </svg>
  `,

  shieldCheck: (cls = "w-4 h-4") => `
    <svg class="${cls}" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      <polyline points="9 12 11 14 15 10"/>
    </svg>
  `
};
