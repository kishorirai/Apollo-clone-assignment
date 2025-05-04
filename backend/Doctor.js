const mongoose = require('mongoose');

const DoctorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  title: { type: String, default: "General Physician" },
  specialty: { type: String, required: true },
  experience: { type: Number, required: true },
  fees: { type: Number, default: 0 },
  photo: { type: String, default: "" },
  patients: { type: Number, default: 0 },
  rating: { type: Number, default: 0 },
  availableTimings: { type: [String], default: [] },
  gender: { type: String, default: "Any" },
  languages: { type: [String], default: [] },
  facilityName: { type: String, default: "" },
  consultationModes: { type: [String], default: [] },
  badges: { type: [String], default: [] },
  location: { type: String, default: "" }
});

module.exports = mongoose.model('Doctor', DoctorSchema);
