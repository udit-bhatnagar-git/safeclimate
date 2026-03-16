import React, { useState } from 'react';
import { Sparkles, Check, X, CreditCard, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { SectionCard } from './UIComponents';

const SubscriptionView = ({ subscription, setSubscription }: { subscription: any; setSubscription: any }) => {
  const [showPayment, setShowPayment] = useState<string | null>(null);

  const plans = [
    {
      id: 'basic',
      name: 'Basic',
      price: 9,
      features: ['Manage 1 property', 'Up to 10 rooms', 'Basic analytics', 'Email support'],
      color: 'blue'
    },
    {
      id: 'professional',
      name: 'Professional',
      price: 29,
      features: ['Manage up to 5 properties', 'Unlimited rooms', 'Booking analytics', 'Staff management', 'Priority support'],
      color: 'indigo',
      popular: true
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      price: 79,
      features: ['Unlimited properties', 'Unlimited rooms', 'Advanced analytics', 'Staff & role management', 'Dedicated support'],
      color: 'slate'
    }
  ];

  const handleSelectPlan = (planId: string) => {
    setShowPayment(planId);
  };

  const confirmPayment = () => {
    setSubscription({
      ...subscription,
      status: 'active',
      planId: showPayment,
      startedAt: new Date(),
      expiresAt: new Date(new Date().getTime() + 30 * 24 * 60 * 60 * 1000),
    });
    setShowPayment(null);
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1>Subscription</h1>
          <p>Manage your plan and billing information.</p>
        </div>
        {subscription.status === 'trial' && (
          <div className="px-4 py-2 bg-amber-50 border border-amber-100 rounded-xl flex items-center gap-3">
            <Sparkles className="w-5 h-5 text-amber-500" />
            <div>
              <p className="text-sm font-bold text-amber-900">Free Trial Active</p>
              <p className="text-xs text-amber-700">Expires in {Math.ceil((subscription.trialEndDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))} days</p>
            </div>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className={`relative flex flex-col p-8 rounded-2xl border-2 transition-all ${subscription.planId === plan.id && subscription.status === 'active'
              ? 'border-primary bg-primary/5 shadow-lg'
              : 'border-border bg-white hover:border-slate-300'
              }`}
          >
            {plan.popular && (
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-primary text-white text-xs font-bold rounded-full uppercase tracking-wider">
                Most Popular
              </div>
            )}
            <div className="mb-8">
              <h3 className="text-xl font-bold text-slate-900 mb-2">{plan.name}</h3>
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-bold text-slate-900">${plan.price}</span>
                <span className="text-slate-500">/ month</span>
              </div>
            </div>
            <ul className="space-y-4 mb-8 flex-1">
              {plan.features.map((feature, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-slate-600">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                  {feature}
                </li>
              ))}
            </ul>
            <button
              onClick={() => handleSelectPlan(plan.id)}
              disabled={subscription.planId === plan.id && subscription.status === 'active'}
              className={`w-full py-3 rounded-xl font-bold transition-all ${subscription.planId === plan.id && subscription.status === 'active'
                ? 'bg-emerald-500 text-white cursor-default'
                : 'bg-primary text-white hover:bg-primary-hover shadow-md hover:shadow-lg active:scale-[0.98]'
                }`}
            >
              {subscription.planId === plan.id && subscription.status === 'active' ? 'Current Plan' : 'Choose Plan'}
            </button>
          </div>
        ))}
      </div>

      <SectionCard title="Billing History">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-border">
                <th className="pb-4">Date</th>
                <th className="pb-4">Plan</th>
                <th className="pb-4">Amount</th>
                <th className="pb-4">Status</th>
                <th className="pb-4 text-right">Invoice</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {subscription.status === 'active' ? (
                <tr>
                  <td className="py-4 text-sm text-slate-900">{new Date().toLocaleDateString()}</td>
                  <td className="py-4 text-sm text-slate-600">{plans.find(p => p.id === subscription.planId)?.name}</td>
                  <td className="py-4 text-sm text-slate-900 font-bold">${plans.find(p => p.id === subscription.planId)?.price}.00</td>
                  <td className="py-4">
                    <span className="px-2 py-1 rounded-full bg-emerald-100 text-emerald-700 text-[10px] font-bold uppercase tracking-wider">Paid</span>
                  </td>
                  <td className="py-4 text-right">
                    <button className="text-primary hover:underline text-sm font-bold">Download</button>
                  </td>
                </tr>
              ) : (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-slate-500 italic">No billing history available.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </SectionCard>

      <AnimatePresence>
        {showPayment && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden"
            >
              <div className="p-6 border-b border-border flex items-center justify-between">
                <h3 className="text-xl font-bold text-slate-900">Complete Payment</h3>
                <button onClick={() => setShowPayment(null)} className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
                  <X className="w-5 h-5 text-slate-400" />
                </button>
              </div>
              <div className="p-8 space-y-6">
                <div className="p-4 bg-slate-50 rounded-xl border border-border">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-slate-600">Selected Plan</span>
                    <span className="text-sm font-bold text-slate-900">{plans.find(p => p.id === showPayment)?.name}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-600">Total Amount</span>
                    <span className="text-lg font-bold text-primary">${plans.find(p => p.id === showPayment)?.price}.00</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700">Card Number</label>
                    <div className="relative">
                      <input type="text" className="input pr-12" placeholder="0000 0000 0000 0000" defaultValue="4242 4242 4242 4242" />
                      <CreditCard className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-slate-700">Expiry Date</label>
                      <input type="text" className="input" placeholder="MM/YY" defaultValue="12/26" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-slate-700">CVC</label>
                      <input type="text" className="input" placeholder="000" defaultValue="123" />
                    </div>
                  </div>
                </div>

                <button
                  onClick={confirmPayment}
                  className="w-full btn-primary h-12 text-lg"
                >
                  Pay & Activate
                </button>
                <p className="text-center text-xs text-slate-400">
                  Secured by Stripe. Your data is encrypted.
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SubscriptionView;
