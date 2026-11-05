import React from 'react';

export function SolarHeroBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none -z-10">
      {/* Dynamic Solar Landscape SVG with Sun, Rays, and Photovoltaic Grid */}
      <svg
        className="w-full h-full object-cover object-center"
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Atmospheric Sky Gradient */}
          <linearGradient id="skyGrad" x1="50%" y1="0%" x2="50%" y2="100%">
            <stop offset="0%" stopColor="#040b14" />
            <stop offset="45%" stopColor="#081827" />
            <stop offset="70%" stopColor="#0b2426" />
            <stop offset="100%" stopColor="#071212" />
          </linearGradient>

          {/* Golden Sun & Sunburst Gradient */}
          <radialGradient id="sunGlow" cx="50%" cy="28%" r="45%">
            <stop offset="0%" stopColor="#fffae0" stopOpacity="0.95" />
            <stop offset="15%" stopColor="#fde047" stopOpacity="0.75" />
            <stop offset="35%" stopColor="#f59e0b" stopOpacity="0.45" />
            <stop offset="60%" stopColor="#10b981" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#071212" stopOpacity="0" />
          </radialGradient>

          {/* Broad Atmospheric Beam Gradient */}
          <linearGradient id="sunbeamGrad" x1="50%" y1="25%" x2="50%" y2="100%">
            <stop offset="0%" stopColor="#fef08a" stopOpacity="0.35" />
            <stop offset="40%" stopColor="#34d399" stopOpacity="0.18" />
            <stop offset="100%" stopColor="#071212" stopOpacity="0" />
          </linearGradient>

          {/* Solar Panel Specular Glass Gradient */}
          <linearGradient id="panelGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#16384c" />
            <stop offset="40%" stopColor="#0c2333" />
            <stop offset="70%" stopColor="#091b29" />
            <stop offset="100%" stopColor="#06121c" />
          </linearGradient>

          {/* Solar Panel Reflection Highlight */}
          <linearGradient id="panelReflection" x1="30%" y1="0%" x2="70%" y2="100%">
            <stop offset="0%" stopColor="#67e8f9" stopOpacity="0.45" />
            <stop offset="30%" stopColor="#38bdf8" stopOpacity="0.25" />
            <stop offset="60%" stopColor="#10b981" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#06121c" stopOpacity="0" />
          </linearGradient>

          {/* Distant Hills Gradient */}
          <linearGradient id="hillGrad1" x1="50%" y1="0%" x2="50%" y2="100%">
            <stop offset="0%" stopColor="#0a262c" />
            <stop offset="100%" stopColor="#061517" />
          </linearGradient>

          <linearGradient id="hillGrad2" x1="50%" y1="0%" x2="50%" y2="100%">
            <stop offset="0%" stopColor="#0f3438" />
            <stop offset="100%" stopColor="#051012" />
          </linearGradient>
        </defs>

        {/* 1. Base Sky */}
        <rect width="1440" height="900" fill="url(#skyGrad)" />

        {/* 2. Radiant Sun Rays Emanating Across Sky */}
        <g opacity="0.6">
          {/* Fan of golden light beams radiating downwards towards solar farm */}
          <polygon points="720,250 180,900 280,900" fill="url(#sunbeamGrad)" />
          <polygon points="720,250 360,900 480,900" fill="url(#sunbeamGrad)" />
          <polygon points="720,250 560,900 680,900" fill="url(#sunbeamGrad)" />
          <polygon points="720,250 760,900 880,900" fill="url(#sunbeamGrad)" />
          <polygon points="720,250 960,900 1080,900" fill="url(#sunbeamGrad)" />
          <polygon points="720,250 1160,900 1280,900" fill="url(#sunbeamGrad)" />
          <polygon points="720,250 0,700 0,850" fill="url(#sunbeamGrad)" />
          <polygon points="720,250 1440,700 1440,850" fill="url(#sunbeamGrad)" />
        </g>

        {/* 3. The Bright Beaming Sun */}
        <circle cx="720" cy="250" r="320" fill="url(#sunGlow)" />
        <circle cx="720" cy="250" r="75" fill="#fffef0" filter="drop-shadow(0px 0px 25px rgba(253, 224, 71, 0.9))" />
        <circle cx="720" cy="250" r="42" fill="#ffffff" />

        {/* 4. Distant Horizon Hills / Mountains */}
        <path
          d="M0,520 Q320,470 720,510 T1440,490 L1440,900 L0,900 Z"
          fill="url(#hillGrad1)"
          opacity="0.85"
        />
        <path
          d="M0,560 Q400,515 880,550 T1440,540 L1440,900 L0,900 Z"
          fill="url(#hillGrad2)"
        />

        {/* 5. Photovoltaic Solar Arrays in Perspective View (Rows of ground & floating modules) */}
        <g id="solarArrayGrid">
          {/* Distant Row 1 */}
          <polygon points="260,575 1180,575 1240,605 200,605" fill="url(#panelGrad)" stroke="#1e4d69" strokeWidth="1" />
          <polygon points="260,575 1180,575 1240,605 200,605" fill="url(#panelReflection)" />
          {/* Panel Dividers Row 1 */}
          <line x1="380" y1="575" x2="350" y2="605" stroke="#05121b" strokeWidth="1.5" />
          <line x1="520" y1="575" x2="510" y2="605" stroke="#05121b" strokeWidth="1.5" />
          <line x1="660" y1="575" x2="670" y2="605" stroke="#05121b" strokeWidth="1.5" />
          <line x1="800" y1="575" x2="820" y2="605" stroke="#05121b" strokeWidth="1.5" />
          <line x1="940" y1="575" x2="980" y2="605" stroke="#05121b" strokeWidth="1.5" />
          <line x1="1070" y1="575" x2="1120" y2="605" stroke="#05121b" strokeWidth="1.5" />

          {/* Row 2 */}
          <polygon points="180,620 1260,620 1340,665 100,665" fill="url(#panelGrad)" stroke="#22597b" strokeWidth="1.2" />
          <polygon points="180,620 1260,620 1340,665 100,665" fill="url(#panelReflection)" />
          {/* Panel Dividers Row 2 */}
          <line x1="320" y1="620" x2="270" y2="665" stroke="#05121b" strokeWidth="2" />
          <line x1="490" y1="620" x2="470" y2="665" stroke="#05121b" strokeWidth="2" />
          <line x1="660" y1="620" x2="670" y2="665" stroke="#05121b" strokeWidth="2" />
          <line x1="830" y1="620" x2="870" y2="665" stroke="#05121b" strokeWidth="2" />
          <line x1="1000" y1="620" x2="1070" y2="665" stroke="#05121b" strokeWidth="2" />
          <line x1="1150" y1="620" x2="1230" y2="665" stroke="#05121b" strokeWidth="2" />

          {/* Foreground Row 3 (Large high-detail solar tables with direct sun glare) */}
          <polygon points="80,685 1360,685 1460,755 -20,755" fill="url(#panelGrad)" stroke="#276c96" strokeWidth="1.5" />
          <polygon points="80,685 1360,685 1460,755 -20,755" fill="url(#panelReflection)" opacity="0.9" />
          {/* Bright Specular Glint on Row 3 */}
          <polygon points="620,685 820,685 860,755 580,755" fill="#a7f3d0" opacity="0.22" />
          {/* Row 3 Cell Gridlines */}
          <line x1="240" y1="685" x2="170" y2="755" stroke="#030c13" strokeWidth="2.5" />
          <line x1="440" y1="685" x2="400" y2="755" stroke="#030c13" strokeWidth="2.5" />
          <line x1="640" y1="685" x2="630" y2="755" stroke="#030c13" strokeWidth="2.5" />
          <line x1="840" y1="685" x2="870" y2="755" stroke="#030c13" strokeWidth="2.5" />
          <line x1="1040" y1="685" x2="1100" y2="755" stroke="#030c13" strokeWidth="2.5" />
          <line x1="1230" y1="685" x2="1320" y2="755" stroke="#030c13" strokeWidth="2.5" />
          {/* Horizontal Cell Lines Row 3 */}
          <line x1="50" y1="718" x2="1390" y2="718" stroke="#102e40" strokeWidth="1" strokeDasharray="6,2" />

          {/* Foreground Row 4 (Immediate Front) */}
          <polygon points="-40,780 1480,780 1560,890 -120,890" fill="url(#panelGrad)" stroke="#2d7fae" strokeWidth="2" />
          <polygon points="-40,780 1480,780 1560,890 -120,890" fill="url(#panelReflection)" opacity="0.85" />
          {/* Specular Glint Center */}
          <polygon points="600,780 840,780 910,890 530,890" fill="#6ee7b7" opacity="0.18" />
          {/* Vertical Racking and Cell Gaps */}
          <line x1="160" y1="780" x2="90" y2="890" stroke="#02080d" strokeWidth="3" />
          <line x1="410" y1="780" x2="370" y2="890" stroke="#02080d" strokeWidth="3" />
          <line x1="660" y1="780" x2="650" y2="890" stroke="#02080d" strokeWidth="3" />
          <line x1="910" y1="780" x2="940" y2="890" stroke="#02080d" strokeWidth="3" />
          <line x1="1160" y1="780" x2="1230" y2="890" stroke="#02080d" strokeWidth="3" />
          <line x1="1400" y1="780" x2="1510" y2="890" stroke="#02080d" strokeWidth="3" />
          {/* Horizontal Cell division */}
          <line x1="-80" y1="832" x2="1520" y2="832" stroke="#163e56" strokeWidth="1.5" strokeDasharray="8,3" />
        </g>
      </svg>

      {/* Gentle Bottom Blend to Seamlessly Transition to Section Content */}
      <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-[#070d14] via-[#070d14]/75 to-transparent pointer-events-none" />
      
      {/* Subtle Side Vignette for Reading Comfort */}
      <div className="absolute inset-y-0 inset-x-0 bg-radial-gradient pointer-events-none" style={{
        background: 'radial-gradient(ellipse at center, transparent 35%, rgba(7, 13, 20, 0.65) 90%)'
      }} />
    </div>
  );
}
