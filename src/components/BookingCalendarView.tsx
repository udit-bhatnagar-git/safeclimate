import React, { useState } from 'react';
import { 
  Calendar as CalendarIcon, Search, Filter, ChevronLeft, ChevronRight, X, User, 
  Phone, Mail, MapPin, MoreHorizontal, CheckCircle2, AlertCircle, 
  Clock, CreditCard, MessageSquare, Edit, Ban, FileText, CalendarDays 
} from 'lucide-react';

type BookingStatus = 'confirmed' | 'checked_in' | 'pending' | 'cancelled' | 'blocked';

interface Room {
  id: string;
  name: string;
  type: string;
}

interface Booking {
  id: string;
  roomId: string;
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  checkIn: Date;
  checkOut: Date;
  status: BookingStatus;
  paymentStatus: 'paid' | 'pending' | 'partial';
  specialRequests?: string;
  totalPrice?: number;
}

const mockRooms: Room[] = [
  { id: 'r1', name: '101', type: 'Deluxe King' },
  { id: 'r2', name: '102', type: 'Deluxe King' },
  { id: 'r3', name: '103', type: 'Standard Double' },
  { id: 'r4', name: '104', type: 'Standard Double' },
  { id: 'r5', name: '201', type: 'Executive Suite' },
  { id: 'r6', name: '202', type: 'Executive Suite' },
  { id: 'r7', name: '301', type: 'Penthouse' },
];

const today = new Date();
today.setHours(0, 0, 0, 0);

const addDays = (date: Date, days: number) => {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};

const mockBookings: Booking[] = [
  {
    id: 'BKG-001',
    roomId: 'r1',
    guestName: 'Sarah Jenkins',
    guestEmail: 'sarah.j@example.com',
    guestPhone: '+1 (555) 123-4567',
    checkIn: addDays(today, 0),
    checkOut: addDays(today, 3),
    status: 'checked_in',
    paymentStatus: 'paid',
    totalPrice: 450,
    specialRequests: 'Late check-in requested around 8 PM.',
  },
  {
    id: 'BKG-002',
    roomId: 'r2',
    guestName: 'Michael Chen',
    guestEmail: 'mchen@example.com',
    guestPhone: '+1 (555) 987-6543',
    checkIn: addDays(today, -2),
    checkOut: addDays(today, 1),
    status: 'checked_in',
    paymentStatus: 'paid',
    totalPrice: 300,
  },
  {
    id: 'BKG-003',
    roomId: 'r5',
    guestName: 'Emma Thompson',
    guestEmail: 'emma.t@example.com',
    guestPhone: '+44 7700 900077',
    checkIn: addDays(today, 2),
    checkOut: addDays(today, 6),
    status: 'confirmed',
    paymentStatus: 'partial',
    totalPrice: 1200,
    specialRequests: 'Allergies to feathers. Please provide synthetic pillows.',
  },
  {
    id: 'BKG-004',
    roomId: 'r3',
    guestName: 'David Rodriguez',
    guestEmail: 'david.r@example.com',
    guestPhone: '+1 (555) 234-5678',
    checkIn: addDays(today, 1),
    checkOut: addDays(today, 2),
    status: 'pending',
    paymentStatus: 'pending',
    totalPrice: 120,
  },
  {
    id: 'BKG-005',
    roomId: 'r7',
    guestName: 'Company Retreat',
    guestEmail: 'admin@techcorp.com',
    guestPhone: '+1 (555) 000-1111',
    checkIn: addDays(today, 4),
    checkOut: addDays(today, 7),
    status: 'confirmed',
    paymentStatus: 'paid',
    totalPrice: 2400,
  },
  {
    id: 'BKG-006',
    roomId: 'r6',
    guestName: '',
    guestEmail: '',
    guestPhone: '',
    checkIn: addDays(today, 0),
    checkOut: addDays(today, 2),
    status: 'blocked',
    paymentStatus: 'paid',
  },
  {
    id: 'BKG-007',
    roomId: 'r4',
    guestName: 'Lisa Wong',
    guestEmail: 'lisa.w@example.com',
    guestPhone: '+1 (555) 444-5555',
    checkIn: addDays(today, -1),
    checkOut: addDays(today, 1),
    status: 'cancelled',
    paymentStatus: 'paid',
    totalPrice: 150,
  }
];

const statusColors: Record<BookingStatus, { bg: string, border: string, text: string }> = {
  confirmed: { bg: 'bg-blue-100', border: 'border-blue-300', text: 'text-blue-800' },
  checked_in: { bg: 'bg-green-100', border: 'border-green-300', text: 'text-green-800' },
  pending: { bg: 'bg-yellow-100', border: 'border-yellow-300', text: 'text-yellow-800' },
  cancelled: { bg: 'bg-red-100', border: 'border-red-300', text: 'text-red-800' },
  blocked: { bg: 'bg-slate-200', border: 'border-slate-300', text: 'text-slate-600' },
};

const BookingCalendarView = () => {
  const [currentDate, setCurrentDate] = useState(today);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const daysToShow = 14;

  const dates = Array.from({ length: daysToShow }).map((_, i) => addDays(currentDate, i));

  // Calendar metrics
  const totalRooms = mockRooms.length;
  const occupiedToday = mockBookings.filter(b => b.status === 'checked_in' || (b.status === 'confirmed' && b.checkIn <= today && b.checkOut > today)).length;
  const availableToday = totalRooms - occupiedToday;
  const checkInsToday = mockBookings.filter(b => b.checkIn.getTime() === today.getTime()).length;
  const checkOutsToday = mockBookings.filter(b => b.checkOut.getTime() === today.getTime()).length;

  const handleDragStart = (e: React.DragEvent) => {
    e.dataTransfer.setData('text/plain', 'booking');
  };

  const dayWidth = 120; // px
  
  return (
    <div className="h-full flex flex-col space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Booking Calendar</h1>
          <p className="text-slate-500">Manage room availability and reservations.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="btn-secondary whitespace-nowrap">
            <Filter className="w-4 h-4 mr-2" />
            More Filters
          </button>
          <button className="btn-primary whitespace-nowrap">
            New Booking
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm">
          <p className="text-sm font-medium text-slate-500">Total Rooms</p>
          <p className="text-2xl font-bold text-slate-900 mt-1">{totalRooms}</p>
        </div>
        <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm">
          <p className="text-sm font-medium text-slate-500">Occupied</p>
          <p className="text-2xl font-bold text-slate-900 mt-1">{occupiedToday}</p>
        </div>
        <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm">
          <p className="text-sm font-medium text-slate-500">Available</p>
          <p className="text-2xl font-bold text-slate-900 mt-1">{availableToday}</p>
        </div>
        <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm">
          <p className="text-sm font-medium text-slate-500">Check-ins Today</p>
          <p className="text-2xl font-bold text-blue-600 mt-1">{checkInsToday}</p>
        </div>
        <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm">
          <p className="text-sm font-medium text-slate-500">Check-outs Today</p>
          <p className="text-2xl font-bold text-orange-600 mt-1">{checkOutsToday}</p>
        </div>
      </div>

      {/* Calendar Controls & Filters */}
      <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm flex items-center justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-2">
          <button 
            className="p-2 hover:bg-slate-100 rounded-lg text-slate-600 transition-colors"
            onClick={() => setCurrentDate(addDays(currentDate, -1))}
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button 
            className="btn-secondary px-4 py-2"
            onClick={() => setCurrentDate(today)}
          >
            Today
          </button>
          <button 
            className="p-2 hover:bg-slate-100 rounded-lg text-slate-600 transition-colors"
            onClick={() => setCurrentDate(addDays(currentDate, 1))}
          >
            <ChevronRight className="w-5 h-5" />
          </button>
          <span className="ml-2 font-medium text-slate-700">
            {currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
          </span>
        </div>
        
        <div className="flex items-center gap-3 flex-wrap">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search Guest or ID..." 
              className="pl-9 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary w-48"
            />
          </div>
          <select className="px-3 py-2 border border-slate-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-primary/20">
            <option>All Properties</option>
            <option>Grand Plaza Hotel</option>
            <option>Oceanview Resort</option>
          </select>
          <select className="px-3 py-2 border border-slate-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-primary/20">
            <option>All Room Types</option>
            <option>Deluxe King</option>
            <option>Standard Double</option>
            <option>Suite</option>
          </select>
        </div>
      </div>

      {/* Calendar Grid & Details Layout */}
      <div className="flex flex-1 gap-6 relative min-h-[500px] overflow-hidden">
        {/* Main Calendar View */}
        <div className={`flex-1 bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col transition-all duration-300 ${selectedBooking ? 'w-[calc(100%-400px)]' : 'w-full'}`}>
          {/* Calendar Header Row */}
          <div className="flex border-b border-slate-200 bg-slate-50/80">
            <div className="w-48 shrink-0 p-4 border-r border-slate-200 font-semibold text-sm text-slate-700 flex items-center bg-slate-50 z-10 sticky left-0">
              Rooms
            </div>
            <div className="flex overflow-x-hidden flex-1" style={{ width: dates.length * dayWidth }}>
              {dates.map((date, i) => (
                <div key={i} className="shrink-0 text-center py-3 border-r border-slate-200 flex flex-col items-center justify-center" style={{ width: dayWidth }}>
                  <span className="text-xs font-semibold text-slate-500 uppercase">
                    {date.toLocaleDateString('en-US', { weekday: 'short' })}
                  </span>
                  <span className={`text-sm font-bold mt-0.5 ${date.getTime() === today.getTime() ? 'bg-primary text-white w-7 h-7 rounded-full flex items-center justify-center' : 'text-slate-900'}`}>
                    {date.getDate()}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Calendar Body Rows */}
          <div className="flex-1 overflow-x-auto overflow-y-auto w-full relative custom-scrollbar pb-10">
            {mockRooms.map(room => (
              <div key={room.id} className="flex border-b border-slate-100 group relative min-w-max">
                {/* Room Info Fixed Left */}
                <div className="w-48 shrink-0 p-4 border-r border-slate-200 bg-white sticky left-0 z-10 group-hover:bg-slate-50 transition-colors flex flex-col justify-center">
                  <span className="font-semibold text-slate-900 text-sm">Room {room.name}</span>
                  <span className="text-xs text-slate-500">{room.type}</span>
                </div>
                
                {/* Day Cells & Bookings */}
                <div className="flex relative items-center" style={{ width: dates.length * dayWidth, height: '64px' }}>
                  {/* Grid Lines */}
                  {dates.map((_, i) => (
                    <div 
                      key={i} 
                      className="h-full border-r border-slate-100 shrink-0 right-click-cell" 
                      style={{ width: dayWidth }}
                      onContextMenu={(e) => {
                        e.preventDefault();
                        // Right click action mock
                      }}
                    />
                  ))}

                  {/* Booking Blocks for this room */}
                  {mockBookings.filter(b => b.roomId === room.id).map(booking => {
                    // Calculate left/width based on dates
                    const calStart = dates[0].getTime();
                    const calEnd = dates[dates.length - 1].getTime() + 86400000; // end of last day
                    
                    if (booking.checkOut.getTime() <= calStart || booking.checkIn.getTime() >= calEnd) {
                      return null; // completely out of view
                    }

                    const visibleStart = Math.max(booking.checkIn.getTime(), calStart);
                    const visibleEnd = Math.min(booking.checkOut.getTime(), calEnd);
                    
                    const leftOffsetPx = ((visibleStart - calStart) / 86400000) * dayWidth;
                    const widthPx = ((visibleEnd - visibleStart) / 86400000) * dayWidth;

                    const isStartCut = booking.checkIn.getTime() < calStart;
                    const isEndCut = booking.checkOut.getTime() > calEnd;

                    const colors = statusColors[booking.status];

                    return (
                      <div
                        key={booking.id}
                        draggable
                        onDragStart={handleDragStart}
                        role="button"
                        onClick={() => setSelectedBooking(booking)}
                        className={`absolute top-2 bottom-2 rounded-md border shadow-sm cursor-grab active:cursor-grabbing hover:shadow-md transition-shadow overflow-hidden group
                          ${colors.bg} ${colors.border}
                          ${isStartCut ? 'rounded-l-none border-l-0' : ''}
                          ${isEndCut ? 'rounded-r-none border-r-0' : ''}
                        `}
                        style={{ left: `${leftOffsetPx}px`, width: `${widthPx}px` }}
                      >
                        <div className="px-2 py-1 h-full w-full flex flex-col justify-center min-w-[30px]">
                          {booking.status === 'blocked' ? (
                            <span className="text-xs font-semibold text-slate-500 flex items-center gap-1">
                              <Ban className="w-3 h-3" /> Blocked
                            </span>
                          ) : (
                            <>
                              <span className={`text-xs font-bold truncate ${colors.text}`}>
                                {booking.guestName}
                              </span>
                              {widthPx > 80 && (
                                <span className={`text-[10px] font-medium opacity-80 truncate ${colors.text}`}>
                                  {booking.id}
                                </span>
                              )}
                            </>
                          )}
                        </div>
                        
                        {/* Resize Handles (visual only) */}
                        {!isStartCut && (
                           <div className="absolute left-0 top-0 bottom-0 w-1 bg-black/5 cursor-col-resize hover:bg-black/20" />
                        )}
                        {!isEndCut && (
                           <div className="absolute right-0 top-0 bottom-0 w-1 bg-black/5 cursor-col-resize hover:bg-black/20" />
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
          
          {/* Legend */}
          <div className="bg-white border-t border-slate-200 p-3 flex items-center gap-4 text-xs font-medium text-slate-600 sticky bottom-0 z-20">
            <span className="flex items-center gap-1.5"><div className="w-3 h-3 rounded bg-blue-100 border border-blue-300"></div> Confirmed</span>
            <span className="flex items-center gap-1.5"><div className="w-3 h-3 rounded bg-green-100 border border-green-300"></div> Checked In</span>
            <span className="flex items-center gap-1.5"><div className="w-3 h-3 rounded bg-yellow-100 border border-yellow-300"></div> Pending</span>
            <span className="flex items-center gap-1.5"><div className="w-3 h-3 rounded bg-red-100 border border-red-300"></div> Cancelled</span>
            <span className="flex items-center gap-1.5"><div className="w-3 h-3 rounded bg-slate-200 border border-slate-300"></div> Blocked</span>
          </div>
        </div>

        {/* Right Side Booking Details Panel */}
        {selectedBooking && (
          <div className="w-[360px] shrink-0 bg-white rounded-xl border border-slate-200 shadow-xl overflow-hidden flex flex-col absolute right-0 top-0 h-full z-30 animate-in slide-in-from-right-8 duration-200">
            {/* Panel Header */}
            <div className="p-4 border-b border-slate-200 flex items-start justify-between bg-slate-50">
              <div>
                <h3 className="font-bold text-lg text-slate-900">{selectedBooking.status === 'blocked' ? 'Blocked Dates' : 'Booking Details'}</h3>
                {selectedBooking.id && selectedBooking.status !== 'blocked' && (
                  <p className="text-sm font-medium text-slate-500 mt-1">{selectedBooking.id}</p>
                )}
              </div>
              <button 
                onClick={() => setSelectedBooking(null)}
                className="p-1.5 hover:bg-slate-200 rounded-lg text-slate-500 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Panel Content */}
            <div className="p-5 overflow-y-auto flex-1 custom-scrollbar space-y-6">
              {/* Status Badge */}
              <div>
                <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold capitalize border ${statusColors[selectedBooking.status].bg} ${statusColors[selectedBooking.status].text} ${statusColors[selectedBooking.status].border}`}>
                  {selectedBooking.status.replace('_', ' ')}
                </span>
              </div>

              {selectedBooking.status !== 'blocked' ? (
                <>
                  {/* Guest Info */}
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary font-bold text-lg">
                      {selectedBooking.guestName.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900">{selectedBooking.guestName}</h4>
                      <p className="text-sm text-slate-500 flex items-center gap-1 mt-0.5">
                        <User className="w-3.5 h-3.5" /> 2 Guests
                      </p>
                    </div>
                  </div>

                  {/* Contact Info */}
                  <div className="bg-slate-50 rounded-xl p-4 space-y-3 border border-slate-100">
                    <div className="flex items-center gap-3 text-sm text-slate-700">
                      <Mail className="w-4 h-4 text-slate-400 shrink-0" />
                      <span className="truncate">{selectedBooking.guestEmail}</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-slate-700">
                      <Phone className="w-4 h-4 text-slate-400 shrink-0" />
                      <span>{selectedBooking.guestPhone}</span>
                    </div>
                  </div>

                  {/* Stay Details */}
                  <div className="space-y-4">
                    <h5 className="font-bold text-sm text-slate-900 uppercase tracking-wider">Stay Details</h5>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <span className="text-xs text-slate-500 font-medium">Check-in</span>
                        <div className="text-sm font-semibold text-slate-900 border border-slate-200 rounded-lg p-3 bg-slate-50">
                          {selectedBooking.checkIn.toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}
                          <p className="text-xs text-slate-500 mt-0.5 font-normal">from 3:00 PM</p>
                        </div>
                      </div>
                      <div className="space-y-1">
                        <span className="text-xs text-slate-500 font-medium">Check-out</span>
                        <div className="text-sm font-semibold text-slate-900 border border-slate-200 rounded-lg p-3 bg-slate-50">
                          {selectedBooking.checkOut.toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}
                          <p className="text-xs text-slate-500 mt-0.5 font-normal">until 11:00 AM</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between py-3 border-b border-slate-100">
                      <span className="text-sm text-slate-500">Room</span>
                      <span className="text-sm font-semibold text-slate-900">{mockRooms.find(r => r.id === selectedBooking.roomId)?.name} ({mockRooms.find(r => r.id === selectedBooking.roomId)?.type})</span>
                    </div>
                    <div className="flex items-center justify-between py-3 border-b border-slate-100">
                      <span className="text-sm text-slate-500">Nights</span>
                      <span className="text-sm font-semibold text-slate-900">
                        {Math.round((selectedBooking.checkOut.getTime() - selectedBooking.checkIn.getTime()) / 86400000)} Nights
                      </span>
                    </div>
                  </div>

                  {/* Payment Summary */}
                  <div className="space-y-4 pt-2">
                    <h5 className="font-bold text-sm text-slate-900 uppercase tracking-wider flex items-center justify-between">
                      Payment
                      {selectedBooking.paymentStatus === 'paid' && <span className="text-xs text-green-600 bg-green-100 px-2 py-0.5 rounded-full capitalize flex items-center gap-1"><CheckCircle2 className="w-3 h-3" /> Paid</span>}
                      {selectedBooking.paymentStatus === 'pending' && <span className="text-xs text-yellow-600 bg-yellow-100 px-2 py-0.5 rounded-full capitalize">Pending</span>}
                      {selectedBooking.paymentStatus === 'partial' && <span className="text-xs text-blue-600 bg-blue-100 px-2 py-0.5 rounded-full capitalize">Partial</span>}
                    </h5>
                    
                    <div className="bg-slate-50 rounded-xl p-4 border border-slate-100 space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-500">Total Price</span>
                        <span className="font-semibold text-slate-900">${selectedBooking.totalPrice?.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>

                  {/* Special Requests */}
                  {selectedBooking.specialRequests && (
                    <div className="space-y-2 pt-2">
                      <h5 className="font-bold text-sm text-slate-900 uppercase tracking-wider">Special Requests / Notes</h5>
                      <div className="bg-yellow-50 rounded-lg p-3 border border-yellow-200 text-sm text-yellow-800">
                        {selectedBooking.specialRequests}
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <div className="py-4 space-y-4">
                  <p className="text-sm text-slate-600">This room has been blocked for maintenance or manual override.</p>
                  <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                    <div className="space-y-3">
                       <div className="flex justify-between items-center text-sm">
                          <span className="text-slate-500">Start Date</span>
                          <span className="font-medium text-slate-900">{selectedBooking.checkIn.toLocaleDateString()}</span>
                       </div>
                       <div className="flex justify-between items-center text-sm">
                          <span className="text-slate-500">End Date</span>
                          <span className="font-medium text-slate-900">{selectedBooking.checkOut.toLocaleDateString()}</span>
                       </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Panel Footer Actions */}
            <div className="p-4 border-t border-slate-200 bg-white grid grid-cols-2 gap-3 shrink-0">
              {selectedBooking.status !== 'blocked' ? (
                <>
                  <button className="btn-secondary w-full flex items-center justify-center gap-2">
                    <Edit className="w-4 h-4" /> Edit
                  </button>
                  <button className="btn-secondary w-full flex items-center justify-center gap-2">
                    <MessageSquare className="w-4 h-4" /> Message
                  </button>
                  <button className="btn-secondary w-full flex items-center justify-center gap-2 col-span-2">
                    <FileText className="w-4 h-4" /> View Invoice
                  </button>
                  <button className="py-2.5 w-full flex items-center justify-center gap-2 col-span-2 text-sm font-semibold text-red-600 hover:bg-red-50 rounded-lg transition-colors border border-transparent hover:border-red-100">
                    <XCircle className="w-4 h-4" /> Cancel Booking
                  </button>
                </>
              ) : (
                <button className="btn-secondary w-full flex items-center justify-center gap-2 col-span-2 text-red-600 hover:text-red-700 hover:bg-red-50">
                  <Ban className="w-4 h-4" /> Remove Block
                </button>
              )}
            </div>
          </div>
        )}
      </div>

    </div>
  );
};

export default BookingCalendarView;
