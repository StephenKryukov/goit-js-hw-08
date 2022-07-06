import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { galleryItems } from './gallery-items';

//console.log(galleryItems);
const gallery = document.querySelector('.gallery');
const galleryItemsRef = galleryItems
  .map(({ preview, original, description }) => {
    return `<div class = "gallery__item"><a class = "gallery__link" href= "${original}"><img  class = "gallery__image" data-source = "${original}" src = ${preview} alt = "${description}"></a></div>`;
  })
  .join('');

gallery.insertAdjacentHTML('beforeend', galleryItemsRef);

// взяли из https://simplelightbox.com/ (раздел Usage)
const lightbox = new SimpleLightbox('.gallery a', {
  captionsPosition: 'bottom',
  captionsData: 'alt',
  captionsDelay: 250,
});
