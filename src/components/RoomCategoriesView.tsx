import React from 'react';
import { Plus, Upload } from 'lucide-react';
import { SectionCard } from './UIComponents';

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

export default RoomCategoriesView;
