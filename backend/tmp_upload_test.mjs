import axios from 'axios';
import FormData from 'form-data';

(async () => {
  try {
    const form = new FormData();
    form.append('image', Buffer.from('hello'), {
      filename: 'test.jpg',
      contentType: 'image/jpeg',
    });

    const res = await axios.post('http://localhost:5000/api/news/upload', form, {
      headers: {
        // intentionally omitting Authorization to see what the API returns
        ...form.getHeaders(),
      },
    });
    console.log('status', res.status);
    console.log(res.data);
  } catch (err) {
    if (err.response) {
      console.error('status', err.response.status);
      console.error(err.response.data);
    } else {
      console.error(err.message);
    }
  }
})();
