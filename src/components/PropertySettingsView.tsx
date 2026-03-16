import React, { useState } from 'react';
import { Clock, DollarSign, ShieldCheck, Globe, Percent, Bell } from 'lucide-react';
import { SectionCard, Toggle } from './UIComponents';

const PropertySettingsView = () => {
  const [notifications, setNotifications] = useState({
    email: true,
    sms: false,
    push: true
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Property Settings</h1>
          <p className="text-slate-500">Configure property-specific settings, policies, and preferences.</p>
        </div>
        <button className="btn-primary px-6">Save All Settings</button>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <SectionCard title="Operation Timing">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                <Clock className="w-4 h-4 text-slate-400" />
                Check-in Time
              </label>
              <input type="time" className="input w-full" defaultValue="14:00" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                <Clock className="w-4 h-4 text-slate-400" />
                Check-out Time
              </label>
              <input type="time" className="input w-full" defaultValue="11:00" />
            </div>
            <div className="md:col-span-2">
              <Toggle enabled={true} onChange={() => {}} label="Allow 24h Check-in" />
            </div>
          </div>
        </SectionCard>

        <SectionCard title="Localization & Currency">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                <Globe className="w-4 h-4 text-slate-400" />
                Default Currency
              </label>
              <select className="input w-full">
                <option>USD ($)</option>
                <option>EUR (€)</option>
                <option>GBP (£)</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                <Percent className="w-4 h-4 text-slate-400" />
                Local Tax Rate (%)
              </label>
              <input type="number" className="input w-full" defaultValue="12" />
            </div>
          </div>
        </SectionCard>

        <SectionCard title="Security & Policies">
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100">
              <div className="flex items-center gap-3">
                <ShieldCheck className="w-5 h-5 text-emerald-500" />
                <div>
                  <p className="text-sm font-bold text-slate-900">Government ID Required</p>
                  <p className="text-xs text-slate-500">Guests must provide ID on check-in</p>
                </div>
              </div>
              <Toggle enabled={true} onChange={() => {}} />
            </div>
            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100">
              <div className="flex items-center gap-3">
                <DollarSign className="w-5 h-5 text-blue-500" />
                <div>
                  <p className="text-sm font-bold text-slate-900">Security Deposit</p>
                  <p className="text-xs text-slate-500">Collect deposit on arrival</p>
                </div>
              </div>
              <Toggle enabled={false} onChange={() => {}} />
            </div>
          </div>
        </SectionCard>

        <SectionCard title="Communication Settings">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Bell className="w-5 h-5 text-primary" />
                <span className="text-sm font-medium text-slate-700">Email Notifications</span>
              </div>
              <Toggle enabled={notifications.email} onChange={(val) => setNotifications({...notifications, email: val})} />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Bell className="w-5 h-5 text-primary" />
                <span className="text-sm font-medium text-slate-700">SMS Alerts</span>
              </div>
              <Toggle enabled={notifications.sms} onChange={(val) => setNotifications({...notifications, sms: val})} />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Bell className="w-5 h-5 text-primary" />
                <span className="text-sm font-medium text-slate-700">Push Notifications</span>
              </div>
              <Toggle enabled={notifications.push} onChange={(val) => setNotifications({...notifications, push: val})} />
            </div>
          </div>
        </SectionCard>
      </div>
    </div>
  );
};

export default PropertySettingsView;
