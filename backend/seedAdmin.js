const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Admin = require('./models/Admin'); 
const dotenv = require("dotenv");

dotenv.config();

const seedAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    
    const hashedPassword = await bcrypt.hash('randila', 10);
    
    const admin = new Admin({
      email: 'randila@gmail.com',
      password: hashedPassword,
    });

    await admin.save();
    console.log('✅ Admin inserted successfully');
    process.exit();
  } catch (err) {
    console.error('❌ Error inserting admin:', err);
    process.exit(1);
  }
};

seedAdmin();
