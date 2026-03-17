import axios from 'axios';
import FormData from 'form-data';
import fs from 'fs';
import path from 'path';

const API_BASE = 'http://localhost:5000/api';

async function login() {
  const res = await axios.post(`${API_BASE}/auth/login`, {
    ad_user_name: 'admin',
    ad_password: 'admin123',
  });
  return res.data.token;
}

async function uploadImage(token) {
  const form = new FormData();
  const imagePath = path.join(process.cwd(), 'backend', 'uploads', 'news', 'NTNSP-logo-1772905571691-636539285.png');
  form.append('image', fs.createReadStream(imagePath));

  const res = await axios.post(`${API_BASE}/news/upload`, form, {
    headers: {
      Authorization: `Bearer ${token}`,
      ...form.getHeaders(),
    },
    maxBodyLength: Infinity,
    maxContentLength: Infinity,
  });
  return res.data;
}

(async () => {
  try {
    const token = await login();
    console.log('Logged in, token length', token.length);
    const result = await uploadImage(token);
    console.log('Upload result:', result);
  } catch (err) {
    if (err.response) {
      console.error('Error response status:', err.response.status);
      console.error('Error response data:', err.response.data);
    } else {
      console.error('Error:', err.message);
    }
    process.exit(1);
  }
})();
