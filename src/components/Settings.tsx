import React, { useState } from 'react';
import { 
  HelpCircle, 
  Copy, 
  Check, 
  Webhook, 
  Mail, 
  RefreshCw 
} from 'lucide-react';
import { motion } from 'motion/react';
import { storage } from '../lib/storage';

const Settings: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'integrations' | 'support' | 'data'>('integrations');

  // Copy helpers
  const [copiedWebhook, setCopiedWebhook] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [dataResetDone, setDataResetDone] = useState(false);

  const webhookUrl = 'https://api.pagevo.ia/v1/webhook/7f3e82b1-9c4d-4e5b-a6f9-0d21a8c3';

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-16">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-1.5">
          <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-red-500 font-bold">
            GERENCIAMENTO DO NÚCLEO
          </span>
          <span className="text-zinc-600">·</span>
          <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">
            SISTEMA CONFIG
          </span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-white uppercase tracking-tight">
          Configurações do Sistema
        </h1>
        <p className="text-xs text-zinc-400 mt-1">
          Gerencie conexões externas, canais de suporte e dados do sistema.
        </p>
      </div>

      {/* Settings Navigation Tabs */}
      <div className="flex p-1 bg-zinc-900 border border-zinc-800 rounded-2xl gap-1 overflow-x-auto custom-scrollbar">
        {[
          { id: 'integrations', label: 'Webhooks & Conexões', icon: Webhook },
          { id: 'support', label: 'Canal de Suporte', icon: HelpCircle },
          { id: 'data', label: 'Dados & Cache', icon: RefreshCw },
        ].map(tab => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap ${
                isActive 
                  ? 'bg-red-600 text-white shadow-md shadow-red-600/30' 
                  : 'text-zinc-400 hover:text-white hover:bg-zinc-800/50'
              }`}
            >
              <Icon size={15} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab 2: Integrations & Webhook */}
      {activeTab === 'integrations' && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-zinc-900/80 border border-zinc-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl"
        >
          <div className="flex items-center gap-3 text-red-400">
            <Webhook size={22} />
            <h2 className="text-xl font-bold text-white uppercase tracking-tight">
              Conector Global de Webhooks
            </h2>
          </div>

          <p className="text-xs text-zinc-400 leading-relaxed max-w-xl">
            Utilize este endpoint para disparar notificações automáticas para CRM, Make ou Zapier quando uma nova estrutura for finalizada ou vendida.
          </p>

          <div className="p-6 bg-zinc-950 border border-zinc-800 rounded-2xl space-y-3">
            <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400 block">
              URL do Webhook Oficial
            </span>
            <div className="flex items-center gap-2 p-3 bg-zinc-900 border border-zinc-800 rounded-xl">
              <span className="text-xs font-mono text-zinc-300 truncate flex-1">
                {webhookUrl}
              </span>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(webhookUrl);
                  setCopiedWebhook(true);
                  setTimeout(() => setCopiedWebhook(false), 2000);
                }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[10px] font-mono font-bold uppercase tracking-wider transition-all ${
                  copiedWebhook ? 'bg-emerald-600 text-white' : 'bg-zinc-800 text-zinc-400 hover:text-white'
                }`}
              >
                {copiedWebhook ? <Check size={12} /> : <Copy size={12} />}
                <span>{copiedWebhook ? 'Copiado' : 'Copiar'}</span>
              </button>
            </div>
            <p className="text-[10px] text-zinc-500">
              Método: <span className="font-mono text-zinc-400 font-bold">POST</span> · Payload: <span className="font-mono text-zinc-400">JSON</span>
            </p>
          </div>
        </motion.div>
      )}

      {/* Tab 3: Support */}
      {activeTab === 'support' && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-zinc-900/80 border border-zinc-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl"
        >
          <div className="flex items-center gap-3 text-red-400">
            <Mail size={22} />
            <h2 className="text-xl font-bold text-white uppercase tracking-tight">
              Canal de Atendimento Técnico
            </h2>
          </div>

          <p className="text-xs text-zinc-400 leading-relaxed max-w-xl">
            Precisa de auxílio com a estrutura, dúvidas sobre abordagem ou modelos de vendas? Fale diretamente com o suporte técnico.
          </p>

          <div className="p-6 bg-zinc-950 border border-zinc-800 rounded-2xl max-w-md space-y-3">
            <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400 block">
              E-mail de Suporte Direto
            </span>
            <div className="flex items-center justify-between p-3.5 bg-zinc-900 border border-zinc-800 rounded-xl">
              <span className="text-xs font-mono font-bold text-zinc-200">
                rodrigosuporteapp@gmail.com
              </span>
              <button
                onClick={() => {
                  navigator.clipboard.writeText('rodrigosuporteapp@gmail.com');
                  setCopiedEmail(true);
                  setTimeout(() => setCopiedEmail(false), 2000);
                }}
                className={`p-2 rounded-lg text-xs transition-colors ${
                  copiedEmail ? 'bg-emerald-600 text-white' : 'bg-zinc-800 text-zinc-400 hover:text-white'
                }`}
                title="Copiar e-mail"
              >
                {copiedEmail ? <Check size={14} /> : <Copy size={14} />}
              </button>
            </div>
            <p className="text-[10px] text-zinc-500">
              Tempo médio de resposta: menos de 2 horas úteis.
            </p>
          </div>
        </motion.div>
      )}

      {/* Tab 4: Data & Cache */}
      {activeTab === 'data' && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-zinc-900/80 border border-zinc-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl"
        >
          <div className="flex items-center gap-3 text-red-400">
            <RefreshCw size={22} />
            <h2 className="text-xl font-bold text-white uppercase tracking-tight">
              Gerenciamento de Armazenamento & Dados
            </h2>
          </div>

          <p className="text-xs text-zinc-400 leading-relaxed max-w-xl">
            Controle os dados persistidos no navegador local. Útil para resetar simulações ou restaurar as estruturas de demonstração originais.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl pt-2">
            <div className="p-6 bg-zinc-950 border border-zinc-800 rounded-2xl space-y-3">
              <h3 className="text-sm font-bold text-zinc-200 uppercase tracking-tight">
                Resetar Dados Locais
              </h3>
              <p className="text-[11px] text-zinc-500 leading-relaxed">
                Remove todas as estruturas criadas e restaura os números iniciais do painel, mantendo sua sessão autenticada.
              </p>
              <button
                onClick={() => {
                  storage.clearAll();
                  setDataResetDone(true);
                  setTimeout(() => setDataResetDone(false), 2000);
                  window.dispatchEvent(new Event('dashboard-refresh'));
                }}
                className="w-full py-3 bg-zinc-900 hover:bg-red-600/20 text-zinc-300 hover:text-red-400 border border-zinc-800 hover:border-red-500/30 rounded-xl text-xs font-bold uppercase tracking-wider transition-all"
              >
                {dataResetDone ? 'Dados Resetados!' : 'Limpar e Reiniciar'}
              </button>
            </div>

            <div className="p-6 bg-zinc-950 border border-zinc-800 rounded-2xl space-y-3">
              <h3 className="text-sm font-bold text-zinc-200 uppercase tracking-tight">
                Status do Sistema
              </h3>
              <div className="space-y-2 text-xs font-mono text-zinc-400">
                <div className="flex justify-between border-b border-zinc-900 pb-1">
                  <span>Versão do Sistema</span>
                  <span className="text-red-400 font-bold">Engine v2.4</span>
                </div>
                <div className="flex justify-between border-b border-zinc-900 pb-1">
                  <span>Modo de Operação</span>
                  <span className="text-emerald-400 font-bold">Produção Local</span>
                </div>
                <div className="flex justify-between">
                  <span>Chave Operacional</span>
                  <span className="text-zinc-300 font-bold">4080 (Fixa)</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default Settings;
