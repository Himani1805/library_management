// src/components/Settings/LoanSettings.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const LoanSettings = ({ settings = {} }) => {
  const [formData, setFormData] = useState({
    loanPeriod: settings.loanPeriod || 14,
    renewalPeriod: settings.renewalPeriod || 7,
    maxRenewals: settings.maxRenewals || 2,
    finePerDay: settings.finePerDay || 0.50,
    gracePeriod: settings.gracePeriod || 2,
    autoRenewal: settings.autoRenewal ?? false,
  });

  const [saving, setSaving] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : type === 'number' ? parseFloat(value) : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    
    try {
      await axios.put('/api/settings/loan', formData);
      toast.success('Loan settings updated successfully!');
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
          <label htmlFor="loanPeriod" className="block text-sm font-medium text-gray-700 mb-2">
            Loan Period (days) *
          </label>
          <input
            type="number"
            id="loanPeriod"
            name="loanPeriod"
            value={formData.loanPeriod}
            onChange={handleChange}
            min="1"
            max="90"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        <div>
          <label htmlFor="renewalPeriod" className="block text-sm font-medium text-gray-700 mb-2">
            Renewal Period (days)
          </label>
          <input
            type="number"
            id="renewalPeriod"
            name="renewalPeriod"
            value={formData.renewalPeriod}
            onChange={handleChange}
            min="1"
            max="30"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label htmlFor="maxRenewals" className="block text-sm font-medium text-gray-700 mb-2">
            Maximum Renewals
          </label>
          <input
            type="number"
            id="maxRenewals"
            name="maxRenewals"
            value={formData.maxRenewals}
            onChange={handleChange}
            min="0"
            max="10"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label htmlFor="finePerDay" className="block text-sm font-medium text-gray-700 mb-2">
            Fine Per Day ($)
          </label>
          <input
            type="number"
            id="finePerDay"
            name="finePerDay"
            value={formData.finePerDay}
            onChange={handleChange}
            min="0"
            step="0.01"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label htmlFor="gracePeriod" className="block text-sm font-medium text-gray-700 mb-2">
            Grace Period (days)
          </label>
          <input
            type="number"
            id="gracePeriod"
            name="gracePeriod"
            value={formData.gracePeriod}
            onChange={handleChange}
            min="0"
            max="7"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div className="flex items-center md:col-span-2">
          <input
            id="autoRenewal"
            name="autoRenewal"
            type="checkbox"
            checked={formData.autoRenewal}
            onChange={handleChange}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label htmlFor="autoRenewal" className="ml-2 block text-sm text-gray-900">
            Enable automatic renewal for eligible books
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

export default LoanSettings;