import React, { useState } from 'react';
import {
  XCircle,
  CheckCircle2,
  AlertCircle,
  Clock,
  Plus,
  ShieldCheck,
  DollarSign,
  Trash2,
  ChevronRight,
  Sparkles,
  Info,
  ShieldAlert,
  Calendar,
  Zap,
  ArrowRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// Types
type PresetPolicy = 'flexible' | 'moderate' | 'strict' | 'custom';

interface CustomRule {
  id: string;
  daysBefore: number;
  refundPercentage: number;
}

const CancellationPolicyView = () => {
  const [selectedPreset, setSelectedPreset] = useState<PresetPolicy>('flexible');
  const [customRules, setCustomRules] = useState<CustomRule[]>([
    { id: '1', daysBefore: 7, refundPercentage: 100 },
    { id: '2', daysBefore: 3, refundPercentage: 50 },
    { id: '3', daysBefore: 1, refundPercentage: 25 },
  ]);

  const [paymentProtection, setPaymentProtection] = useState({
    advancePercentage: 50,
    securityDeposit: 250,
  });

  const [noShowPolicy, setNoShowPolicy] = useState('full_charge');
  const [safeClimateEnabled, setSafeClimateEnabled] = useState(true);

  // Constants
  const presets = [
    {
      id: 'flexible',
      title: 'Flexible',
      subtitle: 'Guest friendly',
      description: 'Full refund 1 day prior to arrival. 50% refund if cancelled within 24 hours.',
      color: 'bg-emerald-500'
    },
    {
      id: 'moderate',
      title: 'Moderate',
      subtitle: 'Most popular',
      description: 'Full refund 5 days prior to arrival. No refund if cancelled less than 5 days.',
      color: 'bg-indigo-500'
    },
    {
      id: 'strict',
      title: 'Strict',
      subtitle: 'High protection',
      description: '50% refund up to 7 days before arrival. No refund afterwards.',
      color: 'bg-rose-500'
    },
    {
      id: 'custom',
      title: 'Custom',
      subtitle: 'Tailored rules',
      description: 'Define your own specific refund percentages and timeframes.',
      color: 'bg-slate-700'
    },
  ];

  const addCustomRule = () => {
    const newId = (customRules.length + 1).toString();
    setCustomRules([...customRules, { id: newId, daysBefore: 0, refundPercentage: 0 }]);
  };

  const removeCustomRule = (id: string) => {
    setCustomRules(customRules.filter(r => r.id !== id));
  };

  const updateCustomRule = (id: string, field: keyof CustomRule, value: number) => {
    setCustomRules(customRules.map(r => r.id === id ? { ...r, [field]: value } : r));
  };

  // Helper for Timeline Visualization
  const getTimelinePoints = () => {
    if (selectedPreset === 'flexible') return [
      { day: 7, pct: 100 }, { day: 1, pct: 100 }, { day: 0, pct: 50 }
    ];
    if (selectedPreset === 'moderate') return [
      { day: 7, pct: 100 }, { day: 5, pct: 100 }, { day: 0, pct: 0 }
    ];
    if (selectedPreset === 'strict') return [
      { day: 7, pct: 50 }, { day: 1, pct: 0 }, { day: 0, pct: 0 }
    ];
    return [...customRules].sort((a, b) => b.daysBefore - a.daysBefore).map(r => ({ day: r.daysBefore, pct: r.refundPercentage }));
  };

  return (
    <div className="space-y-8 pb-10 mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Cancellation Policy</h1>
          <p className="text-slate-500 text-lg">Configure your refund rules and booking cancellation terms.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-6 py-2.5 rounded-xl border border-slate-200 font-bold text-slate-600 hover:bg-slate-50 transition-all">Discard Changes</button>
          <button className="px-6 py-2.5 rounded-xl bg-primary text-white font-bold shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all">Save Policy</button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">

          {/* Preset Options */}
          <section className="bg-white rounded-[2rem] border border-slate-100 shadow-sm p-8 space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <Calendar className="w-5 h-5 text-primary" />
              </div>
              <h2 className="text-xl font-bold text-slate-900">Preset Policies</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {presets.map((preset) => (
                <button
                  key={preset.id}
                  onClick={() => setSelectedPreset(preset.id as PresetPolicy)}
                  className={`group relative p-6 rounded-2xl border-2 text-left transition-all duration-300 ${selectedPreset === preset.id
                    ? 'border-primary bg-primary/[0.02] ring-4 ring-primary/5'
                    : 'border-slate-100 hover:border-slate-300 hover:bg-slate-50'
                    }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-md text-white ${preset.color}`}>
                        {preset.subtitle}
                      </span>
                      <h3 className="text-lg font-bold text-slate-900 mt-1">{preset.title}</h3>
                    </div>
                    {selectedPreset === preset.id && (
                      <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center shadow-lg shadow-primary/30">
                        <CheckCircle2 className="w-4 h-4 text-white" />
                      </div>
                    )}
                  </div>
                  <p className="text-sm text-slate-500 leading-relaxed font-medium">{preset.description}</p>

                  {/* Subtle hover effect */}
                  <div className={`absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity ${selectedPreset === preset.id ? 'hidden' : ''}`}>
                    <ArrowRight className="w-4 h-4 text-slate-400" />
                  </div>
                </button>
              ))}
            </div>
          </section>

          {/* Refund Timeline Visualization */}
          <section className="bg-white rounded-[2rem] border border-slate-100 shadow-sm p-8 space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center">
                  <Clock className="w-5 h-5 text-orange-500" />
                </div>
                <h2 className="text-xl font-bold text-slate-900">Refund Timeline</h2>
              </div>
              <div className="hidden sm:flex items-center gap-4 text-xs font-bold text-slate-400">
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-primary" /> 100% Refund
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-orange-400" /> Partial Refund
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-slate-300" /> No Refund
                </div>
              </div>
            </div>

            <div className="relative pt-12 pb-6 px-4">
              <div className="absolute top-1/2 left-0 right-0 h-2 bg-slate-100 rounded-full -translate-y-1/2" />

              {/* Dynamic Progress Bar */}
              <div
                className="absolute top-1/2 left-0 h-2 bg-gradient-to-r from-emerald-500 via-orange-400 to-rose-400 rounded-full -translate-y-1/2 transition-all duration-700"
                style={{ width: '100%' }}
              />

              <div className="relative flex justify-between">
                {[7, 5, 3, 1, 0].map((day) => {
                  const points = getTimelinePoints();
                  const point = points.find(p => p.day === day) || points.find(p => p.day < day);
                  const pct = point ? point.pct : 0;

                  return (
                    <div key={day} className="flex flex-col items-center group">
                      <div className="absolute -top-10 flex flex-col items-center">
                        <span className={`text-[10px] font-black px-2 py-1 rounded-lg shadow-sm border ${pct === 100 ? 'bg-emerald-50 text-emerald-600 border-emerald-100' :
                          pct > 0 ? 'bg-orange-50 text-orange-600 border-orange-100' :
                            'bg-slate-50 text-slate-400 border-slate-100'
                          }`}>
                          {pct}%
                        </span>
                        <div className="w-px h-4 bg-slate-200 my-1" />
                      </div>

                      <div className={`w-5 h-5 rounded-full border-4 border-white shadow-md z-10 transition-all duration-500 group-hover:scale-125 ${pct === 100 ? 'bg-emerald-500' :
                        pct > 0 ? 'bg-orange-500' :
                          'bg-slate-300'
                        }`} />

                      <div className="mt-4 text-center">
                        <p className="text-xs font-bold text-slate-900">{day === 0 ? 'Check-in' : `${day}d before`}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* Custom Rules Builder */}
          <AnimatePresence>
            {selectedPreset === 'custom' && (
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="bg-white rounded-[2rem] border border-slate-100 shadow-sm p-8 space-y-6"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center">
                      <Zap className="w-5 h-5 text-purple-600" />
                    </div>
                    <h2 className="text-xl font-bold text-slate-900">Custom Refund Rules</h2>
                  </div>
                  <button
                    onClick={addCustomRule}
                    className="flex items-center gap-2 px-4 py-2 bg-slate-50 text-slate-600 rounded-xl font-bold text-sm hover:bg-slate-100 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add Rule</span>
                  </button>
                </div>

                <div className="space-y-4">
                  {customRules.map((rule, index) => (
                    <motion.div
                      layout
                      key={rule.id}
                      className="flex flex-col sm:flex-row items-center gap-4 p-4 rounded-2xl bg-slate-50/50 border border-slate-100 group"
                    >
                      <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-xs font-bold text-slate-400 shadow-sm">
                        {index + 1}
                      </div>

                      <div className="flex-1 flex items-center gap-3">
                        <div className="relative flex-1">
                          <input
                            type="number"
                            value={rule.daysBefore}
                            onChange={(e) => updateCustomRule(rule.id, 'daysBefore', parseInt(e.target.value))}
                            className="input w-full pl-4 pr-12 font-bold"
                          />
                          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400">Days</span>
                        </div>
                        <span className="text-slate-400 group-hover:text-primary transition-colors">
                          <ArrowRight className="w-4 h-4" />
                        </span>
                        <div className="relative flex-1">
                          <input
                            type="number"
                            value={rule.refundPercentage}
                            onChange={(e) => updateCustomRule(rule.id, 'refundPercentage', parseInt(e.target.value))}
                            className="input w-full pl-4 pr-12 font-bold"
                          />
                          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400">%</span>
                        </div>
                      </div>

                      <button
                        onClick={() => removeCustomRule(rule.id)}
                        className="p-2 text-slate-300 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-all"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </motion.div>
                  ))}

                  {customRules.length === 0 && (
                    <div className="text-center py-10 rounded-2xl border-2 border-dashed border-slate-100">
                      <p className="text-slate-400 font-medium">No custom rules defined yet.</p>
                      <button onClick={addCustomRule} className="text-primary font-bold mt-2 hover:underline">Click to add your first rule</button>
                    </div>
                  )}
                </div>
              </motion.section>
            )}
          </AnimatePresence>

          {/* Payment Protection Settings */}
          <section className="bg-white rounded-[2rem] border border-slate-100 shadow-sm p-8 space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
                <ShieldCheck className="w-5 h-5 text-blue-600" />
              </div>
              <h2 className="text-xl font-bold text-slate-900">Payment Protection</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 hover:border-primary/20 transition-all group">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Zap className="w-4 h-4 text-amber-500" />
                    <label className="text-sm font-bold text-slate-700 uppercase tracking-tight">Advance Payment</label>
                  </div>
                  <Info className="w-4 h-4 text-slate-300 cursor-help" />
                </div>
                <div className="relative">
                  <input
                    type="number"
                    value={paymentProtection.advancePercentage}
                    onChange={(e) => setPaymentProtection({ ...paymentProtection, advancePercentage: parseInt(e.target.value) })}
                    className="input w-full pl-4 pr-12 text-2xl font-black text-slate-900 border-none bg-white shadow-sm group-hover:ring-2 group-hover:ring-primary/10 transition-all"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-lg font-bold text-slate-400">%</span>
                </div>
                <p className="text-xs text-slate-400 mt-3 font-medium">Percentage of total amount required to confirm booking.</p>
              </div>

              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 hover:border-primary/20 transition-all group">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-emerald-500" />
                    <label className="text-sm font-bold text-slate-700 uppercase tracking-tight">Security Deposit</label>
                  </div>
                  <Info className="w-4 h-4 text-slate-300 cursor-help" />
                </div>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-lg font-bold text-slate-400">$</span>
                  <input
                    type="number"
                    value={paymentProtection.securityDeposit}
                    onChange={(e) => setPaymentProtection({ ...paymentProtection, securityDeposit: parseInt(e.target.value) })}
                    className="input w-full pl-10 pr-4 text-2xl font-black text-slate-900 border-none bg-white shadow-sm group-hover:ring-2 group-hover:ring-primary/10 transition-all"
                  />
                </div>
                <p className="text-xs text-slate-400 mt-3 font-medium">Refundable deposit for damages or incidentals.</p>
              </div>
            </div>
          </section>

          {/* No-Show Policy */}
          <section className="bg-white rounded-[2rem] border border-slate-100 shadow-sm p-8 space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-rose-50 flex items-center justify-center">
                <XCircle className="w-5 h-5 text-rose-500" />
              </div>
              <h2 className="text-xl font-bold text-slate-900">No-Show Policy</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { id: 'full_charge', title: 'Full Charge', icon: DollarSign, desc: '100% of total amount' },
                { id: 'first_night', title: 'First Night', icon: Calendar, desc: 'Charge only 1st night' },
                { id: 'no_charge', title: 'No Charge', icon: CheckCircle2, desc: 'Fully refundable' },
              ].map((policy) => (
                <button
                  key={policy.id}
                  onClick={() => setNoShowPolicy(policy.id)}
                  className={`p-5 rounded-2xl border-2 text-center transition-all ${noShowPolicy === policy.id
                    ? 'border-rose-500 bg-rose-50/30'
                    : 'border-slate-100 hover:border-slate-200 hover:bg-slate-50'
                    }`}
                >
                  <policy.icon className={`w-6 h-6 mx-auto mb-2 ${noShowPolicy === policy.id ? 'text-rose-500' : 'text-slate-400'}`} />
                  <h3 className={`text-sm font-bold ${noShowPolicy === policy.id ? 'text-rose-600' : 'text-slate-900'}`}>{policy.title}</h3>
                  <p className="text-[10px] text-slate-500 font-bold uppercase mt-1 tracking-tight">{policy.desc}</p>
                </button>
              ))}
            </div>
          </section>
        </div>

        {/* Sidebar Sections */}
        <div className="space-y-8">

          {/* SafeClimate Emergency Clause */}
          <section className="relative overflow-hidden bg-gradient-to-br from-indigo-900 via-slate-900 to-primary rounded-[2rem] p-8 text-white shadow-2xl">
            <div className="relative z-10 space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ShieldAlert className="w-6 h-6 text-emerald-400" />
                  <h2 className="text-lg font-black tracking-tight uppercase !text-white">SafeClimate™</h2>
                </div>
                <button
                  onClick={() => setSafeClimateEnabled(!safeClimateEnabled)}
                  className={`relative w-12 h-6 rounded-full transition-colors duration-200 ease-in-out ${safeClimateEnabled ? 'bg-emerald-500' : 'bg-slate-700'}`}
                >
                  <div className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform duration-200 ${safeClimateEnabled ? 'translate-x-6' : 'translate-x-0'}`} />
                </button>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-2 !text-white">Emergency Weather Clause</h3>
                <p className="text-sm text-white/80 leading-relaxed">
                  Automatically allows full refunds to guests during extreme weather events (Level 3+ alerts).
                </p>
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center gap-3">
                <Sparkles className="w-5 h-5 text-amber-400" />
                <span className="text-xs font-bold text-white/90">Increases trust score by +15%</span>
              </div>
            </div>

            {/* Background pattern */}
            <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-white/5 rounded-full blur-3xl pointer-events-none" />
          </section>

          {/* Policy Preview Section */}
          <section className="bg-white rounded-[2rem] border border-slate-100 shadow-xl overflow-hidden">
            <div className="bg-slate-50 px-6 py-4 border-b border-slate-100">
              <h2 className="text-sm font-black text-slate-900 uppercase tracking-widest">Guest-Facing Preview</h2>
            </div>
            <div className="p-6 space-y-6">
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center shrink-0">
                    <Info className="w-5 h-5 text-slate-400" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">Cancellation Policy</h4>
                    <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                      {selectedPreset === 'flexible' && 'Free cancellation until 1 day before check-in. Cancellation after that is subject to a 50% charge.'}
                      {selectedPreset === 'moderate' && 'Free cancellation until 5 days before check-in. Cancellation after that is non-refundable.'}
                      {selectedPreset === 'strict' && '50% refund for cancellations made at least 7 days before check-in. Cancellations made less than 7 days before check-in are non-refundable.'}
                      {selectedPreset === 'custom' && 'Review the custom refund schedule below for specific terms.'}
                    </p>
                  </div>
                </div>

                {safeClimateEnabled && (
                  <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-100 flex gap-3">
                    <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs font-bold text-emerald-900">SafeClimate Protection Included</p>
                      <p className="text-[10px] text-emerald-700 leading-relaxed mt-0.5">Full refund guaranteed if an extreme weather warning is issued for the stay dates.</p>
                    </div>
                  </div>
                )}
              </div>

              <div className="space-y-3">
                <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Payment Summary</h4>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-500 font-medium">Due at booking</span>
                    <span className="font-bold text-slate-900">{paymentProtection.advancePercentage}%</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-500 font-medium">Security deposit</span>
                    <span className="font-bold text-slate-900">${paymentProtection.securityDeposit}</span>
                  </div>
                </div>
              </div>

              <button className="w-full py-3 bg-slate-100 rounded-xl text-xs font-black text-slate-400 uppercase tracking-widest cursor-not-allowed">
                View Policy Document
              </button>
            </div>
          </section>

          {/* Recommendation Insights */}
          <section className="bg-indigo-50/50 rounded-[2rem] border border-indigo-100/50 p-6 space-y-4">
            <div className="flex items-center gap-2 text-indigo-900">
              <Sparkles className="w-5 h-5" />
              <h2 className="text-sm font-bold uppercase tracking-tight">AI Insights</h2>
            </div>

            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-white border border-indigo-100 shadow-sm transition-all hover:shadow-md">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center shrink-0">
                    <TrendingUp className="w-4 h-4 text-emerald-500" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">Increase Conversion</h4>
                    <p className="text-[11px] text-slate-500 leading-relaxed mt-1">
                      Properties with <b>Flexible</b> policies see up to <span className="text-emerald-500">24% higher</span> booking conversion on weekends.
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-indigo-100 shadow-sm transition-all hover:shadow-md">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center shrink-0">
                    <Users className="w-4 h-4 text-indigo-500" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">Guest Preference</h4>
                    <p className="text-[11px] text-slate-500 leading-relaxed mt-1">
                      82% of high-value guests prioritize properties with <b>Emergency Weather Clauses</b>.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <button className="w-full text-center text-xs font-bold text-indigo-600 hover:text-indigo-800 transition-colors">
              View Market Analytics
            </button>
          </section>
        </div>
      </div>
    </div>
  );
};

// Internal icon helpers to avoid massive imports if needed, but since we have lucide let's use them
const TrendingUp = ({ className }: { className: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17" /><polyline points="16 7 22 7 22 13" /></svg>
);

const Users = ({ className }: { className: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>
);

export default CancellationPolicyView;
