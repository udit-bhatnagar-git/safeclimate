import React, { useState } from 'react';
import { SectionCard, Toggle } from './UIComponents';

const PropertyPoliciesView = () => {
  const [policies, setPolicies] = useState({
    govId: true,
    pets: false,
    smoking: false,
    parties: false,
    children: true,
    extraBeds: true,
    earlyCheckin: false,
    lateCheckout: false,
  });

  const togglePolicy = (key: keyof typeof policies) => {
    setPolicies(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Property Policies</h1>
        <p className="text-slate-500">Define the rules and regulations for guests staying at your property.</p>
      </div>

      <SectionCard title="General Policies">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Toggle enabled={policies.govId} onChange={() => togglePolicy('govId')} label="Government ID Required" />
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">Minimum Age for Check-in</label>
            <input type="number" defaultValue="18" className="input w-full" />
          </div>
          <Toggle enabled={policies.pets} onChange={() => togglePolicy('pets')} label="Pets Allowed" />
          <Toggle enabled={policies.smoking} onChange={() => togglePolicy('smoking')} label="Smoking Allowed" />
          <Toggle enabled={policies.parties} onChange={() => togglePolicy('parties')} label="Parties / Events Allowed" />
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">Quiet Hours</label>
            <input type="text" placeholder="e.g. 10:00 PM - 07:00 AM" className="input w-full" />
          </div>
        </div>
      </SectionCard>

      <SectionCard title="Occupancy Policies">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">Max Adults per Room</label>
            <input type="number" defaultValue="2" className="input w-full" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">Max Children per Room</label>
            <input type="number" defaultValue="1" className="input w-full" />
          </div>
          <Toggle enabled={policies.children} onChange={() => togglePolicy('children')} label="Children Allowed" />
          <Toggle enabled={policies.extraBeds} onChange={() => togglePolicy('extraBeds')} label="Extra Beds Available" />
        </div>
      </SectionCard>

      <SectionCard title="Check-in / Check-out Policies">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Toggle enabled={policies.earlyCheckin} onChange={() => togglePolicy('earlyCheckin')} label="Allow Early Check-in" />
          <Toggle enabled={policies.lateCheckout} onChange={() => togglePolicy('lateCheckout')} label="Allow Late Check-out" />
        </div>
      </SectionCard>

      <SectionCard title="Financial Policies">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">Advance Payment (%)</label>
            <input type="number" defaultValue="50" className="input w-full" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">Security Deposit</label>
            <input type="number" defaultValue="100" className="input w-full" />
          </div>
          <div className="md:col-span-2 space-y-2">
            <label className="text-sm font-semibold text-slate-700">Damage Liability Policy</label>
            <textarea className="input w-full h-24 resize-none" placeholder="Describe damage liability..."></textarea>
          </div>
        </div>
      </SectionCard>

      <div className="flex justify-end gap-3">
        <button className="btn-secondary px-6">Cancel</button>
        <button className="btn-primary px-6">Save Policies</button>
      </div>
    </div>
  );
};

export default PropertyPoliciesView;
