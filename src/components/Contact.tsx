import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PERSONAL_INFO } from '../data';
import { Mail, Send, CheckCircle, Navigation, Copy, RefreshCw } from 'lucide-react';

interface Particle {
  id: number;
  x: number;
  y: number;
  color: string;
}

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'Internship Opportunity',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [copied, setCopied] = useState(false);
  const [particles, setParticles] = useState<Particle[]>([]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const spawnParticles = () => {
    // Colors filtered to the indigo-emerald-purple palette
    const colors = ['#6366f1', '#10b981', '#8b5cf6', '#4f46e5', '#34d399'];
    const newParticles: Particle[] = [];
    for (let i = 0; i < 40; i++) {
      newParticles.push({
        id: Math.random() + i,
        x: (Math.random() - 0.5) * 350,
        y: (Math.random() - 0.5) * 250 - 50,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }
    setParticles(newParticles);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      alert("Please complete the required input cells.");
      return;
    }

    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setSubmitSuccess(true);
    spawnParticles();
  };

  const copyEmailToClipboard = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const resetContactForm = () => {
    setFormData({ name: '', email: '', subject: 'Internship Opportunity', message: '' });
    setSubmitSuccess(false);
    setParticles([]);
  };

  return (
    <section
      id="contact"
      className="py-24 bg-slate-950 border-t border-slate-900 overflow-hidden relative"
    >
      <div className="absolute top-[10%] right-[10%] w-96 h-96 bg-indigo-650/10 rounded-full blur-3xl pointer-events-none z-0" />
      <div className="absolute bottom-[10%] left-[10%] w-96 h-96 bg-emerald-650/10 rounded-full blur-3xl pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Title Context */}
        <div className="text-left max-w-3xl mb-16 space-y-3">
          <motion.h3
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs font-mono tracking-widest text-indigo-400 uppercase font-semibold block"
          >
            // 06. network handshake
          </motion.h3>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-heading font-extrabold text-3xl sm:text-4xl tracking-tight text-white uppercase italic"
          >
            LET'S COLLABORATE ON THE NEXT SYSTEMS BREAKTHROUGH
          </motion.h2>
          <p className="text-slate-400 text-sm max-w-2xl font-light leading-relaxed">
            Whether recruiting an engineering intern, collaborating on distributed hackathons, or debating database transaction boundaries — coordinate an instant transmission packet below.
          </p>
        </div>

        {/* Main Columns Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch max-w-5xl">
          
          {/* Left Column: Direct info details */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            <div className="bg-slate-900 border border-slate-800 p-8 rounded-none border-l-4 border-l-indigo-500 space-y-6">
              <h4 className="font-heading font-bold text-lg text-slate-100 uppercase tracking-tight">
                COMPILER INTERFACES & ALIAS
              </h4>
              <p className="text-xs text-slate-400 font-light leading-relaxed">
                I monitor incoming TCP streams regularly. Feel free to copy the institutional email destination below or synchronize connections dynamically.
              </p>

              <div className="space-y-4">
                {/* Email Copy Card */}
                <div className="p-4 bg-slate-950 border border-slate-805 flex items-center justify-between gap-3 rounded-none group">
                  <div className="flex items-center gap-3">
                    <div className="h-9 w-9 bg-slate-900 border border-slate-800 text-indigo-400 flex items-center justify-center rounded-none">
                      <Mail className="h-4.5 w-4.5" />
                    </div>
                    <div className="text-left">
                      <span className="text-[10px] font-mono text-slate-550 block uppercase tracking-widest font-bold">PRIMARY HOST</span>
                      <span className="text-xs font-mono text-slate-300 select-all font-semibold break-all">{PERSONAL_INFO.email}</span>
                    </div>
                  </div>

                  <button
                    onClick={copyEmailToClipboard}
                    className="p-1.5 bg-slate-900 border border-slate-800 text-slate-400 hover:text-white transition cursor-pointer rounded-none"
                    title="Copy Address"
                  >
                    {copied ? (
                      <span className="text-[9px] font-mono text-emerald-400 uppercase font-bold">Copied</span>
                    ) : (
                      <Copy className="h-3.5 w-3.5" />
                    )}
                  </button>
                </div>

                {/* Info Bullet */}
                <div className="p-4 bg-slate-950 border border-slate-805 flex items-center gap-3 rounded-none">
                  <div className="h-9 w-9 bg-slate-900 border border-slate-800 text-emerald-400 flex items-center justify-center rounded-none">
                    <Navigation className="h-4.5 w-4.5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-slate-550 block uppercase tracking-widest font-bold">LOCATION ACCESS</span>
                    <span className="text-xs font-mono text-slate-305 font-bold">India &bull; CSE Engineering HQ</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick visual disclaimer */}
            <div className="p-4 bg-slate-900 border border-slate-805 flex items-center gap-3 rounded-none">
              <div className="bg-emerald-500 h-2.5 w-2.5 rounded-none rotate-45 animate-pulse-emerald shrink-0" />
              <p className="text-[11px] text-slate-500 leading-normal font-mono uppercase tracking-tight">
                Transmission protocols operational. Client socket encryption confirmed under React security matrices.
              </p>
            </div>
          </div>

          {/* Right Column: Contact form */}
          <div className="lg:col-span-7 bg-slate-900 border border-slate-800 p-8 rounded-none relative">
            <AnimatePresence mode="wait">
              {!submitSuccess ? (
                <motion.form
                  key="contact-form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleFormSubmit}
                  className="space-y-5 h-full flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    <h4 className="font-heading font-black text-lg text-slate-100 uppercase tracking-tight">
                      // DIRECT TELEMETRY MESSAGE
                    </h4>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-mono text-slate-400 block uppercase font-bold tracking-widest">SENDER_NAME *</label>
                        <input
                          type="text"
                          name="name"
                          required
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder="e.g. Alexis Carter"
                          className="w-full bg-slate-955 border border-slate-800 text-slate-205 text-xs p-3 focus:outline-none focus:border-indigo-500 rounded-none font-mono"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[10px] font-mono text-slate-400 block uppercase font-bold tracking-widest">SENDER_EMAIL *</label>
                        <input
                          type="email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="e.g. alexis@univ.edu"
                          className="w-full bg-slate-955 border border-slate-800 text-slate-205 text-xs p-3 focus:outline-none focus:border-indigo-500 rounded-none font-mono"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[10px] font-mono text-slate-400 block uppercase font-bold tracking-widest">CONNECTION_SUBJECT</label>
                      <select
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        className="w-full bg-slate-955 border border-slate-800 text-slate-205 text-xs p-3 focus:outline-none focus:border-indigo-505 rounded-none font-mono"
                      >
                        <option value="Internship Opportunity">Fall Intern Recruitment / SDE Internship</option>
                        <option value="Hackathon Collaboration">National Hackathon Engineering Partnering</option>
                        <option value="Competitive Programming Discussion">DSA Algorithm Consultation / CP discussions</option>
                        <option value="Other Project Review">Full-Stack Scalability Pipeline discussion</option>
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[10px] font-mono text-slate-400 block uppercase font-bold tracking-widest">DATA_PACKET_BODY *</label>
                      <textarea
                        name="message"
                        required
                        rows={4}
                        value={formData.message}
                        onChange={handleInputChange}
                        placeholder="Type transmission logs or message requirements..."
                        className="w-full bg-slate-955 border border-slate-800 text-slate-205 text-xs p-3 focus:outline-none focus:border-indigo-505 rounded-none font-mono"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-505 text-white font-mono text-xs font-bold tracking-widest uppercase transition-all duration-150 flex items-center justify-center gap-2 rounded-none cursor-pointer"
                  >
                    {isSubmitting ? (
                      <>
                      <RefreshCw className="h-4 w-4 animate-spin text-emerald-400" />
                      Broadcasting via Sockets...
                      </>
                    ) : (
                      <>
                      <Send className="h-4 w-4" />
                      Broadcast Transmission Packet
                      </>
                    )}
                  </button>
                </motion.form>
              ) : (
                <motion.div
                  key="success-screen"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="h-full flex flex-col justify-center items-center text-center py-12 space-y-6 relative overflow-visible"
                >
                  {/* Confetti Particle blast dispersion representation */}
                  {particles.map((p) => (
                    <motion.div
                      key={p.id}
                      initial={{ scale: 1, opacity: 1, x: 0, y: 0 }}
                      animate={{
                        scale: 0,
                        opacity: 0,
                        x: p.x,
                        y: p.y,
                      }}
                      transition={{ duration: 1.2, ease: 'easeOut' }}
                      className="absolute w-2 h-2 rounded-none pointer-events-none"
                      style={{ backgroundColor: p.color, left: '50%', top: '50%' }}
                    />
                  ))}

                  <div className="h-14 w-14 bg-slate-950 border border-slate-800 text-emerald-400 rotate-45 flex items-center justify-center shadow-lg animate-bounce">
                    <CheckCircle className="-rotate-45 h-7 w-7" />
                  </div>

                  <div className="space-y-2 max-w-sm">
                    <h5 className="font-heading font-extrabold text-xl text-slate-100 uppercase tracking-tight italic">
                      Transmission Delivered!
                    </h5>
                    <p className="text-xs text-slate-400 font-sans leading-relaxed">
                      Your query was synchronized successfully with candidate state monitors. Priyanka Snale will initiate a secure communication handshake shortly.
                    </p>
                  </div>

                  <button
                    onClick={resetContactForm}
                    className="px-5 py-3 bg-slate-955 border border-slate-800 text-slate-300 font-mono text-[10px] font-bold uppercase tracking-widest hover:bg-slate-900 transition-colors cursor-pointer rounded-none"
                  >
                    [ Transmit New Packet ]
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
