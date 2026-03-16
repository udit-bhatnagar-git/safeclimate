import React from 'react';
import { Upload } from 'lucide-react';
import { SectionCard } from './UIComponents';

const KYCDocumentsView = () => (
  <div className="space-y-6">
    <div>
      <h1 className="text-2xl font-bold text-slate-900">KYC Documents</h1>
      <p className="text-slate-500">Upload required documents for verification.</p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {[
        { title: 'Business License', description: 'Copy of your valid business registration' },
        { title: 'Identity Proof', description: 'Passport or National ID of the owner' },
        { title: 'Address Proof', description: 'Utility bill or bank statement' },
        { title: 'Tax Document', description: 'Latest tax filing or registration certificate' },
      ].map((doc) => (
        <SectionCard key={doc.title} title={doc.title} description={doc.description}>
          <div className="border-2 border-dashed border-slate-200 rounded-xl p-6 text-center hover:border-primary transition-colors cursor-pointer">
            <Upload className="w-6 h-6 text-slate-400 mx-auto mb-2" />
            <p className="text-xs font-medium text-slate-900">Upload Document</p>
          </div>
        </SectionCard>
      ))}
    </div>

    <div className="flex justify-end gap-3">
      <button className="btn-secondary px-6">Cancel</button>
      <button className="btn-primary px-6">Upload All</button>
    </div>
  </div>
);

export default KYCDocumentsView;
