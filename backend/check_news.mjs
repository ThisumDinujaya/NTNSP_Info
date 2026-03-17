import mongoose from 'mongoose';
import News from './models/News.js';

async function checkNews() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/ntnsp_info');
    const news = await News.find({}).sort({ createdAt: -1 }).limit(5);
    console.log('Recent news:');
    news.forEach(n => {
      console.log(`Title: ${n.title}, Approved: ${n.approved}, Active: ${n.activeStatus}, PublishedAt: ${n.publishedAt}`);
    });
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error:', error);
  }
}

checkNews();