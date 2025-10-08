// src/components/Settings/NotificationSettings.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const NotificationSettings = ({ settings = {} }) => {
  const [formData, setFormData] = useState({
    dueReminder: settings.dueReminder ?? true,
    dueReminderDays: settings.dueReminderDays || 2,
    reservationReady: settings.reservationReady ?? true,
    newBooks: settings.newBooks ?? false,
    newsletter: settings.newsletter ?? true,
  });

  const [saving, setSaving] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : type === 'number' ? parseInt(value) : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    
    try {
      await axios.put('/api/settings/notification', formData);
      toast.success('Notification settings updated successfully!');
    } catch (error) {
      toast.error('Failed to update settings');
      console.error('Error updating settings:', error);
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
          <div>
            <h3 className="text-sm font-medium text-gray-900">Due Date Reminders</h3>
            <p className="text-sm text-gray-500">Send reminders before books are due</p>
          </div>
          <div className="flex items-center space-x-4">
            <input
              type="number"
              name="dueReminderDays"
              value={formData.dueReminderDays}
              onChange={handleChange}
              min="1"
              max="7"
              disabled={!formData.dueReminder}
              className="w-16 px-2 py-1 border border-gray-300 rounded text-sm disabled:opacity-50"
            />
            <span className="text-sm text-gray-500">days before</span>
            <input
              type="checkbox"
              name="dueReminder"
              checked={formData.dueReminder}
              onChange={handleChange}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
          </div>
        </div>

        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
          <div>
            <h3 className="text-sm font-medium text-gray-900">Reservation Ready</h3>
            <p className="text-sm text-gray-500">Notify when reserved books are available</p>
          </div>
          <input
            type="checkbox"
            name="reservationReady"
            checked={formData.reservationReady}
            onChange={handleChange}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
        </div>

        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
          <div>
            <h3 className="text-sm font-medium text-gray-900">New Books Notification</h3>
            <p className="text-sm text-gray-500">Notify about newly added books</p>
          </div>
          <input
            type="checkbox"
            name="newBooks"
            checked={formData.newBooks}
            onChange={handleChange}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
        </div>

        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
          <div>
            <h3 className="text-sm font-medium text-gray-900">Newsletter</h3>
            <p className="text-sm text-gray-500">Send monthly library newsletter</p>
          </div>
          <input
            type="checkbox"
            name="newsletter"
            checked={formData.newsletter}
            onChange={handleChange}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
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

export default NotificationSettings;