import React, { useState, useEffect, useRef } from 'react';
import {
  LayoutDashboard,
  Building2,
  BedDouble,
  Wifi,
  FileText,
  CalendarDays,
  Users,
  UserCircle,
  Search,
  Bell,
  Plus,
  ChevronDown,
  MoreHorizontal,
  TrendingUp,
  CheckCircle2,
  Clock,
  ArrowUpRight,
  Menu,
  X,
  Home,
  ChevronRight,
  ChevronLeft,
  MapPin,
  Globe,
  DollarSign,
  Check,
  Upload,
  Trash2,
  Save,
  Map,
  ShieldCheck,
  CreditCard,
  Sparkles,
  Shield,
  Baby,
  Ban,
  Info,
  LayoutGrid,
  XCircle,
  UserCheck,
  FileStack,
  Car,
  Waves,
  Dumbbell,
  Utensils,
  ArrowUpCircle,
  Shirt,
  Settings,
  BarChart2
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import ImageUploader from './components/ImageUploader';
import SupportPanel from './components/SupportPanel';
import BookingManagementView from './components/BookingManagementView';
import BookingCalendarView from './components/BookingCalendarView';
import ReviewsManagementView from './components/ReviewsManagementView';
import StaffManagementView from './components/StaffManagementView';
import GuestManagementView from './components/GuestManagementView';
import CancellationPolicyView from './components/CancellationPolicyView';
import SettingsView from './components/SettingsView';
import AvailabilityView from './components/AvailabilityView';
import PricingManagementView from './components/PricingManagementView';
import RatePlansView from './components/RatePlansView';
import ChannelManagerView from './components/ChannelManagerView';
import InvoicesPaymentsView from './components/InvoicesPaymentsView';
import ReportsAnalyticsView from './components/ReportsAnalyticsView';
import PropertySwitcher from './components/PropertySwitcher';
import PropertiesManagementView from './components/PropertiesManagementView';
import AddPropertyWizard from './components/AddPropertyWizard';
import PropertyInfoView from './components/PropertyInfoView';
import PropertyFeaturesView from './components/PropertyFeaturesView';
import PropertyPoliciesView from './components/PropertyPoliciesView';
import RoomCategoriesView from './components/RoomCategoriesView';
import PropertySettingsView from './components/PropertySettingsView';
import PricingSetupView from './components/PricingSetupView';

import DashboardContent from './components/DashboardView';
import KYCDetailsView from './components/KYCDetailsView';
import KYCDocumentsView from './components/KYCDocumentsView';
import SubscriptionView from './components/SubscriptionView';
import { Toggle, SectionCard, MultiSelectField } from './components/UIComponents';

// Types
type NavItem = {
  id: string;
  label: string;
  icon?: React.ElementType;
  children?: NavItem[];
};

const navItems: NavItem[] = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'properties', label: 'Properties', icon: Building2 },
  {
    id: 'integrations',
    label: 'Integrations',
    icon: Globe,
    children: [
      { id: 'channel-manager', label: 'Channel Manager', icon: Globe },
      {
        id: 'property',
        label: 'Property',
        icon: Building2,
        children: [
          { id: 'property-info', label: 'Property Info', icon: FileText },
          { id: 'property-settings', label: 'Property Settings', icon: Settings },
          { id: 'features', label: 'Features', icon: Wifi },
          { id: 'policies', label: 'Property Policy', icon: ShieldCheck },
          {
            id: 'rooms-nested',
            label: 'Rooms',
            icon: BedDouble,
            children: [
              { id: 'room-categories', label: 'Room Categories', icon: LayoutGrid },
            ]
          },
          {
            id: 'kyc',
            label: 'KYC',
            icon: ShieldCheck,
            children: [
              { id: 'kyc-details', label: 'KYC Details', icon: UserCheck },
              { id: 'kyc-documents', label: 'KYC Documents', icon: FileStack },
            ]
          }
        ]
      }
    ]
  },
  { id: 'booking-calendar', label: 'Booking Calendar', icon: CalendarDays },
  { id: 'availability', label: 'Availability', icon: CalendarDays },
  { id: 'bookings', label: 'Booking List', icon: FileText },
  { id: 'cancellation-policy', label: 'Cancellation Policy', icon: XCircle },
  { id: 'reviews', label: 'Reviews', icon: Sparkles },
  { id: 'guests', label: 'Guests', icon: Users },
  { id: 'staff', label: 'Staff', icon: UserCircle },
  { id: 'pricing', label: 'Pricing Management', icon: DollarSign },
  { id: 'rate-plans', label: 'Rate Plans', icon: FileStack },
  { id: 'invoices-payments', label: 'Invoices & Payments', icon: CreditCard },
  { id: 'reports', label: 'Reports & Analytics', icon: BarChart2 },
  { id: 'settings', label: 'Settings', icon: Settings }
];

// Components
const SidebarItem = ({
  item,
  activeTab,
  setActiveTab,
  isSidebarOpen,
  level = 0,
  parentCollapsed,
  showTooltip,
  onShowFloating,
  floatingOpen,
  closeFloating
}: {
  item: NavItem;
  activeTab: string;
  setActiveTab: (id: string) => void;
  isSidebarOpen: boolean;
  level?: number;
  key?: React.Key;
  parentCollapsed?: boolean;
  showTooltip?: boolean;
  onShowFloating?: (item: NavItem, anchorRect: DOMRect) => void;
  floatingOpen?: boolean;
  closeFloating?: () => void;
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const hasChildren = item.children && item.children.length > 0;
  const isActive = activeTab === item.id;
  const btnRef = useRef<HTMLButtonElement>(null);

  // For floating submenu
  const handleIconClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isSidebarOpen) {
      if (hasChildren) setIsExpanded((v) => !v);
      else setActiveTab(item.id);
    } else {
      if (hasChildren && onShowFloating && btnRef.current) {
        onShowFloating(item, btnRef.current.getBoundingClientRect());
      } else {
        setActiveTab(item.id);
      }
    }
  };

  // Mouse events for tooltip
  const [hovered, setHovered] = useState(false);

  return (
    <div className="w-full relative" onMouseLeave={() => { if (closeFloating) closeFloating(); }}>
      <button
        ref={btnRef}
        onClick={handleIconClick}
        className={`sidebar-item w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 group ${!isSidebarOpen ? 'justify-center' : ''} ${isActive ? 'active' : ''}`}
        style={{ paddingLeft: isSidebarOpen ? `${(level * 12) + 12}px` : '12px', position: 'relative' }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {item.icon && <item.icon className={`w-5 h-5 shrink-0 ${isActive ? 'text-primary' : 'text-slate-400 group-hover:text-white'}`} />}
        {!item.icon && level > 0 && <div className="w-5 h-5 shrink-0 flex items-center justify-center">
          <div className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-primary' : 'bg-slate-600'}`} />
        </div>}
        {isSidebarOpen && (
          <div className="flex-1 flex items-center justify-between overflow-hidden">
            <span className="truncate">{item.label}</span>
            {hasChildren && (
              <motion.div
                animate={{ rotate: isExpanded ? 180 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <ChevronDown className="w-4 h-4 opacity-50" />
              </motion.div>
            )}
          </div>
        )}
        {/* Tooltip for collapsed */}
        {!isSidebarOpen && hovered && (
          <span className="absolute left-16 top-1/2 -translate-y-1/2 bg-slate-900 text-white text-[12px] rounded px-2 py-1 shadow-lg pointer-events-none whitespace-nowrap z-50">{item.label}</span>
        )}
      </button>
      {/* Expanded children (expanded mode) */}
      {hasChildren && isSidebarOpen && (
        <AnimatePresence initial={false}>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2, ease: 'easeInOut' }}
              className="overflow-hidden"
            >
              {item.children?.map((child) => (
                <SidebarItem
                  key={child.id}
                  item={child}
                  activeTab={activeTab}
                  setActiveTab={setActiveTab}
                  isSidebarOpen={isSidebarOpen}
                  level={level + 1}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      )}
      {/* Floating submenu (collapsed mode) */}
      {(!isSidebarOpen && floatingOpen && hasChildren) ? (
        <div className="fixed z-[9999] left-20 bg-white border border-border rounded-xl shadow-xl min-w-[180px] py-2" style={{ top: btnRef.current?.getBoundingClientRect().top ?? 0 }} onMouseLeave={closeFloating}>
          {item.children?.map((child) => (
            <button
              key={child.id}
              className={`flex items-center gap-3 w-full px-4 py-2 hover:bg-primary/10 text-slate-700 text-sm ${activeTab === child.id ? 'font-bold text-primary' : ''}`}
              onClick={() => { setActiveTab(child.id); if (closeFloating) closeFloating(); }}
            >
              {child.icon && <child.icon className="w-5 h-5 text-slate-400" />}
              <span>{child.label}</span>
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
};


export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(() => {
    const stored = typeof window !== 'undefined' ? localStorage.getItem('sidebarOpen') : null;
    return stored === null ? true : stored === 'true';
  });
  useEffect(() => {
    if (typeof window !== 'undefined') localStorage.setItem('sidebarOpen', String(isSidebarOpen));
  }, [isSidebarOpen]);

  const [activeProperty, setActiveProperty] = useState('grand-plaza');
  const [isSupportPanelOpen, setIsSupportPanelOpen] = useState(false);

  // Floating submenu state
  const [floatingMenu, setFloatingMenu] = useState<{ item: NavItem, top: number } | null>(null);
  const [floatingAnchor, setFloatingAnchor] = useState<DOMRect | null>(null);
  const floatingTimeout = useRef<NodeJS.Timeout | null>(null);

  // Close floating submenu on click outside
  useEffect(() => {
    if (!floatingMenu) return;
    const handle = (e: MouseEvent) => {
      setFloatingMenu(null);
      setFloatingAnchor(null);
    };
    document.addEventListener('mousedown', handle);
    return () => document.removeEventListener('mousedown', handle);
  }, [floatingMenu]);
  const [subscription, setSubscription] = useState({
    status: 'trial', // 'trial', 'active', 'expired', 'cancelled'
    planId: 'basic',
    trialStartDate: new Date(),
    trialEndDate: new Date(new Date().getTime() + 15 * 24 * 60 * 60 * 1000),
    startedAt: null,
    expiresAt: null,
  });

  const handleAddProperty = () => {
    setActiveTab('add-property');
  };

  const renderContent = () => {
    const isTrialExpired = subscription.status === 'trial' && new Date() > subscription.trialEndDate;

    if (isTrialExpired && activeTab !== 'subscription') {
      return (
        <div className="flex flex-col items-center justify-center py-20 text-center space-y-6">
          <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center">
            <Clock className="w-10 h-10 text-red-500" />
          </div>
          <div className="max-w-md">
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Your trial has expired</h2>
            <p className="text-slate-500">Upgrade your plan to continue using the platform and manage your properties effectively.</p>
          </div>
          <button
            onClick={() => setActiveTab('subscription')}
            className="btn-primary px-8 h-12 text-lg"
          >
            Upgrade Now
          </button>
        </div>
      );
    }

    switch (activeTab) {
      case 'dashboard':
        return <DashboardContent />;
      case 'properties':
        return <PropertiesManagementView 
          onAddClick={() => setActiveTab('add-property')} 
          onEditClick={() => setActiveTab('property-info')} 
          onManageClick={(id) => { setActiveProperty(id); setActiveTab('dashboard'); }}
          onAnalyticsClick={(id) => { setActiveProperty(id); setActiveTab('reports'); }}
        />;
      case 'add-property':
        return <AddPropertyWizard onComplete={() => setActiveTab('properties')} />;
      case 'property-info':
        return <PropertyInfoView />;
      case 'property-settings':
        return <PropertySettingsView />;
      case 'features':
        return <PropertyFeaturesView />;
      case 'policies':
        return <PropertyPoliciesView />;
      case 'room-categories':
        return <RoomCategoriesView />;
      case 'cancellation-policy':
        return <CancellationPolicyView />;
      case 'kyc-details':
        return <KYCDetailsView />;
      case 'kyc-documents':
        return <KYCDocumentsView />;
      case 'bookings':
        return <BookingManagementView />;
      case 'booking-calendar':
        return <BookingCalendarView />;
      case 'availability':
        return <AvailabilityView />;
      case 'pricing':
        return <PricingManagementView />;
      case 'rate-plans':
        return <RatePlansView />;
      case 'reviews':
        return <ReviewsManagementView />;
      case 'staff':
        return <StaffManagementView />;
      case 'guests':
        return <GuestManagementView />;
      case 'channel-manager':
        return <ChannelManagerView />;
      case 'invoices-payments':
        return <InvoicesPaymentsView />;
      case 'reports':
        return <ReportsAnalyticsView />;
      case 'settings':
        return <SettingsView />;
      case 'subscription':
        return <SubscriptionView subscription={subscription} setSubscription={setSubscription} />;
      default:
        return <DashboardContent />;
    }
  };

  return (
    <div className="flex flex-row bg-background">
      {/* Sidebar */}
      <aside className={`fixed top-0 left-0 h-[100vh] ${isSidebarOpen ? 'w-64' : 'w-20'} bg-sidebar transition-all duration-300 flex flex-col border-r border-white/5 z-50`}>
        {/* Toggle button always at top right, centered when collapsed */}
        <div className={`h-16 flex items-center px-3 gap-3 relative shrink-0${!isSidebarOpen ? ' justify-center' : ''}`}>
          {/* Logo and label */}
          <div className="w-10 h-10 bg-primary flex items-center justify-center rounded-lg shadow border border-white/10">
            <Building2 className="w-6 h-6 text-white" />
          </div>
          {isSidebarOpen && (
            <div className="flex flex-col">
              <span className="text-white font-bold text-lg tracking-tight leading-tight">Hostly Pro</span>
              <span className="caption uppercase tracking-[0.02em] font-semibold text-slate-400">Property Manager</span>
            </div>
          )}
          {/* Collapse/expand button */}
          <button
            aria-label={isSidebarOpen ? 'Collapse sidebar' : 'Expand sidebar'}
            onClick={() => setIsSidebarOpen((v) => !v)}
            className="absolute right-[-18px] top-[50px] w-8 h-8 rounded-full text-white focus:outline-none shadow-lg border border-white/10 bg-primary z-20 flex items-center justify-center"
          >
            {isSidebarOpen ? <ChevronLeft className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
          </button>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto custom-scrollbar relative">
          {navItems.map((item) => (
            <SidebarItem
              key={item.id}
              item={item}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              isSidebarOpen={isSidebarOpen}
              showTooltip={!isSidebarOpen}
              onShowFloating={(item, anchorRect) => {
                setFloatingMenu({ item, top: anchorRect.top });
                setFloatingAnchor(anchorRect);
              }}
              floatingOpen={floatingMenu?.item.id === item.id}
              closeFloating={() => { setFloatingMenu(null); setFloatingAnchor(null); }}
            />
          ))}
          {/* Floating submenu root (collapsed mode) */}
          {!isSidebarOpen && floatingMenu && floatingAnchor && floatingMenu.item.children && (
            <div
              className="fixed z-[9999] bg-white border border-border rounded-xl shadow-xl min-w-[180px] py-2"
              style={{ left: floatingAnchor.right + 4, top: floatingAnchor.top, maxWidth: 240 }}
              onMouseLeave={() => { setFloatingMenu(null); setFloatingAnchor(null); }}
            >
              {floatingMenu.item.children.map((child) => (
                <button
                  key={child.id}
                  className={`flex items-center gap-3 w-full px-4 py-2 hover:bg-primary/10 text-slate-700 text-sm ${activeTab === child.id ? 'font-bold text-primary' : ''}`}
                  onClick={() => { setActiveTab(child.id); setFloatingMenu(null); setFloatingAnchor(null); }}
                >
                  {child.icon && <child.icon className="w-5 h-5 text-slate-400" />}
                  <span>{child.label}</span>
                </button>
              ))}
            </div>
          )}
        </nav>

        <div className="p-4 border-t border-white/5 shrink-0 bg-sidebar">
          <div className="flex items-center gap-3 px-2">
            <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center text-xs text-white font-medium">
              UB
            </div>
            {isSidebarOpen && (
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white truncate">Udit Bhatnagar</p>
                <p className="text-xs text-slate-400 truncate">Admin</p>
              </div>
            )}
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className={`flex-1 flex flex-col min-w-0 h-[100vh] overflow-y-auto transition-all duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-20'}`}>
        {/* Topbar */}
        <header className="h-16 bg-white border-b border-border flex items-center justify-between px-8 shrink-0 sticky top-0 z-40">
          <div className="flex items-center gap-6 flex-1">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 hover:bg-background rounded-lg text-text-secondary lg:hidden"
            >
              <Menu className="w-5 h-5" />
            </button>

            <div className="hidden lg:flex items-center gap-2">
              <span className="text-sm font-medium text-slate-500">Welcome back,</span>
              <span className="text-sm font-bold text-slate-900">Udit Bhatnagar</span>
            </div>

            <div className="h-6 w-px bg-slate-200 hidden lg:block"></div>

            <PropertySwitcher 
              activeProperty={activeProperty} 
              onSelect={setActiveProperty} 
              onAddProperty={() => setActiveTab('add-property')} 
            />

            {subscription.status === 'trial' ? (
              <div className="hidden xl:flex items-center gap-2 px-3 py-1 bg-amber-50 border border-amber-100 rounded-full">
                <div className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></div>
                <span className="text-xs font-bold text-amber-700">
                  Trial expires in {Math.max(0, Math.ceil((subscription.trialEndDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)))} days
                </span>
                <button
                  onClick={() => setActiveTab('subscription')}
                  className="text-xs font-bold text-amber-900 underline hover:no-underline ml-1"
                >
                  Subscribe
                </button>
              </div>
            ) : (
              <div className="hidden xl:flex items-center gap-2 px-3 py-1 bg-emerald-50 border border-emerald-100 rounded-full">
                <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                <span className="text-xs font-bold text-emerald-700">Active Plan: {subscription.planId.charAt(0).toUpperCase() + subscription.planId.slice(1)}</span>
              </div>
            )}
          </div>

          <div className="flex items-center gap-4">
            <button className="relative p-2 text-text-secondary hover:bg-background rounded-lg transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            <button
              onClick={handleAddProperty}
              className="btn-primary h-10 px-4"
            >
              <Plus className="w-4 h-4" />
              <span className="hidden sm:inline">Add Property</span>
            </button>
            <div className="h-8 w-px bg-border mx-2"></div>
            <div
              onClick={() => setIsSupportPanelOpen(true)}
              className="w-10 h-10 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center overflow-hidden cursor-pointer hover:border-primary transition-colors active:scale-95"
            >
              <img
                src="https://picsum.photos/seed/user/100/100"
                alt="User"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </header>

        <SupportPanel
          isOpen={isSupportPanelOpen}
          onClose={() => setIsSupportPanelOpen(false)}
          user={{
            name: 'Udit Bhatnagar',
            email: 'udit@example.com',
            avatar: 'https://picsum.photos/seed/user/100/100',
            id: 'USR-88291',
            orgId: 'ORG-5520',
            role: 'Administrator',
            plan: subscription.planId.charAt(0).toUpperCase() + subscription.planId.slice(1)
          }}
          activeProperty="Ashoka Palace"
        />

        {/* Content Area */}
        <div className={`flex-1 ${activeTab === 'settings' ? '' : 'p-8'}`}>
          <div className={`${activeTab === 'settings' ? 'h-full' : 'mx-auto space-y-8'}`}>
            {renderContent()}
          </div>
        </div>
      </main>
    </div>
  );
}
