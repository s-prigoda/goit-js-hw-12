import './css/styles.css';
import 'simplelightbox/dist/simple-lightbox.min.css';
import 'izitoast/dist/css/iziToast.min.css';

import { getImagesByQuery } from './js/pixabay-api.js';
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
  showLoadMoreButton,
  hideLoadMoreButton,
} from './js/render-functions.js';

import iziToast from 'izitoast';

const form = document.querySelector('.form');
const loadMoreBtn = document.querySelector('.load-more');

let query = '';
let page = 1;
const perPage = 15;
let totalHits = 0;

form.addEventListener('submit', async e => {
  e.preventDefault();
  query = form.elements['search-text'].value.trim();
  if (!query) return;

  page = 1;
  clearGallery();
  hideLoadMoreButton();
  showLoader();

  try {
    const data = await getImagesByQuery(query, page, perPage);
    totalHits = data.totalHits;

    if (data.hits.length === 0) {
      iziToast.info({ title: 'No results', message: 'No images found.' });
      hideLoader();
      return;
    }

    createGallery(data.hits);
    hideLoader();

    if (totalHits > perPage) showLoadMoreButton();
  } catch (error) {
    hideLoader();
    iziToast.error({ title: 'Error', message: 'Something went wrong!' });
  }
});

loadMoreBtn.addEventListener('click', async () => {
  page += 1;
  showLoader();

  try {
    const data = await getImagesByQuery(query, page, perPage);
    createGallery(data.hits);
    hideLoader();

    const totalPages = Math.ceil(totalHits / perPage);
    if (page >= totalPages) {
      hideLoadMoreButton();
      iziToast.info({
        title: 'End',
        message: "We're sorry, but you've reached the end of search results.",
      });
    }

    const { height: cardHeight } = document
      .querySelector('.gallery')
      .firstElementChild.getBoundingClientRect();
    window.scrollBy({ top: cardHeight * 2, behavior: 'smooth' });
  } catch (error) {
    hideLoader();
    iziToast.error({ title: 'Error', message: 'Something went wrong!' });
  }
});
