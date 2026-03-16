import React, { useState } from 'react';
import { SectionCard, MultiSelectField } from './UIComponents';

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

export default PropertyFeaturesView;
