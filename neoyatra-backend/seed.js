import mongoose from 'mongoose';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import Bus from './models/Bus.js';

dotenv.config();

const locations = [
  'Delhi', 'Mumbai', 'Bangalore', 'Chennai', 'Kolkata', 'Hyderabad', 'Pune',
  'Ahmedabad', 'Jaipur', 'Lucknow', 'Surat', 'Kanpur', 'Nagpur', 'Indore',
  'Thane', 'Bhopal', 'Visakhapatnam', 'Patna', 'Vadodara', 'Ghaziabad',
  'Ludhiana', 'Agra', 'Nashik', 'Faridabad', 'Meerut', 'Rajkot', 'Varanasi',
  'Srinagar', 'Aurangabad', 'Dhanbad', 'Amritsar', 'Allahabad', 'Ranchi',
  'Howrah', 'Coimbatore', 'Jabalpur', 'Gwalior', 'Vijayawada', 'Jodhpur',
  'Madurai', 'Raipur', 'Kota', 'Guwahati', 'Chandigarh', 'Solapur'
];

const companies = [
  'NeoBus', 'YatraExpress', 'BharatTravels', 'SuperFast Express', 'Royal Cruiser',
  'StarLine', 'CityLink', 'QuickJourney', 'ComfortRide', 'SafeTravels',
  'VRL Travels', 'SRS Travels', 'KSRTC', 'RedBus Express', 'GreenLine Travels',
  'Orange Tours', 'ZingBus', 'IntrCity SmartBus', 'NueGo', 'Mahasagar Travels'
];

const types = ['AC Sleeper', 'Non-AC Sleeper', 'AC Seater', 'Non-AC Seater', 'Volvo AC Semi-Sleeper'];

const facilitiesList = [
  ['WiFi', 'Charging Point', 'Blanket', 'Water Bottle'],
  ['WiFi', 'Charging Point'],
  ['Charging Point', 'Water Bottle'],
  ['Water Bottle'],
  ['WiFi', 'Blanket'],
  ['Blanket', 'Water Bottle'],
  ['WiFi', 'Charging Point', 'Water Bottle']
];

const generateTime = () => {
  const hours = Math.floor(Math.random() * 12) + 1;
  const minutes = Math.random() < 0.5 ? '00' : '30';
  const ampm = Math.random() < 0.5 ? 'AM' : 'PM';
  return `${hours.toString().padStart(2, '0')}:${minutes} ${ampm}`;
};

const busesData = [];

const createRandomBus = (departure, arrival) => {
  const company = companies[Math.floor(Math.random() * companies.length)];
  const type = types[Math.floor(Math.random() * types.length)];
  const facilities = facilitiesList[Math.floor(Math.random() * facilitiesList.length)];

  let basePrice = 500 + Math.floor(Math.random() * 500);
  if (type.includes('AC')) basePrice += 400;
  if (type.includes('Sleeper')) basePrice += 300;
  if (type.includes('Volvo')) basePrice += 500;

  return {
    source: departure,
    destination: arrival,
    date: new Date().toISOString().split('T')[0],
    price: basePrice,
    totalSeats: Math.floor(Math.random() * 30) + 20,
    company,
    type,
    time: generateTime(),
    facilities
  };
};

const popularRoutes = [
  { src: 'Delhi', dest: 'Jaipur' },
  { src: 'Mumbai', dest: 'Pune' },
  { src: 'Bangalore', dest: 'Chennai' },
  { src: 'Kolkata', dest: 'Howrah' }
];

// Generate 10 buses for each popular route
popularRoutes.forEach(route => {
  for (let i = 0; i < 10; i++) {
    busesData.push(createRandomBus(route.src, route.dest));
  }
});

// Generate 260 random buses for other routes
for (let i = 1; i <= 260; i++) {
  let departure = locations[Math.floor(Math.random() * locations.length)];
  let arrival = locations[Math.floor(Math.random() * locations.length)];
  while (departure === arrival) {
    arrival = locations[Math.floor(Math.random() * locations.length)];
  }
  busesData.push(createRandomBus(departure, arrival));
}

const seedDatabase = async () => {
  try {
    console.log('Connecting to database...');
    await connectDB();
    
    console.log('Clearing existing bus data...');
    await Bus.deleteMany();
    console.log('Buses cleared from DB.');
    
    console.log(`Inserting ${busesData.length} new buses...`);
    await Bus.insertMany(busesData);
    console.log('Database seeded successfully!');
    
    console.log('Closing database connection.');
    mongoose.connection.close();
  } catch (error) {
    console.error(`Error with data import: ${error.message}`);
    process.exit(1);
  }
};

seedDatabase();