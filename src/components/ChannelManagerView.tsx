import React, { useState } from 'react';
import {
  Globe,
  RefreshCw,
  Settings,
  Plus,
  CheckCircle2,
  AlertCircle,
  Clock,
  ArrowUpRight,
  TrendingUp,
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  Calendar,
  DollarSign,
  AlertTriangle,
  History,
  MoreHorizontal
} from 'lucide-react';
import { motion } from 'motion/react';

const Badge = ({ children, variant = 'default' }: { children: React.ReactNode, variant?: 'default' | 'success' | 'warning' | 'error' | 'info' }) => {
  const variants = {
    default: 'bg-slate-100 text-slate-700',
    success: 'bg-emerald-100 text-emerald-700',
    warning: 'bg-amber-100 text-amber-700',
    error: 'bg-red-100 text-red-700',
    info: 'bg-blue-100 text-blue-700',
  };
  return (
    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${variants[variant]}`}>
      {children}
    </span>
  );
};

const MetricCard = ({ label, value, change, icon: Icon, color, bg }: any) => (
  <div className="card group hover:border-primary transition-all">
    <div className="flex items-center justify-between mb-4">
      <div className={`w-12 h-12 rounded-xl ${bg} flex items-center justify-center group-hover:scale-110 transition-transform`}>
        <Icon className={`w-6 h-6 ${color}`} />
      </div>
      {change && <span className="text-emerald-500 text-xs font-bold bg-emerald-50 px-2 py-1 rounded-full">{change}</span>}
    </div>
    <p className="text-[14px] font-medium text-text-secondary">{label}</p>
    <h2 className="metric-value mt-1">{value}</h2>
  </div>
);

const Section = ({ title, description, children, action }: any) => (
  <div className="bg-white rounded-xl shadow-sm border border-border overflow-hidden">
    <div className="p-6 border-b border-border flex items-center justify-between">
      <div>
        <h3 className="card-title">{title}</h3>
        {description && <p className="text-sm text-text-secondary mt-1">{description}</p>}
      </div>
      {action}
    </div>
    <div className="p-6">{children}</div>
  </div>
);

const Toggle = ({ enabled, onChange, label }: { enabled: boolean; onChange: (val: boolean) => void; label?: string }) => (
  <div className="flex items-center gap-3">
    <button
      onClick={() => onChange(!enabled)}
      className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${enabled ? 'bg-primary' : 'bg-slate-200'}`}
    >
      <span
        className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${enabled ? 'translate-x-5' : 'translate-x-0'}`}
      />
    </button>
    {label && <span className="text-sm font-medium text-slate-700">{label}</span>}
  </div>
);

const ChannelCard = ({ channel }: any) => (
  <div className="card border-border hover:border-primary transition-all group">
    <div className="flex items-start justify-between mb-6">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center group-hover:bg-primary/5 transition-colors">
          <img src={channel.logo} alt={channel.name} className="w-8 h-8 object-contain filter grayscale group-hover:grayscale-0 transition-all" />
        </div>
        <div>
          <h4 className="font-bold text-slate-900">{channel.name}</h4>
          <div className="flex items-center gap-1.5 mt-0.5">
            <div className={`w-1.5 h-1.5 rounded-full ${channel.status === 'Connected' ? 'bg-emerald-500' : 'bg-slate-300'}`} />
            <span className="text-xs text-slate-500 font-medium">{channel.status}</span>
          </div>
        </div>
      </div>
      <button className="p-2 hover:bg-slate-50 rounded-lg text-slate-400 group-hover:text-primary transition-colors">
        <Settings className="w-4 h-4" />
      </button>
    </div>

    <div className="grid grid-cols-2 gap-4 mb-6">
      <div>
        <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">Rooms Synced</p>
        <p className="text-sm font-bold text-slate-900">{channel.roomsSynced}</p>
      </div>
      <div>
        <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">Last Sync</p>
        <p className="text-sm font-bold text-slate-900">{channel.lastSync}</p>
      </div>
    </div>

    <button className="w-full btn-secondary h-10 group-hover:bg-primary group-hover:text-white group-hover:border-primary transition-all">
      <span>Manage Connection</span>
      <ExternalLink className="w-3.5 h-3.5" />
    </button>
  </div>
);

export default function ChannelManagerView() {
  const [syncSettings, setSyncSettings] = useState({
    availability: true,
    prices: true,
    restrictions: false,
    minStay: true
  });

  const channels = [
    { name: 'Airbnb', logo: 'https://cdn.worldvectorlogo.com/logos/airbnb.svg', status: 'Connected', lastSync: '2 mins ago', roomsSynced: '12/12' },
    { name: 'Booking.com', logo: 'https://cdn.worldvectorlogo.com/logos/bookingcom-1.svg', status: 'Connected', lastSync: '15 mins ago', roomsSynced: '10/12' },
    { name: 'Expedia', logo: 'https://cdn.worldvectorlogo.com/logos/expedia.svg', status: 'Disconnected', lastSync: 'Never', roomsSynced: '0/12' },
    { name: 'Agoda', logo: 'https://cdn.worldvectorlogo.com/logos/agoda.svg', status: 'Connected', lastSync: '1 hour ago', roomsSynced: '8/12' },
  ];

  const mappings = [
    { channelRoom: 'Deluxe Apartment (Airbnb)', pmsCategory: 'Deluxe King Suite', status: 'Mapped' },
    { channelRoom: 'Studio with Balcony (Airbnb)', pmsCategory: 'Standard Double', status: 'Mapped' },
    { channelRoom: 'Luxury Suite (Booking.com)', pmsCategory: 'Elite Executive Suite', status: 'Mapped' },
    { channelRoom: 'Classic Room (Agoda)', pmsCategory: 'Standard Double', status: 'Pending' },
  ];

  const bookings = [
    { id: 'EXT-99281', channel: 'Airbnb', guest: 'Marcus Aurelius', checkin: 'Mar 20, 2026', checkout: 'Mar 25, 2026', room: 'Deluxe King Suite', status: 'Confirmed' },
    { id: 'EXT-99282', channel: 'Booking.com', guest: 'Livia Drusilla', checkin: 'Mar 22, 2026', checkout: 'Mar 24, 2026', room: 'Standard Double', status: 'Confirmed' },
    { id: 'EXT-99283', channel: 'Airbnb', guest: 'Tiberius Claudius', checkin: 'Mar 25, 2026', checkout: 'Apr 02, 2026', room: 'Deluxe King Suite', status: 'Modified' },
    { id: 'EXT-99284', channel: 'Agoda', guest: 'Julia Major', checkin: 'Mar 28, 2026', checkout: 'Mar 30, 2026', room: 'Standard Double', status: 'Cancelled' },
  ];

  const syncLogs = [
    { time: '16:05:22', event: 'Price update sent to Airbnb', result: 'Success', details: '12 rooms updated' },
    { time: '15:58:10', event: 'Availability sync with Booking.com', result: 'Success', details: 'No changes detected' },
    { time: '15:45:05', event: 'New booking imported: EXT-99283', result: 'Success', details: 'Airbnb -> PMS' },
    { time: '15:30:12', event: 'Expedia sync attempt', result: 'Failed', details: 'API Authentication Error', error: true },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Channel Manager</h1>
          <p className="text-slate-500 mt-1">Connect and synchronize external booking platforms in real-time.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="btn-secondary">
            <Settings className="w-4 h-4" />
            <span>Channel Settings</span>
          </button>
          <button className="btn-secondary">
            <RefreshCw className="w-4 h-4" />
            <span>Sync Now</span>
          </button>
          <button className="btn-primary">
            <Plus className="w-4 h-4" />
            <span>Connect Channel</span>
          </button>
        </div>
      </div>

      {/* Stats Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard label="Connected Channels" value="3 / 12" change="+1" icon={Globe} color="text-primary" bg="bg-primary/5" />
        <MetricCard label="Rooms Synced" value="30 / 36" change="+4.3%" icon={CheckCircle2} color="text-emerald-600" bg="bg-emerald-50" />
        <MetricCard label="Pending Updates" value="2" icon={Clock} color="text-amber-600" bg="bg-amber-50" />
        <MetricCard label="Last Sync Result" value="Success" icon={ShieldCheck} color="text-emerald-600" bg="bg-emerald-50" />
      </div>

      {/* Connected Channels Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-slate-900">Connected Channels</h2>
          <button className="text-sm font-bold text-primary hover:underline">Manage All</button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {channels.map((channel, i) => (
            <ChannelCard key={i} channel={channel} />
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        {/* Room Mapping Table */}
        <Section 
          title="Room Mapping" 
          description="Map channel room names to PMS room categories."
          action={<button className="text-sm font-bold text-primary hover:underline">Auto-Map All</button>}
        >
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-border">
                  <th className="pb-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Channel Room Name</th>
                  <th className="pb-4 text-xs font-bold text-slate-400 uppercase tracking-wider">PMS Category</th>
                  <th className="pb-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Status</th>
                  <th className="pb-4 text-xs font-bold text-slate-400 uppercase tracking-wider text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {mappings.map((mapping, i) => (
                  <tr key={i} className="group">
                    <td className="py-4">
                      <div className="flex items-center gap-2">
                        <Globe className="w-3.5 h-3.5 text-slate-400" />
                        <span className="text-sm font-semibold text-slate-900">{mapping.channelRoom}</span>
                      </div>
                    </td>
                    <td className="py-4 text-sm text-slate-600 font-medium">{mapping.pmsCategory}</td>
                    <td className="py-4">
                      <Badge variant={mapping.status === 'Mapped' ? 'success' : 'warning'}>{mapping.status}</Badge>
                    </td>
                    <td className="py-4 text-right">
                      <button className="text-sm font-bold text-primary hover:underline">Edit</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Section>

        {/* Sync Settings & Analysis */}
        <div className="space-y-8">
          <Section title="Price & Availability Sync" description="Control what data is synchronized with external channels.">
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Toggle enabled={syncSettings.availability} onChange={(val) => setSyncSettings(prev => ({...prev, availability: val}))} label="Room Availability" />
                <Toggle enabled={syncSettings.prices} onChange={(val) => setSyncSettings(prev => ({...prev, prices: val}))} label="Room Prices" />
                <Toggle enabled={syncSettings.restrictions} onChange={(val) => setSyncSettings(prev => ({...prev, restrictions: val}))} label="Booking Restrictions" />
                <Toggle enabled={syncSettings.minStay} onChange={(val) => setSyncSettings(prev => ({...prev, minStay: val}))} label="Minimum Stay Rules" />
              </div>
              
              <div className="bg-amber-50 border border-amber-100 rounded-xl p-4 flex gap-3">
                <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0" />
                <div>
                  <p className="text-sm font-bold text-amber-900 leading-none mb-1">Conflict Detected</p>
                  <p className="text-xs text-amber-700">Airbnb report price discrepancy for 'Deluxe King Suite' on April 12-14. <button className="font-bold underline">Resolve Now</button></p>
                </div>
              </div>
            </div>
          </Section>

          <Section title="Channel Analytics" description="Revenue and booking distribution across platforms.">
            <div className="h-48 flex items-end justify-between gap-4 px-2">
              {[
                { label: 'Airbnb', val: 75, color: 'bg-primary' },
                { label: 'Booking.com', val: 100, color: 'bg-emerald-500' },
                { label: 'Agoda', val: 45, color: 'bg-indigo-500' },
                { label: 'Expedia', val: 20, color: 'bg-slate-300' },
              ].map((bar, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-2 group">
                  <div className="w-full bg-slate-100 rounded-t-lg relative overflow-hidden h-full">
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: `${bar.val}%` }}
                      transition={{ duration: 1, delay: i * 0.1 }}
                      className={`absolute bottom-0 left-0 right-0 ${bar.color} opacity-80 group-hover:opacity-100 transition-opacity`}
                    />
                  </div>
                  <span className="text-[10px] font-bold text-slate-500 uppercase">{bar.label}</span>
                </div>
              ))}
            </div>
          </Section>
        </div>
      </div>

      {/* Booking Import Section */}
      <Section 
        title="Recent Booking Imports" 
        description="Sync history for latest bookings from external channels."
        action={<button className="btn-secondary h-9 text-xs"><History className="w-3.5 h-3.5" /> View Full History</button>}
      >
        <div className="overflow-x-auto">
          <table className="w-full text-left whitespace-nowrap">
            <thead>
              <tr className="border-b border-border">
                <th className="pb-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Booking ID</th>
                <th className="pb-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Channel</th>
                <th className="pb-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Guest</th>
                <th className="pb-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Check-in / Out</th>
                <th className="pb-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Room</th>
                <th className="pb-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Status</th>
                <th className="pb-4 text-xs font-bold text-slate-400 uppercase tracking-wider text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {bookings.map((booking, i) => (
                <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                  <td className="py-4 font-mono text-xs font-bold text-slate-900">{booking.id}</td>
                  <td className="py-4">
                    <div className="flex items-center gap-2">
                       <div className="w-5 h-5 rounded-full bg-slate-100 flex items-center justify-center">
                          <Globe className="w-3 h-3 text-slate-600" />
                       </div>
                       <span className="text-sm font-medium text-slate-700">{booking.channel}</span>
                    </div>
                  </td>
                  <td className="py-4 text-sm font-semibold text-slate-900">{booking.guest}</td>
                  <td className="py-4 text-sm text-slate-500 font-medium">{booking.checkin} - {booking.checkout}</td>
                  <td className="py-4 text-sm text-slate-600">{booking.room}</td>
                  <td className="py-4">
                    <Badge variant={booking.status === 'Confirmed' ? 'success' : booking.status === 'Cancelled' ? 'error' : 'warning'}>
                      {booking.status}
                    </Badge>
                  </td>
                  <td className="py-4 text-right">
                    <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
                      <MoreHorizontal className="w-4 h-4 text-slate-400" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      {/* Sync Logs */}
      <Section title="Sync Logs" description="Real-time history of synchronization attempts and errors.">
        <div className="space-y-4">
          {syncLogs.map((log, i) => (
            <div key={i} className="flex items-start gap-4 p-4 rounded-xl border border-border hover:bg-slate-50 transition-colors group">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${log.error ? 'bg-red-50' : 'bg-emerald-50'}`}>
                {log.error ? <AlertCircle className="w-5 h-5 text-red-500" /> : <CheckCircle2 className="w-5 h-5 text-emerald-500" />}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-0.5">
                  <h5 className="text-sm font-bold text-slate-900">{log.event}</h5>
                  <span className="text-[11px] font-bold text-slate-400">{log.time}</span>
                </div>
                <p className="text-xs text-slate-500">{log.details}</p>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant={log.error ? 'error' : 'success'}>{log.result}</Badge>
                <button className="p-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </button>
              </div>
            </div>
          ))}
          <button className="w-full py-3 text-sm font-bold text-primary hover:bg-primary/5 rounded-xl border border-dashed border-primary/30 transition-all uppercase tracking-wider">
            Load Older Logs
          </button>
        </div>
      </Section>
    </div>
  );
}
