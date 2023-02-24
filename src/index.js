import { Notify } from 'notiflix/build/notiflix-notify-aio';
// import SimpleLightbox from 'simplelightbox';
// import 'simplelightbox/dist/simple-lightbox.min.css';
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

const loadMoreBtn = new LoadMoreBtn({ selector: '.load-more' }); // инициализация экземпляра Класса

form.addEventListener('submit', onSubmitImages);
loadMoreBtn.button.addEventListener('click', onClickBtnLoadMore);
input.addEventListener('input', onCleanInput);

new SimpleLightbox('.gallery a');

function onSubmitImages(evt) {
  evt.preventDefault();
  loadMoreBtn.hide(); // Сначала прячем кнопку, что бы она при повторном сабмите не отображалась
  pageNumber = 1;
  perPage = 40;
  imgQuery = evt.target.elements.searchQuery.value;
  cleanMarkup();
  fetchImages(imgQuery, pageNumber).then(data => {
    const totalImg = data.data.totalHits;

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
    createMarkup(hits);
    loadMoreBtn.show();

    if (totalImg < perPage)
      Notify.info(`We're sorry, but you've reached the end of search result`);
    else Notify.success(`Hooray! We found ${totalImg} images.`);
  });
}

function onClickBtnLoadMore(evt) {
  evt.preventDefault();
  pageNumber += 1;
  perPage += 40;
  console.log('onClickBtnLoadMore ~ perPage:', perPage);

  let number = fetchImages(imgQuery, pageNumber).then(data => {
    const {
      data: { hits },
    } = data;
    if (data.data.totalHits < perPage) {
      Notify.info(`We're sorry, but you've reached the end of search results.`);
    }
    createMarkup(hits);
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