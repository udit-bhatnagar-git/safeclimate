import React, { useState } from 'react';
import { Upload } from 'lucide-react';
import { SectionCard, Toggle } from './UIComponents';

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

export default PropertyInfoView;
