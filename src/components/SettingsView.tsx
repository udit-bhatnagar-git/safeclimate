import React, { useState } from 'react';
import {
  User,
  Building,
  Bell,
  Shield,
  CreditCard,
  Globe,
  Users,
  Languages,
  Code,
  Lock,
  Trash2,
  Camera,
  Mail,
  Phone,
  Check,
  Plus,
  ExternalLink,
  ChevronRight,
  Info,
  Smartphone,
  History,
  Layout,
  RefreshCw,
  LogOut,
  AppWindow,
  Download,
  AlertTriangle
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// Reuse Toggle component pattern
const Toggle = ({ enabled, onChange, label }: { enabled: boolean; onChange: (val: boolean) => void; label?: string }) => (
  <div className="flex items-center gap-3">
    <button
      onClick={() => onChange(!enabled)}
      className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${enabled ? 'bg-[#2F80ED]' : 'bg-slate-200'
        }`}
    >
      <span
        className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${enabled ? 'translate-x-5' : 'translate-x-0'
          }`}
      />
    </button>
    {label && <span className="text-sm font-medium text-slate-700">{label}</span>}
  </div>
);

const SettingsSection = ({ title, children, description }: { title: string; children: React.ReactNode; description?: string }) => (
  <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
    <div className="pb-4 border-b border-slate-100">
      <h2 className="text-xl font-bold text-slate-900">{title}</h2>
      {description && <p className="text-sm text-slate-500 mt-1">{description}</p>}
    </div>
    <div className="grid gap-6">
      {children}
    </div>
  </div>
);

const SettingsCard = ({ title, description, children, icon: Icon, badge }: { title: string; description?: string; children: React.ReactNode; icon?: any; badge?: string }) => (
  <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
    <div className="p-6 border-b border-slate-50 flex items-center justify-between">
      <div className="flex items-center gap-3">
        {Icon && <div className="p-2 bg-slate-50 rounded-lg text-slate-600"><Icon className="w-5 h-5" /></div>}
        <div>
          <h3 className="text-base font-semibold text-slate-900">{title}</h3>
          {description && <p className="text-sm text-slate-500">{description}</p>}
        </div>
      </div>
      {badge && <span className="px-2 py-1 bg-primary/10 text-primary text-[10px] font-bold uppercase rounded-full">{badge}</span>}
    </div>
    <div className="p-6">
      {children}
    </div>
  </div>
);

const SettingsView = () => {
  const [activeTab, setActiveTab] = useState('profile');

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'organization', label: 'Organization', icon: Building },
    { id: 'properties', label: 'Properties', icon: Layout },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'billing', label: 'Billing & Subscription', icon: CreditCard },
    { id: 'integrations', label: 'Integrations', icon: AppWindow },
    { id: 'team', label: 'Team & Permissions', icon: Users },
    { id: 'localization', label: 'Localization', icon: Languages },
    { id: 'api', label: 'API & Developer', icon: Code },
    { id: 'privacy', label: 'Data & Privacy', icon: Lock },
    { id: 'danger', label: 'Danger Zone', icon: Trash2, danger: true },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'profile':
        return (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-5xl">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Profile Settings</h2>
              <p className="text-sm text-slate-500 mt-1">Manage your personal information and how it's displayed across the platform.</p>
            </div>

            <div className="bg-white rounded-xl border border-slate-200/80 shadow-[0_2px_8px_-2px_rgba(0,0,0,0.05)] overflow-hidden flex flex-col md:flex-row">
              {/* Left Column: Avatar Section */}
              <div className="w-full md:w-1/3 p-6 md:p-8 border-b md:border-b-0 md:border-r border-slate-100 bg-slate-50/50 flex flex-col items-center text-center">
                <div className="relative group mb-4">
                  <div className="w-28 h-28 rounded-full bg-white flex items-center justify-center border ring-4 ring-slate-50 shadow-sm overflow-hidden relative">
                    <User className="w-12 h-12 text-slate-300" />
                    <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center cursor-pointer backdrop-blur-[2px]">
                      <Camera className="w-6 h-6 text-white mb-1" />
                    </div>
                  </div>
                </div>
                <h3 className="text-base font-semibold text-slate-900">Alex Johnson</h3>
                <p className="text-sm text-slate-500 mb-8">alex@safeclimate.com</p>
                
                <div className="flex flex-col gap-3 w-full mt-auto">
                  <button className="w-full text-sm font-medium bg-white border border-slate-200 text-slate-700 py-2.5 px-4 rounded-lg hover:bg-slate-50 hover:text-slate-900 transition-colors shadow-sm">
                    Upload new photo
                  </button>
                  <button className="w-full text-sm font-medium text-slate-500 py-2.5 px-4 rounded-lg hover:bg-red-50 hover:text-red-600 transition-colors">
                    Remove photo
                  </button>
                </div>
              </div>

              {/* Right Column: Form Fields */}
              <div className="w-full md:w-2/3 p-6 md:p-8 flex flex-col">
                <div className="space-y-6 flex-1">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-700">First Name</label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input type="text" className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all placeholder:text-slate-400" defaultValue="Alex" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-700">Last Name</label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input type="text" className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all placeholder:text-slate-400" defaultValue="Johnson" />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">Email Address</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input type="email" className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all placeholder:text-slate-400" defaultValue="alex@safeclimate.com" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">Phone Number</label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input type="tel" className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all placeholder:text-slate-400" defaultValue="+1 (555) 000-0000" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">Timezone</label>
                    <div className="relative">
                      <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <select className="w-full pl-9 pr-8 py-2 bg-white border border-slate-200 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all appearance-none cursor-pointer">
                        <option>(GMT-08:00) Pacific Time</option>
                        <option>(GMT-05:00) Eastern Time</option>
                        <option>(GMT+00:00) UTC</option>
                        <option>(GMT+05:30) India Standard Time</option>
                      </select>
                      <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                        <ChevronRight className="w-4 h-4 rotate-90" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-8 mt-8 border-t border-slate-100 flex items-center justify-end">
                  <button className="px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white text-sm font-medium rounded-lg transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-slate-900/20 focus:ring-offset-1">
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
        );

      case 'notifications':
        return (
          <SettingsSection title="Notification Preferences" description="Control how and when you receive updates.">
            <SettingsCard title="System Notifications" description="Manage alerts for critical system events.">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-900">New Bookings</p>
                    <p className="text-xs text-slate-500">Get notified when a new reservation is made.</p>
                  </div>
                  <Toggle enabled={true} onChange={() => { }} />
                </div>
                <div className="flex items-center justify-between border-t border-slate-50 pt-6">
                  <div>
                    <p className="text-sm font-medium text-slate-900">Guest Reviews</p>
                    <p className="text-xs text-slate-500">Receive alerts for new guest feedback and ratings.</p>
                  </div>
                  <Toggle enabled={true} onChange={() => { }} />
                </div>
                <div className="flex items-center justify-between border-t border-slate-50 pt-6">
                  <div>
                    <p className="text-sm font-medium text-slate-900">Payment Confirmations</p>
                    <p className="text-xs text-slate-500">Notifications for processed payments and invoices.</p>
                  </div>
                  <Toggle enabled={true} onChange={() => { }} />
                </div>
              </div>
            </SettingsCard>

            <SettingsCard title="Marketing & Updates" description="Stay in the loop with news and features.">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-900">Product Updates</p>
                    <p className="text-xs text-slate-500">News about new features and improvements.</p>
                  </div>
                  <Toggle enabled={false} onChange={() => { }} />
                </div>
                <div className="flex items-center justify-between border-t border-slate-50 pt-6">
                  <div>
                    <p className="text-sm font-medium text-slate-900">Marketing Communications</p>
                    <p className="text-xs text-slate-500">Offers, promotions, and tips for your business.</p>
                  </div>
                  <Toggle enabled={false} onChange={() => { }} />
                </div>
              </div>
            </SettingsCard>
          </SettingsSection>
        );

      case 'security':
        return (
          <SettingsSection title="Security & Privacy" description="Manage your password, authentication, and sessions.">
            <SettingsCard title="Password Management" icon={Lock}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">Current Password</label>
                    <input type="password" placeholder="••••••••" className="input w-full" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">New Password</label>
                    <input type="password" placeholder="••••••••" className="input w-full" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">Confirm New Password</label>
                    <input type="password" placeholder="••••••••" className="input w-full" />
                  </div>
                  <button className="btn-primary w-full md:w-auto">Update Password</button>
                </div>
                <div className="bg-blue-50 p-6 rounded-xl border border-blue-100">
                  <h4 className="text-sm font-bold text-blue-900 flex items-center gap-2 mb-2">
                    <Info className="w-4 h-4" />
                    Password Requirements
                  </h4>
                  <ul className="space-y-2">
                    {[
                      'At least 12 characters long',
                      'Include at least one uppercase letter',
                      'Include at least one symbol (@, #, $)',
                      'Include at least one number',
                    ].map((req, i) => (
                      <li key={i} className="text-xs text-blue-700 flex items-center gap-2">
                        <Check className="w-3 h-3 text-blue-500" />
                        {req}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </SettingsCard>

            <SettingsCard title="Two-Factor Authentication" icon={Smartphone} badge="Recommended">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-900">Authenticator App</p>
                  <p className="text-xs text-slate-500">Secure your account with an authentication app like Google Authenticator.</p>
                </div>
                <button className="btn-secondary">Setup 2FA</button>
              </div>
            </SettingsCard>

            <SettingsCard title="Recent Login Sessions" icon={History}>
              <div className="overflow-hidden">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-slate-100">
                      <th className="py-3 text-left text-xs font-bold text-slate-500 uppercase">Device</th>
                      <th className="py-3 text-left text-xs font-bold text-slate-500 uppercase">Location</th>
                      <th className="py-3 text-left text-xs font-bold text-slate-500 uppercase">IP Address</th>
                      <th className="py-3 text-left text-xs font-bold text-slate-500 uppercase">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {[
                      { device: 'MacBook Pro (Chrome)', location: 'San Francisco, US', ip: '192.168.1.1', status: 'Current Session', current: true },
                      { device: 'iPhone 15 Pro (App)', location: 'San Francisco, US', ip: '192.168.1.45', status: '2 hours ago' },
                      { device: 'Windows PC (Firefox)', location: 'London, UK', ip: '102.34.12.5', status: 'Yesterday' },
                    ].map((session, i) => (
                      <tr key={session.device + i}>
                        <td className="py-4 text-sm text-slate-900 font-medium">{session.device}</td>
                        <td className="py-4 text-sm text-slate-500">{session.location}</td>
                        <td className="py-4 text-sm text-slate-500 font-mono text-xs">{session.ip}</td>
                        <td className="py-4 text-sm">
                          {session.current ? (
                            <span className="px-2 py-1 bg-green-50 text-green-600 text-[10px] font-bold rounded-lg border border-green-100 uppercase">
                              {session.status}
                            </span>
                          ) : (
                            <span className="text-slate-400">{session.status}</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="mt-6">
                <button className="text-sm font-semibold text-red-500 flex items-center gap-2 hover:bg-red-50 px-3 py-2 rounded-lg transition-colors">
                  <LogOut className="w-4 h-4" />
                  Sign out from all other devices
                </button>
              </div>
            </SettingsCard>
          </SettingsSection>
        );

      case 'billing':
        return (
          <SettingsSection title="Billing & Subscription" description="Manage your plan, payment methods, and billing history.">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                <SettingsCard title="Current Plan" icon={CreditCard}>
                  <div className="flex items-start justify-between">
                    <div className="flex gap-4">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                        <Smartphone className="w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="text-lg font-bold text-slate-900">Professional Plan</h4>
                        <p className="text-sm text-slate-500">Up to 5 properties • Unlimited bookings • Priority Support</p>
                        <div className="mt-4 flex items-baseline gap-1">
                          <span className="text-3xl font-bold text-slate-900">$29</span>
                          <span className="text-sm text-slate-500">/ per month</span>
                        </div>
                      </div>
                    </div>
                    <span className="px-3 py-1 bg-primary text-white text-[10px] font-bold rounded-full uppercase">Active</span>
                  </div>
                  <div className="mt-8 pt-8 border-t border-slate-100 flex gap-3">
                    <button className="btn-primary flex-1">Upgrade Plan</button>
                    <button className="btn-secondary flex-1">Manage Billing</button>
                  </div>
                </SettingsCard>

                <SettingsCard title="Payment Methods" icon={CreditCard}>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 border border-slate-200 rounded-xl">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-6 bg-slate-900 rounded flex items-center justify-center text-[8px] font-bold text-white uppercase italic">VISA</div>
                        <div>
                          <p className="text-sm font-semibold text-slate-900">Visa ending in 4242</p>
                          <p className="text-xs text-slate-500">Expires 12/26 • Default</p>
                        </div>
                      </div>
                      <button className="text-slate-400 hover:text-slate-600 font-medium text-sm">Edit</button>
                    </div>
                    <button className="flex items-center gap-2 text-sm font-semibold text-primary hover:bg-primary/5 px-4 py-2 rounded-lg transition-colors">
                      <Plus className="w-4 h-4" />
                      Add Payment Method
                    </button>
                  </div>
                </SettingsCard>
              </div>

              <div className="space-y-6">
                <SettingsCard title="Billing History" icon={History}>
                  <div className="space-y-4">
                    {[
                      { date: 'Mar 1, 2024', amount: '$29.00', id: '#INV-001' },
                      { date: 'Feb 1, 2024', amount: '$29.00', id: '#INV-002' },
                      { date: 'Jan 1, 2024', amount: '$29.00', id: '#INV-003' },
                    ].map((inv) => (
                      <div key={inv.id} className="flex items-center justify-between text-sm py-2">
                        <div>
                          <p className="font-medium text-slate-900">{inv.date}</p>
                          <p className="text-xs text-slate-400">{inv.id}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-slate-900">{inv.amount}</p>
                          <button className="text-[10px] uppercase font-bold text-primary hover:underline">Download</button>
                        </div>
                      </div>
                    ))}
                    <button className="w-full text-center text-xs font-semibold text-slate-500 hover:text-primary mt-4">View All Invoices</button>
                  </div>
                </SettingsCard>
              </div>
            </div>
          </SettingsSection>
        );

      case 'integrations':
        return (
          <SettingsSection title="Connected Services" description="Connect your account with external platforms.">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { name: 'Airbnb', icon: 'A', color: 'bg-[#FF5A5F]', status: 'Connected', desc: 'Sync bookings and availability.' },
                { name: 'Booking.com', icon: 'B', color: 'bg-[#003580]', status: 'Connected', desc: 'Real-time channel management.' },
                { name: 'Stripe', icon: 'S', color: 'bg-[#635BFF]', status: 'Connected', desc: 'Payments and payouts.' },
                { name: 'Google Calendar', icon: 'G', color: 'bg-[#4285F4]', status: 'Not Connected', desc: 'Sync your stay schedule.' },
                { name: 'WhatsApp', icon: 'W', color: 'bg-[#25D366]', status: 'Not Connected', desc: 'Automated guest messaging.' },
                { name: 'Mailchimp', icon: 'M', color: 'bg-[#FFE01B]', status: 'Not Connected', desc: 'Guest email marketing.' },
              ].map((app) => (
                <div key={app.name} className="bg-white p-6 rounded-2xl border border-slate-200 hover:shadow-lg transition-all group">
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-12 h-12 rounded-xl ${app.color} flex items-center justify-center text-white text-xl font-bold shadow-sm`}>
                      {app.icon}
                    </div>
                    {app.status === 'Connected' ? (
                      <span className="flex items-center gap-1 text-[10px] font-bold text-green-600 bg-green-50 px-2 py-1 rounded-full uppercase border border-green-100">
                        <Check className="w-3 h-3" />
                        Connected
                      </span>
                    ) : (
                      <button className="text-[10px] font-bold text-primary bg-primary/10 px-2 py-1 rounded-full uppercase hover:bg-primary hover:text-white transition-colors">
                        Connect
                      </button>
                    )}
                  </div>
                  <h4 className="text-base font-bold text-slate-900">{app.name}</h4>
                  <p className="text-xs text-slate-500 mt-1 mb-6 leading-relaxed">{app.desc}</p>
                  <div className="flex items-center justify-between pt-4 border-t border-slate-50">
                    <button className="text-[10px] font-bold text-slate-400 uppercase tracking-wider group-hover:text-primary transition-colors">View Details</button>
                    {app.status === 'Connected' && (
                      <button className="p-1.5 hover:bg-red-50 text-slate-300 hover:text-red-500 rounded-lg transition-colors">
                        <RefreshCw className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-8 bg-slate-900 rounded-2xl p-8 text-center overflow-hidden relative">
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 blur-[100px] rounded-full -mr-32 -mt-32"></div>
              <div className="relative z-10">
                <Globe className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">Need a custom integration?</h3>
                <p className="text-slate-400 max-w-md mx-auto mb-6">Our API allows you to build custom connections for your unique business needs.</p>
                <button className="btn-primary inline-flex items-center gap-2 px-8">
                  <Code className="w-4 h-4" />
                  Explore API Docs
                </button>
              </div>
            </div>
          </SettingsSection>
        );

      case 'team':
        return (
          <SettingsSection title="Team & Permissions" description="Manage your staff, roles, and access controls.">
            <SettingsCard title="Active Team Members" description="Currently there are 4 members in your organization.">
              <div className="overflow-hidden">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-slate-100 text-left">
                      <th className="py-3 text-xs font-bold text-slate-400 uppercase tracking-wider">Member</th>
                      <th className="py-3 text-xs font-bold text-slate-400 uppercase tracking-wider">Role</th>
                      <th className="py-3 text-xs font-bold text-slate-400 uppercase tracking-wider">Status</th>
                      <th className="py-3 text-right text-xs font-bold text-slate-400 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {[
                      { name: 'Alex Johnson', email: 'alex@safeclimate.com', role: 'Owner', status: 'Active', avatar: null },
                      { name: 'Sarah Miller', email: 'sarah@safeclimate.com', role: 'Manager', status: 'Active', avatar: null },
                      { name: 'David Wilson', email: 'david@safeclimate.com', role: 'Receptionist', status: 'Away', avatar: null },
                      { name: 'Emma Brown', email: 'emma@safeclimate.com', role: 'Housekeeping', status: 'Active', avatar: null },
                    ].map((member) => (
                      <tr key={member.email} className="group">
                        <td className="py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 font-bold border border-slate-200">
                              {member.name.split(' ').map(n => n[0]).join('')}
                            </div>
                            <div>
                              <p className="text-sm font-bold text-slate-900">{member.name}</p>
                              <p className="text-xs text-slate-500">{member.email}</p>
                            </div>
                          </div>
                        </td>
                        <td className="py-4">
                          <span className="px-2.5 py-1 bg-slate-100 text-slate-700 text-[10px] font-bold rounded-lg border border-slate-200">
                            {member.role}
                          </span>
                        </td>
                        <td className="py-4">
                          <div className="flex items-center gap-2">
                            <div className={`w-2 h-2 rounded-full ${member.status === 'Active' ? 'bg-green-500' : 'bg-amber-400'}`}></div>
                            <span className="text-sm text-slate-600">{member.status}</span>
                          </div>
                        </td>
                        <td className="py-4 text-right">
                          <button className="p-2 hover:bg-slate-50 text-slate-400 hover:text-slate-900 rounded-lg transition-colors">
                            <ExternalLink className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="mt-8 flex justify-between items-center bg-slate-50 p-4 rounded-xl">
                <p className="text-sm text-slate-500 font-medium">Invite new members to collaborate.</p>
                <button className="btn-primary px-6">
                  <Plus className="w-4 h-4" />
                  Invite Member
                </button>
              </div>
            </SettingsCard>
          </SettingsSection>
        );

      case 'danger':
        return (
          <SettingsSection title="Danger Zone" description="High-risk actions that cannot be undone.">
            <div className="grid gap-6">
              <div className="p-6 border-2 border-red-100 bg-red-50 rounded-2xl flex items-start justify-between">
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-xl bg-red-100 flex items-center justify-center text-red-600">
                    <LogOut className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-red-900">Transfer Organization</h4>
                    <p className="text-sm text-red-700/70 max-w-md mt-1">Transfer this organization and all its properties to another owner.</p>
                  </div>
                </div>
                <button className="px-4 py-2 bg-white border border-red-200 text-red-600 text-sm font-bold rounded-xl hover:bg-red-100 transition-colors">Transfer Ownership</button>
              </div>

              <div className="p-6 border-2 border-red-100 bg-red-50 rounded-2xl flex items-start justify-between">
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-xl bg-red-100 flex items-center justify-center text-red-600">
                    <Trash2 className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-red-900">Delete Account</h4>
                    <p className="text-sm text-red-700/70 max-w-md mt-1">Permanently remove your account, properties, and all associated data. This action is irreversible.</p>
                  </div>
                </div>
                <button className="px-4 py-2 bg-red-600 text-white text-sm font-bold rounded-xl hover:bg-red-700 transition-colors shadow-lg shadow-red-200">Delete Permanently</button>
              </div>
            </div>
          </SettingsSection>
        );

      case 'organization':
        return (
          <SettingsSection title="Organization Profile" description="Manage your company details and branding.">
            <SettingsCard title="Company Information" icon={Building}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">Company Name</label>
                    <input type="text" className="input w-full" defaultValue="SafeClimate Properties LLC" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">Tax ID / VAT</label>
                    <input type="text" className="input w-full" defaultValue="US987654321" />
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">Support Email</label>
                    <input type="email" className="input w-full" defaultValue="support@safeclimate.com" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">Website</label>
                    <input type="url" className="input w-full" defaultValue="https://safeclimate.com" />
                  </div>
                </div>
              </div>
            </SettingsCard>
          </SettingsSection>
        );

      case 'properties':
        return (
          <SettingsSection title="Global Settings" description="Global defaults for all your properties.">
            <SettingsCard title="Booking Defaults" icon={Layout}>
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-900">Auto-approve Bookings</p>
                    <p className="text-xs text-slate-500">Automatically accept reservations from trusted channels.</p>
                  </div>
                  <Toggle enabled={true} onChange={() => { }} />
                </div>
                <div className="flex items-center justify-between border-t border-slate-50 pt-6">
                  <div>
                    <p className="text-sm font-medium text-slate-900">Smart Pricing</p>
                    <p className="text-xs text-slate-500">Automatically adjust rates based on demand and seasonality.</p>
                  </div>
                  <Toggle enabled={false} onChange={() => { }} />
                </div>
              </div>
            </SettingsCard>
          </SettingsSection>
        );

      case 'localization':
        return (
          <SettingsSection title="Localization" description="Configure regional and language settings.">
            <SettingsCard title="Region Settings" icon={Languages}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">System Language</label>
                  <select className="input w-full">
                    <option>English (US)</option>
                    <option>Spanish (ES)</option>
                    <option>French (FR)</option>
                    <option>German (DE)</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">Default Currency</label>
                  <select className="input w-full">
                    <option>USD ($)</option>
                    <option>EUR (€)</option>
                    <option>GBP (£)</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">Date Format</label>
                  <select className="input w-full">
                    <option>MM/DD/YYYY</option>
                    <option>DD/MM/YYYY</option>
                    <option>YYYY-MM-DD</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">Distance Unit</label>
                  <select className="input w-full">
                    <option>Miles (mi)</option>
                    <option>Kilometers (km)</option>
                  </select>
                </div>
              </div>
            </SettingsCard>
          </SettingsSection>
        );

      case 'api':
        return (
          <SettingsSection title="API & Developer" description="Manage API keys and integration webhooks.">
            <SettingsCard title="API Keys" icon={Code}>
              <div className="space-y-4">
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between">
                  <div>
                    <p className="text-sm font-bold text-slate-900">Production Key</p>
                    <p className="text-xs font-mono text-slate-500 mt-1">pk_live_*******************</p>
                  </div>
                  <div className="flex gap-2">
                    <button className="text-sm font-semibold text-primary hover:underline">Reveal</button>
                    <button className="text-sm font-semibold text-slate-500 hover:text-slate-900">Revoke</button>
                  </div>
                </div>
                <button className="btn-secondary w-full">Generate New Key</button>
              </div>
            </SettingsCard>
          </SettingsSection>
        );

      case 'privacy':
        return (
          <SettingsSection title="Data & Privacy" description="Control how your data is handled and exported.">
            <SettingsCard title="Data Management" icon={Lock}>
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex gap-4">
                    <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                      <Download className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-900">Export All Data</p>
                      <p className="text-xs text-slate-500">Get a copy of all your properties, bookings, and guest data.</p>
                    </div>
                  </div>
                  <button className="btn-secondary">Request Export</button>
                </div>
                <div className="flex items-center justify-between border-t border-slate-50 pt-6">
                  <div className="flex gap-4">
                    <div className="p-2 bg-slate-100 text-slate-600 rounded-lg">
                      <AlertTriangle className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-900">Data Retention</p>
                      <p className="text-xs text-slate-500">Automatically delete guest data after a specified period.</p>
                    </div>
                  </div>
                  <select className="input w-48">
                    <option>Keep indefinitely</option>
                    <option>Delete after 1 year</option>
                    <option>Delete after 3 years</option>
                  </select>
                </div>
              </div>
            </SettingsCard>
          </SettingsSection>
        );

      default:
        return (
          <div className="flex flex-col items-center justify-center h-[400px] text-center">
            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center text-slate-400 mb-4">
              <Layout className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">Section Under Development</h3>
            <p className="text-slate-500 max-w-xs mt-2">We are currently building this section to provide you with more features.</p>
          </div>
        );
    }
  };

  return (
    <div className="flex h-[calc(100vh-64px)] w-full bg-[#F8FAFC]">
      {/* Left column (Settings Sidebar) */}
      <div className="w-72 bg-white border-r border-slate-200 flex flex-col h-full shrink-0">
        {/* Top section */}
        <div className="px-6 mb-4 pt-6 shrink-0">
          <h1 className="text-xl font-black text-slate-900 tracking-tight">Settings</h1>
          <p className="text-xs text-slate-400 font-medium mt-1 uppercase tracking-wider">Organization Hub</p>
        </div>

        {/* Middle section (Navigation) */}
        <div className="flex-1 overflow-y-auto px-3 custom-scrollbar py-2">
          <div className="space-y-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all group relative ${activeTab === tab.id
                  ? 'bg-primary text-white shadow-lg shadow-primary/20'
                  : tab.danger
                    ? 'text-red-500 hover:bg-red-50'
                    : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
                  }`}
              >
                <tab.icon className={`w-5 h-5 shrink-0 ${activeTab === tab.id ? 'text-white' : tab.danger ? 'text-red-400' : 'text-slate-400 group-hover:text-slate-600'}`} />
                <span className="flex-1 text-left">{tab.label}</span>
                {activeTab === tab.id && (
                  <motion.div
                    layoutId="active-pill"
                    className="absolute right-2 w-1.5 h-1.5 bg-white rounded-full"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Right column (Settings Content Area) */}
      <div className="flex-1 h-full overflow-y-auto bg-[#F8FAFC]">
        <div className="w-full mx-auto p-8 lg:p-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
            >
              {renderContent()}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default SettingsView;
