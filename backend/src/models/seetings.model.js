import mongoose from 'mongoose'

const librarySettingsSchema = new mongoose.Schema({
  libraryName: { type: String, required: true },
  address: String,
  contactEmail: { type: String, required: true },
  contactPhone: String,
  openingHours: String,
  maxBooksPerUser: { type: Number, default: 5 },
  allowReservations: { type: Boolean, default: true }
});

const loanSettingsSchema = new mongoose.Schema({
  loanPeriod: { type: Number, default: 14 },
  renewalPeriod: { type: Number, default: 7 },
  maxRenewals: { type: Number, default: 2 },
  finePerDay: { type: Number, default: 0.50 },
  gracePeriod: { type: Number, default: 2 },
  autoRenewal: { type: Boolean, default: false }
});

const notificationSettingsSchema = new mongoose.Schema({
  dueReminder: { type: Boolean, default: true },
  dueReminderDays: { type: Number, default: 2 },
  reservationReady: { type: Boolean, default: true },
  newBooks: { type: Boolean, default: false },
  newsletter: { type: Boolean, default: true }
});

const settingsSchema = new mongoose.Schema({
  library: librarySettingsSchema,
  loan: loanSettingsSchema,
  notification: notificationSettingsSchema,
  lastUpdated: { type: Date, default: Date.now }
});

const settingsModel = new mongoose.model('Settings', settingsSchema)
export {settingsModel};