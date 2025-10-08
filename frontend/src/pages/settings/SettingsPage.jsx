import React, { useState, useEffect } from 'react';
import axios from 'axios';
import LibrarySettings from './LibrarySettings';
import LoanSettings from './LoanSettings';
import NotificationSettings from './NotificationSettings';
import UserManagement from './UserManagement';

const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState('library');
  const [settings, setSettings] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/settings');
      setSettings(response.data);
    } catch (error) {
      console.error('Error fetching settings:', error);
    } finally {
      setLoading(false);
    }
  };

  const tabs = [
    { id: 'library', name: 'Library Settings', icon: '📚' },
    { id: 'loan', name: 'Loan Settings', icon: '⏰' },
    { id: 'notification', name: 'Notifications', icon: '🔔' },
    { id: 'users', name: 'User Management', icon: '👥' },
  ];

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Library Settings</h1>
          <p className="text-gray-600 mt-2">Manage your library configuration and preferences</p>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6" aria-label="Tabs">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2`}
                >
                  <span>{tab.icon}</span>
                  <span>{tab.name}</span>
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {activeTab === 'library' && (
              <LibrarySettings settings={settings.library} />
            )}
            {activeTab === 'loan' && (
              <LoanSettings settings={settings.loan} />
            )}
            {activeTab === 'notification' && (
              <NotificationSettings settings={settings.notification} />
            )}
            {activeTab === 'users' && (
              <UserManagement settings={settings.users} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;