import React, { useState } from 'react';
import { ChevronDown, Building2, Plus, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Property {
  id: string;
  name: string;
  type: string;
}

interface PropertySwitcherProps {
  activeProperty: string;
  onSelect: (id: string) => void;
  onAddProperty: () => void;
}

const properties: Property[] = [
  { id: 'grand-plaza', name: 'Grand Plaza Hotel', type: 'Hotel' },
  { id: 'beach-villa', name: 'Beach Villa', type: 'Villa' },
  { id: 'lake-house', name: 'Lake House', type: 'Cabin' },
  { id: 'mountain-cabin', name: 'Mountain Cabin', type: 'Cabin' },
];

const PropertySwitcher = ({ activeProperty, onSelect, onAddProperty }: PropertySwitcherProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const currentProperty = properties.find(p => p.id === activeProperty) || properties[0];

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-3 px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl hover:bg-slate-100 hover:border-slate-300 transition-all group"
      >
        <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors">
          <Building2 className="w-4 h-4 text-primary" />
        </div>
        <div className="text-left hidden md:block">
          <p className="text-xs font-bold text-slate-500 uppercase tracking-tight leading-none mb-1">Active Property</p>
          <p className="text-sm font-bold text-slate-900 leading-none">{currentProperty.name}</p>
        </div>
        <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)} />
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              className="absolute left-0 mt-2 w-64 bg-white border border-border rounded-2xl shadow-xl z-20 overflow-hidden"
            >
              <div className="p-2 space-y-1">
                {properties.map((property) => (
                  <button
                    key={property.id}
                    onClick={() => {
                      onSelect(property.id);
                      setIsOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all ${
                      activeProperty === property.id
                        ? 'bg-primary/5 text-primary'
                        : 'hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                      activeProperty === property.id ? 'bg-primary/10' : 'bg-slate-100'
                    }`}>
                      <Building2 className={`w-4 h-4 ${activeProperty === property.id ? 'text-primary' : 'text-slate-400'}`} />
                    </div>
                    <div className="flex-1 text-left">
                      <p className={`text-sm font-bold ${activeProperty === property.id ? 'text-primary' : 'text-slate-900'}`}>
                        {property.name}
                      </p>
                      <p className="text-[10px] font-medium text-slate-500 uppercase tracking-wider">
                        {property.type}
                      </p>
                    </div>
                    {activeProperty === property.id && <Check className="w-4 h-4 text-primary" />}
                  </button>
                ))}
              </div>
              <div className="p-2 bg-slate-50 border-t border-border">
                <button
                  onClick={() => {
                    onAddProperty();
                    setIsOpen(false);
                  }}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-primary hover:bg-primary/5 transition-all font-bold text-sm"
                >
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Plus className="w-4 h-4" />
                  </div>
                  <span>Add New Property</span>
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PropertySwitcher;
