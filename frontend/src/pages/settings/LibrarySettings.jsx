// src/components/Settings/LibrarySettings.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const LibrarySettings = ({ settings = {} }) => {
  const [formData, setFormData] = useState({
    libraryName: settings.libraryName || '',
    address: settings.address || '',
    contactEmail: settings.contactEmail || '',
    contactPhone: settings.contactPhone || '',
    openingHours: settings.openingHours || '',
    maxBooksPerUser: settings.maxBooksPerUser || 5,
    allowReservations: settings.allowReservations ?? true,
  });

  const [saving, setSaving] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    
    try {
      await axios.put('/api/settings/library', formData);
      toast.success('Library settings updated successfully!');
    } catch (error) {
      toast.error('Failed to update settings');
      console.error('Error updating settings:', error);
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="libraryName" className="block text-sm font-medium text-gray-700 mb-2">
            Library Name *
          </label>
          <input
            type="text"
            id="libraryName"
            name="libraryName"
            value={formData.libraryName}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        <div>
          <label htmlFor="contactEmail" className="block text-sm font-medium text-gray-700 mb-2">
            Contact Email *
          </label>
          <input
            type="email"
            id="contactEmail"
            name="contactEmail"
            value={formData.contactEmail}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        <div>
          <label htmlFor="contactPhone" className="block text-sm font-medium text-gray-700 mb-2">
            Contact Phone
          </label>
          <input
            type="tel"
            id="contactPhone"
            name="contactPhone"
            value={formData.contactPhone}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label htmlFor="maxBooksPerUser" className="block text-sm font-medium text-gray-700 mb-2">
            Max Books Per User
          </label>
          <input
            type="number"
            id="maxBooksPerUser"
            name="maxBooksPerUser"
            value={formData.maxBooksPerUser}
            onChange={handleChange}
            min="1"
            max="20"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div className="md:col-span-2">
          <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">
            Address
          </label>
          <textarea
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div className="md:col-span-2">
          <label htmlFor="openingHours" className="block text-sm font-medium text-gray-700 mb-2">
            Opening Hours
          </label>
          <textarea
            id="openingHours"
            name="openingHours"
            value={formData.openingHours}
            onChange={handleChange}
            rows={2}
            placeholder="e.g., Mon-Fri: 9AM-6PM, Sat: 10AM-4PM, Sun: Closed"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div className="flex items-center">
          <input
            id="allowReservations"
            name="allowReservations"
            type="checkbox"
            checked={formData.allowReservations}
            onChange={handleChange}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label htmlFor="allowReservations" className="ml-2 block text-sm text-gray-900">
            Allow book reservations
          </label>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={saving}
          className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
        >
          {saving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>
    </form>
  );
};

export default LibrarySettings;