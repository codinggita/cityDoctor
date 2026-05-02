const mongoose = require('mongoose')

const settingsSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  language: { type: String, default: 'en' },
  theme: { type: String, enum: ['light', 'dark'], default: 'light' },
  notifications: {
    appointmentReminders: { type: Boolean, default: true },
    preVisitReminders: { type: Boolean, default: true },
    offersAndPromos: { type: Boolean, default: true },
    emergencyAlerts: { type: Boolean, default: true },
    reviewRequests: { type: Boolean, default: true },
    emailNotifications: { type: Boolean, default: true },
    smsNotifications: { type: Boolean, default: false }
  },
  privacy: {
    showProfilePublicly: { type: Boolean, default: false },
    allowAnonymousReviews: { type: Boolean, default: true }
  }
}, { timestamps: true })

module.exports = mongoose.model('Settings', settingsSchema)
