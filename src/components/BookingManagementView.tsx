import React, { useState } from 'react';
import { 
  Search, 
  Plus, 
  Download, 
  Upload, 
  Filter, 
  Calendar, 
  Users, 
  MoreHorizontal, 
  Eye, 
  Edit2, 
  CheckCircle, 
  LogOut, 
  FileText, 
  XCircle,
  TrendingUp,
  BedDouble,
  DollarSign,
  ChevronRight,
  X,
  CreditCard,
  MapPin,
  Clock,
  MessageSquare,
  ArrowUpRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// Types
type BookingStatus = 'Confirmed' | 'Pending' | 'Checked In' | 'Checked Out' | 'Cancelled' | 'No Show';
type PaymentStatus = 'Paid' | 'Partially Paid' | 'Unpaid' | 'Refunded';

interface Booking {
  id: string;
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  room: string;
  roomType: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  status: BookingStatus;
  paymentStatus: PaymentStatus;
  amount: number;
  source: string;
  notes?: string;
}

const bookingsData: Booking[] = [
  { id: 'BK-8291', guestName: 'Alexander Wright', guestEmail: 'alex.w@gmail.com', guestPhone: '+1 (555) 012-3456', room: 'Deluxe #302', roomType: 'Deluxe King', checkIn: 'Mar 15, 2026', checkOut: 'Mar 18, 2026', guests: 2, status: 'Checked In', paymentStatus: 'Paid', amount: 450.00, source: 'Booking.com', notes: 'Late check-in requested' },
  { id: 'BK-8292', guestName: 'Sarah Jenkins', guestEmail: 's.jenkins@outlook.com', guestPhone: '+1 (555) 987-6543', room: 'Suite #105', roomType: 'Executive Suite', checkIn: 'Mar 16, 2026', checkOut: 'Mar 20, 2026', guests: 3, status: 'Confirmed', paymentStatus: 'Partially Paid', amount: 820.00, source: 'Direct Website' },
  { id: 'BK-8293', guestName: 'Michael Chen', guestEmail: 'mchen88@yahoo.com', guestPhone: '+1 (555) 234-5678', room: 'Standard #210', roomType: 'Standard Queen', checkIn: 'Mar 15, 2026', checkOut: 'Mar 16, 2026', guests: 1, status: 'Checked Out', paymentStatus: 'Paid', amount: 125.00, source: 'Expedia' },
  { id: 'BK-8294', guestName: 'Emily Rodriguez', guestEmail: 'emily.rod@gmail.com', guestPhone: '+1 (555) 345-6789', room: 'Deluxe #305', roomType: 'Deluxe King', checkIn: 'Mar 20, 2026', checkOut: 'Mar 25, 2026', guests: 2, status: 'Pending', paymentStatus: 'Unpaid', amount: 950.00, source: 'Airbnb' },
  { id: 'BK-8295', guestName: 'David Thompson', guestEmail: 'dthomp@protonmail.com', guestPhone: '+1 (555) 456-7890', room: 'Suite #102', roomType: 'Executive Suite', checkIn: 'Mar 14, 2026', checkOut: 'Mar 17, 2026', guests: 2, status: 'No Show', paymentStatus: 'Unpaid', amount: 640.00, source: 'Booking.com' },
  { id: 'BK-8296', guestName: 'Olivia Wilson', guestEmail: 'olivia.w@icloud.com', guestPhone: '+1 (555) 567-8901', room: 'Standard #215', roomType: 'Standard Queen', checkIn: 'Mar 22, 2026', checkOut: 'Mar 24, 2026', guests: 2, status: 'Cancelled', paymentStatus: 'Refunded', amount: 280.00, source: 'Direct Website' },
  { id: 'BK-8297', guestName: 'James Miller', guestEmail: 'jmiller@gmail.com', guestPhone: '+1 (555) 678-9012', room: 'Deluxe #310', roomType: 'Deluxe King', checkIn: 'Mar 15, 2026', checkOut: 'Mar 19, 2026', guests: 2, status: 'Checked In', paymentStatus: 'Paid', amount: 560.00, source: 'Agoda' },
];

const BookingManagementView = () => {
  const [activeTab, setActiveTab] = useState<string>('All Bookings');
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const statusTabs = [
    { name: 'All Bookings', count: 124 },
    { name: 'Confirmed', count: 42 },
    { name: 'Pending', count: 18 },
    { name: 'Checked In', count: 24 },
    { name: 'Checked Out', count: 32 },
    { name: 'Cancelled', count: 5 },
    { name: 'No Show', count: 3 },
  ];

  const getStatusColor = (status: BookingStatus) => {
    switch (status) {
      case 'Confirmed': return 'bg-blue-50 text-blue-700 border-blue-100';
      case 'Pending': return 'bg-amber-50 text-amber-700 border-amber-100';
      case 'Checked In': return 'bg-emerald-50 text-emerald-700 border-emerald-100';
      case 'Checked Out': return 'bg-slate-50 text-slate-700 border-slate-100';
      case 'Cancelled': return 'bg-red-50 text-red-700 border-red-100';
      case 'No Show': return 'bg-rose-50 text-rose-700 border-rose-100';
      default: return 'bg-slate-50 text-slate-700 border-slate-100';
    }
  };

  const getPaymentStatusColor = (status: PaymentStatus) => {
    switch (status) {
      case 'Paid': return 'text-emerald-600';
      case 'Partially Paid': return 'text-blue-600';
      case 'Unpaid': return 'text-red-600';
      case 'Refunded': return 'text-slate-600';
      default: return 'text-slate-600';
    }
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Booking Management</h1>
          <p className="text-slate-500">Overview and management of all property reservations.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="btn-secondary">
            <Upload className="w-4 h-4" />
            <span>Import</span>
          </button>
          <button className="btn-secondary">
            <Download className="w-4 h-4" />
            <span>Export</span>
          </button>
          <button className="btn-primary shadow-lg shadow-primary/20">
            <Plus className="w-4 h-4" />
            <span>New Booking</span>
          </button>
        </div>
      </div>

      {/* Analytics Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {[
          { label: 'Bookings Today', value: '18', change: '+12%', icon: FileText, color: 'text-blue-600', bg: 'bg-blue-50' },
          { label: 'Check-ins Today', value: '12', change: '+5%', icon: Calendar, color: 'text-emerald-600', bg: 'bg-emerald-50' },
          { label: 'Check-outs Today', value: '9', change: '-2%', icon: LogOut, color: 'text-amber-600', bg: 'bg-amber-50' },
          { label: 'Revenue Today', value: '$2,450', change: '+18%', icon: DollarSign, color: 'text-indigo-600', bg: 'bg-indigo-50' },
          { label: 'Occupancy Rate', value: '84%', change: '+3%', icon: BedDouble, color: 'text-purple-600', bg: 'bg-purple-50' },
        ].map((stat) => (
          <div key={stat.label} className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <div className={`p-2 rounded-lg ${stat.bg}`}>
                <stat.icon className={`w-5 h-5 ${stat.color}`} />
              </div>
              <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${stat.change.startsWith('+') ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'}`}>
                {stat.change}
              </span>
            </div>
            <p className="text-xs font-medium text-slate-500">{stat.label}</p>
            <h3 className="text-xl font-bold text-slate-900 mt-1">{stat.value}</h3>
          </div>
        ))}
      </div>

      {/* Filters & Tabs Section */}
      <div className="space-y-4">
        {/* Search and Dropdowns */}
        <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <div className="relative flex-1 w-full lg:max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Guest, ID, or phone..." 
              className="input pl-10 h-10 text-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
            <select className="btn-secondary h-10 text-sm font-normal py-0">
              <option>All Properties</option>
              <option>Grand Plaza Hotel</option>
              <option>Sunset Resort</option>
            </select>
            <select className="btn-secondary h-10 text-sm font-normal py-0">
              <option>Room Type</option>
              <option>Deluxe King</option>
              <option>Executive Suite</option>
            </select>
            <button className="btn-secondary h-10 gap-2">
              <Calendar className="w-4 h-4 text-slate-400" />
              <span>Mar 1 - Mar 31</span>
            </button>
            <button className="btn-secondary h-10 px-3">
              <Filter className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Status Tabs */}
        <div className="flex items-center gap-1 border-b border-slate-200 overflow-x-auto no-scrollbar">
          {statusTabs.map((tab) => (
            <button
              key={tab.name}
              onClick={() => setActiveTab(tab.name)}
              className={`px-4 py-3 text-sm font-medium whitespace-nowrap transition-all border-b-2 relative ${
                activeTab === tab.name 
                ? 'text-primary border-primary' 
                : 'text-slate-500 border-transparent hover:text-slate-700'
              }`}
            >
              <div className="flex items-center gap-2">
                <span>{tab.name}</span>
                <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                  activeTab === tab.name ? 'bg-primary/10 text-primary' : 'bg-slate-100 text-slate-500'
                }`}>
                  {tab.count}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Booking Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-200">
                <th className="px-6 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-wider">Booking ID</th>
                <th className="px-6 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-wider">Guest</th>
                <th className="px-6 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-wider">Room</th>
                <th className="px-6 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-wider">Dates</th>
                <th className="px-6 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-wider">Guests</th>
                <th className="px-6 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-wider text-right">Amount</th>
                <th className="px-6 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {bookingsData.map((booking) => (
                <tr 
                  key={booking.id} 
                  className="hover:bg-slate-50/80 transition-colors group cursor-pointer"
                  onClick={() => setSelectedBooking(booking)}
                >
                  <td className="px-6 py-4">
                    <span className="text-sm font-bold text-slate-900">{booking.id}</span>
                    <div className="flex items-center gap-1 mt-0.5">
                      <span className="text-[10px] text-slate-400">{booking.source}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="text-sm font-semibold text-slate-900 group-hover:text-primary transition-colors">{booking.guestName}</span>
                      <span className="text-[11px] text-slate-500">{booking.guestEmail}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="text-sm text-slate-700">{booking.room}</span>
                      <span className="text-[11px] text-slate-400">{booking.roomType}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="text-sm text-slate-700">{booking.checkIn}</span>
                      <div className="flex items-center gap-1">
                        <ChevronRight className="w-3 h-3 text-slate-300" />
                        <span className="text-[11px] text-slate-400">{booking.checkOut}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1.5 text-sm text-slate-700">
                      <Users className="w-3.5 h-3.5 text-slate-400" />
                      <span>{booking.guests}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${getStatusColor(booking.status)}`}>
                      {booking.status}
                    </span>
                    <div className={`text-[10px] font-medium mt-1.5 flex items-center gap-1 ${getPaymentStatusColor(booking.paymentStatus)}`}>
                      <div className={`w-1 h-1 rounded-full ${
                        booking.paymentStatus === 'Paid' ? 'bg-emerald-500' : 
                        booking.paymentStatus === 'Unpaid' ? 'bg-red-500' : 'bg-blue-500'
                      }`}></div>
                      {booking.paymentStatus}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <span className="text-sm font-bold text-slate-900">${booking.amount.toFixed(2)}</span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2" onClick={(e) => e.stopPropagation()}>
                      <button className="p-2 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-slate-600 transition-colors">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-2 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-slate-600 transition-colors">
                        <MoreHorizontal className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-6 py-4 bg-slate-50/50 border-t border-slate-200 flex items-center justify-between">
          <p className="text-xs text-slate-500">Showing 7 of 124 bookings</p>
          <div className="flex items-center gap-2">
            <button className="btn-secondary h-8 px-3 text-xs opacity-50 cursor-not-allowed">Previous</button>
            <button className="btn-secondary h-8 px-3 text-xs">Next</button>
          </div>
        </div>
      </div>

      {/* Booking Details Drawer */}
      <AnimatePresence>
        {selectedBooking && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedBooking(null)}
              className="fixed inset-0 bg-slate-900/40 backdrop-blur-[2px] z-[100]"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl z-[101] overflow-y-auto"
            >
              <div className="flex flex-col h-full">
                {/* Drawer Header */}
                <div className="p-6 border-b border-slate-100 flex items-center justify-between sticky top-0 bg-white z-10">
                  <div>
                    <h2 className="text-lg font-bold text-slate-900">Booking Details</h2>
                    <p className="text-xs text-slate-500 mt-0.5">{selectedBooking.id} • {selectedBooking.source}</p>
                  </div>
                  <button 
                    onClick={() => setSelectedBooking(null)}
                    className="p-2 hover:bg-slate-100 rounded-xl text-slate-400 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Drawer Content */}
                <div className="flex-1 p-6 space-y-8">
                  {/* Status & Actions */}
                  <div className="flex items-center justify-between bg-slate-50 p-4 rounded-xl border border-slate-100">
                    <div className="space-y-1">
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Current Status</p>
                      <span className={`inline-block px-3 py-1 rounded-full text-[11px] font-bold border ${getStatusColor(selectedBooking.status)}`}>
                        {selectedBooking.status}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <button className="p-2 bg-white border border-slate-200 rounded-lg text-slate-600 hover:border-primary hover:text-primary transition-all">
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button className="btn-primary h-9 px-4 text-xs">Update Status</button>
                    </div>
                  </div>

                  {/* Guest Info */}
                  <section className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                        <Users className="w-4 h-4 text-primary" />
                        Guest Information
                      </h4>
                      <button className="text-xs font-semibold text-primary hover:underline">Edit</button>
                    </div>
                    <div className="bg-slate-50/50 rounded-xl p-4 border border-slate-100 space-y-4">
                      <div className="flex gap-4">
                        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-lg">
                          {selectedBooking.guestName.charAt(0)}
                        </div>
                        <div>
                          <p className="text-sm font-bold text-slate-900">{selectedBooking.guestName}</p>
                          <p className="text-xs text-slate-500 mt-1 flex items-center gap-1">
                            <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
                            Loyalty Member (Gold)
                          </p>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4 pt-2">
                        <div className="space-y-1">
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Email</p>
                          <p className="text-xs text-slate-700 font-medium truncate">{selectedBooking.guestEmail}</p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Phone</p>
                          <p className="text-xs text-slate-700 font-medium">{selectedBooking.guestPhone}</p>
                        </div>
                      </div>
                    </div>
                  </section>

                  {/* Booking Details */}
                  <section className="space-y-4">
                    <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-primary" />
                      Booking Details
                    </h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Check-in</p>
                        <p className="text-xs font-bold text-slate-900">{selectedBooking.checkIn}</p>
                        <p className="text-[10px] text-slate-500">From 14:00 PM</p>
                      </div>
                      <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Check-out</p>
                        <p className="text-xs font-bold text-slate-900">{selectedBooking.checkOut}</p>
                        <p className="text-[10px] text-slate-500">Before 11:00 AM</p>
                      </div>
                    </div>
                    <div className="bg-slate-50/50 rounded-xl p-4 border border-slate-100 grid grid-cols-2 gap-y-4">
                      <div>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Room Assigned</p>
                        <p className="text-xs font-bold text-slate-900 mt-1">{selectedBooking.room}</p>
                        <p className="text-[10px] text-slate-500">{selectedBooking.roomType}</p>
                      </div>
                      <div>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Occupancy</p>
                        <p className="text-xs font-bold text-slate-900 mt-1">{selectedBooking.guests} Guests</p>
                        <p className="text-[10px] text-slate-500">2 Adults</p>
                      </div>
                    </div>
                  </section>

                  {/* Payment Summary */}
                  <section className="space-y-4">
                    <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                      <CreditCard className="w-4 h-4 text-primary" />
                      Payment Summary
                    </h4>
                    <div className="bg-slate-900 text-white rounded-2xl p-6 shadow-xl relative overflow-hidden">
                      <div className="relative z-10 space-y-6">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Total Amount</p>
                            <h3 className="text-3xl font-bold mt-1">${selectedBooking.amount.toFixed(2)}</h3>
                          </div>
                          <span className={`px-2 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider ${
                            selectedBooking.paymentStatus === 'Paid' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-rose-500/20 text-rose-400'
                          }`}>
                            {selectedBooking.paymentStatus}
                          </span>
                        </div>
                        <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-5 bg-white/10 rounded flex items-center justify-center">
                              <span className="text-[8px] font-bold">VISA</span>
                            </div>
                            <span className="text-xs text-slate-300">**** 4242</span>
                          </div>
                          <button className="text-xs font-bold text-primary hover:text-white transition-colors flex items-center gap-1">
                            Invoice <ArrowUpRight className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                      <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-primary/20 rounded-full blur-3xl"></div>
                    </div>
                  </section>

                  {/* Notes */}
                  <section className="space-y-4">
                    <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                      <MessageSquare className="w-4 h-4 text-primary" />
                      Notes
                    </h4>
                    <div className="bg-amber-50 border border-amber-100 rounded-xl p-4">
                      <p className="text-xs text-amber-900 leading-relaxed font-medium">
                        {selectedBooking.notes || 'No special requests or notes for this booking.'}
                      </p>
                    </div>
                  </section>
                </div>

                {/* Drawer Footer */}
                <div className="p-6 border-t border-slate-100 flex items-center gap-3 bg-slate-50 mt-auto">
                  <button className="btn-secondary flex-1">Send Message</button>
                  <button className="btn-primary flex-1">Manage Booking</button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default BookingManagementView;
