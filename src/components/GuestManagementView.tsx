import React, { useState } from 'react';
import { 
  Users, 
  UserPlus, 
  Download, 
  Upload, 
  Search, 
  Filter, 
  MoreHorizontal, 
  Eye, 
  Edit2, 
  Trash2, 
  ChevronRight,
  X,
  Mail,
  Phone,
  MapPin,
  Calendar,
  History,
  CheckCircle2,
  AlertCircle,
  FileDown,
  FileSpreadsheet,
  Star,
  Clock,
  User,
  CreditCard,
  MessageSquare
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// Types
type GuestStatus = 'Checked-in' | 'Checked-out' | 'Confirmed' | 'Cancelled';
type GuestType = 'Regular' | 'VIP' | 'Corporate' | 'New';

interface StayRecord {
  id: string;
  bookingRef: string;
  property: string;
  checkIn: string;
  checkOut: string;
  status: GuestStatus;
  amount: string;
}

interface Guest {
  id: string;
  name: string;
  age: number;
  gender: 'Male' | 'Female' | 'Other';
  email: string;
  phone: string;
  bookingReference: string;
  checkInDate: string;
  checkOutDate: string;
  property: string;
  totalStays: number;
  guestType: GuestType;
  status: GuestStatus;
  avatar: string;
  preferences: string[];
  notes: string;
  stayHistory: StayRecord[];
}

const mockGuests: Guest[] = [
  {
    id: 'GST-001',
    name: 'Alexander Thompson',
    age: 34,
    gender: 'Male',
    email: 'a.thompson@example.com',
    phone: '+1 (555) 010-2233',
    bookingReference: 'BK-88229',
    checkInDate: '2026-03-14',
    checkOutDate: '2026-03-18',
    property: 'Grand Plaza Hotel',
    totalStays: 12,
    guestType: 'VIP',
    status: 'Checked-in',
    avatar: 'https://i.pravatar.cc/150?u=alex',
    preferences: ['High floor', 'Quiet room', 'Late check-out'],
    notes: 'Returning guest, prefers room away from elevator.',
    stayHistory: [
      { id: 'S-1', bookingRef: 'BK-77112', property: 'Grand Plaza Hotel', checkIn: '2025-11-10', checkOut: '2025-11-14', status: 'Checked-out', amount: '$1,200' },
      { id: 'S-2', bookingRef: 'BK-66001', property: 'Grand Plaza Hotel', checkIn: '2025-06-05', checkOut: '2025-06-10', status: 'Checked-out', amount: '$1,500' }
    ]
  },
  {
    id: 'GST-002',
    name: 'Sophia Martinez',
    age: 29,
    gender: 'Female',
    email: 's.martinez@techcorp.com',
    phone: '+1 (555) 011-4455',
    bookingReference: 'BK-88230',
    checkInDate: '2026-03-15',
    checkOutDate: '2026-03-17',
    property: 'Urban Suites',
    totalStays: 4,
    guestType: 'Corporate',
    status: 'Confirmed',
    avatar: 'https://i.pravatar.cc/150?u=sophia',
    preferences: ['Extra pillows', 'Work desk'],
    notes: 'Visiting for tech conference.',
    stayHistory: [
      { id: 'S-3', bookingRef: 'BK-55443', property: 'Urban Suites', checkIn: '2025-09-12', checkOut: '2025-09-15', status: 'Checked-out', amount: '$600' }
    ]
  },
  {
    id: 'GST-003',
    name: 'Emily Chen',
    age: 27,
    gender: 'Female',
    email: 'emily.chen@outlook.com',
    phone: '+1 (555) 012-7788',
    bookingReference: 'BK-88231',
    checkInDate: '2026-03-10',
    checkOutDate: '2026-03-12',
    property: 'Sunset Resort',
    totalStays: 1,
    guestType: 'New',
    status: 'Checked-out',
    avatar: 'https://i.pravatar.cc/150?u=emily',
    preferences: ['Ocean view'],
    notes: 'First time guest.',
    stayHistory: []
  },
  {
    id: 'GST-004',
    name: 'Marcus Wilson',
    age: 42,
    gender: 'Male',
    email: 'm.wilson@freemail.com',
    phone: '+1 (555) 013-9900',
    bookingReference: 'BK-88232',
    checkInDate: '2026-03-16',
    checkOutDate: '2026-03-20',
    property: 'Grand Plaza Hotel',
    totalStays: 6,
    guestType: 'Regular',
    status: 'Confirmed',
    avatar: 'https://i.pravatar.cc/150?u=marcus',
    preferences: ['Near fitness center'],
    notes: 'Regular business traveler.',
    stayHistory: [
      { id: 'S-4', bookingRef: 'BK-44332', property: 'Grand Plaza Hotel', checkIn: '2025-12-01', checkOut: '2025-12-05', status: 'Checked-out', amount: '$1,100' }
    ]
  },
  {
    id: 'GST-005',
    name: 'Isabella Rossi',
    age: 31,
    gender: 'Female',
    email: 'i.rossi@traveler.com',
    phone: '+1 (555) 014-1122',
    bookingReference: 'BK-88233',
    checkInDate: '2026-03-12',
    checkOutDate: '2026-03-15',
    property: 'Sunset Resort',
    totalStays: 3,
    guestType: 'Regular',
    status: 'Checked-in',
    avatar: 'https://i.pravatar.cc/150?u=isabella',
    preferences: ['Spa access', 'Vegan options'],
    notes: 'Celebrating anniversary.',
    stayHistory: [
      { id: 'S-5', bookingRef: 'BK-33221', property: 'Sunset Resort', checkIn: '2025-08-20', checkOut: '2025-08-25', status: 'Checked-out', amount: '$2,400' }
    ]
  }
];

const GuestManagementView = () => {
  const [selectedGuest, setSelectedGuest] = useState<Guest | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [propertyFilter, setPropertyFilter] = useState('All Properties');
  const [typeFilter, setTypeFilter] = useState('All Guest Types');
  const [statusFilter, setStatusFilter] = useState('All Booking Status');
  const [dateRange, setDateRange] = useState({ start: '', end: '' });

  const analytics = [
    { label: 'Total Guests', value: '1,284', icon: Users, color: 'bg-blue-50 text-blue-600', trend: '+12%' },
    { label: 'New Guests This Month', value: '156', icon: UserPlus, color: 'bg-emerald-50 text-emerald-600', trend: '+8%' },
    { label: 'Returning Guests', value: '42%', icon: History, color: 'bg-indigo-50 text-indigo-600', trend: '+2%' },
    { label: 'VIP Guests', value: '84', icon: Star, color: 'bg-amber-50 text-amber-600', trend: '+5%' },
    { label: 'Avg Stay Duration', value: '3.4 Nights', icon: Clock, color: 'bg-purple-50 text-purple-600', trend: '-0.2' },
  ];

  const filteredGuests = mockGuests.filter(guest => {
    const matchesSearch = guest.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         guest.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         guest.phone.includes(searchQuery) ||
                         guest.bookingReference.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesProperty = propertyFilter === 'All Properties' || guest.property === propertyFilter;
    const matchesType = typeFilter === 'All Guest Types' || guest.guestType === typeFilter;
    const matchesStatus = statusFilter === 'All Booking Status' || guest.status === statusFilter;
    
    // Simple date filter logic for demonstration
    const matchesDate = !dateRange.start || !dateRange.end || 
                       (guest.checkInDate >= dateRange.start && guest.checkInDate <= dateRange.end);

    return matchesSearch && matchesProperty && matchesType && matchesStatus && matchesDate;
  });

  return (
    <div className="space-y-8 pb-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Guest List</h1>
          <p className="text-slate-500">View and manage all guest information</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <button className="btn-secondary rounded-xl flex items-center gap-2">
            <Upload className="w-4 h-4" />
            <span>Import Guests</span>
          </button>
          <button className="btn-secondary rounded-xl flex items-center gap-2">
            <FileDown className="w-4 h-4" />
            <span>Export PDF</span>
          </button>
          <button className="btn-secondary rounded-xl flex items-center gap-2">
            <FileSpreadsheet className="w-4 h-4" />
            <span>Export CSV</span>
          </button>
          <button className="btn-primary rounded-xl flex items-center gap-2">
            <UserPlus className="w-4 h-4" />
            <span>Add Guest</span>
          </button>
        </div>
      </div>

      {/* Analytics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {analytics.map((stat) => (
          <div key={stat.label} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col gap-4 transition-all hover:shadow-md">
            <div className="flex items-center justify-between">
              <div className={`p-3 rounded-xl ${stat.color}`}>
                <stat.icon className="w-6 h-6" />
              </div>
              <span className={`text-xs font-bold px-2 py-1 rounded-full ${stat.trend.startsWith('+') ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'}`}>
                {stat.trend}
              </span>
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">{stat.label}</p>
              <h3 className="text-2xl font-bold text-slate-900">{stat.value}</h3>
            </div>
          </div>
        ))}
      </div>

      {/* Filters Area */}
      <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm space-y-4">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
          <div className="relative col-span-1 lg:col-span-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search guests..." 
              className="input w-full pl-10 h-10 text-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <select 
            className="input h-10 px-3 cursor-pointer text-sm"
            value={propertyFilter}
            onChange={(e) => setPropertyFilter(e.target.value)}
          >
            <option>All Properties</option>
            <option>Grand Plaza Hotel</option>
            <option>Sunset Resort</option>
            <option>Urban Suites</option>
          </select>
          <div className="flex gap-2">
            <input 
              type="date" 
              className="input h-10 px-3 flex-1 text-xs"
              value={dateRange.start}
              onChange={(e) => setDateRange({...dateRange, start: e.target.value})}
            />
            <input 
              type="date" 
              className="input h-10 px-3 flex-1 text-xs"
              value={dateRange.end}
              onChange={(e) => setDateRange({...dateRange, end: e.target.value})}
            />
          </div>
          <select 
            className="input h-10 px-3 cursor-pointer text-sm"
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
          >
            <option>All Guest Types</option>
            <option>New</option>
            <option>Regular</option>
            <option>VIP</option>
            <option>Corporate</option>
          </select>
          <div className="flex items-center gap-2">
            <select 
              className="input h-10 px-3 cursor-pointer flex-1 text-sm"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option>All Booking Status</option>
              <option>Confirmed</option>
              <option>Checked-in</option>
              <option>Checked-out</option>
              <option>Cancelled</option>
            </select>
            <button className="p-2 text-slate-400 hover:text-primary hover:bg-slate-50 rounded-lg transition-colors border border-slate-200">
              <Filter className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Guest Table */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-100">
                <th className="px-6 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-wider">Guest Name</th>
                <th className="px-4 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-wider">Age/Gender</th>
                <th className="px-6 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-wider">Contact</th>
                <th className="px-6 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-wider">Booking Ref</th>
                <th className="px-6 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-wider">Stay Period</th>
                <th className="px-6 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-wider">Property</th>
                <th className="px-4 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-wider">Stays</th>
                <th className="px-6 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-wider">Type</th>
                <th className="px-6 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filteredGuests.map((guest) => (
                <tr 
                  key={guest.id} 
                  className="hover:bg-slate-50/50 transition-colors cursor-pointer group"
                  onClick={() => setSelectedGuest(guest)}
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full overflow-hidden border border-slate-100 group-hover:border-primary/30 transition-colors">
                        <img src={guest.avatar} alt={guest.name} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-900">{guest.name}</p>
                        <p className="text-xs text-slate-500">{guest.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <span className="text-xs text-slate-600 font-medium">{guest.age}y / {guest.gender[0]}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col gap-0.5">
                      <p className="text-xs text-slate-600 flex items-center gap-1.5"><Mail className="w-3 h-3" /> {guest.email}</p>
                      <p className="text-xs text-slate-600 flex items-center gap-1.5"><Phone className="w-3 h-3" /> {guest.phone}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-xs font-mono font-bold text-slate-600 bg-slate-100 px-2 py-1 rounded leading-none">{guest.bookingReference}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col gap-0.5">
                      <p className="text-[11px] font-bold text-slate-700">{guest.checkInDate}</p>
                      <p className="text-[11px] font-medium text-slate-400">to {guest.checkOutDate}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" />
                      <span className="text-xs text-slate-600 font-medium">{guest.property}</span>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <span className="text-xs font-bold text-slate-600">{guest.totalStays}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      guest.guestType === 'VIP' ? 'bg-amber-50 text-amber-700 border border-amber-100' :
                      guest.guestType === 'Corporate' ? 'bg-indigo-50 text-indigo-700 border border-indigo-100' :
                      guest.guestType === 'New' ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' :
                      'bg-slate-100 text-slate-700'
                    }`}>
                      {guest.guestType}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                      guest.status === 'Checked-in' ? 'bg-emerald-50 text-emerald-700' :
                      guest.status === 'Confirmed' ? 'bg-blue-50 text-blue-700' :
                      guest.status === 'Checked-out' ? 'bg-slate-100 text-slate-600' :
                      'bg-red-50 text-red-700'
                    }`}>
                      {guest.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-1" onClick={(e) => e.stopPropagation()}>
                      <button className="p-1 px-2 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-primary transition-colors flex items-center gap-1">
                        <Eye className="w-3.5 h-3.5" />
                        <span className="text-[10px] font-bold">Details</span>
                      </button>
                      <button className="p-2 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-primary transition-colors">
                        <MoreHorizontal className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filteredGuests.length === 0 && (
          <div className="p-12 text-center text-slate-500">
            <Users className="w-12 h-12 mx-auto mb-4 opacity-20" />
            <p className="font-bold">No guests found</p>
            <p className="text-sm">Try adjusting your filters</p>
          </div>
        )}
      </div>

      {/* Guest Details Panel */}
      <AnimatePresence>
        {selectedGuest && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedGuest(null)}
              className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-[100]"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 h-full w-full max-w-[500px] bg-slate-50 shadow-2xl z-[101] overflow-y-auto"
            >
              {/* Panel Header */}
              <div className="sticky top-0 bg-white border-b border-slate-100 p-6 flex items-center justify-between z-20">
                <h2 className="text-xl font-bold text-slate-900">Guest Information</h2>
                <button 
                  onClick={() => setSelectedGuest(null)}
                  className="p-2 hover:bg-slate-100 rounded-full transition-colors"
                >
                  <X className="w-5 h-5 text-slate-500" />
                </button>
              </div>

              <div className="p-6 space-y-8">
                {/* Profile Section */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center text-center">
                  <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-slate-50 shadow-sm mb-4">
                    <img src={selectedGuest.avatar} alt={selectedGuest.name} className="w-full h-full object-cover" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900">{selectedGuest.name}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-slate-500 font-medium text-sm">{selectedGuest.id}</span>
                    <span className="w-1 h-1 bg-slate-300 rounded-full" />
                    <span className="text-slate-500 font-medium text-sm">{selectedGuest.guestType} Guest</span>
                  </div>
                  <div className="flex gap-2 mt-6 w-full">
                    <button className="flex-1 bg-primary text-white py-2.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 hover:bg-primary/90 transition-colors">
                      <Mail className="w-4 h-4" /> Email Guest
                    </button>
                    <button className="flex-1 bg-white border border-slate-200 text-slate-700 py-2.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 hover:bg-slate-50 transition-colors">
                      <Phone className="w-4 h-4" /> Call Guest
                    </button>
                  </div>
                </div>

                {/* Info Cards Grid */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white p-4 rounded-xl border border-slate-100">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Total Stays</p>
                    <p className="text-xl font-bold text-slate-900">{selectedGuest.totalStays} Records</p>
                  </div>
                  <div className="bg-white p-4 rounded-xl border border-slate-100">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Status</p>
                    <span className={`text-xs font-bold ${
                      selectedGuest.status === 'Checked-in' ? 'text-emerald-600' : 'text-blue-600'
                    }`}>{selectedGuest.status}</span>
                  </div>
                </div>

                {/* Personal Information */}
                <section>
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                    <User className="w-3 h-3" /> Personal Information
                  </h4>
                  <div className="bg-white rounded-2xl border border-slate-100 divide-y divide-slate-50">
                    <div className="p-4 flex justify-between">
                      <span className="text-sm text-slate-500">Age / Gender</span>
                      <span className="text-sm font-bold text-slate-900">{selectedGuest.age} / {selectedGuest.gender}</span>
                    </div>
                    <div className="p-4 flex justify-between">
                      <span className="text-sm text-slate-500">Email</span>
                      <span className="text-sm font-bold text-slate-900">{selectedGuest.email}</span>
                    </div>
                    <div className="p-4 flex justify-between">
                      <span className="text-sm text-slate-500">Phone</span>
                      <span className="text-sm font-bold text-slate-900">{selectedGuest.phone}</span>
                    </div>
                  </div>
                </section>

                {/* Preferences */}
                <section>
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                    <Star className="w-3 h-3" /> Guest Preferences
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedGuest.preferences.map(pref => (
                      <span key={pref} className="px-3 py-1.5 bg-white border border-slate-100 rounded-lg text-xs font-bold text-slate-700 shadow-sm flex items-center gap-1.5">
                        <CheckCircle2 className="w-3 h-3 text-emerald-500" /> {pref}
                      </span>
                    ))}
                  </div>
                </section>

                {/* Notes */}
                <section>
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                    <MessageSquare className="w-3 h-3" /> Staff Notes
                  </h4>
                  <div className="bg-amber-50/50 p-4 rounded-2xl border border-amber-100/50 italic text-sm text-slate-600 leading-relaxed shadow-inner">
                    "{selectedGuest.notes}"
                  </div>
                </section>

                {/* Stay History */}
                <section>
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                    <Calendar className="w-3 h-3" /> Stay History
                  </h4>
                  <div className="space-y-3">
                    {selectedGuest.stayHistory.length > 0 ? selectedGuest.stayHistory.map((stay) => (
                      <div key={stay.id} className="bg-white p-4 rounded-xl border border-slate-100 hover:border-primary/20 transition-colors shadow-sm">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <p className="text-sm font-bold text-slate-900">{stay.property}</p>
                            <p className="text-[10px] font-mono text-slate-400 uppercase">{stay.bookingRef}</p>
                          </div>
                          <span className="text-xs font-extrabold text-primary">{stay.amount}</span>
                        </div>
                        <div className="flex items-center justify-between mt-3 pt-3 border-t border-slate-50">
                          <div className="flex items-center gap-1 text-[11px] text-slate-500">
                            <Clock className="w-3 h-3" />
                            <span>{stay.checkIn} - {stay.checkOut}</span>
                          </div>
                          <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full uppercase">Finished</span>
                        </div>
                      </div>
                    )) : (
                      <div className="p-8 text-center text-slate-400 border-2 border-dashed border-slate-200 rounded-2xl">
                        No previous stay records found
                      </div>
                    )}
                  </div>
                </section>
              </div>
              
              <div className="sticky bottom-0 bg-white border-t border-slate-100 p-6 flex gap-3 z-20">
                <button className="flex-1 bg-slate-100 text-slate-700 py-3 rounded-xl font-bold text-sm hover:bg-slate-200 transition-colors">Edit Profile</button>
                <button className="flex-1 bg-white border border-red-100 text-red-600 py-3 rounded-xl font-bold text-sm hover:bg-red-50 transition-colors">Mark Inactive</button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default GuestManagementView;
