import React from 'react';
import { 
  TrendingUp, 
  Users, 
  DollarSign, 
  BedDouble, 
  ArrowUpRight, 
  ArrowDownRight,
  Clock,
  Calendar,
  AlertCircle,
  CheckCircle2,
  Plus,
  Send,
  MoreHorizontal
} from 'lucide-react';
import { motion } from 'motion/react';

const SectionCard = ({ title, children, extra }: { title: string; children: React.ReactNode; extra?: React.ReactNode }) => (
  <div className="bg-white rounded-2xl shadow-sm border border-border overflow-hidden">
    <div className="p-6 border-b border-slate-50 flex items-center justify-between bg-white">
      <h3 className="text-lg font-bold text-slate-900">{title}</h3>
      {extra}
    </div>
    <div className="p-6">
      {children}
    </div>
  </div>
);

const KPICard = ({ title, value, trend, icon: Icon, color }: { title: string; value: string; trend: { val: string; positive: boolean }; icon: any; color: string }) => (
  <div className="bg-white p-6 rounded-2xl border border-border shadow-sm hover:shadow-md transition-all group">
    <div className="flex items-start justify-between mb-4">
      <div className={`p-3 rounded-xl ${color} bg-opacity-10 transition-colors group-hover:bg-opacity-20`}>
        <Icon className={`w-6 h-6 ${color.replace('bg-', 'text-')}`} />
      </div>
      <div className={`flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-full ${trend.positive ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
        {trend.positive ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
        {trend.val}
      </div>
    </div>
    <div className="space-y-1">
      <p className="text-sm font-medium text-slate-500">{title}</p>
      <h4 className="text-2xl font-bold text-slate-900">{value}</h4>
    </div>
  </div>
);

const TinyLineChart = ({ data, color }: { data: number[]; color: string }) => {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const w = 120;
  const h = 40;
  const points = data.map((v, i) => {
    const x = (i / (data.length - 1)) * w;
    const y = h - ((v - min) / range) * (h - 6) - 3;
    return `${x},${y}`;
  });
  const polyline = points.join(' ');

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-32 h-10 overflow-visible">
      <polyline points={polyline} fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
};

const DashboardView = () => {
  return (
    <div className="space-y-8 pb-12">
      {/* Header with quick actions */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Dashboard Overview</h1>
          <p className="text-slate-500 mt-1">Real-time performance metrics for your properties.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex -space-x-2 mr-4">
            {[1, 2, 3, 4].map(i => (
              <img key={i} src={`https://picsum.photos/seed/user${i}/40/40`} className="w-10 h-10 rounded-full border-2 border-white shadow-sm" alt="Staff" referrerPolicy="no-referrer" />
            ))}
            <div className="w-10 h-10 rounded-full bg-slate-100 border-2 border-white flex items-center justify-center text-xs font-bold text-slate-500 shadow-sm">+5</div>
          </div>
          <button className="btn-secondary h-11 px-6 shadow-sm">
            <Calendar className="w-4 h-4" />
            <span>Schedule Report</span>
          </button>
        </div>
      </div>

      {/* KPI Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPICard title="Total Revenue" value="$42,390" trend={{ val: "+12.5%", positive: true }} icon={DollarSign} color="bg-indigo-500" />
        <KPICard title="Total Bookings" value="1,248" trend={{ val: "+8.2%", positive: true }} icon={Calendar} color="bg-primary" />
        <KPICard title="Avg Occupancy" value="78.4%" trend={{ val: "-2.1%", positive: false }} icon={BedDouble} color="bg-emerald-500" />
        <KPICard title="Active Guests" value="342" trend={{ val: "+15.3%", positive: true }} icon={Users} color="bg-amber-500" />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Main Chart Section */}
        <div className="xl:col-span-2 space-y-8">
          <SectionCard 
            title="Revenue Analytics" 
            extra={
              <select className="bg-slate-50 border-none text-xs font-bold px-3 py-1.5 rounded-lg focus:ring-0">
                <option>Last 7 Days</option>
                <option>Last 30 Days</option>
                <option>Year to Date</option>
              </select>
            }
          >
            <div className="h-[300px] w-full flex items-end gap-1.5">
              {[45, 60, 55, 75, 90, 85, 100, 110, 95, 120, 105, 130].map((h, i) => (
                <motion.div
                  key={i}
                  initial={{ height: 0 }}
                  animate={{ height: `${h * 2}px` }}
                  transition={{ delay: i * 0.05, duration: 0.8 }}
                  className="flex-1 bg-primary rounded-t-md relative group"
                >
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[10px] px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                    ${h * 100}
                  </div>
                </motion.div>
              ))}
            </div>
            <div className="flex justify-between mt-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              <span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>May</span><span>Jun</span><span>Jul</span><span>Aug</span><span>Sep</span><span>Oct</span><span>Nov</span><span>Dec</span>
            </div>
          </SectionCard>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <SectionCard title="Today's Operations">
              <div className="space-y-5">
                {[
                  { label: 'Expected Check-ins', value: 12, icon: ArrowUpRight, color: 'text-emerald-500', bg: 'bg-emerald-50' },
                  { label: 'Expected Check-outs', value: 8, icon: ArrowDownRight, color: 'text-rose-500', bg: 'bg-rose-50' },
                  { label: 'Room Service Requests', value: 5, icon: Clock, color: 'text-amber-500', bg: 'bg-amber-50' },
                  { label: 'Maintenance Alerts', value: 2, icon: AlertCircle, color: 'text-primary', bg: 'bg-blue-50' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between p-3 rounded-xl border border-slate-50 hover:bg-slate-50 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${item.bg}`}>
                        <item.icon className={`w-4 h-4 ${item.color}`} />
                      </div>
                      <span className="text-sm font-medium text-slate-700">{item.label}</span>
                    </div>
                    <span className="text-lg font-bold text-slate-900">{item.value}</span>
                  </div>
                ))}
              </div>
            </SectionCard>

            <SectionCard title="Property Performance">
              <div className="space-y-6">
                {[
                  { name: 'Grand Plaza Hotel', occ: 85, rev: '$12.4k', trend: [30, 45, 40, 60, 55, 75] },
                  { name: 'Sunset Resort', occ: 72, rev: '$8.2k', trend: [50, 40, 65, 50, 70, 60] },
                  { name: 'Urban Suites', occ: 91, rev: '$5.1k', trend: [40, 55, 50, 45, 60, 55] },
                ].map((prop, i) => (
                  <div key={i} className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex flex-col">
                        <span className="text-sm font-bold text-slate-900">{prop.name}</span>
                        <span className="text-xs text-slate-500">{prop.rev} today</span>
                      </div>
                      <TinyLineChart data={prop.trend} color={i === 0 ? '#4F46E5' : i === 1 ? '#10B981' : '#F59E0B'} />
                    </div>
                    <div className="relative h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${prop.occ}%` }}
                        transition={{ duration: 1, delay: i * 0.2 }}
                        className={`absolute top-0 left-0 h-full rounded-full ${prop.occ > 80 ? 'bg-emerald-500' : prop.occ > 60 ? 'bg-amber-500' : 'bg-primary'}`}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </SectionCard>
          </div>
        </div>

        {/* Sidebar content */}
        <div className="space-y-8">
          <SectionCard title="Quick Actions">
            <div className="grid grid-cols-2 gap-3">
              <button className="btn-secondary h-20 flex-col gap-2 text-xs font-bold border-dashed border-2 hover:border-primary hover:text-primary hover:bg-primary/5">
                <Plus className="w-5 h-5" />
                Add Booking
              </button>
              <button className="btn-secondary h-20 flex-col gap-2 text-xs font-bold border-dashed border-2 hover:border-primary hover:text-primary hover:bg-primary/5">
                <Users className="w-5 h-5" />
                Add Staff
              </button>
              <button className="btn-secondary h-20 flex-col gap-2 text-xs font-bold border-dashed border-2 hover:border-primary hover:text-primary hover:bg-primary/5">
                <Send className="w-5 h-5" />
                Email Guest
              </button>
              <button className="btn-secondary h-20 flex-col gap-2 text-xs font-bold border-dashed border-2 hover:border-primary hover:text-primary hover:bg-primary/5">
                <DollarSign className="w-5 h-5" />
                Create Link
              </button>
            </div>
          </SectionCard>

          <SectionCard title="Recent Activity" extra={<button className="text-xs font-bold text-primary hover:underline">View All</button>}>
            <div className="space-y-6">
              {[
                { user: 'Sarah Wilson', action: 'booked', target: 'Deluxe King Suite', time: '5 mins ago', initial: 'SW', color: 'bg-indigo-100 text-indigo-700' },
                { user: 'Mike Johnson', action: 'checked out', target: 'Beach Villa', time: '12 mins ago', initial: 'MJ', color: 'bg-emerald-100 text-emerald-700' },
                { user: 'System Alert', action: 'low availability', target: 'Urban Suites', time: '1 hr ago', icon: AlertCircle, color: 'bg-rose-100 text-rose-700' },
                { user: 'Payment Recv', action: 'for booking #8821', target: '$450.00', time: '2 hrs ago', initial: 'PR', color: 'bg-amber-100 text-amber-700' },
              ].map((activity, i) => (
                <div key={i} className="flex gap-4">
                  <div className={`w-10 h-10 rounded-full shrink-0 flex items-center justify-center text-xs font-bold ${activity.color}`}>
                    {activity.icon ? <activity.icon className="w-5 h-5" /> : activity.initial}
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm leading-tight text-slate-900">
                      <span className="font-bold">{activity.user}</span> {activity.action} <span className="font-medium text-slate-700">{activity.target}</span>
                    </p>
                    <p className="text-xs text-slate-400 font-medium">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </SectionCard>

          <div className="bg-primary rounded-2xl p-6 text-white overflow-hidden relative shadow-lg shadow-primary/20">
            <div className="relative z-10 space-y-4">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-indigo-200" />
                <span className="text-xs font-bold uppercase tracking-widest text-indigo-100">Pro Tip</span>
              </div>
              <h4 className="text-lg font-bold leading-tight">Your occupancy is 15% higher than last month!</h4>
              <p className="text-sm text-indigo-100 leading-relaxed">Consider increasing weekend rates for Grand Plaza Hotel to maximize revenue.</p>
              <button className="bg-white text-primary px-4 py-2 rounded-xl text-xs font-bold hover:bg-slate-50 transition-colors shadow-sm">
                View Smart Insights
              </button>
            </div>
            <div className="absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardView;
