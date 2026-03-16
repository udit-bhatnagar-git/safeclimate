import React, { useState, useRef, useEffect } from 'react';
import {
  Calendar as CalendarIcon,
  Search,
  Filter,
  ChevronLeft,
  ChevronRight,
  X,
  Ban,
  Clock,
  ShieldCheck,
  Globe,
  Plus,
  ArrowRight,
  AlertTriangle,
  Info,
  Check,
  Settings,
  Download,
  Upload,
  Layers,
  CalendarDays,
  MoreVertical,
  MinusCircle,
  PlusCircle,
  Unlock,
  Lock
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// Types
type AvailabilityStatus = 'available' | 'booked' | 'blocked' | 'maintenance';

interface Room {
  id: string;
  name: string;
  category: string;
}

interface DateStatus {
  date: string; // ISO string YYYY-MM-DD
  status: AvailabilityStatus;
  reason?: string;
  restrictions?: {
    minStay?: number;
    maxStay?: number;
    cta?: boolean; // Closed to Arrival
    ctd?: boolean; // Closed to Departure
  };
}

// Mock Data
const mockRooms: Room[] = [
  { id: '1', name: '101', category: 'Deluxe King' },
  { id: '2', name: '102', category: 'Deluxe King' },
  { id: '3', name: '201', category: 'Executive Suite' },
  { id: '4', name: '202', category: 'Executive Suite' },
  { id: '5', name: '301', category: 'Penthouse' },
];

const today = new Date();
today.setHours(0, 0, 0, 0);

const formatDate = (date: Date) => date.toISOString().split('T')[0];

const generateMockStatus = () => {
  const statuses: Record<string, Record<string, DateStatus>> = {};
  mockRooms.forEach(room => {
    statuses[room.id] = {};
    for (let i = -5; i < 20; i++) {
      const d = new Date(today);
      d.setDate(d.getDate() + i);
      const ds = formatDate(d);
      
      let status: AvailabilityStatus = 'available';
      if (i === 1 || i === 2) status = 'booked';
      else if (i === 5) status = 'blocked';
      else if (i === 10) status = 'maintenance';

      statuses[room.id][ds] = {
        date: ds,
        status,
        reason: status === 'maintenance' ? 'AC Repair' : status === 'blocked' ? 'Owner Stay' : undefined,
        restrictions: {
          minStay: i % 7 === 0 ? 2 : 1,
          cta: i % 10 === 0
        }
      };
    }
  });
  return statuses;
};

const statusConfig: Record<AvailabilityStatus, { bg: string; border: string; text: string; label: string; dot: string }> = {
  available: {
    bg: 'bg-emerald-50',
    border: 'border-emerald-200',
    text: 'text-emerald-700',
    dot: 'bg-emerald-500',
    label: 'Available'
  },
  booked: {
    bg: 'bg-blue-50',
    border: 'border-blue-200',
    text: 'text-blue-700',
    dot: 'bg-blue-500',
    label: 'Booked'
  },
  blocked: {
    bg: 'bg-slate-50',
    border: 'border-slate-200',
    text: 'text-slate-700',
    dot: 'bg-slate-500',
    label: 'Blocked'
  },
  maintenance: {
    bg: 'bg-amber-50',
    border: 'border-amber-200',
    text: 'text-amber-700',
    dot: 'bg-amber-500',
    label: 'Maintenance'
  }
};

const AvailabilityView = () => {
  const [currentDate, setCurrentDate] = useState(new Date(today));
  const [selectedRoom, setSelectedRoom] = useState<string | null>(null);
  const [showBlockModal, setShowBlockModal] = useState(false);
  const [showBulkUpdateModal, setShowBulkUpdateModal] = useState(false);
  const [showImportModal, setShowImportModal] = useState(false);
  const [availabilityData, setAvailabilityData] = useState(generateMockStatus());
  
  const daysToShow = 14;
  const dates = Array.from({ length: daysToShow }).map((_, i) => {
    const d = new Date(currentDate);
    d.setDate(d.getDate() + i);
    return d;
  });

  const calendarRef = useRef<HTMLDivElement>(null);

  const handlePrev = () => {
    const d = new Date(currentDate);
    d.setDate(d.getDate() - 7);
    setCurrentDate(d);
  };

  const handleNext = () => {
    const d = new Date(currentDate);
    d.setDate(d.getDate() + 7);
    setCurrentDate(d);
  };

  const handleToday = () => {
    setCurrentDate(new Date(today));
  };

  return (
    <div className="space-y-8 pb-20">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Availability Management</h1>
          <p className="text-slate-500">Control room availability and booking restrictions.</p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setShowBlockModal(true)}
            className="btn-secondary h-10 px-4 flex items-center gap-2"
          >
            <Ban className="w-4 h-4" />
            <span>Block Dates</span>
          </button>
          <button 
            onClick={() => setShowBulkUpdateModal(true)}
            className="btn-secondary h-10 px-4 flex items-center gap-2"
          >
            <Layers className="w-4 h-4" />
            <span>Bulk Update</span>
          </button>
          <button 
            onClick={() => setShowImportModal(true)}
            className="btn-primary h-10 px-4 flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            <span>Import Calendar</span>
          </button>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Total Rooms', value: '42', icon: CalendarDays, color: 'text-blue-600', bg: 'bg-blue-50' },
          { label: 'Available Units', value: '18', icon: Check, color: 'text-emerald-600', bg: 'bg-emerald-50' },
          { label: 'Blocked Units', value: '4', icon: Ban, color: 'text-slate-600', bg: 'bg-slate-50' },
          { label: 'Maintenance', value: '2', icon: Settings, color: 'text-amber-600', bg: 'bg-amber-50' },
        ].map((stat, i) => (
          <div key={i} className="card group hover:border-primary transition-all cursor-default">
            <div className="flex items-center justify-between mb-3">
              <div className={`w-10 h-10 rounded-lg ${stat.bg} flex items-center justify-center`}>
                <stat.icon className={`w-5 h-5 ${stat.color}`} />
              </div>
            </div>
            <p className="text-sm font-medium text-slate-500">{stat.label}</p>
            <h3 className="text-2xl font-bold text-slate-900 mt-1">{stat.value}</h3>
          </div>
        ))}
      </div>

      {/* Main Calendar Section */}
      <div className="card overflow-hidden !p-0">
        {/* Calendar Toolbar */}
        <div className="p-4 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <button onClick={handlePrev} className="p-2 hover:bg-slate-50 rounded-lg border border-slate-200">
              <ChevronLeft className="w-4 h-4 text-slate-600" />
            </button>
            <button onClick={handleToday} className="px-4 py-2 hover:bg-slate-50 rounded-lg border border-slate-200 text-sm font-semibold text-slate-700">
              Today
            </button>
            <button onClick={handleNext} className="p-2 hover:bg-slate-50 rounded-lg border border-slate-200">
              <ChevronRight className="w-4 h-4 text-slate-600" />
            </button>
            <span className="ml-4 text-lg font-bold text-slate-900">
              {currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search rooms..." 
                className="input pl-9 w-64 h-10 text-sm"
              />
            </div>
            <button className="p-2 hover:bg-slate-50 rounded-lg border border-slate-200">
              <Filter className="w-4 h-4 text-slate-600" />
            </button>
          </div>
        </div>

        {/* Grid Container */}
        <div className="overflow-x-auto custom-scrollbar" ref={calendarRef}>
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-slate-50/50">
                <th className="sticky left-0 z-20 bg-white border-r border-slate-100 p-4 min-w-[200px] text-left">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Room Name</span>
                </th>
                {dates.map((date, i) => (
                  <th key={i} className="border-r border-slate-100 p-3 min-w-[100px] text-center">
                    <div className="flex flex-col items-center">
                      <span className="text-[11px] font-bold text-slate-400 uppercase">
                        {date.toLocaleDateString('en-US', { weekday: 'short' })}
                      </span>
                      <span className={`text-[14px] font-bold mt-1 h-8 w-8 flex items-center justify-center rounded-full ${formatDate(date) === formatDate(new Date()) ? 'bg-primary text-white' : 'text-slate-900'}`}>
                        {date.getDate()}
                      </span>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {mockRooms.map((room) => (
                <tr key={room.id} className="border-t border-slate-100 group transition-colors hover:bg-slate-50/50">
                  <td className="sticky left-0 z-10 bg-white border-r border-slate-100 p-4 group-hover:bg-slate-50/50">
                    <div className="flex flex-col">
                      <span className="text-sm font-bold text-slate-900">{room.name}</span>
                      <span className="text-xs text-slate-500">{room.category}</span>
                    </div>
                  </td>
                  {dates.map((date, i) => {
                    const ds = formatDate(date);
                    const cellData = availabilityData[room.id]?.[ds] || { status: 'available' };
                    const config = statusConfig[cellData.status];
                    
                    return (
                      <td 
                        key={i} 
                        className={`border-r border-slate-100 p-2 text-center group/cell relative cursor-pointer min-w-[100px]`}
                        onClick={() => setSelectedRoom(`${room.id}-${ds}`)}
                      >
                        <div className={`h-16 rounded-lg border ${config.bg} ${config.border} flex flex-col items-center justify-center transition-all group-hover/cell:shadow-sm group-hover/cell:scale-[1.02]`}>
                          <div className={`w-1.5 h-1.5 rounded-full ${config.dot} mb-1`} />
                          <span className={`text-[10px] font-bold uppercase tracking-wider ${config.text}`}>
                            {config.label}
                          </span>
                          {cellData.restrictions?.minStay && cellData.restrictions.minStay > 1 && (
                            <div className="mt-1 flex items-center gap-1">
                              <ShieldCheck className="w-3 h-3 text-slate-400" />
                              <span className="text-[9px] font-medium text-slate-500">Min {cellData.restrictions.minStay}n</span>
                            </div>
                          )}
                          {cellData.restrictions?.cta && (
                            <div className="absolute top-1 right-1">
                              <Lock className="w-3 h-3 text-red-400" />
                            </div>
                          )}
                        </div>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Legend */}
        <div className="p-4 border-t border-slate-100 bg-slate-50/50 flex flex-wrap items-center gap-6">
          {Object.entries(statusConfig).map(([key, config]) => (
            <div key={key} className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full ${config.dot}`} />
              <span className="text-xs font-semibold text-slate-600">{config.label}</span>
            </div>
          ))}
          <div className="flex-1" />
          <div className="flex items-center gap-4">
             <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-slate-400" />
                <span className="text-xs text-slate-600 font-medium">Restrictions Active</span>
             </div>
             <div className="flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-red-400" />
                <span className="text-xs text-slate-600 font-medium">Closed to Arrival</span>
             </div>
          </div>
        </div>
      </div>

      {/* Booking Restrictions Section */}
      <div className="card">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="card-title">Global Booking Restrictions</h3>
            <p className="text-sm text-slate-500 mt-1">Set default rules for stays across all properties.</p>
          </div>
          <button className="btn-secondary h-9 px-4 text-xs">Reset to Defaults</button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="space-y-3">
            <label className="text-sm font-semibold text-slate-700">Minimum Stay</label>
            <div className="flex items-center gap-3">
              <button className="p-2 border border-slate-200 rounded-lg hover:bg-slate-50"><MinusCircle className="w-4 h-4" /></button>
              <div className="flex-1 text-center font-bold text-slate-900 border border-slate-200 rounded-lg py-2">1 Night</div>
              <button className="p-2 border border-slate-200 rounded-lg hover:bg-slate-50"><PlusCircle className="w-4 h-4" /></button>
            </div>
          </div>
          <div className="space-y-3">
            <label className="text-sm font-semibold text-slate-700">Maximum Stay</label>
            <div className="flex items-center gap-3">
              <button className="p-2 border border-slate-200 rounded-lg hover:bg-slate-50"><MinusCircle className="w-4 h-4" /></button>
              <div className="flex-1 text-center font-bold text-slate-900 border border-slate-200 rounded-lg py-2">30 Nights</div>
              <button className="p-2 border border-slate-200 rounded-lg hover:bg-slate-50"><PlusCircle className="w-4 h-4" /></button>
            </div>
          </div>
          <div className="space-y-3">
            <label className="text-sm font-semibold text-slate-700">Check-in Days</label>
            <div className="flex items-center gap-1">
              {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, i) => (
                <button key={i} className={`flex-1 h-8 rounded-md text-[10px] font-bold border transition-colors ${i < 5 ? 'bg-primary text-white border-primary' : 'bg-slate-50 text-slate-400 border-slate-200'}`}>
                  {day}
                </button>
              ))}
            </div>
          </div>
          <div className="space-y-3">
            <label className="text-sm font-semibold text-slate-700">Guest Review Threshold</label>
            <select className="input w-full h-10 text-sm">
              <option>Any Guest</option>
              <option>Above 4.0 Rating</option>
              <option>Repeat Guests Only</option>
            </select>
          </div>
        </div>
      </div>

      {/* Modals Layer */}
      <AnimatePresence>
        {showBlockModal && (
          <Modal title="Block Dates" onClose={() => setShowBlockModal(false)}>
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">Select Room</label>
                <select className="input w-full">
                  <option>All Rooms</option>
                  {mockRooms.map(r => <option key={r.id}>{r.name} - {r.category}</option>)}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700">Start Date</label>
                  <input type="date" className="input w-full" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700">End Date</label>
                  <input type="date" className="input w-full" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">Reason for Block</label>
                <div className="grid grid-cols-2 gap-3">
                  {['Maintenance', 'Owner Stay', 'Cleaning', 'Private Event'].map(reason => (
                    <button key={reason} type="button" className="flex items-center gap-2 p-3 rounded-xl border border-slate-200 hover:border-primary hover:bg-primary/5 transition-all group">
                      <div className="w-2 h-2 rounded-full bg-slate-300 group-hover:bg-primary" />
                      <span className="text-sm font-medium text-slate-700">{reason}</span>
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex justify-end gap-3 pt-4">
                <button type="button" onClick={() => setShowBlockModal(false)} className="btn-secondary px-6">Cancel</button>
                <button type="submit" className="btn-primary px-6">Create Block</button>
              </div>
            </form>
          </Modal>
        )}

        {showBulkUpdateModal && (
          <Modal title="Bulk Update Availability" onClose={() => setShowBulkUpdateModal(false)}>
             <div className="space-y-6">
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex gap-3">
                   <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0" />
                   <p className="text-sm text-amber-800">
                      Bulk updates will overwrite existing availability and restrictions for the selected period. This action cannot be undone.
                   </p>
                </div>
                
                <div className="space-y-2">
                   <label className="text-sm font-semibold text-slate-700">Step 1: Select Room Categories</label>
                   <div className="grid grid-cols-2 gap-3">
                      {['Deluxe King', 'Executive Suite', 'Standard Double', 'Penthouse'].map(cat => (
                         <button key={cat} className="flex items-center justify-between p-3 rounded-xl border border-slate-200 hover:border-primary transition-all">
                            <span className="text-sm font-medium">{cat}</span>
                            <div className="w-5 h-5 rounded border border-slate-300 flex items-center justify-center">
                               <Check className="w-3 h-3 text-white" />
                            </div>
                         </button>
                      ))}
                   </div>
                </div>

                <div className="space-y-2">
                   <label className="text-sm font-semibold text-slate-700">Step 2: Define Rules</label>
                   <div className="grid grid-cols-2 gap-4">
                      <div className="p-4 rounded-xl border border-slate-200 space-y-3">
                         <span className="text-xs font-bold text-slate-400 uppercase">Availability</span>
                         <div className="flex gap-2">
                           <button className="flex-1 py-2 rounded-md bg-emerald-500 text-white text-sm font-bold">Open</button>
                           <button className="flex-1 py-2 rounded-md border border-slate-200 text-slate-600 text-sm font-bold">Close</button>
                         </div>
                      </div>
                      <div className="p-4 rounded-xl border border-slate-200 space-y-3">
                         <span className="text-xs font-bold text-slate-400 uppercase">Pricing Adjustment</span>
                         <input type="text" placeholder="+10%" className="input w-full h-9 text-sm" />
                      </div>
                   </div>
                </div>

                <div className="flex justify-end gap-3 pt-4">
                   <button onClick={() => setShowBulkUpdateModal(false)} className="btn-secondary px-6">Cancel</button>
                   <button className="btn-primary px-6">Apply Rules</button>
                </div>
             </div>
          </Modal>
        )}

        {showImportModal && (
          <Modal title="Import Calendar (iCal)" onClose={() => setShowImportModal(false)}>
            <div className="space-y-6">
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl flex gap-3">
                <Info className="w-5 h-5 text-blue-600 shrink-0" />
                <p className="text-sm text-blue-800">
                  Connect your external calendars (Airbnb, Booking.com, VRBO) to sync availability automatically.
                </p>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700">Platform Name</label>
                  <select className="input w-full">
                    <option>Airbnb</option>
                    <option>Booking.com</option>
                    <option>Expedia</option>
                    <option>Other (iCal)</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700">Calendar URL (.ics)</label>
                  <div className="flex gap-2">
                    <input type="text" placeholder="https://www.airbnb.com/calendar/ical..." className="input flex-1" />
                    <button className="btn-secondary px-4"><Globe className="w-4 h-4" /></button>
                  </div>
                </div>
              </div>

              <div className="pt-4 space-y-4">
                <span className="text-xs font-bold text-slate-400 uppercase">Connected Feeds</span>
                <div className="space-y-2">
                   {[
                     { platform: 'Airbnb', url: 'airbnb.ics', status: 'Synced 2m ago' },
                     { platform: 'Booking.com', url: 'booking_export.ics', status: 'Pending' },
                   ].map((feed, i) => (
                     <div key={i} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100">
                        <div className="flex items-center gap-3">
                           <div className="w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center text-[10px] font-bold">
                              {feed.platform[0]}
                           </div>
                           <div>
                              <p className="text-sm font-bold text-slate-900">{feed.platform}</p>
                              <p className="text-xs text-slate-500">{feed.url}</p>
                           </div>
                        </div>
                        <div className="flex items-center gap-3">
                           <span className="text-[10px] font-bold text-slate-400">{feed.status}</span>
                           <button className="p-1.5 hover:bg-slate-200 rounded-lg"><X className="w-4 h-4 text-slate-400" /></button>
                        </div>
                     </div>
                   ))}
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button onClick={() => setShowImportModal(false)} className="btn-secondary px-6">Close</button>
                <button className="btn-primary px-6">Add Calendar</button>
              </div>
            </div>
          </Modal>
        )}

        {selectedRoom && (
           <Modal title="Room Status Overwrite" onClose={() => setSelectedRoom(null)}>
              <div className="space-y-6">
                 <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100">
                    <div>
                       <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Selected Date</p>
                       <p className="text-lg font-bold text-slate-900">{new Date(selectedRoom.split('-').slice(1).join('-')).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                    </div>
                    <div className="text-right">
                       <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Room</p>
                       <p className="text-lg font-bold text-primary">{mockRooms.find(r => r.id === selectedRoom.split('-')[0])?.name}</p>
                    </div>
                 </div>

                 <div className="space-y-3">
                    <label className="text-sm font-semibold text-slate-700">Set Availability Status</label>
                    <div className="grid grid-cols-2 gap-3">
                       {Object.entries(statusConfig).map(([key, config]) => (
                          <button key={key} className={`flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all ${key === 'available' ? 'border-primary bg-primary/5' : 'border-slate-100 hover:border-slate-200'}`}>
                             <div className={`w-3 h-3 rounded-full ${config.dot} mb-2`} />
                             <span className="text-sm font-bold text-slate-900">{config.label}</span>
                          </button>
                       ))}
                    </div>
                 </div>

                 <div className="space-y-3">
                    <label className="text-sm font-semibold text-slate-700">Booking Actions</label>
                    <div className="flex gap-3">
                       <button className="flex-1 py-3 rounded-xl border border-slate-200 font-bold text-sm flex items-center justify-center gap-2 hover:bg-slate-50">
                          <Lock className="w-4 h-4" /> Close to Arrival
                       </button>
                       <button className="flex-1 py-3 rounded-xl border border-slate-200 font-bold text-sm flex items-center justify-center gap-2 hover:bg-slate-50">
                          <Unlock className="w-4 h-4" /> Open for Stays
                       </button>
                    </div>
                 </div>

                 <div className="flex justify-end gap-3 pt-4">
                    <button onClick={() => setSelectedRoom(null)} className="btn-secondary px-6">Cancel</button>
                    <button className="btn-primary px-6">Save Changes</button>
                 </div>
              </div>
           </Modal>
        )}
      </AnimatePresence>
    </div>
  );
};

const Modal = ({ title, children, onClose }: { title: string; children: React.ReactNode; onClose: () => void }) => (
  <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" 
    />
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, y: 20 }}
      className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden relative z-10"
    >
      <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
        <h3 className="text-xl font-bold text-slate-900 tracking-tight">{title}</h3>
        <button onClick={onClose} className="p-2 hover:bg-slate-200/50 rounded-full transition-colors">
          <X className="w-5 h-5 text-slate-500" />
        </button>
      </div>
      <div className="p-6 overflow-y-auto max-h-[80vh]">
        {children}
      </div>
    </motion.div>
  </div>
);

export default AvailabilityView;
