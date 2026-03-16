import React, { useState } from 'react';
import { Check } from 'lucide-react';
import PropertyInfoView from './PropertyInfoView';
import PropertyFeaturesView from './PropertyFeaturesView';
import PropertyPoliciesView from './PropertyPoliciesView';
import RoomCategoriesView from './RoomCategoriesView';
import PricingSetupView from './PricingSetupView';

interface AddPropertyWizardProps {
  onComplete: () => void;
}

const AddPropertyWizard = ({ onComplete }: AddPropertyWizardProps) => {
  const [step, setStep] = useState(1);
  const totalSteps = 5;

  const steps = [
    { title: 'Information', description: 'Property name and type' },
    { title: 'Location', description: 'Address and map details' },
    { title: 'Rooms', description: 'Room types and capacity' },
    { title: 'Pricing', description: 'Rates and taxes' },
    { title: 'Policies', description: 'Rules and regulations' },
  ];

  return (
    <div className="max-w-4xl mx-auto py-12">
      <div className="mb-12">
        <div className="flex items-center justify-between mb-8">
          {steps.map((s, i) => (
            <div key={i} className="flex flex-col items-center gap-2 flex-1 relative">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm z-10 ${step > i + 1 ? 'bg-emerald-500 text-white' :
                  step === i + 1 ? 'bg-primary text-white' : 'bg-slate-100 text-slate-400'
                }`}>
                {step > i + 1 ? <Check className="w-5 h-5" /> : i + 1}
              </div>
              <span className={`text-xs font-bold uppercase tracking-wider ${step === i + 1 ? 'text-primary' : 'text-slate-400'}`}>
                {s.title}
              </span>
              {i < steps.length - 1 && (
                <div className={`absolute top-5 left-[60%] w-[80%] h-0.5 ${step > i + 1 ? 'bg-emerald-500' : 'bg-slate-100'}`}></div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-xl border border-border p-8 mb-8">
        {step === 1 && <PropertyInfoView />}
        {step === 2 && <div className="p-12 text-center text-slate-500 italic">Location settings form...</div>}
        {step === 3 && <RoomCategoriesView />}
        {step === 4 && <PricingSetupView />}
        {step === 5 && <PropertyPoliciesView />}
      </div>

      <div className="flex items-center justify-between">
        <button
          onClick={() => setStep(Math.max(1, step - 1))}
          disabled={step === 1}
          className="btn-secondary px-8 disabled:opacity-50"
        >
          Previous Step
        </button>
        <button
          onClick={() => step === totalSteps ? onComplete() : setStep(step + 1)}
          className="btn-primary px-8"
        >
          {step === totalSteps ? 'Complete Setup' : 'Next Step'}
        </button>
      </div>
    </div>
  );
};

export default AddPropertyWizard;
