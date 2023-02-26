import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { fetchImages } from './fetchImages.js';
import { createMarkup } from './createMarkup.js';
import LoadMoreBtn from './LoadMoreBtn.js';

let pageNumber = 1;
let perPage = 40;
let imgQuery = null;
const form = document.getElementById('search-form');
const searchBtn = document.querySelector('.btn-search');
const gallery = document.querySelector('.gallery');
const input = document.querySelector('.input');

const loadMoreBtn = new LoadMoreBtn({ selector: '.load-more' });

form.addEventListener('submit', onSubmitImages);
loadMoreBtn.button.addEventListener('click', onClickBtnLoadMore);
input.addEventListener('input', onCleanInput);

const activeSimplelightbox = new SimpleLightbox('.gallery a');

function onSubmitImages(evt) {
  evt.preventDefault();
  loadMoreBtn.hide();
  pageNumber = 1;
  perPage = 40;
  imgQuery = evt.target.elements.searchQuery.value.trim();
  cleanMarkup();
  fetchImages(imgQuery, pageNumber).then(data => {
    const totalImg = data.data.totalHits;
    loadMoreBtn.enabled();
    const {
      data: { hits },
    } = data;

    if (!hits.length) {
      loadMoreBtn.hide();
      Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
      return;
    }
    gallery.innerHTML = createMarkup(hits);

    loadMoreBtn.show();
    activeSimplelightbox.refresh();
    if (totalImg < perPage) {
      Notify.info(`We're sorry, but you've reached the end of search result`);
      loadMoreBtn.disabled();
    } else Notify.success(`Hooray! We found ${totalImg} images.`);
  });
}

function onClickBtnLoadMore(evt) {
  evt.preventDefault();
  pageNumber += 1;
  perPage += 40;
  let number = fetchImages(imgQuery, pageNumber).then(data => {
    const {
      data: { hits },
    } = data;
    if (data.data.totalHits < perPage) {
      Notify.info(`We're sorry, but you've reached the end of search results.`);
      loadMoreBtn.disabled();
    }
    gallery.insertAdjacentHTML('beforeend', createMarkup(hits));
    activeSimplelightbox.refresh();
    updateScroll();
  });
}

function onCleanInput(e) {
  const text = e.target.value;
  if (text === '') {
    cleanMarkup();
    loadMoreBtn.hide();
  }
}

function cleanMarkup() {
  gallery.innerHTML = '';
}

function updateScroll() {
  const { height: cardHeight } = document
    .querySelector('.photo-card')
    .getBoundingClientRect();

  return window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}