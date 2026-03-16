import React, { useState } from 'react';
import {
  DollarSign,
  TrendingUp,
  ArrowDown,
  ArrowUp,
  Tag,
  Plus,
  RefreshCw,
  Download,
  Calendar,
  Zap,
  Percent,
  ChevronRight,
  MoreHorizontal,
  Edit2,
  Save,
  X,
  PlusCircle,
  Clock,
  Shield,
  Coffee
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// Reusable components from App.tsx/SettingsView logic
const SectionCard = ({ title, children, description, className }: { title: string; children: React.ReactNode; description?: string; className?: string; key?: React.Key }) => (
  <div className={`bg-white rounded-xl shadow-sm border border-slate-200 p-6 ${className || ''}`}>
    <div className="mb-6">
      <h3 className="text-lg font-bold text-slate-900">{title}</h3>
      {description && <p className="text-sm text-slate-500 mt-1">{description}</p>}
    </div>
    {children}
  </div>
);

const PricingManagementView = () => {
  const [activeTab, setActiveTab] = useState('base-pricing');
  const [isEditing, setIsEditing] = useState<string | null>(null);

  const pricingStats = [
    { label: 'Average Room Price', value: '$185', change: '+12%', trend: 'up', icon: DollarSign, color: 'blue' },
    { label: 'Lowest Price', value: '$120', change: '-5%', trend: 'down', icon: ArrowDown, color: 'emerald' },
    { label: 'Highest Price', value: '$450', change: '+20%', trend: 'up', icon: ArrowUp, color: 'orange' },
    { label: 'Active Promotions', value: '8', change: 'New: 2', trend: 'neutral', icon: Tag, color: 'purple' },
  ];

  const roomCategories = [
    { id: '1', name: 'Deluxe King Room', basePrice: 150, weekendPrice: 180, maxGuests: 2 },
    { id: '2', name: 'Executive Suite', basePrice: 250, weekendPrice: 300, maxGuests: 3 },
    { id: '3', name: 'Family Room', basePrice: 200, weekendPrice: 240, maxGuests: 4 },
    { id: '4', name: 'Standard Twin', basePrice: 120, weekendPrice: 140, maxGuests: 2 },
  ];

  const pricingRules = [
    { id: 'r1', title: 'High Demand Surge', type: 'Increase', condition: 'Occupancy > 80%', value: '+20%' },
    { id: 'r2', title: 'Last Minute Deal', type: 'Decrease', condition: 'Booking within 24h', value: '-15%' },
    { id: 'r3', title: 'Early Bird', type: 'Decrease', condition: 'Booking 30 days ahead', value: '-10%' },
  ];

  const ratePlans = [
    { id: 'rp1', name: 'Standard Rate', modifier: 'Base', policy: 'Flexible', icon: Clock },
    { id: 'rp2', name: 'Non-Refundable', modifier: '-10%', policy: 'Strict', icon: Shield },
    { id: 'rp3', name: 'Breakfast Included', modifier: '+$30', policy: 'Flexible', icon: Coffee },
  ];

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Pricing Management</h1>
          <p className="text-slate-500">Configure room prices, dynamic pricing rules, and rate plans.</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors">
            <Download className="w-4 h-4" />
            Import Pricing
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors">
            <RefreshCw className="w-4 h-4" />
            Bulk Update
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg text-sm font-semibold hover:bg-primary/90 transition-colors shadow-sm">
            <Plus className="w-4 h-4" />
            Add Rate Plan
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {pricingStats.map((stat, idx) => (
          <div key={idx} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow group">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-2 rounded-lg bg-${stat.color}-50 text-${stat.color}-600 group-hover:scale-110 transition-transform`}>
                <stat.icon className="w-5 h-5" />
              </div>
              <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                stat.trend === 'up' ? 'bg-emerald-50 text-emerald-600' : 
                stat.trend === 'down' ? 'bg-rose-50 text-rose-600' : 'bg-slate-50 text-slate-600'
              }`}>
                {stat.change}
              </span>
            </div>
            <h4 className="text-sm font-medium text-slate-500">{stat.label}</h4>
            <p className="text-2xl font-bold text-slate-900 mt-1">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-200 gap-8">
        {[
          { id: 'base-pricing', label: 'Base Pricing', icon: DollarSign },
          { id: 'dynamic-pricing', label: 'Dynamic Rules', icon: Zap },
          { id: 'seasonal', label: 'Seasonal Calendar', icon: Calendar },
          { id: 'promotions', label: 'Promotions', icon: Tag },
          { id: 'rate-plans', label: 'Rate Plans', icon: PlusCircle },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 py-4 px-1 text-sm font-medium transition-colors relative ${
              activeTab === tab.id ? 'text-primary' : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            <tab.icon className="w-4 h-4" />
            {tab.label}
            {activeTab === tab.id && (
              <motion.div
                layoutId="activeTabPricing"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
              />
            )}
          </button>
        ))}
      </div>

      {/* Content Area */}
      <div className="mt-6">
        {activeTab === 'base-pricing' && (
          <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
              <h3 className="font-bold text-slate-900">Room Category Base Pricing</h3>
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <Clock className="w-3 h-3" />
                Last updated: 2 hours ago
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-white border-b border-slate-100">
                    <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Room Category</th>
                    <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Base Price</th>
                    <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Weekend Price</th>
                    <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Max Guests</th>
                    <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {roomCategories.map((room) => (
                    <tr key={room.id} className="hover:bg-slate-50/50 transition-colors group">
                      <td className="px-6 py-4">
                        <div className="font-semibold text-slate-900">{room.name}</div>
                        <div className="text-xs text-slate-500">ID: {room.id}</div>
                      </td>
                      <td className="px-6 py-4">
                        {isEditing === room.id ? (
                          <div className="relative w-28">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">$</span>
                            <input
                              type="number"
                              defaultValue={room.basePrice}
                              className="w-full pl-7 pr-3 py-1.5 border border-primary rounded-lg text-sm focus:ring-1 focus:ring-primary outline-none"
                              autoFocus
                            />
                          </div>
                        ) : (
                          <div className="text-slate-900 font-medium">${room.basePrice}</div>
                        )}
                      </td>
                      <td className="px-6 py-4 text-slate-600">${room.weekendPrice}</td>
                      <td className="px-6 py-4">
                        <span className="px-2 py-1 bg-slate-100 rounded-md text-xs font-medium text-slate-600">
                          {room.maxGuests} Adults
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          {isEditing === room.id ? (
                            <>
                              <button 
                                onClick={() => setIsEditing(null)}
                                className="p-1.5 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                              >
                                <Save className="w-4 h-4" />
                              </button>
                              <button 
                                onClick={() => setIsEditing(null)}
                                className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                              >
                                <X className="w-4 h-4" />
                              </button>
                            </>
                          ) : (
                            <button 
                              onClick={() => setIsEditing(room.id)}
                              className="p-2 text-slate-400 hover:text-primary hover:bg-primary/5 rounded-lg transition-all opacity-0 group-hover:opacity-100"
                            >
                              <Edit2 className="w-4 h-4" />
                            </button>
                          )}
                          <button className="p-2 text-slate-400 hover:text-slate-600 rounded-lg">
                            <MoreHorizontal className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex justify-between items-center">
              <p className="text-xs text-slate-500 font-medium">Auto-save is enabled</p>
              <button className="text-sm text-primary font-semibold hover:underline">View All Categories</button>
            </div>
          </div>
        )}

        {activeTab === 'dynamic-pricing' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pricingRules.map((rule) => (
              <SectionCard key={rule.id} title={rule.title}>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-slate-400 uppercase">Status</span>
                    <div className="flex items-center gap-1.5 px-2 py-0.5 bg-emerald-100 text-emerald-700 rounded-full text-[10px] font-bold">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      ACTIVE
                    </div>
                  </div>
                  <div className="p-4 bg-slate-50 rounded-xl space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-500">Condition</span>
                      <span className="font-semibold text-slate-900">{rule.condition}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-500">Adjustment</span>
                      <span className={`font-bold ${rule.type === 'Increase' ? 'text-rose-600' : 'text-emerald-600'}`}>
                        {rule.value}
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button className="flex-1 py-2 text-xs font-bold text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">Edit</button>
                    <button className="px-3 py-2 text-slate-400 hover:text-rose-600 transition-colors">
                      <MoreHorizontal className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </SectionCard>
            ))}
            <div className="border-2 border-dashed border-slate-200 rounded-xl p-8 flex flex-col items-center justify-center text-center hover:border-primary/50 hover:bg-primary/5 transition-all cursor-pointer group">
              <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors text-slate-400 group-hover:text-primary">
                <Plus className="w-6 h-6" />
              </div>
              <h4 className="font-bold text-slate-900">New Automated Rule</h4>
              <p className="text-xs text-slate-500 mt-1">Scale pricing based on demand or occupancy</p>
            </div>
          </div>
        )}

        {activeTab === 'seasonal' && (
          <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden p-6">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="text-lg font-bold text-slate-900">Seasonal Pricing Calendar</h3>
                <p className="text-sm text-slate-500">Highlight peak dates and set special rates.</p>
              </div>
              <div className="flex items-center gap-4 bg-slate-50 p-2 rounded-lg">
                <button className="p-1 px-3 bg-white shadow-sm rounded-md text-sm font-semibold text-primary">Monthly</button>
                <button className="p-1 px-3 text-sm font-medium text-slate-500 hover:text-slate-700">Yearly</button>
              </div>
            </div>
            
            <div className="aspect-[16/9] lg:aspect-[21/9] bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-center">
              <div className="text-center space-y-3">
                <Calendar className="w-12 h-12 text-slate-200 mx-auto" />
                <p className="text-slate-400 font-medium">Interactive Calendar Mockup</p>
                <button className="text-sm font-bold text-primary px-6 py-2 bg-white border border-slate-200 rounded-full hover:shadow-md transition-all">
                  Set Special Dates
                </button>
              </div>
            </div>

            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { name: 'Christmas & NY', date: 'Dec 15 - Jan 05', price: '+50%' },
                { name: 'Summer Holiday', date: 'Jun 01 - Aug 31', price: '+25%' },
                { name: 'Low Season', date: 'Oct 01 - Nov 30', price: '-15%' },
              ].map((season, i) => (
                <div key={i} className="p-4 border border-slate-100 rounded-xl flex items-center justify-between hover:border-primary/20 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/5 flex items-center justify-center text-primary font-bold text-lg">
                      {season.price.replace('+', '').replace('-', '').replace('%', '')}
                    </div>
                    <div>
                      <div className="font-bold text-slate-900 text-sm">{season.name}</div>
                      <div className="text-[11px] text-slate-500 font-medium">{season.date}</div>
                    </div>
                  </div>
                  <div className={`text-xs font-bold ${season.price.startsWith('+') ? 'text-rose-600' : 'text-emerald-600'}`}>
                    {season.price}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'promotions' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { title: 'Early Bird Discount', icon: TrendingUp, type: 'Percentage', value: '15%', color: 'blue', desc: 'Book 60 days in advance' },
                { title: 'Long Stay Deal', icon: Percent, type: 'Flat', value: '$50 Off', color: 'indigo', desc: 'Stay for 7+ nights' },
                { title: 'Flash Sale', icon: Zap, type: 'Percentage', value: '25%', color: 'orange', desc: 'Limited time weekend deal' },
              ].map((promo, i) => (
                <div key={i} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm relative overflow-hidden group">
                   <div className={`absolute top-0 right-0 w-24 h-24 bg-${promo.color}-50 rounded-full -mr-8 -mt-8 transition-transform group-hover:scale-125`} />
                   <div className="relative">
                    <div className={`w-10 h-10 rounded-lg bg-${promo.color}-100 text-${promo.color}-600 flex items-center justify-center mb-4`}>
                      <Gift className="w-5 h-5" />
                    </div>
                    <h4 className="font-bold text-slate-900">{promo.title}</h4>
                    <p className="text-xs text-slate-500 mt-1">{promo.desc}</p>
                    <div className="mt-6 flex items-center justify-between">
                      <span className="text-xl font-black text-slate-900">{promo.value}</span>
                      <button className="text-xs font-bold text-primary hover:underline">Settings</button>
                    </div>
                   </div>
                </div>
              ))}
            </div>
            
            <SectionCard title="Create New Promotion" description="Target specific guest segments with custom offers.">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700">Promotion Name</label>
                  <input type="text" className="input w-full" placeholder="e.g. Black Friday Special" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700">Discount Segment</label>
                  <select className="input w-full">
                    <option>All Guests</option>
                    <option>Returning Guests</option>
                    <option>Direct Bookings</option>
                    <option>Corporate Partners</option>
                  </select>
                </div>
                <div className="flex justify-end md:col-span-2">
                   <button className="btn-primary w-full md:w-auto px-8">Create Offer</button>
                </div>
              </div>
            </SectionCard>
          </div>
        )}

        {activeTab === 'rate-plans' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {ratePlans.map((plan) => (
              <div key={plan.id} className="bg-white border border-slate-200 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400">
                      <plan.icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900">{plan.name}</h4>
                      <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Plan ID: {plan.id}</div>
                    </div>
                  </div>
                  <div className="text-sm font-bold text-primary bg-primary/5 px-2 py-1 rounded-lg">
                    {plan.modifier}
                  </div>
                </div>
                <div className="p-6 space-y-4">
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    <span className="text-xs font-medium text-slate-600">Cancellation: <b>{plan.policy}</b></span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                    <span className="text-xs font-medium text-slate-600">Includes: <b>Taxes, Utilities</b></span>
                  </div>
                  <div className="pt-4 flex gap-2">
                    <button className="flex-1 btn-secondary text-xs py-2">Edit Plan</button>
                    <button className="flex-1 btn-primary text-xs py-2">Sync OTAs</button>
                  </div>
                </div>
              </div>
            ))}
            <div className="bg-slate-50 border-2 border-dashed border-slate-200 rounded-xl p-8 flex flex-col items-center justify-center text-center opacity-60 hover:opacity-100 hover:border-primary transition-all cursor-pointer group">
               <Plus className="w-8 h-8 text-slate-300 group-hover:text-primary mb-3" />
               <h4 className="font-bold text-slate-500 group-hover:text-slate-900">Add New Plan</h4>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Internal icon hack for missing imports
const Gift = ({ className }: { className?: string }) => <Tag className={className} />;

export default PricingManagementView;
