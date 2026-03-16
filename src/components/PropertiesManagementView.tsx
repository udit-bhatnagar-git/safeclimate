import React from 'react';
import { Plus, MapPin, MoreHorizontal, BedDouble, BarChart2, Edit3, Building2 } from 'lucide-react';
import { motion } from 'framer-motion';

interface PropertiesManagementViewProps {
  onAddClick: () => void;
  onEditClick: () => void;
  onManageClick?: (id: string) => void;
  onAnalyticsClick?: (id: string) => void;
}

const properties = [
  { 
    id: 'grand-plaza', 
    name: 'Grand Plaza Hotel', 
    location: 'New York, USA', 
    rooms: 120, 
    status: 'Active', 
    plan: 'Professional', 
    image: 'https://picsum.photos/seed/hotel1/800/600',
    description: 'Luxury hotel in the heart of Manhattan with premium amenities and stunning views.'
  },
  { 
    id: 'beach-villa', 
    name: 'Beach Villa', 
    location: 'Malibu, USA', 
    rooms: 5, 
    status: 'Active', 
    plan: 'Trial', 
    image: 'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?q=80&w=800&auto=format&fit=crop',
    description: 'Beautiful 5-room beachfront villa with private pool and direct access to the ocean.'
  },
  { 
    id: 'lake-house', 
    name: 'Lake House', 
    location: 'Tahoe, USA', 
    rooms: 8, 
    status: 'Active', 
    plan: 'Basic', 
    image: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?q=80&w=800&auto=format&fit=crop',
    description: 'Serene lakeside retreat perfect for families, featuring 8 cozy rooms and water sports.'
  },
  { 
    id: 'mountain-cabin', 
    name: 'Mountain Cabin', 
    location: 'Aspen, USA', 
    rooms: 4, 
    status: 'Inactive', 
    plan: 'Professional', 
    image: 'https://images.unsplash.com/photo-1449156001533-cb39c8924ca5?q=80&w=800&auto=format&fit=crop',
    description: 'Exclusive mountain cabin with 4 rooms, fireplace, and private ski-in/ski-out access.'
  }
];

const PropertiesManagementView = ({ onAddClick, onEditClick, onManageClick, onAnalyticsClick }: PropertiesManagementViewProps) => {
  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Properties</h1>
          <p className="text-slate-500 font-medium">Manage all properties in your portfolio from one place.</p>
        </div>
        <button 
          onClick={onAddClick} 
          className="btn-primary h-12 px-6 shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:-translate-y-0.5 transition-all text-base"
        >
          <Plus className="w-5 h-5" />
          <span>Add New Property</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-8">
        {properties.map((property, idx) => (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            key={property.id} 
            className="group bg-white rounded-3xl shadow-sm border border-border overflow-hidden hover:shadow-xl hover:border-primary/20 transition-all duration-300 flex flex-col"
          >
            {/* Property Image & Badges */}
            <div className="h-60 relative overflow-hidden">
              <img 
                src={property.image} 
                alt={property.name} 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                referrerPolicy="no-referrer" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />
              
              <div className="absolute top-5 left-5 flex flex-wrap gap-2">
                <span className={`px-4 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-wider shadow-lg backdrop-blur-md ${
                  property.plan === 'Professional' ? 'bg-indigo-600/90 text-white' :
                  property.plan === 'Trial' ? 'bg-amber-500/90 text-white' : 'bg-slate-700/90 text-white'
                }`}>
                  {property.plan} Plan
                </span>
                <span className={`px-4 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-wider shadow-lg backdrop-blur-md ${
                  property.status === 'Active' ? 'bg-emerald-500/90 text-white' : 'bg-red-500/90 text-white'
                }`}>
                  {property.status}
                </span>
              </div>
              
              <div className="absolute bottom-5 left-5 right-5 text-white">
                 <div className="flex items-center gap-1 text-white/90 text-sm font-medium mb-1">
                  <MapPin className="w-4 h-4" />
                  <span>{property.location}</span>
                </div>
                <h3 className="text-xl font-bold">{property.name}</h3>
              </div>
            </div>

            {/* Property Details */}
            <div className="p-6 flex-1 flex flex-col">
              <p className="text-slate-500 text-sm line-clamp-2 mb-6 font-medium">
                {property.description}
              </p>

              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 group-hover:bg-primary/5 group-hover:border-primary/10 transition-colors">
                  <div className="flex items-center gap-2 text-slate-400 mb-1">
                    <BedDouble className="w-4 h-4" />
                    <span className="text-[10px] font-bold uppercase tracking-wider">Rooms</span>
                  </div>
                  <p className="text-xl font-bold text-slate-900">{property.rooms}</p>
                </div>
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 group-hover:bg-primary/5 group-hover:border-primary/10 transition-colors">
                  <div className="flex items-center gap-2 text-slate-400 mb-1">
                    <BarChart2 className="w-4 h-4" />
                    <span className="text-[10px] font-bold uppercase tracking-wider">Occupancy</span>
                  </div>
                  <p className="text-xl font-bold text-slate-900">84.2%</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-auto space-y-3">
                <div className="flex gap-2">
                  <button 
                    onClick={() => onManageClick?.(property.id)}
                    className="flex-1 btn-primary h-11 text-sm font-bold bg-slate-900 hover:bg-slate-800 border-none shadow-none"
                  >
                    <Building2 className="w-4 h-4" />
                    <span>Manage</span>
                  </button>
                  <button 
                    onClick={() => onAnalyticsClick?.(property.id)}
                    className="flex-1 btn-secondary h-11 text-sm font-bold border-2 border-slate-100 hover:border-primary/20 hover:bg-primary/5"
                  >
                    <BarChart2 className="w-4 h-4" />
                    <span>Analytics</span>
                  </button>
                </div>
                <button 
                  onClick={onEditClick}
                  className="w-full flex items-center justify-center gap-2 h-11 text-slate-600 hover:text-primary font-bold text-sm bg-slate-50 hover:bg-primary/5 rounded-xl transition-all"
                >
                  <Edit3 className="w-4 h-4" />
                  <span>Edit Property Details</span>
                </button>
              </div>
            </div>
          </motion.div>
        ))}

        {/* Add New Property Card Placeholder */}
        <button 
          onClick={onAddClick}
          className="group border-2 border-dashed border-slate-200 rounded-3xl p-8 flex flex-col items-center justify-center gap-4 hover:border-primary hover:bg-primary/5 transition-all min-h-[500px]"
        >
          <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center group-hover:bg-primary group-hover:scale-110 transition-all duration-300 shadow-sm border border-slate-100 group-hover:border-primary">
            <Plus className="w-8 h-8 text-slate-400 group-hover:text-white transition-colors" />
          </div>
          <div className="text-center">
            <p className="text-xl font-bold text-slate-900 mb-1">Add Another Property</p>
            <p className="text-sm font-medium text-slate-500">Expand your portfolio today.</p>
          </div>
        </button>
      </div>
    </div>
  );
};

export default PropertiesManagementView;
