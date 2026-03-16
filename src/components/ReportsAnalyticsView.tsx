import React, { useState } from 'react';
import {
  Download,
  FileText,
  Calendar,
  Filter,
  TrendingUp,
  TrendingDown,
  DollarSign,
  BedDouble,
  CalendarDays,
  Users,
  BarChart2,
  PieChart,
  ArrowUpRight,
  ArrowDownRight,
  ChevronDown,
  RefreshCw,
  Share2,
  Printer,
  Table,
  Building2,
  Globe,
  Star,
  Clock,
} from 'lucide-react';
import { motion } from 'motion/react';

// ── Mini SVG Charts (pure SVG, no library) ──────────────────────────────────

const LineChart = ({
  data,
  color,
  height = 80,
}: {
  data: number[];
  color: string;
  height?: number;
}) => {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const w = 300;
  const h = height;
  const points = data.map((v, i) => {
    const x = (i / (data.length - 1)) * w;
    const y = h - ((v - min) / range) * (h - 10) - 5;
    return `${x},${y}`;
  });
  const polyline = points.join(' ');
  const area = `M${points[0]} L${points.join(' L')} L${w},${h} L0,${h} Z`;

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full" style={{ height }}>
      <defs>
        <linearGradient id={`grad-${color.replace('#', '')}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity={0.3} />
          <stop offset="100%" stopColor={color} stopOpacity={0} />
        </linearGradient>
      </defs>
      <path d={area} fill={`url(#grad-${color.replace('#', '')})`} />
      <polyline points={polyline} fill="none" stroke={color} strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" />
    </svg>
  );
};

const BarChart = ({
  data,
  labels,
  color,
}: {
  data: number[];
  labels: string[];
  color: string;
}) => {
  const max = Math.max(...data);
  const h = 120;
  const barW = 28;
  const gap = 12;
  const totalW = data.length * (barW + gap) - gap;

  return (
    <svg viewBox={`0 0 ${totalW} ${h + 24}`} className="w-full" style={{ height: h + 24 }}>
      {data.map((v, i) => {
        const barH = ((v / max) * h) || 2;
        const x = i * (barW + gap);
        const y = h - barH;
        return (
          <g key={i}>
            <rect x={x} y={y} width={barW} height={barH} rx="4" fill={color} opacity={0.85} />
            <text x={x + barW / 2} y={h + 16} textAnchor="middle" fontSize="9" fill="#9CA3AF">
              {labels[i]}
            </text>
          </g>
        );
      })}
    </svg>
  );
};

const DonutChart = ({
  segments,
}: {
  segments: { label: string; value: number; color: string }[];
}) => {
  const total = segments.reduce((s, seg) => s + seg.value, 0);
  let cumulative = 0;
  const r = 42;
  const cx = 60;
  const cy = 60;
  const stroke = 16;

  const toRad = (deg: number) => (deg * Math.PI) / 180;

  const arcSegments = segments.map((seg) => {
    const pct = seg.value / total;
    const startAngle = cumulative * 360 - 90;
    const endAngle = (cumulative + pct) * 360 - 90;
    cumulative += pct;

    const x1 = cx + r * Math.cos(toRad(startAngle));
    const y1 = cy + r * Math.sin(toRad(startAngle));
    const x2 = cx + r * Math.cos(toRad(endAngle));
    const y2 = cy + r * Math.sin(toRad(endAngle));
    const largeArc = pct > 0.5 ? 1 : 0;

    return {
      ...seg,
      d: `M ${x1} ${y1} A ${r} ${r} 0 ${largeArc} 1 ${x2} ${y2}`,
    };
  });

  return (
    <div className="flex items-center gap-4">
      <svg viewBox="0 0 120 120" style={{ width: 100, height: 100, flexShrink: 0 }}>
        {arcSegments.map((seg, i) => (
          <path
            key={i}
            d={seg.d}
            fill="none"
            stroke={seg.color}
            strokeWidth={stroke}
            strokeLinecap="butt"
          />
        ))}
      </svg>
      <div className="space-y-2 flex-1">
        {segments.map((seg) => (
          <div key={seg.label} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full" style={{ background: seg.color }} />
              <span className="text-xs text-text-secondary">{seg.label}</span>
            </div>
            <span className="text-xs font-bold text-text-primary">
              {Math.round((seg.value / segments.reduce((s, x) => s + x.value, 0)) * 100)}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

// ── Data ─────────────────────────────────────────────────────────────────────

const revenueData = [18200, 21400, 19800, 24600, 22100, 27300, 31200, 28900, 26700, 32100, 35400, 38900];
const occupancyData = [72, 68, 75, 81, 78, 85, 88, 84, 79, 87, 91, 84];
const bookingsByChannel = [142, 89, 56, 34, 28];
const channelLabels = ['Airbnb', 'Booking', 'Direct', 'Expedia', 'Agoda'];

const roomPerformance = [
  { room: 'Deluxe King Suite', bookings: 84, nights: 312, revenue: 74880, occupancy: 85, adr: 240 },
  { room: 'Superior Double', bookings: 102, nights: 374, revenue: 56100, occupancy: 82, adr: 150 },
  { room: 'Standard Single', bookings: 67, nights: 198, revenue: 19800, occupancy: 55, adr: 100 },
  { room: 'Presidential Suite', bookings: 21, nights: 89, revenue: 53400, occupancy: 24, adr: 600 },
  { room: 'Family Suite', bookings: 49, nights: 178, revenue: 35600, occupancy: 49, adr: 200 },
];

const channelPerformance = [
  { channel: 'Airbnb', bookings: 142, revenue: 56800, commission: 8520, net: 48280, color: '#FF5A5F' },
  { channel: 'Booking.com', bookings: 89, revenue: 33550, commission: 5368, net: 28182, color: '#003580' },
  { channel: 'Direct', bookings: 56, revenue: 25200, commission: 0, net: 25200, color: '#10B981' },
  { channel: 'Expedia', bookings: 34, revenue: 13600, commission: 2040, net: 11560, color: '#FBBF24' },
  { channel: 'Agoda', bookings: 28, revenue: 9800, commission: 1470, net: 8330, color: '#8B5CF6' },
];

const channelSegments = [
  { label: 'Airbnb', value: 142, color: '#FF5A5F' },
  { label: 'Booking.com', value: 89, color: '#003580' },
  { label: 'Direct', value: 56, color: '#10B981' },
  { label: 'Expedia', value: 34, color: '#FBBF24' },
  { label: 'Agoda', value: 28, color: '#8B5CF6' },
];

// ── KPI Card ─────────────────────────────────────────────────────────────────

const KpiCard = ({
  label,
  value,
  change,
  isPositive,
  icon: Icon,
  iconBg,
  iconColor,
  subtitle,
}: {
  label: string;
  value: string;
  change: string;
  isPositive: boolean;
  icon: React.ElementType;
  iconBg: string;
  iconColor: string;
  subtitle?: string;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 16 }}
    animate={{ opacity: 1, y: 0 }}
    className="card group hover:border-primary hover:shadow-md transition-all"
  >
    <div className="flex items-start justify-between mb-4">
      <div className={`w-11 h-11 rounded-xl ${iconBg} flex items-center justify-center group-hover:scale-110 transition-transform`}>
        <Icon className={`w-5 h-5 ${iconColor}`} />
      </div>
      <span
        className={`flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-full ${
          isPositive ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-500'
        }`}
      >
        {isPositive ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
        {change}
      </span>
    </div>
    <p className="text-[13px] font-medium text-text-secondary">{label}</p>
    <h2 className="metric-value mt-1">{value}</h2>
    {subtitle && <p className="text-[12px] text-text-muted mt-1">{subtitle}</p>}
  </motion.div>
);

// ── Section card container ───────────────────────────────────────────────────

const Section = ({ title, description, action, children }: {
  title: string;
  description?: string;
  action?: React.ReactNode;
  children: React.ReactNode;
}) => (
  <div className="bg-white rounded-xl border border-border shadow-sm p-6">
    <div className="flex items-start justify-between mb-5">
      <div>
        <h3 className="card-title">{title}</h3>
        {description && <p className="text-[13px] text-text-secondary mt-0.5">{description}</p>}
      </div>
      {action && <div>{action}</div>}
    </div>
    {children}
  </div>
);

// ── Main component ───────────────────────────────────────────────────────────

export default function ReportsAnalyticsView() {
  const [dateRange, setDateRange] = useState('last-30');
  const [property, setProperty] = useState('all');
  const [roomType, setRoomType] = useState('all');
  const [bookingSource, setBookingSource] = useState('all');
  const [activeChartTab, setActiveChartTab] = useState<'revenue' | 'occupancy'>('revenue');

  const monthLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  return (
    <div className="space-y-6">
      {/* ── Header ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1>Reports &amp; Analytics</h1>
          <p>Track business performance and insights.</p>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <button className="btn-secondary h-9 text-[13px] gap-1.5 px-3">
            <Share2 className="w-4 h-4" />
            Schedule Report
          </button>
          <button className="btn-secondary h-9 text-[13px] gap-1.5 px-3">
            <Printer className="w-4 h-4" />
            Export PDF
          </button>
          <button className="btn-primary h-9 text-[13px] gap-1.5 px-3">
            <Download className="w-4 h-4" />
            Download CSV
          </button>
        </div>
      </div>

      {/* ── Filters ── */}
      <div className="bg-white border border-border rounded-xl px-5 py-4 flex flex-wrap items-end gap-4 shadow-sm">
        <div className="flex items-center gap-2 text-text-secondary">
          <Filter className="w-4 h-4" />
          <span className="text-[13px] font-semibold">Filters</span>
        </div>

        {[
          {
            label: 'Date Range',
            value: dateRange,
            setter: setDateRange,
            icon: Calendar,
            options: [
              { v: 'today', l: 'Today' },
              { v: 'last-7', l: 'Last 7 Days' },
              { v: 'last-30', l: 'Last 30 Days' },
              { v: 'last-90', l: 'Last 90 Days' },
              { v: 'this-year', l: 'This Year' },
            ],
          },
          {
            label: 'Property',
            value: property,
            setter: setProperty,
            icon: Building2,
            options: [
              { v: 'all', l: 'All Properties' },
              { v: 'grand-plaza', l: 'Grand Plaza Hotel' },
              { v: 'sunset', l: 'Sunset Resort' },
              { v: 'urban', l: 'Urban Suites' },
            ],
          },
          {
            label: 'Room Type',
            value: roomType,
            setter: setRoomType,
            icon: BedDouble,
            options: [
              { v: 'all', l: 'All Room Types' },
              { v: 'deluxe', l: 'Deluxe Suite' },
              { v: 'superior', l: 'Superior Double' },
              { v: 'standard', l: 'Standard Single' },
              { v: 'presidential', l: 'Presidential Suite' },
            ],
          },
          {
            label: 'Booking Source',
            value: bookingSource,
            setter: setBookingSource,
            icon: Globe,
            options: [
              { v: 'all', l: 'All Channels' },
              { v: 'airbnb', l: 'Airbnb' },
              { v: 'booking', l: 'Booking.com' },
              { v: 'direct', l: 'Direct' },
              { v: 'expedia', l: 'Expedia' },
            ],
          },
        ].map(({ label, value, setter, icon: Icon, options }) => (
          <div key={label} className="flex flex-col gap-1 min-w-[160px]">
            <label className="text-[12px] font-semibold text-text-muted uppercase tracking-wide">{label}</label>
            <div className="relative">
              <Icon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
              <select
                value={value}
                onChange={(e) => setter(e.target.value)}
                className="h-9 w-full pl-9 pr-8 rounded-lg border border-border bg-background text-[13px] font-medium text-text-primary focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 appearance-none cursor-pointer"
              >
                {options.map((o) => (
                  <option key={o.v} value={o.v}>{o.l}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted pointer-events-none" />
            </div>
          </div>
        ))}

        <button className="h-9 px-3 rounded-lg text-[13px] font-medium text-text-secondary border border-border hover:bg-background flex items-center gap-1.5 transition-colors ml-auto">
          <RefreshCw className="w-4 h-4" />
          Reset
        </button>
      </div>

      {/* ── KPI Cards ── */}
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4">
        {[
          { label: 'Total Revenue', value: '$238,450', change: '+18.4%', isPositive: true, icon: DollarSign, iconBg: 'bg-emerald-50', iconColor: 'text-emerald-600', subtitle: 'vs last period' },
          { label: 'Occupancy Rate', value: '84.2%', change: '+4.3%', isPositive: true, icon: BedDouble, iconBg: 'bg-blue-50', iconColor: 'text-blue-600', subtitle: 'Monthly avg' },
          { label: 'Total Bookings', value: '349', change: '+12.5%', isPositive: true, icon: CalendarDays, iconBg: 'bg-indigo-50', iconColor: 'text-indigo-600', subtitle: 'This period' },
          { label: 'Avg Daily Rate', value: '$182', change: '+5.7%', isPositive: true, icon: TrendingUp, iconBg: 'bg-violet-50', iconColor: 'text-violet-600', subtitle: 'ADR' },
          { label: 'RevPAR', value: '$153', change: '+8.2%', isPositive: true, icon: BarChart2, iconBg: 'bg-amber-50', iconColor: 'text-amber-600', subtitle: 'Revenue per room' },
          { label: 'Cancellation Rate', value: '6.3%', change: '-2.1%', isPositive: true, icon: TrendingDown, iconBg: 'bg-red-50', iconColor: 'text-red-500', subtitle: 'Reduced this period' },
        ].map(({ label, ...rest }) => (
          <KpiCard key={label} label={label} {...rest} />
        ))}
      </div>

      {/* ── Revenue & Occupancy Charts ── */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Main chart */}
        <div className="xl:col-span-2">
          <Section
            title={activeChartTab === 'revenue' ? 'Revenue Trend' : 'Occupancy Rate by Day'}
            description={activeChartTab === 'revenue' ? 'Monthly revenue over the last 12 months' : 'Average daily occupancy rate (%)'}
            action={
              <div className="flex bg-background rounded-lg p-1 border border-border">
                {(['revenue', 'occupancy'] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveChartTab(tab)}
                    className={`px-3 py-1.5 rounded text-[12px] font-semibold transition-all capitalize ${
                      activeChartTab === tab ? 'bg-white text-primary shadow-sm border border-border' : 'text-text-secondary hover:text-text-primary'
                    }`}
                  >
                    {tab === 'revenue' ? 'Revenue' : 'Occupancy'}
                  </button>
                ))}
              </div>
            }
          >
            <div className="mb-4">
              <div className="flex items-end gap-2">
                <span className="text-3xl font-bold text-text-primary">
                  {activeChartTab === 'revenue' ? '$238,450' : '84.2%'}
                </span>
                <span className="text-emerald-500 text-sm font-bold mb-1">
                  +{activeChartTab === 'revenue' ? '18.4' : '4.3'}% vs last period
                </span>
              </div>
            </div>
            <LineChart
              data={activeChartTab === 'revenue' ? revenueData : occupancyData}
              color={activeChartTab === 'revenue' ? '#2F80ED' : '#10B981'}
              height={160}
            />
            <div className="flex justify-between mt-2">
              {monthLabels.map((m) => (
                <span key={m} className="text-[10px] text-text-muted">{m}</span>
              ))}
            </div>
          </Section>
        </div>

        {/* Bookings by Channel */}
        <Section
          title="Bookings by Channel"
          description="Distribution across booking sources"
        >
          <DonutChart segments={channelSegments} />
          <div className="mt-5 space-y-2">
            {channelPerformance.map((ch) => (
              <div key={ch.channel} className="flex items-center justify-between py-1.5">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full" style={{ background: ch.color }} />
                  <span className="text-[13px] text-text-secondary">{ch.channel}</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-[13px] font-semibold text-text-primary">{ch.bookings}</span>
                  <span className="text-[12px] text-text-muted w-16 text-right">${ch.revenue.toLocaleString()}</span>
                </div>
              </div>
            ))}
          </div>
        </Section>
      </div>

      {/* ── Room Performance ── */}
      <Section
        title="Room Performance"
        description="Booking and revenue breakdown by room category"
        action={
          <button className="btn-secondary h-8 text-[12px] px-3 gap-1.5">
            <Table className="w-3.5 h-3.5" />
            Export Table
          </button>
        }
      >
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="pb-3 text-left">Room Category</th>
                <th className="pb-3 text-right">Bookings</th>
                <th className="pb-3 text-right">Nights Sold</th>
                <th className="pb-3 text-right">Revenue</th>
                <th className="pb-3 text-right">Occupancy</th>
                <th className="pb-3 text-right">ADR</th>
              </tr>
            </thead>
            <tbody>
              {roomPerformance.map((r, i) => (
                <tr key={r.room} className="border-b border-border/50 hover:bg-background/50 transition-colors">
                  <td className="py-3.5">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                        <BedDouble className="w-4 h-4 text-primary" />
                      </div>
                      <span className="font-medium text-text-primary">{r.room}</span>
                    </div>
                  </td>
                  <td className="py-3.5 text-right font-medium">{r.bookings}</td>
                  <td className="py-3.5 text-right text-text-secondary">{r.nights}</td>
                  <td className="py-3.5 text-right font-semibold text-emerald-600">${r.revenue.toLocaleString()}</td>
                  <td className="py-3.5 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <div className="w-16 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full bg-primary"
                          style={{ width: `${r.occupancy}%` }}
                        />
                      </div>
                      <span className="text-[13px] font-medium">{r.occupancy}%</span>
                    </div>
                  </td>
                  <td className="py-3.5 text-right font-medium">${r.adr}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="border-t-2 border-border">
                <td className="py-3 font-bold text-text-primary">Total</td>
                <td className="py-3 text-right font-bold">{roomPerformance.reduce((s, r) => s + r.bookings, 0)}</td>
                <td className="py-3 text-right font-bold text-text-secondary">{roomPerformance.reduce((s, r) => s + r.nights, 0)}</td>
                <td className="py-3 text-right font-bold text-emerald-600">
                  ${roomPerformance.reduce((s, r) => s + r.revenue, 0).toLocaleString()}
                </td>
                <td className="py-3 text-right font-bold">
                  {Math.round(roomPerformance.reduce((s, r) => s + r.occupancy, 0) / roomPerformance.length)}%
                </td>
                <td className="py-3 text-right font-bold">
                  ${Math.round(roomPerformance.reduce((s, r) => s + r.adr, 0) / roomPerformance.length)}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </Section>

      {/* ── Guest Analytics + Channel Performance ── */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Guest Analytics */}
        <Section title="Guest Analytics" description="Insights into your guest demographics and behavior">
          <div className="grid grid-cols-2 gap-4 mb-6">
            {[
              { label: 'New Guests', value: '214', pct: '61%', icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
              { label: 'Returning Guests', value: '135', pct: '39%', icon: Star, color: 'text-amber-600', bg: 'bg-amber-50' },
              { label: 'Avg Stay Duration', value: '3.4 nights', pct: '', icon: Clock, color: 'text-violet-600', bg: 'bg-violet-50' },
              { label: 'Avg Guest Rating', value: '4.78 / 5', pct: '', icon: Star, color: 'text-emerald-600', bg: 'bg-emerald-50' },
            ].map((g) => (
              <div key={g.label} className="bg-background rounded-xl p-4 border border-border/50">
                <div className={`w-9 h-9 rounded-lg ${g.bg} flex items-center justify-center mb-3`}>
                  <g.icon className={`w-4 h-4 ${g.color}`} />
                </div>
                <p className="text-[12px] text-text-muted">{g.label}</p>
                <p className="text-lg font-bold text-text-primary mt-0.5">{g.value}</p>
                {g.pct && <p className="text-[11px] text-text-secondary mt-0.5">{g.pct} of total guests</p>}
              </div>
            ))}
          </div>

          {/* New vs Returning visual */}
          <div>
            <div className="flex justify-between text-[12px] font-medium text-text-secondary mb-2">
              <span>New Guests</span>
              <span>Returning</span>
            </div>
            <div className="h-3 bg-slate-100 rounded-full overflow-hidden flex">
              <div className="h-full bg-blue-500 rounded-l-full" style={{ width: '61%' }} />
              <div className="h-full bg-amber-400 rounded-r-full" style={{ width: '39%' }} />
            </div>
            <div className="flex justify-between text-[11px] text-text-muted mt-1">
              <span>214 guests (61%)</span>
              <span>135 guests (39%)</span>
            </div>
          </div>

          <div className="mt-5 pt-5 border-t border-border grid grid-cols-3 gap-4">
            {[
              { label: 'Solo Travelers', value: '38%' },
              { label: 'Couples', value: '45%' },
              { label: 'Families / Groups', value: '17%' },
            ].map((g) => (
              <div key={g.label} className="text-center">
                <p className="text-xl font-bold text-text-primary">{g.value}</p>
                <p className="text-[11px] text-text-muted mt-0.5">{g.label}</p>
              </div>
            ))}
          </div>
        </Section>

        {/* Channel Performance */}
        <Section title="Channel Performance" description="Revenue and commission breakdown by channel">
          <div className="space-y-3">
            {channelPerformance.map((ch) => {
              const totalRevenue = channelPerformance.reduce((s, c) => s + c.revenue, 0);
              const pct = Math.round((ch.revenue / totalRevenue) * 100);
              return (
                <div key={ch.channel} className="p-3 rounded-xl border border-border/50 bg-background hover:border-primary/30 transition-colors">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ background: ch.color }} />
                      <span className="text-[13px] font-semibold text-text-primary">{ch.channel}</span>
                    </div>
                    <span className="text-[12px] text-text-muted">{pct}% of revenue</span>
                  </div>
                  <div className="h-1.5 bg-slate-100 rounded-full mb-2 overflow-hidden">
                    <div className="h-full rounded-full" style={{ width: `${pct}%`, background: ch.color }} />
                  </div>
                  <div className="grid grid-cols-3 gap-x-2 text-[12px]">
                    <div>
                      <p className="text-text-muted">Bookings</p>
                      <p className="font-bold text-text-primary">{ch.bookings}</p>
                    </div>
                    <div>
                      <p className="text-text-muted">Gross Revenue</p>
                      <p className="font-bold text-emerald-600">${ch.revenue.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-text-muted">Net Revenue</p>
                      <p className="font-bold text-text-primary">${ch.net.toLocaleString()}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Section>
      </div>

      {/* ── Financial Reports ── */}
      <Section
        title="Financial Summary"
        description="Revenue breakdown including taxes, fees, and net profit"
        action={
          <div className="flex gap-2">
            <button className="btn-secondary h-8 text-[12px] px-3 gap-1.5">
              <FileText className="w-3.5 h-3.5" />
              Export PDF
            </button>
            <button className="btn-secondary h-8 text-[12px] px-3 gap-1.5">
              <Download className="w-3.5 h-3.5" />
              Export CSV
            </button>
          </div>
        }
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Income statement */}
          <div className="space-y-2">
            <h4 className="text-[14px] font-bold text-text-secondary uppercase tracking-wider mb-3">Income Statement</h4>
            {[
              { label: 'Gross Booking Revenue', value: 238450, isPositive: true },
              { label: 'Platform Commissions', value: -17398, isPositive: false },
              { label: 'Taxes Collected', value: -21460, isPositive: false },
              { label: 'Service Fees', value: 4780, isPositive: true },
              { label: 'OTA Fees', value: -3240, isPositive: false },
              { label: 'Refunds & Cancellations', value: -4200, isPositive: false },
            ].map((item) => (
              <div key={item.label} className="flex items-center justify-between py-2 border-b border-border/40">
                <span className="text-[13px] text-text-secondary">{item.label}</span>
                <span className={`text-[13px] font-semibold ${item.isPositive ? 'text-text-primary' : 'text-red-500'}`}>
                  {item.isPositive ? '' : '-'}${Math.abs(item.value).toLocaleString()}
                </span>
              </div>
            ))}
            <div className="flex items-center justify-between pt-3">
              <span className="text-[14px] font-bold text-text-primary">Net Profit</span>
              <span className="text-[16px] font-bold text-emerald-600">$196,932</span>
            </div>
          </div>

          {/* Profit margin visual */}
          <div className="space-y-4">
            <h4 className="text-[14px] font-bold text-text-secondary uppercase tracking-wider mb-3">Profit Breakdown</h4>
            {[
              { label: 'Net Revenue', value: 196932, pct: 82.6, color: 'bg-emerald-500' },
              { label: 'Commissions & Fees', value: 20638, pct: 8.7, color: 'bg-red-400' },
              { label: 'Taxes', value: 21460, pct: 9.0, color: 'bg-amber-400' },
              { label: 'Refunds', value: 4200, pct: 1.8, color: 'bg-slate-300' },
            ].map((item) => (
              <div key={item.label}>
                <div className="flex justify-between text-[12px] mb-1">
                  <div className="flex items-center gap-2">
                    <div className={`w-2.5 h-2.5 rounded-full ${item.color}`} />
                    <span className="text-text-secondary font-medium">{item.label}</span>
                  </div>
                  <span className="font-bold text-text-primary">${item.value.toLocaleString()} <span className="text-text-muted font-normal">({item.pct}%)</span></span>
                </div>
                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${item.pct}%` }}
                    transition={{ duration: 1, ease: 'easeOut' }}
                    className={`h-full rounded-full ${item.color}`}
                  />
                </div>
              </div>
            ))}

            <div className="mt-6 p-4 bg-emerald-50 rounded-xl border border-emerald-100">
              <p className="text-[12px] text-emerald-700 font-medium">Profit Margin</p>
              <p className="text-2xl font-bold text-emerald-700 mt-0.5">82.6%</p>
              <p className="text-[11px] text-emerald-600 mt-1">+5.2% compared to previous period</p>
            </div>
          </div>
        </div>
      </Section>

      {/* ── Export Options ── */}
      <div className="bg-gradient-to-r from-primary/10 to-blue-50 rounded-xl border border-primary/20 p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h3 className="text-[16px] font-bold text-text-primary">Export Your Reports</h3>
          <p className="text-[13px] text-text-secondary mt-0.5">Download detailed reports in multiple formats or schedule recurring email reports.</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button className="btn-secondary h-9 text-[13px] px-4 gap-2 bg-white">
            <FileText className="w-4 h-4 text-red-500" />
            Export as PDF
          </button>
          <button className="btn-secondary h-9 text-[13px] px-4 gap-2 bg-white">
            <Table className="w-4 h-4 text-emerald-500" />
            Export as CSV
          </button>
          <button className="btn-primary h-9 text-[13px] px-4 gap-2">
            <Share2 className="w-4 h-4" />
            Schedule Report
          </button>
        </div>
      </div>
    </div>
  );
}
