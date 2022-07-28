import { galleryItems } from './gallery-items.js';
// Change code below this line

const gallery = document.querySelector('.gallery');

gallery.insertAdjacentHTML('beforeend', createGalleryMarkup(galleryItems));

gallery.addEventListener('click', openOriginalImgInModal);

function createGalleryMarkup(galleryItems) {
  return galleryItems
    .map(item => {
      const { preview, original, description } = item;
      return `
        <div class="gallery__item">
          <a class="gallery__link" href="${original}">
            <img
              loading="lazy"
              class="gallery__image"
              data-src="${preview}" 
              data-source="${original}" 
              alt="${description}"/>
          </a>
        </div>`;
    })
    .join('');
}

function openOriginalImgInModal(e) {
  e.preventDefault();

  const isImg = e.target.classList.contains('gallery__image');
  if (!isImg) {
    return;
  }

  const instance = basicLightbox.create(
    `<img width="1400" height="900" src="${e.target.dataset.source}">`
  );

  instance.show();

  window.addEventListener('keydown', onEscKeyPress);

  function onEscKeyPress() {
    const isEscKey = event.code === 'Escape';

    if (isEscKey) {
      instance.close();
      window.removeEventListener('keydown', onEscKeyPress);
    }
  }
}

// ====Lazyloading=====================================

const lazyImages = document.querySelectorAll('img[data-src]');

if ('loading' in HTMLImageElement.prototype) {
  console.log('Браузер поддерживает lazyload');
  addSrcAttrToLazyImages();
} else {
  console.log('Браузер НЕ поддерживает lazyload');
  addLazySizesScript();
}

function addLazySizesScript() {
  const script = document.createElement('script');
  script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.2.2/lazysizes.min.js';
  script.integrity =
    'sha512-TmDwFLhg3UA4ZG0Eb4MIyT1O1Mb+Oww5kFG0uHqXsdbyZz9DcvYQhKpGgNkamAI6h2lGGZq2X8ftOJvF/XjTUg==';
  script.crossOrigin = 'anonymous';

  document.body.appendChild(script);
}

function addSrcAttrToLazyImages() {
  const lazyImages = document.querySelectorAll('img[loading="lazy"]');

  lazyImages.forEach(img => {
    img.src = img.dataset.src;
  });
}
