import axios from 'axios';

const url = 'https://pixabay.com/api/?key=33797710-c43b349e33488e785e99b8ec8&';
async function fetchImages(query, pageNumber) {
  const fetch = await axios.get(
    `${url}q=${query}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${pageNumber}`
  );
  return fetch;
}

export { fetchImages };