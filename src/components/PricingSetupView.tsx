import React, { useState } from 'react';
import { DollarSign, Percent, Info, Calendar } from 'lucide-react';
import { SectionCard, Toggle } from './UIComponents';

const PricingSetupView = () => {
  const [useDynamicPricing, setUseDynamicPricing] = useState(false);
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Pricing Setup</h1>
        <p className="text-slate-500">Configure base rates, taxes, and pricing rules for your property.</p>
      </div>

      <SectionCard title="Base Currency & Taxes">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">Base Currency</label>
            <select className="input w-full">
              <option>USD ($)</option>
              <option>EUR (€)</option>
              <option>GBP (£)</option>
              <option>INR (₹)</option>
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">Tax Percentage (%)</label>
            <div className="relative">
              <input type="number" className="input pr-10" placeholder="0" defaultValue="12" />
              <Percent className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            </div>
          </div>
        </div>
      </SectionCard>

      <SectionCard title="Pricing Strategy">
        <div className="space-y-6">
          <div className="flex items-center justify-between p-4 bg-primary/5 rounded-2xl border border-primary/10">
            <div className="flex gap-4">
              <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center shrink-0">
                <Calendar className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="font-bold text-slate-900">Dynamic Pricing</p>
                <p className="text-sm text-slate-500">Automatically adjust prices based on demand and seasonality.</p>
              </div>
            </div>
            <Toggle enabled={useDynamicPricing} onChange={setUseDynamicPricing} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 block">Weekend Markup</label>
              <div className="flex items-center gap-2">
                <input type="number" className="input w-20" defaultValue="15" />
                <span className="text-sm font-bold text-slate-700">%</span>
              </div>
            </div>
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 block">Long Stay Discount</label>
              <div className="flex items-center gap-2">
                <input type="number" className="input w-20" defaultValue="10" />
                <span className="text-sm font-bold text-slate-700">%</span>
              </div>
              <p className="text-[10px] text-slate-400 mt-1">For 7+ nights</p>
            </div>
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 block">Extra Adult Fee</label>
              <div className="flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-slate-400" />
                <input type="number" className="input" defaultValue="25" />
              </div>
            </div>
          </div>
        </div>
      </SectionCard>

      <div className="bg-amber-50 rounded-2xl p-4 border border-amber-100 flex gap-3">
        <Info className="w-5 h-5 text-amber-500 shrink-0" />
        <p className="text-sm text-amber-900">
          <strong>Note:</strong> Pricing can be further refined per room category in the next step or in the pricing management dashboard.
        </p>
      </div>

      <div className="flex justify-end gap-3">
        <button className="btn-secondary px-6">Cancel</button>
        <button className="btn-primary px-6">Save Pricing</button>
      </div>
    </div>
  );
};

export default PricingSetupView;
