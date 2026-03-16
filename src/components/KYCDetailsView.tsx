import React from 'react';
import { SectionCard } from './UIComponents';

const KYCDetailsView = () => (
  <div className="space-y-6">
    <div>
      <h1 className="text-2xl font-bold text-slate-900">KYC Details</h1>
      <p className="text-slate-500">Verify your identity and business information.</p>
    </div>

    <SectionCard title="Business Information">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-700">Legal Business Name</label>
          <input type="text" className="input w-full" />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-700">Tax ID / GST Number</label>
          <input type="text" className="input w-full" />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-700">Business Type</label>
          <select className="input w-full">
            <option>Individual</option>
            <option>Partnership</option>
            <option>Company</option>
          </select>
        </div>
      </div>
    </SectionCard>

    <SectionCard title="Contact Person">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-700">Full Name</label>
          <input type="text" className="input w-full" />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-700">Designation</label>
          <input type="text" className="input w-full" />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-700">Email Address</label>
          <input type="email" className="input w-full" />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-700">Phone Number</label>
          <input type="tel" className="input w-full" />
        </div>
      </div>
    </SectionCard>

    <div className="flex justify-end gap-3">
      <button className="btn-secondary px-6">Cancel</button>
      <button className="btn-primary px-6">Submit Details</button>
    </div>
  </div>
);

export default KYCDetailsView;
