import axios from 'axios';

const URL = 'https://pixabay.com/api/';
const API_KEY = '53058493-523f27a86fb9ebd113797df12';

export async function getImagesByQuery(query) {
  const params = {
    key: API_KEY,
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    per_page: 40,
  };

  const response = await axios.get(URL, { params });
  return response.data;
}
