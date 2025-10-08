import { settingsModel } from "../models/seetings.model.js";

// Get all settings
async function getAllSettings(request, response, next) {
  try {
    let settings = await settingsModel.findOne();
    if (!settings) {
      // Create default settings if none exist
      settings = await settingsModel.create({});
    }
    response.json(settings);
  } catch (error) {
    response.status(500).json({ message: 'Error fetching settings', error: error.message });
  }
}

// Update library settings
 async function updateLibrary(request, response, next) {
  try {
    let settings = await settingsModel.findOne();
    if (!settings) {
      settings = new settingsModel({});
    }
    
    settings.library = { ...settings.library, ...req.body };
    settings.lastUpdated = new Date();
    
    await settings.save();
    response.json({ message: 'Library settings updated successfully', settings });
  } catch (error) {
    response.status(500).json({ message: 'Error updating library settings', error: error.message });
  }
}

// Update loan settings
async function updateLoan(request, response, next){
  try {
    let settings = await settingsModel.findOne();
    if (!settings) {
      settings = new settingsModel({});
    }
    
    settings.loan = { ...settings.loan, ...req.body };
    settings.lastUpdated = new Date();
    
    await settings.save();
    response.json({ message: 'Loan settings updated successfully', settings });
  } catch (error) {
    response.status(500).json({ message: 'Error updating loan settings', error: error.message });
  }
}

// Update notification settings
async function updateNotification(request, response, next) {
  try {
    let settings = await settingsModel.findOne();
    if (!settings) {
      settings = new settingsModel({});
    }
    
    settings.notification = { ...settings.notification, ...req.body };
    settings.lastUpdated = new Date();
    
    await settings.save();
    response.json({ message: 'Notification settings updated successfully', settings });
  } catch (error) {
    response.status(500).json({ message: 'Error updating notification settings', error: error.message });
  }
}

export {getAllSettings, updateLibrary, updateLoan, updateNotification } 