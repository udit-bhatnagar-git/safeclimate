import React, { useState } from 'react';
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
  Settings
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

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
      {
        id: 'property',
        label: 'Property',
        icon: Building2,
        children: [
          { id: 'property-info', label: 'Property Info', icon: FileText },
          { id: 'features', label: 'Features', icon: Wifi },
          { id: 'policies', label: 'Property Policy', icon: ShieldCheck },
          {
            id: 'rooms-nested',
            label: 'Rooms',
            icon: BedDouble,
            children: [
              { id: 'room-categories', label: 'Room Categories', icon: LayoutGrid },
              { id: 'cancellation-policy', label: 'Cancellation Policy', icon: XCircle },
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
  { id: 'bookings', label: 'Bookings', icon: CalendarDays },
  { id: 'guests', label: 'Guests', icon: Users },
  { id: 'staff', label: 'Staff', icon: UserCircle },
  {
    id: 'settings',
    label: 'Settings',
    icon: Settings,
    children: [
      { id: 'subscription', label: 'Subscription', icon: CreditCard },
    ]
  }
];

// Components
const Toggle = ({ enabled, onChange, label }: { enabled: boolean; onChange: (val: boolean) => void; label?: string }) => (
  <div className="flex items-center gap-3">
    <button
      onClick={() => onChange(!enabled)}
      className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
        enabled ? 'bg-primary' : 'bg-slate-200'
      }`}
    >
      <span
        className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
          enabled ? 'translate-x-5' : 'translate-x-0'
        }`}
      />
    </button>
    {label && <span className="text-sm font-medium text-slate-700">{label}</span>}
  </div>
);

const SectionCard = ({ title, children, description }: { title: string; children: React.ReactNode; description?: string; key?: React.Key }) => (
  <div className="bg-white rounded-xl shadow-sm border border-border p-6 space-y-6">
    <div>
      <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
      {description && <p className="text-sm text-slate-500 mt-1">{description}</p>}
    </div>
    <div className="space-y-6">
      {children}
    </div>
  </div>
);

const MultiSelectField = ({ 
  label, 
  options, 
  selected, 
  onChange, 
  placeholder 
}: { 
  label: string; 
  options: string[]; 
  selected: string[]; 
  onChange: (val: string[]) => void;
  placeholder: string;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOption = (option: string) => {
    if (selected.includes(option)) {
      onChange(selected.filter(i => i !== option));
    } else {
      onChange([...selected, option]);
    }
  };

  return (
    <div className="space-y-3">
      <label className="text-sm font-semibold text-slate-700">{label}</label>
      <div className="relative">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="input w-full flex items-center justify-between text-left"
        >
          <span className={selected.length === 0 ? 'text-slate-400' : 'text-slate-900'}>
            {selected.length === 0 ? placeholder : `${selected.length} items selected`}
          </span>
          <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </button>

        <AnimatePresence>
          {isOpen && (
            <>
              <div 
                className="fixed inset-0 z-10" 
                onClick={() => setIsOpen(false)} 
              />
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="absolute left-0 right-0 mt-2 bg-white border border-border rounded-xl shadow-xl z-20 max-h-60 overflow-y-auto p-2"
              >
                {options.map(option => (
                  <button
                    key={option}
                    onClick={() => toggleOption(option)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors flex items-center justify-between ${
                      selected.includes(option) ? 'bg-primary/10 text-primary font-medium' : 'hover:bg-slate-50 text-slate-600'
                    }`}
                  >
                    {option}
                    {selected.includes(option) && <Check className="w-4 h-4" />}
                  </button>
                ))}
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>

      {selected.length > 0 && (
        <div className="flex flex-wrap gap-2 pt-1">
          {selected.map(item => (
            <div 
              key={item} 
              className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 text-slate-700 rounded-lg text-xs font-medium border border-slate-200"
            >
              {item}
              <button 
                onClick={() => toggleOption(item)}
                className="p-0.5 hover:bg-slate-200 rounded-full transition-colors"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const SidebarItem = ({ 
  item, 
  activeTab, 
  setActiveTab, 
  isSidebarOpen, 
  level = 0 
}: { 
  item: NavItem; 
  activeTab: string; 
  setActiveTab: (id: string) => void; 
  isSidebarOpen: boolean;
  level?: number;
  key?: React.Key;
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const hasChildren = item.children && item.children.length > 0;
  const isActive = activeTab === item.id;

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (hasChildren) {
      setIsExpanded(!isExpanded);
    } else {
      setActiveTab(item.id);
    }
  };

  return (
    <div className="w-full">
      <button
        onClick={handleClick}
        className={`sidebar-item w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 group ${
          isActive ? 'active' : ''
        }`}
        style={{ paddingLeft: isSidebarOpen ? `${(level * 12) + 12}px` : '12px' }}
      >
        {item.icon && <item.icon className={`w-5 h-5 shrink-0 ${isActive ? 'text-primary' : 'text-slate-400 group-hover:text-white'}`} />}
        {!item.icon && level > 0 && <div className="w-5 h-5 shrink-0 flex items-center justify-center">
          <div className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-primary' : 'bg-slate-600'}`} />
        </div>}
        
        {isSidebarOpen && (
          <div className="flex-1 flex items-center justify-between overflow-hidden">
            <span className="font-medium truncate text-sm">{item.label}</span>
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
      </button>

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
    </div>
  );
};

// Views
const PropertyInfoView = () => {
  const [propertyEnabled, setPropertyEnabled] = useState(true);
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Property Information</h1>
          <p className="text-slate-500">Manage your property's basic details and location.</p>
        </div>
        <Toggle enabled={propertyEnabled} onChange={setPropertyEnabled} label="Property Active" />
      </div>

      <SectionCard title="Basic Details">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">Property Name</label>
            <input type="text" className="input w-full" placeholder="e.g. Grand Plaza Hotel" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">Property Type</label>
            <select className="input w-full">
              <option>Hotel</option>
              <option>Resort</option>
              <option>Villa</option>
              <option>Apartment</option>
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">Total No of Rooms</label>
            <input type="number" className="input w-full" placeholder="0" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">Description</label>
            <textarea className="input w-full h-24 resize-none" placeholder="Describe your property..."></textarea>
          </div>
        </div>
      </SectionCard>

      <SectionCard title="Location">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">Country</label>
            <input type="text" className="input w-full" placeholder="e.g. United States" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">City</label>
            <input type="text" className="input w-full" placeholder="e.g. New York" />
          </div>
          <div className="space-y-2 md:col-span-2">
            <label className="text-sm font-semibold text-slate-700">Address</label>
            <input type="text" className="input w-full" placeholder="Full street address" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">Postal Code</label>
            <input type="text" className="input w-full" placeholder="e.g. 10001" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">Map Location (URL)</label>
            <input type="text" className="input w-full" placeholder="Google Maps Link" />
          </div>
        </div>
      </SectionCard>

      <SectionCard title="Property Images">
        <div className="border-2 border-dashed border-slate-200 rounded-xl p-8 text-center hover:border-primary transition-colors cursor-pointer">
          <Upload className="w-8 h-8 text-slate-400 mx-auto mb-3" />
          <p className="text-sm font-medium text-slate-900">Click to upload or drag and drop</p>
          <p className="text-xs text-slate-500 mt-1">PNG, JPG, GIF up to 10MB</p>
        </div>
      </SectionCard>

      <SectionCard title="Timing">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">Check-in Time</label>
            <input type="time" className="input w-full" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">Check-out Time</label>
            <input type="time" className="input w-full" />
          </div>
        </div>
      </SectionCard>

      <div className="flex justify-end gap-3">
        <button className="btn-secondary px-6">Cancel</button>
        <button className="btn-primary px-6">Save Changes</button>
      </div>
    </div>
  );
};

const PropertyFeaturesView = () => {
  const [generalAmenities, setGeneralAmenities] = useState(['Free Wi-Fi', 'Parking']);
  const [accessibility, setAccessibility] = useState(['Wheelchair Accessible']);
  const [services, setServices] = useState(['Room Service']);

  const amenityOptions = ['Free Wi-Fi', 'Parking', 'Swimming Pool', 'Fitness Center', 'Restaurant', 'Elevator', 'Air Conditioning', 'Spa'];
  const accessibilityOptions = ['Wheelchair Accessible', 'Braille Signage', 'Visual Alarms', 'Step-free Access'];
  const serviceOptions = ['Laundry Service', 'Room Service', 'Airport Shuttle', 'Daily Housekeeping', 'Concierge'];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Property Features</h1>
        <p className="text-slate-500">Select the amenities and services available at your property.</p>
      </div>

      <SectionCard title="Features & Amenities">
        <div className="space-y-8">
          <MultiSelectField 
            label="General Amenities"
            options={amenityOptions}
            selected={generalAmenities}
            onChange={setGeneralAmenities}
            placeholder="Choose amenities..."
          />

          <MultiSelectField 
            label="Accessibility"
            options={accessibilityOptions}
            selected={accessibility}
            onChange={setAccessibility}
            placeholder="Choose accessibility features..."
          />

          <MultiSelectField 
            label="Services"
            options={serviceOptions}
            selected={services}
            onChange={setServices}
            placeholder="Choose services..."
          />
        </div>
      </SectionCard>

      <div className="flex justify-end gap-3">
        <button className="btn-secondary px-6">Cancel</button>
        <button className="btn-primary px-6">Save Features</button>
      </div>
    </div>
  );
};

const PropertyPoliciesView = () => {
  const [policies, setPolicies] = useState({
    govId: true,
    pets: false,
    smoking: false,
    parties: false,
    children: true,
    extraBeds: true,
    earlyCheckin: false,
    lateCheckout: false,
  });

  const togglePolicy = (key: keyof typeof policies) => {
    setPolicies(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Property Policies</h1>
        <p className="text-slate-500">Define the rules and regulations for guests staying at your property.</p>
      </div>

      <SectionCard title="General Policies">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Toggle enabled={policies.govId} onChange={() => togglePolicy('govId')} label="Government ID Required" />
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">Minimum Age for Check-in</label>
            <input type="number" defaultValue="18" className="input w-full" />
          </div>
          <Toggle enabled={policies.pets} onChange={() => togglePolicy('pets')} label="Pets Allowed" />
          <Toggle enabled={policies.smoking} onChange={() => togglePolicy('smoking')} label="Smoking Allowed" />
          <Toggle enabled={policies.parties} onChange={() => togglePolicy('parties')} label="Parties / Events Allowed" />
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">Quiet Hours</label>
            <input type="text" placeholder="e.g. 10:00 PM - 07:00 AM" className="input w-full" />
          </div>
        </div>
      </SectionCard>

      <SectionCard title="Occupancy Policies">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">Max Adults per Room</label>
            <input type="number" defaultValue="2" className="input w-full" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">Max Children per Room</label>
            <input type="number" defaultValue="1" className="input w-full" />
          </div>
          <Toggle enabled={policies.children} onChange={() => togglePolicy('children')} label="Children Allowed" />
          <Toggle enabled={policies.extraBeds} onChange={() => togglePolicy('extraBeds')} label="Extra Beds Available" />
        </div>
      </SectionCard>

      <SectionCard title="Check-in / Check-out Policies">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Toggle enabled={policies.earlyCheckin} onChange={() => togglePolicy('earlyCheckin')} label="Allow Early Check-in" />
          <Toggle enabled={policies.lateCheckout} onChange={() => togglePolicy('lateCheckout')} label="Allow Late Check-out" />
        </div>
      </SectionCard>

      <SectionCard title="Financial Policies">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">Advance Payment (%)</label>
            <input type="number" defaultValue="50" className="input w-full" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">Security Deposit</label>
            <input type="number" defaultValue="100" className="input w-full" />
          </div>
          <div className="md:col-span-2 space-y-2">
            <label className="text-sm font-semibold text-slate-700">Damage Liability Policy</label>
            <textarea className="input w-full h-24 resize-none" placeholder="Describe damage liability..."></textarea>
          </div>
        </div>
      </SectionCard>

      <div className="flex justify-end gap-3">
        <button className="btn-secondary px-6">Cancel</button>
        <button className="btn-primary px-6">Save Policies</button>
      </div>
    </div>
  );
};

const RoomCategoriesView = () => (
  <div className="space-y-6">
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Room Categories</h1>
        <p className="text-slate-500">Manage your room types, pricing, and availability.</p>
      </div>
      <button className="btn-primary">
        <Plus className="w-4 h-4" />
        <span>Add Category</span>
      </button>
    </div>

    <SectionCard title="New Room Category">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-700">Room Name</label>
          <input type="text" className="input w-full" placeholder="e.g. Deluxe King Suite" />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-700">Room Type</label>
          <select className="input w-full">
            <option>Single</option>
            <option>Double</option>
            <option>Suite</option>
            <option>Penthouse</option>
          </select>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-700">No of Rooms</label>
          <input type="number" className="input w-full" placeholder="0" />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-700">Max Capacity</label>
          <input type="number" className="input w-full" placeholder="0" />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-700">Bed Configuration</label>
          <input type="text" className="input w-full" placeholder="e.g. 1 King Bed, 1 Sofa Bed" />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-700">Room Size (sq ft)</label>
          <input type="number" className="input w-full" placeholder="0" />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-700">Base Price per Night</label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">$</span>
            <input type="number" className="input w-full pl-8" placeholder="0.00" />
          </div>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-700">Currency</label>
          <select className="input w-full">
            <option>USD</option>
            <option>EUR</option>
            <option>GBP</option>
          </select>
        </div>
        <div className="md:col-span-2 space-y-2">
          <label className="text-sm font-semibold text-slate-700">Description</label>
          <textarea className="input w-full h-24 resize-none" placeholder="Describe this room category..."></textarea>
        </div>
      </div>
    </SectionCard>

    <SectionCard title="Room Images">
      <div className="border-2 border-dashed border-slate-200 rounded-xl p-8 text-center hover:border-primary transition-colors cursor-pointer">
        <Upload className="w-8 h-8 text-slate-400 mx-auto mb-3" />
        <p className="text-sm font-medium text-slate-900">Upload room photos</p>
        <p className="text-xs text-slate-500 mt-1">Add at least 3 high-quality photos</p>
      </div>
    </SectionCard>

    <div className="flex justify-end gap-3">
      <button className="btn-secondary px-6">Cancel</button>
      <button className="btn-primary px-6">Save Category</button>
    </div>
  </div>
);

const CancellationPolicyView = () => {
  const [selectedPolicy, setSelectedPolicy] = useState('flexible');

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Cancellation Policy</h1>
        <p className="text-slate-500">Choose a policy that works best for your business model.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[
          { id: 'flexible', title: 'Flexible', description: 'Full refund 1 day prior to arrival' },
          { id: 'moderate', title: 'Moderate', description: 'Full refund 5 days prior to arrival' },
          { id: 'strict', title: 'Strict', description: '50% refund up to 7 days before arrival' },
          { id: 'custom', title: 'Custom', description: 'Define your own cancellation rules' },
        ].map((policy) => (
          <button
            key={policy.id}
            onClick={() => setSelectedPolicy(policy.id)}
            className={`p-6 rounded-xl border-2 text-left transition-all ${
              selectedPolicy === policy.id ? 'border-primary bg-primary/5' : 'border-slate-100 hover:border-slate-200'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-bold text-slate-900">{policy.title}</h3>
              {selectedPolicy === policy.id && <CheckCircle2 className="w-5 h-5 text-primary" />}
            </div>
            <p className="text-sm text-slate-500">{policy.description}</p>
          </button>
        ))}
      </div>

      {selectedPolicy === 'custom' && (
        <SectionCard title="Custom Rules">
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <span className="text-sm text-slate-600">If cancelled within</span>
              <input type="number" className="input w-24" defaultValue="48" />
              <span className="text-sm text-slate-600">hours of check-in, charge</span>
              <input type="number" className="input w-24" defaultValue="100" />
              <span className="text-sm text-slate-600">% of booking amount.</span>
            </div>
          </div>
        </SectionCard>
      )}

      <div className="flex justify-end gap-3">
        <button className="btn-secondary px-6">Cancel</button>
        <button className="btn-primary px-6">Save Policy</button>
      </div>
    </div>
  );
};

const KYCDetailsView = () => (
  <div className="space-y-6">
    <div>
      <h1 className="text-2xl font-bold text-slate-900">KYC Details</h1>
      <p className="text-slate-500">Verify your identity and business information.</p>
    </div>

    <SectionCard title="Business Information">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-700">Legal Business Name</label>
          <input type="text" className="input w-full" />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-700">Tax ID / GST Number</label>
          <input type="text" className="input w-full" />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-700">Business Type</label>
          <select className="input w-full">
            <option>Individual</option>
            <option>Partnership</option>
            <option>Company</option>
          </select>
        </div>
      </div>
    </SectionCard>

    <SectionCard title="Contact Person">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-700">Full Name</label>
          <input type="text" className="input w-full" />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-700">Designation</label>
          <input type="text" className="input w-full" />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-700">Email Address</label>
          <input type="email" className="input w-full" />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-700">Phone Number</label>
          <input type="tel" className="input w-full" />
        </div>
      </div>
    </SectionCard>

    <div className="flex justify-end gap-3">
      <button className="btn-secondary px-6">Cancel</button>
      <button className="btn-primary px-6">Submit Details</button>
    </div>
  </div>
);

const KYCDocumentsView = () => (
  <div className="space-y-6">
    <div>
      <h1 className="text-2xl font-bold text-slate-900">KYC Documents</h1>
      <p className="text-slate-500">Upload required documents for verification.</p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {[
        { title: 'Business License', description: 'Copy of your valid business registration' },
        { title: 'Identity Proof', description: 'Passport or National ID of the owner' },
        { title: 'Address Proof', description: 'Utility bill or bank statement' },
        { title: 'Tax Document', description: 'Latest tax filing or registration certificate' },
      ].map((doc) => (
        <SectionCard key={doc.title} title={doc.title} description={doc.description}>
          <div className="border-2 border-dashed border-slate-200 rounded-xl p-6 text-center hover:border-primary transition-colors cursor-pointer">
            <Upload className="w-6 h-6 text-slate-400 mx-auto mb-2" />
            <p className="text-xs font-medium text-slate-900">Upload Document</p>
          </div>
        </SectionCard>
      ))}
    </div>

    <div className="flex justify-end gap-3">
      <button className="btn-secondary px-6">Cancel</button>
      <button className="btn-primary px-6">Upload All</button>
    </div>
  </div>
);

const SubscriptionView = ({ subscription, setSubscription }: { subscription: any; setSubscription: any }) => {
  const [showPayment, setShowPayment] = useState<string | null>(null);

  const plans = [
    {
      id: 'basic',
      name: 'Basic',
      price: 9,
      features: ['Manage 1 property', 'Up to 10 rooms', 'Basic analytics', 'Email support'],
      color: 'blue'
    },
    {
      id: 'professional',
      name: 'Professional',
      price: 29,
      features: ['Manage up to 5 properties', 'Unlimited rooms', 'Booking analytics', 'Staff management', 'Priority support'],
      color: 'indigo',
      popular: true
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      price: 79,
      features: ['Unlimited properties', 'Unlimited rooms', 'Advanced analytics', 'Staff & role management', 'Dedicated support'],
      color: 'slate'
    }
  ];

  const handleSelectPlan = (planId: string) => {
    setShowPayment(planId);
  };

  const confirmPayment = () => {
    const plan = plans.find(p => p.id === showPayment);
    setSubscription({
      ...subscription,
      status: 'active',
      planId: showPayment,
      startedAt: new Date(),
      expiresAt: new Date(new Date().getTime() + 30 * 24 * 60 * 60 * 1000),
    });
    setShowPayment(null);
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Subscription</h1>
          <p className="text-slate-500">Manage your plan and billing information.</p>
        </div>
        {subscription.status === 'trial' && (
          <div className="px-4 py-2 bg-amber-50 border border-amber-100 rounded-xl flex items-center gap-3">
            <Sparkles className="w-5 h-5 text-amber-500" />
            <div>
              <p className="text-sm font-bold text-amber-900">Free Trial Active</p>
              <p className="text-xs text-amber-700">Expires in {Math.ceil((subscription.trialEndDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))} days</p>
            </div>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {plans.map((plan) => (
          <div 
            key={plan.id} 
            className={`relative flex flex-col p-8 rounded-2xl border-2 transition-all ${
              subscription.planId === plan.id && subscription.status === 'active'
                ? 'border-primary bg-primary/5 shadow-lg' 
                : 'border-border bg-white hover:border-slate-300'
            }`}
          >
            {plan.popular && (
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-primary text-white text-xs font-bold rounded-full uppercase tracking-wider">
                Most Popular
              </div>
            )}
            <div className="mb-8">
              <h3 className="text-xl font-bold text-slate-900 mb-2">{plan.name}</h3>
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-bold text-slate-900">${plan.price}</span>
                <span className="text-slate-500">/ month</span>
              </div>
            </div>
            <ul className="space-y-4 mb-8 flex-1">
              {plan.features.map((feature, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-slate-600">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                  {feature}
                </li>
              ))}
            </ul>
            <button 
              onClick={() => handleSelectPlan(plan.id)}
              disabled={subscription.planId === plan.id && subscription.status === 'active'}
              className={`w-full py-3 rounded-xl font-bold transition-all ${
                subscription.planId === plan.id && subscription.status === 'active'
                  ? 'bg-emerald-500 text-white cursor-default'
                  : 'bg-primary text-white hover:bg-primary-hover shadow-md hover:shadow-lg active:scale-[0.98]'
              }`}
            >
              {subscription.planId === plan.id && subscription.status === 'active' ? 'Current Plan' : 'Choose Plan'}
            </button>
          </div>
        ))}
      </div>

      <SectionCard title="Billing History">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-border">
                <th className="pb-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Date</th>
                <th className="pb-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Plan</th>
                <th className="pb-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Amount</th>
                <th className="pb-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
                <th className="pb-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Invoice</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {subscription.status === 'active' ? (
                <tr>
                  <td className="py-4 text-sm text-slate-900">{new Date().toLocaleDateString()}</td>
                  <td className="py-4 text-sm text-slate-600">{plans.find(p => p.id === subscription.planId)?.name}</td>
                  <td className="py-4 text-sm text-slate-900 font-bold">${plans.find(p => p.id === subscription.planId)?.price}.00</td>
                  <td className="py-4">
                    <span className="px-2 py-1 rounded-full bg-emerald-100 text-emerald-700 text-[10px] font-bold uppercase tracking-wider">Paid</span>
                  </td>
                  <td className="py-4 text-right">
                    <button className="text-primary hover:underline text-sm font-bold">Download</button>
                  </td>
                </tr>
              ) : (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-slate-500 italic">No billing history available.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </SectionCard>

      <AnimatePresence>
        {showPayment && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden"
            >
              <div className="p-6 border-b border-border flex items-center justify-between">
                <h3 className="text-xl font-bold text-slate-900">Complete Payment</h3>
                <button onClick={() => setShowPayment(null)} className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
                  <X className="w-5 h-5 text-slate-400" />
                </button>
              </div>
              <div className="p-8 space-y-6">
                <div className="p-4 bg-slate-50 rounded-xl border border-border">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-slate-600">Selected Plan</span>
                    <span className="text-sm font-bold text-slate-900">{plans.find(p => p.id === showPayment)?.name}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-600">Total Amount</span>
                    <span className="text-lg font-bold text-primary">${plans.find(p => p.id === showPayment)?.price}.00</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700">Card Number</label>
                    <div className="relative">
                      <input type="text" className="input pr-12" placeholder="0000 0000 0000 0000" defaultValue="4242 4242 4242 4242" />
                      <CreditCard className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-slate-700">Expiry Date</label>
                      <input type="text" className="input" placeholder="MM/YY" defaultValue="12/26" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-slate-700">CVC</label>
                      <input type="text" className="input" placeholder="000" defaultValue="123" />
                    </div>
                  </div>
                </div>

                <button 
                  onClick={confirmPayment}
                  className="w-full btn-primary h-12 text-lg"
                >
                  Pay & Activate
                </button>
                <p className="text-center text-xs text-slate-400">
                  Secured by Stripe. Your data is encrypted.
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

const PropertiesView = ({ onAddClick, onEditClick }: { onAddClick: () => void; onEditClick: () => void }) => (
  <div className="space-y-6">
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Properties</h1>
        <p className="text-slate-500">Manage all your listed properties and their subscription status.</p>
      </div>
      <button onClick={onAddClick} className="btn-primary shadow-lg shadow-primary/20 hover:scale-105 transition-transform">
        <Plus className="w-4 h-4" />
        <span>Add New Property</span>
      </button>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[
        { name: 'Grand Plaza Hotel', location: 'New York, USA', rooms: 120, status: 'Active', plan: 'Professional', image: 'https://picsum.photos/seed/hotel1/400/250' },
        { name: 'Sunset Resort', location: 'Miami, USA', rooms: 85, status: 'Active', plan: 'Trial', image: 'https://picsum.photos/seed/resort1/400/250' },
        { name: 'Urban Suites', location: 'Chicago, USA', rooms: 45, status: 'Inactive', plan: 'Basic', image: 'https://picsum.photos/seed/suites1/400/250' },
      ].map((property) => (
        <div key={property.name} className="bg-white rounded-xl shadow-sm border border-border overflow-hidden group hover:shadow-md transition-all">
          <div className="h-48 relative overflow-hidden">
            <img src={property.image} alt={property.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" referrerPolicy="no-referrer" />
            <div className="absolute top-4 left-4 flex flex-col gap-2">
              <span className={`px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider shadow-sm ${
                property.plan === 'Professional' ? 'bg-indigo-600 text-white' : 
                property.plan === 'Trial' ? 'bg-amber-500 text-white' : 'bg-slate-600 text-white'
              }`}>
                {property.plan} Plan
              </span>
            </div>
            <div className="absolute top-4 right-4">
              <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider shadow-sm ${property.status === 'Active' ? 'bg-emerald-500 text-white' : 'bg-slate-500 text-white'}`}>
                {property.status}
              </span>
            </div>
          </div>
          <div className="p-5">
            <h3 className="font-bold text-slate-900 mb-1">{property.name}</h3>
            <div className="flex items-center gap-1 text-slate-500 text-sm mb-4">
              <MapPin className="w-3.5 h-3.5" />
              <span>{property.location}</span>
            </div>
            <div className="flex items-center justify-between pt-4 border-t border-slate-100">
              <span className="text-sm font-medium text-slate-600">{property.rooms} Rooms</span>
              <button onClick={onEditClick} className="text-sm font-bold text-primary hover:underline">Edit Details</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const BookingsView = () => (
  <div className="space-y-6">
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Bookings</h1>
        <p className="text-slate-500">Monitor and manage all guest reservations.</p>
      </div>
      <div className="flex items-center gap-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input type="text" placeholder="Search bookings..." className="input pl-10 w-64" />
        </div>
        <button className="btn-secondary">
          <Save className="w-4 h-4" />
          <span>Export CSV</span>
        </button>
      </div>
    </div>

    <div className="bg-white rounded-xl shadow-sm border border-border overflow-hidden">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-slate-50 border-bottom border-border">
            <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Guest</th>
            <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Property</th>
            <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Check-in / Out</th>
            <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Amount</th>
            <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
            <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Action</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {[
            { id: 'BK-1001', guest: 'John Smith', property: 'Grand Plaza Hotel', checkin: 'Mar 15, 2026', checkout: 'Mar 18, 2026', amount: '$450.00', status: 'Confirmed' },
            { id: 'BK-1002', guest: 'Sarah Wilson', property: 'Sunset Resort', checkin: 'Mar 16, 2026', checkout: 'Mar 20, 2026', amount: '$820.00', status: 'Pending' },
            { id: 'BK-1003', guest: 'Michael Brown', property: 'Urban Suites', checkin: 'Mar 18, 2026', checkout: 'Mar 19, 2026', amount: '$150.00', status: 'Cancelled' },
            { id: 'BK-1004', guest: 'Emily Davis', property: 'Grand Plaza Hotel', checkin: 'Mar 20, 2026', checkout: 'Mar 25, 2026', amount: '$950.00', status: 'Confirmed' },
          ].map((booking) => (
            <tr key={booking.id} className="hover:bg-slate-50 transition-colors">
              <td className="px-6 py-4">
                <p className="text-sm font-semibold text-slate-900">{booking.guest}</p>
                <p className="text-xs text-slate-500">{booking.id}</p>
              </td>
              <td className="px-6 py-4 text-sm text-slate-600">{booking.property}</td>
              <td className="px-6 py-4 text-sm text-slate-600">{booking.checkin} - {booking.checkout}</td>
              <td className="px-6 py-4 text-sm font-bold text-slate-900">{booking.amount}</td>
              <td className="px-6 py-4">
                <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                  booking.status === 'Confirmed' ? 'bg-emerald-100 text-emerald-700' : 
                  booking.status === 'Pending' ? 'bg-amber-100 text-amber-700' : 'bg-red-100 text-red-700'
                }`}>
                  {booking.status}
                </span>
              </td>
              <td className="px-6 py-4 text-right">
                <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
                  <MoreHorizontal className="w-4 h-4 text-slate-400" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

const AddPropertyWizard = ({ onComplete }: { onComplete: () => void }) => {
  const [step, setStep] = useState(1);
  const totalSteps = 4;

  const steps = [
    { title: 'Basic Info', description: 'Property name and type' },
    { title: 'Location', description: 'Address and map details' },
    { title: 'Features', description: 'Amenities and services' },
    { title: 'Policies', description: 'Rules and regulations' },
  ];

  return (
    <div className="max-w-4xl mx-auto py-12">
      <div className="mb-12">
        <div className="flex items-center justify-between mb-8">
          {steps.map((s, i) => (
            <div key={i} className="flex flex-col items-center gap-2 flex-1 relative">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm z-10 ${
                step > i + 1 ? 'bg-emerald-500 text-white' : 
                step === i + 1 ? 'bg-primary text-white' : 'bg-slate-100 text-slate-400'
              }`}>
                {step > i + 1 ? <Check className="w-5 h-5" /> : i + 1}
              </div>
              <span className={`text-xs font-bold uppercase tracking-wider ${step === i + 1 ? 'text-primary' : 'text-slate-400'}`}>
                {s.title}
              </span>
              {i < steps.length - 1 && (
                <div className={`absolute top-5 left-[60%] w-[80%] h-0.5 ${step > i + 1 ? 'bg-emerald-500' : 'bg-slate-100'}`}></div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-xl border border-border p-8 mb-8">
        {step === 1 && <PropertyInfoView />}
        {step === 2 && <div className="p-12 text-center text-slate-500 italic">Location settings form...</div>}
        {step === 3 && <PropertyFeaturesView />}
        {step === 4 && <PropertyPoliciesView />}
      </div>

      <div className="flex items-center justify-between">
        <button 
          onClick={() => setStep(Math.max(1, step - 1))}
          disabled={step === 1}
          className="btn-secondary px-8 disabled:opacity-50"
        >
          Previous Step
        </button>
        <button 
          onClick={() => step === totalSteps ? onComplete() : setStep(step + 1)}
          className="btn-primary px-8"
        >
          {step === totalSteps ? 'Complete Setup' : 'Next Step'}
        </button>
      </div>
    </div>
  );
};

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
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

    switch(activeTab) {
      case 'add-property':
        return <AddPropertyWizard onComplete={() => setActiveTab('dashboard')} />;
      case 'property-info':
        return <PropertyInfoView />;
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
      case 'properties':
        return <PropertiesView onAddClick={handleAddProperty} onEditClick={() => setActiveTab('property-info')} />;
      case 'subscription':
        return <SubscriptionView subscription={subscription} setSubscription={setSubscription} />;
      case 'bookings':
        return <BookingsView />;
      case 'dashboard':
      default:
        return (
          <div className="space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-[#111827]">Dashboard Overview</h1>
                <p className="text-[#6B7280] mt-1">Welcome back, here's what's happening with your properties today.</p>
              </div>
              <div className="flex items-center gap-3">
                <button className="btn-secondary h-10">
                  <CalendarDays className="w-4 h-4" />
                  <span>Last 30 Days</span>
                  <ChevronDown className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { label: 'Total Revenue', value: '$45,231.89', change: '+20.1%', icon: TrendingUp, color: 'text-emerald-600', bg: 'bg-emerald-50' },
                { label: 'Occupancy Rate', value: '84.2%', change: '+4.3%', icon: BedDouble, color: 'text-blue-600', bg: 'bg-blue-50' },
                { label: 'Active Bookings', value: '124', change: '+12.5%', icon: CalendarDays, color: 'text-indigo-600', bg: 'bg-indigo-50' },
                { label: 'Guest Satisfaction', value: '4.9/5', change: '+0.2', icon: Sparkles, color: 'text-amber-600', bg: 'bg-amber-50' },
              ].map((stat) => (
                <div key={stat.label} className="card group hover:border-primary transition-all">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 rounded-xl ${stat.bg} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                      <stat.icon className={`w-6 h-6 ${stat.color}`} />
                    </div>
                    <span className="text-emerald-500 text-xs font-bold bg-emerald-50 px-2 py-1 rounded-full">{stat.change}</span>
                  </div>
                  <p className="text-sm font-semibold text-[#6B7280]">{stat.label}</p>
                  <h2 className="text-[#111827] mt-1">{stat.value}</h2>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
              <div className="xl:col-span-2 space-y-8">
                <div className="card">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-[#111827]">Recent Bookings</h3>
                    <button onClick={() => setActiveTab('bookings')} className="text-sm font-bold text-primary hover:underline">View all</button>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left">
                      <thead>
                        <tr className="border-b border-border">
                          <th className="pb-4 text-xs font-bold text-[#6B7280] uppercase tracking-wider">Guest</th>
                          <th className="pb-4 text-xs font-bold text-[#6B7280] uppercase tracking-wider">Property</th>
                          <th className="pb-4 text-xs font-bold text-[#6B7280] uppercase tracking-wider">Status</th>
                          <th className="pb-4 text-xs font-bold text-[#6B7280] uppercase tracking-wider text-right">Amount</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border">
                        {[
                          { name: 'John Smith', property: 'Grand Plaza Hotel', status: 'Confirmed', amount: '$450.00' },
                          { name: 'Sarah Wilson', property: 'Sunset Resort', status: 'Pending', amount: '$820.00' },
                          { name: 'Michael Brown', property: 'Urban Suites', status: 'Confirmed', amount: '$150.00' },
                        ].map((booking, i) => (
                          <tr key={i} className="group">
                            <td className="py-4">
                              <p className="text-sm font-semibold text-[#111827]">{booking.name}</p>
                              <p className="text-xs text-[#6B7280]">Booking #BK-100{i+1}</p>
                            </td>
                            <td className="py-4 text-sm text-[#6B7280]">{booking.property}</td>
                            <td className="py-4">
                              <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${booking.status === 'Confirmed' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                                {booking.status}
                              </span>
                            </td>
                            <td className="py-4 text-sm font-bold text-[#111827] text-right">{booking.amount}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="card">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-[#111827]">Property Performance</h3>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1 text-xs text-[#6B7280]">
                        <div className="w-2 h-2 rounded-full bg-primary"></div>
                        <span>Revenue</span>
                      </div>
                    </div>
                  </div>
                  <div className="h-64 flex items-end justify-between gap-2 px-2">
                    {[40, 65, 45, 90, 75, 55, 85, 60, 95, 70, 80, 100].map((height, i) => (
                      <div key={i} className="flex-1 flex flex-col items-center gap-2 group">
                        <div className="w-full bg-slate-100 rounded-t-sm relative overflow-hidden h-full">
                          <motion.div 
                            initial={{ height: 0 }}
                            animate={{ height: `${height}%` }}
                            transition={{ duration: 1, delay: i * 0.05 }}
                            className="absolute bottom-0 left-0 right-0 bg-primary/20 group-hover:bg-primary/40 transition-colors"
                          ></motion.div>
                          <motion.div 
                            initial={{ height: 0 }}
                            animate={{ height: `${height * 0.6}%` }}
                            transition={{ duration: 1, delay: i * 0.05 + 0.2 }}
                            className="absolute bottom-0 left-0 right-0 bg-primary"
                          ></motion.div>
                        </div>
                        <span className="caption font-medium">
                          {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][i]}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-8">
                <div className="card">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-[#111827]">Properties Overview</h3>
                    <button onClick={() => setActiveTab('properties')} className="text-xs font-bold text-primary hover:underline">View All</button>
                  </div>
                  <div className="space-y-3">
                    {[
                      { name: 'Grand Plaza Hotel', plan: 'Professional', status: 'Active' },
                      { name: 'Sunset Resort', plan: 'Trial', status: 'Active' },
                      { name: 'Urban Suites', plan: 'Basic', status: 'Inactive' },
                    ].map((p, i) => (
                      <div key={i} className="flex items-center justify-between p-3 rounded-lg border border-border">
                        <div className="flex items-center gap-3">
                          <div className={`w-2 h-2 rounded-full ${p.status === 'Active' ? 'bg-emerald-500' : 'bg-slate-300'}`}></div>
                          <span className="text-sm font-medium text-slate-700">{p.name}</span>
                        </div>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                          p.plan === 'Professional' ? 'bg-indigo-100 text-indigo-700' :
                          p.plan === 'Trial' ? 'bg-amber-100 text-amber-700' : 'bg-slate-100 text-slate-700'
                        }`}>
                          {p.plan}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="card">
                  <h3 className="text-[#111827] mb-4">Quick Actions</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { label: 'Add Property', icon: Plus, action: handleAddProperty },
                      { label: 'Manage Properties', icon: Building2, action: () => setActiveTab('properties') },
                      { label: 'New Staff', icon: UserCircle },
                      { label: 'Check-in', icon: CheckCircle2 },
                    ].map((action) => (
                      <button 
                        key={action.label} 
                        onClick={action.action}
                        className="flex flex-col items-center justify-center p-4 rounded-xl border border-border hover:border-primary hover:bg-primary/5 transition-all group"
                      >
                        <action.icon className="w-6 h-6 text-[#6B7280] group-hover:text-primary mb-2" />
                        <span className="text-xs font-semibold text-[#111827]">{action.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="card">
                  <h3 className="text-[#111827] mb-4">Upcoming Check-ins</h3>
                  <div className="space-y-4">
                    {[
                      { name: 'Alice Johnson', room: 'Deluxe King #204', time: '14:00', status: 'On Time' },
                      { name: 'Bob Wilson', room: 'Suite #102', time: '15:30', status: 'Late' },
                    ].map((checkin, i) => (
                      <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-slate-50">
                        <div className="flex items-center gap-3">
                          <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                          <div>
                            <p className="text-sm font-semibold text-[#111827]">{checkin.name}</p>
                            <p className="text-xs text-[#6B7280]">{checkin.room}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center gap-1 text-xs font-medium text-[#111827]">
                            <Clock className="w-3 h-3" />
                            {checkin.time}
                          </div>
                          <span className={`caption font-bold uppercase tracking-wider ${checkin.status === 'Late' ? 'text-red-500' : 'text-emerald-500'}`}>
                            {checkin.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="card bg-sidebar text-white border-none overflow-hidden relative">
                  <div className="relative z-10">
                    <h3 className="text-white mb-1">Occupancy Goal</h3>
                    <p className="text-slate-400 text-sm mb-6">You're 5% away from your monthly target.</p>
                    <div className="flex items-end gap-1 mb-2">
                      <span className="text-3xl font-bold">84%</span>
                      <span className="text-slate-400 text-sm mb-1">/ 90%</span>
                    </div>
                    <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: '84%' }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                        className="h-full bg-primary"
                      ></motion.div>
                    </div>
                    <button className="mt-8 flex items-center gap-2 text-sm font-semibold text-primary hover:text-white transition-colors">
                      <span>Optimization tips</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-primary/10 rounded-full blur-3xl"></div>
                </div>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar */}
      <aside className={`${isSidebarOpen ? 'w-64' : 'w-20'} bg-sidebar transition-all duration-300 flex flex-col border-r border-white/5 z-50`}>
        <div className="h-16 flex items-center px-6 gap-3">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <Building2 className="text-white w-5 h-5" />
          </div>
          {isSidebarOpen && <span className="text-white font-bold text-xl tracking-tight">Propel</span>}
        </div>

        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto custom-scrollbar">
          {navItems.map((item) => (
            <SidebarItem
              key={item.id}
              item={item}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              isSidebarOpen={isSidebarOpen}
            />
          ))}
        </nav>

        <div className="p-4 border-t border-white/5">
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
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Topbar */}
        <header className="h-16 bg-white border-b border-border flex items-center justify-between px-8 shrink-0">
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

            <div className="relative hidden md:block">
              <select className="bg-slate-50 border-none text-sm font-semibold text-slate-700 rounded-lg px-3 py-1.5 focus:ring-0 cursor-pointer appearance-none pr-8">
                <option>Grand Plaza Hotel</option>
                <option>Sunset Resort</option>
                <option>Urban Suites</option>
              </select>
              <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
            </div>

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
            <div className="w-10 h-10 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center overflow-hidden cursor-pointer hover:border-primary transition-colors">
              <img 
                src="https://picsum.photos/seed/user/100/100" 
                alt="User" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-[1200px] mx-auto p-8 space-y-8">
            {renderContent()}
          </div>
        </div>
      </main>
    </div>
  );
}
