require('dotenv').config();
console.log('Loaded MONGODB_URI:', process.env.MONGODB_URI);
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');


const Doctor = require('./Doctor'); // Make sure Doctor.js is in the same folder

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
console.log('MONGODB_URI:', process.env.MONGODB_URI);
mongoose.connect('mongodb+srv://kishori:Kishori123@cluster0.kyuzo0r.mongodb.net/doctor-listing?retryWrites=true&w=majority&appName=Cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('MongoDB connected');
}).catch((err) => {
  console.error('MongoDB connection error:', err);
});

// Test route
app.get('/', (req, res) => {
  res.send('API is running');
});

const originalPostApiDoctors = '/api/doctors';
const originalGetApiDoctors = '/api/doctors';

// Handler function for adding a doctor
async function addDoctorHandler(req, res) {
  try {
    const { name, specialization, experience, gender, location, ...rest } = req.body;
    const doctorData = {
      name,
      specialty: specialization,
      experience,
      gender,
      location,
      ...rest
    };
    const doctor = new Doctor(doctorData);
    await doctor.save();
    res.status(201).json(doctor);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

// Handler function for listing doctors
async function listDoctorsHandler(req, res) {
  try {
    const { specialization, gender } = req.query;
    let page = parseInt(req.query.page) || 1;
    let limit = parseInt(req.query.limit) || 10;
    const filter = {};
    if (specialization) filter.specialty = specialization;
    if (gender) filter.gender = gender;

    const doctors = await Doctor.find(filter)
      .skip((page - 1) * limit)
      .limit(limit);

    const total = await Doctor.countDocuments(filter);

    const doctorsWithCanVisit = doctors.map(doc => {
      const docObj = doc.toObject();
      docObj.canVisit = docObj.consultationModes && docObj.consultationModes.includes("Hospital Visit");
      return docObj;
    });

    res.json({
      data: doctorsWithCanVisit,
      page: page,
      totalPages: Math.ceil(total / limit),
      totalDoctors: total,
    });
  } catch (error) {
    console.error('Error in GET /list-doctors:', error);
    res.status(500).json({ error: error.message });
  }
}

// POST /add-doctor - Add a doctor
app.post('/add-doctor', addDoctorHandler);

// GET /list-doctors - List doctors with filters and pagination
app.get('/list-doctors', listDoctorsHandler);

// Alias routes for backward compatibility with frontend
app.post('/api/doctors', addDoctorHandler);
app.get('/api/doctors', listDoctorsHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
