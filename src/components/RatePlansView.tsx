import React, { useState } from 'react';
import {
  Plus,
  Copy,
  Layers,
  TrendingUp,
  CheckCircle2,
  AlertCircle,
  Tag,
  Edit2,
  Trash2,
  Eye,
  Calendar,
  BarChart3,
  ChevronRight,
  MoreHorizontal,
  Clock,
  Shield,
  Coffee,
  Car,
  Wifi,
  Users,
  Info,
  ChevronDown,
  X,
  Search,
  Filter,
  Download,
  Save,
  ChevronLeft
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// --- Types ---

interface RatePlan {
  id: string;
  name: string;
  description: string;
  modifier: string;
  policy: string;
  minStay: number;
  maxStay: number;
  rooms: string[];
  inclusions: string[];
  status: 'active' | 'disabled';
  performance: {
    bookings: number;
    revenue: number;
    conversion: number;
  }
}

// --- Components ---

const StatCard = ({ label, value, icon: Icon, color, subtitle }: any) => (
  <div className="card hover:shadow-md transition-shadow">
    <div className="flex items-center justify-between mb-4">
      <div className={`p-2 rounded-lg bg-${color}-50 text-${color}-600`}>
        <Icon className="w-5 h-5" />
      </div>
    </div>
    <div className="metric-value">{value}</div>
    <div className="flex items-center justify-between mt-1">
      <span className="text-sm font-medium text-text-secondary">{label}</span>
      {subtitle && <span className="text-xs text-text-muted">{subtitle}</span>}
    </div>
  </div>
);

const RatePlanCard = ({ plan, onEdit, onDuplicate, onToggle }: { plan: RatePlan; onEdit: () => void; onDuplicate: () => void; onToggle: () => void }) => (
  <div className="card group hover:border-primary transition-colors">
    <div className="flex justify-between items-start mb-6">
      <div className="space-y-1">
        <h3 className="font-bold text-slate-900">{plan.name}</h3>
        <p className="text-xs text-text-muted">{plan.description}</p>
      </div>
      <div className="flex items-center gap-1">
        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${plan.status === 'active' ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-100 text-slate-400'}`}>
          {plan.status}
        </span>
        <button className="p-1.5 text-text-muted hover:text-text-primary rounded-lg transition-colors">
          <MoreHorizontal className="w-4 h-4" />
        </button>
      </div>
    </div>

    <div className="grid grid-cols-2 gap-4 mb-6">
      <div className="p-3 bg-slate-50 rounded-xl">
        <div className="text-[10px] font-bold text-text-muted uppercase mb-1">Price Modifier</div>
        <div className="text-sm font-bold text-primary">{plan.modifier}</div>
      </div>
      <div className="p-3 bg-slate-50 rounded-xl">
        <div className="text-[10px] font-bold text-text-muted uppercase mb-1">Min. Stay</div>
        <div className="text-sm font-bold text-slate-900">{plan.minStay} Nights</div>
      </div>
    </div>

    <div className="space-y-3 mb-6">
      <div className="flex items-center gap-2 text-xs">
        <Shield className="w-3.5 h-3.5 text-text-muted" />
        <span className="text-text-secondary font-medium">Policy: <b>{plan.policy}</b></span>
      </div>
      <div className="flex items-center gap-2 text-xs">
        <Layers className="w-3.5 h-3.5 text-text-muted" />
        <span className="text-text-secondary font-medium uppercase">{plan.rooms.length} Room Types Assigned</span>
      </div>
    </div>

    <div className="flex gap-2 pt-2 border-t border-slate-100 opacity-0 group-hover:opacity-100 transition-opacity">
      <button onClick={onEdit} className="flex-1 btn-secondary text-xs h-9">Edit</button>
      <button onClick={onDuplicate} className="p-2 btn-secondary h-9">
        <Copy className="w-4 h-4" />
      </button>
      <button onClick={onToggle} className={`p-2 btn-secondary h-9 ${plan.status === 'active' ? 'text-rose-600 hover:bg-rose-50' : 'text-emerald-600 hover:bg-emerald-50'}`}>
        {plan.status === 'active' ? <X className="w-4 h-4" /> : <CheckCircle2 className="w-4 h-4" />}
      </button>
    </div>
  </div>
);

// --- Main View ---

const RatePlansView = () => {
  const [activeView, setActiveView] = useState<'cards' | 'calendar' | 'analytics'>('cards');
  const [showCreateForm, setShowCreateForm] = useState(false);

  const ratePlans: RatePlan[] = [
    {
      id: '1',
      name: 'Standard Flexible Rate',
      description: 'Standard pricing with flexible cancellation.',
      modifier: 'Base Price',
      policy: 'Flexible',
      minStay: 1,
      maxStay: 14,
      rooms: ['Deluxe King', 'Executive Suite'],
      inclusions: ['Breakfast', 'High-speed Wi-Fi'],
      status: 'active',
      performance: { bookings: 145, revenue: 24500, conversion: 3.2 }
    },
    {
      id: '2',
      name: 'Non-Refundable Promo',
      description: 'Lower price for prepaid, non-refundable bookings.',
      modifier: '-15%',
      policy: 'Strict',
      minStay: 1,
      maxStay: 30,
      rooms: ['Standard Twin', 'Deluxe King'],
      inclusions: ['Wi-Fi'],
      status: 'active',
      performance: { bookings: 89, revenue: 15200, conversion: 4.5 }
    },
    {
      id: '3',
      name: 'Early Bird Special',
      description: 'Special rates for bookings 30 days in advance.',
      modifier: '-10%',
      policy: 'Moderate',
      minStay: 2,
      maxStay: 10,
      rooms: ['Executive Suite', 'Family Room'],
      inclusions: ['Breakfast', 'Parking'],
      status: 'active',
      performance: { bookings: 56, revenue: 12800, conversion: 2.8 }
    },
  ];

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1>Rate Plans</h1>
          <p>Create and manage pricing strategies for your rooms.</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <button className="btn-secondary">
            <Layers className="w-4 h-4" />
            Bulk Assign
          </button>
          <button className="btn-secondary">
            <Copy className="w-4 h-4" />
            Duplicate Plan
          </button>
          <button onClick={() => setShowCreateForm(true)} className="btn-primary">
            <Plus className="w-4 h-4" />
            Create Rate Plan
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard label="Total Rate Plans" value="12" icon={Layers} color="blue" />
        <StatCard label="Active Plans" value="8" icon={CheckCircle2} color="emerald" subtitle="4 Waiting" />
        <StatCard label="Plans With Discounts" value="5" icon={Tag} color="orange" />
        <StatCard label="Plans With Restrictions" value="3" icon={AlertCircle} color="purple" />
      </div>

      {/* View Tabs */}
      <div className="flex border-b border-border gap-8">
        {[
          { id: 'cards', label: 'Overview', icon: Eye },
          { id: 'calendar', label: 'Rate Calendar', icon: Calendar },
          { id: 'analytics', label: 'Performance', icon: BarChart3 },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveView(tab.id as any)}
            className={`flex items-center gap-2 py-4 px-1 text-sm font-medium transition-colors relative ${activeView === tab.id ? 'text-primary' : 'text-text-secondary hover:text-text-primary'
              }`}
          >
            <tab.icon className="w-4 h-4" />
            {tab.label}
            {activeView === tab.id && (
              <motion.div layoutId="activeTabRate" className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
            )}
          </button>
        ))}
      </div>

      {/* Content Area */}
      {activeView === 'cards' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ratePlans.map((plan) => (
            <RatePlanCard
              key={plan.id}
              plan={plan}
              onEdit={() => { }}
              onDuplicate={() => { }}
              onToggle={() => { }}
            />
          ))}
          <button
            onClick={() => setShowCreateForm(true)}
            className="border-2 border-dashed border-border rounded-[12px] p-8 flex flex-col items-center justify-center text-center hover:border-primary hover:bg-primary/5 transition-all group"
          >
            <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mb-4 group-hover:bg-primary/10 transition-colors">
              <Plus className="w-6 h-6 text-text-muted group-hover:text-primary" />
            </div>
            <h3 className="card-title">New Rate Plan</h3>
            <p className="text-xs text-text-muted mt-1">Add a new pricing strategy</p>
          </button>
        </div>
      )}

      {activeView === 'calendar' && (
        <div className="card h-[600px] flex flex-col">
          <div className="flex items-center justify-between mb-8">
            <h3 className="card-title">Rate Strategy Calendar</h3>
            <div className="flex gap-2">
              <button className="btn-secondary h-9 w-9 p-0 bg-primary/10 text-primary border-primary/20"><ChevronLeft className="w-4 h-4" /></button>
              <button className="btn-secondary h-9 px-4 font-bold">March 2026</button>
              <button className="btn-secondary h-9 w-9 p-0"><ChevronRight className="w-4 h-4" /></button>
            </div>
          </div>
          <div className="flex-1 bg-slate-50 border border-slate-100 rounded-xl flex items-center justify-center">
             <div className="text-center">
                <Calendar className="w-16 h-16 text-slate-200 mx-auto mb-4" />
                <p className="text-slate-400 font-medium font-sans">Interactive Rate Calendar Mockup</p>
                <p className="text-xs text-slate-400 mt-1">Visualize how plans apply across dates</p>
             </div>
          </div>
        </div>
      )}

      {activeView === 'analytics' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="card">
               <div className="flex items-center gap-3 mb-6">
                 <div className="w-10 h-10 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-600">
                   <TrendingUp className="w-5 h-5" />
                 </div>
                 <div>
                   <h4 className="font-bold text-slate-900">Top Performing Plan</h4>
                   <p className="text-xs text-text-muted">Most bookings generated</p>
                 </div>
               </div>
               <div className="space-y-4">
                 <div className="text-lg font-bold text-slate-900">Standard Flexible Rate</div>
                 <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                   <div className="bg-emerald-500 h-full w-[65%]" />
                 </div>
                 <div className="flex justify-between text-xs text-text-muted">
                    <span>145 Bookings</span>
                    <span>34% Conversion</span>
                 </div>
               </div>
            </div>
            
            <StatCard label="Avg. Conversion Rate" value="4.2%" icon={CheckCircle2} color="indigo" />
            <StatCard label="Incremental Revenue" value="$42,500" icon={TrendingUp} color="emerald" />
          </div>

          <div className="bg-white border border-border rounded-[12px] overflow-hidden">
            <div className="px-6 py-4 border-b border-border flex items-center justify-between bg-slate-50">
              <h3 className="font-bold text-slate-900">Plan Performance Analysis</h3>
              <button className="text-xs font-bold text-primary hover:underline">Download Report</button>
            </div>
            <div className="overflow-x-auto">
               <table className="w-full">
                 <thead>
                   <tr className="bg-white">
                     <th className="px-6 py-4">Rate Plan</th>
                     <th className="px-6 py-4">Bookings</th>
                     <th className="px-6 py-4">Revenue</th>
                     <th className="px-6 py-4">Conversion</th>
                     <th className="px-6 py-4">Efficiency</th>
                   </tr>
                 </thead>
                 <tbody className="divide-y divide-slate-50">
                    {ratePlans.map(plan => (
                      <tr key={plan.id} className="hover:bg-slate-50/50 transition-colors">
                        <td className="px-6 py-4 font-bold text-slate-900">{plan.name}</td>
                        <td className="px-6 py-4 font-medium">{plan.performance.bookings}</td>
                        <td className="px-6 py-4 font-medium text-emerald-600">${plan.performance.revenue.toLocaleString()}</td>
                        <td className="px-6 py-4 font-medium">{plan.performance.conversion}%</td>
                        <td className="px-6 py-4">
                           <div className="flex items-center gap-2">
                             <div className="w-16 bg-slate-100 h-1.5 rounded-full overflow-hidden">
                               <div className="bg-primary h-full" style={{ width: `${plan.performance.conversion * 20}%` }} />
                             </div>
                           </div>
                        </td>
                      </tr>
                    ))}
                 </tbody>
               </table>
            </div>
          </div>
        </div>
      )}

      {/* Create Rate Plan Form (Offcanvas) */}
      <AnimatePresence>
        {showCreateForm && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowCreateForm(false)}
              className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-40"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 h-full w-full max-w-[600px] bg-white shadow-2xl z-50 flex flex-col"
            >
              <div className="p-6 border-b border-border flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-slate-900">Create Rate Plan</h2>
                  <p className="text-sm text-text-secondary">Set up a new pricing strategy for your rooms.</p>
                </div>
                <button onClick={() => setShowCreateForm(false)} className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
                  <X className="w-5 h-5 text-text-muted" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6 space-y-8 custom-scrollbar">
                {/* General Info */}
                <div className="space-y-4">
                  <h3 className="card-title text-sm uppercase tracking-wider text-text-muted">General Information</h3>
                  <div className="grid grid-cols-1 gap-4">
                    <div className="space-y-1.5">
                      <label>Rate Plan Name</label>
                      <input type="text" className="input" placeholder="e.g. Non-Refundable Summer Special" />
                    </div>
                    <div className="space-y-1.5">
                      <label>Description (Internal)</label>
                      <textarea className="input min-h-[100px] resize-none py-3" placeholder="Briefly describe this plan's purpose..." />
                    </div>
                  </div>
                </div>

                {/* Configuration */}
                <div className="space-y-4">
                  <h3 className="card-title text-sm uppercase tracking-wider text-text-muted">Rate Configuration</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label>Room Categories</label>
                      <select className="input">
                        <option>Choose rooms...</option>
                        <option>All Room Types</option>
                        <option>Deluxe King</option>
                        <option>Executive Suite</option>
                      </select>
                    </div>
                    <div className="space-y-1.5">
                      <label>Price Modifier</label>
                      <div className="flex gap-2">
                         <select className="input w-1/3">
                            <option>%</option>
                            <option>$</option>
                         </select>
                         <input type="number" className="input flex-1" placeholder="e.g. -10" />
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <label>Inclusions</label>
                      <div className="flex flex-wrap gap-2 pt-1">
                        {['Breakfast', 'Parkings', 'Wi-Fi'].map(inc => (
                          <div key={inc} className="flex items-center gap-1.5 px-3 py-1 bg-slate-50 border border-slate-200 rounded-full text-xs font-medium">
                            {inc} <X className="w-3 h-3 text-text-muted cursor-pointer" />
                          </div>
                        ))}
                        <button className="text-[10px] font-bold text-primary flex items-center gap-1">+ Add Inclusion</button>
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <label>Cancellation Policy Mapping</label>
                      <select className="input">
                        <option>Select policy...</option>
                        <option>Flexible (24h)</option>
                        <option>Moderate (5 Days)</option>
                        <option>Strict (Non-Refundable)</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Constraints */}
                <div className="space-y-4">
                  <h3 className="card-title text-sm uppercase tracking-wider text-text-muted">Booking Restrictions</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label>Minimum Stay</label>
                      <input type="number" className="input" defaultValue={1} />
                    </div>
                    <div className="space-y-1.5">
                      <label>Maximum Stay</label>
                      <input type="number" className="input" defaultValue={30} />
                    </div>
                    <div className="space-y-1.5">
                      <label>Advance Booking (Days)</label>
                      <input type="number" className="input" placeholder="e.g. 14" />
                    </div>
                    <div className="space-y-1.5">
                      <label>Check-in Days</label>
                      <div className="flex gap-1.5 pt-1">
                         {['S','M','T','W','T','F','S'].map((d, i) => (
                           <div key={i} className={`w-8 h-8 rounded-lg flex items-center justify-center text-[10px] font-bold border cursor-pointer transition-colors ${i === 0 || i === 6 ? 'bg-primary text-white border-primary' : 'bg-white text-text-muted border-border'}`}>
                             {d}
                           </div>
                         ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6 border-t border-border flex items-center justify-end gap-3 bg-slate-50">
                <button onClick={() => setShowCreateForm(false)} className="px-6 py-2.5 text-sm font-bold text-text-secondary hover:text-text-primary transition-colors">Cancel</button>
                <button className="btn-primary px-10">Save Rate Plan</button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default RatePlansView;
