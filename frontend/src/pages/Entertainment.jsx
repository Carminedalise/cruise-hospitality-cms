import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Calendar, MapPin, Clock } from 'lucide-react';
import { Navigation } from '@/components/Navigation';
import { ChatBot } from '@/components/ChatBot';
import { motion } from 'framer-motion';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const Entertainment = () => {
  const [entertainment, setEntertainment] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEntertainment = async () => {
      try {
        const response = await axios.get(`${API}/entertainment`);
        setEntertainment(response.data);
      } catch (error) {
        console.error('Error fetching entertainment:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchEntertainment();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center" data-testid="loading-entertainment">
        <div className="text-gold text-xl">Caricamento...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 to-slate-900 pb-32" data-testid="entertainment-page">
      <div className="container mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="font-heading text-5xl md:text-6xl text-white mb-4" data-testid="page-title">
            Intrattenimento
          </h1>
          <p className="text-lg text-slate-400">
            Spettacoli e musica dal vivo ogni sera
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8" data-testid="entertainment-grid">
          {entertainment.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="glass rounded-3xl overflow-hidden hover:border-gold/50 transition-all duration-500"
              data-testid={`entertainment-card-${event.id}`}
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={event.image_url}
                  alt={event.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent" />
                <div className="absolute bottom-4 left-4">
                  <div className="inline-block bg-gold text-slate-950 px-4 py-2 rounded-full text-sm font-medium">
                    {event.type}
                  </div>
                </div>
              </div>
              
              <div className="p-8">
                <h2 className="font-heading text-3xl text-white mb-4">
                  {event.name}
                </h2>
                
                <p className="text-slate-400 mb-6 leading-relaxed">
                  {event.description}
                </p>
                
                <div className="space-y-3 text-sm text-slate-400">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-gold" />
                    <span>{event.venue}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-gold" />
                    <span>{event.time}</span>
                  </div>
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

export default Entertainment;
