import React, { useState } from 'react';
import { User, HelpCircle, Copy, Check, X, BarChart3, Save } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { storage, DashboardStats } from '../lib/storage';

const Settings: React.FC = () => {
  const [isSupportModalOpen, setIsSupportModalOpen] = useState(false);
  const [isStatsModalOpen, setIsStatsModalOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [tempStats, setTempStats] = useState<DashboardStats>(storage.getStats());
  const [tempPrice, setTempPrice] = useState<number>(storage.getSalePrice());
  
  const user = storage.getUser();

  const handleSaveStats = () => {
    storage.saveStats(tempStats);
    storage.saveSalePrice(tempPrice);
    setIsStatsModalOpen(false);
    window.location.reload();
  };

  const copyEmail = () => {
    navigator.clipboard.writeText('appzhub@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const sections = [
    { 
      title: 'Suporte', 
      icon: HelpCircle, 
      desc: 'Fale com nossa equipe técnica e tire suas dúvidas.',
      onClick: () => setIsSupportModalOpen(true)
    },
  ];

  return (
    <div className="max-w-4xl space-y-8 relative">
      <div>
        <h2 className="text-4xl font-black text-white uppercase tracking-tighter mb-2">Configurações</h2>
        <p className="text-zinc-400 font-black text-[10px] uppercase tracking-widest">Acesse nossos canais de auxílio técnico e gerência.</p>
      </div>

      <div className="bg-zinc-900 rounded-2xl border border-zinc-800 overflow-hidden shadow-2xl">
        <div className="divide-y divide-zinc-800/50">
          {sections.map((section) => (
            <button
              key={section.title}
              onClick={section.onClick}
              className="w-full flex items-center p-8 hover:bg-zinc-950 transition-all text-left group"
            >
              <div className="p-4 bg-zinc-950 border border-zinc-800 rounded-2xl text-zinc-500 group-hover:text-indigo-400 group-hover:border-indigo-900/50 transition-all mr-6">
                <section.icon size={22} />
              </div>
              <div className="flex-1">
                <h4 className="font-black text-zinc-100 uppercase tracking-tighter text-sm mb-1">{section.title}</h4>
                <p className="text-sm text-zinc-500 group-hover:text-zinc-400 transition-colors font-medium">{section.desc}</p>
              </div>
              <div className="text-zinc-800 group-hover:text-indigo-400 transition-colors transform group-hover:translate-x-1">
                <span className="text-2xl font-light">→</span>
              </div>
            </button>
          ))}
        </div>
      </div>
      
      {/* Modal de Suporte */}
      <AnimatePresence>
        {isSupportModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSupportModalOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-sm bg-zinc-900 border border-zinc-800 rounded-3xl p-8 shadow-2xl text-center overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-indigo-600" />
              
              <button 
                onClick={() => setIsSupportModalOpen(false)}
                className="absolute top-4 right-4 text-zinc-500 hover:text-white transition-colors"
              >
                <X size={20} />
              </button>

              <div className="w-16 h-16 bg-indigo-600/10 border border-indigo-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <HelpCircle className="text-indigo-500" size={32} />
              </div>

              <h3 className="text-xl font-black text-white uppercase tracking-tighter mb-2">Canal de Suporte</h3>
              <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest leading-relaxed mb-8">
                Copie o endereço abaixo para iniciar um atendimento via e-mail.
              </p>

              <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-4 flex items-center justify-between group">
                <span className="font-mono text-xs text-indigo-400 font-bold">appzhub@gmail.com</span>
                <button 
                  onClick={copyEmail}
                  className="p-2 hover:bg-zinc-900 rounded-lg transition-colors text-zinc-500 hover:text-indigo-400"
                >
                  {copied ? <Check size={16} className="text-emerald-500" /> : <Copy size={16} />}
                </button>
              </div>

              <div className="mt-8">
                <button
                  onClick={() => setIsSupportModalOpen(false)}
                  className="w-full py-4 bg-indigo-600 text-white rounded-xl font-black uppercase tracking-widest text-[10px] transition-all hover:bg-indigo-700 shadow-lg shadow-indigo-600/10"
                >
                  Entendi
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Settings;
