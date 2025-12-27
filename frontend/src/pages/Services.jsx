import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Phone, Clock, MapPin } from 'lucide-react';
import { Navigation } from '@/components/Navigation';
import { ChatBot } from '@/components/ChatBot';
import { motion } from 'framer-motion';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const Services = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get(`${API}/services`);
        setServices(response.data);
      } catch (error) {
        console.error('Error fetching services:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center" data-testid="loading-services">
        <div className="text-gold text-xl">Caricamento...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 to-slate-900 pb-32" data-testid="services-page">
      <div className="container mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="font-heading text-5xl md:text-6xl text-white mb-4" data-testid="page-title">
            Servizi Ospiti
          </h1>
          <p className="text-lg text-slate-400">
            Siamo qui per rendere la tua crociera indimenticabile
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6" data-testid="services-grid">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="glass rounded-3xl p-8 hover:border-gold/50 transition-all duration-500"
              data-testid={`service-card-${service.id}`}
            >
              <h2 className="font-heading text-3xl text-white mb-4">
                {service.name}
              </h2>
              
              <p className="text-slate-400 mb-6 leading-relaxed">
                {service.description}
              </p>
              
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm text-slate-400">
                  <Clock className="h-4 w-4 text-gold" />
                  <span>{service.hours}</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-slate-400">
                  <MapPin className="h-4 w-4 text-gold" />
                  <span>{service.location}</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-slate-400">
                  <Phone className="h-4 w-4 text-gold" />
                  <span>{service.contact}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <Navigation />
      <ChatBot />
    </div>
  );
};

export default Services;
