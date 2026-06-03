import mongoose from 'mongoose';

const busSchema = mongoose.Schema({
  source: {
    type: String,
    required: true,
    trim: true
  },
  destination: {
    type: String,
    required: true,
    trim: true
  },
  date: {
    type: String,
    required: true,
    trim: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  totalSeats: {
    type: Number,
    required: true,
    min: 1
  },
  company: {
    type: String,
    trim: true,
    default: 'NeoYatra Express'
  },
  type: {
    type: String,
    trim: true,
    default: 'A/C Sleeper (2+1)'
  },
  time: {
    type: String,
    trim: true,
    default: '21:00'
  },
  facilities: {
    type: [String],
    default: []
  },
  bookedSeats: {
    type: [{
      type: String,
      trim: true
    }],
    default: []
  },
  lockedSeats: {
    type: [{
      seatId: String,
      userId: String,
      lockedAt: { type: Date, default: Date.now }
    }],
    default: []
  }
}, {
  timestamps: true
});

busSchema.index({ source: 1, destination: 1, date: 1 });

const Bus = mongoose.model('Bus', busSchema);

export default Bus;
