import React, { useState } from 'react';
import { ChevronDown, Check, X, Upload } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const Toggle = ({ enabled, onChange, label }: { enabled: boolean; onChange: (val: boolean) => void; label?: string }) => (
  <div className="flex items-center gap-3">
    <button
      onClick={() => onChange(!enabled)}
      className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${enabled ? 'bg-primary' : 'bg-slate-200'
        }`}
    >
      <span
        className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${enabled ? 'translate-x-5' : 'translate-x-0'
          }`}
      />
    </button>
    {label && <span className="text-sm font-medium text-slate-700">{label}</span>}
  </div>
);

export const SectionCard = ({ title, children, description }: { title: string; children: React.ReactNode; description?: string; key?: React.Key }) => (
  <div className="bg-white rounded-xl shadow-sm border border-border p-6 space-y-6">
    <div>
      <h3 className="card-title">{title}</h3>
      {description && <p className="text-sm text-text-secondary mt-1">{description}</p>}
    </div>
    <div className="space-y-6">
      {children}
    </div>
  </div>
);

export const MultiSelectField = ({
  label,
  options,
  selected,
  onChange,
  placeholder
}: {
  label: string;
  options: string[];
  selected: string[];
  onChange: (val: string[]) => void;
  placeholder: string;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOption = (option: string) => {
    if (selected.includes(option)) {
      onChange(selected.filter(i => i !== option));
    } else {
      onChange([...selected, option]);
    }
  };

  return (
    <div className="space-y-3">
      <label>{label}</label>
      <div className="relative">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="input w-full flex items-center justify-between text-left"
        >
          <span className={selected.length === 0 ? 'text-text-muted' : 'text-text-primary'}>
            {selected.length === 0 ? placeholder : `${selected.length} items selected`}
          </span>
          <ChevronDown className={`w-4 h-4 text-text-muted transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </button>

        <AnimatePresence>
          {isOpen && (
            <>
              <div
                className="fixed inset-0 z-10"
                onClick={() => setIsOpen(false)}
              />
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="absolute left-0 right-0 mt-2 bg-white border border-border rounded-xl shadow-xl z-20 max-h-60 overflow-y-auto p-2"
              >
                {options.map(option => (
                  <button
                    key={option}
                    onClick={() => toggleOption(option)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-[14px] transition-colors flex items-center justify-between ${selected.includes(option) ? 'bg-primary/10 text-primary font-medium' : 'hover:bg-slate-50 text-text-secondary'
                      }`}
                  >
                    {option}
                    {selected.includes(option) && <Check className="w-4 h-4" />}
                  </button>
                ))}
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>

      {selected.length > 0 && (
        <div className="flex flex-wrap gap-2 pt-1">
          {selected.map(item => (
            <div
              key={item}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 text-slate-700 rounded-lg text-xs font-medium border border-slate-200"
            >
              {item}
              <button
                onClick={() => toggleOption(item)}
                className="p-0.5 hover:bg-slate-200 rounded-full transition-colors"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
