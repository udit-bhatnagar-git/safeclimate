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
  ClipboardList, 
  Trash2, 
  ChevronRight,
  X,
  Mail,
  Phone,
  MapPin,
  Clock,
  Shield,
  Calendar,
  History,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// Types
type StaffStatus = 'Active' | 'On Leave' | 'Inactive';
type StaffRole = 'Housekeeping' | 'Maintenance' | 'Front Desk' | 'Security' | 'Manager';

interface StaffMember {
  id: string;
  name: string;
  role: StaffRole;
  email: string;
  phone: string;
  assignedProperty: string;
  shift: string;
  status: StaffStatus;
  avatar: string;
  joinDate: string;
  permissions: string[];
  recentActivity: {
    id: string;
    action: string;
    time: string;
    description: string;
  }[];
}

const mockStaff: StaffMember[] = [
  {
    id: 'STF-001',
    name: 'Sarah Johnson',
    role: 'Housekeeping',
    email: 'sarah.j@grandplaza.com',
    phone: '+1 (555) 123-4567',
    assignedProperty: 'Grand Plaza Hotel',
    shift: '08:00 AM - 04:00 PM',
    status: 'Active',
    avatar: 'https://i.pravatar.cc/150?u=sarah',
    joinDate: '2023-05-12',
    permissions: ['Room Cleaning', 'Inventory Access', 'Maintenance Reporting'],
    recentActivity: [
      { id: 'act-1', action: 'Task Completed', time: '2 hours ago', description: 'Cleaned Room 402 - Deluxe King' },
      { id: 'act-2', action: 'Inventory Update', time: '5 hours ago', description: 'Restocked linen in Floor 4 supply closet' }
    ]
  },
  {
    id: 'STF-002',
    name: 'Michael Chen',
    role: 'Maintenance',
    email: 'm.chen@grandplaza.com',
    phone: '+1 (555) 234-5678',
    assignedProperty: 'Grand Plaza Hotel',
    shift: '10:00 AM - 06:00 PM',
    status: 'Active',
    avatar: 'https://i.pravatar.cc/150?u=michael',
    joinDate: '2023-08-20',
    permissions: ['Equipment Repair', 'HVAC Maintenance', 'Emergency Response'],
    recentActivity: [
      { id: 'act-3', action: 'Repair Finished', time: '1 hour ago', description: 'Fixed leaking faucet in Room 215' },
      { id: 'act-4', action: 'Inspection', time: 'Yesterday', description: 'Monthly elevator safety check completed' }
    ]
  },
  {
    id: 'STF-003',
    name: 'Elena Rodriguez',
    role: 'Front Desk',
    email: 'elena.r@sunsetresort.com',
    phone: '+1 (555) 345-6789',
    assignedProperty: 'Sunset Resort',
    shift: '02:00 PM - 10:00 PM',
    status: 'Active',
    avatar: 'https://i.pravatar.cc/150?u=elena',
    joinDate: '2024-01-15',
    permissions: ['Guest Check-in', 'Booking Access', 'Payment Processing'],
    recentActivity: [
      { id: 'act-5', action: 'Check-in', time: '15 mins ago', description: 'Checked in Mr. Henderson for Room 108' },
      { id: 'act-6', action: 'Reservation', time: '1 hour ago', description: 'Modified booking #BK-8822' }
    ]
  },
  {
    id: 'STF-004',
    name: 'David Wilson',
    role: 'Housekeeping',
    email: 'd.wilson@grandplaza.com',
    phone: '+1 (555) 456-7890',
    assignedProperty: 'Grand Plaza Hotel',
    shift: '08:00 AM - 04:00 PM',
    status: 'On Leave',
    avatar: 'https://i.pravatar.cc/150?u=david',
    joinDate: '2023-11-02',
    permissions: ['Room Cleaning', 'Laundry Service'],
    recentActivity: [
      { id: 'act-7', action: 'Status Update', time: '2 days ago', description: 'Requested annual leave' }
    ]
  },
  {
    id: 'STF-005',
    name: 'James Cooper',
    role: 'Manager',
    email: 'j.cooper@urbansuites.com',
    phone: '+1 (555) 567-8901',
    assignedProperty: 'Urban Suites',
    shift: '09:00 AM - 05:00 PM',
    status: 'Active',
    avatar: 'https://i.pravatar.cc/150?u=james',
    joinDate: '2022-03-10',
    permissions: ['Full Access', 'Staff Management', 'Financial Reports'],
    recentActivity: [
      { id: 'act-8', action: 'Report Generated', time: '3 hours ago', description: 'Exported Monthly Occupancy Report' }
    ]
  }
];

const StaffManagementView = () => {
  const [selectedStaff, setSelectedStaff] = useState<StaffMember | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('All Roles');
  const [propertyFilter, setPropertyFilter] = useState('All Properties');
  const [statusFilter, setStatusFilter] = useState('All Status');
  const [isAssignTaskModalOpen, setIsAssignTaskModalOpen] = useState(false);
  const [isEditingAssignment, setIsEditingAssignment] = useState(false);

  const availableProperties = ['Grand Plaza Hotel', 'Sunset Resort', 'Urban Suites', 'Beach Villa', 'Lake House', 'Mountain Cabin'];

  const stats = [
    { label: 'Total Staff', value: '42', icon: Users, color: 'bg-blue-50 text-blue-600' },
    { label: 'Active Staff', value: '38', icon: CheckCircle2, color: 'bg-emerald-50 text-emerald-600' },
    { label: 'On Leave', value: '4', icon: Calendar, color: 'bg-amber-50 text-amber-600' },
    { label: 'Housekeeping', value: '18', icon: ClipboardList, color: 'bg-indigo-50 text-indigo-600' },
    { label: 'Maintenance', value: '8', icon: AlertCircle, color: 'bg-orange-50 text-orange-600' },
  ];

  const filteredStaff = mockStaff.filter(staff => {
    const matchesSearch = staff.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         staff.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         staff.phone.includes(searchQuery);
    const matchesRole = roleFilter === 'All Roles' || staff.role === roleFilter;
    const matchesProperty = propertyFilter === 'All Properties' || staff.assignedProperty === propertyFilter;
    const matchesStatus = statusFilter === 'All Status' || staff.status === statusFilter;
    
    return matchesSearch && matchesRole && matchesProperty && matchesStatus;
  });

  return (
    <div className="space-y-8 pb-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Staff Management</h1>
          <p className="text-slate-500">Manage your property staff and their assignments</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <button className="btn-secondary rounded-xl flex items-center gap-2">
            <Upload className="w-4 h-4" />
            <span>Import Staff</span>
          </button>
          <button className="btn-secondary rounded-xl flex items-center gap-2">
            <Download className="w-4 h-4" />
            <span>Export Staff</span>
          </button>
          <button className="btn-primary rounded-xl flex items-center gap-2">
            <UserPlus className="w-4 h-4" />
            <span>Add Staff</span>
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4 transition-all hover:shadow-md">
            <div className={`p-3 rounded-xl ${stat.color}`}>
              <stat.icon className="w-6 h-6" />
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
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search staff by name, email, or phone..." 
              className="input w-full pl-10 h-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <select 
              className="input h-10 px-3 cursor-pointer"
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
            >
              <option>All Roles</option>
              <option>Housekeeping</option>
              <option>Maintenance</option>
              <option>Front Desk</option>
              <option>Security</option>
              <option>Manager</option>
            </select>
            <select 
              className="input h-10 px-3 cursor-pointer"
              value={propertyFilter}
              onChange={(e) => setPropertyFilter(e.target.value)}
            >
              <option>All Properties</option>
              <option>Grand Plaza Hotel</option>
              <option>Sunset Resort</option>
              <option>Urban Suites</option>
            </select>
            <select 
              className="input h-10 px-3 cursor-pointer"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option>All Status</option>
              <option>Active</option>
              <option>On Leave</option>
              <option>Inactive</option>
            </select>
            <button className="p-2 text-slate-400 hover:text-primary hover:bg-slate-50 rounded-lg transition-colors border border-slate-200">
              <Filter className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Staff Table */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-100">
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Staff Name</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Role</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Email</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Phone</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Assigned Property</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Shift</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filteredStaff.map((staff) => (
                <tr 
                  key={staff.id} 
                  className="hover:bg-slate-50/50 transition-colors cursor-pointer group"
                  onClick={() => setSelectedStaff(staff)}
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full overflow-hidden border border-slate-100 group-hover:border-primary/30 transition-colors">
                        <img src={staff.avatar} alt={staff.name} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-900">{staff.name}</p>
                        <p className="text-xs text-slate-500">{staff.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm font-medium text-slate-600">{staff.role}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-slate-600">{staff.email}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-slate-600">{staff.phone}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" />
                      <span className="text-sm text-slate-600">{staff.assignedProperty}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1.5 text-slate-600">
                      <Clock className="w-3.5 h-3.5" />
                      <span className="text-xs">{staff.shift}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold ${
                      staff.status === 'Active' ? 'bg-emerald-50 text-emerald-700' :
                      staff.status === 'On Leave' ? 'bg-amber-50 text-amber-700' :
                      'bg-slate-100 text-slate-700'
                    }`}>
                      {staff.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                      <button className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-primary transition-colors" title="View Profile">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-primary transition-colors" title="Edit Staff">
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button 
                        className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-primary transition-colors" 
                        title="Assign Tasks"
                        onClick={() => setIsAssignTaskModalOpen(true)}
                      >
                        <ClipboardList className="w-4 h-4" />
                      </button>
                      <button className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-red-500 transition-colors" title="Remove Staff">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filteredStaff.length === 0 && (
          <div className="p-12 text-center">
            <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4 border border-slate-100">
              <Users className="w-8 h-8 text-slate-300" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">No staff members found</h3>
            <p className="text-slate-500 max-w-xs mx-auto mt-1">Try adjusting your search or filters to find what you're looking for.</p>
          </div>
        )}
      </div>

      {/* Staff Details Panel */}
      <AnimatePresence>
        {selectedStaff && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedStaff(null)}
              className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-[100]"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 h-full w-full max-w-[450px] bg-white shadow-2xl z-[101] overflow-y-auto"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-xl font-bold text-slate-900">Staff Profile</h2>
                  <button 
                    onClick={() => setSelectedStaff(null)}
                    className="p-2 hover:bg-slate-100 rounded-full transition-colors"
                  >
                    <X className="w-5 h-5 text-slate-500" />
                  </button>
                </div>

                {/* Profile Header */}
                <div className="flex flex-col items-center text-center mb-8">
                  <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-slate-50 shadow-sm mb-4">
                    <img src={selectedStaff.avatar} alt={selectedStaff.name} className="w-full h-full object-cover" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900">{selectedStaff.name}</h3>
                  <p className="text-slate-500 font-medium">{selectedStaff.role} • {selectedStaff.id}</p>
                  <span className={`mt-3 inline-flex items-center px-3 py-1 rounded-full text-xs font-bold ${
                    selectedStaff.status === 'Active' ? 'bg-emerald-50 text-emerald-700' :
                    selectedStaff.status === 'On Leave' ? 'bg-amber-50 text-amber-700' :
                    'bg-slate-100 text-slate-700'
                  }`}>
                    {selectedStaff.status}
                  </span>
                </div>

                {/* Personal Information */}
                <div className="space-y-6">
                  <section>
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">Personal Information</h4>
                    <div className="space-y-4">
                      <div className="flex items-center gap-4 p-4 rounded-xl bg-slate-50 border border-slate-100 hover:border-primary/20 transition-colors">
                        <div className="p-2 rounded-lg bg-white shadow-sm">
                          <Mail className="w-4 h-4 text-primary" />
                        </div>
                        <div>
                          <p className="text-xs text-slate-400 font-medium">Email Address</p>
                          <p className="text-sm font-semibold text-slate-900">{selectedStaff.email}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 p-4 rounded-xl bg-slate-50 border border-slate-100 hover:border-primary/20 transition-colors">
                        <div className="p-2 rounded-lg bg-white shadow-sm">
                          <Phone className="w-4 h-4 text-primary" />
                        </div>
                        <div>
                          <p className="text-xs text-slate-400 font-medium">Phone Number</p>
                          <p className="text-sm font-semibold text-slate-900">{selectedStaff.phone}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 p-4 rounded-xl bg-slate-50 border border-slate-100 hover:border-primary/20 transition-colors">
                        <div className="p-2 rounded-lg bg-white shadow-sm">
                          <Calendar className="w-4 h-4 text-primary" />
                        </div>
                        <div>
                          <p className="text-xs text-slate-400 font-medium">Join Date</p>
                          <p className="text-sm font-semibold text-slate-900">{selectedStaff.joinDate}</p>
                        </div>
                      </div>
                      <div className="flex flex-col gap-3 p-4 rounded-xl bg-slate-50 border border-slate-100 hover:border-primary/20 transition-colors">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className="p-2 rounded-lg bg-white shadow-sm">
                              <MapPin className="w-4 h-4 text-primary" />
                            </div>
                            <div>
                              <p className="text-xs text-slate-400 font-medium">Assigned Property</p>
                              <p className="text-sm font-semibold text-slate-900">{selectedStaff.assignedProperty}</p>
                            </div>
                          </div>
                          {!isEditingAssignment && (
                            <button 
                              onClick={() => setIsEditingAssignment(true)}
                              className="text-xs font-bold text-primary hover:underline"
                            >
                              Change
                            </button>
                          )}
                        </div>
                        {isEditingAssignment && (
                          <div className="space-y-3 pt-2 border-t border-slate-200">
                            <select 
                              className="input w-full h-10 text-sm"
                              defaultValue={selectedStaff.assignedProperty}
                            >
                              {availableProperties.map(p => (
                                <option key={p} value={p}>{p}</option>
                              ))}
                            </select>
                            <div className="flex gap-2">
                              <button 
                                onClick={() => setIsEditingAssignment(false)}
                                className="btn-primary h-8 flex-1 text-xs"
                              >
                                Save Assignment
                              </button>
                              <button 
                                onClick={() => setIsEditingAssignment(false)}
                                className="btn-secondary h-8 flex-1 text-xs"
                              >
                                Cancel
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </section>

                  {/* Role & Permissions */}
                  <section>
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">Role & Permissions</h4>
                    <div className="p-4 rounded-xl border border-slate-100 space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Shield className="w-4 h-4 text-slate-400" />
                          <span className="text-sm font-semibold text-slate-900">Access Level</span>
                        </div>
                        <span className="text-sm text-primary font-bold">Level 2 (Standard)</span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {selectedStaff.permissions.map(perm => (
                          <span key={perm} className="px-2 py-1 bg-primary/5 text-primary text-[11px] font-bold rounded-lg border border-primary/10">
                            {perm}
                          </span>
                        ))}
                      </div>
                    </div>
                  </section>

                  {/* Schedule */}
                  <section>
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">Shift Schedule</h4>
                    <div className="p-4 rounded-xl border border-slate-100 bg-slate-50 shadow-inner">
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-sm font-bold text-slate-900">Weekly Shift</span>
                        <div className="flex items-center gap-1.5 px-2 py-1 bg-white rounded-lg border border-slate-200">
                          <Clock className="w-3.5 h-3.5 text-slate-400" />
                          <span className="text-xs font-bold text-slate-600">40h / week</span>
                        </div>
                      </div>
                      <div className="grid grid-cols-7 gap-2">
                        {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, idx) => (
                          <div key={idx} className={`flex flex-col items-center gap-1 ${idx > 4 ? 'opacity-40' : ''}`}>
                            <span className="text-[10px] font-bold text-slate-400 uppercase">{day}</span>
                            <div className={`w-full aspect-square rounded-lg flex items-center justify-center border ${idx > 4 ? 'border-slate-200' : 'bg-primary border-primary shadow-sm shadow-primary/20'}`}>
                              {idx <= 4 && <CheckCircle2 className="w-3 h-3 text-white" />}
                            </div>
                          </div>
                        ))}
                      </div>
                      <p className="mt-4 text-xs text-slate-500 font-medium">Standard morning shift: {selectedStaff.shift}</p>
                    </div>
                  </section>

                  {/* Activity History */}
                  <section>
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">Activity History</h4>
                    <div className="space-y-3 relative before:absolute before:left-[17px] before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-100">
                      {selectedStaff.recentActivity.map((act) => (
                        <div key={act.id} className="relative flex gap-4 pl-10 overflow-hidden">
                          <div className="absolute left-0 top-1.5 w-9 h-9 bg-white border-2 border-slate-100 rounded-full flex items-center justify-center z-10 group-hover:border-primary transition-colors">
                            <History className="w-4 h-4 text-slate-400" />
                          </div>
                          <div>
                            <div className="flex items-center gap-2 mb-0.5">
                              <span className="text-sm font-bold text-slate-900">{act.action}</span>
                              <span className="text-[10px] font-bold text-slate-400 uppercase">{act.time}</span>
                            </div>
                            <p className="text-xs text-slate-500 leading-relaxed">{act.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                    <button className="w-full mt-6 flex items-center justify-center gap-2 text-sm font-bold text-slate-500 hover:text-primary transition-colors">
                      <span>View Full History</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </section>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Assign Task Modal (Simplified for now) */}
      <AnimatePresence>
        {isAssignTaskModalOpen && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsAssignTaskModalOpen(false)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-md"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden"
            >
              <div className="p-8">
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center">
                      <ClipboardList className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-slate-900">Assign Task</h2>
                      <p className="text-slate-500">Create new task for staff members</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => setIsAssignTaskModalOpen(false)}
                    className="p-2 hover:bg-slate-100 rounded-full transition-colors"
                  >
                    <X className="w-5 h-5 text-slate-500" />
                  </button>
                </div>

                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">Task Type</label>
                    <div className="grid grid-cols-2 gap-3">
                      <button className="flex flex-col items-center gap-2 p-4 rounded-2xl border-2 border-primary bg-primary/5 text-primary">
                        <CheckCircle2 className="w-6 h-6" />
                        <span className="text-xs font-bold uppercase tracking-wider">Housekeeping</span>
                      </button>
                      <button className="flex flex-col items-center gap-2 p-4 rounded-2xl border-2 border-slate-100 hover:border-slate-200 transition-colors text-slate-500">
                        <AlertCircle className="w-6 h-6" />
                        <span className="text-xs font-bold uppercase tracking-wider">Maintenance</span>
                      </button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">Assign To</label>
                    <select className="input w-full h-12 px-4 appearance-none">
                      <option>Sarah Johnson (Housekeeping)</option>
                      <option>David Wilson (Housekeeping)</option>
                      <option>Michael Chen (Maintenance)</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">Room / Area</label>
                    <input type="text" placeholder="e.g. Room 402" className="input w-full h-12 px-4" />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">Task Description</label>
                    <textarea 
                      placeholder="Enter task details..."
                      className="input w-full h-32 p-4 resize-none"
                    />
                  </div>

                  <div className="pt-4 flex gap-3">
                    <button 
                      onClick={() => setIsAssignTaskModalOpen(false)}
                      className="btn-secondary flex-1 h-12 rounded-xl text-sm font-bold"
                    >
                      Cancel
                    </button>
                    <button 
                      onClick={() => setIsAssignTaskModalOpen(false)}
                      className="btn-primary flex-1 h-12 rounded-xl text-sm font-bold"
                    >
                      Create Task
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default StaffManagementView;
