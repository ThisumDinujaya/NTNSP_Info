const axios = require('axios');

;(async () => {
  try {
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwiaXNTdXBlckFkbWluIjp0cnVlLCJkaXNwbGF5TmFtZSI6Ik1yLiBBZG1pbiBVc2VyIiwiaWF0IjoxNzczNjM5MTMwLCJleHAiOjE3NzM2Njc5MzB9.7GAWZt-KA5LwtF-DpShOUYLG_HWW7tVHf0Bl1xFZbdE';

    const payload = {
      title: 'Test news via API',
      summary: 'Summary',
      content: 'Content here',
      category: 'General',
      publishedAt: new Date().toISOString(),
      activeStatus: true,
    };

    const res = await axios.post('http://localhost:5000/api/news', payload, {
      headers: { Authorization: `Bearer ${token}` },
      timeout: 10000,
    });

    console.log('status', res.status);
    console.log(JSON.stringify(res.data, null, 2));
  } catch (err) {
    if (err.response) {
      console.error('status', err.response.status);
      console.error(JSON.stringify(err.response.data, null, 2));
    } else {
      console.error(err.message);
    }
    process.exit(1);
  }
})();
