import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import heroBackgroundImg from './hero-bg.jpg';
import heroPosterImg from './hero-poster.jpg';
import floatingSolarHybridImg from './floating-solar-hybrid.jpg';
import logoImg from './logo.png';
import navLeavesImg from './nav-leaves.jpg';
import { MetricCounter } from './MetricCounter';
import { 
  Shield, Zap, Globe, TrendingUp, Award, ArrowRight, 
  CheckCircle2, Droplets, Leaf, BarChart3, Mail, Phone, MapPin, 
  ChevronRight, Menu, X, Building2, Users, FileText, Flame, 
  Cpu, Compass, ArrowUpRight, Check, HelpCircle, Layers, Clock,
  Sun, Sparkles, Waves, ArrowDownRight
} from 'lucide-react';

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeNexusTab, setActiveNexusTab] = useState<'energy' | 'water' | 'food' | 'waste'>('energy');
  const [projectFilter, setProjectFilter] = useState<string>('all');
  
  // LIGHT MODERN THEME
  const currentTheme = {
    name: "Light Modern",
    bgRoot: "bg-white",
    sectionAlt: "bg-slate-50 border-y border-slate-200",
    badge: "border-emerald-200 bg-emerald-50 text-emerald-700 font-semibold",
    headlineGradient: "from-slate-900 via-emerald-800 to-emerald-600",
    primaryBtn: "bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-600/30 font-bold",
    secondaryBtn: "border-2 border-slate-800 text-slate-800 hover:bg-slate-800 hover:text-white",
    accentText: "text-emerald-600",
    accentSecondary: "text-slate-700",
    cardBg: "bg-white border border-slate-200 hover:border-emerald-400 shadow-sm hover:shadow-lg",
    cardInner: "bg-slate-50 border border-slate-200",
    navBg: "bg-white/95 border-slate-200",
    inputBg: "bg-white border border-slate-300 text-slate-900 focus:ring-emerald-500 focus:border-emerald-500",
    sliderAccent: "accent-emerald-600",
    pillActive: "bg-emerald-600 text-white shadow-sm",
    pillInactive: "bg-slate-100 text-slate-600 hover:bg-slate-200 border border-slate-200"
  };
  
  // Interactive Hydro-Solar Hybrid Calculator
  const [solarCapacityMW, setSolarCapacityMW] = useState<number>(5.4);
  const [hydroCapacityMW, setHydroCapacityMW] = useState<number>(5.0);

  // Inquiry prefill message and form submission state
  const [inquiryScope, setInquiryScope] = useState<string>('');
  const [contactName, setContactName] = useState<string>('');
  const [contactEmail, setContactEmail] = useState<string>('');
  const [contactSector, setContactSector] = useState<string>('Power Utility / IPP');
  const [contactPackage, setContactPackage] = useState<string>('Pre-Feasibility Study');
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [formFeedback, setFormFeedback] = useState<string>('');

  const handleContactSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus('submitting');
    setFormFeedback('');

    try {
      // Using Formsubmit.co with direct AJAX json submission
      // Delivers straight to info@hermitsustainability.co.zw with CC to hermitinfopack@gmail.com
      const response = await fetch('https://formsubmit.co/ajax/info@hermitsustainability.co.zw', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: contactName,
          email: contactEmail,
          client_sector: contactSector,
          advisory_package: contactPackage,
          project_scope: inquiryScope,
          _subject: `[Hermit Advisory] New Inception Request from ${contactName} (${contactSector})`,
          _cc: 'hermitinfopack@gmail.com',
          _template: 'table'
        })
      });

      const result = await response.json();
      if (response.ok && (result.success === 'true' || result.success === true || result.message)) {
        setFormStatus('success');
        setFormFeedback('Thank you. Your advisory request has been delivered to Hermit Advisory (info@hermitsustainability.co.zw). Our lead engineer will reach out within 24 business hours.');
        // Reset form
        setContactName('');
        setContactEmail('');
        setInquiryScope('');
      } else {
        throw new Error(result.message || 'Submission failed');
      }
    } catch (err: any) {
      console.warn('Direct form delivery failed, providing mailto fallback:', err);
      setFormStatus('error');
      setFormFeedback('Could not deliver directly via web service. Click below to launch your email client or send directly to info@hermitsustainability.co.zw.');
    }
  };
  
  // Track video loading state for smooth poster transition
  const [showScrolledWatermark, setShowScrolledWatermark] = useState<boolean>(false);
  const [isVideoLoaded, setIsVideoLoaded] = useState<boolean>(false);
  const [isMobileScreen, setIsMobileScreen] = useState<boolean>(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobileScreen(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    const handleScroll = () => {
      // Show watermark once user scrolls past 350px (beyond hero)
      setShowScrolledWatermark(window.scrollY > 350);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => { window.removeEventListener('resize', checkMobile); window.removeEventListener('scroll', handleScroll); };
  }, []);

  const prefillWithCalculator = () => {
    const text = `Preliminary assessment request for a Hydro-Solar Hybrid system: ${solarCapacityMW} MWp Floating Solar array combined with a ${hydroCapacityMW} MW Hydroelectric scheme (Estimated joint yield: ${(totalHybridMWh / 1000).toFixed(1)} GWh/yr, ~${blendedCapacityFactor}% blended capacity factor).`;
    setInquiryScope(text);
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Calculations based on PVsyst case study (Page 8: 5.437 MWp solar -> 10,614 MWh; 5 MW hydro -> 23,161 MWh)
  const estimatedSolarMWh = Math.round(solarCapacityMW * (10614 / 5.437));
  const estimatedHydroMWh = Math.round(hydroCapacityMW * (23161 / 5.0));
  const totalHybridMWh = estimatedSolarMWh + estimatedHydroMWh;
  const blendedCapacityFactor = (((totalHybridMWh) / ((solarCapacityMW + hydroCapacityMW) * 8760)) * 100).toFixed(1);
  // Estimated water evaporation saved from floating solar: ~15,000 m³ per MWp per year
  const estimatedWaterSavedM3 = Math.round(solarCapacityMW * 15200);

  // Quad Nexus Data
  const quadNexus = {
    energy: {
      title: "Energy Solutions",
      subtitle: "Clean, Bankable Baseload & Peak Generation",
      description: "Pioneering floating solar PV arrays, rooftop solar for C&I, utility-scale solar farms, pumped hydro energy storage, and integrated battery storage systems (BESS).",
      deliverables: [
        "Floating Solar PV on inland dams & reservoirs",
        "Hydro-solar hybridisation sharing shared grid infrastructure",
        "Rooftop Solar PV for commercial, industrial & pension fund portfolios",
        "Simulation & grid protection integration"
      ],
      tag: "500MW+ Hybrid Potential"
    },
    water: {
      title: "Water Management",
      subtitle: "Securing High-Yield Water Resource Infrastructure",
      description: "Harnessing clean power for solar-powered water pumping, large-scale precision irrigation schemes, comprehensive water efficiency audits, and certified purification systems.",
      deliverables: [
        "Solar-powered agricultural water pumping & conveyance",
        "First-principles hydraulic modelling for mini-hydro & dams",
        "Water resource efficiency & loss-reduction audits",
        "NSF-certified household & institutional water purification (eSpring)"
      ],
      tag: "Certified Safety & Efficiency"
    },
    food: {
      title: "Food Security & Agri-Energy",
      subtitle: "Renewable-Powered Productive Agriculture",
      description: "Bridging farm energy access through renewable-powered agro-processing, cold-chain storage solutions, and innovative Pay-As-You-Go (PAYG) financing mechanisms.",
      deliverables: [
        "Renewable-powered irrigation & post-harvest processing",
        "PAYG financing models for smallholder & commercial outgrowers",
        "Agrivoltaics and dual-use land optimization",
        "Cold chain electrification for agricultural exports"
      ],
      tag: "Resilient Yields"
    },
    waste: {
      title: "Waste to Energy",
      subtitle: "Circular Bio-Economy & Valorisation",
      description: "Transforming municipal, agricultural, and industrial organic waste into clean power and high-value biogas through advanced conversion systems.",
      deliverables: [
        "Biogas-to-energy anaerobic digestion engineering",
        "Municipal and agricultural biomass waste valorisation",
        "Industrial waste stream energy recapture studies",
        "Circular economy compliance & carbon offset monetisation"
      ],
      tag: "Zero-Waste Transition"
    }
  };

  const projectPortfolio = [
    
    {
      name: "Osborne Dam Floating Solar",
      type: "Floating Solar PV",
      size: "100 MW",
      location: "Mutare, Zimbabwe",
      category: "floating",
      description: "Utility reservoir solar deployment reducing surface water evaporation while generating high-yield clean power for the regional grid."
    },
    {
      name: "Bushmead Solar Plant",
      type: "Solar PV",
      size: "10 MW",
      location: "Masvingo Province",
      category: "solar",
      description: "Full feasibility, PVsyst modelling, and grid integration for commercial solar farm feeding provincial industrial demand."
    },
    
    {
      name: "Midlands Solar PV",
      type: "Grid-Connected Solar",
      size: "50 MW",
      location: "Midlands, Zimbabwe",
      category: "solar",
      description: "Large-scale utility transmission study, Class 5 CAPEX assessment, and environmental and social screening (ESIA)."
    },
    {
      name: "Rufaro Solar Farm",
      type: "Grid-Connected Solar",
      size: "50 MW",
      location: "Zimbabwe",
      category: "solar",
      description: "Comprehensive bankability audit, tariff financial structuring, and interconnection design for institutional co-investment."
    },
    {
      name: "Mkwasine Solar PV",
      type: "Grid-Connected Solar",
      size: "10.6 MW",
      location: "Lowveld, Zimbabwe",
      category: "solar",
      description: "Agro-industrial power hub powering critical irrigation pumps and regional sugar cane processing facilities."
    },
    {
      name: "Odzani Hydropower Plant",
      type: "Hydropower",
      size: "2.4 MW",
      location: "Eastern Highlands, Zimbabwe",
      category: "hydro",
      description: "Run-of-river hydraulic simulation, turbine optimization, and civil rehabilitation engineering assessment."
    },
    {
      name: "Nyahode Hydropower",
      type: "Hydropower",
      size: "1.7 MW",
      location: "Eastern Highlands, Zimbabwe",
      category: "hydro",
      description: "Run-of-river hydro development and integration study for community electrification and decentralized resilience."
    },
    {
      name: "Kariba Floating Solar Plant",
      type: "Hydro-Solar Hybrid",
      size: "250 – 1,000 MW",
      location: "Lake Kariba, Zimbabwe",
      category: "hybrid",
      description: "Groundbreaking utility-scale floating solar integration on Lake Kariba, hybridising with the existing hydroelectric complex for grid balancing."
    }
  ];

  const filteredProjects = projectFilter === 'all' 
    ? projectPortfolio 
    : projectPortfolio.filter(p => p.category === projectFilter);

  const engagementStages = [
    { step: "01", name: "Brief", desc: "Clear alignment on project scope, objectives, and client requirements." },
    { step: "02", name: "Site & Resource", desc: "Baseline solar irradiance, hydrological data, and site condition analysis." },
    { step: "03", name: "Modelling", desc: "Hourly PVsyst yield simulation and first-principles hydraulic engineering." },
    { step: "04", name: "Financial", desc: "Class 5 cost accuracy benchmarking, LCOE, and bankability evaluation." },
    { step: "05", name: "Risk & ESIA", desc: "Environmental and social screening, mitigation planning, and stakeholder engagement." },
    { step: "06", name: "Recommendation", desc: "Final bankable advisory report, investment memorandum, and next steps." }
  ];

  const partners = [
    { name: "Bui Power Authority", role: "Floating Solar & Pumped Hydro", location: "Ghana" },
    { name: "UNIDO & GIZ", role: "Development Programs", location: "International" },
    { name: "Infrastructure Dev Bank of Zimbabwe", role: "Project Finance Partner", location: "Zimbabwe" },
    { name: "African Union Commission", role: "Small Hydro & Solar Policy", location: "Pan-Africa" },
    { name: "REN21", role: "SADC Renewable Status Reports", location: "Regional" },
    { name: "Ministry of Energy", role: "Mission 300 National Energy Compact", location: "Zimbabwe" },
    { name: "NRZ Pension Fund (NRZ-CPF)", role: "Commercial Rooftop Solar Assessment", location: "Multi-site" }
  ];

  return (
    <div className={`relative isolate min-h-screen ${currentTheme.bgRoot} text-slate-900 font-sans selection:bg-emerald-500 selection:text-white transition-colors duration-500`}>
      {/* Background Watermark: Hidden on Hero, smoothly appears with crisp visibility when scrolling down */}
      <motion.div
        className="fixed inset-0 z-0 overflow-hidden pointer-events-none select-none flex items-center justify-center transition-opacity duration-700 ease-out"
        aria-hidden="true"
        animate={{
          opacity: showScrolledWatermark ? 0.35 : 0,
          scale: showScrolledWatermark ? 1 : 0.95
        }}
        transition={{ duration: 0.5 }}
      >
        <img
          src={logoImg}
          alt="Hermit Sustainability Watermark"
          className="w-full h-full object-contain object-center max-w-3xl max-h-[75vh] filter drop-shadow-[0_0_50px_rgba(16,185,129,0.3)]"
        />
      </motion.div>
      <div className="relative z-10">
      
      {/* Top Contact Bar */}
      <motion.div 
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
        className="bg-emerald-700 text-white text-xs font-medium py-2.5 px-4 border-b border-emerald-800"
      >
        <div className="max-w-7xl mx-auto flex items-center justify-end gap-4 text-[11px]">
          <span className="flex items-center gap-1.5 text-white/90 font-medium"><Phone className="w-3 h-3 text-amber-400" /> +263 71 280 0220</span>
          <span className="text-white/40">•</span>
          <span className="flex items-center gap-1.5 text-white/90 font-medium"><Mail className="w-3 h-3 text-amber-400" /> info@hermitsustainability.co.zw</span>
        </div>
      </motion.div>

      {/* Main Navbar with Option A: Dark Bio-Glass Leaf Pattern */}
      <motion.nav 
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        className="sticky top-0 z-50 overflow-hidden border-b border-slate-200 shadow-sm transition-colors bg-white"
      >
        {/* Leaf Background Layer - Highly Visible & Vibrant */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden" aria-hidden="true">
          <img
            src={navLeavesImg}
            alt=""
            className="w-full h-full object-cover object-center opacity-0"
          />
          {/* Subtle dark tint solely to keep white text effortlessly readable */}
          <div className="absolute inset-0 bg-white" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Logo */}
          <a href="#" className="flex items-center space-x-3 group">
            <img
              src={logoImg}
              alt="Hermit Sustainability Advisory"
              className="w-11 h-11 rounded-xl object-cover object-center shadow-lg shadow-emerald-500/20 transform group-hover:scale-105 transition-transform"
            />
            <div>
              <span className="text-2xl font-black tracking-tight font-display text-slate-900">
                HERMIT
              </span>
              <span className="block text-[10px] font-bold uppercase tracking-[0.2em] text-emerald-600">
                Sustainability Advisory
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center space-x-7 xl:space-x-8 text-[15px] xl:text-base font-semibold text-slate-700">
            <a href="#about" className="hover:text-emerald-600 transition-colors">About</a>
            <a href="#nexus" className="hover:text-emerald-600 transition-colors">Quad Nexus</a>
            <a href="#hybrid" className="hover:text-emerald-600 transition-colors">Hybrid Solutions</a>
            <a href="#portfolio" className="hover:text-emerald-600 transition-colors">Track Record</a>
            <a href="#process" className="hover:text-emerald-600 transition-colors">Engagement</a>
            <a href="#partnerships" className="hover:text-emerald-600 transition-colors">Partners</a>
            <a href="#faq" className="hover:text-emerald-600 transition-colors">FAQ</a>
          </div>

          {/* Right Action CTA */}
          <div className="hidden sm:flex items-center space-x-3">
            <a
              href="#contact"
              className={`inline-flex items-center gap-2 px-6 py-3 text-sm font-bold uppercase tracking-wider text-slate-950 ${currentTheme.primaryBtn} rounded-xl transition-all transform hover:-translate-y-1 hover:shadow-xl hover:shadow-emerald-500/40`}
            >
              <span>Initiate Study</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-700 hover:text-slate-900"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile menu dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-b border-slate-200 bg-white px-6 py-6 space-y-3 font-medium shadow-lg">
            <a href="#about" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-slate-700 hover:text-emerald-600">About Hermit</a>
            <a href="#nexus" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-slate-700 hover:text-emerald-600">Quad Nexus Solutions</a>
            <a href="#hybrid" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-slate-700 hover:text-emerald-600">Hydro-Solar Hybrid Case</a>
            <a href="#portfolio" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-slate-700 hover:text-emerald-600">Project Portfolio</a>
            <a href="#process" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-slate-700 hover:text-emerald-600">Engagement Process</a>
            <a href="#partnerships" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-slate-700 hover:text-emerald-600">Strategic Partnerships</a>
            <a href="#contact" onClick={() => setMobileMenuOpen(false)} className={`block py-3 mt-4 text-center text-slate-950 ${currentTheme.primaryBtn} rounded-xl font-bold`}>
              Contact Harare Office
            </a>
          </div>
        )}
      </motion.nav>

      {/* Hero Section with Custom Background Image / Video */}
      <section className="relative pt-16 pb-20 sm:pt-28 sm:pb-36 lg:pt-40 lg:pb-52 overflow-hidden">
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none" aria-hidden="true">
          
          {/* 1. Alternate Background (Wind Turbine) - shown immediately while video buffers or on mobile */}
          <div 
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              isVideoLoaded ? 'opacity-0' : 'opacity-100'
            }`}
          >
            <img
              src={heroPosterImg}
              alt="Clean wind energy infrastructure"
              className="w-full h-full object-cover object-center scale-[1.02] filter brightness-100"
            />
          </div>

          {/* 2. Video Element with reduced mobile burden & smooth fade-in */}
          <video
            className={`h-full w-full object-cover object-center transition-opacity duration-1000 ease-in-out ${
              isVideoLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            autoPlay
            muted
            loop
            playsInline
            preload={isMobileScreen ? "none" : "metadata"}
            poster={heroPosterImg}
            onLoadedData={() => setIsVideoLoaded(true)}
            onPlaying={() => setIsVideoLoaded(true)}
            tabIndex={-1}
          >
            <source src="/hero-background.mp4" type="video/mp4" />
          </video>

          {/* Animated Atmospheric Glows & Light Rays (visible especially on mobile when video is paused/static) */}
          <div className="absolute -top-24 left-1/4 -translate-x-1/2 w-96 h-96 sm:w-[600px] sm:h-[600px] bg-gradient-to-b from-emerald-500/30 via-teal-500/15 to-transparent rounded-full blur-3xl pointer-events-none animate-pulse" style={{ animationDuration: '6s' }} />
          <div className="absolute top-1/4 right-1/4 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-10 -left-20 w-60 h-60 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />

          {/* Subtle Dynamic Grid Overlay to give a high-tech clean energy aesthetic */}
          <div 
            className="absolute inset-0 opacity-[0.07] pointer-events-none" 
            style={{ 
              backgroundImage: 'radial-gradient(rgba(52, 211, 153, 0.4) 1px, transparent 1px)', 
              backgroundSize: '24px 24px' 
            }} 
          />

          {/* Contrast & Gradient Depth Layers */}
          <div className="absolute inset-0 bg-slate-900/30" />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/40 via-transparent to-white" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Masked Slide-up Headline Reveal (Erthost Style) */}
          <div className="overflow-hidden py-1">
            <motion.h1 
              initial={{ y: "110%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="text-4xl sm:text-6xl lg:text-7xl xl:text-8xl font-extrabold tracking-tight font-display max-w-3xl leading-[1.08] sm:leading-[1.05] text-white"
            >
              {' '}
              <span className={`bg-gradient-to-r ${currentTheme.headlineGradient} bg-clip-text text-transparent`}>
                Advancing Sustainable Energy Solutions Globally!
              </span>
            </motion.h1>
          </div>

          <motion.p 
            initial={{ y: 25, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="mt-6 sm:mt-8 text-base sm:text-xl lg:text-2xl text-white max-w-2xl leading-relaxed font-medium drop-shadow-md"
          >
            Delivering innovative, bankable, and scalable clean energy solutions grounded in the 
            <span className={`font-semibold ${currentTheme.accentText}`}> Quad Nexus</span> of Energy, Water, Food, and Waste to Energy.
          </motion.p>

          <motion.div 
            initial={{ y: 25, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="mt-10 sm:mt-12 flex flex-col sm:flex-row items-stretch sm:items-start gap-4"
          >
            <a
              href="#hybrid"
              className={`w-full sm:w-auto px-7 sm:px-10 py-4 sm:py-5 text-sm sm:text-base font-bold ${currentTheme.primaryBtn} rounded-2xl shadow-2xl flex items-center justify-center gap-2 transition-all transform hover:-translate-y-1 active:scale-[0.98] hover:shadow-emerald-500/50`}
            >
              <span>Explore Floating Solar & Hybrid Case</span>
              <ArrowRight className="w-4 h-4 shrink-0" />
            </a>
            <a
              href="#portfolio"
              className={`w-full sm:w-auto px-7 sm:px-10 py-4 sm:py-5 text-sm sm:text-base font-bold ${currentTheme.secondaryBtn} rounded-2xl transition-all active:scale-[0.98]`}
            >
              View 1,000+ MW Portfolio
            </a>
          </motion.div>

          {/* Quick Metrics Bar from "Hermit at a Glance" with Staggered Entrance & Live Counters */}
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.1,
                  delayChildren: 0.55
                }
              }
            }}
            className="mt-16 sm:mt-24 grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 text-left"
          >
            <motion.div 
              variants={{
                hidden: { y: 30, opacity: 0, scale: 0.95 },
                visible: { y: 0, opacity: 1, scale: 1, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
              }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="p-4 sm:p-6 rounded-2xl bg-slate-900/70 hover:bg-slate-900/85 backdrop-blur-md border border-white/20 shadow-xl transition-all"
            >
              <div className="flex items-center justify-between text-amber-300 mb-1.5 sm:mb-2">
                <Zap className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-emerald-100/70">PV Modelled</span>
              </div>
              <p className="text-xl sm:text-3xl font-extrabold font-display text-white">
                <MetricCounter value="1000+ kWp" />
              </p>
              <p className="text-[11px] sm:text-xs text-emerald-100/80 mt-0.5 sm:mt-1">Representative solar array</p>
            </motion.div>

            <motion.div 
              variants={{
                hidden: { y: 30, opacity: 0, scale: 0.95 },
                visible: { y: 0, opacity: 1, scale: 1, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
              }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="p-4 sm:p-6 rounded-2xl bg-slate-900/70 hover:bg-slate-900/85 backdrop-blur-md border border-white/20 shadow-xl transition-all"
            >
              <div className="flex items-center justify-between text-emerald-300 mb-1.5 sm:mb-2">
                <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-emerald-100/70">Annual Yield</span>
              </div>
              <p className="text-xl sm:text-3xl font-extrabold font-display text-white">
                <MetricCounter value="33.8 GWh/yr" />
              </p>
              <p className="text-[11px] sm:text-xs text-emerald-100/80 mt-0.5 sm:mt-1">Combined floating solar + mini-hydro</p>
            </motion.div>

            <motion.div 
              variants={{
                hidden: { y: 30, opacity: 0, scale: 0.95 },
                visible: { y: 0, opacity: 1, scale: 1, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
              }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="p-4 sm:p-6 rounded-2xl bg-slate-900/70 hover:bg-slate-900/85 backdrop-blur-md border border-white/20 shadow-xl transition-all"
            >
              <div className="flex items-center justify-between text-amber-300 mb-1.5 sm:mb-2">
                <Clock className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-emerald-100/70">Timeline</span>
              </div>
              <p className="text-xl sm:text-3xl font-extrabold font-display text-white">
                <MetricCounter value="8 Months" />
              </p>
              <p className="text-[11px] sm:text-xs text-emerald-100/80 mt-0.5 sm:mt-1">From inception to EPC tender ready</p>
            </motion.div>

            <motion.div 
              variants={{
                hidden: { y: 30, opacity: 0, scale: 0.95 },
                visible: { y: 0, opacity: 1, scale: 1, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
              }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="p-4 sm:p-6 rounded-2xl bg-slate-900/70 hover:bg-slate-900/85 backdrop-blur-md border border-white/20 shadow-xl transition-all"
            >
              <div className="flex items-center justify-between text-emerald-300 mb-1.5 sm:mb-2">
                <Layers className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-emerald-100/70">Methodology</span>
              </div>
              <p className="text-xl sm:text-3xl font-extrabold font-display text-white">Class 5</p>
              <p className="text-[11px] sm:text-xs text-emerald-100/80 mt-0.5 sm:mt-1">Cost accuracy & simulation</p>
            </motion.div>
          </motion.div>

        </div>
      </section>

      {/* About & Mission Section */}
      <section id="about" className={`py-24 ${currentTheme.sectionAlt} transition-colors`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-7 space-y-6">
              <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wider border ${currentTheme.badge}`}>
                Executive Overview
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-display tracking-tight text-slate-900 leading-tight">
                Empowering Governments, Utilities, & Industries with Real Numbers, Not Assumptions
              </h2>
              <p className="text-slate-600 text-base leading-relaxed">
                Hermit Sustainability is a Zimbabwean-owned renewable energy and sustainability consultancy. 
                We bridge the gap between renewable energy innovation and practical, bankable project execution.
              </p>
              <p className="text-slate-600 text-base leading-relaxed">
                Every recommendation is grounded in rigorous technical and financial modelling, whether that is an 
                <strong className={`font-semibold ${currentTheme.accentText}`}> hourly PVsyst simulation </strong> 
                of a floating solar array or a <strong className={`font-semibold ${currentTheme.accentSecondary}`}>first-principles hydraulic model </strong> 
                of an existing hydro plant, so clients and their financiers make decisive capital commitments.
              </p>

              {/* Four Core Values (Page 3) */}
              <div className="grid sm:grid-cols-2 gap-4 pt-4">
                <div className={`p-4 rounded-xl ${currentTheme.cardInner} transition-all`}>
                  <div className={`flex items-center gap-2 font-bold text-sm ${currentTheme.accentText}`}>
                    <CheckCircle2 className="w-4 h-4" /> Sustainability
                  </div>
                  <p className="text-xs text-slate-500 mt-1">Solutions designed to endure environmentally, operationally, and financially.</p>
                </div>

                <div className={`p-4 rounded-xl ${currentTheme.cardInner} transition-all`}>
                  <div className={`flex items-center gap-2 font-bold text-sm ${currentTheme.accentSecondary}`}>
                    <CheckCircle2 className="w-4 h-4" /> Innovation
                  </div>
                  <p className="text-xs text-slate-500 mt-1">Applying proven technology in breakthrough combinations, like hydro-solar hybridisation.</p>
                </div>

                <div className={`p-4 rounded-xl ${currentTheme.cardInner} transition-all`}>
                  <div className={`flex items-center gap-2 font-bold text-sm ${currentTheme.accentText}`}>
                    <CheckCircle2 className="w-4 h-4" /> Integrity
                  </div>
                  <p className="text-xs text-slate-500 mt-1">Defensible findings, Class 5 costing, and bankable metrics investors rely upon.</p>
                </div>

                <div className={`p-4 rounded-xl ${currentTheme.cardInner} transition-all`}>
                  <div className={`flex items-center gap-2 font-bold text-sm ${currentTheme.accentSecondary}`}>
                    <CheckCircle2 className="w-4 h-4" /> Carbon Stewardship
                  </div>
                  <p className="text-xs text-slate-500 mt-1">Projects that measurably cut emissions and advance African climate commitments.</p>
                </div>
              </div>
            </div>

            {/* Strategic Pillars Callout: Mission & Vision */}
            <div className="lg:col-span-5 space-y-6">
              {/* Mission Card (Above Vision) */}
              <div className="p-8 sm:p-10 rounded-3xl bg-white text-slate-900 border border-slate-200 shadow-xl relative overflow-hidden hover:border-emerald-400 transition-all">
                <div className="absolute top-0 right-0 w-52 h-52 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />

                <span className="text-xs font-bold text-amber-500 uppercase tracking-widest">Our Mission</span>
                <h3 className="mt-2 text-xl sm:text-2xl font-bold font-display text-slate-900">
                  Sustainable Technologies & Bankable Execution
                </h3>
                <p className="mt-4 text-sm text-slate-600 leading-relaxed">
                  Our mission is to empower governments, utilities, and industries with sustainable technologies and strategies that drive energy security, environmental stewardship, and economic resilience.
                </p>
              </div>

              {/* Vision Card */}
              <div className="p-8 sm:p-10 rounded-3xl bg-white text-slate-900 border border-slate-200 shadow-xl relative overflow-hidden hover:border-emerald-400 transition-all">
                <div className="absolute top-0 right-0 w-52 h-52 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />

                <span className="text-xs font-bold text-emerald-600 uppercase tracking-widest">Our Vision</span>
                <h3 className="mt-2 text-xl sm:text-2xl font-bold font-display text-slate-900">
                  Africa’s Leading Catalyst for Renewable Innovation
                </h3>
                <p className="mt-4 text-sm text-slate-600 leading-relaxed">
                  Driving sustainable power systems that empower communities, enhance sovereign energy security, and protect the African environment for future generations.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* The Quad Nexus Section (Pages 2, 4, 5) */}
      <section id="nexus" className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <span className={`text-xs font-bold uppercase tracking-wider ${currentTheme.accentText}`}>
            Framework For Impact
          </span>
          <h2 className="mt-2 text-3xl sm:text-4xl font-extrabold font-display tracking-tight text-slate-900">
            The Quad Nexus Framework
          </h2>
          <p className="mt-4 text-slate-300 text-base">
            Hermit’s specialized advisory addresses the interconnected challenges of Energy, Water, Food, and Waste to Energy through comprehensive lifecycle delivery.
          </p>

          {/* Interactive Quad Nexus Navigation Pills */}
          <div className={`mt-8 grid grid-cols-2 sm:grid-cols-4 gap-2 p-1.5 rounded-2xl ${currentTheme.cardInner} transition-all`}>
            <button
              onClick={() => setActiveNexusTab('energy')}
              className={`flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                activeNexusTab === 'energy' 
                  ? `${currentTheme.pillActive} shadow-sm font-extrabold` 
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Zap className="w-4 h-4" /> Energy
            </button>

            <button
              onClick={() => setActiveNexusTab('water')}
              className={`flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                activeNexusTab === 'water' 
                  ? `${currentTheme.pillActive} shadow-sm font-extrabold` 
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Droplets className="w-4 h-4" /> Water
            </button>

            <button
              onClick={() => setActiveNexusTab('food')}
              className={`flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                activeNexusTab === 'food' 
                  ? `${currentTheme.pillActive} shadow-sm font-extrabold` 
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Leaf className="w-4 h-4" /> Food
            </button>

            <button
              onClick={() => setActiveNexusTab('waste')}
              className={`flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                activeNexusTab === 'waste' 
                  ? `${currentTheme.pillActive} shadow-sm font-extrabold` 
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Flame className="w-4 h-4" /> Waste to Energy
            </button>
          </div>
        </div>

        {/* Selected Nexus Pillar Deep Dive */}
        <div className={`mt-12 rounded-3xl p-8 sm:p-12 shadow-xl ${currentTheme.cardBg} transition-all`}>
          <div className="grid lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-7">
              <span className={`px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider border ${currentTheme.badge}`}>
                {quadNexus[activeNexusTab].tag}
              </span>
              <h3 className="mt-4 text-2xl sm:text-3xl font-extrabold font-display text-slate-900">
                {quadNexus[activeNexusTab].title}
              </h3>
              <p className={`mt-1 text-sm font-semibold ${currentTheme.accentText}`}>
                {quadNexus[activeNexusTab].subtitle}
              </p>
              <p className="mt-4 text-slate-600 text-base leading-relaxed">
                {quadNexus[activeNexusTab].description}
              </p>

              <div className="mt-8 space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">What We Deliver In Practice:</h4>
                {quadNexus[activeNexusTab].deliverables.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <Check className={`w-5 h-5 shrink-0 mt-0.5 ${currentTheme.accentText}`} />
                    <span className="text-sm font-medium text-slate-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className={`lg:col-span-5 p-6 sm:p-8 rounded-2xl ${currentTheme.cardInner} transition-all`}>
              <h4 className="font-bold text-base text-slate-900">End-to-End Advisory Scope</h4>
              <p className="text-xs text-slate-500 mt-1">
                Supporting institutional off-takers from pre-feasibility to commercial commissioning.
              </p>

              <div className="mt-6 space-y-4">
                <div className={`p-3.5 rounded-xl ${currentTheme.cardBg}`}>
                  <p className="text-xs font-bold text-slate-900">Technical & Financial Studies</p>
                  <p className="text-[11px] text-slate-400 mt-0.5">Pre-feasibility & feasibility benchmarked to Class 5 cost accuracy.</p>
                </div>
                <div className={`p-3.5 rounded-xl ${currentTheme.cardBg}`}>
                  <p className="text-xs font-bold text-slate-900">Grid Integration Studies</p>
                  <p className="text-[11px] text-slate-400 mt-0.5">Interconnection design, power factor, and protection coordination.</p>
                </div>
                <div className={`p-3.5 rounded-xl ${currentTheme.cardBg}`}>
                  <p className="text-xs font-bold text-slate-900">Project Structuring & SPV</p>
                  <p className="text-[11px] text-slate-400 mt-0.5">Special purpose vehicle creation, ownership models & tender documentation.</p>
                </div>
              </div>

              <a
                href="#contact"
                className={`mt-6 block w-full py-3 text-center text-xs font-bold rounded-xl uppercase tracking-wider transition-all ${currentTheme.primaryBtn}`}
              >
                Inquire For This Sector
              </a>
            </div>

          </div>
        </div>
      </section>

      {/* Hydro-Solar Hybrid Case Study & Interactive Calculator */}
      <section id="hybrid" className={`py-24 ${currentTheme.sectionAlt} text-slate-900 relative overflow-hidden transition-colors`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Header Row: Heading on the left, floating solar picture component on the right */}
          <div className="grid lg:grid-cols-12 gap-8 items-center mb-14">
            <div className="lg:col-span-7">
              <span className="text-emerald-400 text-xs font-bold uppercase tracking-wider">
                Flagship Technical Practice
              </span>
              <h2 className="mt-2 text-3xl sm:text-5xl font-extrabold font-display">
                Floating Solar & Hydro-Hybridisation
              </h2>
              <p className="mt-4 text-slate-600 text-base leading-relaxed">
                Our floating solar practice hybridises megawatt-scale PV arrays with existing hydro plants, sharing one grid connection to dramatically lift a site's combined output without requiring costly transmission line reinforcement.
              </p>
            </div>

            {/* Picture component covering the upper right area */}
            <div className="lg:col-span-5">
              <div className="relative rounded-2xl overflow-hidden border border-slate-200 shadow-2xl group">
                <img
                  src={floatingSolarHybridImg}
                  alt="Floating Solar Array on Hydropower Dam Reservoir"
                  className="w-full h-52 sm:h-64 object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#070d14]/90 via-[#070d14]/20 to-transparent" />
                <div className="absolute bottom-3 right-3 text-xs">
                  <span className="text-[10px] text-slate-300 bg-slate-900/90 backdrop-blur-md px-2.5 py-1 rounded-md border border-slate-200 font-medium">
                    Floating PV Hybrid
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-12 gap-10 items-start">
            
            {/* Interactive Sizing Model */}
            <div className={`lg:col-span-7 p-8 rounded-3xl shadow-xl transition-all ${currentTheme.cardBg}`}>
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <h3 className="font-bold text-lg font-display text-slate-900">Hybrid Array Output Simulator</h3>
                <span className={`text-xs px-2.5 py-1 rounded font-semibold border ${currentTheme.badge}`}>
                  PVsyst V7.4.7 Calibrated
                </span>
              </div>

              <div className="mt-6 space-y-6">
                <div>
                  <div className="flex justify-between text-sm font-semibold mb-2">
                    <span className="text-slate-600">Floating Solar Capacity</span>
                    <span className={`font-bold ${currentTheme.accentText}`}>{solarCapacityMW} MWp</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="50"
                    step="0.5"
                    value={solarCapacityMW}
                    onChange={(e) => setSolarCapacityMW(parseFloat(e.target.value))}
                    className={`w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer ${currentTheme.sliderAccent}`}
                  />
                  <div className="flex justify-between text-[11px] text-slate-500 mt-1">
                    <span>1 MWp (Pilot Array)</span>
                    <span>5.4 MWp (Benchmark Case)</span>
                    <span>50 MWp (Utility Scale)</span>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-sm font-semibold mb-2">
                    <span className="text-slate-600">Existing Hydro Plant Capacity</span>
                    <span className={`font-bold ${currentTheme.accentSecondary}`}>{hydroCapacityMW} MW</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="100"
                    step="1"
                    value={hydroCapacityMW}
                    onChange={(e) => setHydroCapacityMW(parseFloat(e.target.value))}
                    className={`w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer ${currentTheme.sliderAccent}`}
                  />
                  <div className="flex justify-between text-[11px] text-slate-500 mt-1">
                    <span>1 MW (Mini-Hydro)</span>
                    <span>5 MW (Case Study)</span>
                    <span>100 MW (Reservoir Hydro)</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-slate-800 text-center">
                  <div className={`p-3 rounded-xl ${currentTheme.cardInner}`}>
                    <span className="text-[10px] text-slate-400 uppercase font-bold">Solar Generation</span>
                    <p className={`text-base sm:text-lg font-black mt-1 ${currentTheme.accentText}`}>{estimatedSolarMWh.toLocaleString()} MWh/yr</p>
                    <p className="text-[10px] text-slate-500">81.3% PR (PVsyst)</p>
                  </div>
                  <div className={`p-3 rounded-xl ${currentTheme.cardInner}`}>
                    <span className="text-[10px] text-slate-400 uppercase font-bold">Hydro Generation</span>
                    <p className={`text-base sm:text-lg font-black mt-1 ${currentTheme.accentSecondary}`}>{estimatedHydroMWh.toLocaleString()} MWh/yr</p>
                    <p className="text-[10px] text-slate-500">52.9% Capacity Factor</p>
                  </div>
                  <div className={`p-3 rounded-xl ${currentTheme.cardInner}`}>
                    <span className="text-[10px] text-slate-400 uppercase font-bold flex items-center justify-center gap-1">
                      <Droplets className="w-3 h-3 text-cyan-400" /> Water Saved
                    </span>
                    <p className="text-base sm:text-lg font-black text-cyan-400 mt-1">{(estimatedWaterSavedM3 / 1000).toFixed(0)}k m³/yr</p>
                    <p className="text-[10px] text-slate-500">Reduced Evaporation</p>
                  </div>
                  <div className={`p-3 rounded-xl ${currentTheme.cardInner} border border-emerald-500/40`}>
                    <span className={`text-[10px] uppercase font-bold ${currentTheme.accentText}`}>Hybrid Yield</span>
                    <p className="text-base sm:text-lg font-black text-slate-900 mt-1">{(totalHybridMWh / 1000).toFixed(1)} GWh/yr</p>
                    <p className={`text-[10px] ${currentTheme.accentText}`}>{blendedCapacityFactor}% Blended Factor</p>
                  </div>
                </div>

                {/* Direct Action: Connect Simulator to Advisory Inquiry */}
                <div className="pt-2">
                  <button
                    onClick={prefillWithCalculator}
                    className={`w-full py-3 px-4 rounded-xl text-xs font-bold uppercase tracking-wider ${currentTheme.primaryBtn} flex items-center justify-center gap-2 transition-all`}
                  >
                    <span>Request Pre-Feasibility Assessment for {solarCapacityMW} MWp Solar + {hydroCapacityMW} MW Hydro</span>
                    <ArrowDownRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* 8-Month Inception-to-Tender Workflow */}
            <div className="lg:col-span-5 space-y-4">
              <h3 className="font-bold text-xl font-display text-slate-900">8-Month Inception to EPC Tender</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Hermit structures five rigorous work packages ensuring seamless technical de-risking and bankable tender readiness.
              </p>

              <div className="space-y-3 pt-2">
                {[
                  { phase: "Inception & Scope", duration: "1 Month", detail: "Baseline review & stakeholder agreement" },
                  { phase: "Feasibility Study", duration: "3 Months", detail: "Hydraulic modeling & PVsyst solar yield" },
                  { phase: "Detailed Preliminary Design", duration: "3 Months", detail: "Grid impact & hybrid plant architecture" },
                  { phase: "Environmental & Social Screening", duration: "4 Months", detail: "ESIA scope, water body co-benefit analysis" },
                  { phase: "EPC Tender Documentation", duration: "3 Months", detail: "Class 5 cost accuracy & procurement package" }
                ].map((item, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-white border border-slate-200 flex items-center justify-between shadow-sm">
                    <div>
                      <p className="text-xs font-bold text-slate-900">{item.phase}</p>
                      <p className="text-[10px] text-slate-500">{item.detail}</p>
                    </div>
                    <span className="text-[11px] font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                      {item.duration}
                    </span>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* Project Portfolio Highlights (Page 7) */}
      <section id="portfolio" className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <span className="text-emerald-400 text-xs font-bold uppercase tracking-wider">
              Defensible Track Record
            </span>
            <h2 className="mt-2 text-3xl sm:text-4xl font-extrabold font-display tracking-tight text-slate-900">
              Project Portfolio Highlights
            </h2>
          </div>

          {/* Filter Pills */}
          <div className="mt-4 md:mt-0 flex flex-wrap gap-2">
            {[
              { id: 'all', label: 'All Projects' },
              { id: 'hybrid', label: 'Hydro-Solar Hybrid' },
              { id: 'floating', label: 'Floating Solar' },
              { id: 'solar', label: 'Solar PV' },
              { id: 'hydro', label: 'Hydropower' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setProjectFilter(tab.id)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  projectFilter === tab.id
                    ? 'bg-emerald-400 text-slate-950 shadow-sm'
                    : 'bg-[#0f1929] text-slate-300 hover:bg-slate-800 border border-slate-800'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Portfolio Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((p, idx) => (
            <div 
              key={idx}
              className="p-6 rounded-2xl bg-white border border-slate-200 hover:border-emerald-500/60 shadow-md hover:shadow-2xl hover:shadow-emerald-900/20 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-xs font-semibold mb-3">
                  <span className="px-2.5 py-1 rounded-md bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    {p.type}
                  </span>
                  <span className="text-slate-400 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-slate-500" /> {p.location}
                  </span>
                </div>

                <h3 className="text-xl font-bold font-display text-slate-900 mt-1">
                  {p.name}
                </h3>
                <p className="mt-3 text-sm text-slate-400 leading-relaxed">
                  {p.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-200 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-500 uppercase font-bold block">Capacity</span>
                  <span className="text-base font-extrabold text-emerald-400">{p.size}</span>
                </div>
                <button className="text-xs font-semibold text-slate-500 hover:text-emerald-600 flex items-center gap-1">
                  Factsheet <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Engagement Process (Page 3 & 7) */}
      <section id="process" className={`py-24 ${currentTheme.sectionAlt} transition-colors`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <span className={`text-xs font-bold uppercase tracking-wider ${currentTheme.accentText}`}>
              How We Work
            </span>
            <h2 className="mt-2 text-3xl sm:text-4xl font-extrabold font-display tracking-tight text-slate-900">
              Our Six-Stage Engagement Process
            </h2>
            <p className="mt-4 text-slate-300 text-base">
              Every advisory engagement, whatever its scale, follows this structured methodology to ensure financier-grade deliverables.
            </p>
          </div>

          <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {engagementStages.map((stage, idx) => (
              <div 
                key={idx}
                className={`p-6 rounded-2xl ${currentTheme.cardBg} relative overflow-hidden group transition-all`}
              >
                <div className={`text-3xl font-black text-emerald-900/60 group-hover:${currentTheme.accentText} transition-colors font-display`}>
                  {stage.step}
                </div>
                <h4 className="mt-2 text-lg font-bold font-display text-slate-900">
                  {stage.name}
                </h4>
                <p className="mt-2 text-sm text-slate-400 leading-relaxed">
                  {stage.desc}
                </p>
              </div>
            ))}
          </div>

          {/* 4 Ways to Work With Us (Page 7) */}
          <div className="mt-16 p-8 rounded-3xl bg-emerald-800 border border-emerald-700 shadow-xl">
            <h3 className="text-xl sm:text-2xl font-bold font-display text-white">Ways to Work With Hermit</h3>
            <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-4 gap-6 text-sm">
              <div className="bg-white p-5 rounded-2xl shadow-md border border-slate-100 hover:shadow-lg transition-all">
                <span className="font-bold text-slate-900 font-extrabold block mb-1">1. Pre-Feasibility Study</span>
                <p className="text-xs text-slate-600 font-medium">Stand-alone technical and financial pre-feasibility assessment.</p>
              </div>
              <div className="bg-white p-5 rounded-2xl shadow-md border border-slate-100 hover:shadow-lg transition-all">
                <span className="font-bold text-slate-900 font-extrabold block mb-1">2. Feasibility & Design</span>
                <p className="text-xs text-slate-600 font-medium">Detailed feasibility, grid impact, and preliminary engineering design.</p>
              </div>
              <div className="bg-white p-5 rounded-2xl shadow-md border border-slate-100 hover:shadow-lg transition-all">
                <span className="font-bold text-slate-900 font-extrabold block mb-1">3. Development Support</span>
                <p className="text-xs text-slate-600 font-medium">SPV structuring, funding strategy, and tender documentation.</p>
              </div>
              <div className="bg-white p-5 rounded-2xl shadow-md border border-slate-100 hover:shadow-lg transition-all">
                <span className="font-bold text-slate-900 font-extrabold block mb-1">4. Independent Review</span>
                <p className="text-xs text-slate-600 font-medium">Second opinion verification on someone else’s design or figures.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Strategic Partnerships (Page 9) */}
      <section id="partnerships" className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <span className="text-emerald-400 text-xs font-bold uppercase tracking-wider">
            Collaboration & Recognition
          </span>
          <h2 className="mt-2 text-3xl sm:text-4xl font-extrabold font-display tracking-tight text-slate-900">
            Strategic Partnerships & Advisory Roles
          </h2>
          <p className="mt-4 text-slate-300 text-base">
            Collaborating with leading regional utilities, multilateral development institutions, and sovereign authorities.
          </p>
        </div>

        {/* Featured Case: Bui Power Authority */}
        <div className="mt-12 p-8 sm:p-10 rounded-3xl bg-white border border-slate-200 shadow-xl">
          <div className="grid lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-600">
                International Landmark Mandate
              </span>
              <h3 className="mt-2 text-2xl font-bold font-display text-slate-900">
                Bui Power Authority (Ghana) Collaboration
              </h3>
              <p className="mt-3 text-slate-600 text-sm sm:text-base leading-relaxed">
                Strategic technical advisory addressing floating solar PV integration on the Bui Reservoir, pumped hydro storage feasibility for grid stability, and institutional rooftop solar PV for community resilience.
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                <span className="text-xs bg-slate-50 px-3 py-1 rounded-md font-semibold border border-slate-200 text-slate-300">
                  Floating Solar PV
                </span>
                <span className="text-xs bg-slate-50 px-3 py-1 rounded-md font-semibold border border-slate-200 text-slate-300">
                  Pumped Hydro Storage
                </span>
                <span className="text-xs bg-slate-50 px-3 py-1 rounded-md font-semibold border border-slate-200 text-slate-300">
                  Capacity Building
                </span>
              </div>
            </div>

            <div className="lg:col-span-4 bg-emerald-50 p-6 rounded-2xl border border-emerald-200 text-center">
              <span className="text-4xl font-black text-emerald-600 font-display">100%</span>
              <p className="text-xs font-bold text-slate-900 mt-1">Proven Regional Replicability</p>
              <p className="text-[11px] text-slate-500 mt-1">
                From Lake Kariba to Bui Reservoir, delivering scalable African hydro-solar solutions.
              </p>
            </div>
          </div>
        </div>

        {/* Partners Grid */}
        <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {partners.map((p, idx) => (
            <div key={idx} className="p-4 rounded-xl bg-white border border-slate-200 hover:border-emerald-600/50 flex items-center justify-between transition-all">
              <div>
                <p className="text-sm font-bold text-slate-900">{p.name}</p>
                <p className="text-xs text-slate-500">{p.role}</p>
              </div>
              <span className="text-[10px] uppercase font-bold text-slate-400 bg-slate-50 px-2 py-1 rounded border border-slate-800">
                {p.location}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Frequently Asked Questions (Page 9) */}
      <section id="faq" className={`py-20 ${currentTheme.sectionAlt} transition-colors`}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className={`text-xs font-bold uppercase tracking-wider ${currentTheme.accentText}`}>
              Answers & Due Diligence
            </span>
            <h2 className="mt-2 text-3xl font-extrabold font-display text-slate-900">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-4">
            <div className={`p-6 rounded-2xl ${currentTheme.cardBg} transition-all`}>
              <h4 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <HelpCircle className={`w-5 h-5 shrink-0 ${currentTheme.accentText}`} />
                Do you only work on utility-scale projects?
              </h4>
              <p className="mt-2 text-sm text-slate-300 leading-relaxed pl-7">
                No. Our work spans demonstration-led household and commercial products (such as the NSF-certified eSpring water purification rollout) through to utility-scale hydro-solar hybridisation, all viewed through the same Quad Nexus framework.
              </p>
            </div>

            <div className={`p-6 rounded-2xl ${currentTheme.cardBg} transition-all`}>
              <h4 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <HelpCircle className={`w-5 h-5 shrink-0 ${currentTheme.accentText}`} />
                What stage do you engage at?
              </h4>
              <p className="mt-2 text-sm text-slate-300 leading-relaxed pl-7">
                From initial inception and pre-feasibility, through detailed preliminary design, environmental and social screening (ESIA), to bankable EPC tender support and independent technical review.
              </p>
            </div>

            <div className={`p-6 rounded-2xl ${currentTheme.cardBg} transition-all`}>
              <h4 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <HelpCircle className={`w-5 h-5 shrink-0 ${currentTheme.accentText}`} />
                Is your advisory work independently verifiable?
              </h4>
              <p className="mt-2 text-sm text-slate-300 leading-relaxed pl-7">
                Yes. We utilize hourly PVsyst simulation, first-principles hydraulic modelling, Class 5 costing methodology, and NSF-certified product standards where applicable, ensuring every figure has an established, defensible basis.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact & Inquiry Section (Page 10) */}
      <section id="contact" className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-12">
          
          <div className="lg:col-span-5 space-y-6">
            <span className="text-emerald-400 text-xs font-bold uppercase tracking-wider">
              Harare Office & Operations
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-display tracking-tight text-slate-900 leading-tight">
              Connect With Our Advisory Team
            </h2>
            <p className="text-slate-600 text-base leading-relaxed">
              Advancing sustainable power solutions across Africa. Reach out to request a feasibility assessment, explore hydro-solar hybridisation, or discuss project development support.
            </p>

            <div className="space-y-4 pt-4">
              <div className="flex items-start gap-3.5">
                <div className="p-2.5 rounded-xl bg-emerald-100 text-emerald-600 border border-emerald-200">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs uppercase font-bold text-slate-500">Physical Address</p>
                  <p className="text-sm font-semibold text-slate-900">30 Tunsgate, Mt Pleasant, Harare, Zimbabwe</p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="p-2.5 rounded-xl bg-emerald-100 text-emerald-600 border border-emerald-200">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs uppercase font-bold text-slate-500">Direct Telephone</p>
                  <p className="text-sm font-semibold text-slate-900">+263 71 280 0220</p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="p-2.5 rounded-xl bg-emerald-100 text-emerald-600 border border-emerald-200">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs uppercase font-bold text-slate-500">Corporate Enquiries</p>
                  <p className="text-sm font-semibold text-slate-900">info@hermitsustainability.co.zw</p>
                  <p className="text-xs text-slate-500">hermitinfopack@gmail.com</p>
                </div>
              </div>
            </div>

            {/* "Before You Get in Touch" Callout (Page 10) */}
            <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-200">
              <p className="text-xs font-bold uppercase tracking-wider text-emerald-700 mb-2">
                Before You Get In Touch (Feasibility Checklist)
              </p>
              <ul className="text-xs text-slate-700 space-y-1.5 list-disc pl-4">
                <li>Site location, existing infrastructure, and grid connection details</li>
                <li>Target off-takers or intended use of generated power</li>
                <li>Any prior studies, resource data, or drawings already available</li>
              </ul>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-7 bg-white p-8 sm:p-10 rounded-3xl border border-slate-200 shadow-xl">
            <h3 className="text-xl font-bold font-display text-slate-900 mb-2">
              Request Advisory Briefing or Proposal
            </h3>
            <p className="text-xs text-slate-500 mb-6">
              Our engineering and financial team typically responds within 24 business hours.
            </p>

            {formStatus === 'success' && (
              <div className="mb-6 p-5 rounded-2xl bg-emerald-50 border border-emerald-300 text-emerald-800">
                <div className="flex items-start space-x-3">
                  <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm mb-1">Advisory Briefing Dispatched</h4>
                    <p className="text-xs text-emerald-700 leading-relaxed mb-3">{formFeedback}</p>
                    <button
                      type="button"
                      onClick={() => setFormStatus('idle')}
                      className="text-xs text-amber-300 underline font-semibold hover:text-amber-200"
                    >
                      Submit another project request &rarr;
                    </button>
                  </div>
                </div>
              </div>
            )}

            {formStatus === 'error' && (
              <div className="mb-6 p-5 rounded-2xl bg-rose-950/70 border border-rose-500/50 text-rose-200">
                <div className="flex items-start space-x-3">
                  <div className="text-rose-400 font-bold shrink-0 mt-0.5">⚠️</div>
                  <div className="w-full">
                    <h4 className="font-bold text-slate-900 text-sm mb-1">Notice</h4>
                    <p className="text-xs text-rose-200/90 leading-relaxed mb-3">{formFeedback}</p>
                    <a
                      href={`mailto:info@hermitsustainability.co.zw?cc=hermitinfopack@gmail.com&subject=${encodeURIComponent(`Advisory Request - ${contactName || 'Project Sponsor'}`)}&body=${encodeURIComponent(`Name: ${contactName}\nEmail: ${contactEmail}\nSector: ${contactSector}\nPackage: ${contactPackage}\n\nProject Scope:\n${inquiryScope}`)}`}
                      className="inline-flex items-center px-4 py-2 bg-rose-600 hover:bg-rose-500 text-white rounded-lg text-xs font-semibold shadow transition-colors"
                    >
                      Send Directly via Email Client &rarr;
                    </a>
                  </div>
                </div>
              </div>
            )}

            <form onSubmit={handleContactSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Contact Name</label>
                  <input 
                    type="text" 
                    required 
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    placeholder="E.g. Tendai Moyo" 
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-white text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all" 
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Email Address</label>
                  <input 
                    type="email" 
                    required 
                    value={contactEmail}
                    onChange={(e) => setContactEmail(e.target.value)}
                    placeholder="tendai@organization.com" 
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-white text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all" 
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Client Sector</label>
                  <select 
                    value={contactSector}
                    onChange={(e) => setContactSector(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-white text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all"
                  >
                    <option>Power Utility / IPP</option>
                    <option>Government / Ministry</option>
                    <option>Mining & Heavy Industry</option>
                    <option>Commercial Agriculture & Food</option>
                    <option>Institutional Pension Fund / DFI</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Advisory Package</label>
                  <select 
                    value={contactPackage}
                    onChange={(e) => setContactPackage(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-white text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all"
                  >
                    <option>Pre-Feasibility Study</option>
                    <option>Floating Solar / Hydro-Hybrid Study</option>
                    <option>Detailed Feasibility & Grid Impact</option>
                    <option>SPV & EPC Tender Documentation</option>
                    <option>Independent Design Review</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Project Details / Scope</label>
                <textarea 
                  rows={4} 
                  required
                  value={inquiryScope}
                  onChange={(e) => setInquiryScope(e.target.value)}
                  placeholder="Share details regarding site location, capacity target (MW), grid interconnect, or specific objectives..."
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-white text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all" 
                />
              </div>

              <button
                type="submit"
                disabled={formStatus === 'submitting'}
                className={`w-full py-3.5 text-sm font-bold text-slate-950 ${currentTheme.primaryBtn} disabled:opacity-60 disabled:cursor-not-allowed rounded-xl shadow-lg transition-all uppercase tracking-wider font-display flex items-center justify-center space-x-2`}
              >
                {formStatus === 'submitting' ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-slate-950" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Transmitting to Hermit Advisory...</span>
                  </>
                ) : (
                  <span>Submit Advisory Request</span>
                )}
              </button>
            </form>
          </div>

        </div>
      </section>

      {/* Footer (Page 1 & 10) */}
      <footer className="bg-slate-900 text-slate-400 py-14 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-slate-200">
            <div className="flex items-center space-x-3">
              <img
                src={logoImg}
                alt="Hermit Sustainability Advisory"
                className="w-9 h-9 rounded-xl object-cover object-center"
              />
              <div>
                <span className="text-xl font-extrabold font-display text-white tracking-tight">HERMIT</span>
                <span className="block text-[9px] uppercase tracking-widest text-emerald-400 font-bold">Sustainability Advisory</span>
              </div>
            </div>
            <div className="flex flex-wrap gap-6 text-sm font-semibold">
              <a href="#about" className="hover:text-white transition-colors">About</a>
              <a href="#nexus" className="hover:text-white transition-colors">Quad Nexus</a>
              <a href="#hybrid" className="hover:text-white transition-colors">Hydro-Solar Hybrid</a>
              <a href="#portfolio" className="hover:text-white transition-colors">Portfolio</a>
              <a href="#process" className="hover:text-white transition-colors">Process</a>
              <a href="#contact" className="hover:text-white transition-colors">Contact</a>
            </div>
          </div>

          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
            <p>© {new Date().getFullYear()} Hermit Sustainability Advisory. Zimbabwean-Owned • Africa-Facing.</p>
            <p className="text-slate-400">30 Tunsgate, Mt Pleasant, Harare, Zimbabwe</p>
            <div className="flex space-x-4">
              <a href="http://www.hermitsustainability.co.zw" target="_blank" rel="noreferrer" className="text-emerald-400 hover:underline">
                www.hermitsustainability.co.zw
              </a>
            </div>
          </div>
        </div>
      </footer>
      </div>
    </div>
  );
}
