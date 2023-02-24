const gallery = document.querySelector('.gallery');

function createMarkup(arr) {
  const markup = arr
    .map(img => {
      return ` 
       <div class="photo-card">
        <a class="link-img" href="${img.largeImageURL}">
        <img  class="gallery_image" src="${img.webformatURL}" alt="${img.tags}" loading="lazy" />
        </a>
        <div class="info">
          <p class="info-item">
            <b>Likes</b>
            ${img.likes}
          </p>
          <p class="info-item">
            <b>Views</b>
             ${img.views}
          </p>
          <p class="info-item">
            <b>Comments</b>
            ${img.comments}
          </p>
          <p class="info-item">
            <b>Downloads</b>
            ${img.downloads}
          </p>
          </div>`;
    })
    .join('');

  gallery.insertAdjacentHTML('beforeend', markup);
}

//

export { createMarkup };