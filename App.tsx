
import React, { useState, useEffect } from 'react';
import { 
  Scissors, 
  Clock, 
  MapPin, 
  Phone, 
  Instagram, 
  Facebook, 
  Star, 
  ChevronRight, 
  Camera,
  Loader2,
  Calendar,
  CheckCircle2,
  Info,
  ExternalLink
} from 'lucide-react';
import { Service, Testimonial, HairstyleSuggestion } from './types';
import { getHairstyleRecommendations } from './services/geminiService';

// Reusable Components
const SectionTitle: React.FC<{ title: string; subtitle?: string; light?: boolean }> = ({ title, subtitle, light }) => (
  <div className="text-center mb-12">
    <h2 className={`text-3xl md:text-4xl font-black font-serif uppercase tracking-tight ${light ? 'text-white' : 'text-gray-900'}`}>
      {title}
    </h2>
    {subtitle && <p className={`mt-2 text-lg ${light ? 'text-gray-400' : 'text-gray-600'}`}>{subtitle}</p>}
    <div className="w-24 h-1 gold-gradient mx-auto mt-4 rounded-full"></div>
  </div>
);

const App: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);
  const [description, setDescription] = useState('');
  const [suggestions, setSuggestions] = useState<HairstyleSuggestion[]>([]);
  const [showBooking, setShowBooking] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleAiConsultant = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!description.trim()) return;
    
    setAiLoading(true);
    try {
      const results = await getHairstyleRecommendations(description);
      setSuggestions(results);
    } finally {
      setAiLoading(false);
    }
  };

  const services: Service[] = [
    { id: '1', name: 'Legends Skin Fade', description: 'Precision fade with high-end tools and hot towel finish.', price: '$50', duration: '45 min', category: 'Cut' },
    { id: '2', name: 'Beard Sculpting', description: 'Expert shaping and lining with straight razor finish.', price: '$35', duration: '30 min', category: 'Shave' },
    { id: '3', name: 'The Pro Executive', description: 'Full haircut, beard trim, and signature scalp treatment.', price: '$95', duration: '90 min', category: 'Treatments' },
    { id: '4', name: 'Classic Gentlemen\'s Cut', description: 'Traditional scissor or clipper work for a timeless look.', price: '$45', duration: '40 min', category: 'Cut' },
  ];

  const galleryItems = [
    { title: "Precision Fade", desc: "Clean transition and sharp lines", img: "https://images.unsplash.com/photo-1621605815841-aa88c82b0288?auto=format&fit=crop&q=80&w=800" },
    { title: "The Modern Mullet", desc: "Textured flow with a sharp taper", img: "https://images.unsplash.com/photo-1593702288070-2a4b9d70c678?auto=format&fit=crop&q=80&w=800" },
    { title: "Premium Products", desc: "Our curated range of Gio styling hair wax", img: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&q=80&w=800" },
    { title: "Luxury Seating", desc: "Premium gold-accented leather chairs", img: "https://images.unsplash.com/photo-1585747860715-2ba37e788b70?auto=format&fit=crop&q=80&w=800" },
    { title: "Beard Perfection", desc: "Sharp lining and expert grooming", img: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&q=80&w=800" },
    { title: "Hexagon Lighting", desc: "Our signature modern industrial vibe", img: "https://images.unsplash.com/photo-1634449571010-02389ed0f9b0?auto=format&fit=crop&q=80&w=800" },
  ];

  const testimonials: Testimonial[] = [
    { id: '1', author: 'Mark T.', rating: 5, content: 'Finally a barber that understands a proper skin fade. The Big Bear location is top-notch.', date: '3 days ago' },
    { id: '2', author: 'Sion P.', rating: 5, content: 'Best atmosphere in Neutral Bay. Those hexagonal lights and live-edge wood benches are a vibe.', date: '1 week ago' },
    { id: '3', author: 'Chris G.', rating: 5, content: 'Legends Pro is where it\'s at. Sharpest cut I\'ve had in Sydney.', date: '2 weeks ago' },
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'dark-glass py-3 shadow-2xl border-b border-white/5' : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 gold-gradient rounded-lg flex items-center justify-center shadow-lg">
              <Scissors className="text-black" size={24} />
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-black font-serif tracking-tighter text-white uppercase italic leading-none">
                Legends <span className="text-[#D4AF37]">Pro</span>
              </span>
              <span className="text-[10px] text-gray-500 font-bold tracking-[0.2em] uppercase leading-none mt-1">Neutral Bay</span>
            </div>
          </div>
          
          <div className="hidden lg:flex items-center gap-8 text-sm font-bold uppercase tracking-widest">
            <a href="#services" className="text-white/70 hover:text-[#D4AF37] transition-colors">Services</a>
            <a href="#ai-stylist" className="text-white/70 hover:text-[#D4AF37] transition-colors">AI Stylist</a>
            <a href="#shop" className="text-white/70 hover:text-[#D4AF37] transition-colors">The Shop</a>
            <a href="#gallery" className="text-white/70 hover:text-[#D4AF37] transition-colors">Gallery</a>
            <button 
              onClick={() => setShowBooking(true)}
              className="px-6 py-2 gold-gradient text-black rounded-full hover:scale-105 transition-transform active:scale-95 shadow-lg font-black"
            >
              Book Now
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1585747860715-2ba37e788b70?auto=format&fit=crop&q=80&w=2000" 
            className="w-full h-full object-cover opacity-30 grayscale-[0.5] contrast-125"
            alt="Legends Pro Interior"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/60 to-transparent"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full mt-10">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 bg-white/5 backdrop-blur-md rounded-full border border-white/10 animate-fade-in">
              <div className="w-2 h-2 bg-[#D4AF37] rounded-full animate-pulse"></div>
              <span className="text-[#D4AF37] font-bold tracking-widest text-xs uppercase">
                Premier Barbershop in Big Bear Shopping Centre
              </span>
            </div>
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-black font-serif text-white mb-6 leading-[0.9] uppercase italic tracking-tighter">
              Legends <br />
              <span className="text-transparent bg-clip-text gold-gradient relative">
                Pro Barbers
              </span>
            </h1>
            <p className="text-xl text-gray-400 mb-10 max-w-xl leading-relaxed font-medium">
              Elevating the standard of grooming in <b>Neutral Bay</b>. Our master barbers specialize in high-precision fades, traditional razor shaves, and executive treatments.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 items-start">
              <button 
                onClick={() => setShowBooking(true)}
                className="px-12 py-5 gold-gradient text-black font-black text-xl uppercase rounded-2xl hover:shadow-[0_0_50px_rgba(212,175,55,0.4)] transition-all flex items-center justify-center gap-2 group"
              >
                Secure Your Chair <ChevronRight className="group-hover:translate-x-1 transition-transform" />
              </button>
              <div className="flex flex-col border-l-2 border-[#D4AF37] pl-6 py-1">
                <div className="flex items-center gap-2 text-white font-black uppercase tracking-widest text-lg">
                   (02) 8526 4508
                </div>
                <div className="text-[#D4AF37] text-xs font-bold uppercase tracking-[0.2em] mt-1 flex items-center gap-1">
                  <MapPin size={12} /> Neutral Bay • Shop 7/116 Military Rd
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 bg-white text-gray-900 rounded-t-[4rem] -mt-16 relative z-20 shadow-[0_-20px_50px_rgba(0,0,0,0.5)]">
        <div className="max-w-7xl mx-auto px-6">
          <SectionTitle 
            title="Premium Treatments" 
            subtitle="Discover the gold standard of grooming in the Neutral Bay area."
          />
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service) => (
              <div key={service.id} className="group p-10 border-2 border-gray-50 rounded-[2.5rem] hover:border-[#D4AF37] transition-all hover:bg-gray-50/50 cursor-default relative overflow-hidden">
                <div className="flex justify-between items-start mb-6">
                  <div className="w-14 h-14 bg-gray-100 rounded-2xl flex items-center justify-center group-hover:bg-[#D4AF37] transition-all duration-500 group-hover:rotate-6">
                    {service.category === 'Cut' && <Scissors className="text-[#D4AF37] group-hover:text-black" size={28} />}
                    {service.category === 'Shave' && <Clock className="text-[#D4AF37] group-hover:text-black" size={28} />}
                    {service.category === 'Treatments' && <Star className="text-[#D4AF37] group-hover:text-black" size={28} />}
                  </div>
                  <span className="text-3xl font-black text-[#D4AF37] tracking-tighter">{service.price}</span>
                </div>
                <h3 className="text-2xl font-bold mb-3 group-hover:text-[#D4AF37] transition-colors">{service.name}</h3>
                <p className="text-gray-500 mb-6 text-sm leading-relaxed">{service.description}</p>
                <div className="flex items-center gap-2 text-xs font-black text-gray-400 uppercase tracking-[0.2em]">
                  <Clock size={16} /> {service.duration}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-20 text-center">
            <p className="text-gray-400 font-bold mb-6 uppercase tracking-widest text-sm">Prices starting from $45 for classic cuts</p>
            <button 
              onClick={() => setShowBooking(true)}
              className="inline-flex items-center gap-3 px-10 py-4 border-2 border-gray-900 text-gray-900 font-black rounded-2xl hover:bg-gray-900 hover:text-white transition-all uppercase tracking-widest"
            >
              Full Price List <ExternalLink size={18} />
            </button>
          </div>
        </div>
      </section>

      {/* The Shop / Experience Section */}
      <section id="shop" className="py-24 bg-gray-50">
         <div className="max-w-7xl mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="relative">
                <div className="aspect-[4/3] rounded-[3rem] overflow-hidden shadow-2xl relative z-10">
                   <img 
                    src="https://images.unsplash.com/photo-1512690196262-77054f0588b6?auto=format&fit=crop&q=80&w=1200" 
                    className="w-full h-full object-cover" 
                    alt="Legends Pro Interior Shot" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-8 left-8">
                     <div className="text-white font-serif italic text-2xl">"The cleanest vibe in Sydney."</div>
                  </div>
                </div>
                <div className="absolute -bottom-6 -right-6 w-1/2 aspect-square rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white z-20 hidden md:block">
                  <img 
                    src="https://images.unsplash.com/photo-1599351431202-1e0f0137899a?auto=format&fit=crop&q=80&w=600" 
                    className="w-full h-full object-cover" 
                    alt="Detailing" 
                  />
                </div>
                <div className="absolute -top-10 -left-10 w-40 h-40 gold-gradient rounded-full blur-[80px] opacity-20"></div>
              </div>

              <div>
                <span className="text-[#D4AF37] font-black uppercase tracking-[0.3em] text-sm block mb-4">Our Environment</span>
                <h2 className="text-5xl font-black font-serif text-gray-900 mb-8 uppercase italic leading-tight">
                  Modern Industrial <br />
                  <span className="text-[#D4AF37]">Luxury</span>
                </h2>
                <div className="space-y-6 text-gray-600 text-lg leading-relaxed">
                  <p>
                    Step into our <b>Neutral Bay</b> studio and experience a space designed for the ultimate grooming experience. From our signature <b>hexagonal lighting</b> to our <b>live-edge wood</b> stations and premium gold-accented leather chairs.
                  </p>
                  <p>
                    Located conveniently within <b>Big Bear Shopping Centre</b>, we offer a relaxed yet high-energy atmosphere where precision is the only priority.
                  </p>
                  <div className="grid grid-cols-2 gap-6 pt-6">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#D4AF37]/10 flex items-center justify-center shrink-0">
                        <Star className="text-[#D4AF37]" size={16} />
                      </div>
                      <span className="text-sm font-bold uppercase tracking-widest text-gray-900">Pro Master Barbers</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#D4AF37]/10 flex items-center justify-center shrink-0">
                        <Star className="text-[#D4AF37]" size={16} />
                      </div>
                      <span className="text-sm font-bold uppercase tracking-widest text-gray-900">Gio Styling Products</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
         </div>
      </section>

      {/* AI Hairstyle Consultant */}
      <section id="ai-stylist" className="py-24 bg-[#121212]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="bg-[#1a1a1a] rounded-[4rem] overflow-hidden border border-white/5 shadow-[0_50px_100px_rgba(0,0,0,0.8)]">
            <div className="grid lg:grid-cols-2">
              <div className="p-12 lg:p-24">
                <div className="flex items-center gap-3 mb-8">
                  <span className="px-4 py-1 bg-[#D4AF37]/10 text-[#D4AF37] text-xs font-black rounded-full border border-[#D4AF37]/20 uppercase tracking-[0.3em]">
                    The Style Oracle
                  </span>
                </div>
                <h2 className="text-5xl md:text-6xl font-black font-serif text-white mb-8 uppercase italic leading-[0.9]">
                  Find Your <br />
                  <span className="text-[#D4AF37]">Signature Look</span>
                </h2>
                <p className="text-gray-400 mb-12 text-lg leading-relaxed">
                  Can't decide on your next cut? Our AI Master Barber analyzes face shapes and trends to recommend 3 legendary styles tailored to you.
                </p>

                <form onSubmit={handleAiConsultant} className="space-y-6">
                  <div className="relative group">
                    <textarea 
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="e.g., 'Skin fade with a textured crop, something low maintenance for a busy office life...'"
                      className="w-full bg-black/40 border-2 border-white/5 rounded-[2rem] p-8 text-white focus:outline-none focus:border-[#D4AF37] transition-all min-h-[200px] resize-none text-lg placeholder:text-gray-700"
                    />
                    <div className="absolute bottom-6 right-6 flex items-center gap-3">
                       <button 
                        type="button"
                        className="p-4 bg-white/5 rounded-2xl hover:bg-white/10 transition-all text-gray-500 hover:text-[#D4AF37] border border-white/5"
                        title="Upload photo"
                      >
                        <Camera size={24} />
                      </button>
                    </div>
                  </div>
                  <button 
                    disabled={aiLoading || !description}
                    className="w-full py-6 gold-gradient text-black font-black text-xl uppercase rounded-[2rem] flex items-center justify-center gap-3 disabled:opacity-30 disabled:grayscale hover:scale-[1.02] transition-all shadow-[0_20px_40px_rgba(212,175,55,0.2)]"
                  >
                    {aiLoading ? <Loader2 className="animate-spin" size={24} /> : 'Analyze My Style'}
                  </button>
                </form>
              </div>

              <div className="bg-black/60 p-12 lg:p-24 flex flex-col justify-center border-l border-white/5 relative">
                <div className="absolute top-0 right-0 w-64 h-64 gold-gradient rounded-full blur-[120px] opacity-10"></div>
                {suggestions.length > 0 ? (
                  <div className="space-y-10 animate-in fade-in slide-in-from-right-10 duration-700 relative z-10">
                    <div className="flex items-center gap-4 mb-4">
                       <div className="h-px flex-1 bg-white/10"></div>
                       <h4 className="text-[#D4AF37] font-black uppercase tracking-[0.4em] text-xs">
                         AI Recommendations
                       </h4>
                       <div className="h-px flex-1 bg-white/10"></div>
                    </div>
                    {suggestions.map((s, idx) => (
                      <div key={idx} className="group p-6 rounded-3xl hover:bg-white/5 transition-all border border-transparent hover:border-white/5">
                        <div className="flex items-center justify-between mb-4">
                          <h5 className="text-2xl font-black text-white group-hover:text-[#D4AF37] transition-colors uppercase italic">{s.name}</h5>
                          <span className="text-[10px] bg-white/10 text-white/70 px-3 py-1.5 rounded-full uppercase font-black tracking-widest border border-white/5">
                            {s.maintenanceLevel} Maintenance
                          </span>
                        </div>
                        <p className="text-gray-500 text-base leading-relaxed mb-4">
                          {s.description}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {s.suitableFaceShapes.map((shape, i) => (
                            <span key={i} className="text-[10px] text-[#D4AF37] border border-[#D4AF37]/20 px-3 py-1 rounded-full uppercase font-black tracking-widest bg-[#D4AF37]/5">
                              {shape}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-20 opacity-40">
                    <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-8 border border-white/5">
                      <Scissors className="text-gray-600" size={40} />
                    </div>
                    <p className="text-gray-400 font-serif italic text-2xl mb-2">
                      "Style is a way to say who you are <br /> without having to speak."
                    </p>
                    <p className="text-[#D4AF37] font-black uppercase tracking-[0.3em] text-xs">
                      Awaiting your input...
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="py-24 bg-white text-gray-900">
        <div className="max-w-7xl mx-auto px-6">
          <SectionTitle 
            title="The Portfolio" 
            subtitle="Explore our latest work from the Neutral Bay studio."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {galleryItems.map((item, i) => (
              <div key={i} className="group relative rounded-[3rem] overflow-hidden shadow-xl aspect-[4/5] cursor-pointer">
                <img 
                  src={item.img}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 p-10 flex flex-col justify-end">
                   <h4 className="text-white text-2xl font-black uppercase italic mb-2 tracking-tighter">{item.title}</h4>
                   <p className="text-gray-400 text-sm font-medium mb-6">{item.desc}</p>
                   <div className="flex items-center gap-3 text-[#D4AF37] font-black uppercase tracking-widest text-xs">
                      View details <ChevronRight size={14} />
                   </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-32 bg-[#0a0a0a] relative overflow-hidden">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] gold-gradient rounded-full blur-[150px] opacity-10"></div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <SectionTitle 
            title="Client Legends" 
            subtitle="The confidence we build is reflected in our community."
            light
          />
          <div className="grid md:grid-cols-3 gap-10">
            {testimonials.map((t) => (
              <div key={t.id} className="p-10 bg-white/5 backdrop-blur-sm border border-white/5 rounded-[3rem] hover:border-[#D4AF37]/30 transition-all group">
                <div className="flex gap-1 mb-6">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} size={18} className="fill-[#D4AF37] text-[#D4AF37]" />
                  ))}
                </div>
                <p className="text-gray-300 italic mb-8 leading-relaxed text-lg">"{t.content}"</p>
                <div className="flex justify-between items-center border-t border-white/5 pt-6">
                  <span className="text-white font-black uppercase tracking-widest text-sm">{t.author}</span>
                  <span className="text-gray-500 font-bold text-xs uppercase">{t.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-24 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-20">
          <div>
            <div className="flex items-center gap-3 mb-10">
              <div className="w-10 h-10 gold-gradient rounded-lg flex items-center justify-center">
                <Scissors className="text-black" size={20} />
              </div>
              <span className="text-3xl font-black font-serif tracking-tighter uppercase italic">
                Legends <span className="text-[#D4AF37]">Pro</span>
              </span>
            </div>
            <p className="text-gray-500 leading-relaxed mb-10 text-lg">
              <b>Legends Pro Barber Shop</b>: Where traditional artistry meets modern luxury. The finest grooming experience in Sydney's North Shore.
            </p>
             <div className="flex items-center gap-3 text-xs text-gray-500 uppercase font-black tracking-[0.2em] mb-10">
                <Info size={16} className="text-[#D4AF37]" /> Serving Neutral Bay & surrounds
              </div>
            <div className="flex gap-5">
              <a href="#" className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center hover:bg-[#D4AF37] hover:text-black transition-all border border-white/5">
                <Instagram size={24} />
              </a>
              <a href="#" className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center hover:bg-[#D4AF37] hover:text-black transition-all border border-white/5">
                <Facebook size={24} />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-xl font-black mb-10 uppercase tracking-[0.3em] text-[#D4AF37]">Location & Hours</h4>
            <div className="space-y-8 text-gray-400">
              <div className="flex gap-5">
                <MapPin className="text-[#D4AF37] shrink-0" size={24} />
                <span className="text-lg">
                  <b className="text-white uppercase tracking-widest">Big Bear Shopping Centre</b><br />
                  <span className="text-sm">Shop 7/116 Military Rd</span><br />
                  <span className="text-sm">Neutral Bay NSW 2089</span>
                </span>
              </div>
              <div className="flex gap-5">
                <Clock className="text-[#D4AF37] shrink-0" size={24} />
                <div className="space-y-1">
                  <p className="text-[#D4AF37] font-black uppercase tracking-widest text-sm mb-2">Opens 9:00 AM Thursday</p>
                  <p className="text-sm">Mon - Wed: 9:00 AM - 6:00 PM</p>
                  <p className="text-sm font-bold text-white">Thu: 9:00 AM - 8:00 PM (Late Night)</p>
                  <p className="text-sm">Fri: 9:00 AM - 6:00 PM</p>
                  <p className="text-sm">Sat - Sun: 10:00 AM - 4:00 PM</p>
                </div>
              </div>
              <div className="flex gap-5">
                <Phone className="text-[#D4AF37] shrink-0" size={24} />
                <a href="tel:0285264508" className="text-2xl font-black text-white hover:text-[#D4AF37] transition-colors leading-none">(02) 8526 4508</a>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-xl font-black mb-10 uppercase tracking-[0.3em] text-[#D4AF37]">VIP Monthly Access</h4>
            <p className="text-gray-500 mb-8 text-lg">Join the inner circle for priority scheduling, exclusive styling tips, and members-only events at Legends Pro.</p>
            <form className="space-y-4">
              <input 
                type="email" 
                placeholder="Your email address"
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 flex-1 focus:outline-none focus:border-[#D4AF37] text-lg"
              />
              <button className="w-full py-4 gold-gradient text-black font-black uppercase rounded-2xl hover:scale-[1.02] transition-transform text-lg shadow-lg">
                Register for VIP
              </button>
            </form>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 mt-24 pt-10 border-t border-white/5 text-center text-gray-600 text-sm font-bold uppercase tracking-[0.3em]">
          © {new Date().getFullYear()} Legends Pro Barber Shop • Neutral Bay
        </div>
      </footer>

      {/* Booking Modal */}
      {showBooking && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-6">
          <div className="absolute inset-0 bg-black/95 backdrop-blur-2xl" onClick={() => setShowBooking(false)}></div>
          <div className="relative bg-[#111] w-full max-w-2xl rounded-[4rem] p-12 lg:p-16 border border-white/10 shadow-[0_100px_100px_rgba(0,0,0,0.8)] animate-in zoom-in-95 duration-300">
            <button 
              onClick={() => setShowBooking(false)}
              className="absolute top-10 right-10 text-gray-500 hover:text-white transition-colors"
            >
              <span className="text-xs font-black uppercase tracking-widest">Close</span>
            </button>
            <div className="text-center mb-12">
              <div className="w-20 h-20 gold-gradient rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-[0_20px_40px_rgba(212,175,55,0.3)]">
                 <Calendar className="text-black" size={36} />
              </div>
              <h3 className="text-4xl lg:text-5xl font-black font-serif text-white uppercase italic leading-none mb-4">Book a Legend</h3>
              <p className="text-[#D4AF37] font-black uppercase tracking-[0.3em] text-xs">Neutral Bay • Big Bear Shopping Centre</p>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
              {['Today', 'Tomorrow', 'Thursday', 'Friday'].map((day) => (
                <button key={day} className="p-6 border-2 border-white/5 rounded-3xl text-white hover:border-[#D4AF37] hover:bg-[#D4AF37]/5 transition-all text-center">
                  <p className="text-[10px] uppercase font-black text-gray-500 mb-2 tracking-widest">{day}</p>
                  <p className="font-black text-lg">May {day === 'Today' ? '15' : '16'}</p>
                </button>
              ))}
            </div>

            <div className="grid grid-cols-3 gap-3 mb-12">
              {['9:00 AM', '10:30 AM', '12:00 PM', '1:30 PM', '3:00 PM', '4:30 PM', '6:00 PM', '7:30 PM'].map((time) => (
                <button key={time} className="px-6 py-4 bg-white/5 rounded-2xl text-white font-black hover:bg-[#D4AF37] hover:text-black transition-all border border-white/5 text-sm uppercase">
                  {time}
                </button>
              ))}
            </div>

            <button 
              onClick={() => {
                alert("Reservation received! We'll text you a confirmation shortly. See you in Neutral Bay.");
                setShowBooking(false);
              }}
              className="w-full py-6 gold-gradient text-black font-black text-xl uppercase rounded-[2rem] flex items-center justify-center gap-3 shadow-[0_20px_50px_rgba(212,175,55,0.3)]"
            >
              Confirm Appointment <CheckCircle2 size={24} />
            </button>
            <p className="text-center text-gray-600 text-[10px] mt-6 font-black uppercase tracking-[0.3em]">
              Support: (02) 8526 4508
            </p>
          </div>
        </div>
      )}
      
      {/* Persistent CTA Button (Mobile) */}
      <div className="md:hidden fixed bottom-8 left-8 right-8 z-[40]">
        <button 
          onClick={() => setShowBooking(true)}
          className="w-full py-5 gold-gradient text-black font-black text-lg uppercase rounded-2xl shadow-[0_30px_60px_rgba(0,0,0,0.5)] flex items-center justify-center gap-3"
        >
          Book Appointment <Calendar size={22} />
        </button>
      </div>
    </div>
  );
};

export default App;
