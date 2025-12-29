import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Wifi, Check, Zap } from 'lucide-react';
import { Navigation } from '@/components/Navigation';
import { ChatBot } from '@/components/ChatBot';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { toast } from 'sonner';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const InternetPackages = () => {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const response = await axios.get(`${API}/packages`);
        setPackages(response.data);
      } catch (error) {
        console.error('Error fetching packages:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchPackages();
  }, []);

  const handlePurchase = (pkg) => {
    toast.success('Pacchetto attivato!', {
      description: `${pkg.name} è ora attivo sul tuo account.`
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center" data-testid="loading-packages">
        <div className="text-gold text-xl">Caricamento...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 to-slate-900 pb-32" data-testid="packages-page">
      <div className="container mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 text-center"
        >
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gold/20 rounded-full mb-6">
            <Wifi className="h-10 w-10 text-gold" />
          </div>
          <h1 className="font-heading text-5xl md:text-6xl text-white mb-4" data-testid="page-title">
            Pacchetti Internet
          </h1>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            Rimani connesso durante la tua crociera con i nostri pacchetti internet ad alta velocità
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto" data-testid="packages-grid">
          {packages.map((pkg, index) => {
            const isPro = pkg.name.toLowerCase().includes('pro');
            return (
              <motion.div
                key={pkg.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`glass rounded-3xl p-8 relative overflow-hidden ${
                  isPro ? 'border-gold/50' : ''
                }`}
                data-testid={`package-card-${pkg.id}`}
              >
                {isPro && (
                  <div className="absolute top-4 right-4 bg-gold text-slate-950 px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                    <Zap className="h-3 w-3" />
                    Più Popolare
                  </div>
                )}
                
                <div className="mb-8">
                  <h2 className="font-heading text-3xl text-white mb-2">
                    {pkg.name}
                  </h2>
                  <div className="flex items-baseline gap-2">
                    <span className="text-5xl font-bold text-gold">€{pkg.price}</span>
                    <span className="text-slate-400">/ {pkg.duration}</span>
                  </div>
                </div>
                
                <div className="mb-8">
                  <div className="flex items-center gap-2 text-sm text-slate-400 mb-4">
                    <Wifi className="h-4 w-4 text-gold" />
                    <span>{pkg.speed}</span>
                  </div>
                  <ul className="space-y-3">
                    {pkg.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-3 text-slate-300">
                        <Check className="h-5 w-5 text-gold flex-shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <Button
                  onClick={() => handlePurchase(pkg)}
                  className={`w-full ${
                    isPro
                      ? 'bg-gold hover:bg-gold-light text-slate-950'
                      : 'bg-white/5 hover:bg-white/10 text-white border border-white/10'
                  }`}
                  data-testid={`purchase-button-${pkg.id}`}
                >
                  Acquista Ora
                </Button>
              </motion.div>
            );
          })}
        </div>
      </div>

      <Navigation />
      <ChatBot />
    </div>
  );
};

export default InternetPackages;
