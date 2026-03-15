import React from 'react';
import { 
  X, 
  User, 
  LogOut, 
  CreditCard, 
  Settings, 
  Building2, 
  ChevronRight, 
  Plus, 
  CalendarPlus, 
  DoorOpen, 
  UserPlus, 
  MinusCircle,
  HelpCircle,
  FileText,
  MessageSquare,
  Video,
  PlayCircle,
  Users,
  Sparkles,
  AlertCircle,
  ShieldCheck,
  ClipboardList,
  Zap
} from 'lucide-react';
import { motion } from 'motion/react';

interface SupportPanelProps {
  isOpen: boolean;
  onClose: () => void;
  user: {
    name: string;
    email: string;
    avatar?: string;
    id: string;
    orgId: string;
    role: string;
    plan: string;
  };
  activeProperty: string;
}

const SupportPanel: React.FC<SupportPanelProps> = ({ isOpen, onClose, user, activeProperty }) => {
  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-[2px] z-[100] transition-opacity"
          onClick={onClose}
        />
      )}

      {/* Panel */}
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: isOpen ? 0 : '100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className="fixed top-0 right-0 h-full w-[360px] bg-white shadow-2xl z-[101] flex flex-col overflow-hidden border-l border-slate-200"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-100">
          <h2 className="text-lg font-bold text-slate-900">Account & Support</h2>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-slate-100 rounded-lg transition-colors text-slate-500 hover:text-slate-700"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto custom-scrollbar p-5 space-y-6">
          {/* SECTION 1: User Profile */}
          <section className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center overflow-hidden">
                {user.avatar ? (
                  <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                ) : (
                  <User className="w-7 h-7 text-primary" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-slate-900 truncate">{user.name}</h3>
                <p className="text-sm text-slate-500 truncate">{user.email}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                <p className="text-[10px] uppercase tracking-wider font-bold text-slate-400">User ID</p>
                <p className="text-xs font-medium text-slate-700 mt-1">{user.id}</p>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                <p className="text-[10px] uppercase tracking-wider font-bold text-slate-400">Org ID</p>
                <p className="text-xs font-medium text-slate-700 mt-1">{user.orgId}</p>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                <p className="text-[10px] uppercase tracking-wider font-bold text-slate-400">Role</p>
                <p className="text-xs font-medium text-slate-700 mt-1">{user.role}</p>
              </div>
              <div className="p-3 bg-primary/5 rounded-xl border border-primary/10">
                <p className="text-[10px] uppercase tracking-wider font-bold text-primary/60">Current Plan</p>
                <p className="text-xs font-bold text-primary mt-1">{user.plan}</p>
              </div>
            </div>

            <div className="space-y-1 pt-1">
              {[
                { label: 'My Account', icon: Settings },
                { label: 'Billing & Subscription', icon: CreditCard },
                { label: 'Sign Out', icon: LogOut, color: 'text-red-500' },
              ].map((action) => (
                <button 
                  key={action.label}
                  className="w-full flex items-center justify-between p-2.5 hover:bg-slate-50 rounded-lg transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <action.icon className={`w-4 h-4 ${action.color || 'text-slate-500'}`} />
                    <span className={`text-sm font-medium ${action.color || 'text-slate-700'}`}>{action.label}</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-slate-400 transition-colors" />
                </button>
              ))}
            </div>
          </section>

          <hr className="border-slate-100" />

          {/* SECTION 2: Property Access */}
          <section className="space-y-3">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Property Access</h4>
            <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-emerald-50 flex items-center justify-center">
                  <Building2 className="w-5 h-5 text-emerald-600" />
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-900">{activeProperty}</p>
                  <p className="text-[11px] text-emerald-600 font-medium">Currently Active</p>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-2">
              {[
                { label: 'Switch Property', icon: Users },
                { label: 'View Property', icon: FileText },
                { label: 'Edit Property', icon: Settings },
              ].map((action) => (
                <button 
                  key={action.label}
                  className="flex items-center gap-3 px-3 py-2 hover:bg-slate-50 rounded-lg transition-colors text-slate-600 text-sm font-medium"
                >
                  <action.icon className="w-4 h-4 text-slate-400" />
                  {action.label}
                </button>
              ))}
            </div>
          </section>

          <hr className="border-slate-100" />

          {/* SECTION 3: Quick Actions */}
          <section className="space-y-3">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Quick Actions</h4>
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: 'Add Booking', icon: CalendarPlus },
                { label: 'Add Room', icon: DoorOpen },
                { label: 'Add Guest', icon: UserPlus },
                { label: 'Block Dates', icon: MinusCircle },
              ].map((action) => (
                <button 
                  key={action.label}
                  className="flex flex-col items-start gap-2 p-3 bg-white border border-slate-200 rounded-xl hover:border-primary hover:bg-primary/5 transition-all group"
                >
                  <action.icon className="w-5 h-5 text-slate-400 group-hover:text-primary" />
                  <span className="text-[13px] font-semibold text-slate-700">{action.label}</span>
                </button>
              ))}
            </div>
          </section>

          <hr className="border-slate-100" />

          {/* SECTION 4: Support Center */}
          <section className="space-y-3">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Support Center</h4>
            <div className="grid grid-cols-1 gap-1">
              {[
                { label: 'Help Documentation', icon: FileText },
                { label: 'FAQs', icon: HelpCircle },
                { label: 'Contact Support', icon: MessageSquare },
                { label: 'Live Chat', icon: Zap },
              ].map((link) => (
                <button 
                  key={link.label}
                  className="flex items-center justify-between p-2 hover:bg-slate-50 rounded-lg transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <link.icon className="w-4 h-4 text-slate-400" />
                    <span className="text-[13px] font-medium text-slate-700">{link.label}</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-300 opacity-0 group-hover:opacity-100 transition-all" />
                </button>
              ))}
            </div>
          </section>

          <hr className="border-slate-100" />

          {/* SECTION 5: Product Learning */}
          <section className="space-y-3">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Product Learning</h4>
            <div className="grid grid-cols-1 gap-1">
              {[
                { label: 'Product Guide', icon: PlayCircle },
                { label: 'Video Tutorials', icon: Video },
                { label: 'Webinars', icon: Users },
                { label: 'Explore Features', icon: Sparkles },
              ].map((link) => (
                <button 
                  key={link.label}
                  className="flex items-center gap-3 p-2 hover:bg-slate-50 rounded-lg transition-colors"
                >
                  <link.icon className="w-4 h-4 text-slate-400" />
                  <span className="text-[13px] font-medium text-slate-700">{link.label}</span>
                </button>
              ))}
            </div>
          </section>

          <hr className="border-slate-100" />

          {/* SECTION 6: Alerts */}
          <section className="space-y-3">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">System Alerts</h4>
            <div className="space-y-2">
              {[
                { label: 'Trial expires in 3 days', icon: AlertCircle, color: 'text-amber-600', bg: 'bg-amber-50', border: 'border-amber-100' },
                { label: 'Pending KYC Verification', icon: ShieldCheck, color: 'text-blue-600', bg: 'bg-blue-50', border: 'border-blue-100' },
                { label: '5 Housekeeping tasks pending', icon: ClipboardList, color: 'text-slate-600', bg: 'bg-slate-50', border: 'border-slate-100' },
              ].map((alert) => (
                <div 
                  key={alert.label}
                  className={`flex items-start gap-3 p-3 rounded-xl border ${alert.bg} ${alert.border}`}
                >
                  <alert.icon className={`w-4 h-4 mt-0.5 ${alert.color}`} />
                  <p className={`text-xs font-medium ${alert.color.replace('text', 'text-slate-800')}`}>{alert.label}</p>
                </div>
              ))}
            </div>
          </section>

          <hr className="border-slate-100" />

          {/* SECTION 7: What's New */}
          <section className="space-y-3 pb-5">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">What's New</h4>
            <div className="space-y-3">
              {[
                { title: 'New Booking Calendar', date: 'v2.4.0', desc: 'Smarter views and faster interaction.' },
                { title: 'New Analytics Dashboard', date: 'v2.3.0', desc: 'Deeper insights into your revenue.' },
                { title: 'New Feature Releases', date: 'Weekly', desc: 'See what we\u2019ve built for you recently.' },
              ].map((update) => (
                <div key={update.title} className="group cursor-pointer">
                  <div className="flex items-center justify-between mb-1">
                    <h5 className="text-[13px] font-bold text-slate-900 group-hover:text-primary transition-colors">{update.title}</h5>
                    <span className="text-[10px] bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded font-bold">{update.date}</span>
                  </div>
                  <p className="text-[12px] text-slate-500 line-clamp-2 leading-relaxed">{update.desc}</p>
                </div>
              ))}
            </div>
            <button className="w-full py-2 text-xs font-bold text-primary hover:underline">
              View all product updates
            </button>
          </section>
        </div>
      </motion.div>
    </>
  );
};

export default SupportPanel;
