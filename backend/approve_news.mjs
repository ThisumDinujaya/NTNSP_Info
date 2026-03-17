import mongoose from 'mongoose';
import News from './models/News.js';

async function approveNews() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/ntnsp_info');
    const result = await News.updateMany({ approved: false }, { approved: true, approvedBy: 'admin', approvedAt: new Date() });
    console.log('Updated:', result.modifiedCount);
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error:', error);
  }
}

approveNews();